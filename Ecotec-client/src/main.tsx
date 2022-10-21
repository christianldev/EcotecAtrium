import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './assets/css/index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import './plugins/logging';
import PreviewLoaders from './components/ui/loaders/PreviewLoaders';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<PreviewLoaders />}>
      <Provider store={store}>
        <App />
      </Provider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
