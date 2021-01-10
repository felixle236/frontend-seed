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
                            src="~/assets/images/logo.png"
                            alt="logo"
                            class="logo"
                        >
                    </p>
                    <p class="txt-desc">
                        Nuxt.js presets all the configuration needed to make your development of a Vue.js application enjoyable.
                    </p>
                    <input
                        v-model="email"
                        v-validate="'required|email'"
                        type="text"
                        placeholder="Your Email"
                        class="form-input"
                        :class="{'border-danger': errors.has('email')}"
                        name="email"
                        maxlength="100"
                    >
                    <p
                        v-show="errors.has('email')"
                        class="text-danger text-error"
                    >
                        {{ errors.first('email') }}
                    </p>
                    <input
                        v-model="password"
                        v-validate="'required|min:6'"
                        type="password"
                        placeholder="Password"
                        autocomplete="new-password"
                        class="form-input"
                        :class="{'border-danger': errors.has('password')}"
                        name="password"
                        maxlength="20"
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
                        v-if="loginMessage"
                        style="color: #f93c3c; margin-top: 20px; font-size: 12px; text-align: center;"
                    >
                        {{ loginMessage }}
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

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { authService } from '~/services/auth';
import { meService } from '~/services/me';

export default Vue.extend({
    layout: 'blank',
    middleware: ['non-authentication'],
    data: () => ({
        email: '',
        password: '',
        loginMessage: ''
    }),
    methods: {
        ...mapActions('auth', ['updateAuthentication', 'updateProfile', 'clearAuthentication']),
        async login() {
            this.loginMessage = '';
            try {
                const { data } = await authService.login(this.email, this.password);
                this.updateAuthentication(data);

                const profileResult = await meService.getProfile();
                this.updateProfile(profileResult.data);

                const link = this.$route.query.redirect ? this.$route.query.redirect as string : '/';
                this.$router.push(link);
            }
            catch (error) {
                this.clearAuthentication();
                this.loginMessage = error.message;
            }
        }
    }
});
</script>
