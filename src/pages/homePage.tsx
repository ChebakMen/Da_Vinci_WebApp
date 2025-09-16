import { About } from '@/components/About/about';
import { Header } from '@/components/Header/header';
import React from 'react';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <About />
        {/* <Technologies />
          <Functional />
          <Reviews /> */}
      </main>
      {/* <Footer /> */}
    </>
  );
};
