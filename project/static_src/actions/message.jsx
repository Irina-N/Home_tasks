import _ from 'lodash';

import { highlightChat, unHighlightChat } from './chats.jsx';
import { REQUEST_STATUSES } from '../constants.jsx';


export const SEND_MESSAGE = 'MESSAGE::SEND_MESSAGE';
export const ADD_CHAT_ID_TO_MESSAGES = 'MESSAGES::ADD_CHAT_ID_TO_MESSAGES';
export const CHANGE_MESSAGES_IN_STATE = 'MESSAGES::CHANGE_MESSAGES_IN_STATE';
export const MESSAGES_LOADING_STARTED = 'MESSAGES::MESSAGES_LOADING_STARTED';
export const MESSAGES_LOADING_SUCCESS = 'MESSAGES::MESSAGES_LOADING_SUCCESS';
export const MESSAGES_LOADING_ERROR = 'MESSAGES::MESSAGES_LOADING_ERROR';


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
            dispatch(fetchAnswer(text, chatId));
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

export const changeMessagesInState = (updatedMessages) => {
    return {
        type: CHANGE_MESSAGES_IN_STATE,
        payload: {
            updatedMessages,
        }
    }
}

export const changeUserNameInPrevMessages = (newUserName) => (dispatch, getState) => {
    const messages = getState().messagesReducer.messages;
    const updatedMessages = _.cloneDeep(messages);
    for (let chatId in updatedMessages) {
        updatedMessages[chatId].forEach(message => {
            if (message.sender !== 'bot') {
                message.sender = newUserName;
            }
        })
    }
    dispatch(changeMessagesInState(updatedMessages));
}

export const setMessagesRequestStatusStarted = () => ({
    type: MESSAGES_LOADING_STARTED,
    payload: REQUEST_STATUSES.STARTED,
});

export const setMessagesRequestStatusSuccess = () => ({
    type: MESSAGES_LOADING_SUCCESS,
    payload: REQUEST_STATUSES.SUCCESS,
});

export const setMessagesRequestStatusError = () => ({
    type: MESSAGES_LOADING_ERROR,
    payload: REQUEST_STATUSES.ERROR,
});

export const fetchMessages = () => (dispatch) => {
    dispatch(setMessagesRequestStatusStarted());
    fetch('/api/messages.json')
        .then(response => response.json())
        .then(messages => {
            dispatch(changeMessagesInState(messages));
            dispatch(setMessagesRequestStatusSuccess());
        })
        .catch(err => {
            dispatch(setMessagesRequestStatusError());
            console.log('We didn\'t get messages', err);
        })
}

const fetchAnswer = (text, chatId) => (dispatch) => {
    const num = parseInt(text, 10);
    if (isNaN(num)) {
        dispatch(sendMessageThunk('Enter the number', 'bot', chatId));
    } else {
        fetch(`http://numbersapi.com/${num}/math?json`)
            .then(response => {
                return response.json()
            })
            .then(answer => {
                dispatch(sendMessageThunk(answer.text, 'bot', chatId))
            })
            .catch(err => {
                console.log('We didn\'t get answer', err);
            })
    }
}
