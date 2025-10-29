import '../../styles/account.scss';
import { useLocation } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import Slider from '@mui/material/Slider';
import {
  Input,
  Button,
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Tabs,
  Tab,
  SelectItem,
  Select,
  SharedSelection,
} from '@heroui/react';
import { Header } from '../Header/header';
import Footer from '../Footer/footer';
import functionalDataStore from '@/stores/functionalData.store';

// types.ts
export interface User {
  id: number;
  fio: string;
  phone: string;
  history: [];
  roll: string;
  email: string;
}

interface Action {
  id: string;
  timestamp: Date;
  description: string;
  pdfUrl: string;
}

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [editableUser, _setEditableUser] = useState<User>(user);

  return (
    <div className="account_user-data">
      <label className="account_user-label">
        ФИО:
        <Input disabled className="account_user-label-text" value={editableUser.fio} />
      </label>
      <label className="account_user-label">
        Телефон:
        <Input disabled className="account_user-label-text" value={editableUser.phone} />
      </label>
      <label className="account_user-label">
        Email:
        <Input disabled className="account_user-label-text" value={editableUser.email} />
      </label>
    </div>
  );
};

interface ActionHistoryProps {
  actions: Action[];
}

type KeypointCoordinate = {
  frame: string;
  x: number;
  y: number;
};

interface ModalDataType {
  title: string;
  description: string;
  date: string;
  id: string;
  video: string;
  result: string;
}

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
}[];

type KeypointCoordinates = KeypointCoordinate[];

const processKeypointData = (data: KeypointData, keypoint: string): KeypointCoordinates => {
  const keypointCoordinates: KeypointCoordinates = [];

  try {
    // Преобразуем MobX Proxy в обычный объект
    const plainData = JSON.parse(JSON.stringify(data));

    // Проверяем, что данные являются массивом
    if (!Array.isArray(plainData)) {
      console.error('Expected data to be an array, got:', typeof plainData);
      return keypointCoordinates;
    }

    // Обрабатываем каждый кадр
    for (const frameData of plainData) {
      if (!frameData || typeof frameData !== 'object') {
        continue;
      }

      const frameKeys = Object.keys(frameData);
      if (frameKeys.length === 0) {
        continue;
      }

      const frame = frameKeys[0];
      const items = frameData[frame];

      // Проверяем, что items является массивом
      if (!Array.isArray(items)) {
        console.warn(`Items for frame ${frame} is not an array:`, items);
        continue;
      }

      // Обрабатываем каждый элемент в кадре
      for (const item of items) {
        if (item && item.keypoint === keypoint && item.position) {
          keypointCoordinates.push({
            frame: frame,
            x: item.position.x || 0,
            y: item.position.y || 0,
          });
        }
      }
    }
  } catch (error) {
    console.error('Error processing keypoint data:', error);
  }

  return keypointCoordinates;
};

const processParameterData = (data: ParamsData, parameter: string): KeypointCoordinates => {
  const parameterValues: KeypointCoordinates = [];

  data.forEach((paramSet, index) => {
    const value = paramSet[parameter as keyof typeof paramSet];

    if (Array.isArray(value)) {
      // Если параметр является массивом (например, knee_valgus_varus)
      value.forEach((val, arrayIndex) => {
        parameterValues.push({
          frame: `${index}_${arrayIndex}`,
          x: arrayIndex + 1,
          y: val,
        });
      });
    } else if (typeof value === 'number') {
      // Если параметр - просто число
      parameterValues.push({
        frame: `${index}`,
        x: index + 1,
        y: value,
      });
    }
  });

  return parameterValues;
};

