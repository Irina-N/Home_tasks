import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout.jsx';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router.jsx';
import { Provider } from 'react-redux';
import { store } from './store.jsx'

/* import MuiThemeProvider from '@material-ui/core/styles'; */

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            < Router />
        </BrowserRouter>
    </Provider>,

    document.getElementById('root'),
);
