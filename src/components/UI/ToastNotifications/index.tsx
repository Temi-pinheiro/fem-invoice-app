'use client';
import toast, { useToaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

export const ToastNotifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause, calculateOffset, updateHeight } = handlers;
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 200,
        bottom: 15,
        left: 0,
      }}
      className='flex w-full justify-center'
      onMouseEnter={() => startPause()}
      onMouseLeave={() => endPause()}
    >
      <AnimatePresence>
        {toasts.map((t: any) => {
          const offset = calculateOffset(t, {
            gutter: 8,
          });
          const ref = (el: HTMLDivElement) => {
            if (el && typeof t.height !== 'number') {
              const height = el.getBoundingClientRect().height;
              updateHeight(t.id, height);
            }
          };
          return (
            <motion.div
              key={t.id}
              ref={ref}
              style={{
                position: 'absolute',
                bottom: 0,
                transformOrigin: 'center',
                background:
                  t.type == 'error'
                    ? '#D92D20'
                    : t.type == 'success'
                    ? '#039855'
                    : t.type == 'custom'
                    ? '#00163C'
                    : '#DDA200',
              }}
              initial={{ opacity: 0, y: 100 + offset }}
              animate={{
                opacity: t.visible ? 1 : 0,
                y: 10 - offset,
              }}
              exit={{ opacity: 0, y: '100%' }}
              className='bg-black px-4 py-[14px] rounded-[4px] text-sm text-white flex items-center justify-between mx-auto w-[400px] break-words'
              {...t.ariaProps}
            >
              {t.type == 'success' || t.type == 'custom' ? (
                <SuccessIcon />
              ) : t.type == 'error' ? (
                <ErrorIcon />
              ) : (
                <WarningIcon />
              )}
              <span className='w-full text-center px-2 block'>{t.message}</span>
              <button onClick={() => toast.remove(t.id)}>
                <CloseIcon />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

const SuccessIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M20 6L9 17L4 12'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const WarningIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 8.00057V12.0006M12 16.0006H12.01M3 7.94202V16.0591C3 16.4018 3 16.5731 3.05048 16.7259C3.09515 16.8611 3.16816 16.9851 3.26463 17.0898C3.37369 17.2082 3.52345 17.2914 3.82297 17.4578L11.223 21.5689C11.5066 21.7264 11.6484 21.8052 11.7985 21.8361C11.9315 21.8634 12.0685 21.8634 12.2015 21.8361C12.3516 21.8052 12.4934 21.7264 12.777 21.5689L20.177 17.4578C20.4766 17.2914 20.6263 17.2082 20.7354 17.0898C20.8318 16.9851 20.9049 16.8611 20.9495 16.7259C21 16.5731 21 16.4018 21 16.0591V7.94202C21 7.59937 21 7.42805 20.9495 7.27525C20.9049 7.14008 20.8318 7.016 20.7354 6.91131C20.6263 6.79297 20.4766 6.70977 20.177 6.54337L12.777 2.43225C12.4934 2.2747 12.3516 2.19592 12.2015 2.16503C12.0685 2.1377 11.9315 2.1377 11.7985 2.16503C11.6484 2.19592 11.5066 2.2747 11.223 2.43225L3.82297 6.54337C3.52345 6.70977 3.37369 6.79297 3.26463 6.91131C3.16816 7.016 3.09515 7.14008 3.05048 7.27525C3 7.42805 3 7.59937 3 7.94202Z'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const ErrorIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M11.9998 8.99999V13M11.9998 17H12.0098M10.6151 3.89171L2.39019 18.0983C1.93398 18.8863 1.70588 19.2803 1.73959 19.6037C1.769 19.8857 1.91677 20.142 2.14613 20.3088C2.40908 20.5 2.86435 20.5 3.77487 20.5H20.2246C21.1352 20.5 21.5904 20.5 21.8534 20.3088C22.0827 20.142 22.2305 19.8857 22.2599 19.6037C22.2936 19.2803 22.0655 18.8863 21.6093 18.0983L13.3844 3.89171C12.9299 3.10654 12.7026 2.71396 12.4061 2.58211C12.1474 2.4671 11.8521 2.4671 11.5935 2.58211C11.2969 2.71396 11.0696 3.10655 10.6151 3.89171Z'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='white'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);
