import { EDIT_PROFILE } from '../actions/profile.jsx';

const initialState = {
    userInfo: {
        userName: 'Lutra lutra',
        userAge: '29',
    }
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

        default:
            return state;
    }
}
