// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl, postResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  async getUserScheduleByUserIdAndTeamIdAndDay(userId, teamId, day) {
    const url = BEEF_API_URL + 'schedule/team/' + userId + '/' + teamId + '/' + day
    return getResponseByUrl(url)
  },

  /**
   * UserIdが一致する人のスケジュールを取得する
   * @param {number} id 名前
   * @return {Promise<*>} スケジュール表
   */
  async getXIVScheduleListById(id) {
    const url = BEEF_API_URL + 'schedule/user/' + id
    return await getResponseByUrl(url)
  },

  /**
   * BeefAPIでスケジュールの登録を行う
   * @param {Schedule} schedule スケジュール
   * @return {Promise<*>}
   */
  async createXIVSchedule(schedule) {
    const url = BEEF_API_URL + 'schedule'
    return await postResponseByUrl(url, schedule)
  },
}