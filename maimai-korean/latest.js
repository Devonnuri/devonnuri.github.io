// ==UserScript==
// @name         Maimai-net Korean
// @namespace    https://devonnuri.com
// @version      1.0
// @description  Korean Maimai-net Translation
// @author       devonnuri
// @downloadURL  https://devonnuri.com/maimai-korean/latest.js
// @match        https://maimai-net.com/*
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  function applyButtonStyle(node, color = 'blue') {
    node.style.width = '150px';
    node.style.height = '37px';
    node.style.margin = 'auto';
    if (color == 'blue') {
      node.style.border = '4px solid rgb(61, 169, 241)';
      node.style.borderRadius = '10px';
      node.style.backgroundColor = 'rgb(139, 211, 254)';
      node.style.color = 'rgb(0, 42, 126)';
    } else if (color == 'red') {
      node.style.border = '4px solid rgb(255, 8, 108)';
      node.style.borderRadius = '10px';
      node.style.backgroundColor = 'rgb(255, 108, 185)';
      node.style.color = 'rgb(178, 9, 99)';
    }
    node.style.boxShadow =
      '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24), inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24)';
    node.style.fontWeight = 'bold';
    node.style.fontSize = '1.4em';
    node.style.lineHeight = '37px';
    node.style.whiteSpace = 'nowrap';
  }

  const navList = document.querySelectorAll('.header ul li a');
  const navTranslation = [
    '홈',
    '플레이어\n데이터',
    '친구',
    '동영상 연동',
    '플레이 기록',
    '모든 곡 점수',
    '컬렉션',
    '랭킹'
  ];
  const navLink = [
    'home',
    'playerData',
    'friend',
    'movie',
    'playLog',
    'music',
    'collection',
    'ranking'
  ];

  let currentNav = 0;
  navLink.forEach((url, i) => {
    if (location.href.match(new RegExp(`.*/${url}.*$`))) {
      document.title = 'maimaiNET - ' + navTranslation[i] + ' -';
      currentNav = i;
    }
  });

  navList.forEach((e, i) => {
    e.removeChild(e.childNodes[0]);
    e.innerText = navTranslation[i];
    e.style.display = 'flex';
    e.style.justifyContent = 'center';
    e.style.flexDirection = 'column';
    e.style.height = '90px';
    e.style.backgroundColor = 'rgb(176, 198, 209)';
    e.style.boxShadow =
      '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23), inset 0 1px 3px rgba(0,0,0,0.12), inset 0 1px 2px rgba(0,0,0,0.24)';

    if (currentNav == i) {
      e.style.color = 'rgb(206, 7, 207)';
      e.style.border = '5px solid rgb(215, 3, 163)';
    } else {
      e.style.color = 'rgb(6, 106, 169)';
      e.style.border = '5px solid rgb(78, 190, 255)';
    }

    e.style.borderRadius = '4px';
    e.style.fontSize = '1.6em';
  });

  if (location.href.match(/.*\/home\/$/)) {
    const buttonSet = document.querySelector(
      'div.status_you div.status_name.clearfix'
    );
    buttonSet.style.marginBottom = '0.7rem';
    buttonSet.style.border = 'none';

    document
      .querySelectorAll('div.status_you div.status_name.clearfix a')
      .forEach((e, i) => {
        e.removeChild(e.childNodes[0]);
        e.style.textDecoration = 'none';
        const btn = document.createElement('div');
        btn.innerText = i == 0 ? '설정 변경' : '시리얼 코드';
        applyButtonStyle(btn);
        e.appendChild(btn);
      });

    const oshirase = document.querySelector(
      '#container > div > div > div.text_c'
    );
    oshirase.childNodes[0].remove();
    const oshiraseTitle = document.createElement('div');
    oshiraseTitle.innerText = 'maimai로부터의 알림';
    oshiraseTitle.style.color = 'rgb(4, 107, 180)';
    oshiraseTitle.style.fontSize = '1.5em';
    oshiraseTitle.style.fontWeight = 'bold';
    oshirase.appendChild(oshiraseTitle);
  } else if (location.href.match(/.*\/maimai-mobile\/$/)) {
    document.querySelector('form > span.login_title:nth-of-type(1)').innerText =
      'SEGA 아이디';
    document.querySelector('form > span.login_title:nth-of-type(2)').innerText =
      '비밀번호';

    const checkbox = document.querySelector('form input[type="checkbox"]');
    checkbox.nextSibling.nodeValue = 'SEGA ID 기억하기';
    checkbox.nextSibling.nextSibling.nextSibling.nodeValue =
      '(공공장소에서는 체크해제 해주세요.)';

    const tnc = document.querySelector('form > font > a');
    tnc.innerText = '이용약관';
    tnc.nextSibling.nodeValue = '에 동의하며 로그인';

    document.querySelector('form input[type="image"]').remove();
    const loginButton = document.createElement('input');
    loginButton.type = 'submit';
    loginButton.value = '로그인';
    applyButtonStyle(loginButton, 'red');
    document.querySelector('form').appendChild(loginButton);

    const signUpLink = document.querySelector(
      '#container div.text_c.color1 a:nth-child(3)'
    );
    document
      .querySelector('#container div.text_c.color1 a:nth-child(3) img')
      .remove();
    const signUpButton = document.createElement('div');
    signUpButton.innerText = '회원가입';
    applyButtonStyle(signUpButton);
    signUpLink.appendChild(signUpButton);
  } else if (location.href.match(/.*\/playerData\/$/)) {
    // prevent for playCount overflow
    document.querySelector(
      'div.status_you table tr:nth-of-type(1) td:nth-child(2)'
    ).style.width = '20%';

    const friendCount = document.querySelector(
      'div.status_you div.status_data div:nth-child(6) span'
    );
    friendCount.innerText = friendCount.innerText.replace('人', '명');
  } else if (location.href.match(/.*\/friend\/.*$/)) {
    const tabTranslation = ['친구', '후보', '보낸 신청', '받은 신청', 'VS'];
    for (let i = 0; i < 5; i++) {
      const link = document.querySelector(
        `#tab5 > div:nth-child(${i + 1}) > a`
      );
      if (link) {
        link.innerText = tabTranslation[i];
      } else {
        document.querySelector(`#tab5 > div:nth-child(${i + 1})`).innerText =
          tabTranslation[i];
      }
    }

    if (location.href.match(/.*\/friend\/((favoriteOn\/)|(favoriteOff\/))?$/)) {
      const icon = document.querySelector(
        'div.status6.clearfix div.text_c p img'
      );
      icon.nextSibling.nodeValue = '친구 ';
      icon.nextSibling.nextSibling.nextSibling.nodeValue = '명 / 100명 ';

      document.querySelector(
        'table.friend_info tr:nth-child(1) td:nth-child(2)'
      ).innerText = '친구 후보에서 친구를 신청하면, 친구가 될 수 있습니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(2) td:nth-child(2)'
      ).innerText = '최대 친구 수는 100명입니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(3) td:nth-child(2)'
      ).innerText =
        '친구가 되면 maimaiNET 안에서 액티비티나 동영상의 정보를 공유할 수 있게 됩니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(4) td:nth-child(2)'
      ).innerText = '최대 즐겨찾기 수는 20명입니다.';

      let latestTime = document.querySelectorAll(
        'div.friend_box div.text_l div:nth-child(3) font.blue'
      );
      if (latestTime.length < 1) {
        latestTime = document.querySelectorAll(
          'div.friend_box div.text_l div:nth-child(4) font.blue'
        );
      }

      latestTime.forEach(e => {
        e.innerText = '마지막 접속 시간 ';
        e.nextSibling.nodeValue = e.nextSibling.nodeValue
          .replace('以内', '이내')
          .replace('日', '일 ')
          .replace('月', '달 ')
          .replace('時間', '시간 ')
          .replace('分', '분 ');
      });

      document.querySelectorAll('div.friend_box div.f_l button').forEach(e => {
        e.innerText = '친구 삭제';
      });
      document.querySelectorAll('div.friend_box div.f_r button').forEach(e => {
        e.innerText = '즐겨찾기 등록';
      });
      document
        .querySelectorAll('div.friend_box div.text_r form button')
        .forEach(e => {
          e.innerText = '즐겨찾기 해제';
        });
    } else if (location.href.match(/.*\/friend\/friendCandidate\/$/)) {
      const icon = document.querySelector(
        'div.status6.clearfix div.text_c p img'
      );
      icon.nextSibling.nodeValue = '친구 후보 ';

      document.querySelector(
        'table.friend_info tr:nth-child(1) td:nth-child(2)'
      ).innerText = '같이 플레이하면 친구 후보로 등록됩니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(2) td:nth-child(2)'
      ).innerText = '친구 후보는 최근 플레이한 20명까지 표시됩니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(3) td:nth-child(2)'
      ).innerText = '한번에 10건까지 친구를 신청할 수 있습니다.';
    } else if (location.href.match(/.*\/friend\/friendInvite\/$/)) {
      const icon = document.querySelector(
        'div.status6.clearfix div.text_c p img'
      );
      icon.nextSibling.nodeValue = '보낸 신청 ';

      document.querySelector(
        'table.friend_info tr:nth-child(1) td:nth-child(2)'
      ).innerText = '당신이 친구 신청한 플레이어들입니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(2) td:nth-child(2)'
      ).innerText = '신청은 한번에 10건까지 가능합니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(3) td:nth-child(2)'
      ).innerText = '상대가 승인하면 친구로 등록됩니다.';

      document
        .querySelectorAll('form button[name="invite_cancel"]')
        .forEach(e => {
          e.innerText = '신청 취소';
        });
    } else if (location.href.match(/.*\/friend\/friendAccept\/$/)) {
      const icon = document.querySelector(
        'div.status6.clearfix div.text_c p img'
      );
      icon.nextSibling.nodeValue = '받은 신청 ';

      document.querySelector(
        'table.friend_info tr:nth-child(1) td:nth-child(2)'
      ).innerText = '당신에게 친구 신청한 플레이어들입니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(2) td:nth-child(2)'
      ).innerText = '당신이 승인하면 친구로 등록됩니다.';

      document.querySelector('div.text_c div.status6.clearfix span').innerText =
        '※ 현재 받은 친구 신청이 없습니다.';
    } else if (location.href.match(/.*\/friend\/friendVs\/.*$/)) {
      const icon = document.querySelector(
        'div.status6.clearfix div.text_c p img'
      );
      icon.nextSibling.nodeValue = '친구 VS ';

      document.querySelector(
        'table.friend_info tr:nth-child(1) td:nth-child(2)'
      ).innerText = '즐겨찾기한 친구와 점수를 비교할 수 있습니다.';
      document.querySelector(
        'table.friend_info tr:nth-child(2) td:nth-child(2)'
      ).innerText =
        'MURASAKi PLUS 이전 버전을 플레이하는 친구와는 점수를 비교할 수 없습니다.';

      const genreBtn = document.querySelector('button[name="genreBtn"]');
      genreBtn.childNodes[0].remove();
      genreBtn.innerText = '장르';
      genreBtn.style.color = 'white';
      genreBtn.style.fontSize = '1.2em';
      genreBtn.style.fontWeight = 'bold';
      genreBtn.style.background =
        'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
      genreBtn.style.borderRadius = '5px';
      genreBtn.style.padding = '0.7rem 0';

      const levelBtn = document.querySelector('button[name="levelBtn"]');
      levelBtn.childNodes[0].remove();
      levelBtn.innerText = '레벨';
      levelBtn.style.color = 'white';
      levelBtn.style.fontSize = '1.2em';
      levelBtn.style.fontWeight = 'bold';
      levelBtn.style.background = 'rgb(100, 100, 100)';
      levelBtn.style.borderRadius = '5px';
      levelBtn.style.padding = '0.7rem 0';

      genreBtn.addEventListener('click', function() {
        genreBtn.style.background =
          'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
        levelBtn.style.background = 'rgb(100, 100, 100)';
      });

      levelBtn.addEventListener('click', function() {
        genreBtn.style.background = 'rgb(100, 100, 100)';
        levelBtn.style.background =
          'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
      });

      document.querySelector(
        'select[name="genre"] option[value="99"]'
      ).innerText = '모든 장르';
      document.querySelector(
        'select[name="genre"] option[value="0"]'
      ).innerText = 'POPS & 애니메이션';
      document.querySelector(
        'select[name="genre"] option[value="1"]'
      ).innerText = 'niconico & 보컬로이드';
      document.querySelector(
        'select[name="genre"] option[value="2"]'
      ).innerText = '동방프로젝트';
      document.querySelector(
        'select[name="genre"] option[value="4"]'
      ).innerText = '게임 & 버라이어티';
      document.querySelector(
        'select[name="genre"] option[value="5"]'
      ).innerText = '오리지널 & 조이폴리스';

      const playCheck = document.querySelector('input[name="playCheck"]');
      const winOnly = document.querySelector('input[name="winOnly"]');
      const loseOnly = document.querySelector('input[name="loseOnly"]');

      playCheck.nextSibling.nodeValue = '미플레이 제외 ';
      winOnly.nextSibling.nodeValue = '이긴 것만 ';
      loseOnly.nextSibling.nodeValue = '진 것만';

      document.querySelector('form input[type="image"]').remove();
      const startButton = document.createElement('input');
      startButton.type = 'submit';
      startButton.value = '전투개시!';
      startButton.style.padding = '0.7rem 2rem';
      startButton.style.margin = '0.5rem';
      startButton.style.border = 'none';
      startButton.style.borderRadius = '5px';
      startButton.style.background =
        'linear-gradient(to top, #f77062 0%, #fe5196 100%)';
      startButton.style.color = 'yellow';
      startButton.style.fontSize = '1.3em';
      startButton.style.fontWeight = 'bold';
      document.querySelector('form').appendChild(startButton);

      const record = document.querySelector('.vs_result_record');
      record.innerText = record.innerText
        .replace('勝', '승')
        .replace('敗', '패')
        .replace('分', '무');
    }
  } else if (location.href.match(/.*\/movie.*$/)) {
    if (
      document
        .querySelector('#tab div:nth-of-type(1)')
        .classList.contains('tab_2_on')
    ) {
      document.querySelector(
        'div.status_home.clearfix div:nth-child(1) font.name2'
      ).innerText =
        '※ maimaiNET에 저장된 동영상은 30일간 지나면 자동적으로 삭제됩니다';
      document.querySelector(
        'div.status_home.clearfix div:nth-child(4) div font'
      ).innerText = '※ 저장된 동영상이 없습니다.';
    } else {
      document.querySelector(
        'div.status_home.clearfix div:nth-child(1) font.name2'
      ).innerText =
        '※ 니코니코 동영상에 업로드된 동영상입니다.\n※ 썸네일을 클릭하면, 니코니코 동영상으로 이동합니다.';
      document.querySelector(
        'div.status_home.clearfix div:nth-child(4) div font'
      ).innerText = '※ 업로드된 동영상이 없습니다.';
    }

    document.querySelector('#nicoForm_nicoLogin').remove();
    const nicoLogin = document.createElement('input');
    nicoLogin.type = 'submit';
    nicoLogin.value = '니코니코 동영상과 연동';
    nicoLogin.id = 'nicoForm_nicoLogin';
    applyButtonStyle(nicoLogin);
    document.querySelector('#nicoForm').appendChild(nicoLogin);
    nicoLogin.style.width = '300px';
  } else if (location.href.match(/.*\/playLog.*$/)) {
    document
      .querySelectorAll('div.result_icon_block3.text_c.f_l span.red.text_b')
      .forEach(e => {
        e.nextSibling.nextSibling.nodeValue = e.nextSibling.nextSibling.nodeValue.replace(
          '達成率',
          '달성률'
        );
      });
    document
      .querySelectorAll(
        'form[action="https://maimai-net.com/maimai-mobile/playLog/detail/"] button.a_link'
      )
      .forEach(e => {
        e.innerText = '상세 정보';
      });
  } else if (location.href.match(/.*\/music.*$/)) {
    const genreBtn = document.querySelector('button[name="genreBtn"]');
    genreBtn.childNodes[0].remove();
    genreBtn.innerText = '장르';
    genreBtn.style.color = 'white';
    genreBtn.style.fontSize = '1.2em';
    genreBtn.style.fontWeight = 'bold';
    genreBtn.style.background =
      'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
    genreBtn.style.borderRadius = '5px';
    genreBtn.style.padding = '0.7rem 0';

    const levelBtn = document.querySelector('button[name="levelBtn"]');
    levelBtn.childNodes[0].remove();
    levelBtn.innerText = '레벨';
    levelBtn.style.color = 'white';
    levelBtn.style.fontSize = '1.2em';
    levelBtn.style.fontWeight = 'bold';
    levelBtn.style.background = 'rgb(100, 100, 100)';
    levelBtn.style.borderRadius = '5px';
    levelBtn.style.padding = '0.7rem 0';

    genreBtn.parentNode.style.marginBottom = '0.5rem';

    const wordBtn = document.querySelector('button[name="wordBtn"]');
    wordBtn.childNodes[0].remove();
    wordBtn.innerText = '아이우에오';
    wordBtn.style.color = 'white';
    wordBtn.style.fontSize = '1.2em';
    wordBtn.style.fontWeight = 'bold';
    wordBtn.style.background = 'rgb(100, 100, 100)';
    wordBtn.style.borderRadius = '5px';
    wordBtn.style.padding = '0.7rem 0';

    const versionBtn = document.querySelector('button[name="versionBtn"]');
    versionBtn.childNodes[0].remove();
    versionBtn.innerText = '버전';
    versionBtn.style.color = 'white';
    versionBtn.style.fontSize = '1.2em';
    versionBtn.style.fontWeight = 'bold';
    versionBtn.style.background = 'rgb(100, 100, 100)';
    versionBtn.style.borderRadius = '5px';
    versionBtn.style.padding = '0.7rem 0';

    genreBtn.addEventListener('click', function() {
      genreBtn.style.background =
        'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
      levelBtn.style.background = 'rgb(100, 100, 100)';
      wordBtn.style.background = 'rgb(100, 100, 100)';
      versionBtn.style.background = 'rgb(100, 100, 100)';
    });

    levelBtn.addEventListener('click', function() {
      genreBtn.style.background = 'rgb(100, 100, 100)';
      levelBtn.style.background =
        'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
      wordBtn.style.background = 'rgb(100, 100, 100)';
      versionBtn.style.background = 'rgb(100, 100, 100)';
    });

    wordBtn.addEventListener('click', function() {
      genreBtn.style.background = 'rgb(100, 100, 100)';
      levelBtn.style.background = 'rgb(100, 100, 100)';
      wordBtn.style.background =
        'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
      versionBtn.style.background = 'rgb(100, 100, 100)';
    });

    versionBtn.addEventListener('click', function() {
      genreBtn.style.background = 'rgb(100, 100, 100)';
      levelBtn.style.background = 'rgb(100, 100, 100)';
      wordBtn.style.background = 'rgb(100, 100, 100)';
      versionBtn.style.background =
        'linear-gradient(-20deg, #fc6076 0%, #ff9a44 100%)';
    });
  } else if (location.href.match(/.*\/collection.*$/)) {
    if (location.href.match(/.*\/collection\/$/)) {
      document.querySelector('div.status5 div.text_box').innerText =
        '※ 특별한 조건이 있는 콜렉션은, 획득했을 때에 표시됩니다.';
    } else if (
      location.href.match(/.*\/collection\/(icon|trophy|namePlate|frame)\/?$/)
    ) {
      document.querySelector('div.status5 div.text_box').innerText =
        '※ 특별한 조건이 있는 콜렉션은, 획득했을 때에 표시됩니다.\n※ 서버의 통신상황 등에 의해 설정한 컬렉션이 올바르게 반영되지 않을 수 있습니다.';

      let category = '';
      if (location.href.match(/.*\/collection\/icon\/?$/)) {
        category = '아이콘';
      } else if (location.href.match(/.*\/collection\/trophy\/?$/)) {
        category = '칭호';
      } else if (location.href.match(/.*\/collection\/namePlate\/?$/)) {
        category = '이름표';
      } else if (location.href.match(/.*\/collection\/frame\/?$/)) {
        category = '프레임';
      }
      document.title = 'maimaiNET - ' + category + ' 컬렉션 -';

      const typeTranslation = {
        現在設定中のアイコン: '현재 설정중인 아이콘',
        現在設定中の称号: '현재 설정중인 칭호',
        現在設定中のネームプレート: '현재 설정중인 이름표',
        現在設定中のフレーム: '현재 설정중인 프레임',
        デフォルト: '기본 ' + category,
        ランダムSET: '랜덤 ' + category,
        maimaiオリジナル: 'maimai 오리지널',
        スペシャル: '스페셜',
        'POPS ＆ アニメ': 'POPS & 애니메이션',
        'niconico ＆ ボーカロイド™': 'niconico & 보컬로이드',
        東方Project: '동방프로젝트',
        'ゲーム ＆ バラエティ': '게임 & 버라이어티',
        'オリジナル & ジョイポリス': '오리지널 & 조이폴리스',
        実績: '실적'
      };

      document
        .querySelectorAll('div.status5 div.text_c span.name')
        .forEach(e => {
          e.innerText = typeTranslation[e.innerText] || e.innerText;
        });

      document.querySelectorAll('#accordion ul.list').forEach(e => {
        let img;
        if ((img = e.querySelector('li:nth-child(1) img'))) {
          img.nextSibling.nodeValue = img.nextSibling.nodeValue.replace(
            'で交換',
            '와 교환'
          );
        }
      });
    }
  }

  const translation = {
    all: {
      'body > div.footer > a:nth-of-type(1)': '이용약관',
      'body > div.footer > a:nth-of-type(2)': '이용권에 대하여',
      'body > div.footer > a:nth-of-type(3)': '동작 확인 환경',
      'body > div.footer > a:nth-of-type(4)': '문의',
      'body > div.footer > a:nth-of-type(5)': '로그아웃'
    },
    home: {
      'div.status_you div.status_riyouken font:nth-of-type(1)': '이용권',
      'div.status_you div.status_riyouken font:nth-of-type(2)': '이용기간',
      '#container > div > div > div.text_r > a': '더보기'
    },
    playerData: {
      'div.status_you > p': '플레이어 데이터',
      'div.status_you table tr:nth-of-type(1) td:nth-child(3)': '플레이 횟수',
      'div.status_you table tr:nth-of-type(11) td:first-child':
        'VS 모드 승리 횟수',
      'div.status_you table tr:nth-of-type(12) td:first-child':
        'SYNC 모드 플레이 횟수',
      'div.status_you table tr:nth-of-type(13) td:first-child':
        'SYNC 모드 도와준 수',
      'div.status5 > p': '난이도별 플레이어 데이터'
    },
    movie: {
      'div.status:nth-of-type(1) div.text_c':
        '니코니코 동영상에 업로드할 수 있는 동영상은\n하루에 최대 5개입니다.',
      'div.status:nth-of-type(2) div.text_c':
        '※업로드된 동영상은, 다음과 같은 경우 자동으로 삭제됩니다.',
      'div.status:nth-of-type(2) font b':
        '・투고한 다음날을 1일째로 세어 90일째 까지 100 재생에 이르지 못하는 경우',
      '#tab > div:nth-child(1) > a': '저장한 동영상',
      '#tab > div:nth-child(2) > a': '업로드한 동영상',
      'div.text_c div:nth-child(9) div:nth-child(1)':
        '니코니코 동영상에 업로드',
      'div.text_c div:nth-child(9) div:nth-child(3) font':
        '・maimaiNET에 업로드한 동영상은 니코니코 동영상에 업로드할 수 있습니다.\n・아래의 링크에서, 자신의 니코니코 동영상 ID와 패스워드를 입력하고, 연동해주시기 바랍니다.'
    },
    playLog: {
      'div > p.text_c': '플레이 기록'
    },
    music: {
      'div > p.text_c': '모든 곡 점수',
      'select[name="genre"] option[value="99"]': '모든 장르',
      'select[name="genre"] option[value="0"]': 'POPS & 애니메이션',
      'select[name="genre"] option[value="1"]': 'niconico & 보컬로이드',
      'select[name="genre"] option[value="2"]': '동방프로젝트',
      'select[name="genre"] option[value="4"]': '게임 & 버라이어티',
      'select[name="genre"] option[value="5"]': '오리지널 & 조이폴리스',
      'select[name="word"] option[value="1"]': '아이우에오',
      'select[name="word"] option[value="2"]': '카키쿠케코(가기구게고)',
      'select[name="word"] option[value="3"]': '사시즈세소(자지즈제조)',
      'select[name="word"] option[value="4"]': '타치츠테토(다데도)',
      'select[name="word"] option[value="5"]': '나니누네노',
      'select[name="word"] option[value="6"]':
        '하히후헤호(바비부베보,파피푸페포)',
      'select[name="word"] option[value="7"]': '마미무메모',
      'select[name="word"] option[value="8"]': '야유요',
      'select[name="word"] option[value="9"]': '라리루레로',
      'select[name="word"] option[value="10"]': '와오응'
    },
    collection: {
      'div > p.text_c': '컬렉션 목록',
      'span.icon_music': '곡',
      'span.icon_icon': '아이콘',
      'span.icon_title': '칭호',
      'span.icon_name_plate': '이름표',
      'span.icon_Frame': '프레임',
      'span.icon_slide': '슬라이드 효과음',
      'span.icon_break': '브레이크 효과음'
    },
    ranking: {
      'div > p.text_c': '랭킹'
    }
  };

  for (let url in translation) {
    if (
      url == 'all' ||
      location.href.match(/(\/[^?]+).*/)[1].match(new RegExp(`.*/${url}.*$`))
    ) {
      for (let key in translation[url]) {
        document.querySelectorAll(key).forEach(e => {
          e.innerText = translation[url][key];
        });
      }
    }
  }

  document.querySelector('a[href="javascript:history.back();"]').innerText =
    '뒤로가기';
})();
