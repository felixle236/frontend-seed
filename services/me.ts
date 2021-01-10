import { $axios } from '~/utils/api';

export const meService = {
    getProfile() {
        return $axios.$get('/api/v1/me');
    }
};
