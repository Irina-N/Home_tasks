import React from 'react';
import propTypes from "prop-types";
import Header from './Header.jsx';
import ChatList from './ChatList.jsx'
import MessageField from './MessageField.jsx';
import '../styles/styles.css';

export default class Layout extends React.Component {
    static propTypes = {
        chatId: propTypes.number,
    };

    static defaultProps = {
        chatId: 1,
    }


    render() {
        return <div className="layout">
            <Header chatId={this.props.chatId} />
            <div className="content">
                <ChatList />
                <MessageField chatId={this.props.chatId} />
            </div>
        </div>;
    }
}