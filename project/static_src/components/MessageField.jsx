import React from 'react';
import Message from './Message.jsx';

export default class MessageField extends React.Component {
    state = {
        messages: [
            ["Привет!", "homo sapiens"],
            ["Как дела?", "homo sapiens"]
        ],
    };

    handleClick = () => {
        this.setState({
            turn: 'homo sapiens',
            messages: [...this.state.messages, ['ok', 'homo sapiens']]
        });
    };

    componentDidUpdate() {
        if (this.state.messages[this.state.messages.length - 1][1] == 'homo sapiens') {
            setTimeout(() =>
                this.setState(
                    { messages: [...this.state.messages, ['I\'m a robot', 'robot']] }
                ), 1000);
        }
    }

    render() {
        const messageElements = this.state.messages.map((message, index) => {
            return (<Message key={index} text={message[0]} author={message[1]} />);
        });

        return <div> {messageElements}
            <button onClick={this.handleClick}>Send</button>
        </div>;
    }
}