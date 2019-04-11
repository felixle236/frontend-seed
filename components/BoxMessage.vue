<template>
    <div class="box-left box-message">
        <div class="box-heading">
            <div class="row">
                <div class="col-md-8">
                    <img
                        v-if="receiver"
                        :src="receiver.avatar ? apiUrl + receiver.avatar : '/images/default-avatar.jpg'"
                        alt=""
                        class="img-avatar"
                    >
                    <i
                        v-if="receiver && receiver.isOnline"
                        class="fa fa-circle green"
                        :class="{'gray': !receiver.isOnline}"
                        aria-hidden="true"
                    />
                    <h3 class="user-name">
                        {{ receiver ? receiver.firstName + ' ' + receiver.lastName : 'All members' }}
                    </h3>
                </div>
                <div class="col-md-4">
                    <div class="group-search">
                        <input
                            type="text"
                            placeholder="Keyword"
                            class="input-search"
                        >
                        <i
                            class="fa fa-search"
                            aria-hidden="true" 
                        />
                    </div>
                </div>
            </div>
        </div>
        <div v-show="room === -1">
            <h1>Welcome to Nuxt JS</h1>
            <p class="description"> 
                Our goal is to create a framework flexible enough that you can use it as a main project base or in addition to your current project based on Node.js.<br>
                Nuxt.js presets all the configuration needed to make your development of a Vue.js Application Server Rendered more enjoyable.
            </p>
        </div>
        <div
            class="box-content"
            ref="boxContent"
            v-show="room !== -1"
        >
            <div class="box-chat">
                <div
                    class="row row-8"
                    v-for="(message, index) in messages"
                    :key="index"
                >
                    <div
                        class="col-auto col-style"
                        v-if="message.senderId !== userAuth.id"
                    >
                        <img
                            :src="message.sender ? apiUrl + message.sender.avatar : '/images/default-avatar.jpg'"
                            alt="avatar"
                            class="img-avatar"
                        >
                    </div>
                    <div
                        class="col-md-10 col-style mess-left"
                        v-if="message.senderId !== userAuth.id"
                    >
                        <div class="bg-content">
                            <!-- <h3 class="txt-name">
                                {{  }}
                            </h3> -->
                            <p class="txt-content">
                                {{ message.content }}
                            </p>
                            <p class="txt-time">
                                {{ message.sender ? (message.sender.firstName + ' ' + message.sender.lastName).trim() : '' }}, {{ message.time | formatDate }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="col col-style text-right offset-md-2"
                        v-if="message.senderId === userAuth.id"
                    >
                        <div class="bg-content owner">
                            <p class="txt-content">
                                {{ message.content }}
                            </p>
                            <p class="txt-time">
                                {{ message.time | formatDate }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="row send-message no-gutters"
            v-show="room !== -1"
        >
            <div class="col">
                <!-- <i class="i-con icon-emoji" /> -->
                <img
                    v-if="profile" 
                    :src="profile.avatar ? apiUrl + profile.avatar : '/images/default-avatar.jpg'"
                    alt="avatar"
                    class="img-avatar-send"
                >
                <input
                    ref="content"
                    type="text"
                    class="input-send"
                    placeholder="Message...."
                    v-model="content"
                    @keyup.enter="send"
                >
            </div>
            <div class="col-1 text-right w50">
                <i
                    class="i-con icon-send"
                    @click="send"
                />
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    data: () => ({
        apiUrl: process.env.API_URL,
        receiverId: undefined,
        receiver: undefined,
        room: -1,
        skip: 0,
        limit: 50,
        content: ''
    }),
    computed: {
        ...mapGetters('user', [
            'userAuth',
            'profile'
        ]),
        ...mapGetters('socket', [
            'contacts',
            'messages'
        ]),
    },
    watch: {
        'messages': function(newMessages, oldMessages) {
            if (this.$refs.boxContent) {
                if (this.skip === 0) {
                    setTimeout(() => {
                        this.$refs.boxContent.scrollTo(0, this.$refs.boxContent.scrollHeight);
                    }, 10);
                }
                else {
                    if (this.$refs.boxContent.scrollTop + this.$refs.boxContent.offsetHeight === this.$refs.boxContent.scrollHeight) {
                        setTimeout(() => {
                            $(this.$refs.boxContent).animate({scrollTop: this.$refs.boxContent.scrollHeight});
                        }, 10);
                    }
                }
                this.skip = newMessages.length;
            }
        }
    },
    methods: {
        ...mapActions('socket', [
            'findMessages',
            'sendMessage',
            'sendMessageRoom',
            'clearNewMessageStatus'
        ]),
        load(room, receiverId) {
            this.receiverId = receiverId;
            this.room = room;
            this.skip = 0;
            this.receiver = receiverId && this.contacts.find(contact => contact.id === receiverId);
            if (this.$refs.content)
                setTimeout(() => this.$refs.content.select(), 10);
            
            this.findMessages({room: this.room, skip: this.skip, limit: this.limit});
            this.clearNewMessageStatus({room: this.receiverId});
        },
        send() {
            if (this.content) {
                if (this.receiverId)
                    this.sendMessage({receiverId: this.receiverId, content: this.content});
                else
                    this.sendMessageRoom({room: this.room, content: this.content});
            
                this.content = '';
            }
        }
    },
    filters: {
        formatDate(value) {
            if (!value) return '';
            
            if (Date.now() - value <= 10000)
                return 'Just a second';
                
            if (Date.now() - value <= 60000)
                return 'Just a minute';
            
            const date = new Date(value);
            const compareTime = new Date(value).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0);
            
            if (compareTime === 0)
                return 'Today ' + date.toLocaleTimeString();
                
            if (compareTime === 86400000)
                return 'Yesterday ' + date.toLocaleTimeString();
            
            return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        }
    }
};
</script>
