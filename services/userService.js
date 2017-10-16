export default class UserService {
    constructor(axios) {
        this.axios = axios;
    }

    login(email, password) {
        return this.axios.post('/api/user/login', {email, password});
    }

    logout() {
        return this.axios.post('/api/user/logout');
    }
};
