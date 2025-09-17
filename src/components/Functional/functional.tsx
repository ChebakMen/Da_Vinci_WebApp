import '../../styles/functional.scss';
import { useState } from 'react';
// import InputFile from '../InputFile/InputFile';
// import Graphics from '../Graphics/Graphics';
import { Tabs, Tab } from '@heroui/tabs';
import InputFile from '../InputFile/inputFile';
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

export const Functional = () => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [keypoints, setKeypoints] = useState<KeypointData>([]);

  // Функция для обработки загруженного файла
  const handleFileLoaded = (newKeypoints: KeypointData) => {
    setFileLoaded(true);
    console.log('newKeypoints', newKeypoints);
    setKeypoints(newKeypoints); // Обновляем keypoints
  };

  return (
    <div className="functional">
      <div className="functional__wrapper-black_block ">
        <div className="functional__black_block"></div>
      </div>
      <h1 className="functional__title">Протестируй прямо сейчас</h1>
      <h3 className="functional__text">
        Загрузите ваш видеофайл, подождите несколько минут и наблюдайте результат
      </h3>
      {!fileLoaded && <InputFile onFileLoaded={handleFileLoaded} />}
      {fileLoaded && (
        <div className="">
          <Tabs aria-label="Options">
            <Tab key="graphics" title="Графики">
              {/* <Graphics keypoints={keypoints} /> */}
            </Tab>
            <Tab key="parametrs" title="Параметры">
              {/* <Parametrs /> */}
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};
