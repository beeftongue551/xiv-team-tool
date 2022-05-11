const {getResponseByUrl, postResponseByUrl} = require("@/module/UrlModule");
const {BEEF_API_URL} = require("@/module/ModuleType");

module.exports = {

  /**
   * BeefAPIでスケジュールの全件取得を行う
   * @return {Promise<*>}
   */
  async getXIVScheduleList() {
    const url = BEEF_API_URL + 'schedule'
    return await getResponseByUrl(url)
  },

  /**
   * BeefAPIでスケジュールの登録を行う
   * @param schedule スケジュール
   * @return {Promise<*>}
   */
  async createXIVSchedule(schedule) {
    const url = BEEF_API_URL + 'schedule'
    return await postResponseByUrl(url, schedule)
  },

  /* お知らせ取得API */

  /**
   * BeefAPIでお知らせの全件取得を行う
   * @return {Promise<*>}
   */
  async getNewsList() {
    const url =BEEF_API_URL + 'news'
    return await getResponseByUrl(url)
  }
}
