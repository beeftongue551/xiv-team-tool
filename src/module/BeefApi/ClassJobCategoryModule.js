// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl} = require("@/module/UrlModule");
module.exports = {

  /**
   * ジョブカテゴリIDが一致するジョブカテゴリ情報を取得する
   *
   * @param {number} id
   * @return {Promise<*>} アイテム情報
   */
  async getClassJobCategoryByClassJobCategoryId(id) {
    const url = BEEF_API_URL + 'category/id/' + id
    return await getResponseByUrl(url)
  }
}