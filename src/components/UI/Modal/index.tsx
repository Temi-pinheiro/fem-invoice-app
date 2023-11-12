'use client';
import { motion, AnimatePresence } from 'framer-motion';
import React, { ReactNode, UIEvent, useState } from 'react';
import styles from './styles.module.css';
import { closeModal } from '~/providers/ModalProvider';
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
          onClick={(e) => {
            e.preventDefault();
            e.bubbles = false;
            handleClose();
          }}
          exit='exit'
          variants={bgVariant}
          className={styles.background}
        >
          <AnimatePresence mode='wait'>
            {isOpen && (
              <motion.div
                onClick={(e: UIEvent) => e.stopPropagation()}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                // className='@container-normal'
                layout
              >
                <div
                  className={
                    'p-8 md:p-12 bg-white dark:bg-[#1E2139] rounded-lg'
                  }
                  onClick={(e: UIEvent) => e.stopPropagation}
                >
                  <h2 className='text-xl md:text-2xl text-[#0C0E16] dark:text-white font-bold'>
                    {title}
                  </h2>
                  <div
                    className='w-full h-full max-w-[384pxz]'
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
