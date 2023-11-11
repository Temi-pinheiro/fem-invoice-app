'use client';

import React from 'react';
import styles from './styles.module.css';
import { Invoice, Status } from '@prisma/client';
import { getFormattedDate, getFullMoney } from '~/utils/formatter';
import { StatusDot } from '../StatusDot';
import { StatusBox } from '../StatusBox/StatusBox';
import Link from 'next/link';

export default function InvoiceCard({
  invoice,
}: {
  invoice: {
    id: string;
    invoiceNum: string;
    dueDate: Date;
    amount: number;
    status: Status;
    billingAddress: {
      id: string;
      invoiceId: string;
      email: string;
      clientName: string;
      city: string;
      address: string;
      country: string;
      postCode: string;
    } | null;
  };
}) {
  return (
    <>
      <div className='bg-white dark:bg-[#1E2139] py-4 pl-8 pr-3 hidden md:flex items-center rounded-lg justify-evenly'>
        <span className='text-sm font-bold text-[#0C0E16] dark:text-white uppercase max-w-[100px] w-full'>
          <span className='text-[#7E88C3] dark:text-[#888EB0]'>#</span>{' '}
          {invoice.invoiceNum}
        </span>
        <span className='text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-medium max-w-[130px] w-full'>
          Due {getFormattedDate(invoice.dueDate)}
        </span>
        <span
          className='text-sm text-[#858BB2] dark:text-white w-full max-w-[120px] truncate'
          title={invoice.billingAddress?.clientName}
        >
          {invoice.billingAddress?.clientName}
        </span>
        <span className='font-bold text-[#0C0E16] dark:text-white w-full max-w-[150px] pr-[20px] truncate text-right'>
          {getFullMoney(invoice.amount)}
        </span>
        <StatusBox status={invoice.status} />
        <Link href={`/invoices/${invoice.id}`} className='self-end p-3'>
          <svg
            width='7'
            height='10'
            viewBox='0 0 7 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M1 1L5 5L1 9' stroke='#7C5DFA' strokeWidth='2' />
          </svg>
        </Link>
      </div>
      <div className='flex flex-col md:hidden p-6 bg-white dark:bg-[#1E2139] gap-y-6 rounded-lg'>
        <div className='flex w-full items-center justify-between'>
          <span className='text-sm font-bold  text-[#0C0E16] dark:text-white uppercase  '>
            <span className='text-[#7E88C3] dark:text-[#888EB0]'>#</span>{' '}
            {invoice.invoiceNum}
          </span>
          <span className='text-sm text-[#858BB2] dark:text-white '>
            {invoice.billingAddress?.clientName}
          </span>
        </div>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <span className='text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-medium  '>
              Due {getFormattedDate(invoice.dueDate)}
            </span>
            <span className='font-bold text-[#0C0E16] dark:text-white w-full max-w-[150px] truncate'>
              {getFullMoney(invoice.amount)}
            </span>
          </div>
          <StatusBox status={invoice.status} />
        </div>
      </div>
    </>
  );
}
