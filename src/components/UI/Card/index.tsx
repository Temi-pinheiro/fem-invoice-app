'use client';

import React from 'react';
import { Status } from '@prisma/client';
import { getFormattedDate, getFullMoney } from '~/utils/formatter';
import { motion } from 'framer-motion';
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
    <motion.div
      initial={{ height: 0, x: -500, opacity: 0 }}
      animate={{
        height: 'auto',
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          ease: [0.4, 0.0, 0.2, 1],
          duration: 0.3,
        },
      }}
      exit={{
        x: 300,
        opacity: 0,
        height: 0,
        transition: { height: { delay: 0.3 }, opacity: 0.1 },
      }}
    >
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
        <Link
          href={`/invoices/${invoice.id}`}
          prefetch={false}
          className='self-end p-3'
        >
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
      <Link
        className='flex flex-col md:hidden p-6 bg-white dark:bg-[#1E2139] gap-y-6 rounded-lg'
        href={`/invoices/${invoice.id}`}
        prefetch={false}
      >
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
      </Link>
    </motion.div>
  );
}
