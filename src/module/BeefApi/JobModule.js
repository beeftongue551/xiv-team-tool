const {getResponseByUrl} = require("@/module/UrlModule");
const {BEEF_API_URL} = require("@/module/ModuleType");

module.exports = {
  async getAllJob() {
    const url = BEEF_API_URL + 'job'
    return getResponseByUrl(url)
  }
}