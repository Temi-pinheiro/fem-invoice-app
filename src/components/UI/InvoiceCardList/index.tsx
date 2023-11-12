'use client';
import { Invoice } from '@prisma/client';
import InvoiceCard from '../Card';
import { AnimatePresence } from 'framer-motion';

export default function InvoiceCardList({ invoices }: { invoices: any[] }) {
  return (
    <ul className='flex flex-col gap-y-4 mt-14 px-6 md:px-0 pb-2- md:pb-0'>
      <AnimatePresence initial={false} mode='popLayout'>
        {invoices.map((invoice) => (
          <InvoiceCard key={invoice.id} invoice={invoice} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
