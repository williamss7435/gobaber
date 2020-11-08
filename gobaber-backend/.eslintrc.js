module.exports = {
    "env": {
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": [
        "airbnb-base"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 11
    },
    "rules": {
        "class-methods-use-this": "off",
        "no-param-reassign": "off",
        "linebreak-style": "off",
        "camelcase": "off",
        "arrow-body-style": "off",
        "no-unused-vars": ["error", {"argsIgnorePattern": "next"}]
    }
};
