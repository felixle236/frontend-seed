import { io } from 'socket.io-client';

export function connectWS(wsUrl: string, namespace: string = 'default', token: string = '') {
    return io(`${wsUrl}/${namespace}`, {
        reconnectionDelayMax: 10000,
        transports: ['websocket'],
        auth: { token }
    });
}
