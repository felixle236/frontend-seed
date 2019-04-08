<template>
    <div class="box-left box-message">
        <div class="box-heading">
            <div class="row">
                <div class="col-md-8" />
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
        <div
            class="box-content"
            ref="boxContent"
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
                            :src="message.sender ? apiUrl + message.sender.avatar : '/images/default_avatar.png'"
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
                                {{ message.sender ? message.sender.firstName + ' ' + message.sender.lastName : '' }}, {{ message.time | formatDate }}
                            </p>
                        </div>
                    </div>
                    <div
                        class="col col-style text-right offset-md-2"
                        v-if="message.senderId === userAuth.id"
                    >
                        <div class="bg-content">
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
        <div class="row send-message no-gutters">
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
        room: undefined,
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
            'messages'
        ]),
    },
    watch: {
        'messages': function(newMessages, oldMessages) {
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
    },
    mounted() {
        if (this.room === undefined || this.room === null)
            this.room = 0;
    },
    methods: {
        ...mapActions('socket', [
            'findMessages',
            'sendMessage',
            'sendMessageRoom'
        ]),
        load(room, receiverId) {
            this.receiverId = receiverId;
            this.room = room;
            this.skip = 0;
            this.$refs.content.select();
            
            this.findMessages({room: this.room, skip: this.skip, limit: this.limit});
        },
        send() {
            if (this.receiverId)
                this.sendMessage({receiverId: this.receiverId, content: this.content});
            else
                this.sendMessageRoom({room: this.room, content: this.content});
            
            this.content = '';
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
            
            return date.toLocaleString();
        }
    }
};
</script>
