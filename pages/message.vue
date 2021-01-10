<template>
    <div class="container">
        <h1 class="title">
            Message
        </h1>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    middleware: ['authentication']
});
</script>

<style>
.container {
    margin: 0 auto;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.title {
    display: block;
    font-weight: 300;
    font-size: 100px;
    color: #35495e;
    letter-spacing: 1px;
}
</style>
