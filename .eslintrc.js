module.exports = {
    root: true,
    parser: 'babel-eslint',
    extends: 'standard',
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jquery: true,
        node: true
    },
    // required to lint *.vue files
    plugins: [
        'html'
    ],
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
        }]
    },
    parserOptions: {
        ecmaVersion: 7,
        sourceType: 'module',
        ecmaFeatures: {}
    }
}
