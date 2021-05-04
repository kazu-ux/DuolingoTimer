//プログレスバーを追加する場所を用意する
async function addElementForProgressBar() {
    const add = document.createElement("div");
    add.setAttribute("id", "container")
    const target = document.getElementsByClassName("o3j99 c93Gbe")[0];

    target.before(add);
    //cssを追加
    add.style.margin = "1%";
    add.style.width = '98%';
    add.style.height = '8px';
    return
}

//プログレスバーを追加する
async function addProgressBar() {
    //ユーザーが指定した秒数
    let inputSeconds = 11;

    const bar = new ProgressBar.Line(container, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '100%' }
    });
    bar.set(1);

    //引くべき数値
    const calcSeconds = await calc(inputSeconds);
    console.log(calcSeconds);

    let count = 1;
    const interval = setInterval(() => {
        count -= calcSeconds;
        if (inputSeconds >= 0) {
            bar.set(count);
            inputSeconds -= 1;
            console.log(count);
        } else { clearInterval(interval); };
        console.log("ループ確認用")
    }, 1000);
}

//引くべき数字を求める
async function calc(number) {
    return Math.round((1 / number) * 100000) / 100000
}

async function main() {
    await addElementForProgressBar();
    await addProgressBar();
}

document.addEventListener("load",
    main()
)