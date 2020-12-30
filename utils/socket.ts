import io from 'socket.io-client';

export function connect(namespace: string = 'default', token: string = '') {
    return io(`${process.env.WS_URL}/${namespace}?token=${token}`, {transports: ['websocket']});
}
