module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    extends: [
        '@nuxtjs/eslint-config-typescript',
        'plugin:nuxt/recommended',
    ],
    plugins: [],
    // add your custom rules here
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'one-var': ['error', 'never'],
        'require-jsdoc': 'off',
        'valid-jsdoc': 'off',
        camelcase: ['off'],
        'no-var': ['error'],
        'max-len': 'off',
        curly: ['error', 'multi-or-nest'],
        'arrow-parens': 'off',
        'comma-dangle': 'off',
        'linebreak-style': 'off',
        yoda: 'error',
        'no-return-await': 'off',
        'space-infix-ops': 'error',
        'eol-last': ['error', 'always'],
        'no-useless-constructor': 'off',
        'switch-colon-spacing': ['error', { before: false, after: true }],
        'key-spacing': ['error', { beforeColon: false, afterColon: true }],
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
        'keyword-spacing': ['error', { before: true, after: true }],
        'brace-style': ['error', 'stroustrup'],
        'lines-between-class-members': [
            'error',
            'always',
            { exceptAfterSingleLine: true },
        ],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        'vue/html-indent': ['error', 4],
        'vue/no-v-html': 'off',
        'sort-imports': [
            'error',
            {
                ignoreCase: true,
                ignoreMemberSort: false,
                ignoreDeclarationSort: true,
                memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
            },
        ],
        'import/order': [
            'error',
            {
                'newlines-between': 'never',
                alphabetize: { order: 'asc', caseInsensitive: true },
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    'index',
                    'sibling',
                    'parent',
                    'object',
                ],
            },
        ],
    },
    overrides: [
        {
            files: ['**/*.ts'],
            parserOptions: {
                ecmaVersion: 2019,
                sourceType: 'module',
                ecmaFeatures: {},
                project: './tsconfig.json',
                createDefaultProgram: true, // Tempory solution for IDE.
            },
            rules: {
                'no-undef': 'off',
                '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
                '@typescript-eslint/no-array-constructor': 'error',
                '@typescript-eslint/type-annotation-spacing': [
                    'error',
                    { before: false, after: true },
                ],
                '@typescript-eslint/naming-convention': [
                    'error',
                    // {
                    //     selector: 'default',
                    //     format: ['camelCase'],
                    // },
                    {
                        selector: 'memberLike',
                        modifiers: ['private'],
                        format: ['camelCase'],
                        leadingUnderscore: 'require',
                    },
                    // {
                    //     selector: 'memberLike',
                    //     format: ['camelCase', 'UPPER_CASE'],
                    // },
                    {
                        selector: 'parameter',
                        format: ['camelCase'],
                        leadingUnderscore: 'allow',
                    },
                    {
                        selector: 'variableLike',
                        format: ['camelCase', 'UPPER_CASE'],
                    },
                    {
                        selector: 'variable',
                        format: ['camelCase', 'UPPER_CASE'],
                    },
                    {
                        selector: 'variable',
                        types: ['boolean'],
                        format: ['PascalCase', 'UPPER_CASE'],
                        prefix: [
                            'is',
                            'should',
                            'has',
                            'can',
                            'did',
                            'will',
                            'enable',
                            'IS_',
                            'SHOULD_',
                            'HAS_',
                            'CAN_',
                            'DID_',
                            'WILL_',
                            'ENABLE_',
                        ],
                    },
                    {
                        selector: 'typeParameter',
                        format: ['PascalCase'],
                        prefix: ['T'],
                    },
                    {
                        selector: 'interface',
                        format: ['PascalCase'],
                        custom: {
                            regex: '^I[A-Z]',
                            match: true,
                        },
                    },
                    {
                        selector: 'typeLike',
                        format: ['PascalCase'],
                    },
                ],
            },
        },
    ],
};
