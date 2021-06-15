import { SEND_MESSAGE, ADD_CHAT_ID_TO_MESSAGES, CHANGE_MESSAGES_IN_STATE, MESSAGES_LOADING_STARTED, MESSAGES_LOADING_SUCCESS, MESSAGES_LOADING_ERROR } from '../actions/message.jsx';

const initialState = {
    messages: {
    },
    messagesRequestStatus: '',
};

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                ...state,
                messages: {
                    ...state.messages,
                    [action.payload.chatId]: [...state.messages[action.payload.chatId],
                    { text: action.payload.text, sender: action.payload.sender }]
                }
            }

        case ADD_CHAT_ID_TO_MESSAGES:
            return {
                ...state,
                messages: { ...state.messages, [action.payload.chatId]: [] }
            }

        case CHANGE_MESSAGES_IN_STATE:
            return {
                ...state,
                messages: action.payload.updatedMessages
            }

        case MESSAGES_LOADING_STARTED:
        case MESSAGES_LOADING_SUCCESS:
        case MESSAGES_LOADING_ERROR:
            return {
                ...state,
                messagesRequestStatus: action.payload
            }

        default:
            return state;
    }
}



