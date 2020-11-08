const INITIAL_STATE = {
    token: null,
    signed: false,
    loading: false,
};
export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case '@auth/SIGN_IN_REQUEST':
            state.loading = true;
            return {
                ...state,
            };
        case '@auth/SIGN_IN_SUCCESS':
            const Newauth = {};
            Newauth.token = action.payload.token;
            Newauth.signed = true;
            Newauth.loading = false;
            return Newauth;
        case '@auth/SIGN_FAILURE':
            state.loading = false;
            return {
                ...state,
            };
        case '@auth/SIGN_OUT':
            state.token = null;
            state.signed = false;
            return {
                ...state,
            };
        default:
            return state;
    }
}
