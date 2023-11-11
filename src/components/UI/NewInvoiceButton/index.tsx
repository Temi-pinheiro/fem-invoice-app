'use client';
import { Button } from '~/components';
import NewInvoiceForm from '~/components/Form/NewInvoiceForm';
import { slideInModal } from '~/providers/SideModalProvider';

export default function NewInvoiceButton() {
  const open = slideInModal();
  return (
    <Button
      label='New Invoice'
      effect={() =>
        open({ title: 'New Invoice', component: <NewInvoiceForm /> })
      }
    />
  );
}
