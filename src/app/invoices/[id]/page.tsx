import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';
import { Button } from '~/components';
import ActionButtons from '~/components/UI/ActionButtons';
import { StatusBox } from '~/components/UI/StatusBox/StatusBox';
import { prisma } from '~/lib/prisma';
import { getFormattedDate, getFullMoney } from '~/utils/formatter';

export async function generateMetadata({
  params,
}: {
  params: { id: any };
}): Promise<Metadata> {
  const invoice = await prisma.invoice.findUnique({ where: { id: params.id } });
  return { title: `Invoice #${invoice?.invoiceNum}` };
}
export default async function InvoicePage({ params }: { params: { id: any } }) {
  const invoice = await prisma.invoice.findUnique({
    where: { id: params.id },
    include: { billingAddress: true, receivingAddress: true, items: true },
  });
  const {
    amount,
    description,
    invoiceNum,
    paymentTermId,
    createdAt,
    dueDate,
    status,
    receivingAddress,
    billingAddress,
    items,
  } = invoice ?? {};
  return (
    <div className=' w-full h-full'>
      <div className='flex flex-col max-w-[730px] mx-auto h-full w-full mt-[34px] sm:mt-14 md:mt-[72px] px-6 lg:px-0 overlow-y-scroll'>
        <header className='flex flex-col gap-y-8'>
          <Link
            id='go-back'
            className='group flex items-center gap-x-4 dark:text-white text-[#0C0E16] mb-4 text-xs '
            href={'/invoices'}
          >
            <BackIcon />
            Go Back
          </Link>
          <div className='flex flex-row bg-white dark:bg-[#1E2139] py-4 pl-8 pr-3 items-center rounded-lg justify-between'>
            <div className='flex items-center md:gap-x-4 justify-between md:justify-normal w-full'>
              <span className='dark:text-white text-[#0C0E16] text-sm font-medium'>
                Status
              </span>
              <StatusBox status={status!} />
            </div>
            <div className='hidden md:flex items-center gap-x-4'>
              <ActionButtons invoice={invoice!} />
            </div>
          </div>
        </header>
        <div className='rounded-lg mt-4 md:mt-6 bg-white dark:bg-[#1E2139] p-6 md:p-8'>
          <section
            className='flex flex-col gap-y-[30px] md:flex-row w-full md:justify-between md:items-start'
            aria-label='receiving address info'
          >
            <div>
              <h2 className='text-sm md:text-lg font-bold text-[#0C0E16] dark:text-white uppercase max-w-[100px] w-full'>
                <span className='text-[#7E88C3] dark:text-[#888EB0]'>#</span>{' '}
                {invoiceNum}
              </h2>
              <span className='text-[#7E88C3] dark:text-[#DFE3FA] text-sm font-medium md:mt-2'>
                {description}
              </span>
            </div>
            <p className='text-[#7E88C3] dark:text-[#DFE3FA] text-sm md:text-right font-medium flex flex-col'>
              <span>{receivingAddress?.address}</span>
              <span>{receivingAddress?.city}</span>
              <span>{receivingAddress?.postCode}</span>
              <span>{receivingAddress?.country}</span>
            </p>
          </section>
          <section
            aria-label='invoice info'
            className='flex flex-col md:flex-row items-start md:gap-x-[130px] w-full mt-5'
          >
            <div className='flex items-start gap-x-11 md:gap-x-[100px] md:self-start mb-9 '>
              <div className='flex flex-col gap-y-8  md:shrink-0 md:max-w-[104px]'>
                <DisplayInfo
                  key='invoice date'
                  label='Invoice Date'
                  info={getFormattedDate(createdAt)}
                />
                <DisplayInfo
                  key='invoice due'
                  label='Invoice Due'
                  info={getFormattedDate(dueDate)}
                />
              </div>
              <div className='flex flex-col gap-y-2  md:shrink-0 md:max-w-[150px]'>
                <DisplayInfo
                  key='billing address'
                  label='Bill to'
                  info={billingAddress?.clientName!}
                />
                <p className='text-[#7E88C3] dark:text-[#DFE3FA] text-sm text-left font-medium flex flex-col'>
                  <span>{receivingAddress?.address},</span>
                  <span>{receivingAddress?.city},</span>
                  <span>{receivingAddress?.postCode},</span>
                  <span>{receivingAddress?.country}.</span>
                </p>
              </div>
            </div>
            <DisplayInfo
              key='client email'
              label='Sent to'
              info={billingAddress?.email!}
            />
          </section>
          <section
            aria-label='item section'
            className='rounded-lg mt-10 md:mt-12'
          >
            <div className='rounded-t-lg bg-[#F9FAFE] dark:bg-[#252945] p-6 md:p-8 md:pb-10'>
              <table className='hidden md:table w-full' cellPadding={16}>
                <thead className='text-[#7E88C3] dark:text-[#DFE3FA] font-medium'>
                  <tr>
                    <th align='left' colSpan={8} className='font-medium'>
                      Item Name
                    </th>
                    <th align='center' className='font-medium'>
                      QTY.
                    </th>
                    <th align='right' className='font-medium'>
                      Price
                    </th>
                    <th align='right' className='font-medium'>
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items?.map((item) => (
                    <tr key={item.id}>
                      <td
                        className={'text-[#0C0E16] dark:text-white font-bold'}
                        colSpan={8}
                        align='left'
                      >
                        {item.name}
                      </td>
                      <td
                        className={
                          ' text-[#7E88C3] dark:text-[#DFE3FA] font-bold'
                        }
                        align='center'
                      >
                        {item.quantity}
                      </td>
                      <td
                        className={
                          ' text-[#7E88C3] dark:text-[#DFE3FA] font-bold'
                        }
                        align='right'
                      >
                        {getFullMoney(item.price)}
                      </td>
                      <td
                        className={'text-[#0C0E16] dark:text-white font-bold'}
                        align='right'
                      >
                        {getFullMoney(item.quantity * item.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <ul className='md:hidden flex flex-col gap-y-8 w-full'>
                {items?.map((item) => (
                  <InlineItem
                    key={item.id}
                    price={item.price}
                    quantity={item.quantity}
                    itemName={item.name}
                  />
                ))}
              </ul>
            </div>
            <div className='rounded-b-lg bg-[#373B53] dark:bg-[#0C0E16] p-6 md:py-6 md:px-8 flex items-center justify-between text-white'>
              <span className='md:hidden text-sm'>Grand Total</span>
              <span className=' hidden md:inline text-sm'>Amount Due</span>
              <h1 className='font-bold text-xl md:text-2xl'>
                {getFullMoney(amount!)}
              </h1>
            </div>
          </section>
        </div>
      </div>
      <div
        aria-label='padding'
        className='md:hidden mt-10 self-stretch shrink-0'
        style={{
          paddingTop: items?.length! * 30 + 'px',
          paddingBottom: items?.length! * 30 + 'px',
        }}
      >
        <p className='opacity-0'>padding for the love of God</p>
      </div>
      <div className='flex absolute bottom-0 left-0 md:hidden items-center justify-evenly z-10 px-6 py-5 bg-white dark:bg-[#1E2139] w-full'>
        <ActionButtons invoice={invoice!} />
      </div>
    </div>
  );
}

const BackIcon = () => (
  <svg
    width='6'
    height='11'
    viewBox='0 0 6 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155'
      stroke='#7C5DFA'
      strokeWidth='2'
    />
  </svg>
);

const DisplayInfo = ({ label, info }: { label: string; info: string }) => (
  <div>
    <h3 className='text-sm text-[#7E88C3] dark:text-[#DFE3FA] font-medium'>
      {label}
    </h3>
    <span className='text-[#0C0E16] md:text-lg dark:text-white font-bold'>
      {info}
    </span>
  </div>
);
const InlineItem = ({
  quantity,
  price,
  itemName,
}: {
  quantity: number;
  price: number;
  itemName: string;
}) => (
  <div className='flex items-center w-full justify-between font-bold text-sm'>
    <div>
      <h3 className='  text-[#0C0E16] dark:text-white '>{itemName}</h3>
      <span className='text-[#7E88C3]  dark:text-[#888EB0] '>
        {quantity}x {getFullMoney(price)}
      </span>
    </div>
    <span className='text-[#0C0E16] dark:text-white '>
      {getFullMoney(quantity * price)}
    </span>
  </div>
);
