const {getResponseByUrl, postResponseByUrl, deleteResponseByUrl, putResponseByUrl} = require("@/module/UrlModule");
// eslint-disable-next-line no-unused-vars
const {BEEF_API_URL, DEBUG_API_URL} = require("@/module/ModuleType");
const {UserCharacter} = require("@/class/UserCharacter");

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
   * BeefAPIで名前が一致する人のスケジュールを取得する
   * @param {string} name 名前
   * @return {Promise<*>} スケジュール表
   */
  async getXIVScheduleListByName(name) {
    const url = BEEF_API_URL + 'schedule/user/' + name
    return await getResponseByUrl(url)
  },

  async getXIVScheduleListWhereAfterToday() {
    const url = BEEF_API_URL + 'schedule/afterToday'
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

  /**
   * BeefAPIで名前が一致するスケジュールの削除を行う
   * @param {string} name 名前
   * @return {Promise<*>}
   */
  async deleteXIVScheduleByName(name) {
    const url = BEEF_API_URL + 'delete/name/' + name
    return await deleteResponseByUrl(url)
  },

  /* お知らせ取得API */

  /**
   * BeefAPIでお知らせの全件取得を行う
   * @return {Promise<*>}
   */
  async getNewsList() {
    const url = BEEF_API_URL + 'news'
    return await getResponseByUrl(url)
  },

  /**
   * BeefAPIでお知らせを指定件数取得する
   * @param {number} limit 最大取得数
   * @return {Promise<*>}
   */
  async getNewsListLimit(limit) {
    const url = BEEF_API_URL + 'news/limit/' + limit
    return await getResponseByUrl(url)
  },

  /* ユーザ取得API */

  /**
   * BeefAPIでキャラクター情報を取得する
   * @param {string} name 名前
   * @param {string} server サーバ名
   * @return {Array} キャラクター情報
   */
  async getUserCharacterByNameAndServer(name, server) {
    const url = BEEF_API_URL + 'character/' + name + '/server/' + server
    return await getResponseByUrl(url)
  },

  /**
   * BeefAPiでキャラクタ情報を登録する
   * @param {number} id ID
   * @param {string} name キャラクタ名
   * @param {string} server サーバ
   * @param {string} password パスワード
   */
  signUpUserCharacter(id, name, server, password) {
    const url = BEEF_API_URL + 'sign-up'
    const userCharacter = new UserCharacter(id, name, server, password)
    postResponseByUrl(url, userCharacter)
  },

  /**
   * キャラクターIDとパスワードが一致するキャラクターデータを取得する
   * @param {number} id ID
   * @param {string} password パスワード
   * @return {UserCharacter} キャラクタ情報
   */
  async loginUserCharacter(id,password) {
    const url = DEBUG_API_URL + 'login'
    const userCharacter = new UserCharacter(id, '', '', password)
    const response = await postResponseByUrl(url, userCharacter)
    return new UserCharacter(response.id, response.characterName, response.serverName, '', response.teamId, response.favoriteItemId)
  },

  /**
   * DB上のキャラクターデータを更新する
   * @param {UserCharacter} characterData
   */
  async updateUserCharacter(characterData) {
    const url = DEBUG_API_URL + 'character'
    await putResponseByUrl(url, characterData)
  },

  /**
   * 固定名が完全に一致する固定情報を取得する
   * @param teamName 固定名
   * @return {Promise<*>} 固定情報
   */
  async getTeamByTeamName(teamName) {
    const url = DEBUG_API_URL + 'team/search/name/' + teamName
    return await getResponseByUrl(url)
  },

  /**
   * キャラクタＩＤをリーダＩＤとし、固定名を指定し固定の作成を行う
   * @param {int} characterId キャラクタＩＤ
   * @param {string} teamName 固定名
   * @param {string} password パスワード
   * @return {Promise<void>}
   */
  async createTeamByReaderIdAndTeamName(characterId, teamName, password) {
    const url = DEBUG_API_URL + 'team'
    const body = {
      teamName: teamName,
      readerId: characterId,
      password: password
    }
    return await postResponseByUrl(url, body)
  }
}
