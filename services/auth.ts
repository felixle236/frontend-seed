import { $axios } from '~/utils/api';

export const authService = {
    authenticate(token: string) {
        return $axios.$post('/api/v1/auth', { token });
    },

    login(email: string, password: string) {
        return $axios.$post('/api/v1/auth/login', { email, password });
    }
};
