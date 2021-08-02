import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import { DataStoreProvider } from './store/context';

ReactDOM.render(
  <React.StrictMode>
    <DataStoreProvider>
      <App />
    </DataStoreProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
