const {getResponseByUrl} = require("@/module/UrlModule");
module.exports = {
  /**
   * XIVAPIで名前とサーバからキャラクタの情報を取得する
   * @param name 名前
   * @param server サーバ
   * @returns {Promise<*>} 該当するキャラクタ情報（複数）
   */
  async getCharactersData(name, server, page = 1) {
    let characterData = {}
    const url = 'https://xivapi.com/character/search?name=' + name + '&server=' + server + '&page=' + page
    characterData = await getResponseByUrl(url)
    return characterData
  },

}