let totalSeconds = 0;
let countdownTimer;

window.onload = () => {
    const magicDate =  new Date("2021-09-11T15:30:00+01:00");
    const today = new Date();
    totalSeconds = (magicDate.getTime() - today.getTime()) / 1000;

    timer()
    countdownTimer = setInterval(() => timer(), 1000);
};

function pad(n) {
    return (n < 10 ? "0" + n : n);
}

function timer() {
    var days = Math.floor(totalSeconds / 24 / 60 / 60);
    var hoursLeft = Math.floor((totalSeconds) - (days * 86400));
    var hours = Math.floor(hoursLeft / 3600);
    var minutesLeft = Math.floor((hoursLeft) - (hours * 3600));
    var minutes = Math.floor(minutesLeft / 60);
    var remainingSeconds = Math.floor(totalSeconds % 60);

    renderTimer(days, hours, minutes, remainingSeconds)

    if (totalSeconds == 0) {
        clearInterval(countdownTimer);
    } else {
        totalSeconds--;
    }
}

function renderTimer(days, hours, minutes, seconds) {
    const daysWrapper = document.querySelector('.countdown-days .countdown-number');
    const hoursWrapper = document.querySelector('.countdown-hours .countdown-number');
    const minutesWrapper = document.querySelector('.countdown-minutes .countdown-number');
    const secondsWrapper = document.querySelector('.countdown-seconds .countdown-number');

    daysWrapper.textContent = pad(days);
    hoursWrapper.textContent = pad(hours);
    minutesWrapper.textContent = pad(minutes);
    secondsWrapper.textContent = pad(seconds);
}