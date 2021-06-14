import React from 'react';
import propTypes from "prop-types";
import { connect } from 'react-redux';
import Header from './Header.jsx';
import ChatList from './ChatList.jsx'
import MessageField from './MessageField.jsx';
import '../styles/styles.css';

class Layout extends React.Component {
    static propTypes = {
        chatId: propTypes.string,
        chats: propTypes.object.isRequired,
        messages: propTypes.object.isRequired,
    };

    /* static defaultProps = {
        chatId: 'chat1',
    } */


    render() {
        const { chatId } = this.props;

        return <div className="layout">
            <Header
                chatId={chatId}
            />
            <div className="content">
                <ChatList />
                <MessageField
                    chatId={chatId}
                />
            </div>
        </div>;
    }
};

const mapStateToProps = state => ({
    chats: state.chatsReducer.chats,
    messages: state.messagesReducer.messages
})

export default connect(mapStateToProps)(Layout);