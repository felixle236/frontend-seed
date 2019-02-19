<template>
    <section class="page-blank">
        <div class="row row-default no-gutters">
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-form">
                <form class="form-style">
                    <p>
                        <img
                            src="/images/logo.png"
                            alt=" logo"
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
                    >
                    <input
                        type="password"
                        placeholder="Password"
                        class="form-input"
                    >
                    <button class="btn-normal">
                        Login
                    </button>
                    <!-- <nuxt-link
                        to="/"
                        class="link-style"
                    >
                        Forgot password
                    </nuxt-link> -->
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
export default {
    layout: 'blank',
};
</script>