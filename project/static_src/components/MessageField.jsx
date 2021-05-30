import React from 'react';
import propTypes from 'prop-types'
import { TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message.jsx';

export default class MessageField extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    static propTypes = {
        chatId: propTypes.number.isRequired,
    }

    state = {
        chats: {
            1: { title: 'Lorem', messageList: [1] },
            2: { title: 'Ipsum', messageList: [2] },
            3: { title: 'Dolor', messageList: [3] },
            4: { title: 'Sit', messageList: [] },
            5: { title: 'Amet', messageList: [4] },
        },
        messages: {
            1: { text: "Привет!", sender: "bot" },
            2: { text: "Как дела?", sender: "bot" },
            3: { text: "This is Dolor!", sender: "bot" },
            4: { text: "Amet?", sender: "bot" },
        },
        input: '',
    };

    componentDidMount() {
        this.textInput.current.focus();
    }

    componentDidUpdate(prevProps, prevState) {
        const { messages } = this.state;
        if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].sender == 'me') {
            this.timer = setTimeout(() =>
                this.handleSendMessage('I\'m a robot', 'bot'), 500);
        }
        this.textInput.current.focus();
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    handleSendMessage = (message, sender) => {
        const { messages, chats, input } = this.state;
        const { chatId } = this.props;

        if (input.length > 0 || sender == 'bot') {
            const messageId = Object.keys(messages).length + 1;
            this.setState({
                messages: {
                    ...messages,
                    [messageId]: { text: message, sender: sender }
                },
                chats: {
                    ...chats,
                    [chatId]: {
                        ...chats[chatId],
                        messageList: [...chats[chatId]['messageList'], messageId]
                    }
                }
            });
        }
        if (sender == 'me') {
            this.setState({ input: '' });
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event) => {
        if (event.key == 'Enter') {
            this.handleSendMessage(this.state.input, 'me');
        }
    };

    render() {
        const { messages, chats } = this.state;
        const { chatId } = this.props;

        const messageElements = chats[chatId].messageList.map((messageId, index) => (
            <Message
                key={index}
                text={messages[messageId].text}
                sender={messages[messageId].sender}
            />)
        );

        return <div className="message_field">
            <div key='messageElements' className="messages_board">
                {messageElements}
            </div>
            <div key='textInput' className="text_field">
                <TextField
                    id="outlined-basic"
                    className="typing_text"
                    name="input"
                    variant="outlined"
                    ref={this.textInput}
                    onChange={this.handleChange}
                    value={this.state.input}
                    onKeyUp={this.handleKeyUp}
                />
                <Fab
                    size='medium'
                    className="send_btn"
                    onClick={() => this.handleSendMessage(this.state.input, 'me')}>
                    <SendIcon />
                </Fab>
            </div>
        </div >;
    }
}