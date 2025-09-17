import '../../styles/about.scss';

import Arrow from '/src/assets/img/Arrow.svg';
import { Button } from '@heroui/button';

export const About = () => {
  return (
    <div className="about-us">
      <div className="about-us__container">
        <div className="about-us__circleBgi"></div>
        <div className="about-us__wrapper">
          <div className="about-us__block">
            <h1 className="about-us__block-title">О ПРОЕКТЕ</h1>
            <p className="about-us__block-text">
              Путем анализа движений на основе видеозаписей, система способствует точной оценке
              физической активности пациентов, обеспечивая индивидуализированный подход к разработке
              программ реабилитации.
            </p>
            <p className="about-us__block-text about-us__block-text--last">
              Это позволяет медицинским специалистам более эффективно отслеживать и управлять
              процессом восстановления, повышая качество заботы и сокращая период реабилитации для
              пациентов с заболеваниями опорно-двигательного аппарата.
            </p>
            <div className="about-us__block__advantages">
              <div className="about-us__block__advantages__cards">
                <div className="about-us__block__card about-us__block__card--1">Удобство</div>
                <div className="about-us__block__card about-us__block__card--2">Точность</div>
                <div className="about-us__block__card about-us__block__card--3">Здоровье</div>
              </div>
              <Button color="default" className="about-us__block__advantages--btn" variant="ghost">
                Попробовать
                <img src={Arrow} alt="" />
              </Button>
            </div>
          </div>
        </div>

        <div className="about-us__bigLogo"></div>
      </div>
    </div>
  );
};
