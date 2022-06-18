/* Your Code Here */
function createEmployeeRecord(arr){
    let obj = new Object()
    obj.firstName = arr[0]
    obj.familyName = arr[1]
    obj.title = arr[2]
    obj.payPerHour = arr[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}

function createEmployeeRecords (arr){
    let newRec = []
    arr.forEach( elem => {
        newRec.push(createEmployeeRecord(elem))
    })
    return newRec
}

function createTimeInEvent(time){
    let newTime = time.split(" ")
    this.timeInEvents.push(new Object({
        type : "TimeIn",
        date : newTime[0],
        hour :  parseInt(newTime[1])
    }))
    return this
}


function createTimeOutEvent(time){
    let newTime = time.split(" ")
    this.timeOutEvents.push(new Object({
        type : "TimeOut",
        date : newTime[0],
        hour :  parseInt(newTime[1])
    }))
    return this
}

function hoursWorkedOnDate(hrs){
    let hours = 0
    for(let i = 0; i < this.timeInEvents.length; i++){
        hours += (this.timeOutEvents[i].hour - this.timeInEvents[i].hour) /100
    }
    // console.log(hours)
    return hours
}


function wagesEarnedOnDate(givenDate) {
  const totalHoursWorked = hoursWorkedOnDate.call(this, givenDate)

  return totalHoursWorked * this.payPerHour;
}


const findEmployeeByFirstName =  (collection, firstNameString) => {
  return collection.find((employee) => {
    return employee.firstName === firstNameString;
  })
}



let calculatePayroll = function(arrayOfEmployeeRecords){
    return arrayOfEmployeeRecords.reduce(function(memo, rec){
        return memo + wagesEarnedOnDate.call(rec)
    }, 0)
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