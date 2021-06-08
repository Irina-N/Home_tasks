import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Router from './components/Router.jsx';
import { Provider } from 'react-redux';
import { store, persistor } from './store.jsx';
import { PersistGate } from 'redux-persist/es/integration/react';

/* import MuiThemeProvider from '@material-ui/core/styles'; */

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <BrowserRouter>
                < Router />
            </BrowserRouter>
        </PersistGate>
    </Provider>,

    document.getElementById('root'),
);
