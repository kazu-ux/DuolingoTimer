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
    let inputSeconds = 30;

    const bar = new ProgressBar.Line(container, {
        strokeWidth: 1,
        easing: 'easeInOut',
        duration: 1400,
        color: '#eee',
        trailColor: '#FFEA82',
        trailWidth: 4,
        svgStyle: { width: '100%', height: '100%' }
    });
    bar.animate(-1, {
        duration: inputSeconds * 1000,
        easing: 'linear',
    })

    const interval = setInterval(() => {
        console.log("ループ確認用")
    }, 1000);
}

async function main() {
    await addElementForProgressBar();
    await addProgressBar();
}

document.addEventListener("load",
    main()
)