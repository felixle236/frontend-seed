import { io } from 'socket.io-client';

export function connectWS(wsUrl: string, namespace: string = 'default', token: string = '') {
    return io(`${wsUrl}/${namespace}`, {
        reconnectionDelayMax: 10000,
        transports: ['websocket'],
        auth: { token }
    });
}

/**
 * Return the ack function when we use emit with ack.
 */
export function ackTimeout(onSuccess: Function, onTimeout: Function, timeout: number) {
    let isCalled = false;

    const timer = setTimeout(() => {
        if (isCalled) return;
        isCalled = true;
        onTimeout();
    }, timeout);

    return (...args: any[]) => {
        if (isCalled) return;
        isCalled = true;
        clearTimeout(timer);
        onSuccess.apply(this, args);
    };
}
