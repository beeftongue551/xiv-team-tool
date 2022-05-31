const {DEBUG_API_URL} = require("@/module/ModuleType");
const {postResponseByUrl} = require("@/module/UrlModule");
module.exports = {
  async addCampanyCraft(companyCraftData) {
    const url = DEBUG_API_URL + 'CompanyCraft'
    return await postResponseByUrl(url, companyCraftData)
  }
}