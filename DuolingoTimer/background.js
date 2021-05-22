console.log("test");

const isSkillUrl = async (url = String()) => {
    const pattern1 = new RegExp("https://www.duolingo.com/skill/.*");
    const pattern2 = new RegExp("https://www.duolingo.com/checkpoint/.*");
    const pattern3 = new RegExp("https://www.duolingo.com/practice");
    //const url = location.href;
    if (pattern1.test(url) || pattern2.test(url) || pattern3.test(url)) {
        return true;
    };
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    //console.log(tabId, changeInfo, tab);
    if (changeInfo.status === 'complete' && isSkillUrl(tab.url)) {
        console.log(tabId, changeInfo, tab);
    };
});

const getTabId = () => new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tab) => {
        const tabId = tab[0].id
        console.log(tabId);
        resolve(tabId);
    });
});
let count = 0;
chrome.webRequest.onResponseStarted.addListener(async (details) => {
    const url = details.url;
    console.log(url);
    if (url === 'https://excess.duolingo.com/challenge_response/batch') {
        //chrome.tabs.sendMessage(await getTabId(), "");
        console.log(url, "回答した");
        count = 0;
    } else if (url.includes("CORRECT_Cropped.json") && count === 0) {
        count += 1;
        console.log('次の問題に行った');
    };

}, { urls: ["<all_urls>"] });

//chrome.declarativeNetRequest.getEnabledRulesets(rulesetIds => console.log(rulesetIds));