import { io } from 'socket.io-client';

export function connectWS(namespace: string = 'default', token: string = '') {
    return io(`${process.env.WS_URL}/${namespace}`, {
        reconnectionDelayMax: 10000,
        transports: ['websocket'],
        auth: { token }
    });
}
