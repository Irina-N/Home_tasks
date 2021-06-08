import { ADD_CHAT, DELETE_CHAT, HIGHLIGHT_CHAT, UNHIGHLIGHT_CHAT } from '../actions/chats.jsx';

const initialState = {
    chats: {
        'chat1': { title: 'Lorem', highlighted: false },
        'chat2': { title: 'Ipsum', highlighted: false },
        'chat3': { title: 'Dolor', highlighted: false },
        'chat4': { title: 'Sit', highlighted: false },
        'chat5': { title: 'Amet', highlighted: false },
    },
};



export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            const chatId = 'chat' + (Object.keys(state.chats).length + 1);
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [chatId]: { title: action.payload.title, highlighted: false }
                }
            }

        /* case DELETE_CHAT:
            return {
                ...state,
                chats: action.payload.chats,
            } */

        case HIGHLIGHT_CHAT:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload.chatId]: { ...state.chats[action.payload.chatId], highlighted: true }
                }
            }
        case UNHIGHLIGHT_CHAT:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload.chatId]: { ...state.chats[action.payload.chatId], highlighted: false }
                }
            }

        default:
            return state;
    }
}
