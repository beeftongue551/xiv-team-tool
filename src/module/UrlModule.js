const axios = require("axios");

module.exports = {
  /**
   * URLからレスポンス情報を取得する
   * @param url 対象のURL
   * @returns {Promise<*>} レスポンス情報
   */
  async getResponseByUrl(url) {
    let dataCash
    await axios.get(url).then(response => {
      return response.data
    }).then(data => {
      dataCash = data
    }).catch(error => {
      console.error('通信に失敗しました',error)
    })
    return dataCash
  },

  async postResponseByUrl(url, body) {
    let dataCash
    await axios.post(url,body).then(data => {
      dataCash = data
    }).catch(error => {
      console.error('通信に失敗しました',error)
    })
    return dataCash
  }
}