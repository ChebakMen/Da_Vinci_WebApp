import '../../styles/graphics.scss';
import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Slider from '@mui/material/Slider';
import { Select, SelectItem } from '@heroui/select';
import type { SharedSelection } from '@heroui/react';
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

type KeypointCoordinate = {
  frame: string;
  x: number;
  y: number;
};

type KeypointCoordinates = KeypointCoordinate[];

const processKeypointData = (data: KeypointData, keypoint: string): KeypointCoordinates => {
  const keypointCoordinates: KeypointCoordinates = [];
  data.forEach((frameData) => {
    const frame = Object.keys(frameData)[0];
    frameData[frame].forEach((item) => {
      if (item.keypoint === keypoint) {
        keypointCoordinates.push({
          frame: frame,
          x: item.position.x,
          y: item.position.y,
        });
      }
    });
  });

  return keypointCoordinates;
};

interface GraphicsProps {
  keypoints: KeypointData;
}

const Graphics = () => {
  type Key = string | number;
  const [data, setData] = useState<KeypointData | null>(null);
  const [coordinates, setCoordinates] = useState<KeypointCoordinates>([]);
  const [value, setValue] = React.useState<number[]>([0, 25]);
  const [selectedOption, setSelectedOption] = useState<Set<Key>>(new Set(['nose']));
  const minDistance = 10;
  const keypoints = functionalDataStore.keypoints;

  useEffect(() => {
    setData(keypoints);
  }, [keypoints]);

  useEffect(() => {
    if (data) {
      handleFrameClick('nose');
    }
  }, [data]);

  const handleFrameClick = (keypoint: string) => {
    if (data) {
      const keypointCoordinates = processKeypointData(data, keypoint);
      setCoordinates(keypointCoordinates);
    }
  };

  const handleSelectionChange = (keys: SharedSelection) => {
    if (typeof keys === 'string') {
      setSelectedOption(new Set([keys]));
    } else {
      const stringKeys = new Set(Array.from(keys).map((k) => k.toString()));
      setSelectedOption(stringKeys);
    }
  };

  const handleChange = (_event: Event, newValue: number | number[], activeThumb: number) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 240 - minDistance);
        setValue([clamped, clamped + minDistance]);
      } else {
        const clamped = Math.max(newValue[1], minDistance);
        setValue([clamped - minDistance, clamped]);
      }
    } else {
      setValue(newValue as number[]);
    }
  };

  useEffect(() => {
    if (selectedOption.size > 0) {
      const selectedKey = Array.from(selectedOption)[0];
      if (typeof selectedKey === 'string') {
        handleFrameClick(selectedKey);
      }
    }
  }, [selectedOption]);

  const keypointsOption = [
    { key: 'nose', label: 'Нос' },
    { key: 'right_shoulder', label: 'Правое плечо' },
    { key: 'left_shoulder', label: 'Левое плечо' },
    { key: 'left_eye', label: 'Левый глаз' },
    { key: 'right_eye', label: 'Правый глаз' },
    { key: 'right_ear', label: 'Правое ухо' },
    { key: 'left_ear', label: 'Левое ухо' },
    { key: 'right_hip', label: 'Таз правый бок' },
    { key: 'left_hip', label: 'Таз левый бок' },
    { key: 'left_knee', label: 'Левое колено' },
    { key: 'right_knee', label: 'Правое колено' },
    { key: 'right_elbow', label: 'Локоть на правой руке' },
    { key: 'left_elbow', label: 'Локоть на левой руке' },
    { key: 'right_wrist', label: 'Кисть на правой руке' },
    { key: 'left_wrist', label: 'Кисть на левой руке' },
    { key: 'right_ankle', label: 'Лодыжка на правой ноге' },
    { key: 'left_ankle', label: 'Лодыжка на левой ноге' },
  ];

  return (
    <div className="graphics">
      <div className="graphics__container">
        <div className="graphics__humanbox">
          <h2 className="graphics__title">Выберите часть тела</h2>
          <Select
            className="max-w-xs graphics__mobil_select"
            label="Выберите часть тела"
            selectedKeys={selectedOption}
            onSelectionChange={handleSelectionChange}
            selectionMode="single">
            {keypointsOption.map((kp) => (
              <SelectItem key={kp.key}>{kp.label}</SelectItem>
            ))}
          </Select>
          <div className="graphics__human">
            <input
              type="radio"
              className="graphics__radio graphics__radio__nose"
              id="nose"
              name="keypoints"
              onClick={() => handleFrameClick('nose')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__shoulder-l"
              id="left_shoulder"
              name="keypoints"
              onClick={() => handleFrameClick('left_shoulder')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__shoulder-r"
              id="right_shoulder"
              name="keypoints"
              onClick={() => handleFrameClick('right_shoulder')}
            />

            <input
              type="radio"
              className="graphics__radio graphics__radio__elbow-l"
              id="left_elbow"
              name="keypoints"
              onClick={() => handleFrameClick('left_elbow')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__elbow-r"
              id="right_elbow"
              name="keypoints"
              onClick={() => handleFrameClick('right_elbow')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__brushes-l"
              id="left_wrist"
              name="keypoints"
              onClick={() => handleFrameClick('left_wrist')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__brushes-r"
              id="right_wrist"
              name="keypoints"
              onClick={() => handleFrameClick('right_wrist')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__eye-l"
              id="left_eye"
              name="keypoints"
              onClick={() => handleFrameClick('left_eye')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__eye-r"
              id="right_eye"
              name="keypoints"
              onClick={() => handleFrameClick('right_eye')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__ear-l"
              id="left_ear"
              name="keypoints"
              onClick={() => handleFrameClick('left_ear')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__ear-r"
              id="right_ear"
              name="keypoints"
              onClick={() => handleFrameClick('right_ear')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__hip-l"
              id="left_hip"
              name="keypoints"
              onClick={() => handleFrameClick('left_hip')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__hip-r"
              id="right_hip"
              name="keypoints"
              onClick={() => handleFrameClick('right_hip')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__knee-l"
              id="left_knee"
              name="keypoints"
              onClick={() => handleFrameClick('left_knee')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__knee-r"
              id="right_knee"
              name="keypoints"
              onClick={() => handleFrameClick('right_knee')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__foot-l"
              id="left_ankle"
              name="keypoints"
              onClick={() => handleFrameClick('left_ankle')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__foot-r"
              id="right_ankle"
              name="keypoints"
              onClick={() => handleFrameClick('right_ankle')}
            />
          </div>
        </div>

        <div className="graphics__graphic">
          <h2 className="graphics__title--mt15 graphics__title">График</h2>

          <LineChart
            xAxis={[
              {
                label: 'Кадры',
                data: coordinates.map((_, index) => index + 1) || [],
                min: value[0],
                max: value[1],
              },
            ]}
            yAxis={[
              {
                label: 'Что-то',
              },
            ]}
            series={[
              {
                data: coordinates.map((point) => point.x) || [],
                color: 'black',
              },
            ]}
            className="graphics__graphic"
            grid={{ vertical: true, horizontal: true }}
          />
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={240}
            className="graphics__graphic_slider"
          />

          <p className="graphics__graphic__info"></p>
        </div>
      </div>
    </div>
  );
};

export default Graphics;
