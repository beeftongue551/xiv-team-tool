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

  /**
   *
   * @param url
   * @param body
   * @return {Promise<*>}
   */
  async postResponseByUrl(url, body) {
    let dataCash
    await axios.post(url,body).then(data => {
      dataCash = data
    }).catch(error => {
      console.error('通信に失敗しました',error)
    })
    return dataCash
  },

  /**
   * Deleteメソッドでサーバ通信を行う
   * @param url URL
   * @return {Promise<*>} 通信成功時: レスポンス情報, 失敗時: -1
   */
  async deleteResponseByUrl(url) {
    let result
    await axios.delete(url).then(response => {
      result = response
    }).catch(error => {
      console.error('通信に失敗しました',error)
      result = -1
    })
    return result
  }

}