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
        <div class="box-content">
            <div class="chat-bot">
                <div
                    class="row row-8"
                    v-for="(message, index) in messages"
                    :key="index"
                >
                    <div class="col-auto col-style">
                        <img
                            src="/images/default_avatar.png"
                            alt="avatar"
                            class="img-avatar"
                        >
                    </div>
                    <div class="col-md-10 col-style">
                        <div class="bg-content">
                            <h3 class="txt-name">
                                kency
                            </h3>
                            <p class="txt-content">
                                {{ message.content }}
                            </p>
                            <p class="txt-time">
                                Today 12:45 PM
                            </p>
                        </div>
                    </div>
                </div>
                <!-- <div class="row row-8">
                    <div class="col-auto col-style">
                        <img
                            src="/images/default_avatar.png"
                            alt="avatar"
                            class="img-avatar"
                        >
                    </div>
                    <div class="col col-md-10 col-style">
                        <div class="bg-content">
                            <h3 class="txt-name">
                                felix
                            </h3>
                            <p class="txt-content">
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </p>
                            <p class="txt-time">
                                Today 12:45 PM
                            </p>
                        </div>
                    </div>
                </div>
                <div class="row row-8">
                    <div class="col col-style text-right offset-md-4">
                        <div class="bg-content">
                            <p class="txt-content">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry
                            </p>
                            <p class="txt-time">
                                Today 12:45 PM
                            </p>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <div class="row send-message no-gutters">
            <div class="col">
                <i class="i-con icon-emoji" />
                <input
                    type="text"
                    class="input-send"
                    placeholder="Message...."
                    v-model="content"
                >
            </div>
            <div class="col-3 text-right">
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
        room: 0,
        isMessageGroup: true,
        content: ''
    }),
    computed: {
        ...mapGetters('socket', [
            'contacts',
            'messages'
        ]),
    },
    methods: {
        ...mapActions('socket', [
            'sendMessage',
            'sendMessageRoom',
            'loadMessages'
        ]),
        load(room, isMessageGroup) {
            this.room = room;
            this.isMessageGroup = isMessageGroup;
            this.loadMessages({room});
        },
        send() {
            if (!this.isMessageGroup)
                this.sendMessage({room: this.room, content: this.content});
            else
                this.sendMessageRoom({room: this.room, content: this.content});
        }
    }
};
</script>
