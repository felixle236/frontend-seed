import types from './types';

export default {
    [types.SOCKET_CURRENT_ROOM](state, room) {
        state.currentRoom = room;
    },
    [types.SOCKET_CONTACTS](state, contacts) {
        state.contacts = contacts || [];
    },
    [types.SOCKET_CONTACT](state, contact) {
        if (!state.contacts)
            state.contacts = [];
            
        const index = state.contacts.findIndex(c => c.id === contact.id);
        if (index !== -1)
            state.contacts[index] = contact;
        else
            state.contacts.push(contact);
    },
    [types.SOCKET_MESSAGES](state, messages) {
        state.messages = messages;
    },
    [types.SOCKET_MESSAGE](state, message) {
        if (state.currentRoom === message.room) {
            if (!state.messages)
                state.messages = [];
            
            if (!state.messages.length)
                state.messages.push(message);
            else {
                const index = state.messages.findIndex(m => m.code === message.code);
                if (index !== -1)
                    state.messages[index] = message;
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
