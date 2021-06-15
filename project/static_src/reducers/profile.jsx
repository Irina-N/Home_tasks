import { EDIT_PROFILE, PROFILE_LOADING_STARTED, PROFILE_LOADING_SUCCESS, PROFILE_LOADING_ERROR } from '../actions/profile.jsx';

const initialState = {
    userInfo: {},
    profileRequestStatus: '',
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case EDIT_PROFILE:
            return {
                ...state,
                userInfo: {
                    userName: action.payload.userName,
                    userAge: action.payload.userAge,
                }
            }

        case PROFILE_LOADING_STARTED:
        case PROFILE_LOADING_SUCCESS:
        case PROFILE_LOADING_ERROR:
            return {
                ...state,
                profileRequestStatus: action.payload
            }

        default:
            return state;
    }
}
