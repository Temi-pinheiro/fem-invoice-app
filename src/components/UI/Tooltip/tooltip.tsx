import React from 'react';
import styles from './styles.module.css';

export interface TooltipProps {
  content: string;
  children?: string | React.ReactNode; //this is the parent Item
  className?: string;
}

export default function Tooltip({
  className,
  children = <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M0.333984 6.99967C0.333984 3.31778 3.31875 0.333008 7.00065 0.333008C10.6825 0.333008 13.6673 3.31778 13.6673 6.99967C13.6673 10.6816 10.6825 13.6663 7.00065 13.6663C3.31875 13.6663 0.333984 10.6816 0.333984 6.99967ZM12.334 6.99967C12.334 4.05416 9.94617 1.66634 7.00065 1.66634C4.05513 1.66634 1.66732 4.05416 1.66732 6.99967C1.66732 9.94519 4.05513 12.333 7.00065 12.333C9.94617 12.333 12.334 9.94519 12.334 6.99967ZM7.00033 3.6665C7.34222 3.6665 7.624 3.92386 7.66251 4.25542L7.66699 4.33317V6.99984C7.66699 7.36803 7.36852 7.6665 7.00033 7.6665C6.65844 7.6665 6.37665 7.40914 6.33814 7.07758L6.33366 6.99984V4.33317C6.33366 3.96498 6.63214 3.6665 7.00033 3.6665ZM7.67366 9.6665C7.67366 9.29831 7.37518 8.99984 7.00699 8.99984L6.92258 9.00432C6.59102 9.04283 6.33366 9.32461 6.33366 9.6665C6.33366 10.0347 6.63214 10.3332 7.00033 10.3332L7.08474 10.3287C7.4163 10.2902 7.67366 10.0084 7.67366 9.6665Z" fill="#3CB2FF"/>
  </svg>,
  content,
}: TooltipProps) {
  return (
    <div className={`${styles.tooltip} ${className ? className : ''}`}>
      <div>{children}</div>
      <div className={`${styles.tooltip_content}`}>{content}</div>
    </div>
  );
}
