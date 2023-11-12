'use client';

/* eslint-disable @next/next/no-img-element */

export default function InvoicesError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center'>
      <img src='/empty.svg' alt='no invoices icon' />
      <section className='max-w-[218px] text-center mt-14'>
        <h2 className='font-bold text-[#0C0E16] dark:text-white text-xl'>
          {error.name}
        </h2>
        <p className='text-sm text-[#0C0E16] dark:text-[#888EB0]  font-medium'>
          {error.message}
        </p>
      </section>
    </div>
  );
}
