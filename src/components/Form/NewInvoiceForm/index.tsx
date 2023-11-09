'use client';

import { useState } from 'react';
import { useForm } from '~/hooks/useForm';
import {
  initialData,
  initialDataSchema,
  billingAddrData,
  billingAddrSchema,
  receivingAddrSchema,
  receivingAddrData,
} from './data';

export default function NewInvoiceForm() {
  const { errors, formData, check } = useForm<typeof initialData>({
    initial: { ...initialData },
    schema: { ...initialDataSchema },
  });
  const {
    errors: billAddrErrors,
    formData: billAddrDara,
    check: billAddrCheck,
  } = useForm<typeof billingAddrData>({
    initial: { ...billingAddrData },
    schema: { ...billingAddrSchema },
  });
  const {
    errors: recAddrErrors,
    formData: recAddrData,
    check: recAddrCheck,
  } = useForm<typeof receivingAddrData>({
    initial: { ...receivingAddrData },
    schema: { ...receivingAddrSchema },
  });

  const createInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/invoice', {
      method: 'POST',
      body: JSON.stringify({
        ...formData,
        receivingAddress: { ...recAddrData },
        billingAddress: { ...billAddrDara },
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    await res.json();
  };

  return <form></form>;
}
