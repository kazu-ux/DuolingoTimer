//プログレスバーを追加する場所を用意する

//出題画面かそれ以外かを判定
async function isSkillUrl() {
    const pattern = new RegExp("https://www.duolingo.com/.*practice")
    const url = location.href;
    if (pattern.test(url)) {
        return true;
    }
}
//1問につき一度だけ実行する
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

//プログレスバーを追加する
async function addProgressBar() {
    //ユーザーが指定した秒数
    let inputSeconds = 10;

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
    bar.animate(-1, {
        duration: inputSeconds * 1000,
        easing: 'linear',
    },
        //clickElement()
    )

    const interval = setInterval(() => {
        if (inputSeconds > 0) {
            bar.setText(inputSeconds -= 1)
        } else { clearInterval(interval); }
        console.log("ループ確認用")
    }, 1000);
}

function clickElement() {
    const isButton = document.querySelector('._1KqTg').parentElement.getAttribute("disabled");
    if (isButton == null) {
        document.querySelector('._1KqTg').click();
    } else if (isButton == "") {
        document.querySelector('[data-test="player-skip"]').click();
    }
}

async function main() {
    //await addElementForProgressBar();
    //await addProgressBar();
    setInterval(async () => {
        if (await isSkillUrl() && !document.getElementById("container")) {
            await addElementForProgressBar();
            await addProgressBar();
            console.log("test");
        }

    }, 1000);
}

document.addEventListener("load",
    main()
)