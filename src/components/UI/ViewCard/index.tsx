import { ReactNode } from 'react';

export const ViewCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode | ReactNode[];
}) => {
  return (
    <div className='flex flex-col gap-y-2'>
      <h3 className='text-lg font-medium'>{title}</h3>
      <div className='grid grid-cols-4 w-full gap-y-6 bg-white border rounded-md p-6'>
        {children}
      </div>
    </div>
  );
};
