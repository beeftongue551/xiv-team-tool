export class Schedule {
    isentry = 0
    name = ''
    scheduleDate = ''
    startTime = ''

    constructor(isentry, name, scheduleDate, startTime) {
        this.isentry = isentry
        this.name = name
        this.scheduleDate = scheduleDate
        this.startTime = startTime
    }
}