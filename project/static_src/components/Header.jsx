import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Header extends React.Component {
    static propTypes = {
        userInfo: propTypes.object.isRequired,
        chats: propTypes.object.isRequired,
        chatId: propTypes.string.isRequired,
    }

    render() {
        const { userInfo, chats, chatId } = this.props;
        return (
            <div className='header'>
                <Link to="/profile/" className="profile_link">
                    {userInfo.userName}
                </Link>
                {chats[chatId].title}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.profileReducer.userInfo,
    chats: state.chatsReducer.chats,
});

export default connect(mapStateToProps)(Header)