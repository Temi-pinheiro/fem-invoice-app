'use client';

import { Invoice, Status } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';
import ConfirmDelete from '~/actions/ConfirmDelete';
import { Button } from '~/components';
import EditInvoiceForm from '~/components/Form/EditInvoiceForm';
import { openModal } from '~/providers/ModalProvider';
import { slideInModal } from '~/providers/SideModalProvider';

export default function ActionButtons({ invoice }: { invoice: Invoice }) {
  const router = useRouter();
  const open = openModal();
  const slideIn = slideInModal();
  const [action, setAction] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
  const updateStatus = async (status: Status) => {
    setAction(status);
    setIsFetching(true);

    try {
      const res = await fetch(`/api/invoice/${invoice.id}/status`, {
        method: 'PUT',
        body: JSON.stringify({
          status,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsFetching(false);
      console.log(res);
      if (!res.ok) throw { message: res.statusText };
      startTransition(() => {
        router.refresh();
        toast.success('Invoice updated successfully');
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  return (
    <>
      {invoice.status == 'paid' ? null : (
        <Button
          label='Edit'
          neutral
          effect={() =>
            slideIn({
              title: `Edit #${invoice.invoiceNum}`,
              component: <EditInvoiceForm invoice={invoice} />,
            })
          }
        />
      )}
      <Button
        label='Delete'
        danger
        effect={() =>
          open({
            title: 'Confirm Delete',
            component: <ConfirmDelete invoice={invoice} />,
          })
        }
      />
      {invoice.status == 'pending' || invoice.status == 'overdue' ? (
        <Button
          label='Mark as Paid'
          effect={() => updateStatus('paid')}
          loading={action == 'paid' && isMutating}
        />
      ) : null}
      {invoice.status == 'draft' ? (
        <Button
          label='Mark as Pending'
          effect={() => updateStatus('pending')}
          loading={action == 'pending' && isMutating}
        />
      ) : null}
    </>
  );
}
