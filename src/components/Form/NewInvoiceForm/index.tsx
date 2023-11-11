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
import { useState, useTransition } from 'react';
import { v4 } from 'uuid';
import InvoiceItem from '../InvoiceItem';
import { AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function NewInvoiceForm({ close }: { close: () => void }) {
  const router = useRouter();
  const [action, setAction] = useState('');
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
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
  const [itemList, setItemList] = useState<
    Array<{
      id: string;
      name: string;
      quantity: number;
      price: number | undefined;
    }>
  >([]);
  const updateItem = (id: string, e: any) => {
    const [item] = itemList!.filter((it) => it.id == id);
    const newItem = {
      ...item,
      [e.target.name]:
        e.target.type == 'number' ? Number(e.target.value) : e.target.value,
    };
    const newItemList = [...itemList!];
    newItemList[itemList!.indexOf(item)] = newItem;
    setItemList([...newItemList]);
  };
  const addItem = () => {
    setItemList((prev) => [
      ...prev!,
      {
        id: v4(),
        name: '',
        quantity: 1,
        price: undefined,
      },
    ]);
  };
  const deleteItem = (id: string) => {
    const newItemList = itemList!.filter((item) => item.id != id);
    setItemList([...newItemList]);
  };
  const createInvoice = async (action: 'draft' | 'submit') => {
    //TODO add a dirty checker
    // if (errors || recAddrErrors || billAddrErrors) {
    //   toast.error('Please make sure you fill in all the required fields');
    //   return;
    // }
    setAction(action);
    setIsFetching(true);

    try {
      const res = await fetch('/api/invoice', {
        method: 'POST',
        body: JSON.stringify({
          ...formData,
          status: action == 'draft' ? 'draft' : 'pending',
          receivingAddress: { ...recAddrData },
          billingAddress: { ...billAddrDara },
          items: [...itemList],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setIsFetching(false);
      console.log(res);
      if (!res.ok) throw { message: res.statusText };
      toast.success('Invoice created successfully');
      startTransition(() => {
        router.refresh();
        close();
      });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <form className='w-full flex flex-col gap-y-12'>
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
                label: 'Net 1 Day',
                value: 'Net1',
              },
              {
                label: 'Net 7 Days',
                value: 'Net7',
              },
              {
                label: 'Net 14 Days',
                value: 'Net14',
              },
              {
                label: 'Net 30 Days',
                value: 'Net30',
              },
            ]}
            key='paymentTermId'
            name='paymentTermId'
            placeholder='Please select terms'
            // defaultValue={formData.paymentTermId}
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
        <section aria-label='items' className='flex flex-col gap-y-6'>
          <h3 className='text-lg text-slate-500 font-bold'>Item List</h3>
          <ul className='w-full flex flex-col  '>
            <AnimatePresence mode='popLayout' initial={false}>
              {itemList?.map((item) => (
                <InvoiceItem
                  key={item.id}
                  item={item}
                  updateFunc={updateItem}
                  deleteFunc={deleteItem}
                />
              ))}
            </AnimatePresence>
          </ul>
          <Button label='+ Add New Item' fullWidth draft effect={addItem} />
        </section>
      </section>
      <div className='flex items-center w-full justify-between pb-8'>
        <Button label='Discard' neutral effect={close} />
        <div className='gap-x-4 flex items-center ml-auto'>
          <Button
            label='Save as draft'
            draft
            effect={() => createInvoice('draft')}
            loading={isMutating && action == 'draft'}
          />
          <Button
            label='Save & Send'
            effect={() => createInvoice('submit')}
            loading={isMutating && action == 'submit'}
          />
        </div>
      </div>
    </form>
  );
}
