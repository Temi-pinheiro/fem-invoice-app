import React from 'react';
import { Button } from '~/components/Form/Button/Button';
import { SearchBar } from '~/components/Form/SearchBar/SearchBar';
import IconContainer from '../IconContainer/IconContainer';
import styles from './styles.module.css';
import { CopyButton } from '../CopyButton';
import { useQueryClient } from '@tanstack/react-query';

const TopBar = () => {
  const qc = useQueryClient();
  const { web_app_url } = JSON.parse(localStorage.getItem('pecunia_admin')!);
  const admin: Admin = qc.getQueryData(['admin'], {
    type: 'all',
    exact: false,
  })!;
  return (
    <div className={styles.container}>
      <SearchBar onSearch={() => console.log('hello')} />
      <div className={styles.right}>
        <div className='flex items-end gap-x-2 mr-3'>
          <a
            className='text-primary-500 font-semibold'
            target='_blank'
            href={`https://${admin.web_app_url || web_app_url}`}
          >
            Your Web App
          </a>
          <CopyButton value={admin.web_app_url || web_app_url} />
        </div>
        {/* <IconContainer key='messages' type='rectangle'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.6668 2.66797H3.3335H3.3335C2.22893 2.66797 1.3335 3.5634 1.3335 4.66797V11.3346C1.3335 12.4392 2.22893 13.3346 3.3335 13.3346H12.6668C13.7714 13.3346 14.6668 12.4392 14.6668 11.3346V4.66797C14.6668 3.5634 13.7714 2.66797 12.6668 2.66797V2.66797ZM12.2214 4.0013L8.00141 7.16797L3.78141 4.0013H12.2214ZM12.6668 12.0013H3.3335C2.96531 12.0013 2.66683 11.7028 2.66683 11.3346V4.83464L7.60016 8.53464C7.71556 8.62118 7.85592 8.66797 8.00016 8.66797C8.14441 8.66797 8.28477 8.62118 8.40016 8.53464L13.3335 4.83464V11.3346C13.3335 11.7028 13.035 12.0013 12.6668 12.0013Z'
              fill='#213F7D'
            />
          </svg>
        </IconContainer>
        <IconContainer key='notifications' type='rectangle'>
          <svg
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M13.679 10.1416L12.479 8.93492V5.96158V5.96157C12.512 3.67847 10.856 1.72083 8.59899 1.37491V1.37491C6.13864 1.0509 3.88146 2.78275 3.55745 5.24311C3.53219 5.4349 3.51935 5.62813 3.51899 5.82158V8.93491L2.31899 10.1416H2.31899C1.89556 10.5721 1.90129 11.2643 2.33177 11.6877C2.53476 11.8874 2.80762 12 3.09233 12.0016H5.33233V12.2282V12.2282C5.39717 13.6374 6.58968 14.7285 7.999 14.6682C9.40832 14.7285 10.6008 13.6374 10.6657 12.2282V12.0016H12.9057C13.5095 11.9982 13.9962 11.5059 13.9928 10.9021C13.9913 10.6174 13.8787 10.3446 13.679 10.1416V10.1416ZM9.33325 12.228V12.228C9.25644 12.8942 8.66886 13.3819 7.99992 13.3346C7.33098 13.3819 6.7434 12.8942 6.66659 12.228V12.0013H9.33325V12.228ZM3.67232 10.6681L4.45899 9.88146C4.71102 9.63093 4.8526 9.29016 4.85232 8.9348V5.82146V5.82158C4.85303 4.9117 5.24671 4.04647 5.93224 3.4482L5.93224 3.4482C6.60879 2.83516 7.52034 2.54998 8.42566 2.66813C10.0197 2.92696 11.1798 4.3202 11.1457 5.9348V8.9348V8.9348C11.1436 9.28921 11.2827 9.62984 11.5323 9.88147L12.3257 10.6681L3.67232 10.6681Z'
              fill='#213F7D'
            />
          </svg>
        </IconContainer> */}
        <a
          className={styles.btn}
          href='https://lendsqr.freshdesk.com/support/solutions'
          target='_blank'
        >
          Guides
        </a>
      </div>
    </div>
  );
};

export default TopBar;
