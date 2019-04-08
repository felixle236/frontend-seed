import types from './types';

export default {
    [types.SOCKET_CURRENT_ROOM](state, room) {
        state.currentRoom = room;
    },
    [types.SOCKET_CLEAR_CONTACTS](state) {
        state.contacts.splice(0, state.contacts.length);
    },
    [types.SOCKET_CONTACTS](state, contacts) {
        contacts.forEach(contact => {
            const index = state.contacts.findIndex(c => c.id === contact.id);
            if (index !== -1)
                Object.assign(state.contacts[index], contact);
            else
                state.contacts.push(contact);
        });
    },
    [types.SOCKET_CONTACT](state, contact) {
        const index = state.contacts.findIndex(c => c.id === contact.id);
        if (index !== -1)
            Object.assign(state.contacts[index], contact);
        else
            state.contacts.push(contact);
    },
    [types.SOCKET_CLEAR_MESSAGES](state) {
        state.messages.splice(0, state.messages.length);
    },
    [types.SOCKET_MESSAGES](state, messages) {
        messages.forEach(message => {
            if (!state.messages.length)
                state.messages.push(message);
            else {
                const index = state.messages.findIndex(m => m.code === message.code);
                if (index !== -1)
                    Object.assign(state.messages[index], message);
                else {
                    for (let i = state.messages.length - 1; i >= 0; i--) {
                        if (message.time > state.messages[i].time) {
                            state.messages.splice(i + 1, 0, message);
                            break;
                        }
                    }
                }
            }
        });
    },
    [types.SOCKET_MESSAGE](state, message) {
        if (state.currentRoom === message.room) {
            if (!state.messages.length)
                state.messages.push(message);
            else {
                const index = state.messages.findIndex(m => m.code === message.code);
                if (index !== -1)
                    Object.assign(state.messages[index], message);
                else {
                    for (let i = state.messages.length - 1; i >= 0; i--) {
                        if (message.time > state.messages[i].time) {
                            state.messages.splice(i + 1, 0, message);
                            break;
                        }
                    }
                }
            }
        }
    },
};
