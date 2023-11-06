export const ViewInfo = ({ title, value }: { title: string; value: any }) => {
  return (
    <div className='flex flex-col @container'>
      <h4 className=' font-medium text-sm'>{title}</h4>
      <span className='text-[#6C798F] text-sm max-w-[135px] @[178px]:max-w-none break-words '>
        {value || '-'}
      </span>
    </div>
  );
};
