// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  async getUserById(userId) {
    const url = DEBUG_API_URL + 'character/id/' + userId
    return await getResponseByUrl(url)
  }
}