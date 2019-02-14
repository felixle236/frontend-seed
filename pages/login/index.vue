<template>
    <section class="page-blank">
        <div class="row row-default no-gutters">
            <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-form">
                <form class="form-style">
                    <img
                        src="/images/logo.png"
                        alt=" logo"
                        class="logo"
                    >
                    <h1 class="heading -form">
                        founded by a team of strategists, technology lovers and automation gurus
                    </h1>
                    <p class="txt-desc">
                        with the vision of enlightening the creators and critical drivers of tomorrow’s enterprise.
                    </p>
                    <input
                        type="text"
                        placeholder="Your Email"
                        class="form-input"
                    >
                    <input
                        type="text"
                        placeholder="Password"
                        class="form-input"
                    >
                    <button class="btn-normal">
                        Login
                    </button>
                    <nuxt-link
                        to="/"
                        class="link-style"
                    >
                        Forgot password
                    </nuxt-link>
                </form>
            </div>
            <div class="col-xl-4 col-lg-5 col-md-5 col-sm-12 col-content">
                <div class="content-right">
                    <button class="btn-normal btn-big">
                        What’s New
                    </button>
                    <div class="bg-right">
                        <img
                            src="/images/icon-warning.svg"
                            alt="icon"
                            class="icon-version"
                        >
                        <div class="row align-items-center no-gutters">
                            <div class="col-xl-7 col-lg-12 pdr-5">
                                <h2 class="font-24">
                                    Version 43.2
                                </h2>
                            </div>
                            <div class="col-xl-5 col-lg-12 text-xl-right">
                                <span class="txt-released">
                                    Released 19 Apr, 2017
                                </span>
                            </div>
                        </div>
                        <h3 class="font-semi">
                            Bug Fixes Fixes a variety of small issues.
                        </h3>
                        <ul class="list-info">
                            <li>Fixes the appearance of previews when using Mirror on devices with wide color displays which support P3 colors </li>
                            <li>The list of available Symbol overrides are now sorted alphabetically</li>
                            <li>Fixes a bug where the selection indicator for the current nested Symbol was missing</li>
                        </ul>
                        <nuxt-link
                            to="/"
                            class="link-style"
                        >
                            View Full Patch Notes
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="box-term">
            <nuxt-link
                to="/"
                class="txt-link"
            >
                Help & Support
            </nuxt-link>|
            <nuxt-link
                to="/"
                class="txt-link"
            >
                Terms & Condition
            </nuxt-link>
        </div>
    </section>
</template>
<script>
export default {
    layout: 'blank',
};
</script>