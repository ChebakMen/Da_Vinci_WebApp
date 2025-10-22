import '../../styles/functional.scss';
import { forwardRef, useState } from 'react';
import { Tabs, Tab } from '@heroui/tabs';
import InputFile from '../InputFile/inputFile';
import Graphics from '../Graphics/graphics';
import { Parametrs } from '../Parametrs/parametrs';
import functionalDataStore from '../../stores/functionalData.store';

type KeypointData = {
  [key: string]: {
    keypoint: string;
    position: {
      x: number;
      y: number;
    };
  }[];
}[];

type ParamsData = {
  leg_length_difference: number;
  shoulder_height_difference: number;
  pelvis_tilt: number;
  knee_valgus_varus: number[];
  step_width: number;
  step_asymmetry: number;
  pelvis_rotation: number;
  shoulder_rotation: number;
  center_of_gravity_deviation: number;
  arm_movement_symmetry: number;
  step_count: number;
};

type FuncProps = {};

export const Functional = forwardRef<HTMLDivElement, FuncProps>((_props, ref) => {
  const [fileLoaded, setFileLoaded] = useState(false);
  const [keypoints, setKeypoints] = useState<KeypointData>([]);

  // Функция для обработки загруженного файла
  // const handleFileLoaded = (newKeypoints: KeypointData) => {
  //   setFileLoaded(true);
  //   console.log('newKeypoints', newKeypoints);
  //   setKeypoints(newKeypoints); // Обновляем keypoints

  // };
  // const handleFileLoaded = (data: {
  //   frames: { frame: number; keypoints: Record<string, { x: number; y: number }> }[];
  // }) => {
  //   setFileLoaded(true);

  //   // Преобразуем входные данные frames в массив
  //   const transformedKeypoints = data.frames.map((frameObj) => {
  //     const pointsArray = Object.entries(frameObj.keypoints).map(([keypoint, pos]) => ({
  //       keypoint,
  //       position: { x: pos.x, y: pos.y },
  //     }));
  //     return {
  //       [frameObj.frame]: pointsArray,
  //     };
  //   });

  //   console.log('Keypoints', transformedKeypoints);
  //   functionalDataStore.updateKeypoints(transformedKeypoints);
  //   functionalDataStore.updateParameters(transformedKeypoints);
  //   setKeypoints(transformedKeypoints);
  // };

  const handleFileLoaded = (data: {
    frames: { frame: number; keypoints: Record<string, { x: number; y: number }> }[];
    step_averages: any[]; // исходный массив с ключами, возможно с избыточными полями
  }) => {
    setFileLoaded(true);

    // Преобразуем frames в массив ключевых точек
    const transformedKeypoints = data.frames.map((frameObj) => {
      const pointsArray = Object.entries(frameObj.keypoints).map(([keypoint, pos]) => ({
        keypoint,
        position: { x: pos.x, y: pos.y },
      }));
      return { [frameObj.frame]: pointsArray };
    });

    // Преобразуем step_averages, чтобы иметь только нужные поля ParamsData
    const transformedParameters: ParamsData[] = data.step_averages.map((item) => ({
      leg_length_difference: item.leg_length_diff,
      shoulder_height_difference: item.shoulder_height_diff,
      pelvis_tilt: item.pelvic_tilt,
      knee_valgus_varus: [item.knee_valgus_varus_left, item.knee_valgus_varus_right],
      step_width: item.step_width || 0,
      step_asymmetry: item.step_asymmetry || 0,
      pelvis_rotation: item.pelvic_shoulder_rotation || 0,
      shoulder_rotation: item.shoulder_tilt || 0,
      center_of_gravity_deviation: item.center_of_gravity_deviation || 0,
      arm_movement_symmetry: item.arm_movement_symmetry || 0,
      step_count: item.step_count || 0,
    }));

    console.log('Keypoints', transformedKeypoints);
    console.log('Parameters', transformedParameters);

    functionalDataStore.updateKeypoints(transformedKeypoints);
    functionalDataStore.updateParameters(transformedParameters);
    setKeypoints(transformedKeypoints);
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
                <Graphics />
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
