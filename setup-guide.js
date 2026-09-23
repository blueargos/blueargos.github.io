// "설정 방법" 안내 페이지 전용 다국어(ko/en) 전환.
//
// script.js(index.html 전용)와 같은 data-i18n / data-i18n-attr 메커니즘을
// 그대로 쓰지만, 이 페이지의 사전은 이 파일 안에 따로 둔다 — index.html의
// 히어로 데모 등 이 페이지에 없는 요소를 건드릴 이유가 없어 script.js를
// 그대로 불러오지 않는다. STORAGE_KEY는 script.js와 동일하게 맞춰,
// index.html에서 고른 언어가 이 페이지에도 그대로 이어지게 한다.
(function () {
  var STORAGE_KEY = "blueargos-lang";

  var I18N = {
    ko: {
      "meta.title": "설정 방법 — BlueArgos",
      "meta.description": "화면 중앙을 터치해 여는 설정 메뉴와 각 항목이 무엇을 조정하는지, 실제 앱 화면 그대로 안내합니다.",
      "nav.ariaLabel": "주요 섹션",
      "nav.principles": "차별점",
      "nav.how": "동작 방식",
      "nav.setupGuide": "설정 방법",
      "nav.autoLaunch": "자동 실행/종료 설정법",
      "nav.releases": "업데이트 내역",
      "nav.privacy": "개인정보 처리방침",
      "nav.privacyHref": "privacy.html",
      "head.h1": "설정 방법",
      "head.p": "화면 중앙을 한 번 터치하면 메뉴가 열리고, 거기서 “설정”을 선택하면 아래 화면처럼 세부 항목을 조절할 수 있습니다. 아래 화면은 전부 실제 앱을 그대로 캡처한 것입니다.",
      "step1.h3": "1. 화면 중앙 터치하기",
      "step1.p": "평상시 화면 중앙에는 은은하게 숨 쉬는 파란 원, 블루 링이 떠 있습니다. 이 부근을 한 번 터치하면 메뉴가 열립니다. 경고 표지가 점멸 중일 때는 안전을 위해 터치해도 메뉴가 열리지 않습니다.",
      "step1.imgAlt": "화면 중앙에 블루 링이 떠 있는 평상시 화면",
      "step2.h3": "2. 메뉴에서 “설정” 선택하기",
      "step2.p": "터치하면 아래 네 가지 메뉴가 뜹니다.",
      "step2.imgAlt": "화면 중앙 터치로 열린 메뉴",
      "menu.settings.label": "설정",
      "menu.settings.desc": "3단계에서 설명하는 세부 조정 화면을 엽니다.",
      "menu.guide.label": "소개 및 사용법",
      "menu.guide.desc": "바로 지금 보고 있는 이 웹사이트를 브라우저로 엽니다.",
      "menu.info.label": "앱 정보",
      "menu.info.desc": "앱 버전, 카메라 데이터 갱신 일자, 릴리즈 노트 링크 등을 보여줍니다.",
      "menu.exit.label": "종료",
      "menu.exit.desc": "앱을 완전히 끕니다.",
      "step3.h3": "3. “설정” 화면 살펴보기",
      "step3.p": "위에서 아래 순서로 아래와 같은 항목들이 있습니다. 화면을 아래로 스크롤하면 더 많은 항목이 나옵니다.",
      "step3.imgAlt1": "설정 화면 위쪽",
      "step3.imgAlt2": "설정 화면을 아래로 스크롤한 모습",
      "item.leadTime.label": "리드타임",
      "item.leadTime.desc": "카메라를 몇 초 전에 미리 알려줄지 정합니다(10~20초). 고속도로 기준으로는 그 초에 해당하는 거리 앞부터 안내가 시작됩니다.",
      "item.speedDisplay.label": "현재 속도 표시",
      "item.speedDisplay.desc": "블루 링 안쪽에 현재 속도를 표시합니다.",
      "item.voice.label": "음성 안내",
      "item.voice.desc": "아래 9개 세부 항목을 한 번에 켜고 끄는 상위 스위치입니다. 끄면 세부 항목은 회색으로 비활성화되지만 목록에서 사라지지는 않습니다.",
      "item.forceSpeaker.label": "블루투스 연결시에도 핸드폰으로 소리 출력",
      "item.forceSpeaker.desc": "차량과 블루투스로 연결돼 있어도 경고 음성을 휴대폰 스피커로 내보냅니다.",
      "item.volumeMode.label": "볼륨 모드",
      "item.volumeMode.desc": "시스템 볼륨을 그대로 따를지, 아래 슬라이더로 직접 정할지 선택합니다.",
      "item.appVolume.label": "앱 음량(미디어 볼륨 기준 비율)",
      "item.appVolume.desc": "볼륨 모드가 “직접 설정”일 때만 동작하는 슬라이더입니다(0~100%).",
      "item.duck.label": "다른 앱 소리 일시 감쇠",
      "item.duck.desc": "경고 음성이 나가는 동안 음악 등 다른 앱 소리를 잠시 줄입니다.",
      "item.base.label": "기본 동작",
      "item.base.desc": "데이터 업데이트·구간 단속·오류 신고 등, 아래 항목에 해당하지 않는 모든 음성 안내입니다.",
      "item.approach.label": "과속 사전 알림",
      "item.approach.desc": "카메라에 접근할 때 속도를 줄이라고 알려줍니다(최초 안내·반복 안내·다시 과속했을 때의 즉시 안내).",
      "item.overspeedResult.label": "과속 통과 안내",
      "item.overspeedResult.desc": "과속한 채로 통과했을 때 초과한 속도를 알려줍니다.",
      "item.compliant.label": "감속 후 정상 통과",
      "item.compliant.desc": "경고를 받고 속도를 줄여 과속 없이 통과했을 때 알려줍니다.",
      "item.gpsVoice.label": "GPS 신호 강도 음성 안내",
      "item.gpsVoice.desc": "GPS 신호가 약해지거나 복구됐을 때 음성으로 알려줍니다(화면 표시는 이 설정과 무관하게 계속 나타납니다).",
      "item.compass.label": "방위 표시",
      "item.compass.desc": "화면 가장자리에 N/S가 나침반처럼 표시됩니다.",
      "item.flash.label": "경고 화면 점멸",
      "item.flash.desc": "광과민성 반응이 있다면 꺼주세요 — 끄면 경고 배경이 검정으로 고정됩니다.",
      "item.verdictDuration.label": "과속 통과 결과 표시 시간",
      "item.verdictDuration.desc": "5~20초 사이에서 조절합니다. 비과속 통과 표시는 3초로 고정돼 있어 조정할 수 없습니다.",
      "item.autoSync.label": "카메라 데이터 자동 업데이트",
      "item.autoSync.desc": "정차 중이거나 앱을 막 켰을 때만 자동으로 받습니다(약 3MB, 반기 갱신).",
      "item.autoStop.label": "알림 중지 후 자동 종료 시간",
      "item.autoStop.desc": "3~10분 사이로 조절합니다. 앱이 백그라운드로 전환된 뒤 이 시간이 지나면 모든 기능을 정지합니다. 음성 안내를 꺼둔 경우에도 이 항목은 그대로 적용됩니다.",
      "footer.copy": "© BlueArgos · 계정도, 광고도, 추적도 없습니다 · <a href=\"privacy.html\">개인정보 처리방침</a>"
    },
    en: {
      "meta.title": "Setup Guide — BlueArgos",
      "meta.description": "A guide to the settings menu you open by tapping the center of the screen, and what each item controls — shown with real screenshots from the app.",
      "nav.ariaLabel": "Main sections",
      "nav.principles": "Differentiators",
      "nav.how": "How it works",
      "nav.setupGuide": "Setup Guide",
      "nav.autoLaunch": "Auto-Launch Setup",
      "nav.releases": "Update History",
      "nav.privacy": "Privacy Policy",
      "nav.privacyHref": "privacy-en.html",
      "head.h1": "Setup Guide",
      "head.p": "Tap the center of the screen once to open a menu, then choose “Settings” to adjust the options shown below. Every screen below is a real capture from the app itself.",
      "step1.h3": "1. Tap the center of the screen",
      "step1.p": "During normal driving, a softly pulsing blue circle — the Blue Ring — sits at the center of the screen. Tap near it once to open the menu. While a warning sign is flashing, tapping is disabled for safety and won’t open the menu.",
      "step1.imgAlt": "The normal driving screen with the Blue Ring at its center",
      "step2.h3": "2. Choose “Settings” from the menu",
      "step2.p": "Tapping opens the four menu options below.",
      "step2.imgAlt": "The menu opened by tapping the center of the screen",
      "menu.settings.label": "Settings",
      "menu.settings.desc": "Opens the detailed settings screen covered in step 3.",
      "menu.guide.label": "About & how to use",
      "menu.guide.desc": "Opens this very website in your browser.",
      "menu.info.label": "App info",
      "menu.info.desc": "Shows the app version, camera data update date, a link to release notes, and more.",
      "menu.exit.label": "Exit",
      "menu.exit.desc": "Fully quits the app.",
      "step3.h3": "3. Inside the Settings screen",
      "step3.p": "The items appear top to bottom as below. Scroll down for more.",
      "step3.imgAlt1": "Top of the Settings screen",
      "step3.imgAlt2": "The Settings screen scrolled further down",
      "item.leadTime.label": "Lead time",
      "item.leadTime.desc": "How many seconds ahead of a camera you’re warned (10–20s). On highways that corresponds to roughly that many seconds’ driving distance of advance warning.",
      "item.speedDisplay.label": "Current speed display",
      "item.speedDisplay.desc": "Shows your current speed inside the Blue Ring.",
      "item.voice.label": "Voice guidance",
      "item.voice.desc": "The master switch for the 9 sub-items below. Turning it off grays them out (but doesn’t hide them from the list).",
      "item.forceSpeaker.label": "Always play through phone speaker",
      "item.forceSpeaker.desc": "Plays the warning voice from the phone speaker even when connected to the car by Bluetooth.",
      "item.volumeMode.label": "Volume mode",
      "item.volumeMode.desc": "Choose whether to follow the system volume or set it yourself with the slider below.",
      "item.appVolume.label": "App volume (relative to media volume)",
      "item.appVolume.desc": "A slider (0–100%) that only takes effect when volume mode is set to Custom.",
      "item.duck.label": "Duck other app audio",
      "item.duck.desc": "Temporarily lowers other apps’ audio (like music) while a warning voice plays.",
      "item.base.label": "Basic announcements",
      "item.base.desc": "All voice guidance not covered by the items below — data updates, average-speed zones, error reports, and so on.",
      "item.approach.label": "Speed warning ahead",
      "item.approach.desc": "Tells you to slow down as you approach a camera (first alert, repeats, and an immediate re-warning if you speed up again).",
      "item.overspeedResult.label": "Overspeed result",
      "item.overspeedResult.desc": "Announces how far over the limit you were when you passed.",
      "item.compliant.label": "Clean pass after slowing",
      "item.compliant.desc": "Announces when you slowed down after a warning and passed without speeding.",
      "item.gpsVoice.label": "GPS signal strength voice",
      "item.gpsVoice.desc": "Announces when GPS signal weakens or recovers (the on-screen indicator still shows regardless of this setting).",
      "item.compass.label": "Compass display",
      "item.compass.desc": "Shows N/S like a compass at the screen edges.",
      "item.flash.label": "Warning screen flash",
      "item.flash.desc": "Turn off if you have photosensitivity — the warning background stays fixed black when off.",
      "item.verdictDuration.label": "Overspeed result display time",
      "item.verdictDuration.desc": "Adjustable from 5–20 seconds. Compliant-pass display is fixed at 3 seconds and can’t be changed.",
      "item.autoSync.label": "Auto-update camera data",
      "item.autoSync.desc": "Downloads automatically only while stopped or right after launch (about 3MB, updated roughly twice a year).",
      "item.autoStop.label": "Auto-stop time after alerts idle",
      "item.autoStop.desc": "Adjustable from 3–10 minutes. After the app goes to the background, all functionality stops once this time has passed — this applies even when Voice guidance is off.",
      "footer.copy": "© BlueArgos · No account, no ads, no tracking · <a href=\"privacy-en.html\">Privacy Policy</a>"
    }
  };

  function currentLang() {
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "ko" || saved === "en") return saved;
    } catch (e) {
      // localStorage 접근 불가(프라이빗 모드 등) — 기본값(ko)로 폴백.
    }
    return "ko";
  }

  function applyLang(lang) {
    var dict = I18N[lang] || I18N.ko;
    document.documentElement.lang = lang;

    var i18nEls = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < i18nEls.length; i++) {
      var key = i18nEls[i].getAttribute("data-i18n");
      if (dict[key] != null) i18nEls[i].innerHTML = dict[key];
    }

    var attrEls = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrEls.length; j++) {
      var spec = attrEls[j].getAttribute("data-i18n-attr").split(":");
      if (dict[spec[1]] != null) attrEls[j].setAttribute(spec[0], dict[spec[1]]);
    }

    var toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) {
      toggle.textContent = lang === "ko" ? "EN" : "KO";
      toggle.setAttribute("aria-label", lang === "ko" ? "Switch to English" : "한국어로 전환");
    }
  }

  function setLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // 저장 실패해도 이번 세션 표시는 그대로 진행한다.
    }
    applyLang(lang);
  }

  var toggleBtn = document.querySelector("[data-lang-toggle]");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      setLang(currentLang() === "ko" ? "en" : "ko");
    });
  }

  applyLang(currentLang());
})();
