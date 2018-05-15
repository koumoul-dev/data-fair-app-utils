// Helper to use simple-directory-client-express in the special case where
// the URL parameters do not come from a static config, but instead from request headers.
const sd = require('simple-directory-client-express')

module.exports = (defaultConfig) => {
  return (key) => {
    return (req, res, next) => {
      sd({
        directoryUrl: req.header('x-directory-url') || defaultConfig.directoryUrl,
        publicUrl: req.header('x-exposed-url') || defaultConfig.publicUrl
      })[key](req, res, next)
    }
  }
}
