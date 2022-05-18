export class Schedule {
    userId = 0
    teamId = 0
    isEntry = 0
    scheduleDate = ''
    startTime = ''

    constructor(userId, teamId, isEntry, scheduleDate, startTime) {
        this.userId = userId
        this.teamId = teamId
        this.isEntry = isEntry
        this.scheduleDate = scheduleDate
        this.startTime = startTime
    }
}