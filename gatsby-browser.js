// custom typefaces
// import 'typeface-montserrat'
// import 'typeface-merriweather'

// normalize CSS across browsers
import './src/styles/normalize.css';

// custom CSS styles
import './src/styles/style.scss';
import './src/styles/partials/spinner.scss';
import './src/styles/partials/loader.scss';

// Highlighting for code blocks
import 'prismjs/themes/prism-tomorrow.css';

import React from 'react';
import { ThemeProvider } from './src/context/ThemeContext';
export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
);

import 'katex/dist/katex.min.css';
