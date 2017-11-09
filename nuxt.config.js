const webpack = require('webpack');

module.exports = {
    env: {
        apiBase: process.env.NODE_ENV === 'Production' ? 'http://your-domain' : (process.env.NODE_ENV === 'Staging' ? 'http://your-domain:3001' : 'http://localhost:3001'),
        environment: process.env.NODE_ENV,
        systemType: 'LANDING_PAGE'
    },
    /*
    ** Headers of the page
    */
    head: {
        title: 'FRONTEND SEED',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'FRONTEND SEED'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },
    css: [
        '~/node_modules/bootstrap/dist/css/bootstrap.min.css',
        '~/node_modules/font-awesome/css/font-awesome.min.css',
        '~/assets/scss/style.scss'
    ],
    plugins: [
        {src: '~/plugins/axios'},
        {src: '~/plugins/auth'},
        {src: '~/plugins/service'},
        {src: '~/plugins/event-bus', ssr: false},
        {src: '~/plugins/vue-cookie', ssr: false}
    ],
    /*
    ** Customize the progress bar color
    */
    loading: {color: '#3B8070'},
    /*
    ** Build configuration
    */
    build: {
        vendor: [
            'axios',
            'bootstrap',
            'vue-cookie'
        ],
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery'
            })
        ],
        extend(config, ctx) {
            if (ctx.dev && ctx.isClient) {
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
