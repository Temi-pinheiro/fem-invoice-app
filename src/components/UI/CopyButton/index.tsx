import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';

export const CopyButton = ({ value }: { value: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 900);
  };
  return (
    <div className='relative h-5 '>
      <AnimatePresence mode='wait'>
        {copied ? (
          <motion.h3
            initial={{ opacity: 0, color: '#fff' }}
            animate={{ opacity: 1, color: '#213F7D' }}
            exit={{ opacity: 0, color: '#fff' }}
            transition={{
              opacity: { duration: 0.2, type: 'tween' },
              color: { duration: 0.3, delay: 0.1 },
            }}
            className=' text-sm text-[#667085] w-full'
          >
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M9.86107 17.9999C9.5839 17.9991 9.31954 17.8832 9.13107 17.6799L4.27107 12.5099H4.27107C3.89275 12.1068 3.9129 11.4733 4.31607 11.0949C4.71923 10.7166 5.35275 10.7368 5.73107 11.1399L9.85107 15.5299L18.2611 6.32995V6.32995C18.6069 5.89933 19.2363 5.83057 19.6669 6.17638C20.0975 6.52219 20.1663 7.15161 19.8205 7.58223C19.7958 7.61301 19.7692 7.6423 19.7411 7.66994L10.6011 17.6699C10.4143 17.8769 10.1498 17.9965 9.87106 17.9999L9.86107 17.9999Z'
                fill='#213F7D'
              />
            </svg>
          </motion.h3>
        ) : (
          <button onClick={handleCopyToClipboard}>
            <CopyIcon />
          </button>
        )}
      </AnimatePresence>
    </div>
  );
};

const CopyIcon = () => (
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clip-path='url(#clip0_479_89578)'>
      <path
        d='M13.3333 13.3346V15.668C13.3333 16.6014 13.3333 17.0681 13.1516 17.4246C12.9918 17.7382 12.7369 17.9932 12.4233 18.153C12.0668 18.3346 11.6 18.3346 10.6666 18.3346H4.33329C3.39987 18.3346 2.93316 18.3346 2.57664 18.153C2.26304 17.9932 2.00807 17.7382 1.84828 17.4246C1.66663 17.0681 1.66663 16.6014 1.66663 15.668V9.33464C1.66663 8.40121 1.66663 7.9345 1.84828 7.57798C2.00807 7.26438 2.26304 7.00941 2.57664 6.84962C2.93316 6.66797 3.39987 6.66797 4.33329 6.66797H6.66663M9.33329 13.3346H15.6666C16.6 13.3346 17.0668 13.3346 17.4233 13.153C17.7369 12.9932 17.9918 12.7382 18.1516 12.4246C18.3333 12.0681 18.3333 11.6014 18.3333 10.668V4.33464C18.3333 3.40121 18.3333 2.9345 18.1516 2.57798C17.9918 2.26438 17.7369 2.00941 17.4233 1.84962C17.0668 1.66797 16.6 1.66797 15.6666 1.66797H9.33329C8.39987 1.66797 7.93316 1.66797 7.57664 1.84962C7.26304 2.00941 7.00807 2.26438 6.84828 2.57798C6.66663 2.9345 6.66663 3.40121 6.66663 4.33464V10.668C6.66663 11.6014 6.66663 12.0681 6.84828 12.4246C7.00807 12.7382 7.26304 12.9932 7.57664 13.153C7.93316 13.3346 8.39987 13.3346 9.33329 13.3346Z'
        stroke='#213F7D'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
    <defs>
      <clipPath id='clip0_479_89578'>
        <rect width='20' height='20' fill='white' />
      </clipPath>
    </defs>
  </svg>
);
