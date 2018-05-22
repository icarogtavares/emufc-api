const { prop } = require('ramda')

const getEnv = env => {
    return env || process.env.NODE_ENV || 'test'
}

const getConfig = config => env => prop(getEnv(env), config)

module.exports = {
    getEnv,
    getConfig,
}