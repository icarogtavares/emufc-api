// module.exports = {
//     "extends": "standard"
// };

module.exports = {
  "extends": "airbnb-base",
  "env": {
    "node": true,
  },
  "rules": {
    "linebreak-style": ["error", process.env.NODE_ENV === 'prod' ? "unix" : "windows"],
    "semi": [2, 'never'],
    'space-before-function-paren': [2, 'always'],
    'max-params': ['error', { max: 3 }],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'function-paren-newline': ['error', 'multiline'],
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
  },
}