<template>
    <div class="message row">
        <div class="col-auto pd-0">
            <box-contact class="show" />
        </div>
        <div class="col-auto pd-0">
            <box-message />
        </div>
    </div>
</template>

<script>
import BoxContact from '~/components/BoxContact';
import BoxMessage from '~/components/BoxMessage';

export default {
    middleware: ['authentication'],
    components: {
        BoxContact,
        BoxMessage
    },
};
</script>
