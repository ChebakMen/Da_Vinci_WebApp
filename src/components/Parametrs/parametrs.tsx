import '../../styles/parametrs.scss';
import React, { useState, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Slider from '@mui/material/Slider';
import { Button } from '@heroui/button';
import { Select, SelectItem } from '@heroui/select';
import type { SharedSelection } from '@heroui/react';

type KeypointData = {
  params_1: ParamsData;
  params_2: ParamsData;
};

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

type KeypointCoordinate = {
  frame: string;
  value: number;
};

type KeypointCoordinates = KeypointCoordinate[];

const fetchDataAndProcess = async () => {
  try {
    const response = await fetch('https://mocki.io/v1/b2146206-0c25-4636-a54e-1f26e27b3e54');

    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }

    const data: KeypointData = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Ошибка при получении данных:', error);
    return null;
  }
};

const processKeypointData = (
  data: KeypointData,
  paramKey: keyof ParamsData,
): KeypointCoordinates => {
  const keypointCoordinates: KeypointCoordinates = [];

  Object.entries(data).forEach(([key, params]) => {
    const value = params[paramKey];
    if (typeof value === 'number') {
      keypointCoordinates.push({
        frame: key,
        value: value,
      });
    } else if (Array.isArray(value)) {
      keypointCoordinates.push({
        frame: key,
        value: value[0],
      });
    }
  });

  return keypointCoordinates;
};

export const Parametrs = () => {
  type Key = string | number;
  const [data, setData] = useState<KeypointData | null>(null);
  const [coordinates, setCoordinates] = useState<KeypointCoordinates>([]);
  const [value, setValue] = React.useState<number[]>([0, 25]);
  const [selectedOption, setSelectedOption] = useState<Set<Key>>(
    new Set(['leg_length_difference']),
  );
  const minDistance = 10;

  useEffect(() => {
    fetchDataAndProcess().then((result) => setData(result));
    console.log(data);
  }, []);

  useEffect(() => {
    if (data) {
      handleFrameClick('leg_length_difference');
    }
  }, [data]);

  const handleFrameClick = (paramKey: keyof ParamsData) => {
    if (data) {
      const keypointCoordinates = processKeypointData(data, paramKey);
      setCoordinates(keypointCoordinates);
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
  const handleSelectionChange = (keys: SharedSelection) => {
    if (typeof keys === 'string') {
      setSelectedOption(new Set([keys]));
    } else {
      const stringKeys = new Set(Array.from(keys).map((k) => k.toString()));
      setSelectedOption(stringKeys);
    }
  };

  useEffect(() => {
    if (selectedOption.size > 0) {
      const selectedKey = Array.from(selectedOption)[0];
      if (typeof selectedKey === 'string') {
        handleFrameClick(selectedKey as keyof ParamsData);
      }
    }
  }, [selectedOption]);

  const keypointsOption: { key: keyof ParamsData; label: string }[] = [
    { key: 'leg_length_difference', label: 'Разница в длинне ног' },
    { key: 'shoulder_height_difference', label: 'Разница в высоте плеч' },
    { key: 'pelvis_tilt', label: 'Наклон таза' },
    { key: 'knee_valgus_varus', label: 'Вальгус колен' },
    { key: 'step_width', label: 'Ширина шага' },
    { key: 'step_asymmetry', label: 'Асиметрия шага' },
    { key: 'pelvis_rotation', label: 'Вращение таза' },
    { key: 'shoulder_rotation', label: 'Вращение плеча' },
    { key: 'center_of_gravity_deviation', label: 'Отклонение центра тяжести ' },
    { key: 'arm_movement_symmetry', label: 'Симметрия движения рук' },
    { key: 'step_count', label: 'Количество шагов' },
  ];

  return (
    <div className="parametrs">
      <div className="parametrs__container">
        <div className="parametrs__btn-list">
          <h2 className="parametrs__title">Выберите параметр</h2>
          <Select
            className="max-w-xs parametrs__mobil_select"
            label="Выберите параметр"
            selectedKeys={selectedOption}
            onSelectionChange={handleSelectionChange}
            selectionMode="single">
            {keypointsOption.map((kp) => (
              <SelectItem key={kp.key}>{kp.label}</SelectItem>
            ))}
          </Select>
          <div className="parametrs__btns">
            <Button
              className="parametrs__btn"
              id="param-1"
              name="params"
              onClick={() => handleFrameClick('leg_length_difference')}>
              Разница в длинне ног
            </Button>

            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('shoulder_height_difference')}>
              Разница в высоте плеч
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('pelvis_tilt')}>
              Наклон таза
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('knee_valgus_varus')}>
              Вальгус колен
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('step_width')}>
              Ширина шага
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('step_asymmetry')}>
              Асимметрия шага
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('pelvis_rotation')}>
              Вращение таза
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('shoulder_rotation')}>
              Вращение плеча
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('center_of_gravity_deviation')}>
              Отклонение центра тяжести
            </Button>
            <Button
              className="parametrs__btn"
              id="param-2"
              name="params"
              onClick={() => handleFrameClick('arm_movement_symmetry')}>
              Симметрия движения рук
            </Button>
          </div>
        </div>

        <div className="parametrs__graphic">
          <h2 className="parametrs__title--mt15 parametrs__title">График</h2>

          <LineChart
            xAxis={[
              {
                label: 'Шаги',
                data: coordinates.map((_, index) => index + 1) || [],
                min: value[0],
                max: value[1],
              },
            ]}
            yAxis={[
              {
                label: 'Значение',
              },
            ]}
            series={[
              {
                data: coordinates.map((point) => point.value) || [],
                color: 'black',
              },
            ]}
            grid={{ vertical: true, horizontal: true }}
            className="parametrs__graphic"
          />
          <Slider
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            min={0}
            max={140}
            className="parametrs__graphic_slider"
          />

          <p className="parametrs__graphic__info"></p>
        </div>
      </div>
    </div>
  );
};
