const createEmployeeRecord = function(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}


const createEmployeeRecords = function(arr){
    return arr.map((e) => {
        return createEmployeeRecord(e)
    })
}

const createTimeInEvent = function (time){
    const timeArr = time.split(" ")
    const date = timeArr[0]
    const hour = parseInt(timeArr[1])
    this.timeInEvents.push({
        type:"TimeIn",
        date: date,
        hour:  hour
    })
    return this
}

const createTimeOutEvent = function (time){
    const timeArr = time.split(" ")
    const date = timeArr[0]
    const hour = parseInt(timeArr[1])
    this.timeOutEvents.push({
        type:"TimeOut",
        date: date,
        hour:  hour
    })
    return this
}

const hoursWorkedOnDate = function(date){
    let inTime;
    let OutTime;
    for(let i = 0; i < this.timeInEvents.length; i++){
        if(this.timeInEvents[i].date === date){
            inTime = this.timeInEvents[i].hour
            break
        }
    }
    for(let i = 0; i < this.timeOutEvents.length; i++){
        if(this.timeOutEvents[i].date === date){
            OutTime = this.timeOutEvents[i].hour
            break
        }
    }
        return Math.abs(OutTime - inTime) / 100

}

const wagesEarnedOnDate = function(date){
    let totalWages = hoursWorkedOnDate.call(this, date) * this.payPerHour
    
    return Math.abs(totalWages) 
}



const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}




const findEmployeeByFirstName = (arr, name) => {
    return arr.find(e => {
        return e.firstName === name
    })
}

const calculatePayroll = (arr) => {
    let totalWages = 0;
    arr.map((e) => {
        totalWages += allWagesFor.call(e)
    })
    return Math.abs(totalWages)

}