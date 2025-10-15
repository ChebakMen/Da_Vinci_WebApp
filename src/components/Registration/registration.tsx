import '../../styles/registration.scss';
import { Input, Button, Tabs, Tab, Link } from '@heroui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/footer';
import { Header } from '../Header/header';

export const Registration = () => {
  const [_email, _setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('Patient');

  const [doctorInfo, setDoctorInfo] = useState({
    id: '1',
    fio: '',
    phone: '',
    roll: 'doctor',
    history: [],
    email: '',
    workAddress: '',
  });

  const [patientInfo, setPatientInfo] = useState({
    id: '1',
    fio: '',
    email: '',
    phone: '',
    roll: 'pacient',
    history: [],
    height: '',
    weight: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   // Проверяем email и пароль
  //   if (email === 'admin@gmail.com' && password === '12345') {
  //     navigate('/account', {
  //       state: {
  //         user: {
  //           email,
  //           last_name: 'Иванов',
  //           first_name: 'Иван',
  //           surname_name: 'Олегович',
  //           history: [
  //             {
  //               id: '1',
  //               timestamp: new Date(),
  //               description: 'Проверка на описание',
  //               pdfUrl: 'https://example.com/action1.pdf',
  //             },
  //             {
  //               id: '2',
  //               timestamp: new Date(Date.now() - 3600000),
  //               description: 'Проверка на описание',
  //               pdfUrl: 'https://example.com/action2.pdf',
  //             },
  //             {
  //               id: '3',
  //               timestamp: new Date(Date.now() - 86400000),
  //               description: 'Проверка на описание',
  //               pdfUrl: 'https://example.com/action3.pdf',
  //             },
  //           ],
  //           img: 'https://app.requestly.io/delay/2000/https://steamuserimages-a.akamaihd.net/ugc/2392061760868746700/DAE90E2D3A8D80943729851AB7BBD0F677FB6BCC/?imw=512&imh=341&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true',
  //           phone: '8999999999',
  //           roll: 'Admin',
  //           id: 1,
  //         },
  //       },
  //     });
  //   } else if (email === 'user@gmail.com' && password === '12345') {
  //     navigate('/account', {
  //       state: {
  //         user: {
  //           email,
  //           last_name: 'Пит',
  //           first_name: 'Брэд',
  //           surname_name: 'Олегович',
  //           history: [],
  //           img: 'https://app.requestly.io/delay/2000/https://amiel.club/uploads/posts/2022-03/1647762844_3-amiel-club-p-kartinki-litsa-cheloveka-3.png',
  //           phone: '88001821212',
  //           roll: 'User',
  //           id: 2,
  //         },
  //       },
  //     });
  //   } else if (email === 'doctor@gmail.com' && password === '12345') {
  //     navigate('/account', {
  //       state: {
  //         user: {
  //           email,
  //           last_name: 'Шекспир',
  //           first_name: 'Вильям',
  //           surname_name: 'Александрович',
  //           history: [
  //             {
  //               id: '1',
  //               timestamp: new Date(),
  //               description: 'Первичная оценка позвоносника Захиров И.А.',
  //               pdfUrl: 'https://example.com/action1.pdf',
  //             },
  //           ],
  //           img: 'https://app.requestly.io/delay/2000/https://www.iso.org/files/live/sites/isoorg/files/events/2024/AM/dummy/avatar-white.png/thumbnails/900x900',
  //           phone: '882123012',
  //           roll: 'Doctor',
  //           id: 3,
  //         },
  //       },
  //     });
  //   } else {
  //     setError('Неверный email или пароль');
  //   }
  // };

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (!password && !confirmPassword) {
      setError('Нужно заполнить поля данными');
      return;
    }

    if (activeTab === 'Doctor') {
      console.log('Регистрация доктора', doctorInfo, password);
      // Тут можно добавить логику для отправки данных доктора на сервер

      navigate('/account', {
        state: {
          user: {
            email: doctorInfo.email,
            fio: doctorInfo.fio,
            phone: doctorInfo.phone,
            roll: doctorInfo.roll,
            history: [],
          },
        },
      });
    } else {
      console.log('Регистрация пациента', patientInfo, password);
      // Тут можно добавить логику для отправки данных пациента на сервер

      navigate('/account', {
        state: {
          patientInfo,
        },
      });
    }
  };

  //убрать потом
  const reviewsRef = useRef(null);
  const funcRef = useRef(null);

  return (
    <div className="">
      <Header reviewsRef={reviewsRef} funcRef={funcRef} />
      <main className="registration__main">
        <div className="registration__circleBgi"></div>

        <div className="registration_container">
          <h1 className="registration_title">Регистрация</h1>

          <div className="registration_wrapper">
            <Tabs
              aria-label="Options"
              selectedKey={activeTab}
              onSelectionChange={(key) => setActiveTab(String(key))}>
              <Tab key="Doctor" title="Доктор" className="registration_tab">
                {activeTab === 'Doctor' && (
                  <div className="registration_tab_content">
                    <Input
                      label="ФИО"
                      className="registration_input"
                      placeholder="Введите ФИО"
                      type="text"
                      variant="bordered"
                      value={doctorInfo.fio}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, fio: e.target.value })}
                    />
                    <Input
                      label="Номер телефона"
                      className="registration_input"
                      placeholder="Введите номер телефона"
                      type="number"
                      variant="bordered"
                      value={doctorInfo.phone}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, phone: e.target.value })}
                    />
                    <Input
                      label="Почта"
                      className="registration_input"
                      placeholder="Введите почту"
                      type="email"
                      variant="bordered"
                      value={doctorInfo.email}
                      onChange={(e) => setDoctorInfo({ ...doctorInfo, email: e.target.value })}
                    />
                    <Input
                      label="Адрес работы"
                      className="registration_input"
                      placeholder="Введите адрес работы"
                      type="text"
                      variant="bordered"
                      value={doctorInfo.workAddress}
                      onChange={(e) =>
                        setDoctorInfo({
                          ...doctorInfo,
                          workAddress: e.target.value,
                        })
                      }
                    />
                    <Input
                      className="registration_input"
                      label="Пароль"
                      placeholder="Введите пароль"
                      type="password"
                      variant="bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      className="registration_input"
                      label="Подтвердите пароль"
                      placeholder="Повторите пароль"
                      type="password"
                      variant="bordered"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Link color="foreground" className="registration_link" href="/authorisation">
                      Войти
                    </Link>
                  </div>
                )}
              </Tab>
              <Tab key="Patient" title="Пациент" className="registration_tab">
                {activeTab === 'Patient' && (
                  <>
                    <Input
                      label="ФИО"
                      className="registration_input"
                      placeholder="Введите ФИО"
                      type="text"
                      variant="bordered"
                      value={patientInfo.fio}
                      onChange={(e) => setPatientInfo({ ...patientInfo, fio: e.target.value })}
                    />
                    <Input
                      label="Почта"
                      className="registration_input"
                      placeholder="Введите почту"
                      type="email"
                      variant="bordered"
                      value={patientInfo.email}
                      onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                    />
                    <Input
                      label="Номер телефона"
                      className="registration_input"
                      placeholder="Введите номер телефона"
                      type="number"
                      variant="bordered"
                      value={patientInfo.phone}
                      onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                    />
                    <Input
                      label="Рост"
                      className="registration_input"
                      placeholder="Введите рост"
                      type="number"
                      variant="bordered"
                      value={patientInfo.height}
                      onChange={(e) => setPatientInfo({ ...patientInfo, height: e.target.value })}
                    />
                    <Input
                      label="Вес"
                      className="registration_input"
                      placeholder="Введите вес"
                      type="number"
                      variant="bordered"
                      value={patientInfo.weight}
                      onChange={(e) => setPatientInfo({ ...patientInfo, weight: e.target.value })}
                    />
                    <Input
                      className="registration_input"
                      label="Пароль"
                      placeholder="Введите пароль"
                      type="password"
                      variant="bordered"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      className="registration_input"
                      label="Подтвердите пароль"
                      placeholder="Повторите пароль"
                      type="password"
                      variant="bordered"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Link color="foreground" className="registration_link" href="/authorisation">
                      Войти
                    </Link>
                  </>
                )}
              </Tab>
            </Tabs>

            <Button
              color="default"
              className="registration__btn "
              variant="ghost"
              onClick={handleRegistration}>
              Зарегистрироваться
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
