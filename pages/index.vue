<template>
    <section class="page-container dashboard">
        <div class="page-header row align-items-end">
            <div class="col">
                <h1 class="page-title">
                    Nuxt JS
                </h1>
            </div>
            <div class="col">
                <div class="group-search">
                    <input
                        type="text"
                        placeholder="Keyword"
                        class="input-search"
                    >
                    <i
                        class="fa fa-search"
                        aria-hidden="true" 
                    />
                </div>
            </div>
        </div>
        <div class="page-body">
            <div class="row">
                <div class="col-md-12">
                    <h1>Welcome to Nuxt JS</h1>
                    <p class="description"> 
                        Our goal is to create a framework flexible enough that you can use it as a main project base or in addition to your current project based on Node.js.<br>
                        Nuxt.js presets all the configuration needed to make your development of a Vue.js Application Server Rendered more enjoyable.
                    </p>
                    <nuxt-link 
                        :to="'login'" 
                        class="btn-normal"
                    >
                        Login
                    </nuxt-link>
                </div>
            </div>
        </div>
        <div class="page-footer">
            <nuxt-link
                to="/"
                class="txt-link"
            >
                Help & Support
            </nuxt-link> |
            <nuxt-link
                to="/"
                class="txt-link"
            >
                Terms & Condition
            </nuxt-link>|
            <nuxt-link
                to="/"
                class="txt-link"
            >
                Tutorial
            </nuxt-link>
        </div>
    </section>
</template>

<script>
export default {
    components: {
     
    }
};
</script>

