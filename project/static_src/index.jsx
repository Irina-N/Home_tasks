import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import Router from './components/Router.jsx';
import { store, persistor } from './store.jsx';

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate persistor={persistor} loading={null}> */}
        <BrowserRouter>
            < Router />
        </BrowserRouter>
        {/*  </PersistGate> */}
    </Provider>,

    document.getElementById('root'),
);
