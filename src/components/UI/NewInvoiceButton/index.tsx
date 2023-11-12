'use client';
import { signIn, useSession } from 'next-auth/react';
import { Button } from '~/components';
import NewInvoiceForm from '~/components/Form/NewInvoiceForm';
import { slideInModal } from '~/providers/SideModalProvider';

export default function NewInvoiceButton() {
  const open = slideInModal();
  const { status, data: session } = useSession();
  return (
    <Button
      label={status == 'authenticated' ? 'New Invoice' : 'Login'}
      effect={() =>
        status == 'authenticated'
          ? open({ title: 'New Invoice', component: <NewInvoiceForm /> })
          : signIn()
      }
    />
  );
}
