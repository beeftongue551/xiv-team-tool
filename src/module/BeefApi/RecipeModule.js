const {BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {

  async getRecipeByRecipeId(id) {
    const url = BEEF_API_URL + 'recipe/id/' + id
    return await getResponseByUrl(url)
  }
}