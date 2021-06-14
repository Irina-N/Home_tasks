import { ADD_CHAT, DELETE_CHAT, HIGHLIGHT_CHAT, UNHIGHLIGHT_CHAT, CHATS_LOADING_STARTED, CHATS_LOADING_SUCCESS, CHATS_LOADING_ERROR, CHATS_LOADING_IDLE } from '../actions/chats.jsx';

const initialState = {
    chats: {
        /* 'chat1': { title: 'Lorem', highlighted: false },
        'chat2': { title: 'Ipsum', highlighted: false },
        'chat3': { title: 'Dolor', highlighted: false },
        'chat4': { title: 'Sit', highlighted: false },
        'chat5': { title: 'Amet', highlighted: false }, */
    },
    chatsRequestStatus: '',
};



export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload.chatId]: { title: action.payload.title, highlighted: false }
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

        case CHATS_LOADING_STARTED:
        case CHATS_LOADING_SUCCESS:
        case CHATS_LOADING_ERROR:
        case CHATS_LOADING_IDLE:
            return {
                ...state,
                chatsRequestStatus: action.payload
            }

        default:
            return state;
    }
}
