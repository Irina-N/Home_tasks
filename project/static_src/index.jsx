import React from 'react';
import ReactDOM from 'react-dom';
import Layout from './components/Layout.jsx';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router.jsx'
/* import MuiThemeProvider from '@material-ui/core/styles'; */

ReactDOM.render(
    <BrowserRouter>
        < Router />
    </BrowserRouter>,

    document.getElementById('root'),
);