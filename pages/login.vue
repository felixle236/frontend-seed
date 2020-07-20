<template>
    <section class="login-page">
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
                        :class="{'border-danger': errors.has('email')}"
                        name="email"
                        maxlength="100"
                        v-model="email"
                        v-validate="'required|email'"
                    >
                    <p
                        v-show="errors.has('email')"
                        class="text-danger text-error"
                    >
                        {{ errors.first('email') }}
                    </p>
                    <input
                        type="password"
                        placeholder="Password"
                        autocomplete="new-password"
                        class="form-input"
                        :class="{'border-danger': errors.has('password')}"
                        name="password"
                        maxlength="20"
                        v-model="password"
                        v-validate="'required|min:6'"
                    >
                    <p
                        v-show="errors.has('password')"
                        class="text-danger text-error"
                    >
                        {{ errors.first('password') }}
                    </p>
                    <button
                        class="btn-normal"
                        @click="login"
                    >
                        Login
                    </button>
                    <p
                        style="color: #f93c3c; margin-top: 20px; font-size: 12px; text-align: center;"
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
import {mapActions, mapGetters} from 'vuex';

export default {
    layout: 'blank',
    middleware: ['non-authentication'],
    data: () => ({
        email: '',
        password: '',
    }),
    computed: {
        ...mapGetters('auth', [
            'signinMessage'
        ])
    },
    methods: {
        ...mapActions('auth', [
            'login'
        ]),
        async login() {
            const isValid = await this.$validator.validate();
            if (isValid) {
                const userAuth = await this.login({
                    email: this.email,
                    password: this.password
                });
                if (userAuth)
                    this.$router.push('/');
            }
        }
    }
};
</script>
