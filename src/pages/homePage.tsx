import { About } from '@/components/About/about';
import { Functional } from '@/components/Functional/functional';
import { Header } from '@/components/Header/header';
import { Reviews } from '@/components/Reviews/reviews';
import { Technologies } from '@/components/Technologies/technologies';

import '../styles/homePage.scss';

export const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <About />
        <div className="homePage__navigate">
          <div className="homePage__components">
            <Technologies />
            <Functional />
            <Reviews />
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </>
  );
};
