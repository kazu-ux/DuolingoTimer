// 出題画面かそれ以外かを判定
const isSkillUrl = async () => {
  const pattern1 = new RegExp('https://www.duolingo.com/skill/.*');
  const pattern2 = new RegExp('https://www.duolingo.com/checkpoint/.*');
  const pattern3 = new RegExp('https://www.duolingo.com/practice');
  const url = window.location.href;
  if (pattern1.test(url) || pattern2.test(url) || pattern3.test(url)) {
    return true;
  }
  return false;
};

// 答え合わせ画面かどうか、最後の答え合わせ画面かを判定
const isCheckTheAnswer = async () => {
  try {
    const target = document.getElementById('session/PlayerFooter');
    const targetClassName = target.getAttribute('class');
    const targetButtonClassName = target.querySelector('button').getAttribute('class');
    if (
      targetClassName === 'YQ0lZ _2LMXW _3vF5k _3iFZd'
      || targetClassName === 'YQ0lZ _2LMXW _3e9O1 _3iFZd'
      || targetButtonClassName.includes('_2ugbF')
    ) {
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

  bar.animate(-1, {
    duration: seconds * 1000,
    easing: 'linear',
  });
  // カウントダウンタイマー
  const countDown = setInterval(() => {
    if (seconds > 0) {
      try {
        bar.setText(seconds -= 1);
      } catch (error) {
        clearInterval(countDown);
      }
    } else if (seconds === 0) {
      clickElement();
      clearInterval(countDown);
    } else {
      clearInterval(countDown);
    }
  }, 1000);

  let count = null;
  const interval2 = setInterval(async () => {
    const isCheckingAnswer = await isCheckTheAnswer();
    if (isCheckingAnswer === true) {
      if (bar.path) {
        bar.destroy();
      }
      count = 0;
    } else if (isCheckingAnswer === 'error') {
      console.log(count);
      count = null;
      clearInterval(interval2);
      clearInterval(countDown);
      main();
    } else if (count === 0) {
      count += 1;
      console.log('次の問題に行った');
      clearInterval(interval2);
      clearInterval(countDown);
      addProgressBar();
      // count += 1;
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
    if (value.TimerSeconds === undefined) {
      chrome.storage.local.set({ TimerSeconds: 60 });
      resolve(60);
    } else {
      resolve(value.TimerSeconds);
    }
  });
});

const main = async () => {
  let count = 0;
  const checkURL = setInterval(async () => {
    console.log('test');
    if (await isSkillUrl()) {
      // 一度だけ呼び出す
      if (count === 0) {
        count += 1;
        await addElementForProgressBar();
        addProgressBar();
        clearInterval(checkURL);
      }
    } else { count = 0; }
  }, 1000);
};

document.addEventListener('load', main());
