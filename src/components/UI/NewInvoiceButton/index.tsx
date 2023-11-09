import { Button } from '~/components';
import { slideInModal } from '~/providers/SideModalProvider';

export default function NewInvoiceForm(data: any) {
  const createInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/invoice', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await res.json();
  };
  return <form></form>;
}
