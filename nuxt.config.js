const webpack = require('webpack');

export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: process.env.PROJECT_NAME,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.PROJECT_NAME }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '~/assets/scss/main.scss'
    ],

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/axios' },
        { src: '~/plugins/auth' },
        { src: '~/plugins/event-bus', mode: 'client' },
        { src: '~/plugins/vee-validate', mode: 'client' }
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
        // https://go.nuxtjs.dev/typescript
        '@nuxt/typescript-build'
    ],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        'nuxt-validate',
        '@nuxtjs/axios',
        'nuxt-healthcheck'
    ],

    // Axios module configuration: https://go.nuxtjs.dev/config-axios
    axios: {
        baseURL: process.env.API_URL
    },

    publicRuntimeConfig: {
        projectId: process.env.PROJECT_ID,
        projectName: process.env.PROJECT_NAME,
        prototype: process.env.PROTOTYPE,
        domain: process.env.DOMAIN,
        apiUrl: process.env.API_URL,
        wsUrl: process.env.WS_URL,
        axios: {
            baseURL: process.env.API_URL
        }
    },

    privateRuntimeConfig: {
        apiUrl: process.env.API_SSR_URL,
        axios: {
            baseURL: process.env.API_SSR_URL
        }
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        vendor: [
            'jquery'
        ],
        babel: {
            compact: true
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ]
    },

    typescript: {
        typeCheck: {
            eslint: {
                files: './**/*.{ts,js,vue}'
            }
        }
    }
};
