import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/index';
import Pages from './pages';

const Root = () => {
  return (
    <Provider store={store}>
      <Pages />
    </Provider>
  );
};

export default Root;
