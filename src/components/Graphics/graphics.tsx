import '../../styles/graphics.scss';
import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Slider from '@mui/material/Slider';
import { Select, SelectItem } from '@heroui/select';
import type { SharedSelection } from '@heroui/react';
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

const Graphics: React.FC<GraphicsProps> = ({ keypoints }) => {
  type Key = string | number;
  const [data, setData] = useState<KeypointData | null>(null);
  const [coordinates, setCoordinates] = useState<KeypointCoordinates>([]);
  const [value, setValue] = React.useState<number[]>([0, 25]);
  const [selectedOption, setSelectedOption] = useState<Set<Key>>(new Set(['keypoint_1']));
  const minDistance = 10;

  useEffect(() => {
    setData(keypoints);
  }, [keypoints]);
  useEffect(() => {
    if (data) {
      handleFrameClick('keypoint_1');
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
    { key: 'keypoint_1', label: 'Нос' },
    { key: 'keypoint_2', label: 'Правое плечо' },
    { key: 'keypoint_3', label: 'Левое плечо' },
    { key: 'keypoint_4', label: 'Левый глаз' },
    { key: 'keypoint_5', label: 'Правый глаз' },
    { key: 'keypoint_6', label: 'Правое ухо' },
    { key: 'keypoint_7', label: 'Левое ухо' },
    { key: 'keypoint_8', label: 'Таз' },
    { key: 'keypoint_9', label: 'Левое колено' },
    { key: 'keypoint_10', label: 'Правое колено' },
    { key: 'keypoint_11', label: 'Локоть на правой руке' },
    { key: 'keypoint_12', label: 'Локоть на левой руке' },
    { key: 'keypoint_13', label: 'Кисть на правой руке' },
    { key: 'keypoint_14', label: 'Кисть на левой руке' },
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
              id="keypoint-1"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_1')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__shoulder-l"
              id="keypoint-2"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_2')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__shoulder-r"
              id="keypoint-3"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_3')}
            />

            <input
              type="radio"
              className="graphics__radio graphics__radio__elbow-l"
              id="keypoint-4"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_4')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__elbow-r"
              id="keypoint-5"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_5')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__brushes-l"
              id="keypoint-6"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_6')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__brushes-r"
              id="keypoint-7"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_7')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__eye-l"
              id="keypoint-8"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_8')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__eye-r"
              id="keypoint-9"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_9')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__ear-l"
              id="keypoint-10"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_10')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__ear-r"
              id="keypoint-11"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_11')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__hip-l"
              id="keypoint-12"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_12')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__hip-r"
              id="keypoint-13"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_13')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__knee-l"
              id="keypoint-14"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_14')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__knee-r"
              id="keypoint-15"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_15')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__foot-l"
              id="keypoint-16"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_16')}
            />
            <input
              type="radio"
              className="graphics__radio graphics__radio__foot-r"
              id="keypoint-17"
              name="keypoints"
              onClick={() => handleFrameClick('keypoint_17')}
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
