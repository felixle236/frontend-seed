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

export default {
    // middleware: ['auth'],
    data: () => ({
        isClose: true,
        isShowContact: false
    }),
    components: {
        MenuLeft,
    },
    methods: {
        showContact() {
            this.isShowContact = !this.isShowContact;
        },
        colapse() {
            this.isClose = !this.isClose;
            this.isShowContact = false;
        }
    }
};
</script>
