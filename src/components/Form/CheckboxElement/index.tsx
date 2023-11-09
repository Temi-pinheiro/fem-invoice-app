import styles from './styles.module.css';

interface CheckboxElementProps {
  label: string;
  disabled?: boolean;
  name: string;
  checked?: boolean;
  changeFunction: (e: any) => void;
}

export const CheckboxElement = ({
  label,
  name,
  checked,
  disabled,
  changeFunction,
}: CheckboxElementProps) => {
  return (
    <div className={styles.container}>
      <input
        type='checkbox'
        id={name}
        name={name}
        checked={checked}
        onChange={changeFunction}
        disabled={disabled}
      />
      <label htmlFor={name}>{label}</label>
    </div>
  );
};
