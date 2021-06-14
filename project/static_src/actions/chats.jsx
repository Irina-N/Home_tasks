import { addChatIdToMessages } from '../actions/message.jsx'

export const ADD_CHAT = 'CHATS::ADD_CHAT';
/* export const DELETE_CHAT = 'CHATS::DELETE_CHAT'; */
export const HIGHLIGHT_CHAT = 'CHATS::HIGHLIGHT_CHAT';
export const UNHIGHLIGHT_CHAT = 'CHATS::UNHIGHLIGHT_CHAT';
export const CHATS_LOADING_STARTED = 'CHATS::CHATS_LOADING_STARTED';
export const CHATS_LOADING_SUCCESS = 'CHATS::CHATS_LOADING_SUCCESS';
export const CHATS_LOADING_ERROR = 'CHATS::CHATS_LOADING_ERROR';
export const CHATS_LOADING_IDLE = 'CHATS::CHATS_LOADING_IDLE';

export const addChat = (title, chatId) => {
    return {
        type: ADD_CHAT,
        payload: {
            title,
            chatId,
        },
    }
};

export const addChatThunk = (title, chatId) => (dispatch) => {
    dispatch(addChatIdToMessages(chatId));
    dispatch(addChat(title, chatId));
};

/* export const deleteChat = (chats) => {
    return {
        type: DELETE_CHAT,
        payload: { chats },
    }
}; */

/* export const deleteChatThunk = (chatId) => (dispatch, getState) => {
    const chats = getState().chatsReducer.chats;    
    delete chats[chatId];    
    dispatch(deleteChat(chats));
} */

export const highlightChat = (chatId) => {
    return {
        type: HIGHLIGHT_CHAT,
        payload: {
            chatId,
        },
    }
};

export const unHighlightChat = (chatId) => {
    return {
        type: UNHIGHLIGHT_CHAT,
        payload: {
            chatId,
        },
    }
};

export const setChatsRequestStatusStarted = () => ({
    type: CHATS_LOADING_STARTED,
    payload: 'started',
});

export const setChatsRequestStatusSuccess = () => ({
    type: CHATS_LOADING_SUCCESS,
    payload: 'success',
});

export const setChatsRequestStatusError = () => ({
    type: CHATS_LOADING_ERROR,
    payload: 'error',
});

export const setChatsRequestStatusIdle = () => ({
    type: CHATS_LOADING_IDLE,
    payload: 'idle',
})

export const fetchChats = () => (dispatch) => {
    dispatch(setChatsRequestStatusStarted());
    fetch('/api/chats.json')
        .then(response => {
            return response.json()
        })
        .then(chats => {
            dispatch(setChatsRequestStatusSuccess());
            for (let chatId in chats) {
                dispatch(addChat(chats[chatId].title, chatId));
            };
            dispatch(setChatsRequestStatusIdle());
        })
        .catch(err => {
            dispatch(setChatsRequestStatusError());
            console.log('We didn\'t get chats', err);
            dispatch(setChatsRequestStatusIdle());
        })
}