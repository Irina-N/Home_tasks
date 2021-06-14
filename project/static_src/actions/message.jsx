import { highlightChat, unHighlightChat } from './chats.jsx'

export const SEND_MESSAGE = 'MESSAGE::SEND_MESSAGE';
export const ADD_CHAT_ID_TO_MESSAGES = 'MESSAGES::ADD_CHAT_ID_TO_MESSAGES';
export const MESSAGES_LOADING_STARTED = 'MESSAGES::MESSAGES_LOADING_STARTED';
export const MESSAGES_LOADING_SUCCESS = 'MESSAGES::MESSAGES_LOADING_SUCCESS';
export const MESSAGES_LOADING_ERROR = 'MESSAGES::MESSAGES_LOADING_ERROR';
export const MESSAGES_LOADING_IDLE = 'MESSAGES::MESSAGES_LOADING_IDLE';

export const sendMessage = (text, sender, chatId) => {
    return {
        type: SEND_MESSAGE,
        payload: {
            text,
            sender,
            chatId,
        },
    }
}

export const sendMessageThunk = (text, sender, chatId) => (dispatch) => {
    dispatch(sendMessage(text, sender, chatId));
    if (sender != 'bot') {
        setTimeout(() => {
            dispatch(sendMessageThunk('I\'m a robot', 'bot', chatId));
        }, 500);
    } else if (sender == 'bot') {
        dispatch(highlightChat(chatId));
        setTimeout(() => {
            dispatch(unHighlightChat(chatId));
        }, 1600);
    }
}

export const addChatIdToMessages = (chatId) => {
    return {
        type: ADD_CHAT_ID_TO_MESSAGES,
        payload: {
            chatId,
        }
    }
}

export const setMessagesRequestStatusStarted = () => ({
    type: MESSAGES_LOADING_STARTED,
    payload: 'started',
});

export const setMessagesRequestStatusSuccess = () => ({
    type: MESSAGES_LOADING_SUCCESS,
    payload: 'success',
});

export const setMessagesRequestStatusError = () => ({
    type: MESSAGES_LOADING_ERROR,
    payload: 'error',
});

export const setMessagesRequestStatusIdle = () => ({
    type: MESSAGES_LOADING_IDLE,
    payload: 'idle',
})

export const fetchMessages = () => (dispatch) => {
    dispatch(setMessagesRequestStatusStarted());
    console.log('go');
    fetch('/api/messages.json')
        .then(response => response.json())
        .then(messages => {
            dispatch(setMessagesRequestStatusSuccess());
            /* messages[chatId].forEach(message => {
                dispatch(sendMessage(message.text, message.sender, chatId));
            }); */
            for (let chatId in messages) {
                messages[chatId].forEach(message => {
                    dispatch(sendMessage(message.text, message.sender, chatId));
                });
            }
            dispatch(setMessagesRequestStatusIdle());
        })
        .catch(err => {
            dispatch(setMessagesRequestStatusError());
            console.log('We didn\'t get messages', err);
            dispatch(setMessagesRequestStatusIdle());
        })

    /* types: [
        START_MESSAGES_LOADING,
        {
            type: SUCCESS_MESSAGES_LOADING,
            payload: (action, state, res) => getJSON(res).then(
                json => json,
            ),
        },
        ERROR_MESSAGES_LOADING,
    ], */
}
