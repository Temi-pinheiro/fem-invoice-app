import React from 'react';

export const StatusDot = ({
  status,
  color,
}: {
  status: string;
  color: string;
}) => {
  return (
    <span
      className='w-2 h-2 shrink-0 rounded-full ml-4 block'
      style={{ backgroundColor: color }}
    >
      {/* {status} */}
    </span>
  );
};
