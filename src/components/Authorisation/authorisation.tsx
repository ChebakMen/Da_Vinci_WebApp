import '../../styles/authorisation.scss';

import { Input, Button, Link } from '@heroui/react';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/header';
import Footer from '../Footer/footer';

import userStore from '../../stores/user';

export const Authorisation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, _setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    userStore.login(email, password).then(() => {
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

      <main className="authorization__main">
        <div className="authorization__circleBgi"></div>

        <div className="authorization_container">
          <h1 className="authorization_title">Вход</h1>

          <div className="authorization_wrapper">
            <Input
              label="Email"
              className="authorization_input"
              placeholder="Введите вашу почту"
              type="email"
              variant={'bordered'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              className="authorization_input"
              label="Password"
              placeholder="Введите пароль"
              type="password"
              variant={'bordered'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link color="foreground" className="authorization_link" href="/registration">
              Регистрация
            </Link>

            <Button
              color="default"
              className="authorization__btn "
              variant="ghost"
              onClick={handleLogin}>
              Войти
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
