import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import store from './store';
import Header from '../src/components/Header';
import Router from '../src/components/Router';
// import Footer from '../src/components/footer';

import './styles/styleRoot.scss';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Header />
          <Router />
          {/* <Footer /> */}
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#560079',
      main: '#560079',
      dark: '#560079',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#fffebe',
      main: '#fffebe',
      dark: '#fffebe',
      contrastText: '#ffffff',
    },
  },
});

export default App;