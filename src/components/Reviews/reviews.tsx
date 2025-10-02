import '../../styles/reviews.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import P1 from '/src/assets/img/image-1.png';
import P2 from '/src/assets/img/image-2.png';
import P3 from '/src/assets/img/image.png';
import { useEffect, useState } from 'react';

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'none',
        color: 'black',
        fontSize: '24px',
        cursor: 'pointer',
        padding: '0 0 0 7px',
      }}
      onClick={onClick}>
      &#10095;
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        background: 'none',
        color: 'black',
        fontSize: '24px',
        cursor: 'pointer',
      }}
      onClick={onClick}>
      &#10094;
    </div>
  );
}

const data = [
  {
    name: 'Дуэйн Джонсон',
    img: P1,
    review:
      'После двух лет непрерывных исследований и разработок мы рады объявить о выпуске Ultralytics YOLOv8 . Эта модель YOLO устанавливает новый стандарт в обнаружении и сегментации в реальном времени, облегчая разработку простых и эффективных ИИ-решений для широкого спектра сценариев использования.',
  },
  {
    name: 'Райн Гослинг',
    img: P2,
    review:
      'После двух лет непрерывных исследований и разработок мы рады объявить о выпуске Ultralytics YOLOv8 . Эта модель YOLO устанавливает новый стандарт в обнаружении и сегментации в реальном времени, облегчая разработку простых и эффективных ИИ-решений для широкого спектра сценариев использования.',
  },
  {
    name: 'Бред Пит',
    img: P3,
    review:
      'После двух лет непрерывных исследований и разработок мы рады объявить о выпуске Ultralytics YOLOv8 . Эта модель YOLO устанавливает новый стандарт в обнаружении и сегментации в реальном времени, облегчая разработку простых и эффективных ИИ-решений для широкого спектра сценариев использования.',
  },
  {
    name: 'Леонардо Ди Каприо',
    img: P1,
    review:
      'После двух лет непрерывных исследований и разработок мы рады объявить о выпуске Ultralytics YOLOv8 . Эта модель YOLO устанавливает новый стандарт в обнаружении и сегментации в реальном времени, облегчая разработку простых и эффективных ИИ-решений для широкого спектра сценариев использования.',
  },
];

export const Reviews = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 500);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const settingsBg = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settingsSm = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const settings = isMobile ? settingsSm : settingsBg;

  return (
    <div className="reviews">
      <div className="reviews__nav-vertical">
        <div className="reviews__line"></div>
        <div className="reviews__circle "></div>
        <div className="reviews__vertical-text">Отзывы</div>
        <div className="reviews__circle "></div>
        <div className="reviews__line"></div>
        <div className="reviews__circle "></div>
      </div>
      <div className="reviews__content">
        <div className="reviews__bcg-i"></div>
        <div className="reviews__wrapper-black_block ">
          <div className="reviews__black_block"></div>
        </div>
        <h1 className="reviews__title">Отзывы наших пользователей</h1>

        <div className="reviews__container">
          <Slider {...settings}>
            {data.map((d, index) => (
              <div key={index} className="reviews__container-card">
                <img className="reviews__container-card-img" src={d.img} alt={d.name} />
                <h6 className="reviews__container-card-title">{d.name}</h6>
                <p className="reviews__container-card-text">{d.review}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
