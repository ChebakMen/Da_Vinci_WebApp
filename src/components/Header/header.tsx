import '../../styles/header.scss';
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Button,
} from '@heroui/react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/user';

type HeaderProps = {
  funcRef: React.RefObject<HTMLDivElement>;
  reviewsRef: React.RefObject<HTMLDivElement>;
};

export const Header: React.FC<HeaderProps> = observer(({ funcRef, reviewsRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [isAccountPage, setIsAccountPage] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
    setIsAccountPage(location.pathname === '/account');
    setIsAuthPage(location.pathname === '/authorisation' || location.pathname === '/registration');
  }, [location.pathname]);

  const scrollToReviews = () => {
    setIsMenuOpen(false);
    if (reviewsRef.current) {
      reviewsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFunc = () => {
    setIsMenuOpen(false);
    if (funcRef.current) {
      funcRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAuthButtonClick = () => {
    setIsMenuOpen(false);
    if (userStore.user) {
      navigate('/account');
    } else {
      navigate('/authorisation');
    }
  };

  const handleLogout = () => {
    setIsMenuOpen(false);
    userStore.logout();
    navigate('/');
  };

  const getAuthButtonText = () => {
    if (userStore.user) {
      if (isAccountPage === true) {
        return 'Выйти';
      }
      return 'Аккаунт';
    } else {
      return isAccountPage ? 'Выйти' : 'Войти';
    }
  };

  // Показывать ли кнопки авторизации/аккаунта
  const showAuthButtons = !isAuthPage;

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="page-header">
      <NavbarContent className="sm:hidden pr-3">
        {isHomePage && <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />}
        <NavbarBrand>
          <Link className="page-header__img" to="/"></Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex">
        <NavbarBrand>
          <Link className="page-header__img" to="/"></Link>
        </NavbarBrand>
        {isHomePage && (
          <>
            <NavbarItem>
              <Button
                color="default"
                className="page-header__btn"
                variant="ghost"
                onClick={scrollToReviews}>
                Отзывы
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button
                color="default"
                className="page-header__btn page-header__btn--b"
                variant="ghost"
                onClick={scrollToFunc}>
                Начать
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {showAuthButtons && (
        <NavbarContent justify="end">
          <NavbarItem>
            {userStore.user ? (
              <Button
                color="default"
                className="page-header__btn page-header__btn--log"
                onClick={isAccountPage ? handleLogout : handleAuthButtonClick}
                variant="ghost">
                {getAuthButtonText()}
              </Button>
            ) : (
              <Button
                color="default"
                className="page-header__btn page-header__btn--log"
                onClick={isAccountPage ? handleLogout : handleAuthButtonClick}
                variant="ghost">
                {getAuthButtonText()}
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
        {isHomePage && (
          <>
            <Button
              color="default"
              className="page-header__btn"
              variant="ghost"
              onClick={scrollToReviews}>
              Отзывы
            </Button>
            <Button
              color="default"
              className="page-header__btn page-header__btn--b"
              variant="ghost"
              onClick={scrollToFunc}>
              Начать
            </Button>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
});
