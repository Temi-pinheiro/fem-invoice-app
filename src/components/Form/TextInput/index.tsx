import React, { RefObject } from 'react';
import styles from './styles.module.css';
interface TextInputProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  type?: 'text' | 'email' | 'number' | 'tel' | 'url' | 'date';
  name: string;
  hint?: string;
  errorCheck?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  value?: string | number | undefined;
  autoFocus?: boolean;
  refObject?: RefObject<HTMLInputElement>;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  props?: TextInputProps;
  readOnly?: boolean;
}
export const TextInput = ({
  label,
  placeholder,
  type = 'text',
  required = false,
  name,
  errorCheck,
  autoFocus = false,
  value = '',
  readOnly,
  hint,
  error,
  handleInputChange,
  ...props
}: TextInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number' && !/^\d*\.?\d*$/.test(e.target?.value)) {
      // Ignore non-numeric or non-decimal input when type is "number ""
      return;
    }
    if (type === 'tel' && isNaN(Number(e.target.value))) {
      // Ignore non-numeric input when type is "number"
      return;
    }
    handleInputChange!(e);
  };
  return (
    <div className={error ? styles.input_error : styles.input_container}>
      {label && (
        <label className={styles.input_label} htmlFor={name}>
          {label}
          {required && <span className={styles.input_required}></span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        onBlur={errorCheck}
        autoFocus={autoFocus}
        required={required}
        type={type}
        id={name}
        name={name}
        className={styles.input_field}
        readOnly={readOnly}
        {...props}
      />
      {error ? <span className='text-sm text-[#EC5757]'>{error}</span> : null}
      <span className='text-sm text-[#667085]'>{hint}</span>
    </div>
  );
};
