import { ADD_CHAT, CHANGE_CHATS_IN_STATE, DELETE_CHAT, HIGHLIGHT_CHAT, UNHIGHLIGHT_CHAT, CHATS_LOADING_STARTED, CHATS_LOADING_SUCCESS, CHATS_LOADING_ERROR } from '../actions/chats.jsx';

const initialState = {
    chats: {},
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

        case CHANGE_CHATS_IN_STATE:
            return {
                ...state,
                chats: action.payload.updatedChats
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
            return {
                ...state,
                chatsRequestStatus: action.payload
            }

        default:
            return state;
    }
}
