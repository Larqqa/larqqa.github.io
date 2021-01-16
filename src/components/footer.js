import React from 'react';
import '../styles/components/footer.scss';

const Footer = () => {
  return(
    <footer className="footer footer--main">
      <p>Made with ☕ & ❤️ | <a href="https://github.com/Larqqa" target="_blank" rel="noopener noreferrer"><b>Larqqa</b></a> ©️ {new Date().getFullYear()}</p>
    </footer>
  );
};

export default Footer;