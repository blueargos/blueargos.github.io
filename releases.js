// 릴리즈 노트 페이지 — releases.json을 읽어 렌더링만 담당한다.
// 콘텐츠(ko/en 문구) 자체는 이 스크립트가 만들지 않는다 — no-mad-max
// 저장소의 tool/generate_release_notes.sh로 뽑은 커밋 로그를 근거로
// 사람이(오케스트레이터가) 매 릴리즈마다 releases.json에 항목을 추가한다.
(function () {
  var list = document.getElementById("release-list");

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // 플랫폼 공통 항목은 release.ko/release.en, Android 전용은 release.android
  // .ko/.en, iOS 전용은 release.ios.ko/.en에 둔다(둘 다 없는 옛 항목과
  // 완전히 호환 — label 없이 공통 항목만 그대로 렌더링된다). 라벨은 실제로
  // 넣을 문구가 있을 때만(둘 중 하나라도 비어있지 않을 때만) 보여준다.
  function appendGroup(container, label, ko, en) {
    var hasKo = ko && ko.length;
    var hasEn = en && en.length;
    if (!hasKo && !hasEn) return;
    if (label) {
      container.appendChild(el("div", "release-platform-label", label));
    }
    (ko || []).forEach(function (line) {
      container.appendChild(el("p", "release-text release-text-ko", line));
    });
    (en || []).forEach(function (line) {
      container.appendChild(el("p", "release-text release-text-en", line));
    });
  }

  function renderRelease(release) {
    var item = el("li", "release-card");

    var meta = el("div", "release-meta");
    meta.appendChild(el("span", "release-version", "v" + release.version));
    meta.appendChild(el("span", "release-date", release.date));
    item.appendChild(meta);

    var isSplit = !!(release.android || release.ios);
    appendGroup(item, isSplit ? "공통 / Common" : null, release.ko, release.en);
    if (release.android) {
      appendGroup(item, "Android", release.android.ko, release.android.en);
    }
    if (release.ios) {
      appendGroup(item, "iOS", release.ios.ko, release.ios.en);
    }

    return item;
  }

  fetch("releases.json")
    .then(function (res) {
      if (!res.ok) throw new Error("releases.json fetch failed: " + res.status);
      return res.json();
    })
    .then(function (data) {
      var releases = data.releases || [];
      list.innerHTML = "";
      if (releases.length === 0) {
        list.appendChild(
          el("li", "release-loading", "아직 게시된 릴리즈가 없습니다. / No releases yet.")
        );
        return;
      }
      releases.forEach(function (release) {
        list.appendChild(renderRelease(release));
      });
    })
    .catch(function (err) {
      list.innerHTML = "";
      list.appendChild(
        el(
          "li",
          "release-loading",
          "릴리즈 노트를 불러오지 못했습니다. / Failed to load release notes."
        )
      );
      console.error(err);
    });
})();
