// 사전체험단 신청 양식 — Google Forms를 퍼가기(embed)로 붙여 넣는다.
//
// 이 저장소는 백엔드가 없는 정적 사이트라, 실제 응답 저장·다운로드는
// Google Forms(→ Google Sheets 응답 시트, 언제든 CSV로 내려받기 가능)에
// 맡긴다. 폼을 만들기 전까지는 아래 URL이 비어 있으므로 "준비 중" 문구만
// 보여주고, URL을 채우면 그 자리에 iframe이 들어간다.
(function () {
  var GOOGLE_FORM_EMBED_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfpk9BP5Rc0G--27EdZsacN5k1_sv23RfWwJlpHzAfjIkxJ8g/viewform?embedded=true";

  var slot = document.getElementById("signup-form-slot");
  if (!slot || !GOOGLE_FORM_EMBED_URL) return;

  var iframe = document.createElement("iframe");
  iframe.src = GOOGLE_FORM_EMBED_URL;
  iframe.width = "100%";
  iframe.height = "897"; // Google Forms 퍼가기 코드가 제시한 높이
  iframe.setAttribute("frameborder", "0");
  iframe.setAttribute("marginheight", "0");
  iframe.setAttribute("marginwidth", "0");
  iframe.setAttribute("loading", "lazy");
  iframe.title = "BlueArgos 사전체험단 신청 양식";

  slot.innerHTML = "";
  slot.appendChild(iframe);
})();
