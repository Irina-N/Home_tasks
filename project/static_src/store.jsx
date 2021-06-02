import { createStore, combineReducers } from 'redux';
import { chatsReducer } from './reducers/chats.jsx';
import { profileReducer } from './reducers/profile.jsx';

const rootReducer = combineReducers({
    chatsReducer,
    profileReducer,
});

export const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)