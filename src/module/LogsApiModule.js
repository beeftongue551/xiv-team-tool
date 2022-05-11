const {getResponseByUrl} = require("@/module/UrlModule");
const {LOGS_API_KEY, LOGS_API_URL} = require("@/module/ModuleType");

module.exports = {
  /**
   * LogsAPIでキャラ名とサーバ名から最新パッチ、最新レイドの情報を取得する
   * @param {string} name 名前
   * @param {string} server サーバ
   * @returns {Promise<void>} Logs情報
   */
  async getLogsData(name, server) {
    const url = LOGS_API_URL + 'parses/character/'
      + name + '/' + server + '/JP?includeCombatantInfo=true&api_key=' + LOGS_API_KEY
    return await getResponseByUrl(url)
  },
}