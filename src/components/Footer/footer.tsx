import '../../styles/Footer.scss';

import Gos_svg from '/src/assets/img/gos.svg';
import Logo from '/src/assets/img/logo_xl.svg';
import TG_svg from '/src/assets/img/tg.svg';
import VK_svg from '/src/assets/img/vk.svg';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__contacts">
          <h2 className="footer__title">Контакты</h2>
          <div className="footer__mail-and-tel">
            <a className="footer__connection" href="mailto:pochta@gmail.com">
              Email: pochta@gmail.com
            </a>
            <a className="footer__connection" href="tel:+7-888-898-88-13">
              +7 888 898-88-13
            </a>
          </div>
        </div>
        <div className="footer__social">
          <h2 className="footer__title">Мы в соцсетях</h2>
          <div className="footer__social-items">
            <a className="footer__social-item" href="https://vk.com/da_vinciiii">
              <img src={VK_svg} alt="" />
            </a>
            <a className="footer__social-item" href="https://vk.com/da_vinciiii">
              <img src={TG_svg} alt="" width={'40px'} height={'40px'} />
            </a>
            <a
              className="footer__social-item"
              href="https://rutube.ru/video/c6cc4d620b1d4338901770a44b3e82f4/"
              target="_blank">
              <img src={Gos_svg} alt="" className="" />
            </a>
          </div>
        </div>

        <a href="/">
          <img src={Logo} alt="" className="footer__logo" />
        </a>
      </div>
    </footer>
  );
}
