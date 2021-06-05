export const EDIT_PROFILE = 'PROFILE::EDIT_PROFILE';

export const editProfile = (userName, userAge) => {
    return {
        type: EDIT_PROFILE,
        payload: {
            userName,
            userAge,
        },
    }
}