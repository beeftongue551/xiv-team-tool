// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {postResponseByUrl} = require("@/module/UrlModule");
module.exports = {

  /**
   * 固定名とパスワードで固定情報の検索を行う
   * @param teamName 固定名
   * @param password パスワード
   * @return {Promise<*>} 固定情報
   */
  async getTeamByTeamNameAndPassword(teamName, password) {
    const url = BEEF_API_URL + 'team/search'
    const body = {
      teamName: teamName,
      password: password
    }
    return await postResponseByUrl(url, body)
  },
}