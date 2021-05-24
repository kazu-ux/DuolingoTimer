const savedMessage = chrome.i18n.getMessage('sevedMessage');
const checkInteger = chrome.i18n.getMessage('checkInteger');
const checkRange = chrome.i18n.getMessage('checkRange');
const titleMessage = chrome.i18n.getMessage('title');
const saveButton = chrome.i18n.getMessage('saveButton');

const setTextContent = () => {
  document.querySelector('#title').textContent = titleMessage;
  document.querySelector('#button').textContent = saveButton;
};

// ボタンイベント
const buttonEvent = (button) => {
  button.addEventListener('click', () => {
    const { value } = document.querySelector('input');
    if (value >= 10 && value <= 600 && !value.includes('.')) {
      chrome.storage.local.set({ TimerSeconds: value });
      document.querySelector('#seved').textContent = savedMessage/* '保存しました' */;
      setTimeout(() => {
        document.querySelector('#seved').innerHTML = '';
      }, 3000);
    } else if (value.includes('.')) {
      document.querySelector('#seved').textContent = checkInteger;
      setTimeout(() => {
        document.querySelector('#seved').innerHTML = '';
      }, 3000);
    } else {
      document.querySelector('#seved').textContent = checkRange/* '10~600までの範囲で入力してください' */;
      setTimeout(() => {
        document.querySelector('#seved').innerHTML = '';
      }, 3000);
    }
  });
};

// 保存されている秒数をインプットに表示する
// 保存されていない場合はデフォルト値の60をセットする
const displaySavedSeconds = () => {
  chrome.storage.local.get('TimerSeconds', (seconds) => {
    if (seconds.TimerSeconds) {
      document.querySelector('input').value = Number(seconds.TimerSeconds);
    } else {
      document.querySelector('input').value = 60;
    }
  });
};

// 保存ボタンが表示されるまで待機
const interval = setInterval(() => {
  const button = document.querySelector('button');
  if (button) {
    clearInterval(interval);
    setTextContent();
    buttonEvent(button);
    displaySavedSeconds();
  }
}, 100);
