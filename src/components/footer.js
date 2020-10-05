import React from 'react';
import '../styles/components/footer.scss';

const Footer = () => {
  return(
    <footer>
      <p>Made with ☕ & ❤️ <strong>Larqqa</strong> ©️ {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;