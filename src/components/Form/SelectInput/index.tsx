/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import './styles.css';
import { AnimatePresence, motion } from 'framer-motion';

interface SelectElementProps {
  label?: string;
  defaultValue?: any;
  options: {
    value: string | number | any;
    label: string;
  }[];
  hint?: string;
  placeholder?: string;
  name: string;
  required?: boolean;
  useLabel?: boolean;

  onChange: (v: any) => void;
}

export const SelectInput = ({
  label,
  options,
  name,
  useLabel,
  defaultValue,
  onChange,
  placeholder,
  required = false,
  hint,
}: SelectElementProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);
  // const [value, setValue] = useState('');
  const handleSelect = (option: any) => {
    onChange({
      target: {
        name: name,
        value: useLabel ? option.label : option.value,
        label: option.label,
      },
    });
    // setValue(option.label);
    setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  const getLabel = (selected: any) => {
    const [option] = options.filter((op) => op.value == selected);
    return option?.label;
  };

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        dropdownContainerRef.current &&
        !dropdownContainerRef.current.contains(e.target)
      ) {
        handleClose();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      {label && (
        <label className='select-label' htmlFor={name}>
          {label}
          {required && <span className='input--required'></span>}
        </label>
      )}
      <div className=' relative select-input ' ref={dropdownContainerRef}>
        <button className='w-full text-left' onClick={handleOpen} type='button'>
          {getLabel(defaultValue) || placeholder}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className='dropdown-options-container'
            >
              {options.map((option) => (
                <li key={option.value} onClick={() => handleSelect(option)}>
                  {option.label}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
        <button
          type='button'
          className='absolute right-2 top-4'
          onClick={handleOpen}
        >
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6 9L12 15L18 9'
              stroke='#7C5DFA'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </motion.svg>
        </button>
      </div>

      <span className='text-sm font-medium  '>{hint}</span>
    </div>
  );
};
