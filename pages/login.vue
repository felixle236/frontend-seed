<template>
    <section class="page-blank">
        <div class="row row-default no-gutters">
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-form">
                <form
                    class="form-style"
                    @submit.prevent
                >
                    <p>
                        <img
                            src="/images/logo.png"
                            alt="logo"
                            class="logo"
                        >
                    </p>
                    <p class="txt-desc">
                        Nuxt.js presets all the configuration needed to make your development of a Vue.js application enjoyable.
                    </p>
                    <input
                        type="text"
                        placeholder="Your Email"
                        class="form-input"
                        v-model="email"
                    >
                    <input
                        type="password"
                        placeholder="Password"
                        class="form-input"
                        v-model="password"
                    >
                    <button
                        class="btn-normal"
                        @click="login"
                    >
                        Login
                    </button>
                    <p
                        style="color: #f93c3c; margin-top: 20px;"
                        v-if="signinMessage"
                    >
                        {{ signinMessage }}
                    </p>
                </form>
            </div>
        </div>
        <div class="box-term">
            <a
                href="https://github.com/felixle236/frontend-seed"
                class="txt-link"
                target="_blank"
            >
                Github
            </a>
        </div>
    </section>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';

export default {
    layout: 'blank',
    middleware: ['non-authentication'],
    data: () => ({
        email: '',
        password: '',
    }),
    computed: {
        ...mapGetters('user', [
            'signinMessage'
        ])
    },
    methods: {
        ...mapActions('user', [
            'signin'
        ]),
        async login() {
            const userAuth = await this.signin({
                email: this.email,
                password: this.password
            });
            if (userAuth)
                this.$router.push('/');
        }
    }
};
</script>
