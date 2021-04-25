<template>
    <div class="content-menu">
        <nuxt-link to="/">
            <Logo class="logo" />
        </nuxt-link>
        <ul class="menu-left">
            <li
                class="menu-item"
                :class="$route.path === '/' && 'active'"
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
                :class="$route.path.toLowerCase().startsWith('/secret') && 'active'"
            >
                <nuxt-link
                    to="/secret"
                    class="menu-link"
                >
                    <i class="i-con" :class="$auth.isAuthenticated() ? 'fa fa-unlock-alt' : 'fa fa-lock'" />
                </nuxt-link>
            </li>
            <li
                v-if="$auth.isAuthenticated()"
                class="menu-item"
                :class="$route.path.toLowerCase().startsWith('/chat') && 'active'"
            >
                <nuxt-link
                    to="/chat"
                    class="menu-link"
                >
                    <i class="i-con icon-message" />
                    <span
                        class="notify-message"
                    />
                </nuxt-link>
            </li>
            <li
                v-if="$auth.isAuthenticated()"
                class="menu-item logout"
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

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';

export default Vue.extend({
    methods: {
        ...mapActions('auth', [
            'clearAuthentication'
        ]),
        logout() {
            this.clearAuthentication();
            this.$router.push('/');
        }
    }
});
</script>
