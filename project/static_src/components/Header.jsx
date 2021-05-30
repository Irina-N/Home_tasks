import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    static propTypes = {
        chatId: propTypes.number,
    }

    static defaultProps = {
        chatId: 1,
    }

    render() {
        return (
            <div className='header'>
                <Link to="/profile/" className="profile_link">
                    profile
                </Link>
                Чат { this.props.chatId}
            </div >
        )
    }
}