/* Asynchronous nature of js*/
function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs: " + date.getMinutes() + " Mins: " + date.getSeconds() + " Secs ";
}

function showSessionExpire() {
    console.log("Activity-B : Your Session expired at " + showTime());
}

console.log("Activity -A : Triggering Activity-B At " + showTime());
setTimeout(showSessionExpire, 5000);
console.log("Activity -A : Triggering Activity-B At " + showTime() + " will execute after 5 seconds");

