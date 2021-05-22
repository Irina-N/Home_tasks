import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    static PropTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.string,
    };

    render() {
        return <div style={{ backgroundColor: "#CCC", width: "350px", minHeight: "30px", borderRadius: "8px", padding: "3px", marginBottom: "10px" }}>
            <p className="message_text" style={{ fontSize: "16px" }}>{this.props.text}</p>
            <p className="message_author" style={{ textAlign: "right", color: "tomato", fontSize: "12px" }}>{this.props.author}</p>
        </div >
    }
}