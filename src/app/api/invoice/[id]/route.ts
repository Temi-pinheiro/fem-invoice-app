import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../auth/[...nextauth]/route';
import { prisma } from '~/lib/prisma';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: 'Unauthorized, please login' },
      { status: 401 }
    );
  const { id: invoiceId } = params;
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
      receivingAddress: { create: { ...data.receivingAddress } },
      billingAddress: { create: { ...data.billingAddress } },
      items: { createMany: { data: [...data.items] } },
    },
  });

  return NextResponse.json(invoice);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json(
      { error: 'Unauthorized, please login' },
      { status: 401 }
    );
  const { id: invoiceId } = params;
  if (!invoiceId) {
    return NextResponse.json(
      { error: 'No invoice id selected' },
      { status: 403 }
    );
  }

  const invoice = await prisma.invoice.delete({
    where: {
      id: invoiceId!,
    },
  });

  return NextResponse.json(invoice);
}
