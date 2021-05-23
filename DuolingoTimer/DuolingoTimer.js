// 答え合わせ画面かどうかを判定
const isCheckTheAnswer = async () => {
  try {
    const target = document.getElementById('session/PlayerFooter');
    const targetClassName = target.getAttribute('class');
    if (targetClassName === 'YQ0lZ _2LMXW _3vF5k _3iFZd' || targetClassName === 'YQ0lZ _2LMXW _3e9O1 _3iFZd') {
      // console.log(target);
      return true;
    } return false;
  } catch (error) {
    return 'error';
  }
};

// 問題を始めた時に一度だけ実行する
const addElementForProgressBar = () => new Promise((resolve) => {
  const interval = setInterval(() => {
    const target = document.getElementsByClassName('mQ0GW')[0];
    if (target) {
      clearInterval(interval);
      const add = document.createElement('div');
      add.setAttribute('id', 'container');

      target.before(add);
      // cssを追加
      add.style.margin = '1%';
      add.style.width = '98%';
      add.style.height = '8px';
      add.style.top = '76%';
      resolve(true);
    }
  }, 100);
});

// 次の問題に行ったかどうかを判定する
const isNextQuestion = async () => {
  // 要素が現れるまで待つ
  const interval = setInterval(() => {
    const target = document.querySelector('.jWza5');
    if (target) {
      let timer = null;

      clearInterval(interval);
      // 一度だけ検出されればよいので、二度目以降の検出を無効にする処理を書く
      const observer = new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
          await addProgressBar();
        }, 500);
      });
      observer.observe(target, {
        childList: true,
      });
    }
  }, 100);
};

// プログレスバーを追加する
const addProgressBar = async () => {
  let seconds = Number(await choromeStorage());

  document.querySelector('#container').innerHTML = '';

  const bar = new ProgressBar.Line('#container', {
    strokeWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    color: '#eee',
    trailColor: '#FFEA82',
    trailWidth: 4,
    svgStyle: { width: '100%', height: '100%' },
    text: {
      value: seconds,
      style: {
        color: '#000',
        position: 'relative',
        bottom: '600%',
        fontSize: '200%',
      },
    },
  });
  // カウントダウンタイマー
  const interval = setInterval(() => {
    if (seconds > 0) {
      try {
        bar.setText(seconds -= 1);
      } catch (error) {
        clearInterval(interval);
      }
    } else if (seconds === 0) {
      clickElement();
      clearInterval(interval);
    } else {
      clearInterval(interval);
    }
    // console.log(seconds)
  }, 1000);

  bar.animate(-1, {
    duration: seconds * 1000,
    easing: 'linear',
  });
  const interval2 = setInterval(async () => {
    const test = await isCheckTheAnswer();
    // console.log(test);
    if (test === true) {
      // console.log('test');
      try {
        bar.destroy();
      } finally {
        clearInterval(interval2);
      }
    } else if (test === 'error') {
      clearInterval(interval2);
      clearInterval(interval);
    }
  }, 100);
};

// タイムオーバー時のクリックイベント処理
const clickElement = () => {
  try {
    const isButton = document.querySelector('._1KqTg').parentElement.getAttribute('disabled');
    if (isButton == null) {
      document.querySelector('._1KqTg').click();
    } else if (isButton === '') {
      document.querySelector('[data-test="player-skip"]').click();
    }
  } catch (error) {
    return 'error';
  }
  return true;
};

// chromeストレージにアクセス
const choromeStorage = () => new Promise((resolve) => {
  // chrome.storage.local.clear();
  chrome.storage.local.get('TimerSeconds', (value) => {
    // console.log(value.TimerSeconds);
    if (value.TimerSeconds === undefined) {
      chrome.storage.local.set({ TimerSeconds: 60 });
      chrome.storage.local.get('TimerSeconds', (value) => { resolve(value.TimerSeconds); });
    } else {
      chrome.storage.local.get('TimerSeconds', (value) => { resolve(value.TimerSeconds); });
    }
  });
});

const main = async () => {
  await addElementForProgressBar();
  // console.log(await choromeStorage())
  addProgressBar();
  await isNextQuestion();
};

document.addEventListener('load', main());
