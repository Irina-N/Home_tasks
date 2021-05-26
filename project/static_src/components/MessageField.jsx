import React from 'react';
import { TextField, Fab } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Message from './Message.jsx';

export default class MessageField extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    state = {
        messages: [
            { text: "Привет!", sender: "bot" },
            { text: "Как дела?", sender: "bot" }
        ],
        input: '',
    };

    componentDidMount() {
        this.textInput.current.focus();
    }

    sendMessage = (message) => {
        this.setState(prevState => {
            return {
                messages: [...prevState.messages, { text: message, sender: "me" }],
                input: ''
            }
        });
    }

    handleClick = (message) => {
        if (this.state.input != '') {
            this.sendMessage(message)
        }
    };

    handleChange = (event) => {
        this.setState({ input: event.target.value });
    };

    handleKeyUp = (event, message) => {
        if (event.key == 'Enter' && this.state.input != '') {
            this.sendMessage(message)
        }
    };

    componentDidUpdate() {
        this.textInput.current.focus();
        if (this.state.messages[this.state.messages.length - 1].sender == 'me') {
            setTimeout(() =>
                this.setState(prevState => {
                    return { messages: [...prevState.messages, { text: 'I\'m a robot', sender: 'robot' }] }
                }), 500);
        }
    }

    render() {
        const messageElements = this.state.messages.map((message, index) => {
            return (<Message key={index} text={message.text} sender={message.sender} />);
        });

        return <div className="message_field">
            <div className="messages_board">
                {messageElements}
            </div>
            <div className="text_field">
                <TextField
                    id="outlined-basic"
                    className="typing_text"
                    name="input"
                    variant="outlined"
                    ref={this.textInput}
                    /* fullWidth={true} */
                    style={{ fontSize: '22px' }}
                    onChange={this.handleChange}
                    value={this.state.input}
                    onKeyUp={(event) => this.handleKeyUp(event, this.state.input)} />
                <Fab
                    size='medium'
                    className="send_btn"
                    onClick={() => this.handleClick(this.state.input)}>
                    <SendIcon />
                </Fab>
            </div>
        </div>;
    }
}