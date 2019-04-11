<template>
    <div class="box-left box-contact">
        <div
            class="box-border box-head"
            v-if="profile"
        >
            <img
                :src="profile.avatar ? apiUrl + profile.avatar : '/images/default-avatar.jpg'"
                alt=""
                :title="profile.firstName + ' ' + profile.lastName"
                class="img-avatar"
            >
            <h3 class="user-name">
                {{ profile.firstName + ' ' + profile.lastName }}
            </h3>
        </div>
        <div class="box-scroll">
            <div class="box-border box-team">
                <h3 class="heading-box">
                    Group
                </h3>
                <ul class="nav-bot">
                    <li
                        class="nav-item"
                        :class="{'active': activeTab === 0}"
                        @click="changeRoom(0)"
                    >
                        &emsp;
                        All members
                        <i
                            class="fa fa-circle red pull-right"
                            aria-hidden="true"
                            v-show="hasRoomNewMessage"
                        />
                    </li>
                </ul>
            </div>
            <div class="box-border box-direct">
                <h3 class="heading-box">
                    Direct
                </h3>
                <ul class="nav-bot">
                    <li
                        class="nav-item"
                        v-for="(contact, index) in contacts"
                        v-show="contact.id !== userAuth.id"
                        :class="{'active': activeTab === contact.id}"
                        :key="index"
                        @click="changeRoom(undefined, contact.id)"
                    >
                        <img
                            class="img-avatar"
                            :src="contact.avatar ? apiUrl + contact.avatar : '/images/default-avatar.jpg'"
                        >
                        <i
                            v-if="contact.isOnline"
                            class="fa fa-circle"
                            :class="{'gray': !contact.isOnline}"
                            aria-hidden="true"
                        />
                        {{ contact.firstName + ' ' + contact.lastName }}
                        <i
                            class="fa fa-circle red pull-right"
                            aria-hidden="true"
                            v-show="contact.hasNewMessage"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    data: () => ({
        apiUrl: process.env.API_URL,
        keyword: '',
        skip: 0,
        limit: 50,
        activeTab: -1
    }),
    computed: {
        ...mapGetters('user', [
            'profile',
            'userAuth'
        ]),
        ...mapGetters('socket', [
            'currentRoom',
            'hasRoomNewMessage',
            'contacts'
        ])
    },
    mounted() {
        this.clearMenuNewMessageStatus();
        // this.findContacts({keyword: this.keyword, skip: this.skip, limit: this.limit});
    },
    methods: {
        ...mapActions('socket', [
            'findContacts',
            'clearMenuNewMessageStatus'
        ]),
        changeRoom(room, receiverId) {
            this.activeTab = receiverId || room;
            if (receiverId) {
                if (this.userAuth.id > receiverId)
                    room = Number(this.generateId(this.userAuth.id) + this.generateId(receiverId));
                else
                    room = Number(this.generateId(receiverId) + this.generateId(this.userAuth.id));
            }
            this.$emit('change', {room, receiverId});
        },
        generateId(num) {
            if (num.toString().length >= 7)
                return num.toString();
            return (num * Number('1'.padEnd(8 - num.toString().length, '0'))).toString();
        }
    }
};
</script>

