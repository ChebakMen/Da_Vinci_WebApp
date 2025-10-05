import '../../styles/functional.scss';
import { forwardRef, useState } from 'react';
import { Tabs, Tab } from '@heroui/tabs';
import InputFile from '../InputFile/inputFile';
import Graphics from '../Graphics/graphics';
import { Parametrs } from '../Parametrs/parametrs';
// import { Parametrs } from '../Parametrs/Parametrs';

type KeypointData = {
  [key: string]: {
    keypoint: string;
    position: {
      x: number;
      y: number;
    };
  }[];
}[];

type FuncProps = {};

export const Functional = forwardRef<HTMLDivElement, FuncProps>((_props, ref) => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [keypoints, setKeypoints] = useState<KeypointData>([]);

  // Функция для обработки загруженного файла
  const handleFileLoaded = (newKeypoints: KeypointData) => {
    setFileLoaded(true);
    console.log('newKeypoints', newKeypoints);
    setKeypoints(newKeypoints); // Обновляем keypoints
  };

  return (
    <div className="functional" ref={ref}>
      <div className="functional__nav-vertical">
        <div className="functional__line"></div>
        <div className="functional__circle homePage__circle-bottom"></div>
        <div className="functional__vertical-text">Тестирование</div>
        <div className="functional__circle "></div>
        <div className="functional__line"></div>
      </div>
      <div className="functional__content">
        <div className="functional__wrapper-black_block ">
          <div className="functional__black_block"></div>
        </div>
        <h1 className="functional__title">Протестируй прямо сейчас</h1>
        <h3 className="functional__text">
          Загрузите ваш видеофайл, подождите несколько минут и наблюдайте результат
        </h3>
        {!fileLoaded && <InputFile onFileLoaded={handleFileLoaded} />}
        {fileLoaded && (
          <div className="functional__tabs_container">
            <Tabs aria-label="Options" className="functional__tabs_wrapper">
              <Tab key="graphics" title="Графики">
                <Graphics keypoints={keypoints} />
              </Tab>
              <Tab key="parametrs" title="Параметры">
                <Parametrs />
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
});
