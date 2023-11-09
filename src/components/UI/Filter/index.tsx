'use client';
import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import { CheckboxElement } from '~/components';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';

const Filter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const formContainerRef = useRef<HTMLFormElement>(null);

  const handleOpen = (e: any): void => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
    console.log(isOpen);
  };

  const changeFunction = (e: any) => params.set('filter', e.target.name);

  useEffect(() => {
    // Event listener for clicks outside the component
    const handleClickOutside = (e: any) => {
      if (
        formContainerRef.current &&
        !formContainerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener('click', handleClickOutside);

    return () => {
      // Clean up the event listener when the component is unmounted
      document.removeEventListener('click', handleClickOutside);
    };
  }, []); // Empty dependency array to ensure the effect runs only once
  return (
    <div className='filter-container relative w-max'>
      <button
        className='filter-box'
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>Filter by status</span>
        <motion.svg
          animate={{ rotate: isOpen ? 0 : 180 }}
          width='10'
          height='7'
          viewBox='0 0 10 7'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M1 1L5.2279 5.2279L9.4558 1'
            stroke='#7C5DFA'
            strokeWidth='2'
          />
        </motion.svg>
      </button>
      {/* {isOpen && ( */}
      <form
        onClick={(e) => e.stopPropagation()}
        className='filter-options-container'
        ref={formContainerRef}
      >
        <CheckboxElement
          key='draft'
          label='Draft'
          changeFunction={changeFunction}
          name='draft'
        />
        <CheckboxElement
          key='paid'
          label='Paid'
          changeFunction={changeFunction}
          name='paid'
        />
        <CheckboxElement
          key='pending'
          label='Pending'
          changeFunction={changeFunction}
          name='pending'
        />
        <CheckboxElement
          key='overdue'
          label='Overdue'
          changeFunction={changeFunction}
          name='overdue'
        />
      </form>
      {/* )} */}
    </div>
  );
};

export default Filter;
