<template>
    <div>
        <img src="~/assets/images/404.svg" alt="">
        <h1>
            404
        </h1>
        <h3>
            Page not found
        </h3>
        <p>
            We're sorry, the page you requested could be not found.
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    layout: 'error'
});
</script>
