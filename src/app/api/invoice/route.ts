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
  const currentUserName = session?.user?.name;

  const currentUser = await prisma.user.findFirst({
    where: { name: currentUserName },
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
