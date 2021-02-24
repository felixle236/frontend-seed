<template>
    <div class="container">
        <div>
            <Logo
                class="home-logo"
                width="245"
                height="180"
            />
            <br>
            <h1 class="title">
                {{ title }}
            </h1>
            <br>
            <div class="links">
                <a
                    href="https://typescript.nuxtjs.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button-green"
                >
                    Documentation
                </a>
                <a
                    href="https://github.com/nuxt/nuxt.js"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="button-green"
                >
                    GitHub
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data: () => ({
        title: 'Frontend Seed'
    })
});
</script>

<style>
.home-logo {
    animation: 1s appear;
    margin: auto;
}

@keyframes appear {
    0% {
        opacity: 0;
    }
}

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

.subtitle {
    font-weight: 300;
    font-size: 42px;
    color: #526488;
    word-spacing: 5px;
    padding-bottom: 15px;
}

.links {
    padding-top: 15px;
}

.button-green {
    color: rgb(24, 182, 245) !important;
    margin: 20px;
}
</style>
