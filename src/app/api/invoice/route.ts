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

  const currentUser = await prisma.user.findFirst({
    where: { email: session?.user?.email },
  });
  const data = await req.json();

  const amount = data.items.reduce(
    (init: number, curr: { quantity: number; price: number }) =>
      curr.price * curr.quantity + init,
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
      paymentTermId: data.paymentTermId,
      status: data.status,
      receivingAddress: { create: { ...data.receivingAddress } },
      billingAddress: { create: { ...data.billingAddress } },
      items: { createMany: { data: [...data.items] } },
    },
  });

  return NextResponse.json(invoice);
}
