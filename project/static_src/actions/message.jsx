export const SEND_MESSAGE = 'MESSAGE::SEND_MESSAGE';

export const sendMessage = (messageId, text, sender, chatId) => {
    return {
        type: SEND_MESSAGE,
        payload: {
            messageId,
            text,
            sender,
            chatId,
        },
    }
}