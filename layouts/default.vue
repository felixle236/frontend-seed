<template>
    <div class="theme-default">
        <div class="main-content">
            <div class="col-left row no-gutters">
                <div class="col-auto">
                    <menu-left />
                </div>
                <!-- <div class="col-auto"><box-contact :class="{'show': isShowContact}"/></div>
                <div class="col-auto"><box-message @showContact="showContact" :class="{'closed' : isClose}"/></div>
                <div class="col-auto"><box-collapse @collapse="colapse"/></div> -->
            </div>
            <div class="col-right">
                <nuxt />
            </div>
        </div>
    </div>
</template>

<script>
import MenuLeft from '~/components/MenuLeft';
import BoxContact from '~/components/BoxContact';
import BoxCollapse from '~/components/BoxCollapse';
import BoxMessage from '~/components/BoxMessage';
export default {
    // middleware: ['auth'],
    data: () => ({
        isClose: true,
        isShowContact: false
    }),
    components: {
        MenuLeft,
        // BoxContact,
        // BoxCollapse,
        // BoxMessage
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
