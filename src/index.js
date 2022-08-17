import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store/store';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.scss'

const root = createRoot( document.querySelector('#root') );

root.render( 
    <Provider store={store}>
        <App /> 
    </Provider>
);