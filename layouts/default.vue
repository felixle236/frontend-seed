<template>
    <div class="theme-default">
        <div class="main-content">
            <div class="col-left row no-gutters">
                <div class="col-auto">
                    <menu-left />
                </div>
            </div>
            <div class="col-right">
                <nuxt />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import MenuLeft from '~/components/MenuLeft.vue';
import {connect} from '~/utils/socket';

export default Vue.extend({
    components: {
        MenuLeft,
    },
    mounted() {
        if (process.client && this.$auth.isAuthenticated()) {
            const socket = connect('messages', this.$store.state.auth.accessToken);

            socket.on('connect', () => {
                // eslint-disable-next-line no-console
                console.log('Message channel is connected!');
            });

            socket.on('disconnect', () => {
                // eslint-disable-next-line no-console
                console.log('Message channel is disconnected!');
            });

            socket.on('online_status', (onlineStatus: {userId: string, isOnline: boolean}) => {
                // eslint-disable-next-line no-console
                console.log('online_status', onlineStatus);
            });

            socket.on('notification', (notification: {id: string, content: string}) => {
                // eslint-disable-next-line no-console
                console.log('notification', notification);
            });
        }
    }
});
</script>
