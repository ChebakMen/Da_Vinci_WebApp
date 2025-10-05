import { About } from '@/components/About/about';
import { Functional } from '@/components/Functional/functional';
import { Header } from '@/components/Header/header';
import { Reviews } from '@/components/Reviews/reviews';
import { Technologies } from '@/components/Technologies/technologies';

import '../styles/homePage.scss';
import Footer from '@/components/Footer/footer';
import { useRef } from 'react';

export const HomePage = () => {
  const reviewsRef = useRef(null);
  const funcRef = useRef(null);

  return (
    <>
      <Header reviewsRef={reviewsRef} funcRef={funcRef} />
      <main>
        <About funcRef={funcRef} />
        <div className="homePage__navigate">
          <div className="homePage__components">
            <Technologies />
            <Functional ref={funcRef} />
            <Reviews ref={reviewsRef} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
