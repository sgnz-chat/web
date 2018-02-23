let historyApiFallback = require('connect-history-api-fallback')

module.exports = {
    middleware: [historyApiFallback()],
    server: ["assets", "build"],
    snippetOptions: {
        rule: {
            fn: (_, match) => match
        }
    },
    ui: false
}
