import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SettingsIcon from '@material-ui/icons/Settings';

import PushToggle from './PushToggle.jsx';
import { fetchUserInfo } from '../actions/profile.jsx';
import { REQUEST_STATUSES } from '../constants.jsx';

class Header extends React.Component {
    static propTypes = {
        userInfo: propTypes.object.isRequired,
        chats: propTypes.object.isRequired,
        chatId: propTypes.string,
        site: propTypes.string.isRequired,
        fetchUserInfo: propTypes.func.isRequired,
        profileRequestStatus: propTypes.string.isRequired,
    }

    componentDidMount() {
        if (this.props.profileRequestStatus === '' || this.props.profileRequestStatus === REQUEST_STATUSES.ERROR) {
            this.props.fetchUserInfo();
        }
    }


    render() {
        const { chats, chatId, site } = this.props;
        const title = chats[chatId]?.title ?? site;
        const getClasses = (chatId, site) => {
            let classTitle = 'link_to_chats';
            if (site === "profile") {
                classTitle += ' unhidden';
            } else if (chatId) {
                classTitle += ' unhidden_mob';
            }
            return classTitle;
        }

        return (
            <div className='header'>
                <Link
                    to="/"
                    className={getClasses(chatId, site)}>
                    {'< Chats'}
                </Link>
                {title}
                <PushToggle />
                <Link to="/profile/" className="profile_link">
                    <SettingsIcon />
                </Link>
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