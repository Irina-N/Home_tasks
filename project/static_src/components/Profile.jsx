import React from 'react';
import { Link } from 'react-router-dom';
import { TextField, Fab } from '@material-ui/core';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';
import propTypes from "prop-types";
import { connect } from 'react-redux';
import { editUserInfo, fetchUserInfo } from '../actions/profile.jsx'


class Profile extends React.Component {
    static propTypes = {
        userInfo: propTypes.object.isRequired,
        editUserInfo: propTypes.func.isRequired,
    }

    state = {
        userNameInput: this.props.userInfo.userName,
        userAgeInput: this.props.userInfo.userAge,
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleEditProfile = (name, age) => {
        if (name == '') {
            name = this.props.userInfo.userName;
        }
        if (age == '') {
            age = this.props.userInfo.userAge;
        }
        this.props.editUserInfo(name, age);
    }

    render() {
        const { userInfo } = this.props;
        const { userNameInput, userAgeInput } = this.state;
        return (
            <div className="profile">
                <header className="profile_header">
                    <Link to="/">
                        Back to chats
                    </Link>
                    <span className="profile_header_title">{userInfo.userName}</span>
                </header>
                <div className="profile_data">
                    <div className="user_name user_info_block">
                        <span className="user_info_title">User name: </span>
                        <TextField
                            className="user_name_input"
                            name="userNameInput"
                            variant="outlined"
                            placeholder="Change name"
                            onChange={this.handleChange}
                            value={userNameInput}
                        />

                    </div>
                    <div className="user_age user_info_block">
                        <span className="user_info_title">User age: </span>
                        <TextField
                            className="user_age_input"
                            name="userAgeInput"
                            placeholder="Change age"
                            variant="outlined"
                            onChange={this.handleChange}
                            value={userAgeInput}>
                        </TextField>
                    </div>

                    <Button
                        className="edit_profile_btn"
                        onClick={() => this.handleEditProfile(userNameInput, userAgeInput)}
                        variant="contained"
                        color="primary"
                        size="large"
                        startIcon={<SaveIcon />}
                    >
                        Save
                    </Button>
                </div>
            </div >
        )
    }
}

const mapStateToProps = state => ({
    userInfo: state.profileReducer.userInfo,
});

const mapDispatchToProps = dispatch => {
    return {
        editUserInfo: (name, age) => dispatch(editUserInfo(name, age)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)