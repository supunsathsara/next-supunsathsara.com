'use client';

import React from "react";
import { Toaster } from 'react-hot-toast';


const ToastProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <Toaster position='top-center' reverseOrder={false} />
      {children}
    </>
  );
};

export default ToastProvider;