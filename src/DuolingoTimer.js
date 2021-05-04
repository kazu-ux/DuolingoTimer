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

async function addProgressBar() {
    const bar = new ProgressBar.Line(container, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#eee',
        trailWidth: 1,
        svgStyle: { width: '100%', height: '100%' }
    });
    bar.animate(1);
}

async function main() {
    await addElementForProgressBar();
    await addProgressBar();
}

document.addEventListener("load",
    main()
)