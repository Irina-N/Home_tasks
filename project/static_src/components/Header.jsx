import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUserInfo } from '../actions/profile.jsx';

class Header extends React.Component {
    static propTypes = {
        userInfo: propTypes.object.isRequired,
        chats: propTypes.object.isRequired,
        chatId: propTypes.string,
        fetchUserInfo: propTypes.func.isRequired,
        profileRequestStatus: propTypes.string.isRequired,
    }

    componentDidMount() {
        if (this.props.profileRequestStatus === '' || this.props.profileRequestStatus === 'error') {
            this.props.fetchUserInfo();
        }
    }


    render() {
        const { userInfo, chats, chatId } = this.props;
        const title = chats[chatId]?.title ?? 'Hello!';
        return (
            <div className='header'>
                <Link to="/profile/" className="profile_link">
                    {userInfo.userName}
                </Link>
                {title}
            </div >
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.profileReducer.userInfo,
    profileRequestStatus: state.profileReducer.profileRequestStatus,
    chats: state.chatsReducer.chats,
});

const mapDispatchToProps = dispatch => {
    return {
        fetchUserInfo: () => dispatch(fetchUserInfo()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)