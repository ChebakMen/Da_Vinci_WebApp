import '../../styles/registration.scss';
import { Input, Button, Tabs, Tab, Link } from '@heroui/react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/footer';
import { Header } from '../Header/header';
import userStore from '../../stores/user';

export const Registration = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('patient');

  const [userInfo, setUserInfo] = useState({
    id: '1',
    fio: '',
    phone: '',
    roll: `${activeTab}`,
    email: '',
    workAddress: '',
    height: '',
    weight: '',
    history: [],
  });

  const [error, _setError] = useState('');
  const navigate = useNavigate();

  const handleRegistration = () => {
    if (password !== confirmPassword) {
      return;
    }

    userStore.registration(userInfo, password).then(() => {
      if (userStore.user !== null) {
        navigate('/account');
      }
    });
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
              <Tab key="patient" title="Пациент" className="registration_tab">
                {activeTab === 'patient' && (
                  <>
                    <Input
                      label="ФИО"
                      className="registration_input"
                      placeholder="Введите ФИО"
                      type="text"
                      variant="bordered"
                      value={userInfo.fio}
                      onChange={(e) => setUserInfo({ ...userInfo, fio: e.target.value })}
                    />
                    <Input
                      label="Почта"
                      className="registration_input"
                      placeholder="Введите почту"
                      type="email"
                      variant="bordered"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                    <Input
                      label="Номер телефона"
                      className="registration_input"
                      placeholder="Введите номер телефона"
                      type="number"
                      variant="bordered"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                    <Input
                      label="Рост"
                      className="registration_input"
                      placeholder="Введите рост"
                      type="number"
                      variant="bordered"
                      value={userInfo.height}
                      onChange={(e) => setUserInfo({ ...userInfo, height: e.target.value })}
                    />
                    <Input
                      label="Вес"
                      className="registration_input"
                      placeholder="Введите вес"
                      type="number"
                      variant="bordered"
                      value={userInfo.weight}
                      onChange={(e) => setUserInfo({ ...userInfo, weight: e.target.value })}
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
              <Tab key="doctor" title="Доктор" className="registration_tab">
                {activeTab === 'doctor' && (
                  <div className="registration_tab_content">
                    <Input
                      label="ФИО"
                      className="registration_input"
                      placeholder="Введите ФИО"
                      type="text"
                      variant="bordered"
                      value={userInfo.fio}
                      onChange={(e) => setUserInfo({ ...userInfo, fio: e.target.value })}
                    />
                    <Input
                      label="Номер телефона"
                      className="registration_input"
                      placeholder="Введите номер телефона"
                      type="number"
                      variant="bordered"
                      value={userInfo.phone}
                      onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                    />
                    <Input
                      label="Почта"
                      className="registration_input"
                      placeholder="Введите почту"
                      type="email"
                      variant="bordered"
                      value={userInfo.email}
                      onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                    />
                    <Input
                      label="Адрес работы"
                      className="registration_input"
                      placeholder="Введите адрес работы"
                      type="text"
                      variant="bordered"
                      value={userInfo.workAddress}
                      onChange={(e) =>
                        setUserInfo({
                          ...userInfo,
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
