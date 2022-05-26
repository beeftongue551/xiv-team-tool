const {getResponseByUrl} = require("@/module/UrlModule");
const {UNIVERSALIS_API_URL} = require("@/module/ModuleType");
module.exports = {
  /**
   * UniversailsAPIで複数のアイテムIDからマーケット情報を取得する
   * @param {array} itemIDs アイテムID群
   * @param {string} dataCenter データセンタ
   * @return {Promise<*>} マーケット情報
   */
  async getMarketByIDs(itemIDs, dataCenter) {
    let url = UNIVERSALIS_API_URL + dataCenter +'/'
    itemIDs.forEach((id) => {
      url += id + ','
    })
    url = url.slice(0, -1)
    url += '?listings=1&entries=0'
    return await getResponseByUrl(url)
  },

  /**
   * マーケット取引可能アイテムのIDを取得する
   *
   * @return {Promise<*>}
   */
  async getMarketableItemIds() {
    const url = 'https://universalis.app/api/marketable'
    return await getResponseByUrl(url)
  }
}