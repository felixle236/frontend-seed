<template>
    <div
        class="message row"
        v-if="profile"
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
import BoxContact from '~/components/BoxContact';
import BoxMessage from '~/components/BoxMessage';
import {mapGetters} from 'vuex';

export default {
    middleware: ['authentication'],
    components: {
        BoxContact,
        BoxMessage
    },
    computed: {
        ...mapGetters('userAuth', [
            'profile'
        ])
    },
    methods: {
        changeRoom({room, receiverId}) {
            this.$refs.boxMessage.load(room, receiverId);
        }
    }
};
</script>
