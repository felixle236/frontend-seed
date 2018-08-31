const webpack = require('webpack');

module.exports = {
    /*
    ** Headers of the page
    */
    head: {
        title: 'frontend-seed',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'Frontend seed'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    modules: [
        '@nuxtjs/axios'
    ],
    plugins: [
        {src: '~/plugins/axios'},
        {src: '~/plugins/authenticate'},
        {src: '~/plugins/event-bus', ssr: false},
    ],
    axios: {
        proxy: true // Can be also an object with default options
    },
    proxy: {
        '/api/': 'http://localhost:3001'
    },
    /*
    ** Build configuration
    */
    build: {
        vendor: [
            'bootstrap'
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

