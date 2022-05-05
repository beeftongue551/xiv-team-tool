const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  /**
   * LogsAPIでキャラ名とサーバ名から最新パッチ、最新レイドの情報を取得する
   * @param name 名前
   * @param server サーバ
   * @returns {Promise<void>} Logs情報
   */
  async getLogsData(name, server) {
    // Logsから与えられたapiKey
    const apiKey = '10edbe22fffdaf663a8c89b48be1e537'
    const url = 'https://www.fflogs.com/v1/parses/character/'
      + name + '/' + server + '/JP?api_key=' + apiKey
    return await getResponseByUrl(url)
  },
}