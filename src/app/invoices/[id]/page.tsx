import { Metadata } from 'next';
import Link from 'next/link';
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
  console.log('he');
  console.log({ invoice });
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
  return (
    <div>
      <Link
        id='go-back'
        className='group flex items-center gap-x-4 dark:text-white text-[#0C0E16] mb-4 text-xs md:hidden'
        href={'/invoices'}
      >
        <BackIcon />
        Go Back
      </Link>
    </div>
  );
}

const BackIcon = () => (
  <svg
    width='6'
    height='11'
    viewBox='0 0 6 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155'
      stroke='#7C5DFA'
      strokeWidth='2'
    />
  </svg>
);
