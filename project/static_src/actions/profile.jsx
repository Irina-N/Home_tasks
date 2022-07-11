import { changeUserNameInPrevMessages } from './message.jsx';
import { REQUEST_STATUSES } from '../constants.jsx';

export const EDIT_PROFILE = 'PROFILE::EDIT_PROFILE';
export const PROFILE_LOADING_STARTED = 'PROFILE::PROFILE_LOADING_STARTED';
export const PROFILE_LOADING_SUCCESS = 'PROFILE::PROFILE_LOADING_SUCCESS';
export const PROFILE_LOADING_ERROR = 'PROFILE::PROFILE_LOADING_ERROR';

export const editProfile = (userName, userAge) => {
    return {
        type: EDIT_PROFILE,
        payload: {
            userName,
            userAge,
        },
    }
}

export const editUserInfo = (userName, userAge) => (dispatch) => {
    dispatch(changeUserNameInPrevMessages(userName));
    dispatch(editProfile(userName, userAge));
}


export const setProfileRequestStatusStarted = () => ({
    type: PROFILE_LOADING_STARTED,
    payload: REQUEST_STATUSES.STARTED,
});

export const setProfileRequestStatusSuccess = () => ({
    type: PROFILE_LOADING_SUCCESS,
    payload: REQUEST_STATUSES.SUCCESS,
});

export const setProfileRequestStatusError = () => ({
    type: PROFILE_LOADING_ERROR,
    payload: REQUEST_STATUSES.ERROR,
});

export const fetchUserInfo = () => (dispatch) => {
    dispatch(setProfileRequestStatusStarted());
    fetch('/api/profile.json')
        .then(response => {
            return response.json()
        })
        .then(userInfo => {

            dispatch(editProfile(userInfo.userName, userInfo.userAge));
            dispatch(setProfileRequestStatusSuccess());
        })
        .catch(err => {
            dispatch(setProfileRequestStatusError());
            console.log('We didn\'t get User info', err);

        })
}