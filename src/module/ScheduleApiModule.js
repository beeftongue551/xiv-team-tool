const {getResponseByUrl, postResponseByUrl} = require("@/module/UrlModule");

module.exports = {
  async selectXIVScheduleList() {
    const url = 'http://localhost:8080/schedule'
    return await getResponseByUrl(url)
  },

  async createXIVSchedule(schedule) {
    const url = 'http://localhost:8080/schedule'
    return await postResponseByUrl(url, schedule)
  }
}
