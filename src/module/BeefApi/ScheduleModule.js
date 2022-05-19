// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl, postResponseByUrl, deleteResponseByUrl, putResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  async getUserScheduleByUserIdAndTeamIdAndDay(userId, teamId, day) {
    const url = DEBUG_API_URL + 'schedule/team/' + userId + '/' + teamId + '/' + day
    return getResponseByUrl(url)
  },

  /**
   * UserIdが一致する人のスケジュールを取得する
   * @param {number} userId 名前
   * @return {Promise<*>} スケジュール表
   */
  async getXIVScheduleListById(userId) {
    const url = BEEF_API_URL + 'schedule/user/' + userId
    return await getResponseByUrl(url)
  },

  /**
   * UserIdが一致する人の本日以降のスケジュールを取得する
   * @param {number} UserId 名前
   * @return {Promise<*>} スケジュール表
   */
  async getXIVScheduleListByIdAfter(UserId) {
    const url = DEBUG_API_URL + 'schedule/user/' + UserId + '/after'
    return await getResponseByUrl(url)
  },

  /**
   * UserIdと日付が一致するスケジュールの更新を行い、
   * 更新後の今日以降の日付を取得する
   *
   * @param schedule
   * @return {Promise<*>}
   */
  async updateXIVSchedule(schedule) {
    const url = DEBUG_API_URL + 'schedule/update'
    return await putResponseByUrl(url, schedule)
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

  /**
   * スケジュールテーブルからIDが一致するスケジュールを削除する
   *
   * @param id スケジュールID
   * @return void
   */
  async deleteXIVScheduleById(id) {
    const url = DEBUG_API_URL + 'schedule/delete/id/' + id
    await deleteResponseByUrl(url)
  }
}