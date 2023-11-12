import Loader from '../../UI/Loader';
import './styles.css';
import { Icon } from './Icon';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  draft?: boolean;
  neutral?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: boolean;
  rightIcon?: boolean;
  fullWidth?: boolean;
  icon?: any;
  effect?: any;
  label?: string;
  type?: 'button' | 'reset' | 'submit' | undefined;
}

export const Button = ({
  primary = false,
  secondary,
  fullWidth,
  neutral,
  danger = false,
  draft = false,
  leftIcon,
  rightIcon,
  icon,
  disabled = false,
  label = 'Button',
  type = 'button',
  effect,
  loading = false,
  ...props
}: ButtonProps) => {
  const mode = primary
    ? ' bg-[#7C5DFA] text-white hover:bg-[#9277FF] '
    : secondary
    ? 'bg-[#F9FAFE] dark:bg-[#252945] text-[#7E88C3] dark:text-[#DFE3FA] dark:hover:text-[#7E88C3] hover:bg-[#DFE3FA] dark:hover:bg-white '
    : draft
    ? 'bg-[#373B53] text-[#888EB0] dark:bg-[#373B53] dark:text-[#DFE3FA] hover:bg-[#0C0E16] dark:hover:bg-[#1E2139] duration-200 transition'
    : danger
    ? 'bg-[#EC5757] text-white hover:bg-[#F93A3A] '
    : neutral
    ? 'bg-[#F9FAFE] text-[#7E88C3] hover:bg-[#DFE3FA]'
    : ' bg-[#7C5DFA] text-white hover:bg-[#9277FF]  ';

  return (
    <button
      type={type}
      className={[
        'btn duration-200 transition ',
        `${mode}`,
        icon ? 'flex items-center gap-x-4' : '',
        fullWidth ? 'w-full' : '',
      ].join(' ')}
      disabled={disabled || loading}
      onClick={effect}
      {...props}
    >
      {loading ? (
        <span className='w-full grid place-items-center relative'>
          <span className='absolute z-10'>
            <Loader bgColor='#2C1DFF' />
          </span>
          <p className='opacity-0'>{label}</p>
        </span>
      ) : (
        <>
          {leftIcon && <Icon />}

          <span className='truncate'>{label}</span>
          {rightIcon && <Icon />}
        </>
      )}
    </button>
  );
};
