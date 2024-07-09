'use client';

import { Toaster } from 'react-hot-toast';


const ToastProvider = ({ children }) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
    </>
  );
};

export default ToastProvider;