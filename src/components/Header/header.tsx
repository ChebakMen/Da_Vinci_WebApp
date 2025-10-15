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

type HeaderProps = {
  funcRef: React.RefObject<HTMLDivElement>;
  reviewsRef: React.RefObject<HTMLDivElement>;
};

export const Header: React.FC<HeaderProps> = ({ funcRef, reviewsRef }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isHomePage, setIsHomePage] = useState(false);
  const [isAccountPage, setIsAccountPage] = useState(false);

  useEffect(() => {
    setIsHomePage(location.pathname === '/');
    setIsAccountPage(location.pathname === '/account');
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

  return (
    <Navbar
      isBordered
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="page-header ">
      <NavbarContent className="sm:hidden pr-3 ">
        {isHomePage && <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} />}

        <NavbarBrand>
          <Link className="page-header__img" to="/"></Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex ">
        <NavbarBrand>
          <Link className="page-header__img" to="/"></Link>
        </NavbarBrand>

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
        <NavbarItem></NavbarItem>
      </NavbarContent>

      {isHomePage && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="default"
              className="page-header__btn page-header__btn--log"
              variant="ghost">
              <Link to={'/authorisation'}>Войти</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
      {isAccountPage && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              color="default"
              className="page-header__btn page-header__btn--log"
              variant="ghost">
              <Link to={'/authorisation'}>Выйти</Link>
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarMenu>
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
      </NavbarMenu>
    </Navbar>
  );
};
