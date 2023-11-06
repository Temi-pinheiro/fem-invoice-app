import React, { useEffect, useRef, useState } from 'react';
import { Button } from '~/components/Form/Button/Button';
import './styles.css';
import { useSearchParams } from 'react-router-dom';

interface FilterProps {
  children: React.ReactNode;
  onFilter: (e: any) => void;
  onReset?: () => void;
}

const Filter = ({ children, onFilter, onReset }: FilterProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const formContainerRef = useRef<HTMLFormElement>(null);

  const setSearchParams = useSearchParams()[1];
  const handleOpen = (e: any): void => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };
  const handleReset = (e: any) => {
    onReset!();
    setSearchParams('');
    e.bubbles = false;
  };

  const handleBlur = (e: any): void => {
    e.bubbles = false;
    setIsOpen(false);
  };
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
      <button className='filter-box' onClick={handleOpen}>
        <span>Filter by</span>
        <svg
          width='16'
          height='16'
          viewBox='0 0 16 16'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M4 2C4.34189 2 4.62367 2.25736 4.66218 2.58892L4.66667 2.66667V4.78047C5.44346 5.05503 6 5.79585 6 6.66667C6 7.53748 5.44346 8.27831 4.66667 8.55286V13.3333C4.66667 13.7015 4.36819 14 4 14C3.65811 14 3.37633 13.7426 3.33782 13.4111L3.33333 13.3333V8.55286C2.55654 8.27831 2 7.53748 2 6.66667C2 5.79585 2.55654 5.05503 3.33333 4.78047V2.66667C3.33333 2.29848 3.63181 2 4 2ZM4 7.33333C4.36819 7.33333 4.66667 7.03486 4.66667 6.66667C4.66667 6.29848 4.36819 6 4 6C3.63181 6 3.33333 6.29848 3.33333 6.66667C3.33333 7.03486 3.63181 7.33333 4 7.33333ZM8.66667 8.78047V2.66667L8.66218 2.58892C8.62367 2.25736 8.34189 2 8 2C7.63181 2 7.33333 2.29848 7.33333 2.66667V8.78047C6.55654 9.05503 6 9.79585 6 10.6667C6 11.5375 6.55654 12.2783 7.33333 12.5529V13.3333L7.33782 13.4111C7.37633 13.7426 7.65811 14 8 14C8.36819 14 8.66667 13.7015 8.66667 13.3333V12.5529C9.44346 12.2783 10 11.5375 10 10.6667C10 9.79585 9.44346 9.05503 8.66667 8.78047ZM8.66667 10.6667C8.66667 11.0349 8.36819 11.3333 8 11.3333C7.63181 11.3333 7.33333 11.0349 7.33333 10.6667C7.33333 10.2985 7.63181 10 8 10C8.36819 10 8.66667 10.2985 8.66667 10.6667ZM12.6667 2.66667V2.78047C13.4435 3.05503 14 3.79585 14 4.66667C14 5.53748 13.4435 6.27831 12.6667 6.55286V13.3333C12.6667 13.7015 12.3682 14 12 14C11.6581 14 11.3763 13.7426 11.3378 13.4111L11.3333 13.3333V6.55286C10.5565 6.27831 10 5.53748 10 4.66667C10 3.79585 10.5565 3.05503 11.3333 2.78047V2.66667C11.3333 2.29848 11.6318 2 12 2C12.3419 2 12.6237 2.25736 12.6622 2.58892L12.6667 2.66667ZM12 5.33333C12.3682 5.33333 12.6667 5.03486 12.6667 4.66667C12.6667 4.29848 12.3682 4 12 4C11.6318 4 11.3333 4.29848 11.3333 4.66667C11.3333 5.03486 11.6318 5.33333 12 5.33333Z'
            fill='#3CB2FF'
          />
        </svg>
      </button>
      {isOpen && (
        <form
          onClick={(e) => e.stopPropagation()}
          onSubmit={onFilter}
          className='filter-options-container'
          ref={formContainerRef}
        >
          {children}
          <div className='grid grid-cols-2 gap-x-2'>
            <Button type='button' label='Reset' primary effect={handleReset} />
            <Button type='submit' label='Filter' />
          </div>
        </form>
      )}
    </div>
  );
};

export default Filter;
