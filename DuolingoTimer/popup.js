function main() {
    console.log("test");
}
const setDefaultSeconds = () => { }

//ボタンイベント
const buttonEvent = (button) => {
    button.addEventListener("click", () => {
        const value = document.querySelector("input").value;
        if (value > 0 && value <= 600) {
            chrome.storage.local.set({ "TimerSeconds": value });
            document.querySelector("#seved").textContent = "保存しました";
            setTimeout(() => {
                document.querySelector("#seved").remove();
            }, 3000);

        } else {
            alert("1~600までの範囲で入力してください");
        }
    })
}


const interval = setInterval(() => {
    const button = document.querySelector("button");
    if (button) {
        clearInterval(interval);
        buttonEvent(button);
        //保存されている秒数をインプットに表示する
        chrome.storage.local.get("TimerSeconds", (seconds) => {
            if (seconds.TimerSeconds) {
                document.querySelector("input").value = Number(seconds.TimerSeconds);
            } else {
                document.querySelector("input").value = 60;
            }

            console.log(seconds.TimerSeconds);
        });
    }
}, 100);