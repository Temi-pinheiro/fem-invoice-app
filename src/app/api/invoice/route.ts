import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '~/lib/prisma';

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

  const invoice = await prisma.invoice.create({
    data: {
      ...data,
      description: data.description,
      amount: data.amount,
      invoiceNum: data.invoiceNum,
      dueDate: data.dueDate,
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
