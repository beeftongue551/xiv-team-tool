// eslint-disable-next-line no-unused-vars
const {DEBUG_API_URL, BEEF_API_URL} = require("@/module/ModuleType");
const {getResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  async getUserScheduleByUserIdAndTeamIdAndDay(userId, teamId, day) {
    const url = DEBUG_API_URL + 'schedule/team/' + userId + '/' + teamId + '/' + day
    return getResponseByUrl(url)
  }
}