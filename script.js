// BlueArgos landing page — 스크롤 등장 효과만 담당하는 최소 스크립트. 외부 의존성 없음.
(function () {
  var revealTargets = document.querySelectorAll(".card, .steps li, .ring-section-text, .ring-section-visual");
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  revealTargets.forEach(function (el) {
    observer.observe(el);
  });
})();

// ---------------------------------------------------------------------
// 다국어(ko/en) 전환.
//
// data-i18n="key"인 요소는 innerHTML을, data-i18n-attr="속성:key"인 요소는
// 그 속성값을 사전(I18N)의 문구로 바꿔 끼운다. 콘텐츠는 전부 이 파일이
// 직접 쓴 신뢰된 정적 문구라 innerHTML 대입도 안전하다(외부/사용자 입력
// 없음). 고른 언어는 localStorage에 저장해 재방문 시 그대로 유지된다.
(function () {
  var STORAGE_KEY = "blueargos-lang";

  var I18N = {
    ko: {
      "meta.title": "BlueArgos — 깨끗한 과속카메라 알림",
      "meta.description": "개인정보 입력 없이, 광고 없이, 데이터 통신과 배터리 사용을 최소화한 깨끗한 과속 단속 카메라 알림 앱 BlueArgos.",
      "meta.ogDescription": "개인정보 없이, 광고 없이, 배터리도 아끼며 조용히 지켜보는 과속카메라 알림 앱.",
      "nav.ariaLabel": "주요 섹션",
      "nav.principles": "차별점",
      "nav.how": "동작 방식",
      "nav.autoLaunch": "자동 실행/종료 설정법",
      "nav.releases": "업데이트 내역",
      "nav.privacy": "개인정보 처리방침",
      "nav.privacyHref": "privacy.html",
      "hero.eyebrow": "경로 설정 없음 · 개인정보 필요 없음 · 시간 기반 사전 알림 · 통신·배터리 사용 최소화 · 광고 없음",
      "hero.h1": "깨끗하고 편리한<br class=\"br-mobile\" /> 과속카메라 알림",
      "hero.lead": "BlueArgos는 불안하게 개인 정보나 차량 정보를 요구하지 않습니다. 경로 설정도 필요 없습니다. 설치 후 실행만 하면 됩니다. 실행 중 데이터를 전혀 사용하지 않고 최소한의 배터리로 동작합니다. 그러면서도 <strong>BlueArgos만의 특허 기술</strong>로 편리함을 제공합니다.",
      "hero.badge2": "테스터 모집 중",
      "promise.h2": "BlueArgos는 다릅니다.",
      "card1.h3": "경로 설정 없음",
      "card1.p": "어디로 가는지 몰라도 됩니다. 목적지나 경로를 입력하지 않아도, 지금 달리는 길 위의 카메라를 그때그때 알려줍니다.",
      "card2.h3": "개인정보 입력 없음",
      "card2.p": "회원가입, 로그인, 차량 정보 입력도 필요 없습니다. App을 설치하고 바로 사용하면 됩니다. Android의 루틴, iOS의 자동화 기능을 사용하면 차량 탑승 시 자동 실행, 하차 시 자동 종료됩니다.",
      "card3.h3": "시간 기반 사전 경고",
      "card3.p": "모든 내비게이션은 거리를 기준으로 사전 경고하지만, BlueArgos는 현재 속도를 기준으로 모든 카메라를 동일하게 15초 전에 알려줍니다. (설정 가능)",
      "card4.h3": "데이터 사용 없음",
      "card4.p": "2주 혹은 한 달에 한 번 3MB 정도 데이터를 다운로드하여 계속 사용합니다. 차량 운행 시 데이터 통신을 하지 않습니다.",
      "card5.h3": "배터리 최소화",
      "card5.p": "저속 구간에서는 위치 확인 주기를 늘리고, 실제로 필요한 순간에만 정밀 추적으로 전환합니다. 화면 배경도 검은색이라 디스플레이 전력 소모까지 줄입니다.",
      "card6.h3": "광고 없음",
      "card6.p": "보기 민망한 광고, 게임 광고 같은 건 없습니다. 한 번 저렴한 가격으로 구매하면 평생 자동 업데이트됩니다.",
      "how.h2": "동작 방식",
      "how.p": "과속카메라가 가까워질 때만 목소리를 냅니다. 나머지는 조용합니다.",
      "step1.h3": "AI 기반 카메라 DB 전처리",
      "step1.p": "공개된 카메라 DB에는 누락된 정보가 많습니다. BlueArgos는 서버에서 AI가 지도와 함께 분석해 누락된 정보를 찾아 추가합니다. (특허 출원 중)",
      "step1.newlyAdded": "신규 추가",
      "step2.h3": "감속 필요 시, 시간 기반 사전 경고",
      "step2.p": "정속 주행 시에는 불필요한 알림음이 없습니다. 전방에 카메라가 있고 과속하여 감속이 필요할 경우에만 화면과 음성으로 알려줍니다. 그리고 항상 동일하게 15초 전에 알려줍니다. (설정 변경 가능) 어떤 도로든 어떤 속도든 동일한 시간 전에 알려주기 때문에 편리합니다.",
      "step2.caption": "15초 뒤 60km 단속 카메라가 있습니다.",
      "step3.h3": "실시간 대상 카메라 선별",
      "step3.p": "경로 설정 없이도 BlueArgos만의 특허 기술로 전방의 많은 카메라들 중 경고 대상 카메라를 실시간으로 판단합니다.",
      "step3.caption": "속도를 60km로 줄이세요",
      "step4.h3": "과속 통과 안내",
      "step4.p": "과속했는지 여부를 카메라 통과 후 알려주기 때문에 더 이상 불안해하지 않아도 됩니다.",
      "step4.caption": "20km/h 과속했습니다.",
      "step5.h3": "자동 보정 업데이트",
      "step5.p": "잘못됐거나 오래된 카메라 정보를 발견하면, 정기 갱신 주기(평균 2주, 최대 한 달) 안에 자동으로 바로잡혀 다음 업데이트에 반영됩니다. 사용자가 따로 신고하거나 손볼 일은 없습니다.",
      "step5.updated": "업데이트됨",
      "ring.h2": "블루 링",
      "ring.p1": "평소 화면 중앙에는 은은하게 숨 쉬는 파란 원, <strong>블루 링</strong>이 켜져 있습니다. 전방에 알릴 카메라가 없다는 뜻이자, 앱이 조용히 정상 동작 중이라는 신호입니다.",
      "ring.p2": "꼭 필요할 때만 확실한 화면과 음성으로 안전한 운행을 도와드립니다.",
      "footer.note": "과속카메라 위치 데이터 출처: 경찰청 · 공공데이터포털(data.go.kr), 공공누리 제1유형(출처표시).",
      "footer.copy": "© BlueArgos · 계정도, 광고도, 추적도 없습니다 · <a href=\"privacy.html\">개인정보 처리방침</a>"
    },
    en: {
      "meta.title": "BlueArgos — Clean Speed Camera Alerts",
      "meta.description": "BlueArgos: a clean speed camera alert app with no personal data entry, no ads, and minimal data & battery use.",
      "meta.ogDescription": "A speed camera alert app that watches quietly — no personal data, no ads, easy on the battery.",
      "nav.ariaLabel": "Main sections",
      "nav.principles": "Differentiators",
      "nav.how": "How it works",
      "nav.autoLaunch": "Auto-Launch Setup",
      "nav.releases": "Update History",
      "nav.privacy": "Privacy Policy",
      "nav.privacyHref": "privacy-en.html",
      "hero.eyebrow": "No route needed · No personal data required · Time-based early alerts · Minimal data & battery use · No ads",
      "hero.h1": "Clean, convenient<br class=\"br-mobile\" /> speed camera alerts",
      "hero.lead": "BlueArgos never makes you uneasy by asking for personal or vehicle information. You don't need to set a route, either — just install it and run it. While it's running, it uses no data at all and runs on minimal battery. Even so, <strong>BlueArgos's own patented technology</strong> still keeps it convenient.",
      "hero.badge2": "Recruiting testers",
      "promise.h2": "BlueArgos is different.",
      "card1.h3": "No route needed",
      "card1.p": "It doesn't need to know where you're going. Without a destination or route, it still tells you about cameras on the road you're driving, as you go.",
      "card2.h3": "No personal data required",
      "card2.p": "No sign-up, no login, no vehicle info to enter. Install the app and start using it right away. Pair it with Android Routines or iOS Automations to launch automatically when you get in the car and quit when you get out.",
      "card3.h3": "Time-based early warning",
      "card3.p": "Other navigation apps warn you based on distance, but BlueArgos treats every camera the same way — alerting you 15 seconds before you reach it, based on your current speed. (Configurable)",
      "card4.h3": "No data use",
      "card4.p": "It downloads about 3MB of data every two weeks to a month and keeps using that — no data communication at all while you're driving.",
      "card5.h3": "Minimal battery use",
      "card5.p": "At low speeds it checks your location less often, switching to precise tracking only when it's actually needed. The screen background is black too, which cuts display power use as well.",
      "card6.h3": "No ads",
      "card6.p": "No embarrassing ads, no game-style ads. Pay once at a low price and get automatic updates for life.",
      "how.h2": "How it works",
      "how.p": "It only speaks up when a speed camera is close. The rest of the time, it stays quiet.",
      "step1.h3": "AI-based camera DB preprocessing",
      "step1.p": "Public camera databases are often missing entries. BlueArgos's servers use AI to cross-analyze them against maps and add what's missing. (Patent pending)",
      "step1.newlyAdded": "Newly added",
      "step2.h3": "Time-based early warning, only when you need to slow down",
      "step2.p": "There's no unnecessary alert sound while you're driving at a steady speed. It only speaks up — with a screen alert and voice — when there's a camera ahead and you need to slow down, always exactly 15 seconds in advance (configurable). Because the lead time is the same on any road at any speed, it's easy to trust.",
      "step2.caption": "Speed camera (60 km/h) ahead in 15 seconds.",
      "step3.h3": "Real-time target camera selection",
      "step3.p": "With no route setup needed, BlueArgos's own patented technology judges in real time which of the many cameras ahead is the one to warn you about.",
      "step3.caption": "Slow down to 60 km/h.",
      "step4.h3": "Overspeed pass notice",
      "step4.p": "It tells you whether you were speeding only after you've passed the camera, so you don't have to worry about it while driving.",
      "step4.caption": "You were 20 km/h over the limit.",
      "step5.h3": "Automatic corrections",
      "step5.p": "When incorrect or outdated camera data is found, it's automatically corrected within the regular update cycle (about every 2 weeks, at most a month) and included in the next update. You never have to report or fix anything yourself.",
      "step5.updated": "Updated",
      "ring.h2": "Blue Ring",
      "ring.p1": "At the center of the screen, a softly breathing blue circle — the <strong>Blue Ring</strong> — stays lit. It means there's no camera ahead to warn you about, and that the app is quietly running as normal.",
      "ring.p2": "Only when it truly matters does it step in — with a clear screen alert and a clear voice — to help you drive safely.",
      "footer.note": "Speed camera location data source: Korea National Police Agency · Public Data Portal (data.go.kr), KOGL Type 1 (Attribution).",
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

    // 히어로 폰 데모(아래 IIFE)가 현재 재생 중인 단계의 캡션을 즉시
    // 다시 그리도록 알린다 — 다음 단계 경계까지 기다리지 않는다.
    if (typeof CustomEvent === "function") {
      window.dispatchEvent(new CustomEvent("blueargos:langchange", { detail: { lang: lang } }));
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

// ---------------------------------------------------------------------
// 히어로 폰 — 블루 링 데모 애니메이션.
//
// 실제 앱의 블루 링 상태 머신(no-mad-max/lib/features/driving/view/
// blue_ring_animation.dart)과 색상/문구(driving_visual_tuning.dart,
// speed_sign.dart, warning_view.dart)를 참고해 7단계 루프로 재현한다.
// "select" 단계(다수 카메라 중 대상 선별)는 전방에 여러 카메라가 있을 때
// 실제 앱이 하나만 화면 중앙까지 부르고 나머지는 후보로 두었다가 지우는
// 것(radar_markers_layer.dart의 primaryMarkerId/withinCorridorWidth,
// markerSecondaryGrowthCap·markerInnerRadiusFraction — UI_SPEC.md §2.2)을
// 옮긴 것이다. 실제 타이밍(예: expandDuration 8000ms, awaken 2500ms 등)은
// 이 앱 화면 전체가 아니라 짧은 홍보용 미리보기이므로 그대로 쓰지 않고,
// "가속할수록 링이 더 빨리 퍼진다"·"전방 마커가 뜨면 블루 링이 꺼진다"
// 같은 동작의 모양만 옮겨 디자인 피드백이 요청한 초 단위로 눌러 담았다.
(function () {
  var stage = document.querySelector("[data-ring-stage]");
  if (!stage) return;

  var ring = stage.querySelector("[data-ring]");
  var glow = stage.querySelector("[data-ring-glow]");
  var speedEl = stage.querySelector("[data-speed-value]");
  var signEl = stage.querySelector("[data-camera-sign]");
  var signTextEl = signEl && signEl.querySelector("[data-camera-sign-text]");
  var candidate11El = stage.querySelector("[data-candidate-11]");
  var candidate2El = stage.querySelector("[data-candidate-2]");
  var captionEl = document.querySelector("[data-phone-caption]");
  var flashEl = document.querySelector("[data-flash]");
  if (
    !ring || !glow || !speedEl || !signEl || !signTextEl ||
    !candidate11El || !candidate2El || !captionEl || !flashEl
  ) {
    return;
  }

  // 실제 색상 — driving_visual_tuning.dart 값을 그대로 옮김.
  var RING_BLUE = "#5ea8ff";
  var RING_RED = "#e8383f"; // blueRingColorMaxSpeed(속도 ≥110km/h)
  var SPEED_LOW = "#9aa0a8"; // speedReadoutColorLow(<30km/h)
  var SPEED_MID = "#f5f6f8"; // speedReadoutColorMid(<100km/h)
  var SPEED_HIGH = "#e8383f"; // speedReadoutColorHigh(≥100km/h)
  var SPEED_HIGH_THRESHOLD = 100; // 숫자·링 색이 레드로 "전환되기 시작"하는 속도
  var COLOR_FULL_RED_KMH = 110; // 숫자·링 둘 다 완전한 레드가 되는 속도 — 이 사이를 함께 lerp
  var FLASH_LIGHT = "#ffffff"; // warningBgLight
  var FLASH_DARK = "#000000"; // warningBgDark
  var VERDICT_BG = "#8e0f16"; // overspeedVerdictBg
  var FLASH_PERIOD_MS = 667; // flashPeriod(1.5Hz 사이클)
  var LIMIT_KMH = 100;
  var EXCESS_KMH = 20;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    speedEl.textContent = "5";
    speedEl.style.color = SPEED_LOW;
    captionEl.textContent =
      document.documentElement.lang === "en" ? "Low-speed driving screen" : "저속 주행 시 화면";
    return;
  }

  // 단계별 지속시간(ms) — 원래 디자인 피드백이 지정한 값(1. 펄스 2회,
  // 2. 6초 가속, 3. 4초 카메라 접근, 4. 4초 경고 점멸, 5. 4초 과속 결과,
  // 6. 3초 감속)에서, 2번부터 마지막까지는 사용자 요청으로 각 +3초씩
  // 늘렸다(1번 펄스는 그대로). "select"는 2026-09-15 피드백으로 새로
  // 추가된, 가속 직후·카메라 접근 직전 단계 — 처음엔 4초로 잡았는데
  // "구간이 너무 짧다"는 재요청(2026-09-16)으로 다른 단계들과 같은 폭
  // (+3초)만큼 늘렸다. warning은 "카메라가 실제로 말해줄 문구"(둘째 줄,
  // 따옴표+이탤릭)를 다 읽을 시간이 필요해 2026-09-16 하루에만 두 번
  // 재요청(각 +3초)이 들어와 총 +6초 늘렸다.
  var ORDER = ["pulse", "accel", "select", "approach", "warning", "overspeed", "decel"];
  var DURATIONS = {
    pulse: 1600 * 2,
    accel: 6000 + 3000,
    select: 4000 + 3000,
    approach: 4000 + 3000,
    warning: 4000 + 3000 + 3000 + 3000,
    overspeed: 4000 + 3000,
    decel: 3000 + 3000,
  };

  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeInOut(t) {
    t = clamp01(t);
    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
  }
  function easeOutCubic(t) {
    t = clamp01(t);
    var inv = 1 - t;
    return 1 - inv * inv * inv;
  }
  // 100~110km/h 구간에서 MID(흰색)→HIGH(빨강)로 서서히 섞는다 — 블루 링이
  // 같은 구간에서 블루→레드로 섞이는 것(ringColorRgbForSpeed)과 정확히
  // 같은 속도 범위를 공유해, 숫자와 링이 "함께" 빨개지는 것처럼 보이게
  // 한다. 100km/h에서 갑자기 순백→빨강으로 계단식 전환되던 것을 고쳤다.
  function speedColor(kmh) {
    if (kmh < 30) return SPEED_LOW;
    if (kmh >= COLOR_FULL_RED_KMH) return SPEED_HIGH;
    if (kmh < SPEED_HIGH_THRESHOLD) return SPEED_MID;
    var tt = (kmh - SPEED_HIGH_THRESHOLD) / (COLOR_FULL_RED_KMH - SPEED_HIGH_THRESHOLD);
    var rgb = lerpRgb(SPEED_MID_RGB, SPEED_HIGH_RGB, tt);
    return "rgb(" + Math.round(rgb.r) + "," + Math.round(rgb.g) + "," + Math.round(rgb.b) + ")";
  }

  function clampRange(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function hexToRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }
  var RING_BLUE_RGB = hexToRgb(RING_BLUE);
  var RING_RED_RGB = hexToRgb(RING_RED);
  var SPEED_MID_RGB = hexToRgb(SPEED_MID);
  var SPEED_HIGH_RGB = hexToRgb(SPEED_HIGH);

  // 링의 "호 길이"는 서로 다른 두 각도 마스크의 곱으로 정해진다(실제 앱
  // blue_ring_shape.dart의 `paintBlueRingShape`와 같은 방식) — 하나는 6시
  // 방향에 고정된 "C자" 개구부(ringOpacityForClockDeg, blue_ring_animation
  // .dart), 다른 하나는 진행 방향(12시) 기준 속도에 따라 좁아지는 "전방
  // 회랑"(corridor_angle.dart). 후자가 이번 요청의 핵심 — 가속할수록 12시
  // 쪽 밝은 호 자체가 좁아진다.

  // 6시(180°) 기준 고정 개구부 — ringGapHalfWidthDeg(7.5°)/ringFadeSpanDeg
  // (82.5°) 그대로, ease-out(1-t³) 곡선까지 원본과 동일하게 옮겼다.
  function baseShapeMask(deg) {
    var normalized = ((deg % 360) + 360) % 360;
    var wrapped = Math.abs(normalized - 180);
    if (wrapped <= 7.5) return 0;
    var fullyOpaqueAt = 90; // 7.5 + 82.5
    if (wrapped >= fullyOpaqueAt) return 1;
    var localT = (wrapped - 7.5) / 82.5;
    var tt = 1 - localT;
    return 1 - tt * tt * tt;
  }

  // 12시(0°) 기준 "전방 회랑" — innerHalf(본연색 반각)~outerHalf(완전
  // 투명 경계) 사이를 같은 ease-out(1-t³)으로 페이드한다
  // (blue_ring_shape.dart의 arcMaskForClockDeg). innerHalf가 null이면
  // idle(정지 펄스/감속 끝)이라 회랑 제한이 없다 — 전 구간 1.
  function corridorMask(deg, innerHalf, outerHalf) {
    if (innerHalf == null) return 1;
    var normalized = ((deg % 360) + 360) % 360;
    var d = normalized > 180 ? 360 - normalized : normalized;
    if (d <= innerHalf) return 1;
    if (d >= outerHalf) return 0;
    var tt = (d - innerHalf) / (outerHalf - innerHalf);
    return 1 - tt * tt * tt;
  }

  // corridor_angle.dart의 blueRingThetaBaseDeg/ringOuterHalfAngleDeg
  // (weight=1.0 기본값) 그대로 — 110km/h에서 최솟값(14°/30°)에 도달한다.
  function blueRingInnerHalfDeg(kmh) {
    return clampRange(70 - 0.56 * (kmh - 10), 14, 70);
  }
  function blueRingOuterHalfDeg(kmh) {
    return clampRange(110 - 0.8 * (kmh - 10), 30, 110);
  }

  var RING_GRADIENT_STEPS = 48;
  function ringGradient(rgb, innerHalf, outerHalf) {
    var stops = [];
    for (var i = 0; i <= RING_GRADIENT_STEPS; i++) {
      var deg = (i * 360) / RING_GRADIENT_STEPS;
      var alpha = baseShapeMask(deg) * corridorMask(deg, innerHalf, outerHalf);
      stops.push(
        "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + alpha.toFixed(3) + ") " +
          ((deg / 360) * 100).toFixed(3) + "%"
      );
    }
    return "conic-gradient(from 0deg, " + stops.join(", ") + ")";
  }

  function lerpRgb(a, b, tt) {
    return { r: lerp(a.r, b.r, tt), g: lerp(a.g, b.g, tt), b: lerp(a.b, b.b, tt) };
  }

  // 가속 중 링 색상 — speedColor()와 똑같은 구간(SPEED_HIGH_THRESHOLD=100
  // ~COLOR_FULL_RED_KMH=110km/h)에서 블루→레드로 서서히 섞는다. 숫자
  // 쪽(speedColor)도 같은 두 상수로 같은 구간에서 MID→HIGH를 섞으므로,
  // 숫자와 링이 항상 같은 속도에서 같은 정도로 빨개진다.
  function ringColorRgbForSpeed(kmh) {
    var tt = clamp01((kmh - SPEED_HIGH_THRESHOLD) / (COLOR_FULL_RED_KMH - SPEED_HIGH_THRESHOLD));
    return lerpRgb(RING_BLUE_RGB, RING_RED_RGB, tt);
  }

  function paintRing(rgb, scale, opacity, innerHalf, outerHalf) {
    var gradient = ringGradient(rgb, innerHalf, outerHalf);
    var t = "scale(" + scale.toFixed(4) + ")";
    ring.style.background = gradient;
    ring.style.transform = t;
    ring.style.opacity = opacity.toFixed(3);
    glow.style.background = gradient;
    glow.style.transform = t;
    glow.style.opacity = (opacity * 0.65).toFixed(3);
  }

  // 단계가 막 바뀐 직후 이 시간(ms) 동안, 직전 단계의 마지막 실제 프레임
  // (lastRingFrame)에서 이번 단계가 원하는 목표값으로 크로스페이드한다 —
  // 실제 앱의 modeBlendDuration/frameAtChange(펄스↔확산 전환 시 "껌벅임
  // 없이 smooth하게")와 같은 발상. 이게 없으면 예를 들어 펄스(scale~1,
  // opacity~0.86)에서 가속 웨이브 첫 프레임(scale 0.9, opacity 0)으로
  // 하드컷되어 링이 순간적으로 꺼졌다 다른 크기로 다시 나타나는 것처럼
  // 보였다(사용자가 "중심이 이동하는 것 같다"고 신고한 원인).
  var RING_BLEND_MS = 400;
  var ringBlendFrom = null; // {scale, opacity, rgb, inner, outer}
  var ringBlendStart = 0;
  var lastRingFrame = null; // 마지막으로 실제 화면에 그린(블렌드 반영 후) 프레임

  // innerHalf/outerHalf를 생략(undefined/null)하면 회랑 제한 없이 원래의
  // "C자" 전체 폭 그대로 그린다(정지 펄스·감속 끝 무렵) — 내부적으로는
  // 180(반원)을 "제한 없음"의 수치 대역값으로 써서 블렌드 보간이 항상
  // 숫자 대 숫자로 이뤄지게 한다.
  function setRing(now, scale, opacity, color, innerHalf, outerHalf) {
    // color는 보통 RING_BLUE/RING_RED 상수 문자열이지만, 가속 단계처럼
    // 블루→레드를 서서히 섞어야 할 때는 ringColorRgbForSpeed()가 만든
    // {r,g,b} 객체를 그대로 넘긴다.
    var rgb = typeof color === "object" ? color
      : color === RING_RED ? RING_RED_RGB : RING_BLUE_RGB;
    var inner = innerHalf == null ? 180 : innerHalf;
    var outer = outerHalf == null ? 180 : outerHalf;

    var paintScale = scale, paintOpacity = opacity, paintRgb = rgb,
        paintInner = inner, paintOuter = outer;
    if (ringBlendFrom) {
      var blendT = clamp01((now - ringBlendStart) / RING_BLEND_MS);
      if (blendT < 1) {
        var eased = easeInOut(blendT);
        paintScale = lerp(ringBlendFrom.scale, scale, eased);
        paintOpacity = lerp(ringBlendFrom.opacity, opacity, eased);
        paintRgb = lerpRgb(ringBlendFrom.rgb, rgb, eased);
        paintInner = lerp(ringBlendFrom.inner, inner, eased);
        paintOuter = lerp(ringBlendFrom.outer, outer, eased);
      } else {
        ringBlendFrom = null; // 블렌드 종료 — 이후엔 목표값 그대로
      }
    }

    paintRing(paintRgb, paintScale, paintOpacity, paintInner, paintOuter);
    lastRingFrame = {
      scale: paintScale, opacity: paintOpacity, rgb: paintRgb,
      inner: paintInner, outer: paintOuter,
    };
  }

  function setSign(opacity, scale, rise, overspeed) {
    signEl.style.opacity = opacity.toFixed(3);
    // translateY를 scale보다 먼저 적용해야(transform 함수는 뒤에서부터
    // 합성된다) 표지가 작을 때도 위로 치우친 이동량이 scale로 눌리지 않는다.
    signEl.style.transform =
      "translateY(" + rise.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
    signEl.classList.toggle("is-overspeed", !!overspeed);
    signTextEl.textContent = overspeed ? "+" + EXCESS_KMH : String(LIMIT_KMH);
  }

  function setFlash(color, opacity) {
    flashEl.style.backgroundColor = color;
    flashEl.style.opacity = opacity.toFixed(3);
  }

  // "select" 단계의 탈락 후보 마커(11시/2시) 위치 — 실제 앱처럼 화면
  // 시계 각도(12시=0°, 시계방향)로 배치한다(radar_markers_layer.dart의
  // bearingRadFor와 같은 발상). 대상으로 뽑히는 마커(12시)는 새 요소 없이
  // 기존 .camera-sign을 재사용하므로 여기엔 11시/2시만 있으면 된다.
  var CANDIDATE_RADIUS = 85;
  // 후보 마커가 성장하는 동안 아래로 흘러내리는 총 이동량(px, 2026-09-16
  // 재요청 "아래로 내려오며 커지다가 사라지게") — tick()의 select 분기에서
  // 진행률(0~1)을 곱해 매 프레임 dy에 더한다.
  var DOWNWARD_DRIFT = 46;
  function clockAngleRad(hour) {
    return ((hour % 12) * 30 * Math.PI) / 180;
  }
  var ANGLE_11 = clockAngleRad(11);
  var ANGLE_2 = clockAngleRad(2);
  var OFFSET_11 = {
    dx: CANDIDATE_RADIUS * Math.sin(ANGLE_11),
    dy: -CANDIDATE_RADIUS * Math.cos(ANGLE_11),
  };

  function setCandidate(el, opacity, scale, dx, dy) {
    el.style.opacity = opacity.toFixed(3);
    el.style.transform =
      "translate(" + dx.toFixed(1) + "px, " + dy.toFixed(1) + "px) scale(" + scale.toFixed(4) + ")";
  }

  function setSpeed(kmh) {
    speedEl.textContent = String(Math.round(kmh));
    speedEl.style.color = speedColor(kmh);
  }

  // "고속 확산" 웨이브의 현재 위상(0~1) — expandDurationForSpeed와 같은
  // 발상으로 속도가 빠를수록 주기를 짧게 잡되, 매 프레임 dt만큼 누적해
  // (모듈로 재계산이 아니라) 속도가 바뀌어도 위상이 순간이동하지 않게 한다.
  var expandPhase = 0;

  function expandPeriodMsForSpeed(kmh) {
    // 실제 expandDurationForSpeed(8000ms@3km/h → 900ms@130km/h, 중간을
    // 완만하게 누르는 지수 1.3)와 같은 모양을 6초짜리 데모 분량에 맞춰
    // 1400ms@5km/h → 380ms@120km/h로 축약했다.
    var rateT = Math.pow(clamp01((kmh - 5) / (120 - 5)), 1.3);
    return lerp(1400, 380, rateT);
  }

  function expandWaveFrame(accum) {
    var FADE_IN = 0.06;
    var SMALL_SCALE = 0.9;
    var MAX_SCALE = 1.55;
    var PEAK_OPACITY = 0.85;
    if (accum < FADE_IN) {
      return { scale: SMALL_SCALE, opacity: PEAK_OPACITY * easeInOut(accum / FADE_IN) };
    }
    var spreadT = (accum - FADE_IN) / (1 - FADE_IN);
    return {
      scale: lerp(SMALL_SCALE, MAX_SCALE, easeOutCubic(spreadT)),
      opacity: PEAK_OPACITY * (1 - spreadT),
    };
  }

  var phaseIndex = 0;
  var phaseStart = 0;
  var lastNow = 0;

  // 단계 설명 캡션(디자인 피드백이 지정한 문구 그대로, ko/en 두 세트) —
  // 감속 단계는 빈 문자열로 둬 .is-blank로 시각적으로만 지운다(applyCaption
  // 참고). 언어는 위 i18n IIFE가 document.documentElement.lang에 반영해둔
  // 값을 그대로 읽는다 — 상태를 따로 들지 않는다.
  //
  // warning 단계는 첫째 줄(단계 설명)과 둘째 줄("카메라가 실제로 말해줄
  // 문구")로 나뉘고, 둘째 줄만 따옴표로 감싸고 이탤릭체로 구분한다
  // (2026-09-16 재요청 — 원래 approach 둘째 줄에 있던 형식을 여기로
  // 옮겼다) — 그래서 이 값은 "\n" + <span class="phone-caption-quote">로
  // 감싼 둘째 줄로 이뤄진 HTML 문자열이다. 전부 이 파일이 직접 쓴 정적
  // 문구라 외부/사용자 입력이 섞일 일이 없어 innerHTML 대입도 안전하다
  // (아래 applyCaption, 위쪽 i18n 사전과 같은 전제).
  var PHASE_LABELS = {
    ko: {
      pulse: "저속 주행 시 화면",
      accel: "110km/h까지 가속 시 화면",
      select: "전방에 다수 카메라 출현 화면",
      approach: "실시간 경고 대상 카메라 선별",
      warning: '시간 기반 카메라 경고\n<span class="phone-caption-quote">"15초 뒤 시속 100km 카메라가 있습니다. 속도를 줄이세요."</span>',
      overspeed: "과속 통과 시 초과 속도 표시",
      decel: "",
    },
    en: {
      pulse: "Low-speed driving screen",
      accel: "Screen while accelerating to 110 km/h",
      select: "Screen when multiple cameras appear ahead",
      approach: "Selecting the target camera in real time",
      warning: 'Time-based camera warning\n<span class="phone-caption-quote">"Camera (100 km/h) ahead in 15 seconds. Slow down."</span>',
      overspeed: "Excess speed shown after passing",
      decel: "",
    },
  };

  function currentPhaseName() {
    return ORDER[phaseIndex];
  }

  function applyCaption(name) {
    var lang = document.documentElement.lang === "en" ? "en" : "ko";
    var label = PHASE_LABELS[lang][name];
    // 진짜 빈 문자열을 넣으면 <p>가 줄 상자를 잃어 블루 링 위치가
    // 위아래로 움찔거린다(감속 단계 진입/탈출 시 신고된 버그) — 항상
    // non-breaking space(U+00A0)로 줄 높이를 유지하고 .is-blank로만
    // 지운다.
    // .phone-caption\uC740 display:flex\uB77C \uC790\uC2DD \uAC01\uAC01\uC774 \uBCC4\uAC1C\uC758 flex item\uC774 \uB41C\uB2E4
    // (\uD14D\uC2A4\uD2B8 \uB178\uB4DC\uB3C4 \uC775\uBA85 flex item) \u2014 approach \uB2E8\uACC4\uCC98\uB7FC \uC77C\uBC18 \uD14D\uC2A4\uD2B8 \uB4A4\uC5D0
    // <span>\uC774 \uC774\uC5B4\uC9C0\uBA74 \uB450 flex item\uC774 \uAC00\uB85C\uB85C \uB098\uB780\uD788 \uBC30\uCE58\uB3FC(\uAE30\uBCF8
    // flex-wrap:nowrap) "\uB450 \uC904"\uC774 \uC544\uB2C8\uB77C "\uB450 \uCE78"\uC73C\uB85C \uAE68\uC9C4\uB2E4(\uBC1C\uACAC\uB41C \uBC84\uADF8,
    // \uC218\uC815). \uD56D\uC0C1 \uD558\uB098\uC758 \uB798\uD37C <span> \uC548\uC5D0 \uC804\uCCB4 \uB77C\uBCA8\uC744 \uB123\uC5B4 flex item\uC744
    // \uD558\uB098\uB85C \uACE0\uC815\uD558\uACE0, \uADF8 \uC548\uC5D0\uC11C \uC904\uBC14\uAFC8(white-space:pre-line \uC0C1\uC18D)\uACFC
    // \uAC00\uC6B4\uB370 \uC815\uB82C(text-align \uC0C1\uC18D)\uC774 \uC774\uB904\uC9C0\uAC8C \uD55C\uB2E4.
    captionEl.innerHTML = "<span>" + (label === "" ? "\u00A0" : label) + "</span>";
    captionEl.classList.toggle("is-blank", label === "");
  }

  // 언어가 바뀌면(상단 언어 토글) 다음 단계 경계까지 기다리지 않고 지금
  // 재생 중인 단계의 캡션을 바로 새 언어로 다시 그린다.
  window.addEventListener("blueargos:langchange", function () {
    applyCaption(currentPhaseName());
  });

  function enterPhase(name, now) {
    applyCaption(name);
    // 방금까지 실제로 그려지고 있던 링 프레임에서 다음 단계의 자연 곡선으로
    // 크로스페이드를 시작한다(setRing 주석 참고) — 최초 진입(아직 한 번도
    // 안 그려짐)에는 lastRingFrame이 없어 블렌드 없이 바로 목표값을 쓴다.
    if (lastRingFrame) {
      ringBlendFrom = lastRingFrame;
      ringBlendStart = now;
    }
    phaseStart = now;
  }

  function tick(now) {
    if (!lastNow) lastNow = now;
    var dt = now - lastNow;
    lastNow = now;

    var name = ORDER[phaseIndex];
    var elapsed = now - phaseStart;
    var duration = DURATIONS[name];
    var t = clamp01(elapsed / duration);

    if (name === "pulse") {
      // 1. 시속 5km 정지 펄스 — 기존 breathe보다 변동 폭을 훨씬 크게(±24%
      // 크기, 불투명도도 0.72~1) 잡아 "더 잘 보이게" 해달라는 요청을 반영.
      var wave = Math.sin(2 * Math.PI * t * 2);
      setRing(now, 1 + 0.24 * wave, 0.72 + 0.28 * ((wave + 1) / 2), RING_BLUE, null, null);
      setSign(0, 0.2, -24, false);
      setFlash(FLASH_DARK, 0);
      setSpeed(5);
      expandPhase = 0;
    } else if (name === "accel") {
      // 2. 5 → 110km/h 가속(6초) — 링은 "고속 확산" 웨이브로 전환되고,
      // 속도가 오를수록 웨이브 주기가 짧아진다(더 자주 퍼진다). 속도 숫자가
      // 레드로 바뀌는 100km/h부터 110km/h까지 링도 함께 블루→레드로 서서히
      // 바뀐다(ringColorRgbForSpeed 참고). 동시에 실제 앱의 전방 회랑
      // (corridor_angle.dart)처럼 밝은 호 자체도 속도가 빠를수록 좁아진다
      // (70°/110° 반각 → 110km/h에서 최소 14°/30°).
      var speed = lerp(5, 110, easeInOut(t));
      expandPhase = (expandPhase + dt / expandPeriodMsForSpeed(speed)) % 1;
      var frame = expandWaveFrame(expandPhase);
      setRing(
        now, frame.scale, frame.opacity, ringColorRgbForSpeed(speed),
        blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed)
      );
      setSign(0, 0.2, -24, false);
      setSpeed(speed);
    } else if (name === "select") {
      // 새 단계(2026-09-15 피드백) — 전방에 다수 카메라가 있을 때 그중
      // 하나(12시/북쪽)가 대상으로 선별되는 과정을 보여준다. 실제 앱의
      // 선정 기준(가장 가까우면서 전방 회랑 안인 카메라 하나만 원점까지
      // 다가오고, 나머지는 후보인 채로 가장자리에 머물다 사라짐 —
      // radar_markers_layer.dart의 primaryMarkerId/withinCorridorWidth,
      // markerSecondaryGrowthCap·markerInnerRadiusFraction, UI_SPEC.md
      // §2.2)를 단순화해 옮겼다: 12시 마커(대상)는 다음 approach 단계로
      // 그대로 이어지도록 조금씩만 자라나고, 11시/2시 마커(탈락 후보)는
      // 각자 다른 타이밍에 나타났다 사라진다.
      var speed = 110;
      expandPhase = (expandPhase + dt / expandPeriodMsForSpeed(speed)) % 1;
      var frame = expandWaveFrame(expandPhase);
      setRing(
        now, frame.scale, frame.opacity, ringColorRgbForSpeed(speed),
        blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed)
      );
      setFlash(FLASH_DARK, 0);
      setSpeed(speed);

      // 12시(북쪽) 대상 마커 — approach 단계의 시작 상태(scale 0.25 /
      // rise -26 / opacity 0.35)로 정확히 이어지도록 끝값을 맞춘다(아래
      // approach 분기의 시작 opacity도 0.35부터 시작하도록 함께 고쳤다 —
      // 안 그러면 단계 경계에서 마커가 순간적으로 커지거나 밝아져 보인다).
      // 시작 rise를 -50→-72로 낮춰(총 이동량 46px) 11시/2시 후보와 같은
      // DOWNWARD_DRIFT만큼 내려오게 했다 — "커지기만 하고 안 내려온다"는
      // 재요청(2026-09-17). 끝값(-26)은 그대로라 approach로의 연결은
      // 그대로 자연스럽다.
      var targetGrow = easeOutCubic(t);
      setSign(
        lerp(0, 0.35, targetGrow), lerp(0.05, 0.25, targetGrow),
        lerp(-26 - DOWNWARD_DRIFT, -26, targetGrow), false
      );

      // 11시 후보 — 작게 나타났다가, 대상이 자리 잡는 후반부에 사라진다.
      // 처음엔 0.35→0.55로만 커졌는데 "너무 작다"는 재요청(2026-09-16)으로
      // 0.85까지 눈에 띄게 커지도록 키웠다. 같은 재요청으로 커지는 동안
      // 아래로 흘러내리다 사라지는 움직임(DOWNWARD_DRIFT)도 더했다 —
      // 대상이 되지 못하고 화면 아래로 지나가 버리는 느낌.
      var c11In = easeOutCubic(clamp01(t / 0.15));
      var c11Out = easeInOut(clamp01((t - 0.55) / 0.3));
      var c11Drift = clamp01(t / 0.85);
      setCandidate(
        candidate11El, 0.55 * c11In * (1 - c11Out), lerp(0.35, 0.85, c11In),
        OFFSET_11.dx, OFFSET_11.dy + DOWNWARD_DRIFT * c11Drift
      );

      // 2시 후보 — 작고 반투명하게 나타나 살짝 다가오다(반경이 줄며 커짐)
      // 사라진다. 마찬가지로 최대 크기를 0.5→0.75로 키우고 아래로 흘러
      // 내리는 움직임을 더했다.
      var c2In = easeOutCubic(clamp01(t / 0.15));
      var c2Out = easeInOut(clamp01((t - 0.7) / 0.3));
      var c2Approach = easeInOut(clamp01(t / 0.85));
      var c2Radius = lerp(CANDIDATE_RADIUS, CANDIDATE_RADIUS * 0.78, c2Approach);
      var c2Scale = lerp(0.32, 0.75, c2Approach);
      setCandidate(
        candidate2El, 0.4 * c2In * (1 - c2Out), c2Scale,
        Math.sin(ANGLE_2) * c2Radius, -Math.cos(ANGLE_2) * c2Radius + DOWNWARD_DRIFT * c2Approach
      );
    } else if (name === "approach") {
      // 4. 전방 100km 카메라 접근 — 마커가 나타나면 블루 링은 꺼진다(원본
      // 주석: "전방 마커가 있으면 블루 링을 끔"). 표지가 전방(위)에서
      // 다가와 커지는 것처럼 작게+위로 치우친 채로 시작해 제자리·실물
      // 크기로 자란다. opacity는 0이 아니라 0.35에서 시작해 1로 자란다 —
      // 직전 select 단계에서 12시 마커가 이미 opacity 0.35까지 자란
      // 채로 끝나므로, 그 값을 그대로 이어받아야 단계 경계에서 마커가
      // 순간적으로 밝아지는 티가 나지 않는다.
      var speed = lerp(110, 116, t);
      expandPhase = (expandPhase + dt / expandPeriodMsForSpeed(speed)) % 1;
      var frame = expandWaveFrame(expandPhase);
      var ringOut = 1 - easeInOut(clamp01(t / 0.3));
      setRing(
        now, frame.scale, frame.opacity * ringOut, RING_RED,
        blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed)
      );
      var grow = easeOutCubic(t);
      setSign(lerp(0.35, 1, easeOutCubic(clamp01(t / 0.35))), lerp(0.25, 1, grow), lerp(-26, 0, grow), false);
      setFlash(FLASH_DARK, 0);
      setSpeed(speed);
    } else if (name === "warning") {
      // 5. 100km 카메라 경고 — 표지는 자리 잡고, 배경만 흰/검으로 점멸한다
      // (실제 flashPeriod 667ms = 1.5Hz 그대로). 캡션은 배경 점멸과 무관하게
      // 항상 고정된 검정 알약+흰 글자라(.phone-caption CSS) 여기선 손대지
      // 않는다.
      setSign(1, 1, 0, false);
      var isLight = (elapsed % FLASH_PERIOD_MS) / FLASH_PERIOD_MS < 0.5;
      setFlash(isLight ? FLASH_LIGHT : FLASH_DARK, isLight ? 0.92 : 0.85);
      setSpeed(lerp(116, 120, t));
    } else if (name === "overspeed") {
      // 6. 100km 제한 구간을 120km/h로 통과 — 20km/h 초과. 표지가
      // OverspeedSign(빨간 바탕·흰 테두리·"+20")으로 반전되고, 배경은
      // 검정↔짙은 빨강으로 점멸한다.
      setSign(1, 1, 0, true);
      var isDark = (elapsed % FLASH_PERIOD_MS) / FLASH_PERIOD_MS < 0.5;
      setFlash(isDark ? FLASH_DARK : VERDICT_BG, 0.9);
      setSpeed(120);
    } else if (name === "decel") {
      // 7. 결과 화면이 사라지고 120 → 5km/h로 감속, 블루 링이 다시 켜진다.
      // 속도가 떨어질수록 회랑도 다시 넓어져(14°/30° → 70°/110°) 링이
      // 정지 상태의 원래 폭으로 돌아온다.
      var speed = lerp(120, 5, easeOutCubic(t));
      var dissolve = easeInOut(clamp01(t / 0.25));
      setSign(1 - dissolve, lerp(1, 0.7, dissolve), 0, true);
      setFlash(FLASH_DARK, (1 - dissolve) * 0.4);
      var ringIn = easeInOut(clamp01((t - 0.15) / 0.4));
      setRing(now, lerp(0.9, 1, ringIn), ringIn, RING_BLUE, blueRingInnerHalfDeg(speed), blueRingOuterHalfDeg(speed));
      setSpeed(speed);
    }

    if (t >= 1) {
      phaseIndex = (phaseIndex + 1) % ORDER.length;
      enterPhase(ORDER[phaseIndex], now);
    }

    requestAnimationFrame(tick);
  }

  enterPhase(ORDER[0], performance.now());
  requestAnimationFrame(tick);
})();
