//プログレスバーを追加する場所を用意する

//出題画面かそれ以外かを判定
async function isSkillUrl() {
    const pattern1 = new RegExp("https://www.duolingo.com/skill/.*");
    const pattern2 = new RegExp("https://www.duolingo.com/checkpoint/.*");
    const pattern3 = new RegExp("https://www.duolingo.com/practice");
    const url = location.href;
    if (pattern1.test(url) || pattern2.test(url) || pattern3.test(url)) {
        return true;
    }
}

//答え合わせ画面かどうかを判定
async function isCheckTheAnswer() {
    try {
        const target = document.getElementById("session/PlayerFooter");
        const targetClassName = target.getAttribute("class");
        if (targetClassName == "YQ0lZ _2LMXW _3vF5k _3iFZd" || targetClassName == "YQ0lZ _2LMXW _3e9O1 _3iFZd") {
            console.log(target);
            return true;
        } else { return false; }
    } catch (error) {
        return
    }


}
//問題を始めた時に一度だけ実行する
async function addElementForProgressBar() {

    const target = document.getElementsByClassName("mQ0GW")[0];
    const add = document.createElement("div");
    add.setAttribute("id", "container")

    target.before(add);
    //cssを追加
    add.style.margin = "1%";
    add.style.width = '98%';
    add.style.height = '8px';
    add.style.top = '92%';
    return
}

//次の問題に行ったかどうかを判定する
async function isNextQuestion() {
    //要素が現れるまで待つ
    const interval = setInterval(() => {
        const target = document.querySelector('.jWza5');
        if (target) {
            let timer = null;

            clearInterval(interval)
            //一度だけ検出されればよいので、二度目以降の検出を無効にする処理を書く
            const observer = new MutationObserver(() => {
                clearTimeout(timer)
                timer = setTimeout(async () => {
                    await addProgressBar();
                }, 500);
            });
            observer.observe(target, {
                childList: true,
            });
        };
    }, 100);
    return
};

//プログレスバーを追加する
async function addProgressBar() {
    document.querySelector("#container").innerHTML = "";
    //ユーザーが指定した秒数
    let inputSeconds = 20;

    const bar = new ProgressBar.Line(container, {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        color: '#eee',
        trailColor: '#FFEA82',
        trailWidth: 4,
        svgStyle: { width: '100%', height: '100%' },
        text: {
            value: inputSeconds,
            style: {
                color: "#000",
                position: 'relative',
                left: '50%',
                bottom: "600%",
                fontSize: "200%",
            }
        },
    });
    //カウントダウンタイマー
    const interval = setInterval(() => {
        if (inputSeconds > 0) {
            try {
                bar.setText(inputSeconds -= 1);
            } catch (error) {
                clearInterval(interval);
            }
        } else if (inputSeconds == 0) {
            clickElement();
            clearInterval(interval);
        } else {
            clearInterval(interval);
        }
        console.log("ループ確認用")
    }, 1000);

    bar.animate(-1, {
        duration: inputSeconds * 1000,
        easing: 'linear',
    }, () => {
    });
    const interval2 = setInterval(async () => {
        const test = await isCheckTheAnswer()
        console.log(test);
        if (test) {
            console.log('test');
            bar.destroy();
            clearInterval(interval2);
        }

    }, 100);
}

//タイムオーバー時のクリックイベント処理
function clickElement() {
    try {
        const isButton = document.querySelector('._1KqTg').parentElement.getAttribute("disabled");
        if (isButton == null) {
            document.querySelector('._1KqTg').click();
        } else if (isButton == "") {
            document.querySelector('[data-test="player-skip"]').click();
        }
    } catch (error) {
        return
    }

}

async function main() {
    let count = 0;
    setInterval(async () => {
        if (await isSkillUrl()) {
            if (count == 0) {
                await addElementForProgressBar();
                await addProgressBar();
                await isNextQuestion();

                //console.log("メイン関数");
                count += 1;
            };
        } else { count = 0; };
    }, 1000);
};

document.addEventListener("load",
    main()
)