export class Schedule {
    userId = 0
    teamId = 0
    isentry = 0
    scheduleDate = ''
    startTime = ''

    constructor(userId, teamId, isentry, scheduleDate, startTime) {
        this.userId = userId
        this.teamId = teamId
        this.isentry = isentry
        this.scheduleDate = scheduleDate
        this.startTime = startTime
    }
}