<template>
    <div
        class="message row"
        v-if="userAuth"
    >
        <div class="col-auto pd-0">
            <box-contact
                @change="changeRoom"
                class="show"
            />
        </div>
        <div class="col-auto pd-0">
            <box-message ref="boxMessage" />
        </div>
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import BoxContact from '~/components/BoxContact';
import BoxMessage from '~/components/BoxMessage';

export default {
    middleware: ['authentication'],
    components: {
        BoxContact,
        BoxMessage
    },
    computed: {
        ...mapGetters('user', [
            'userAuth'
        ])
    },
    methods: {
        changeRoom({room, receiverId}) {
            this.$refs.boxMessage.load(room, receiverId);
        }
    }
};
</script>
