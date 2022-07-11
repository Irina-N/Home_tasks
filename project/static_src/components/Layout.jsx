import React from 'react';
import { connect } from 'react-redux';
import propTypes from "prop-types";

import Header from './Header.jsx';
import ChatList from './ChatList.jsx';
import InstallPopup from './InstallPopup.jsx';
import MessageField from './MessageField.jsx';

import '../styles/styles.css';

class Layout extends React.Component {
    static propTypes = {
        chatId: propTypes.string,
        chats: propTypes.object.isRequired,
        messages: propTypes.object.isRequired,
    };

    render() {
        const { chatId } = this.props;

        return <div className="layout">
            <Header
                chatId={chatId}
                site="chats"
            />
            <div className="content">
                <div className={chatId ? "chatlist hidden_mob" : "chatlist"}>
                    <ChatList />
                </div >
                <div className={chatId ? "message_field" : "message_field hidden_mob"}>
                    <MessageField
                        chatId={chatId}
                    />
                </div>
            </div>
            <InstallPopup />
        </div >;
    }
};

const mapStateToProps = state => ({
    chats: state.chatsReducer.chats,
    messages: state.messagesReducer.messages
})

export default connect(mapStateToProps)(Layout);