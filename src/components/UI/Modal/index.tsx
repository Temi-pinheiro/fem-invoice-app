import { motion, AnimatePresence } from 'framer-motion';
import React, { ReactNode, UIEvent, useState } from 'react';
import styles from './styles.module.css';
import { closeModal } from '~/providers';
const bgVariant = {
  enter: {
    opacity: 0,
  },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
  },
};

export const Modal = ({
  children,
  component,
  title,
  setModalOpen,
  id,
}: {
  children: ReactNode;
  title?: string;
  component?: ReactNode;
  id?: any;
  setModalOpen: (v: boolean) => void;
}) => {
  const close = closeModal();
  const [isOpen, setIsOpen] = useState(true);
  const [bgOpen, setBgOpen] = useState(true);
  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => setBgOpen(false), 120);
    setModalOpen && setModalOpen(false);
    id && setTimeout(() => close(id), 200);
  };
  const additionalProps = {
    close: handleClose,
  };
  return (
    <AnimatePresence key='modal background'>
      {bgOpen && (
        <motion.div
          initial='enter'
          animate='animate'
          // onClick={(e) => {
          //   e.preventDefault();
          //   e.bubbles = false;
          //   handleClose();
          // }}
          exit='exit'
          variants={bgVariant}
          className={styles.background}
        >
          <AnimatePresence mode='wait'>
            {isOpen && (
              <motion.div
                onClick={(e: UIEvent) => e.stopPropagation}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className='@container-normal'
                layout
              >
                <div
                  className={`${styles.container} ${title ? 'pt-12' : 'pt-8'}`}
                  onClick={(e: UIEvent) => e.stopPropagation}
                >
                  <div
                    className={`${
                      title ? 'border-b' : ''
                    } flex items-center px-6 py-4 w-full justify-between absolute top-0 bg-white z-10`}
                  >
                    <h2 className='text-lg font-medium'>{title}</h2>
                    <button
                      id='close-icon'
                      type='button'
                      className='group'
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </button>
                  </div>
                  <div
                    className={styles.component_container}
                    onClick={(e: UIEvent) => e.stopPropagation}
                  >
                    {children ? children : null}
                    {React.isValidElement(component)
                      ? React.cloneElement(component, additionalProps)
                      : component}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CloseIcon = () => (
  <svg
    width='14'
    height='15'
    viewBox='0 0 14 15'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13 1.5L1 13.5M1 1.5L13 13.5'
      stroke='#667085'
      className='transition ease-in-out duration-200 group-hover:stroke-red-500'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
