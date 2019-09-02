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

<script>
import MenuLeft from '~/components/MenuLeft';
import {mapActions} from 'vuex';

export default {
    components: {
        MenuLeft,
    },
    created() {
        if (process.browser && this.$auth.isAuthenticated())
            this.connectMessageSocket();
    },
    methods: {
        ...mapActions('socket', [
            'connectMessageSocket'
        ])
    }
};
</script>
