import types from '../../mutation-types';

export default {
    connectMessageSocket({state, commit}) {
        const socket = this.$sockets.connect('message');

        socket.on('connect', () => {
            console.log('Message socket is connected!');
            setTimeout(() => {
                this.$sockets.message.emit('member_list', {keyword: '', skip: 0, limit: 50});
            }, 100);
        });

        socket.on('disconnect', () => {
            console.log('Message socket is disconnected!');
        });

        socket.on('member_status', member => {
            commit(types.MESSAGE.MEMBER, member);
        });

        socket.on('member_list_error', error => {
            console.log('member_list_error', error);
        });

        socket.on('member_list_successfully', members => {
            commit(types.MESSAGE.MEMBERS, members);

            if (!this.$router.currentRoute.path.toLowerCase().startsWith('/message') && members.find(member => member.hasNewMessage))
                commit(types.MESSAGE.HAS_MENU_NEW_MESSAGE, true);
        });

        socket.on('message_list_error', error => {
            console.log('message_list_error', error);
        });

        socket.on('message_list_successfully', data => {
            const list = [];
            if (data && data.results) {
                data.results.forEach(message => {
                    if ((message.room === 0 && state.currentRoom === message.room) || state.currentRoom === message.receiverId || state.currentRoom === message.senderId) {
                        message.sender = state.members.find(member => member.id === message.senderId);
                        message.receiver = state.members.find(member => member.id === message.receiverId);
                        list.push(message);
                    }
                });
            }
            commit(types.MESSAGE.MESSAGES, list);
        });

        socket.on('message_directly', message => {
            if (state.currentRoom === message.receiverId || state.currentRoom === message.senderId) {
                message.sender = state.members.find(c => c.id === message.senderId);
                message.receiver = state.members.find(c => c.id === message.receiverId);
                commit(types.MESSAGE.MESSAGE, message);
            }
            else {
                const member = state.members.find(member => member.id === message.senderId);
                if (member)
                    member.hasNewMessage = true;
            }
            if (!this.$router.currentRoute.path.toLowerCase().startsWith('/message'))
                commit(types.MESSAGE.HAS_MENU_NEW_MESSAGE, true);
        });

        socket.on('message_directly_error', error => {
            console.log('message_directly_error', error);
        });

        socket.on('message_directly_successfully', message => {
            console.log('message_directly_successfully', message);
        });

        socket.on('message_room', message => {
            if (state.currentRoom === message.room) {
                message.sender = state.members.find(c => c.id === message.senderId);
                commit(types.MESSAGE.MESSAGE, message);
            }
            else
                commit(types.MESSAGE.HAS_ROOM_NEW_MESSAGE, true);

            if (!this.$router.currentRoute.path.toLowerCase().startsWith('/message'))
                commit(types.MESSAGE.HAS_MENU_NEW_MESSAGE, true);
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
    findMembers({state, commit}, {keyword, skip, limit}) {
        this.$sockets.message.emit('member_list', {keyword, skip, limit});
    },
    findMessages({state, commit}, {room, receiverId, skip, limit}) {
        if ((room === 0 && state.currentRoom !== room) || (receiverId && state.currentRoom !== receiverId) || !skip) {
            commit(types.MESSAGE.CLEAR_MESSAGES);
            commit(types.MESSAGE.CURRENT_ROOM, receiverId || room);
        }
        this.$sockets.message.emit('message_list', {room, receiverId, skip, limit});
    },
    sendMessage({state, commit}, {receiverId, content}) {
        this.$sockets.message.emit('message_directly', {
            receiverId,
            content
        });
    },
    sendMessageRoom({state, commit}, {room, content}) {
        this.$sockets.message.emit('message_room', {
            room,
            content
        });
    },
    clearNewMessageStatus({state, commit}, {room}) {
        if (room) {
            const member = state.members.find(member => member.id === room);
            if (member)
                member.hasNewMessage = false;
        }
        else
            commit(types.MESSAGE.HAS_ROOM_NEW_MESSAGE, false);
    },
    clearMenuNewMessageStatus({state, commit}) {
        commit(types.MESSAGE.HAS_MENU_NEW_MESSAGE, false);
    }
};
