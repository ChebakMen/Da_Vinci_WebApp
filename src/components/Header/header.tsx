import '../../styles/header.scss';

import { Button } from '@heroui/button';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="page-header">
      <div className="page-header__container container">
        <div className="page-header__wrapper">
          <Link to={'/'} className="page-header__logo">
            <div className="page-header__img"></div>
          </Link>
          <Button color="default" className="page-header__btn" variant="ghost">
            Отзывы
          </Button>
          <Button color="default" className="page-header__btn page-header__btn--b" variant="ghost">
            Начать
          </Button>
        </div>

        <Button color="default" className="page-header__btn page-header__btn--log" variant="ghost">
          <Link to={'/avtorization'}>Войти</Link>
        </Button>
        <div className="page-header__burger"></div>
      </div>
    </header>
  );
};
