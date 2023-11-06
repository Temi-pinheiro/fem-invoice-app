import React from 'react';
import { useTable, useSortBy, Column } from 'react-table';
import styles from './styles.module.css';
import { AnimatePresence, motion } from 'framer-motion';
import Loader from '../Loader';

interface TableProps {
  cols: readonly Column<any>[] & any;
  rawData: any;
  clickFunction?: any;
  linkPrefix?: string;
  linkSuffix?: string;
  extra?: string;
  loading?: boolean;
  useData?: boolean;
  truncate?: boolean;
}

export const Table = ({
  cols,
  rawData,
  clickFunction,
  linkPrefix,
  linkSuffix,
  extra,
  loading,
  useData,
  truncate,
}: TableProps) => {
  const columns: readonly Column<any>[] = React.useMemo(
    () => [...cols],
    [cols]
  );
  const data = React.useMemo(() => [...rawData], [rawData]);
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        data,
        columns,
      },
      useSortBy
    );
  return (
    <div className='relative w-full'>
      <AnimatePresence mode='wait'>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='w-full h-full grid place-items-center backdrop-blur-lg z-[9] absolute inset-0'
          >
            <Loader big />
          </motion.div>
        )}
      </AnimatePresence>
      <table {...getTableProps()} className='w-full'>
        <thead className={styles.header_row}>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  align='left'
                  className={[
                    styles.table_header_cells,
                    truncate ? 'pl-3 first:ml-3' : 'pl-6 first:ml-6',
                  ].join(' ')}
                >
                  <span className='flex items-center gap-x-2'>
                    {column.render('Header')}
                    {column.canSort && (
                      <span>
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <DescIcon />
                          ) : (
                            <AscIcon />
                          )
                        ) : (
                          <SortIcon />
                        )}
                      </span>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row: any) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={clickFunction && styles.table_row}
                onClick={() =>
                  clickFunction
                    ? useData
                      ? clickFunction(row.original)
                      : clickFunction(
                          `${linkPrefix ? linkPrefix : ''}${row.original.id}${
                            linkSuffix ? linkSuffix : ''
                          }${extra ? row.original[extra] : ''}`
                        )
                    : ''
                }
              >
                {row.cells.map((cell: any) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={[
                        styles.table_cells,
                        truncate
                          ? 'max-w-[350px] px-3 truncate min-w-[200px]  last-of-type:min-w-0 '
                          : '',
                      ].join(' ')}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const DescIcon = () => (
  <svg
    width='10'
    height='14'
    viewBox='0 0 10 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.6665 9.00033L4.99984 12.3337L8.33317 9.00033M1.6665 5.00033L4.99984 1.66699L8.33317 5.00033'
      stroke='#667085'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

const SortIcon = () => (
  <svg
    width='10'
    height='14'
    viewBox='0 0 10 14'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.66699 9.00033L5.00033 12.3337L8.33366 9.00033M1.66699 5.00033L5.00033 1.66699L8.33366 5.00033'
      stroke='#667085'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);

const AscIcon = () => (
  <svg
    width='10'
    height='7'
    viewBox='0 0 10 7'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M1.66602 -2.00033L4.99935 -5.33366L8.33268 -2.00033M1.66602 1.99967L4.99935 5.33301L8.33268 1.99967'
      stroke='#D0D5DD'
      stroke-width='1.5'
      stroke-linecap='round'
      stroke-linejoin='round'
    />
  </svg>
);
