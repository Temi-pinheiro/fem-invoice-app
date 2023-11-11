import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '~/lib/prisma';

const generateInvoiceNum = async (user: any) => {
  const lastIndex = await prisma.invoice.count({ where: { userId: user.id } });
  return `${user.name.slice(0, 3)}${(lastIndex + 1)
    .toString()
    .padStart(3, '0')}`;
};

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: 'Unauthorized, please login' },
      { status: 401 }
    );
  const email = session?.user?.email;

  const currentUser = await prisma.user.findFirst({
    where: { email },
  });
  const data = await req.json();
  const paymentTerm = await prisma.terms.findFirst({
    where: { value: data.paymentTerm },
  });
  const items: { quantity: number; price: number }[] = data.items;
  const amount = items.reduce(
    (init, curr) => curr.price * curr.quantity + init,
    0
  );

  const invoice = await prisma.invoice.create({
    data: {
      ...data,
      description: data.description,
      amount,
      invoiceNum: await generateInvoiceNum(currentUser),
      dueDate: new Date(data.dueDate),
      userId: currentUser?.id,

      paymentTermId: paymentTerm?.id,
      status: data.status,
      receivingAddress: { create: { ...data.receivingAddress } },
      billingAddress: { create: { ...data.billingAddress } },
      items: { createMany: { data: [...data.items] } },
    },
  });

  return NextResponse.json(invoice);
}
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: 'Unauthorized, please login' },
      { status: 401 }
    );
  const invoiceId = req.nextUrl.searchParams.get('id');
  if (!invoiceId) {
    return NextResponse.json(
      { error: 'No invoice id selected' },
      { status: 403 }
    );
  }
  const data = await req.json();
  const paymentTerm = await prisma.terms.findFirst({
    where: { value: data.paymentTerm },
  });
  const items: { quantity: number; price: number }[] = data.items;
  const amount = items.reduce(
    (init, curr) => curr.price * curr.quantity + init,
    0
  );

  const invoice = await prisma.invoice.update({
    where: {
      id: invoiceId!,
    },
    data: {
      ...data,
      paymentTermId: paymentTerm?.id,
      status: data.status,
    },

    // paymentTermId: paymentTerm?.id,
    // status: data.status,
    // receivingAddress: { create: { ...data.receivingAddress } },
    // billingAddress: { create: { ...data.billingAddress } },
    // items: { createMany: { data: [...data.items] } },
  });

  return NextResponse.json(invoice);
}
