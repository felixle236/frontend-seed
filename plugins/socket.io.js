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

            const accessToken = store.state.auth && store.state.auth.accessToken ? store.state.auth.accessToken : '';
            sockets[field] = io(`${process.env.WS_URL}/${namespace}?token=${accessToken}`, {transports: ['websocket']});
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
