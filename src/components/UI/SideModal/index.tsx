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
                onClick={(e: UIEvent) => e.stopPropagation}
                initial={{
                  x: window.innerWidth,
                  opacity: 0,
                }}
                animate={{
                  x: 1,
                  opacity: 1,
                  transition: {
                    type: 'tween',
                    ease: [0.4, 0.0, 0.2, 1],
                    duration: 0.3,
                  },
                }}
                exit={{ x: window.innerWidth, opacity: 0 }}
              >
                <div
                  className={styles.container}
                  onClick={(e: UIEvent) => e.stopPropagation}
                >
                  <div
                    className={`${
                      title ? 'border-b' : ''
                    } flex items-center px-6 pb-4 w-full justify-between`}
                  >
                    <h2 className='text-lg  font-medium'>{title}</h2>
                    <button
                      id='close-icon'
                      className='group'
                      onClick={handleClose}
                    >
                      <CloseIcon />
                    </button>
                  </div>
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
