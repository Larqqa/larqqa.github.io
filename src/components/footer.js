import React from 'react';
import '../styles/components/footer.scss';

const Footer = () => {
  return(
    <footer className="footer footer--main">
      <p>Made with ☕ & ❤️ | <b>Larqqa</b> ©️ {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;