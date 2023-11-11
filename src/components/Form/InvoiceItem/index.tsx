'use client';
import { motion } from 'framer-motion';
import { TextInput } from '../TextInput';
export default function InvoiceItem({
  item,
  updateFunc,
  deleteFunc,
}: {
  item: {
    id: string;
    name: string;
    quantity: number;
    price: number | undefined;
  };
  updateFunc: (id: string, e: any) => void;
  deleteFunc: (id: any) => void;
}) {
  const handleUpdate = (e: any) => updateFunc(item.id, e);
  return (
    <motion.div
      initial={{ height: 0, x: -500, opacity: 0 }}
      animate={{
        height: 'auto',
        x: 0,
        opacity: 1,
        transition: {
          type: 'tween',
          ease: [0.4, 0.0, 0.2, 1],
          duration: 0.3,
        },
      }}
      exit={{
        x: 300,
        opacity: 0,
        height: 0,
        transition: { height: { delay: 0.3 }, opacity: 0.1 },
      }}
    >
      <div className='w-full flex items-center gap-x-4 flex-wrap md:flex-nowrap'>
        <div className='w-full md:max-w-[200px]'>
          <TextInput
            name='name'
            label='Item name'
            handleInputChange={handleUpdate}
            value={item.name}
          />
        </div>
        <div className='flex items-center gap-x-4 w-full'>
          <div className='md:max-w-[60px]'>
            <TextInput
              name='quantity'
              label='Qty.'
              type='number'
              handleInputChange={handleUpdate}
              value={item.quantity}
            />
          </div>
          <div className='md:max-w-[100px]'>
            <TextInput
              name='price'
              label='Price'
              placeholder='0'
              type='number'
              handleInputChange={handleUpdate}
              value={item.price}
            />
          </div>
          <span className='text-slate-400 dark:text-indigo-100 font-bold text-sm w-full'>
            {(Number(item.price || 0) * item.quantity).toFixed(2)}
          </span>
          <button onClick={() => deleteFunc(item.id)} className='group w-fit'>
            <svg
              width='13'
              height='16'
              viewBox='0 0 13 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='fill-[#888EB0] group-hover:fill-red-500 transition'
            >
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.47222 0L9.36113 0.888875H12.4722V2.66667H0.0278015V0.888875H3.13888L4.0278 0H8.47222ZM2.69447 16C1.71222 16 0.916677 15.2045 0.916677 14.2222V3.55554H11.5833V14.2222C11.5833 15.2045 10.7878 16 9.80559 16H2.69447Z'
              />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
