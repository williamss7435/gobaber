const INITIAL_STATE = {
    profile: null,
}

export default function User(state = INITIAL_STATE, action){
    switch(action.type){
        case '@auth/SIGN_IN_SUCCESS': 
            const newState = {};
            newState.profile = action.payload.user
            return newState;
        case '@user/UPDATE_PROFILE_SUCCESS':
            const updateState = {};
            updateState.profile = action.payload.profile;
            return updateState;
        case '@auth/SIGN_OUT':
            state.profile = null;
            return {
                    ...state
            }
        default:
            return state;
    }
}