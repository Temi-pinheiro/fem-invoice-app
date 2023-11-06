import styles from './styles.module.css';
interface ExpandableButtonProps {
  leftIcon?: boolean;
  rightIcon?: boolean;
  rightSide?: boolean;
  icon?: any;
  buttons: Array<{
    label: string;
    effect: (v?: any) => void;
    icon?: any;
    show: boolean;
  }>;
  label?: string;
}

export const ExpandableButton = ({
  leftIcon,
  rightIcon,
  rightSide,
  icon,
  buttons,
  label,
}: ExpandableButtonProps) => {
  return (
    <div className='relative '>
      <button
        className={[
          styles.btn,
          'bg-white text-black hover:ring-1 duration-200 transition w-full ring-offset-1 ring-[#EBECF0] shadow-md border border-[#EBECF0]',
          'peer ',
          icon ? 'flex items-center gap-x-3' : '',
        ].join(' ')}
      >
        {leftIcon && icon}

        <span>{label}</span>
        {rightIcon && icon}
      </button>

      <div
        className={[
          'peer-focus:flex',
          !rightSide ? 'right-0' : 'left-0',
          styles.expanded_container,
        ].join(' ')}
        onClick={(e) => e.stopPropagation()}
      >
        {buttons
          .filter((btn) => btn.show)
          .map((btn, index) => (
            <button
              className={styles.expanded_items}
              key={index}
              onClick={btn.effect}
            >
              {btn.label}
            </button>
          ))}
      </div>
    </div>
  );
};
