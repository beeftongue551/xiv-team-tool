const {getResponseByUrl} = require("@/module/UrlModule");
module.exports = {
  async getMarketByIDs(itemIDs, dataCenter) {
    let url = 'https://universalis.app/api/v2/'+ dataCenter +'/'
    itemIDs.forEach((id) => {
      url += id + ','
    })
    const marketData = await getResponseByUrl(url)
    return marketData
  }
}