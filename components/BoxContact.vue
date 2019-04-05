<template>
    <div class="box-left box-contact">
        <div
            class="box-border box-head"
            v-if="profile"
        >
            <img
                :src="profile.avatar"
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
                    >
                        <i
                            class="fa fa-circle"
                            aria-hidden="true"
                        />
                        Felix
                        <i
                            class="fa fa-circle red pull-right"
                            aria-hidden="true" 
                        />
                    </li>
                    <li
                        class="nav-item"
                        v-for="(user, index) in userList"
                        :key="index"
                        @click="changeRoom(user.id)"
                    >
                        <i
                            class="fa fa-circle"
                            aria-hidden="true"
                        />
                        {{ user.firstName + ' ' + user.lastName }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    computed: {
        ...mapGetters('user', [
            'profile',
            'userList'
        ])
    },
    async mounted() {
        await this.findUsers();
        this.changeRoom(0);
    },
    methods: {
        ...mapActions('user', [
            'findUsers'
        ]),
        changeRoom(room) {
            this.$emit('change', {room, isMessageGroup: !room});
        }
    }
};
</script>

