module.exports = {
    root: true,
    env: {
        browser: true,
        node: true
    },
    parserOptions: {
        parser: 'babel-eslint'
    },
    extends: [
        // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
        // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
        'plugin:vue/strongly-recommended'
    ],
    // required to lint *.vue files
    plugins: [
        'vue'
    ],
    // add your custom rules here
    rules: {
        'indent': ['error', 4],
        'semi': ['error', 'always'],
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        'max-len': 'off',
        'curly': 'off',
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        'linebreak-style': 'off',
        'yoda': 'error',
        'space-infix-ops': 'error',
        'switch-colon-spacing': ['error', {'before': false, 'after': true}],
        'key-spacing': ['error', {'beforeColon': false, 'afterColon': true}],
        'eqeqeq': ['error', 'always', {'null': 'ignore'}],
        'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 1 }],
        'keyword-spacing': ['error', {'before': true, 'after': true}],
        'arrow-spacing': ['error', {'before': true, 'after': true}],
        'brace-style': ['error', 'stroustrup'],
        'object-curly-spacing': ['error', 'never', {'objectsInObjects': false, 'arraysInObjects': false}],
        'space-before-function-paren': ['error', {
            'anonymous': 'never',
            'named': 'never',
            'asyncArrow': 'always'
        }],
        'vue/html-indent': ['error', 4]
    }
}
