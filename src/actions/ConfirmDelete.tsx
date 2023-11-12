'use client';

import { Invoice } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import { Button } from '~/components';

export default function ConfirmDelete({
  invoice,
  close,
}: {
  invoice: Invoice;
  close?: () => void;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
  const deleteInvoice = async () => {
    setIsFetching(true);

    try {
      console.log(invoice.id);
      const res = await fetch(`/api/invoice/${invoice.id}`, {
        method: 'DELETE',
        body: undefined,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsFetching(false);
      console.log(res);
      if (!res.ok) throw { message: res.statusText };
      close!();
      toast.success('Invoice deleted successfully');
      startTransition(() => {
        router.push('/invoices');
      });
    } catch (e: any) {
      console.log(e.message);
      toast.error(e.message);
    }
  };
  return (
    <div className='max-w-[384px] w-full flex flex-col'>
      <p className='text-[#888EB0] dark:text-[#DFE3FA] text-sm max-w-[384px]'>
        Are you sure you want to delete invoice # {invoice.invoiceNum}? This
        action cannot be undone.
      </p>
      <div className='flex gap-x-4 ml-6 mt-4'>
        <div className='flex ml-auto gap-x-5'>
          <Button label='Cancel' effect={close} neutral />
          <Button
            label='Delete'
            effect={deleteInvoice}
            danger
            loading={isMutating}
          />
        </div>
      </div>
    </div>
  );
}
