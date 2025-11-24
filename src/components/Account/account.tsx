import '../../styles/account.scss';
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
} from '@heroui/react';
import { Header } from '../Header/header';
import Footer from '../Footer/footer';
import functionalDataStore from '@/stores/functionalData.store';
import userStore from '../../stores/user';
import { IUser } from '../../models/IUser';
import { Action } from '../../models/HistoryAction';

// types.ts

interface UserProfileProps {
  user: IUser;
  onUserUpdate?: (updatedUser: IUser) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onUserUpdate }) => {
  const [editableUser, setEditableUser] = useState<IUser>(user);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [originalUser, setOriginalUser] = useState<IUser>(user);
  const [hasChanges, setHasChanges] = useState<boolean>(false);

  const handleEdit = () => {
    setIsEditing(true);
    setOriginalUser({ ...editableUser });
  };

  const handleCancel = () => {
    setEditableUser({ ...originalUser });
    setIsEditing(false);
    setHasChanges(false);
  };

  const handleSave = () => {
    console.log('Сохраненные данные:', editableUser);
    setIsEditing(false);
    setHasChanges(false);
    setOriginalUser({ ...editableUser });

    if (onUserUpdate) {
      onUserUpdate(editableUser);
    }
  };

  const handleInputChange = (field: keyof IUser, value: string) => {
    const updatedUser = { ...editableUser, [field]: value };
    setEditableUser(updatedUser);

    // Проверяем изменения
    const hasActualChanges = JSON.stringify(updatedUser) !== JSON.stringify(originalUser);
    setHasChanges(hasActualChanges);
  };

  return (
    <div className="account_user-data">
      <div className="account_user-field">
        <label className="account_user-label">ФИО:</label>
        <Input
          disabled={!isEditing}
          className="account_user-label-text"
          value={editableUser.fio}
          onValueChange={(value) => handleInputChange('fio', value)}
          classNames={{
            input: isEditing ? '!bg-white' : '',
            inputWrapper: isEditing ? '!bg-white data-[hover=true]:!bg-white' : '',
          }}
        />
      </div>

      <div className="account_user-field">
        <label className="account_user-label">Телефон:</label>
        <Input
          disabled={!isEditing}
          className="account_user-label-text"
          value={editableUser.phone}
          type="number"
          onValueChange={(value) => handleInputChange('phone', value)}
          classNames={{
            input: isEditing ? '!bg-white' : '',
            inputWrapper: isEditing ? '!bg-white data-[hover=true]:!bg-white' : '',
          }}
        />
      </div>

      <div className="account_user-field">
        <label className="account_user-label">Email:</label>
        <Input
          disabled={!isEditing}
          className="account_user-label-text"
          value={editableUser.email}
          type="email"
          onValueChange={(value) => handleInputChange('email', value)}
          classNames={{
            input: isEditing ? '!bg-white' : '',
            inputWrapper: isEditing ? '!bg-white data-[hover=true]:!bg-white' : '',
          }}
        />
      </div>
      <div className="account_user-actions">
        {!isEditing ? (
          <Button color="default" className="account__editBtn" variant="ghost" onPress={handleEdit}>
            Редактировать
          </Button>
        ) : (
          <div className="account_user-actions">
            <Button
              color="primary"
              className="account__saveBtn"
              variant="solid"
              onPress={handleSave}
              isDisabled={!hasChanges}>
              Сохранить
            </Button>
            <Button
              color="default"
              className="account__cancelBtn"
              variant="bordered"
              onPress={handleCancel}>
              Отмена
            </Button>
          </div>
        )}
      </div>
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
    const plainData = JSON.parse(JSON.stringify(data));

    if (!Array.isArray(plainData)) {
      console.error('Expected data to be an array, got:', typeof plainData);
      return keypointCoordinates;
    }

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

      if (!Array.isArray(items)) {
        continue;
      }

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

  if (!data || !Array.isArray(data)) {
    return parameterValues;
  }

  data.forEach((paramSet, index) => {
    if (!paramSet || typeof paramSet !== 'object') {
      return;
    }

    const value = paramSet[parameter as keyof typeof paramSet];

    if (Array.isArray(value)) {
      value.forEach((val, arrayIndex) => {
        parameterValues.push({
          frame: `${index}_${arrayIndex}`,
          x: arrayIndex + 1,
          y: val,
        });
      });
    } else if (typeof value === 'number') {
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
  const keypoints = functionalDataStore.keypoints || [];
  const parameters = functionalDataStore.parameters || [];

  const [data, setData] = useState<KeypointData | ParamsData | null>(null);
  const [coordinates, setCoordinates] = useState<KeypointCoordinates>([]);
  const [activeTab, setActiveTab] = useState<string>('graphics');
  const [selectedOption, setSelectedOption] = useState<Set<Key>>(new Set(['nose']));

  const columns = [
    { key: 'timestamp', label: 'Дата действия' },
    { key: 'description', label: 'Описание' },
    { key: 'download', label: 'PDF' },
    { key: 'more', label: 'Действия' },
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
      setData(keypoints as KeypointData);
    } else if (activeTab === 'parametrs') {
      setData(parameters as ParamsData);
    }
  }, [activeTab, keypoints, parameters]);

  const handleSelectionChange = (keys: any) => {
    if (typeof keys === 'string') {
      setSelectedOption(new Set([keys]));
    } else if (keys instanceof Set) {
      setSelectedOption(keys);
    } else if (keys && typeof keys === 'object' && 'currentKey' in keys) {
      setSelectedOption(new Set([keys.currentKey]));
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

  const getSafeSelectedKeys = () => {
    const currentOptions = getCurrentOptions();
    const selectedKey = Array.from(selectedOption)[0];

    if (currentOptions.some((option) => option.key === selectedKey)) {
      return selectedOption;
    }

    return new Set([currentOptions[0]?.key || '']);
  };

  const chartData = coordinates.map((point) => point.y) || [];
  const xAxisData = coordinates.map((_point, index) => index + 1) || [];

  return (
    <div>
      <h2 className="account__history-title">История действий:</h2>
      {!actions || actions.length === 0 ? (
        <p className="account__history account__history-empty">История пуста</p>
      ) : (
        <>
          <Table aria-label="Action history table">
            <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={actions}>
              {(action) => (
                <TableRow key={action.id}>
                  <TableCell>{action.timestamp.toLocaleString()}</TableCell>
                  <TableCell>{action.description}</TableCell>
                  <TableCell>
                    <button onClick={() => handleDownload(action.pdfUrl)}>Скачать PDF</button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onPress={() => handleOpenModal(action)}
                      className="account__btn account__btn--log">
                      Подробнее
                    </Button>
                  </TableCell>
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
            onOpenChange={onOpenChange}
            aria-modal="true"
            role="dialog"
            shouldBlockScroll={true}
            disableAnimation={false}>
            <ModalContent>
              {(onClose) => (
                <>
                  <ModalHeader
                    className="account__modal-title"
                    style={{ borderBottom: '2px solid rgb(210, 210, 210)' }}>
                    {modalData?.date}
                  </ModalHeader>
                  <ModalBody className="account__modal-body ">
                    <div className="account__modal-description ">
                      Описание: {modalData?.description}
                    </div>
                    <div className="account__modal-description account__modal-description--fz16 ">
                      Прикрепленное видео: {modalData?.video}
                    </div>

                    <div className="account__tabs_wrapper">
                      <Tabs
                        aria-label="Analysis data tabs"
                        selectedKey={activeTab}
                        className="md:pl-0 pl-5"
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
                              selectionMode="single"
                              disallowEmptySelection>
                              {getCurrentOptions().map((kp) => (
                                <SelectItem key={kp.key} textValue={kp.label}>
                                  {kp.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <h2 className="account__modal-graphic-title">График</h2>

                            <div className="account__graphic">
                              <>
                                <LineChart
                                  xAxis={[
                                    {
                                      label: activeTab === 'graphics' ? 'Координата по X' : 'Кадры',
                                      data: xAxisData,
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
                                      data: chartData,
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
                              </>
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
                              selectionMode="single"
                              disallowEmptySelection>
                              {getCurrentOptions().map((kp) => (
                                <SelectItem key={kp.key} textValue={kp.label}>
                                  {kp.label}
                                </SelectItem>
                              ))}
                            </Select>
                            <h2 className="account__modal-graphic-title">График</h2>

                            <div className="account__graphic">
                              <>
                                <LineChart
                                  xAxis={[
                                    {
                                      label: 'Измерения',
                                      data: xAxisData,
                                      min: value[0],
                                      max: value[1],
                                    },
                                  ]}
                                  yAxis={[
                                    {
                                      label: 'Значения',
                                    },
                                  ]}
                                  series={[
                                    {
                                      data: chartData,
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
                              </>
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
                    {/* <Button color="default" variant="bordered" onPress={onClose}>
                      Редактировать
                    </Button> */}
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
  const defaultUser: IUser = {
    id: '0',
    fio: 'Неизвестный пользователь',
    phone: '780080080',
    history: [
      {
        id: '1',
        timestamp: new Date(),
        description: 'Первичная оценка позвоночника Захиров И.А.',
        pdfUrl: 'https://example.com/action1.pdf',
      },
      {
        id: '2',
        timestamp: new Date(),
        description: 'Первичная оценка шейного отдела Захиров И.А.',
        pdfUrl: 'https://example.com/action1.pdf',
      },
    ],
    roll: 'patient',
    email: 'Не указан',
  };

  const [editableUser, setEditableUser] = useState<IUser>(userStore.user || defaultUser);

  const renderRole = () => {
    if (editableUser.roll === 'doctor') {
      return 'врача';
    } else return 'пациента';
  };

  const handleUserUpdate = (updatedUser: IUser) => {
    setEditableUser(updatedUser);
    // Здесь можно добавить логику сохранения на сервер
    console.log('Пользователь обновлен:', updatedUser);
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
            </div>
            <div className="account_user">
              <Image
                isZoomed
                alt="User avatar"
                className="account_user-img"
                src={
                  'https://app.requestly.io/delay/500/https://www.iso.org/files/live/sites/isoorg/files/events/2024/AM/dummy/avatar-white.png/thumbnails/900x900'
                }
              />
              <UserProfile user={editableUser} onUserUpdate={handleUserUpdate} />
            </div>
            <div>
              <ActionHistory actions={editableUser.history} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
