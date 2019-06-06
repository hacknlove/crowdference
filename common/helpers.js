export const removeProtocol = function removeProtocol (url) {
  return url.replace(/^http(s)?:\/\//, '')
}
