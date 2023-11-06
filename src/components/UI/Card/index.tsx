import React, { ReactNode, useState } from 'react';
import styles from './styles.module.css';

export const InformationCard = ({
  title,
  children,
  showing,
  hasExtra = true,
  extra,
}: {
  title: string;
  hasExtra?: boolean;
  children: ReactNode | ReactNode[];
  extra?: ReactNode;
  showing?: boolean;
}) => {
  const [showMore, setShowMore] = useState(() => (extra ? true : showing));
  return (
    <div className={styles.sub_container}>
      <div className={styles.info_container}>
        <div className='flex w-full items-center justify-between'>
          <h1 className={styles.header}>{title}</h1>
          {hasExtra ? (
            extra ? (
              extra
            ) : (
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className='text-sm underline text-secondary-600'
              >
                {showMore ? 'Show Less' : 'Show more'}
              </button>
            )
          ) : null}
        </div>
        <div className={styles.info_wrapper}>
          {showMore ? <>{children}</> : null}
        </div>
      </div>
    </div>
  );
};
