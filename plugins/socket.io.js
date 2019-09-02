import io from 'socket.io-client';

export default ({store}, inject) => {
    const sockets = {
        connect: (namespace) => {
            let field = namespace;
            if (!namespace) {
                namespace = '';
                field = 'default';
            }
            if (sockets[field] && sockets[field].connected)
                sockets[field].disconnect();

            const accessToken = store.state.user.userAuth && store.state.user.userAuth.accessToken ? store.state.user.userAuth.accessToken : '';
            sockets[field] = io(`${process.env.API_URL}/${namespace}?token=${accessToken}`);
            return sockets[field];
        },
        disconnect: (namespace) => {
            const field = namespace || 'default';
            if (sockets[field] && sockets[field].connected)
                sockets[field].disconnect();
            delete sockets[field];
        }
    };

    inject('sockets', sockets);
};
