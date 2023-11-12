import { motion, AnimatePresence } from 'framer-motion';
import React, { ReactNode, UIEvent, useState } from 'react';
import styles from './styles.module.css';
import { slideOutModal } from '~/providers/SideModalProvider';
const bgVariant = {
  enter: {
    opacity: 0,
  },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
  },
};

export const SideModal = ({
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
  const close = slideOutModal();
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
    <AnimatePresence key='side modal background'>
      {bgOpen && (
        <motion.div
          initial='enter'
          animate='animate'
          exit='exit'
          onClick={handleClose}
          variants={bgVariant}
          className={styles.background}
        >
          <AnimatePresence mode='wait'>
            {isOpen && (
              <motion.div
                onClick={(e: UIEvent) => e.stopPropagation()}
                initial={{
                  x: -206,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: {
                    type: 'tween',
                    ease: [0.4, 0.0, 0.2, 1],
                    duration: 0.3,
                  },
                }}
                exit={{
                  x: -window.innerWidth,
                  opacity: 0,
                  transition: {
                    type: 'tween',
                    ease: [0.4, 0.0, 0.2, 1],
                    duration: 0.3,
                  },
                }}
                className='w-full'
              >
                <div
                  className={styles.container}
                  onClick={(e: UIEvent) => e.stopPropagation}
                >
                  <header className='px-6 pb-3 pt-6 md:py-0 md:px-14  '>
                    <button
                      id='go-back'
                      className='group flex items-center gap-x-4 dark:text-white text-[#0C0E16] mb-4 text-xs md:hidden'
                      onClick={handleClose}
                    >
                      <BackIcon />
                      Go Back
                    </button>
                    <div className='flex items-center w-full justify-between '>
                      <h2 className='text-2xl text-[#0C0E16] dark:text-white font-bold'>
                        {title}
                      </h2>
                    </div>
                  </header>

                  <div className={styles.component_container}>
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

const BackIcon = () => (
  <svg
    width='6'
    height='11'
    viewBox='0 0 6 11'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M4.3418 0.885742L0.113895 5.11364L4.3418 9.34155'
      stroke='#7C5DFA'
      strokeWidth='2'
    />
  </svg>
);
