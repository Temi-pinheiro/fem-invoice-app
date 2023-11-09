import { Metadata } from 'next';
import React from 'react';
import { prisma } from '~/lib/prisma';

export async function generateMetadata({
  params,
}: {
  params: { id: any };
}): Promise<Metadata> {
  const invoice = await prisma.invoice.findUnique({ where: { id: params.id } });
  return { title: `Invoice #${invoice?.invoiceNum}` };
}
export default async function InvoicePage({ params }: { params: { id: any } }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { billingAddress: true, receivingAddress: true, items: true },
  });
  const {
    amount,
    description,
    invoiceNum,
    paymentTermId,
    dueDate,
    status,
    receivingAddress,
    billingAddress,
    items,
  } = invoice ?? {};
  return <div>InvoicePage</div>;
}
