require('dotenv').config();
const webpack = require('webpack');

module.exports = {
    env: process.env,
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.PROJECT_NAME,
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: process.env.PROJECT_NAME}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    css: [
        'bootstrap/dist/css/bootstrap.min.css',
        'font-awesome/css/font-awesome.min.css',
        '~/assets/scss/main.scss'
    ],
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    modules: [
        '@nuxtjs/axios'
    ],
    plugins: [
        {src: '~/plugins/bootstrap'},
        {src: '~/plugins/axios'},
        {src: '~/plugins/authenticate'},
        {src: '~/plugins/event-bus', ssr: false},
    ],
    /*
    ** Build configuration
    */
    build: {
        vendor: [
            'jquery',
            'bootstrap',
        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        /*
        ** Run ESLint on save
        */
        extend(config, {isDev, isClient}) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                });
            }
        }
    }
};
