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
import { connectWS } from '~/utils/socket';

export default Vue.extend({
    mounted() {
        if (this.$auth.isAuthenticated()) {
            const socket = connectWS('messages', this.$store.state.auth.accessToken);

            socket.on('connect', () => {
                // eslint-disable-next-line no-console
                console.log('Message channel is connected!');
            });

            socket.on('disconnect', () => {
                // eslint-disable-next-line no-console
                console.log('Message channel is disconnected!');
            });

            socket.on('connect_error', (err: Error) => {
                // eslint-disable-next-line no-console
                console.log('connect_error', err);
            });

            socket.on('online_status', (onlineStatus: {userId: string, isOnline: boolean}) => {
                // eslint-disable-next-line no-console
                console.log('online_status', onlineStatus);
            });
        }

        // eslint-disable-next-line no-console
        const socket = connectWS('trackings');

        socket.on('connect', () => {
            // eslint-disable-next-line no-console
            console.log('Tracking channel is connected!');
        });

        socket.on('disconnect', () => {
            // eslint-disable-next-line no-console
            console.log('Tracking channel is disconnected!');
        });

        socket.on('connect_error', (err: Error) => {
            // eslint-disable-next-line no-console
            console.log('connect_error', err);
        });
    }
});
</script>
