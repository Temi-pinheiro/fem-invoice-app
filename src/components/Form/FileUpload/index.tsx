export const FileUpload = ({
  file,
  acceptedFiles,
  maxSize,
  effect,
  reset,
  label,
  required,
}: {
  file: Blob;
  acceptedFiles: Array<string>;
  maxSize: number;

  effect: (v: any) => void;
  reset: () => void;
  label: string;
  required: boolean;
}) => {
  const formatFileSize = (size: number) => {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;

    while (size >= 1024 && index < units.length - 1) {
      size /= 1024;
      index++;
    }

    return `${size.toFixed(2)} ${units[index]}`;
  };
  const renderAcceptedFiles = () => {
    return acceptedFiles.map((fileType) => fileType.split('/')[1]).join(',');
  };

  return file ? (
    <div className='flex items-center py-3 px-2 bg-[#F3F4F9] justify-between'>
      <div className='flex items-center gap-x-3'>
        {file.type.includes('image') ? <PhotoIcon /> : <DocIcon />}

        <p className='text-sm'>{file.name}</p>
      </div>
      <button type='button' onClick={reset}>
        <CloseIcon />
      </button>
    </div>
  ) : (
    <div>
      <label htmlFor='file-upload' className='flex flex-col gap-y-2 mb-2'>
        <span className='text-sm'>{label}</span>
        <span className='border-2 border-[#CBD1EC] flex items-center gap-x-2 justify-center border-dashed py-[10px] rounded-[4px] '>
          <PlusIcon />
          Add Media
        </span>
      </label>
      <input
        type='file'
        id='file-upload'
        accept={acceptedFiles.join(',')}
        onChange={effect}
        className='hidden'
        required={required}
      />

      <p className='text-sm text-gray-500'>
        {renderAcceptedFiles()} are acceupted up to {formatFileSize(maxSize)}
      </p>
    </div>
  );
};

const PlusIcon = () => (
  <svg
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 5V19M5 12H19'
      stroke='black'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

const PhotoIcon = () => (
  <svg
    width='40'
    height='40'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clip-path='url(#clip0_692_13854)'>
      <path
        d='M14 12.6667V3.33333C14 2.6 13.4 2 12.6667 2H3.33333C2.6 2 2 2.6 2 3.33333V12.6667C2 13.4 2.6 14 3.33333 14H12.6667C13.4 14 14 13.4 14 12.6667ZM5.93333 9.32L7.33333 11.0067L9.4 8.34667C9.53333 8.17333 9.8 8.17333 9.93333 8.35333L12.2733 11.4733C12.44 11.6933 12.28 12.0067 12.0067 12.0067H4.01333C3.73333 12.0067 3.58 11.6867 3.75333 11.4667L5.41333 9.33333C5.54 9.16 5.79333 9.15333 5.93333 9.32Z'
        fill='#2C1DFF'
      />
    </g>
    <defs>
      <clipPath id='clip0_692_13854'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const DocIcon = () => (
  <svg
    width='40'
    height='40'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <g clip-path='url(#clip0_692_13899)'>
      <path
        d='M3.99996 1.33301C3.26663 1.33301 2.67329 1.93301 2.67329 2.66634L2.66663 13.333C2.66663 14.0663 3.25996 14.6663 3.99329 14.6663H12C12.7333 14.6663 13.3333 14.0663 13.3333 13.333V5.88634C13.3333 5.53301 13.1933 5.19301 12.94 4.94634L9.71996 1.72634C9.47329 1.47301 9.13329 1.33301 8.77996 1.33301H3.99996ZM8.66663 5.33301V2.33301L12.3333 5.99967H9.33329C8.96663 5.99967 8.66663 5.69967 8.66663 5.33301Z'
        fill='#D00000'
      />
    </g>
    <defs>
      <clipPath id='clip0_692_13899'>
        <rect width='16' height='16' fill='white' />
      </clipPath>
    </defs>
  </svg>
);

const CloseIcon = () => (
  <svg
    width='16'
    height='16'
    viewBox='0 0 16 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12 4L4 12M4 4L12 12'
      stroke='#6C798F'
      stroke-width='2'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);
