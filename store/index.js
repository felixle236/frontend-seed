import Vuex from 'vuex';
import auth from './modules/auth';
import {getCookie} from '../helpers/dataHelper';
import message from './modules/message';
import user from './modules/user';

export default function() {
    return new Vuex.Store({
        state: {},
        mutations: {},
        actions: {
            nuxtServerInit({state}, {req}) {
                state.auth.accessToken = null;
                state.auth.profile = null;
                state.auth.role = null;
                state.auth.claims = null;

                if (req.headers.cookie) {
                    const userAuth = getCookie('auth', req.headers.cookie);
                    if (userAuth) {
                        const data = JSON.parse(userAuth);
                        state.auth.profile = data.profile;
                        state.auth.accessToken = data.accessToken;
                        state.auth.role = data.role;
                        state.auth.claims = data.claims;
                    }
                }
            }
        },
        modules: {
            user,
            auth,
            message
        }
    });
};
