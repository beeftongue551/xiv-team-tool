const {DEBUG_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {

  async getRecipeByRecipeId(id) {
    const url = DEBUG_API_URL + 'recipe/id/' + id
    return await getResponseByUrl(url)
  }
}