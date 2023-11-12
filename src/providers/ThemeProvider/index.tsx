/* eslint-disable react-hooks/rules-of-hooks */
'use client';

import { createContext, useContext, useState } from 'react';

export const ThemeContext = createContext<any>({});

const ThemeProvider = ({ children }: any) => {
  const [theme, setTheme] = useState('light'); // You can set the default theme here

  const toggler = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={toggler}>
      <div className='w-full h-full' data-mode={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const toggleTheme = () => {
  const toggler: () => void = useContext(ThemeContext);
  return () => toggler();
};

export default ThemeProvider;
