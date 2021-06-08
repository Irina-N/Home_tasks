export const SEND_MESSAGE = 'MESSAGE::SEND_MESSAGE';
export const ADD_CHAT_ID_TO_MESSAGES = 'MESSAGES::ADD_CHAT_ID_TO_MESSAGES';
import { highlightChat, unHighlightChat } from './chats.jsx'

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

