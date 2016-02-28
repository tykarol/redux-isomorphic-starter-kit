if (__PROD__) {
    module.exports = require('./configureStore.prod');
} else {
    module.exports = require('./configureStore.dev');
}
