function main() {
    console.log("test");
}
const interval = setInterval(() => {
    if (document.querySelector("button")) {
        clearInterval(interval);
        console.log(document.querySelector("button"));
    }
}, 100);