import { addChatIdToMessages } from '../actions/message.jsx'

export const ADD_CHAT = 'CHATS::ADD_CHAT';
/* export const DELETE_CHAT = 'CHATS::DELETE_CHAT'; */
export const HIGHLIGHT_CHAT = 'CHATS::HIGHLIGHT_CHAT';
export const UNHIGHLIGHT_CHAT = 'CHATS::UNHIGHLIGHT_CHAT';

export const addChat = (title) => {
    return {
        type: ADD_CHAT,
        payload: { title },
    }
};

export const addChatThunk = (title) => (dispatch, getState) => {
    const chats = getState().chatsReducer.chats;
    const chatId = 'chat' + (Object.keys(chats).length + 1);
    dispatch(addChatIdToMessages(chatId));
    dispatch(addChat(title));
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

