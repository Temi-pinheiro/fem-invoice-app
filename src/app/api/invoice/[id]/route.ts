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

  if (data.items.deletedItems.length > 0) {
    await prisma.items.deleteMany({
      where: {
        id: {
          in: [...data.items.deletedItems],
        },
      },
    });
  }
  const items: { quantity: number; price: number }[] = data.items.items;
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
      dueDate: new Date(data.dueDate),
      paymentTermId: data.paymentTermId,
      amount,
      status: data.status,
      receivingAddress: { update: { ...data.receivingAddress } },
      billingAddress: { update: { ...data.billingAddress } },
      items: {
        upsert: data.items.items.map((item: any) => ({
          create: {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          },
          update: {
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          },
          where: { id: item.id },
        })),
      },
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

  const deleteRecAddresses = prisma.receivingAddress.deleteMany({
    where: {
      invoiceId,
    },
  });
  const deleteBillAddresses = prisma.billingAddress.deleteMany({
    where: {
      invoiceId,
    },
  });

  const deleteInvoice = prisma.invoice.delete({
    where: {
      id: invoiceId,
    },
  });

  const transaction = await prisma.$transaction([
    deleteBillAddresses,
    deleteRecAddresses,
    deleteInvoice,
  ]);

  return NextResponse.json(transaction);
}
