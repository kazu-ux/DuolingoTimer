function main() {
    console.log("test");
}
const interval = setInterval(() => {
    if (document.querySelector("button")) {
        clearInterval(interval);
<<<<<<< Updated upstream
        console.log(document.querySelector("button"));
=======
        buttonEvent(button);
        chrome.storage.local.get("TimerSeconds", (seconds) => {
            console.log(seconds);
            document.querySelector("input").value = Number(seconds.TimerSeconds);
            console.log(seconds.TimerSeconds);
        });
>>>>>>> Stashed changes
    }
}, 100);