import types from '../../mutation-types';

export default {
    connectMessageSocket({state, commit}) {
        const socket = this.$sockets.connect('message');
        
        socket.on('connect', () => {
            console.log('connected');
        });
        socket.on('message_directly', data => {
            if (state.currentRoom === data.room) {
                data.user = state.contacts.find(c => c.id === data.userId);
                commit(types.SOCKET_MESSAGE, data);
            }
        });
        socket.on('message_directly_error', error => {
            console.log('message_directly_error', error);
        });
        socket.on('message_directly_successfully', data => {
            console.log('message_directly_successfully', data);
        });
        socket.on('message_room', data => {
            if (state.currentRoom === data.room) {
                data.user = state.contacts.find(c => c.id === data.userId);
                commit(types.SOCKET_MESSAGE, data);
            }
        });
        socket.on('message_room_error', error => {
            console.log('message_room_error', error);
        });
        socket.on('message_room_successfully', data => {
            console.log('message_room_successfully', data);
        });
    },
    sendMessage({state, commit}, {room, content}) {
        this.$sockets.message.emit('message_directly', {
            room: room,
            code: Date.now(),
            content
        });
    },
    sendMessageRoom({state, commit}, {room, content}) {
        this.$sockets.message.emit('message_room', {
            room: room,
            code: Date.now(),
            content
        });
    },
    loadMessages({state, commit}, {room}) {
        if (state.currentRoom !== room) {
            commit(types.SOCKET_MESSAGES, []);
            commit(types.SOCKET_CURRENT_ROOM, room);
        }
        // Load message history and load more in here.
    }
};
