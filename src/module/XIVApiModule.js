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

  /**
   * XIVAPIでキャラクタIDからキャラクタの詳細データを取得する
   * @param characterID キャラID
   * @returns {Promise<*>} キャラクタ詳細データ
   */
  async getCharacterDetail(characterID) {
    const url = 'https://xivapi.com/character/' + characterID
    const characterDetail = await getResponseByUrl(url)
    return characterDetail.Character
  },

  async getItemByName(itemName) {
    const url = 'https://xivapi.com/search?language=ja&indexes=item&columns=ID,Name_ja,Icon,LevelItem&string=' + itemName
    const response = await getResponseByUrl(url)
    return response
  }
}