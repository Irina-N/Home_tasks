import { ADD_CHAT } from '../actions/chats.jsx';
import { SEND_MESSAGE } from '../actions/message.jsx';

const initialState = {
    chats: {
        'id1': { title: 'Lorem', messageList: [1] },
        'id2': { title: 'Ipsum', messageList: [2] },
        'id3': { title: 'Dolor', messageList: [3] },
        'id4': { title: 'Sit', messageList: [] },
        'id5': { title: 'Amet', messageList: [4] },
    },
    messages: {
        1: { text: "Привет!", sender: "bot" },
        2: { text: "Как дела?", sender: "bot" },
        3: { text: "This is Dolor!", sender: "bot" },
        4: { text: "Amet?", sender: "bot" },
    },
};

export const chatsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            const chatId = 'id' + (Object.keys(state.chats).length + 1);
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [chatId]: { title: action.payload.title, messageList: [] },
                }
            }

        case SEND_MESSAGE:
            return {
                ...state,
                chats: {
                    ...state.chats,
                    [action.payload.chatId]: {
                        ...state.chats[action.payload.chatId],
                        messageList: [...state.chats[action.payload.chatId].messageList, action.payload.messageId]
                    },
                },
                messages: {
                    ...state.messages,
                    [action.payload.messageId]: { text: action.payload.text, sender: action.payload.sender },
                }
            }

        default:
            return state;
    }
}
