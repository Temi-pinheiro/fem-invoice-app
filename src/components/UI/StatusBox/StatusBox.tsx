interface StatusBoxProps {
  status: 'paid' | 'overdue' | 'draft' | 'pending';
}

export const StatusBox = ({ status }: StatusBoxProps) => {
  let color = '';

  switch (status?.toLowerCase()) {
    case 'paid':
      color = '#33D69F';
      break;
    case 'pending':
      color = '#FF8F00';
      break;
    case 'draft':
      color = '#DFE3FA';
      break;
    case 'overdue':
      color = '#EC5757';
      break;

    default:
      color = '#FF8F00';
      break;
  }
  return (
    <span
      className={`w-[104px] h-10 relative rounded-mg flex items-center justify-center gap-x-2 font-bold rounded-md text-sm`}
    >
      <span
        className='absolute w-full h-full inset-0 opacity-5 rounded-md'
        style={{ background: color }}
      ></span>
      <span
        className='w-2 h-2 rounded-full'
        style={{ backgroundColor: color, opacity: 1 }}
      ></span>{' '}
      <span style={{ color }}>{status[0].toUpperCase() + status.slice(1)}</span>
    </span>
  );
};
