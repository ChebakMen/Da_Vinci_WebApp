import '../../styles/authorisation.scss';

import { Input, Button, Link } from '@heroui/react';

import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/header';
import Footer from '../Footer/footer';

export const Authorisation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Проверяем email и пароль
    if (email === 'user@gmail.com' && password === '12345') {
      navigate('/account', {
        state: {
          user: {
            email,
            fio: 'Иванов Евгений Олегович',
            history: [],
            img: 'https://app.requestly.io/delay/2000/https://amiel.club/uploads/posts/2022-03/1647762844_3-amiel-club-p-kartinki-litsa-cheloveka-3.png',
            phone: '88001821212',
            roll: 'patient',
            id: 2,
          },
        },
      });
    } else if (email === 'doctor@gmail.com' && password === '12345') {
      navigate('/account', {
        state: {
          user: {
            email,
            fio: 'Дубров Алексей Александрович',
            history: [
              {
                id: '1',
                timestamp: new Date(),
                description: 'Первичная оценка позвоносника Захиров И.А.',
                pdfUrl: 'https://example.com/action1.pdf',
              },
              {
                id: '2',
                timestamp: new Date(),
                description: 'Первичная оценка позвоносника Захиров И.А.',
                pdfUrl: 'https://example.com/action1.pdf',
              },
            ],
            img: 'https://app.requestly.io/delay/2000/https://www.iso.org/files/live/sites/isoorg/files/events/2024/AM/dummy/avatar-white.png/thumbnails/900x900',
            phone: '882123012',
            roll: 'doctor',
            id: 3,
          },
        },
      });
    } else {
      setError('Неверный email или пароль');
    }
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
