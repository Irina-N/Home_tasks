import React from 'react';
import propTypes from 'prop-types';

export default class Message extends React.Component {
    static propTypes = {
        text: propTypes.string.isRequired,
        sender: propTypes.string,
    };

    render() {
        return <div className="message" style={{ alignSelf: this.props.sender == 'me' ? 'flex-end' : 'flex-start' }}>
            <p className="message_text">{this.props.text}</p>
            <p className="message_sender">{this.props.sender}</p>
        </div >
    }
}