'use client';
/* eslint-disable @next/next/no-img-element */
import { useSession, signIn, signOut } from 'next-auth/react';
import Loader from '../Loader';
import { toggleTheme } from '~/providers/ThemeProvider';

export default function NavBar() {
  const { status, data: session } = useSession();
  const toggle = toggleTheme();
  return (
    <div className='bg-gray-50 dark:bg-[#141625] md:h-screen'>
      <nav className='md:h-full w-full md:w-[103px] bg-[#1E2139]   md:rounded-r-[20px] flex flex-row md:flex-col'>
        <img
          src='/icon.svg'
          alt='icon'
          className='w-20 h-20 md:w-full md:h-max'
        />
        <div className='ml-auto md:mt-auto md:ml-0 flex md:flex-col flex-row w-max md:w-full'>
          <span className='md:w-full grid place-items-center px-6 md:px-0 md:pb-[28px]'>
            <button
              type='button'
              className='hidden dark:inline'
              onClick={toggle}
            >
              <Sun />
            </button>
            <button
              type='button'
              className='inline dark:hidden'
              onClick={toggle}
            >
              <Moon />
            </button>
          </span>
          <button
            onClick={() => (status === 'authenticated' ? signOut() : signIn())}
            disabled={status == 'loading'}
            className='md:w-full px-8 md:px-0 grid place-items-center md:py-6 md:border-t border-l  md:border-l-0 border-[#494E6E]'
          >
            {status === 'loading' ? (
              <Loader />
            ) : status === 'authenticated' ? (
              <img
                src={session?.user?.image || ''}
                alt='avatar'
                className='w-8 h-8 shrink-0 md:w-10 md:h-10 rounded-full object-cover object-center '
              />
            ) : (
              <img
                src='https://via.placeholder.com/40x40'
                alt='avatar'
                className='w-8 h-8 shrink-0 md:w-10 md:h-10 rounded-full object-cover object-center '
              />
            )}
          </button>
        </div>
      </nav>
    </div>
  );
}

const Sun = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clipPath='url(#clip0_52_334)'>
      <path
        d='M13.5446 6.45511C12.6451 5.55564 11.3753 4.97363 9.9996 4.97363C8.62394 4.97363 7.3541 5.52919 6.45463 6.45511C5.55516 7.35459 4.97314 8.62443 4.97314 10.0001C4.97314 11.3757 5.55516 12.6456 6.45463 13.5451C7.3541 14.4445 8.62394 15.0265 9.9996 15.0265C11.3753 15.0265 12.6451 14.471 13.5446 13.5451C14.444 12.6456 15.0261 11.3757 15.0261 10.0001C15.0261 8.62443 14.4705 7.35459 13.5446 6.45511Z'
        fill='#858BB2'
      />
      <path
        d='M9.99984 3.4127C10.3702 3.4127 10.6877 3.09524 10.6877 2.72487V0.68783C10.6877 0.31746 10.3702 0 9.99984 0C9.62947 0 9.31201 0.31746 9.31201 0.68783V2.72487C9.31201 3.09524 9.62947 3.4127 9.99984 3.4127Z'
        fill='#858BB2'
      />
      <path
        d='M15.6347 5.3441L17.0897 3.88908C17.3543 3.62452 17.3543 3.20124 17.0897 2.93669C16.8252 2.67214 16.4019 2.67214 16.1373 2.93669L14.6823 4.39172C14.4177 4.65627 14.4177 5.07955 14.6823 5.3441C14.9204 5.60865 15.3437 5.60865 15.6347 5.3441Z'
        fill='#858BB2'
      />
      <path
        d='M19.3123 9.31226H17.2752C16.9049 9.31226 16.5874 9.62972 16.5874 10.0001C16.5874 10.3705 16.9049 10.6879 17.2752 10.6879H19.3123C19.6826 10.6879 20.0001 10.3705 20.0001 10.0001C20.0001 9.62972 19.6826 9.31226 19.3123 9.31226Z'
        fill='#858BB2'
      />
      <path
        d='M15.6083 14.6562C15.3438 14.3916 14.9205 14.3916 14.6559 14.6562C14.3914 14.9207 14.3914 15.344 14.6559 15.6086L16.111 17.0636C16.3755 17.3281 16.7988 17.3281 17.0633 17.0636C17.3279 16.799 17.3279 16.3758 17.0633 16.1112L15.6083 14.6562Z'
        fill='#858BB2'
      />
      <path
        d='M9.99984 16.5872C9.62947 16.5872 9.31201 16.9046 9.31201 17.275V19.312C9.31201 19.6824 9.62947 19.9999 9.99984 19.9999C10.3702 19.9999 10.6877 19.6824 10.6877 19.312V17.275C10.6877 16.9046 10.3702 16.5872 9.99984 16.5872Z'
        fill='#858BB2'
      />
      <path
        d='M4.36486 14.6562L2.90984 16.1112C2.64529 16.3758 2.64529 16.799 2.90984 17.0636C3.17439 17.3281 3.59767 17.3281 3.86222 17.0636L5.31725 15.6086C5.5818 15.344 5.5818 14.9207 5.31725 14.6562C5.07915 14.3916 4.65587 14.3916 4.36486 14.6562Z'
        fill='#858BB2'
      />
      <path
        d='M3.4127 10.0001C3.4127 9.62972 3.09524 9.31226 2.72487 9.31226H0.68783C0.31746 9.31226 0 9.62972 0 10.0001C0 10.3705 0.31746 10.6879 0.68783 10.6879H2.72487C3.09524 10.6879 3.4127 10.3705 3.4127 10.0001Z'
        fill='#858BB2'
      />
      <path
        d='M4.36486 5.3441C4.62942 5.60865 5.0527 5.60865 5.31725 5.3441C5.5818 5.07955 5.5818 4.65627 5.31725 4.39172L3.86222 2.93669C3.59767 2.67214 3.17439 2.67214 2.90984 2.93669C2.64529 3.20124 2.64529 3.62452 2.90984 3.88908L4.36486 5.3441Z'
        fill='#858BB2'
      />
    </g>
    <defs>
      <clipPath id='clip0_52_334'>
        <rect width='20' height='20' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const Moon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M19.5016 11.3423C19.2971 11.2912 19.0927 11.3423 18.9137 11.4701C18.2492 12.0324 17.4824 12.4924 16.639 12.7991C15.8466 13.1059 14.9776 13.2592 14.0575 13.2592C11.9872 13.2592 10.0958 12.4158 8.74121 11.0611C7.38658 9.70649 6.54313 7.81512 6.54313 5.74483C6.54313 4.87582 6.69649 4.03237 6.95208 3.26559C7.23323 2.4477 7.64217 1.70649 8.17891 1.06751C8.40895 0.786362 8.35783 0.377416 8.07668 0.147384C7.89776 0.0195887 7.69329 -0.0315295 7.48882 0.0195887C5.31629 0.607448 3.42492 1.91096 2.07029 3.64898C0.766773 5.36144 0 7.48285 0 9.78317C0 12.5691 1.1246 15.0995 2.96486 16.9397C4.80511 18.78 7.3099 19.9046 10.1214 19.9046C12.4728 19.9046 14.6454 19.0867 16.3834 17.732C18.147 16.3519 19.4249 14.3838 19.9617 12.1346C20.0639 11.7768 19.8594 11.419 19.5016 11.3423Z'
      fill='#7E88C3'
    />
  </svg>
);
