import types from './types';

export default {
    [types.SOCKET_CURRENT_ROOM](state, room) {
        state.currentRoom = room;
    },
    [types.SOCKET_HAS_MENU_NEW_MESSAGE](state, hasMenuNewMessage) {
        state.hasMenuNewMessage = hasMenuNewMessage;
    },
    [types.SOCKET_HAS_ROOM_NEW_MESSAGE](state, hasRoomNewMessage) {
        state.hasRoomNewMessage = hasRoomNewMessage;
    },
    [types.SOCKET_CLEAR_MEMBERS](state) {
        state.members.splice(0, state.members.length);
    },
    [types.SOCKET_MEMBERS](state, members) {
        members.forEach(member => {
            const index = state.members.findIndex(c => c.id === member.id);
            if (index !== -1)
                Object.assign(state.members[index], member);
            else
                state.members.push(member);
        });
    },
    [types.SOCKET_MEMBER](state, member) {
        const index = state.members.findIndex(c => c.id === member.id);
        if (index !== -1)
            Object.assign(state.members[index], member);
        else
            state.members.push(member);
    },
    [types.SOCKET_CLEAR_MESSAGES](state) {
        state.messages.splice(0, state.messages.length);
    },
    [types.SOCKET_MESSAGES](state, messages) {
        messages.forEach(message => {
            message.createdAt = new Date(message.createdAt);
            message.updatedAt = new Date(message.updatedAt);

            if (!state.messages.length)
                state.messages.push(message);
            else {
                const index = state.messages.findIndex(m => m.id === message.id);
                if (index !== -1)
                    Object.assign(state.messages[index], message);
                else {
                    for (let i = state.messages.length - 1; i >= 0; i--) {
                        if (message.createdAt > state.messages[i].createdAt) {
                            state.messages.splice(i + 1, 0, message);
                            break;
                        }
                        if (i === 0)
                            state.messages.splice(i, 0, message);
                    }
                }
            }
        });
    },
    [types.SOCKET_MESSAGE](state, message) {
        message.createdAt = new Date(message.createdAt);
        message.updatedAt = new Date(message.updatedAt);

        // if (state.currentRoom === message.room) {
        if (!state.messages.length)
            state.messages.push(message);
        else {
            const index = state.messages.findIndex(m => m.id === message.id);
            if (index !== -1)
                Object.assign(state.messages[index], message);
            else {
                for (let i = state.messages.length - 1; i >= 0; i--) {
                    if (message.createdAt > state.messages[i].createdAt) {
                        state.messages.splice(i + 1, 0, message);
                        break;
                    }
                    if (i === 0)
                        state.messages.splice(i, 0, message);
                }
            }
        }
        // }
    },
};
