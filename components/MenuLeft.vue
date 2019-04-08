<template>
    <div class="content-menu">
        <nuxt-link to="/">
            <img
                src="/images/logo.png"
                alt="logo menu"
                class="logo"
            >
        </nuxt-link>
        <ul class="menu-left">
            <li
                class="menu-item"
                :class="this.$route.path === '/' && 'active'"
            >
                <nuxt-link
                    to="/"
                    class="menu-link"
                >
                    <i class="i-con fa fa-home" />
                </nuxt-link>
            </li>
            <li
                class="menu-item"
                :class="this.$route.path.toLowerCase().startsWith('/message') && 'active'"
                v-if="$auth.isAuthenticated()"
            >
                <nuxt-link
                    to="/message"
                    class="menu-link new-message"
                >
                    <i class="i-con icon-message" />
                </nuxt-link>
            </li>
            <li
                class="menu-item logout"
                v-if="$auth.isAuthenticated()"
            >
                <a
                    class="menu-link"
                    @click="logout"
                >
                    <i class="i-con icon-logout" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
    methods: {
        ...mapActions('user', [
            'signout'
        ]),
        ...mapActions('socket', [
            'disconnectMessageSocket'
        ]),
        logout() {
            this.signout();
            this.disconnectMessageSocket();
            this.$router.push('/');
        }
    }
};
</script>
