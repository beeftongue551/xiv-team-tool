const {getResponseByUrl} = require("@/module/UrlModule");
module.exports = {
  /**
   * UniversailsAPIで複数のアイテムIDからマーケット情報を取得する
   * @param {array} itemIDs アイテムID群
   * @param {string} dataCenter データセンタ
   * @return {Promise<*>} マーケット情報
   */
  async getMarketByIDs(itemIDs, dataCenter) {
    let url = 'https://universalis.app/api/v2/'+ dataCenter +'/'
    itemIDs.forEach((id) => {
      url += id + ','
    })
    url = url.slice(0, -1)
    url += '?listings=1&entries=0'
    const marketData = await getResponseByUrl(url)
    return marketData
  }
}