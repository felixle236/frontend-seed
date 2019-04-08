<template>
    <div class="box-left box-contact">
        <div
            class="box-border box-head"
            v-if="profile"
        >
            <img
                :src="apiUrl + profile.avatar"
                alt=""
                :title="profile.firstName + ' ' + profile.lastName"
                class="img-avatar"
            >
            <h3 class="user-name">
                {{ profile.firstName + ' ' + profile.lastName }}
            </h3>
        </div>
        <div class="box-scroll">
            <div class="box-border box-direct">
                <h3 class="heading-box">
                    Group
                </h3>
                <ul class="nav-bot">
                    <li
                        class="nav-item"
                        @click="changeRoom(0)"
                    >
                        &emsp;
                        All members
                        <i
                            class="fa fa-circle red pull-right"
                            aria-hidden="true"
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
                        :key="index"
                        @click="changeRoom(undefined, contact.id)"
                    >
                        <i
                            class="fa fa-circle"
                            :class="{'gray': !contact.isOnline}"
                            aria-hidden="true"
                        />
                        {{ contact.firstName + ' ' + contact.lastName }}
                        <i
                            class="fa fa-circle red pull-right"
                            aria-hidden="true"
                            v-if="contact.hasNewMessages"
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
        limit: 50
    }),
    computed: {
        ...mapGetters('user', [
            'profile',
            'userAuth'
        ]),
        ...mapGetters('socket', [
            'contacts'
        ])
    },
    mounted() {
        this.findContacts({keyword: this.keyword, skip: this.skip, limit: this.limit});
    },
    methods: {
        ...mapActions('socket', [
            'findContacts'
        ]),
        changeRoom(room, receiverId) {
            if (receiverId) {
                if (this.userAuth.id > receiverId)
                    room = this.generateId(this.userAuth.id) + this.generateId(receiverId);
                else
                    room = this.generateId(receiverId) + this.generateId(this.userAuth.id);
            }
            this.$emit('change', {room, receiverId});
        },
        generateId(num) {
            if (num.toString().length >= 7)
                return num;
            return num * Number('1'.padEnd(7 - num.toString().length, '0'));
        }
    }
};
</script>

