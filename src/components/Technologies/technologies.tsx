import '../../styles/technologies.scss';
import Arrow from '/src/assets/img/Arrow.svg';
import Yolo from '/src/assets/img/Yolo.jpg';
import Wave from '/src/assets/img/wave.svg';
import MMPOSE from '/src/assets/img/MMPOSE.png';
import { Link } from '@heroui/link';
import { Button } from '@heroui/button';

export const Technologies = () => {
  return (
    <div className="technologies">
      <div className="technologies__nav-vertical">
        <div className="technologies__circle "></div>
        <div className="technologies__line"></div>
        <div className="technologies__circle homePage__circle-bottom"></div>
        <div className="technologies__vertical-text">Технологии</div>
        <div className="technologies__circle "></div>
        <div className="technologies__line"></div>
      </div>
      <div className="technologies__content">
        <img className="technologies__wave" src={Wave} alt="" />
        <div className="technologies__container">
          <div className="technologies__bcg-i"></div>
          <div className="technologies__title-block">
            <div className="technologies__wrapper-black_block ">
              <div className="technologies__black_block"></div>
            </div>
            <h2 className="technologies__title technologies__title--h2">ТЕХНОЛОГИИ</h2>
            <h3 className="technologies__title technologies__title--h3">используемые в проекте</h3>
            <div className="technologies__block-img">
              <div className="technologies__title-img--bg1">
                <img className="technologies__title-img1" src={Yolo} alt="" />
                <div className="technologies__block-signature technologies__block-signature-1">
                  <p className="technologies__title-img-signature technologies__title-img-signature--1">
                    YOLO V11
                  </p>
                  <Button
                    href="https://docs.ultralytics.com/ru"
                    size="sm"
                    as={Link}
                    color="default"
                    variant="ghost"
                    target="_blank"
                    className="technologies__title-img-signature__btn technologies__title-img-signature__btn-1">
                    Перейти
                    <img src={Arrow} alt="" />
                  </Button>
                </div>
              </div>
              <div className="technologies__title-img--bg2">
                <div className="technologies__block-signature technologies__block-signature-2">
                  <p className="technologies__title-img-signature technologies__title-img-signature--2">
                    MMPOSE
                  </p>
                  <Button
                    href="https://github.com/open-mmlab/mmpose"
                    size="sm"
                    as={Link}
                    color="default"
                    target="_blank"
                    variant="ghost"
                    className="technologies__title-img-signature__btn technologies__title-img-signature__btn-2">
                    Перейти
                    <img src={Arrow} alt="" />
                  </Button>
                </div>
                <img className="technologies__title-img1" src={MMPOSE} alt="" />
              </div>
            </div>
          </div>
          <div className="technologies__description-block">
            <h2 className="technologies__description technologies__description--h2">YOLO V11</h2>
            <h3 className="technologies__description  technologies__description--h3 technologies__description-first">
              YOLO (You Only Look Once) – это глубокая сверточная нейронная сеть, которая
              обеспечивает высокую точность обнаружения и классификации объектов на изображениях
            </h3>
            <div className="technologies__description-second">
              <h2 className="technologies__description technologies__description--h2">MMPOSE</h2>
              <h3 className="technologies__description technologies__description--h3 ">
                Это инструментарий с открытым исходным кодом для оценки позы, основанный на Pwtorch.
                Он является частью проекта Openlab
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
