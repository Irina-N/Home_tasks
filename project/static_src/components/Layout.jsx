import React from 'react';
import propTypes from "prop-types";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx'
import MessageField from './MessageField.jsx';
import { sendMessage } from '../actions/message.jsx'
import '../styles/styles.css';

class Layout extends React.Component {
    static propTypes = {
        chatId: propTypes.string.isRequired,
        chats: propTypes.object.isRequired,
        messages: propTypes.object.isRequired,
        sendMessage: propTypes.func.isRequired,

    };

    static defaultProps = {
        chatId: 'id1',
    }

    componentDidUpdate(prevProps) {
        const { messages } = this.props;
        if (Object.keys(prevProps.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].sender !== 'bot') {
            this.timer = setTimeout(() =>
                this.sendMessage('I\'m a robot', 'bot'), 500);
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    sendMessage = (message, sender) => {
        const { chatId, messages } = this.props;
        const messageId = Object.keys(messages).length + 1;
        this.props.sendMessage(messageId, message, sender, chatId);
    };

    render() {
        const { chatId, chats, messages } = this.props;

        return <div className="layout">
            <Header
                chatId={chatId}
            />
            <div className="content">
                <ChatList />
                <MessageField
                    chatId={chatId}
                    messages={messages}
                    sendMessage={this.sendMessage}
                />
            </div>
        </div>;
    }
};

const mapStateToProps = state => ({
    chats: state.chatsReducer.chats,
    messages: state.chatsReducer.messages
})

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Layout);