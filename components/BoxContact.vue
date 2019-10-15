<template>
    <div class="box-left box-contact">
        <div
            class="box-border box-head"
            v-if="profile"
        >
            <img
                :src="profile.avatar || '/images/default-avatar.jpg'"
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
                        v-for="(member, index) in members"
                        v-show="member.id !== profile.id"
                        :class="{'active': activeTab === member.id}"
                        :key="index"
                        @click="changeRoom(undefined, member.id)"
                    >
                        <img
                            class="img-avatar"
                            :src="member.avatar || '/images/default-avatar.jpg'"
                        >
                        <i
                            v-if="member.isOnline"
                            class="fa fa-circle"
                            :class="{'gray': !member.isOnline}"
                            aria-hidden="true"
                        />
                        {{ member.firstName + ' ' + member.lastName }}
                        <i
                            class="fa fa-circle red pull-right"
                            aria-hidden="true"
                            v-show="member.hasNewMessage"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
    data: () => ({
        apiUrl: process.env.API_URL,
        keyword: '',
        skip: 0,
        limit: 50,
        activeTab: -1
    }),
    computed: {
        ...mapGetters('userAuth', [
            'profile'
        ]),
        ...mapGetters('message', [
            'currentRoom',
            'hasRoomNewMessage',
            'members'
        ])
    },
    mounted() {
        this.clearMenuNewMessageStatus();
        // this.findMembers({keyword: this.keyword, skip: this.skip, limit: this.limit});
    },
    methods: {
        ...mapActions('message', [
            'findMembers',
            'clearMenuNewMessageStatus'
        ]),
        changeRoom(room, receiverId) {
            this.activeTab = receiverId || room;
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

