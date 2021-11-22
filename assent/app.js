window.onload = () => {
    let startTime = document.querySelector("#startTime")
    let stopTime = document.querySelector("#stopTime")
    let resetTime = document.querySelector("#resetTime")
    let lapTime = document.querySelector("#lapTime")

    class HtmlAppComponentDOM {
        watchTitle = document.querySelector('#watchTitle')
        lapContent = document.querySelector('#lapContent')
    }

    class TimeStopWatchApp extends HtmlAppComponentDOM {
        timeMillSec = 0
        timeMill = 0
        timeSeconds = 0
        timeInterval = null
        lapCount = 0

        constructor() {
            super();
        }

        startTime() {
            this.stopTime()
            this.timeInterval = setInterval(() => this.convertTime(), 100)
        }

        convertTime() {
            this.timeMillSec++

            if (this.timeMillSec > 9) {
                this.timeMillSec = 0
                this.timeMill++
            }

            let timeSecondResult = Math.floor(this.timeMill / 60),
                timeMilResult = this.timeMill - timeSecondResult;

            this.timeSeconds = timeSecondResult < 10 ? '0' + timeSecondResult : timeSecondResult
            this.timeMill = timeMilResult < 10 ? '0' + timeMilResult : timeMilResult

            this.watchTitle.innerHTML = `${this.timeSeconds}:${ this.timeMill}:${this.timeMillSec < 10 && '0'+this.timeMillSec}`

        }

        stopTime() {
            clearInterval(this.timeInterval)
        }

        resetTime() {
            this.stopTime()
            this.timeMill = 0
            this.timeMillSec = 0
            this.lapContent.innerHTML = ''
            this.watchTitle.innerHTML = `${this.timeSeconds}:${this.timeMill < 10 && '0'+this.timeMill}:${this.timeMillSec < 10 && '0'+this.timeMillSec}`

        }

        labTime() {
            if (!this.timeMill) {
                return;
            }

            this.lapCount++
            let listElement = document.createElement('li')
            listElement.classList.add('list-group-item', 'h2', 'rounded-pill', 'bg-blue-dark', 'text-light', 'font-weight-light')
            listElement.innerHTML = `${this.lapCount}. ${this.timeSeconds}:${this.timeMill}:${this.timeMillSec <= 9 ? '0'+this.timeMillSec : this.timeMillSec}`

            lapContent.append(listElement)

        }

    }

    let stopWatch = new TimeStopWatchApp()

    startTime.onclick = () => stopWatch.startTime()
    stopTime.onclick = () => stopWatch.stopTime()
    resetTime.onclick = () => stopWatch.resetTime()
    lapTime.onclick = () => stopWatch.labTime()
}