const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  /**
   * LogsAPIでキャラ名とサーバ名から最新パッチ、最新レイドの情報を取得する
   * @param {string} name 名前
   * @param {string} server サーバ
   * @returns {Promise<void>} Logs情報
   */
  async getLogsData(name, server) {
    // Logsから与えられたapiKey
    const apiKey = '963b26b6-90bf-4a6f-a30e-4ba1689e4b00'
    const url = 'https://www.fflogs.com/v1/parses/character/'
      + name + '/' + server + '/JP?includeCombatantInfo=true&api_key=' + apiKey
    return await getResponseByUrl(url)
  },
}