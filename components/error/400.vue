<template>
    <div>
        <h3 style="margin-top: 20%">
            {{ error.message }}
        </h3>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    layout: 'error',
    props: {
        error: {
            type: Object,
            default: null
        }
    }
});
</script>
