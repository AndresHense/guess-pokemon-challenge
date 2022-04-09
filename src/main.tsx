import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/press-start-2p';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import './index.css';

const theme = extendTheme({
  fonts: {
    body: '"Press Start 2P", sans-serif',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
