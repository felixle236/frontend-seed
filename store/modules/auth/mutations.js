import types from '../../mutation-types';

export default {
    [types.USER_AUTH.PROFILE](state, profile) {
        state.profile = profile;
    },
    [types.USER_AUTH.ACCESS_TOKEN](state, accessToken) {
        state.accessToken = accessToken;
    },
    [types.USER_AUTH.CLAIMS](state, claims) {
        state.claims = claims;
    },
    [types.USER_AUTH.SIGNIN_MESSAGE](state, message) {
        state.signinMessage = message;
    }
};
