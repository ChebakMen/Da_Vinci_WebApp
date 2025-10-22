import '../../styles/account.scss';
import { useLocation } from 'react-router-dom';
import React, { useState, useRef } from 'react';
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

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setEditableUser((prev) => ({
  //     ...prev,
  //     [name]: name === 'age' ? Number(value) : value,
  //   }));
  // };

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

type KeypointCoordinates = KeypointCoordinate[];

interface ModalDataType {
  title: string;
  description: string;
  date: string;
  id: string;
  video: string;
  result: string;
}

export const ActionHistory: React.FC<ActionHistoryProps> = ({ actions }) => {
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
  const [coordinates, _setCoordinates] = useState<KeypointCoordinates>([]);
  const [value, setValue] = React.useState<number[]>([0, 25]);
  const [modalData, setModalData] = useState<ModalDataType | null>(null);

  const minDistance = 10;

  const handleOpenModal = (action: Action) => {
    setModalData({
      title: 'Заголовок по умолчанию или извлечь из action',
      description: action.description,
      date: action.timestamp.toLocaleString(),
      id: action.id,
      video: action.id,
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
                    <div className="account__modal-description ">
                      Прикрепленное видео: {modalData?.video}
                    </div>
                    <div className="account__tabs_wrapper">
                      <Select
                        className="max-w-xs  account__select-kp"
                        size="sm"
                        label="Выберите часть тела"
                        selectionMode="single">
                        {/* {keypointsOption.map((kp) => (
                              <SelectItem key={kp.key}>{kp.label}</SelectItem>
                            ))} */}

                        <SelectItem key={1}>Нос</SelectItem>
                        <SelectItem key={2}>Правый локоть</SelectItem>
                      </Select>
                      <Tabs aria-label="Options" className="">
                        <Tab key="graphics" title="Графики">
                          <div className="">
                            <h2 className="account__modal-graphic-title">График</h2>

                            <div className="account__graphic">
                              <LineChart
                                xAxis={[
                                  {
                                    label: 'Координаты точек',
                                    data: coordinates.map((_point, index) => index + 1) || [],
                                    min: value[0],
                                    max: value[1],
                                  },
                                ]}
                                yAxis={[
                                  {
                                    label: 'Ось X',
                                  },
                                ]}
                                series={[
                                  {
                                    data: coordinates.map((point) => point.x) || [],
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
                        <Tab key="parametrs" title="Параметры"></Tab>
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

  console.log(user);

  // const [actions, setActions] = useState<Action[]>([]);

  //убрать потом
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
