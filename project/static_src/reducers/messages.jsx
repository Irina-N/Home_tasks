import { SEND_MESSAGE, ADD_CHAT_ID_TO_MESSAGES } from '../actions/message.jsx';

const initialState = {
    messages: {
        'chat1': [{ text: "Привет!", sender: "bot" }],
        'chat2': [{ text: "Как дела?", sender: "bot" }],
        'chat3': [{ text: "This is Dolor!", sender: "bot" }],
        'chat4': [],
        'chat5': [{ text: "Amet?", sender: "bot" }]
    },
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

        default:
            return state;
    }
}



