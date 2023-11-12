export const dynamic = 'force-dynamic';
export const revalidate = 1;

/* eslint-disable @next/next/no-img-element */
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import InvoiceCard from '~/components/UI/Card';
import NewInvoiceButton from '~/components/UI/NewInvoiceButton';
import { prisma } from '~/lib/prisma';
import { authOptions } from '../api/auth/[...nextauth]/route';
import InvoiceCardList from '~/components/UI/InvoiceCardList';
export const metadata: Metadata = {
  title: 'Invoice App',
  description: "Let's get this bread",
};
export default async function InvoicesPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    const email = session?.user?.email;
    const user = await prisma.user.findFirst({
      where: { email },
    });
    const invoices = await prisma.invoice.findMany({
      where: { userId: user?.id },
      select: {
        id: true,
        invoiceNum: true,
        dueDate: true,
        amount: true,
        status: true,
        billingAddress: true,
      },
      orderBy: {
        dueDate: 'desc',
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
          <InvoiceCardList invoices={invoices} />
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <img src='/empty.svg' alt='no invoices icon' />
            <section className='max-w-[218px] text-center mt-14'>
              <h2 className='font-bold text-[#0C0E16] dark:text-white text-xl'>
                There is nothing here
              </h2>
              <p className='text-sm text-[#0C0E16] dark:text-[#888EB0]  font-medium'>
                Create an invoice by clicking the{' '}
                <span className='text-semibold'>New Invoice</span> button and
                get started
              </p>
            </section>
          </div>
        )}
        <div
          aria-label='padding'
          className='md:hidden mt-10 self-stretch shrink-0 py-10'
        >
          <p className='opacity-0'>padding for the love of God</p>
        </div>
      </div>
    );
  } else {
    const invoices: any = [];
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
          <ul className='flex flex-col gap-y-4 mt-14 p-6 md:p-0'>
            {invoices.map((invoice: any) => (
              <InvoiceCard key={invoice.id} invoice={invoice} />
            ))}
          </ul>
        ) : (
          <div className='w-full h-full flex flex-col items-center justify-center'>
            <img src='/empty.svg' alt='no invoices icon' />
            <section className='max-w-[218px] text-center mt-14'>
              <h2 className='font-bold text-[#0C0E16] dark:text-white text-xl'>
                There is nothing here
              </h2>
              <p className='text-sm text-[#0C0E16] dark:text-[#888EB0]  font-medium'>
                To create an invoice{session ? 'click' : ' start by clicking '}
                the{' '}
                <span className='text-semibold'>
                  {session ? 'New Invoice' : 'Login'}
                </span>{' '}
                button and get started
              </p>
            </section>
          </div>
        )}
      </div>
    );
  }
}
