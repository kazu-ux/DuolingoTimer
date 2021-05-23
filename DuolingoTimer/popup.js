// ボタンイベント
const buttonEvent = (button) => {
  button.addEventListener('click', () => {
    const { value } = document.querySelector('input');
    if (value > 0 && value <= 600) {
      chrome.storage.local.set({ TimerSeconds: value });
      document.querySelector('#seved').textContent = '保存しました';
      setTimeout(() => {
        document.querySelector('#seved').innerHTML = '';
      }, 3000);
    } else {
      document.querySelector('#seved').textContent = '1~600までの範囲で入力してください';
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
    buttonEvent(button);
    displaySavedSeconds();
  }
}, 100);
