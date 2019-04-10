import types from '../../mutation-types';

export default {
    connectMessageSocket({state, commit}) {
        const socket = this.$sockets.connect('message');
        
        socket.on('connect', () => {
            console.log('Message socket is connected.');
        });
        
        socket.on('contact_status', contact => {
            commit(types.SOCKET_CONTACT, contact);
        });
        
        socket.on('contact_list_error', error => {
            console.log('contact_list_error', error);
        });
        
        socket.on('contact_list_successfully', contacts => {
            commit(types.SOCKET_CONTACTS, contacts);
            
            if (state.currentRoom === -1) {
                const room = 0;
                commit(types.SOCKET_CURRENT_ROOM, room);
                this.dispatch('socket/findMessages', {room, skip: 0, limit: 50});
            }
        });
        
        socket.on('message_list_error', error => {
            console.log('message_list_error', error);
        });
        
        socket.on('message_list_successfully', messages => {
            const list = [];
            messages.forEach(message => {
                if (state.currentRoom === message.room) {
                    message.sender = state.contacts.find(c => c.id === message.senderId);
                    message.receiver = state.contacts.find(c => c.id === message.receiverId);
                    list.push(message);
                }
            });
            commit(types.SOCKET_MESSAGES, list);
        });
        
        socket.on('message_directly', message => {
            if (state.currentRoom === message.room) {
                message.sender = state.contacts.find(c => c.id === message.senderId);
                message.receiver = state.contacts.find(c => c.id === message.receiverId);
                commit(types.SOCKET_MESSAGE, message);
            }
            else {
                const contact = state.contacts.find(contact => contact.id === message.senderId);
                if (contact)
                    contact.hasNewMessage = true;
            }
        });
        
        socket.on('message_directly_error', error => {
            console.log('message_directly_error', error);
        });
        
        socket.on('message_directly_successfully', message => {
            console.log('message_directly_successfully', message);
        });
        
        socket.on('message_room', message => {
            if (state.currentRoom === message.room) {
                message.sender = state.contacts.find(c => c.id === message.senderId);
                commit(types.SOCKET_MESSAGE, message);
            }
            else
                commit(types.SOCKET_HAS_ROOM_NEW_MESSAGE, true);
        });
        
        socket.on('message_room_error', error => {
            console.log('message_room_error', error);
        });
        
        socket.on('message_room_successfully', message => {
            console.log('message_room_successfully', message);
        });
        
        socket.on('notification', notification => {
            console.log('notification', notification);
        });
    },
    disconnectMessageSocket({state, commit}) {
        this.$sockets.disconnect('message');
    },
    findContacts({state, commit}, {keyword, skip, limit}) {
        this.$sockets.message.emit('contact_list', {keyword, skip, limit});
    },
    findMessages({state, commit}, {room, skip, limit}) {
        if (state.currentRoom !== room) {
            commit(types.SOCKET_CLEAR_MESSAGES);
            commit(types.SOCKET_CURRENT_ROOM, room);
        }
        this.$sockets.message.emit('message_list', {room, skip, limit});
    },
    sendMessage({state, commit}, {receiverId, content}) {
        this.$sockets.message.emit('message_directly', {
            receiverId,
            code: Date.now(),
            content
        });
    },
    sendMessageRoom({state, commit}, {room, content}) {
        this.$sockets.message.emit('message_room', {
            room,
            code: Date.now(),
            content
        });
    },
    clearNewMessageStatus({state, commit}, {room}) {
        if (room) {
            const contact = state.contacts.find(contact => contact.id === room);
            if (contact)
                contact.hasNewMessage = false;
        }
        else
            commit(types.SOCKET_HAS_ROOM_NEW_MESSAGE, false);
    }
};
