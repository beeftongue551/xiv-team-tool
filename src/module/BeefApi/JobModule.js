const {DEBUG_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  async getAllJob() {
    const url = DEBUG_API_URL + 'job'
    return getResponseByUrl(url)
  }
}