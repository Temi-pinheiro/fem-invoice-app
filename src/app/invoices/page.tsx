/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { Button } from '~/components';
import Filter from '~/components/UI/Filter';
import NewInvoiceButton from '~/components/UI/NewInvoiceButton';
import { prisma } from '~/lib/prisma';
export const metadata: Metadata = {
  title: 'Invoice App',
  description: "Let's get this bread",
};
export default async function InvoicesPage() {
  const session = await getServerSession();
  const currentUserName = session?.user?.name;
  const user = await prisma.user.findFirst({
    where: { name: currentUserName },
  });
  const invoices = await prisma.invoice.findMany({
    where: { userId: user?.id },
    select: {
      invoiceNum: true,
      dueDate: true,
      amount: true,
      status: true,
      billingAddress: true,
    },
  });
  return (
    <div className='flex flex-col max-w-[730px] w-full mt-[34px] sm:mt-14 md:mt-[72px]'>
      <header className='flex w-full justify-between items-center px-6 md:px-0'>
        <div>
          <h1 className='text-gray-950 dark:text-white md:text-[32px] font-bold'>
            Invoices
          </h1>
          <span className='text-sm font-medium text-slate-400 dark:text-indigo-100 '>
            {invoices.length == 0
              ? 'No invoices'
              : `There are ${invoices.length} total invoices`}
          </span>
        </div>
        <div className='flex items-center gap-x-5'>
          {/* <Filter /> */}

          <NewInvoiceButton />
        </div>
      </header>
      {invoices?.length > 0 ? (
        <div></div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center'>
          <img src='/empty.svg' alt='no invoices icon' />
          <section className='max-w-[218px] text-center mt-14'>
            <h2 className='font-bold text-[#0C0E16] dark:text-white text-xl'>
              There is nothing here
            </h2>
            <p className='text-sm text-[#0C0E16] dark:text-[#888EB0]  font-medium'>
              Create an invoice by clicking the{' '}
              <span className='text-semibold'>New Invoice</span> button and get
              started
            </p>
          </section>
        </div>
      )}
    </div>
  );
}
