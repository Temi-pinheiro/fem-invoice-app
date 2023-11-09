'use client';

import { useForm } from '~/hooks/useForm';
import {
  initialData,
  initialDataSchema,
  billingAddrData,
  billingAddrSchema,
  receivingAddrSchema,
  receivingAddrData,
} from './data';
import { TextInput } from '../TextInput';
import { SelectInput } from '../SelectInput';
import { Button } from '..';

export default function NewInvoiceForm() {
  const { errors, formData, check, update } = useForm<typeof initialData>({
    initial: { ...initialData },
    schema: { ...initialDataSchema },
  });
  const {
    errors: billAddrErrors,
    formData: billAddrDara,
    check: billAddrCheck,
    update: billAddrUpdate,
  } = useForm<typeof billingAddrData>({
    initial: { ...billingAddrData },
    schema: { ...billingAddrSchema },
  });
  const {
    errors: recAddrErrors,
    formData: recAddrData,
    update: recAddrUpdate,
    check: recAddrCheck,
  } = useForm<typeof receivingAddrData>({
    initial: { ...receivingAddrData },
    schema: { ...receivingAddrSchema },
  });

  const createInvoice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      ...formData,
      receivingAddress: { ...recAddrData },
      billingAddress: { ...billAddrDara },
    });
    // const res = await fetch('/api/invoice', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     ...formData,
    //     receivingAddress: { ...recAddrData },
    //     billingAddress: { ...billAddrDara },
    //   }),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });

    // await res.json();
  };

  return (
    <form className='w-full flex flex-col gap-y-12' onSubmit={createInvoice}>
      <section aria-label='bill to' className='flex flex-col mt-12'>
        <h5 className='text-violet-500 font-bold text-sm'>Bill To</h5>
        <TextInput
          label='Street Adrress'
          key='receaddradd'
          error={recAddrErrors.address}
          name='address'
          errorCheck={recAddrCheck}
          value={recAddrData.address}
          handleInputChange={recAddrUpdate}
        />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4 w-full'>
          <div className='grid grid-cols-2 gap-x-4 w-full lg:col-span-2'>
            <TextInput
              label='City'
              key='recaddrci'
              error={recAddrErrors.city}
              name='city'
              errorCheck={recAddrCheck}
              value={recAddrData.city}
              handleInputChange={recAddrUpdate}
            />
            <TextInput
              label='Postal Code'
              error={recAddrErrors.postCode}
              key='recaddrcod'
              name='postCode'
              errorCheck={recAddrCheck}
              value={recAddrData.postCode}
              handleInputChange={recAddrUpdate}
            />
          </div>
          <TextInput
            label='Country'
            error={recAddrErrors.country}
            name='country'
            key='receaddrcou'
            errorCheck={recAddrCheck}
            value={recAddrData.country}
            handleInputChange={recAddrUpdate}
          />
        </div>
      </section>
      <section aria-label='bill from' className='flex flex-col'>
        {' '}
        <h5 className='text-violet-500 font-bold text-sm'>Bill To</h5>
        <TextInput
          label="Client's Name"
          error={billAddrErrors.clientName}
          key='billaddrnam'
          name='clientName'
          errorCheck={billAddrCheck}
          value={billAddrDara.clientName}
          handleInputChange={billAddrUpdate}
        />
        <TextInput
          label="Client's email"
          error={billAddrErrors.email}
          type='email'
          key='billaddrema'
          name='email'
          errorCheck={billAddrCheck}
          value={billAddrDara.email}
          handleInputChange={billAddrUpdate}
        />
        <TextInput
          label='Street Adrress'
          error={billAddrErrors.address}
          name='address'
          key='billaddraddr'
          errorCheck={billAddrCheck}
          value={billAddrDara.address}
          handleInputChange={billAddrUpdate}
        />
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-x-4 w-full '>
          <div className='grid grid-cols-2 gap-x-4 w-full lg:col-span-2'>
            <TextInput
              label='City'
              error={billAddrErrors.city}
              name='city'
              key='billaddrci'
              errorCheck={billAddrCheck}
              value={billAddrDara.city}
              handleInputChange={billAddrUpdate}
            />
            <TextInput
              label='Postal Code'
              error={billAddrErrors.postCode}
              name='postCode'
              errorCheck={billAddrCheck}
              key='billadddrcod'
              value={billAddrDara.postCode}
              handleInputChange={billAddrUpdate}
            />
          </div>
          <TextInput
            label='Country'
            error={billAddrErrors.country}
            name='country'
            key='billaddrcou'
            errorCheck={billAddrCheck}
            value={billAddrDara.country}
            handleInputChange={billAddrUpdate}
          />
        </div>
      </section>
      <section aria-label='invoice deets' className='flex flex-col gap-y-2'>
        <div className='grid grid-cols-2 gap-x-6 w-full'>
          <TextInput
            label='Issue Date'
            type='date'
            key='issueda'
            error={errors.dueDate}
            name='dueDate'
            errorCheck={check}
            value={formData.dueDate}
            handleInputChange={update}
          />
          <SelectInput
            label='Payment Terms'
            options={[
              {
                value: 'Net 1 Day',
                label: 'Net1',
              },
              {
                value: 'Net 7 Days',
                label: 'Net7',
              },
              {
                value: 'Net 14 Days',
                label: 'Net14',
              },
              {
                value: 'Net 30 Days',
                label: 'Net30',
              },
            ]}
            key='paymentTermId'
            name='paymentTermId'
            placeholder='Please select terms'
            defaultValue={formData.paymentTermId}
            onChange={update}
          />
        </div>
        <TextInput
          label='Product Description'
          key='desc'
          error={errors.description}
          name='description'
          errorCheck={check}
          value={formData.description}
          handleInputChange={update}
        />
      </section>
      <section aria-label='items'></section>
      <div className='flex items-center w-full justify-between pb-8'>
        <Button label='Discard' neutral />
        <div className='gap-x-4 flex items-center ml-auto'>
          <Button label='Save as draft' draft />
          <Button label='Save & Send' type='submit' />
        </div>
      </div>
    </form>
  );
}
