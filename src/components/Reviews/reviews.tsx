import '../../styles/reviews.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Slider from 'react-slick';

import P1 from '/src/assets/img/img_rews_1.jpg';
import P2 from '/src/assets/img/img_rews_2.jpg';
import P3 from '/src/assets/img/img_rews_3.jpg';
import P4 from '/src/assets/img/img_rews_4.jpg';

// import P1 from '/src/assets/img/image-1.png';
// import P2 from '/src/assets/img/image-2.png';
// import P3 from '/src/assets/img/image.png';
import { forwardRef, useEffect, useState } from 'react';

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
    name: 'Заговоров М.А',
    img: P1,
    review:
      'Проект предоставляет уникальное решение для точной оценки физической активности пациентов с помощью анализа видеозаписей. Пользовался в течении нескольких дней. Мне понравилось, было удобно и понятно. Также очень рекомендую для медицинских специалистов.',
  },
  {
    name: 'Шитовкина В.И.',
    img: P2,
    review:
      'Использование этой системы значительно облегчило процесс мониторинга восстановления пациентов с заболеваниями опорно-двигательного аппарата. Программа реально помогает врачам разрабатывать персонализированные планы и ускоряет период реабилитации. Приятно видеть, как технологии улучшают медицину.',
  },
  {
    name: 'Зирко К.А.',
    img: P3,
    review:
      'Система реабилитации на основе видеоанализа – это настоящее прорывное решение. Она помогает как врачам, так и пациентам увидеть динамику восстановления в деталях и делать своевременные корректировки. Благодаря такому подходу, уход становится максимально персонализированным и результативным.',
  },
  {
    name: 'Кучер О.В.',
    img: P4,
    review:
      'Точная оценка движений пациентов на основе видео позволила нам глубже понять их состояние и адаптировать подход к лечению. Это сильный инструмент для любого реабилитационного центра, который стремится повысить эффективность своих программ и улучшить качество жизни пациентов',
  },
];

type ReviewsProps = {};

export const Reviews = forwardRef<HTMLDivElement, ReviewsProps>((_props, ref) => {
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
    <div className="reviews" ref={ref}>
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
});