export const ActionHistory: React.FC<ActionHistoryProps> = ({ actions }) => {
  type Key = string | number;
  const keypoints = functionalDataStore.keypoints;
  const parameters = functionalDataStore.parameters;

  const [data, setData] = useState<KeypointData | ParamsData | null>(null);
  const [coordinates, setCoordinates] = useState<KeypointCoordinates>([]);
  const [activeTab, setActiveTab] = useState<string>('graphics');
  const [selectedOption, setSelectedOption] = useState<Set<Key>>(new Set(['nose']));

  const columns = [
    { key: 'timestamp', label: 'Дата действия' },
    { key: 'description', label: 'Описание' },
    { key: 'download', label: 'Скачать PDF' },
    { key: 'more' },
  ];

  const handleDownload = (pdfUrl: string) => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'action.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [value, setValue] = React.useState<number[]>([0, 25]);
  const [modalData, setModalData] = useState<ModalDataType | null>(null);

  const minDistance = 10;

  // Сбрасываем выбранное значение при переключении табов
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    if (key === 'graphics') {
      setSelectedOption(new Set(['nose']));
    } else if (key === 'parametrs') {
      setSelectedOption(new Set(['leg_length_difference']));
    }
  };

  useEffect(() => {
    if (activeTab === 'graphics') {
      setData(null);
      setData(keypoints);
    } else if (activeTab === 'parametrs') {
      setData(parameters as ParamsData);
    }
  }, [activeTab, keypoints, parameters]);

  const handleSelectionChange = (keys: SharedSelection) => {
    if (typeof keys === 'string') {
      setSelectedOption(new Set([keys]));
    } else {
      const stringKeys = new Set(Array.from(keys).map((k) => k.toString()));
      setSelectedOption(stringKeys);
    }
  };

  useEffect(() => {
    if (selectedOption.size > 0 && data) {
      const selectedKey = Array.from(selectedOption)[0];
      if (typeof selectedKey === 'string') {
        if (activeTab === 'graphics') {
          handleKeypointClick(selectedKey);
        } else if (activeTab === 'parametrs') {
          handleParameterClick(selectedKey);
        }
      }
    }
  }, [selectedOption, data, activeTab]);

  const handleKeypointClick = (keypoint: string) => {
    if (data && activeTab === 'graphics') {
      const keypointCoordinates = processKeypointData(data as KeypointData, keypoint);
      setCoordinates(keypointCoordinates);
    }
  };

  const handleParameterClick = (parameter: string) => {
    if (data && activeTab === 'parametrs') {
      const parameterValues = processParameterData(data as ParamsData, parameter);
      setCoordinates(parameterValues);
    }
  };

  const handleOpenModal = (action: Action) => {
    setModalData({
      title: 'Заголовок',
      description: action.description,
      date: action.timestamp.toLocaleString(),
      id: action.id,
      video: 'video_123321.mp4',
      result: action.id,
    });
    onOpen();
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

  const parametrsOption = [
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

  const getCurrentOptions = () => {
    return activeTab === 'graphics' ? keypointsOption : parametrsOption;
  };

  const getSelectLabel = () => {
    return activeTab === 'graphics' ? 'Выберите часть тела' : 'Выберите параметр';
  };

  // Проверяем, что выбранное значение существует в текущих опциях
  const getSafeSelectedKeys = () => {
    const currentOptions = getCurrentOptions();
    const selectedKey = Array.from(selectedOption)[0];

    // Если выбранный ключ существует в текущих опциях, используем его
    if (currentOptions.some((option) => option.key === selectedKey)) {
      return selectedOption;
    }

    // Иначе используем первый доступный вариант
    return new Set([currentOptions[0]?.key || '']);
  };

  return (
    <div>
      <h2 style={{ marginBottom: '10px' }}>История действий:</h2>
      {actions.length === 0 ? (
        <p>История пуста</p>
      ) : (
        <>
          <Table aria-label="История действий">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={actions}>
              {(action) => (
                <TableRow key={action.id}>
                  {(columnKey) => {
                    if (columnKey === 'timestamp') {
                      return <TableCell>{action.timestamp.toLocaleString()}</TableCell>;
                    }
                    if (columnKey === 'description') {
                      return <TableCell>{action.description}</TableCell>;
                    }
                    if (columnKey === 'download') {
                      return (
                        <TableCell>
                          <button onClick={() => handleDownload(action.pdfUrl)}>Скачать PDF</button>
                        </TableCell>
                      );
                    }
                    if (columnKey === 'more') {
                      return (
                        <TableCell>
                          <Button
                            onPress={() => handleOpenModal(action)}
                            className="account__btn account__btn--log">
                            Подробнее
                          </Button>
                        </TableCell>
                      );
                    }
                    return <TableCell>{''}</TableCell>;
                  }}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Modal
            size={'2xl'}
            backdrop="blur"
            isOpen={isOpen}
            scrollBehavior="inside"
            style={{ marginTop: '150px' }}
            onOpenChange={onOpenChange}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader
                    className="account__modal-title "
                    style={{ borderBottom: '2px solid rgb(210, 210, 210)' }}>
                    {modalData?.date}
                  </ModalHeader>
                  <ModalBody>
                    <div className="account__modal-description ">
                      Описание: {modalData?.description}
                    </div>
                    <div className="account__modal-description account__modal-description--fz16 ">
                      Прикрепленное видео: {modalData?.video}
                    </div>
                    <div className="account__tabs_wrapper">
                      <Tabs
                        aria-label="Dynamic tabs"
                        className=""
                        selectedKey={activeTab}
                        onSelectionChange={(key) => handleTabChange(key as string)}>
                        <Tab key="graphics" title="Графики">
                          <div className="account__tab-content">
                            <Select
                              className="max-w-xs account__select-kp"
                              size="sm"
                              selectedKeys={getSafeSelectedKeys()}
                              onSelectionChange={handleSelectionChange}
                              label={getSelectLabel()}
                              aria-label={getSelectLabel()}
                              selectionMode="single">
                              {getCurrentOptions().map((kp) => (
                                <SelectItem key={kp.key}>{kp.label}</SelectItem>
                              ))}
                            </Select>
                            <h2 className="account__modal-graphic-title">График</h2>

                            <div className="account__graphic">
                              <LineChart
                                xAxis={[
                                  {
                                    label: activeTab === 'graphics' ? 'Координата по X' : 'Кадры',
                                    data: coordinates.map((_point, index) => index + 1) || [],
                                    min: value[0],
                                    max: value[1],
                                  },
                                ]}
                                yAxis={[
                                  {
                                    label:
                                      activeTab === 'graphics' ? 'Координата по Y' : 'Значения',
                                  },
                                ]}
                                series={[
                                  {
                                    data: coordinates.map((point) => point.y) || [],
                                    color: 'black',
                                  },
                                ]}
                                className="account__graphic"
                                grid={{ vertical: true, horizontal: true }}
                              />
                              <Slider
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={240}
                                className="account__graphic_slider"
                              />
                            </div>
                          </div>
                        </Tab>
                        <Tab key="parametrs" title="Параметры">
                          <div className="account__tab-content">
                            <Select
                              className="max-w-xs account__select-kp"
                              size="sm"
                              selectedKeys={getSafeSelectedKeys()}
                              onSelectionChange={handleSelectionChange}
                              label={getSelectLabel()}
                              selectionMode="single">
                              {getCurrentOptions().map((kp) => (
                                <SelectItem key={kp.key}>{kp.label}</SelectItem>
                              ))}
                            </Select>
                            <h2 className="account__modal-graphic-title">График</h2>

                            <div className="account__graphic">
                              <LineChart
                                xAxis={[
                                  {
                                    label: activeTab === 'graphics' ? 'Кадры' : 'Измерения',
                                    data: coordinates.map((_point, index) => index + 1) || [],
                                    min: value[0],
                                    max: value[1],
                                  },
                                ]}
                                yAxis={[
                                  {
                                    label: activeTab === 'graphics' ? 'Координаты' : 'Значения',
                                  },
                                ]}
                                series={[
                                  {
                                    data: coordinates.map((point) => point.y) || [],
                                    color: 'black',
                                  },
                                ]}
                                className="account__graphic"
                                grid={{ vertical: true, horizontal: true }}
                              />
                              <Slider
                                value={value}
                                onChange={handleChange}
                                valueLabelDisplay="auto"
                                min={0}
                                max={240}
                                className="account__graphic_slider"
                              />
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </ModalBody>
                  <ModalFooter style={{ borderTop: '2px solid rgb(210, 210, 210)' }}>
                    <Button color="default" variant="light" onPress={onClose}>
                      Закрыть
                    </Button>
                    <Button color="default" variant="bordered" onPress={onClose}>
                      Редактировать
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </div>
  );
};

export const Account = () => {
  const location = useLocation();
  let user = location.state?.user;

  const [editableUser, _setEditableUser] = useState<User>(user);

  const renderRole = () => {
    if (editableUser.roll === 'doctor') {
      return 'врача';
    } else return 'пациента';
  };

  const reviewsRef = useRef(null);
  const funcRef = useRef(null);

  return (
    <>
      <Header reviewsRef={reviewsRef} funcRef={funcRef} />
      <main>
        <div className="account_container">
          <div className="account_wrapper">
            <div className="account_title-block">
              <h1 className="account_title">Личный кабинет {renderRole()}</h1>

              <Button color="default" className="account__editBtn" variant="ghost">
                Редактировать
              </Button>
            </div>
            <div className="account_user">
              <Image
                isZoomed
                alt="Image"
                className="account_user-img"
                src={
                  'https://app.requestly.io/delay/1000/https://www.iso.org/files/live/sites/isoorg/files/events/2024/AM/dummy/avatar-white.png/thumbnails/900x900'
                }
              />
              <UserProfile user={user} />
            </div>
            <div>
              <ActionHistory actions={user.history} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
