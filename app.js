(function () {
  "use strict";

  var CONSENT_ENTITY = "MKISCORE·NVIDIA·Sionic AI";

  var CONSENT_TEXT_REQUIRED =
    "<strong>개인정보 수집 및 이용 동의</strong>" +
    "<p>" + CONSENT_ENTITY + "가 귀하의 개인정보를 수집, 이용하는 목적은 다음과 같습니다. 제품과 서비스에 대해 귀하와의 연락, 고객 서비스 증진, 제품 및 서비스에 대한 정보 제공 및 판매, 새로운 서비스와 혜택에 대한 업데이트, 개별 프로모션 제안, 제품 및 서비스에 대한 시장 조사.</p>" +
    "<p><strong>1. 수집하려는 개인정보의 항목</strong><br>이름, 이메일, 회사명, 휴대전화번호, 담당업무, 부서, 직급</p>" +
    "<p><strong>2. 개인정보의 보유 및 이용 기간</strong><br>처리 목적 달성 시까지</p>" +
    "<p><strong>3. 동의를 거부할 권리 및 동의 거부에 따른 불이익</strong><br>귀하는 위 개인정보의 수집, 이용에 대한 동의를 거부할 수 있으며, 동의를 거부한 경우에는 " + CONSENT_ENTITY + "는 귀하에게 그와 관련된 정보나 혜택을 제공하지 않게 됩니다.</p>";

  var CONSENT_TEXT_OPTIONAL =
    "<strong>전화, E-mail, SMS 수신 동의</strong>" +
    "<p>" + CONSENT_ENTITY + "는 제품 및 서비스, 프로모션 또는 시장조사 등의 유용한 정보를 온라인과 오프라인을 통해 안내 드리고자 합니다. 기프트 제공 또는 기프티콘 발송을 위해 전화 연락 또는 SMS 발송을 드릴 수 있습니다.</p>";

  var SURVEY_STEPS = [
    {
      title: "기본 정보",
      fields: [
        { key: "company", label: "회사명", type: "text", required: true },
        { key: "name", label: "성함", type: "text", required: true },
        { key: "email", label: "이메일", type: "email", required: true, ph: "회사 이메일 주소를 입력해 주세요." },
        { key: "role", label: "담당 업무", type: "text", required: true },
        { key: "department", label: "부서", type: "text", required: true },
        { key: "title", label: "직책", type: "text", required: true },
        { key: "phone", label: "휴대전화번호", type: "tel", required: true, ph: "01012345678 형식으로 숫자만 입력해 주세요." },
        { key: "companySize", label: "회사 규모", type: "radio", required: true,
          options: ["대기업", "중견/중소기업", "스타트업", "교육(학교)"] }
      ]
    },
    {
      title: "관심사",
      fields: [
        { key: "interestAreas", label: "관심 분야 (복수 응답 가능)", type: "checkbox", required: true,
          options: ["연구개발", "데이터 분석 및 활용", "Physical AI", "AI Factory", "생성형 AI", "HPC 및 AI Simulation", "AI 학습 및 추론", "기타"],
          otherOption: "기타", otherKey: "interestAreasOther" },
        { key: "interestProducts", label: "관심 제품 (복수 응답 가능)", type: "checkbox", required: true,
          options: ["8GPU Server (B200, B300)", "Rack 서버 (GB300, Vera Rubin...)", "IB Switch", "RTX Pro 6000 GPU Server", "GDS 스토리지", "WEKA 라이선스", "해당 없음"],
          exclusiveOption: "해당 없음" }
      ]
    },
    {
      title: "기업 정보",
      fields: [
        { key: "itBudget", label: "연간 IT 구매 예산 규모", type: "radio", required: true,
          options: ["100억 원 이상", "50억 원 이상", "30억 원 이상", "20억 원 이상", "10억 원 이상", "5억 원 이상", "3억 원 미만", "1억 원 미만", "모름 또는 없음"] },
        { key: "decisionAuthority", label: "의사결정 권한", type: "radio", required: true,
          options: ["CFO, CEO, COO, CTO", "예산 집행 담당", "타부서 리더(팀장급)", "구매부서 팀원", "해당 없음"] }
      ]
    },
    {
      title: "NVIDIA 제품/솔루션 도입 계획",
      fields: [
        { key: "adoptionIntent", label: "도입의사", type: "radio", required: true,
          options: ["도입의사 있음", "도입의사 없음", "도입 검토중 (구매부서 협의 전)", "미확정 (정보확인 목적)", "미확정 (사전조사 목적)"] },
        { key: "adoptionTimeline", label: "도입 시점", type: "radio", required: true,
          options: ["1~2개월 이내 (긴급도입)", "3개월 이내", "6개월 이내", "12개월 이내", "1년 이후", "미정", "계획없음"] },
        { key: "consult", label: "엠키스코어 영업팀의 상담을 받아보시겠어요?", type: "radio", required: true,
          options: ["예", "아니오"] }
      ]
    },
    {
      title: "AI 솔루션 도입",
      fields: [
        { key: "aiConcernAreas", label: "현재 AI 도입 또는 고도화와 관련하여 검토 중이거나 해결이 필요한 영역은 무엇인가요? (복수 선택)", type: "checkbox", required: true,
          options: ["LLM 배포 및 추론 속도·성능 개선", "GPU 비용 및 인프라 운영 효율화", "사내 문서 검색 및 RAG 정확도 개선", "AI Agent 구축 및 업무 자동화", "문서 Parsing 및 비정형 데이터 처리", "다양한 AI 모델 선택·연동 및 라우팅", "보안 및 On-premise 환경 구축", "기타"],
          otherOption: "기타", otherKey: "aiConcernAreasOther" },
        { key: "aiAdoptionTimeline", label: "현재 검토 중인 AI 과제의 도입 또는 PoC 계획 시점은 언제인가요?", type: "radio", required: true,
          options: ["3개월 이내", "6개월 이내", "1년 이내", "1년 이후", "현재 정보 수집 및 검토 단계", "구체적인 계획 없음"] },
        { key: "sionicConsult", label: "추후 AI 솔루션 전문 기업, Sionic AI로부터 상담을 받아보시겠어요?", type: "radio", required: true,
          options: ["예", "아니오"] }
      ]
    },
    {
      title: "개인정보 동의",
      fields: [
        { key: "consentRequired", type: "consent", required: true,
          text: CONSENT_TEXT_REQUIRED, checkboxLabel: "위 개인정보 수집 및 이용에 동의합니다. (필수)" },
        { key: "consentMarketing", type: "consent", required: false,
          text: CONSENT_TEXT_OPTIONAL, checkboxLabel: "전화, 이메일, SMS 수신에 동의합니다. (선택)" }
      ]
    }
  ];

  var LS_DRAFT = "mki_aifesta26_survey_draft_v1";
  var LS_FAILED = "mki_aifesta26_failed_submissions_v1";
  var MAX_RETRIES = 3;
  var CONFIG = window.MKI_CONFIG || {};

  var state = {
    screen: "intro",
    surveyStep: 0,
    survey: {}
  };

  function uid() {
    return "r_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 9);
  }

  function formatKst(date) {
    var parts = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric", month: "2-digit", day: "2-digit",
      hour: "2-digit", minute: "2-digit", second: "2-digit",
      hour12: false
    }).formatToParts(date);
    var map = {};
    parts.forEach(function (p) { map[p.type] = p.value; });
    return map.year + "-" + map.month + "-" + map.day + " " + map.hour + ":" + map.minute + ":" + map.second;
  }

  function saveDraft() {
    try { localStorage.setItem(LS_DRAFT, JSON.stringify(state)); } catch (e) {}
  }
  function loadDraft() {
    try { return JSON.parse(localStorage.getItem(LS_DRAFT)); } catch (e) { return null; }
  }
  function clearDraft() {
    try { localStorage.removeItem(LS_DRAFT); } catch (e) {}
  }

  function getFailedSubmissions() {
    try { return JSON.parse(localStorage.getItem(LS_FAILED) || "[]"); } catch (e) { return []; }
  }
  function setFailedSubmissions(list) {
    try { localStorage.setItem(LS_FAILED, JSON.stringify(list)); } catch (e) {}
  }

  var app = document.getElementById("app");

  function el(html) {
    var t = document.createElement("template");
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  function escapeHtml(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[c];
    });
  }

  function topbar(labelText, current, total) {
    var pct = total ? Math.round((current / total) * 100) : 0;
    return '<div class="topbar">' +
      '<div class="topbar-row"><span class="brand">MKISCORE <span>·</span> AI Festa 26</span>' +
      (total ? '<span class="step-label">' + escapeHtml(labelText) + " " + current + "/" + total + "</span>" : "") +
      "</div>" +
      (total ? '<div class="progress-track"><div class="progress-fill" style="width:' + pct + '%"></div></div>' : "") +
      "</div>";
  }

  function render() {
    app.innerHTML = "";
    if (state.screen === "intro") return renderIntro();
    if (state.screen === "survey") return renderSurvey();
    if (state.screen === "submitting") return renderSubmitting();
    if (state.screen === "thanks") return renderThanks();
    if (state.screen === "admin") return renderAdmin();
  }

  function renderIntro() {
    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card">' +
          "<h1>AI Festa 26 엠키스코어 부스 설문</h1>" +
          '<button class="btn btn-primary" id="btn-start">설문 참여하고 부스 내 이벤트에 참여하세요</button>' +
        "</div></div>" +
      "</div>"
    ));
    document.getElementById("btn-start").addEventListener("click", function () {
      state.screen = "survey";
      state.surveyStep = 0;
      saveDraft();
      render();
    });
  }

  function otherValueFor(key) {
    var v = state.survey[key];
    return v ? String(v) : "";
  }

  function fieldHtml(f, value) {
    if (f.type === "text" || f.type === "email" || f.type === "tel") {
      var v = value ? escapeHtml(value) : "";
      return '<div class="field" data-key="' + f.key + '">' +
        "<label>" + escapeHtml(f.label) + (f.required ? '<span class="req">*</span>' : "") + "</label>" +
        '<input type="' + f.type + '" data-key="' + f.key + '" value="' + v + '">' +
        (f.ph ? '<div class="ph">' + escapeHtml(f.ph) + "</div>" : "") +
        '<div class="err">' + (f.type === "email" ? "이메일 주소를 입력해 주세요." : f.type === "tel" ? "연락 가능한 휴대전화번호를 입력해 주세요." : "필수 입력 항목입니다.") + "</div>" +
      "</div>";
    }
    if (f.type === "radio") {
      var chips = f.options.map(function (opt) {
        var checked = value === opt ? " checked" : "";
        return '<label class="chip"><input type="radio" name="' + f.key + '" value="' + escapeHtml(opt) + '"' + checked + "><span>" + escapeHtml(opt) + "</span></label>";
      }).join("");
      return '<div class="field" data-key="' + f.key + '">' +
        "<label>" + escapeHtml(f.label) + (f.required ? '<span class="req">*</span>' : "") + "</label>" +
        '<div class="chip-group">' + chips + "</div>" +
        '<div class="err">하나를 선택해 주세요.</div>' +
      "</div>";
    }
    if (f.type === "checkbox") {
      var selected = Array.isArray(value) ? value : [];
      var boxes = f.options.map(function (opt) {
        var checked = selected.indexOf(opt) > -1 ? " checked" : "";
        return '<label class="chip"><input type="checkbox" data-group="' + f.key + '" value="' + escapeHtml(opt) + '"' + checked + "><span>" + escapeHtml(opt) + "</span></label>";
      }).join("");
      var otherHtml = "";
      if (f.otherKey) {
        var showOther = f.otherOption && selected.indexOf(f.otherOption) > -1;
        var otherVal = otherValueFor(f.otherKey);
        otherHtml = '<input type="text" class="other-input" data-other-for="' + f.key + '" ' +
          'style="' + (showOther ? "" : "display:none;") + '" ' +
          'placeholder="직접 입력해 주세요." value="' + escapeHtml(otherVal) + '">';
      }
      return '<div class="field" data-key="' + f.key + '">' +
        "<label>" + escapeHtml(f.label) + (f.required ? '<span class="req">*</span>' : "") + "</label>" +
        '<div class="chip-group">' + boxes + "</div>" +
        otherHtml +
        '<div class="err">최소 하나를 선택해 주세요.</div>' +
      "</div>";
    }
    if (f.type === "consent") {
      var isChecked = value === true ? " checked" : "";
      return '<div class="field consent-field" data-key="' + f.key + '">' +
        '<div class="consent-box">' + f.text + "</div>" +
        '<label class="consent-check"><input type="checkbox" data-consent="' + f.key + '"' + isChecked + "><span>" + escapeHtml(f.checkboxLabel) + "</span></label>" +
        (f.required ? '<div class="err">필수 동의 항목입니다.</div>' : "") +
      "</div>";
    }
    return "";
  }

  function renderSurvey() {
    var stepIdx = state.surveyStep;
    var step = SURVEY_STEPS[stepIdx];
    var fieldsHtml = step.fields.map(function (f) {
      return fieldHtml(f, state.survey[f.key]);
    }).join("");
    var isLast = stepIdx === SURVEY_STEPS.length - 1;

    app.appendChild(el(
      '<div class="shell">' +
        topbar("설문", stepIdx + 1, SURVEY_STEPS.length) +
        '<div class="content"><div class="card">' +
          "<h2>" + escapeHtml(step.title) + "</h2>" +
          '<div id="fields">' + fieldsHtml + "</div>" +
          '<div class="btn-row">' +
            (stepIdx > 0 ? '<button class="btn btn-ghost" id="btn-back">이전</button>' : "") +
            '<button class="btn btn-primary" id="btn-fwd">' + (isLast ? "제출하기" : "다음") + "</button>" +
          "</div>" +
        "</div></div>" +
      "</div>"
    ));

    step.fields.forEach(function (f) {
      if (f.type === "text" || f.type === "email" || f.type === "tel") {
        var input = document.querySelector('input[data-key="' + f.key + '"]');
        input.addEventListener("input", function () {
          state.survey[f.key] = input.value;
        });
      } else if (f.type === "radio") {
        var radios = document.querySelectorAll('input[name="' + f.key + '"]');
        radios.forEach(function (r) {
          r.addEventListener("change", function () {
            state.survey[f.key] = r.value;
          });
        });
      } else if (f.type === "checkbox") {
        var boxes = document.querySelectorAll('input[data-group="' + f.key + '"]');
        var otherInput = document.querySelector('input[data-other-for="' + f.key + '"]');
        boxes.forEach(function (b) {
          b.addEventListener("change", function () {
            var cur = Array.isArray(state.survey[f.key]) ? state.survey[f.key].slice() : [];
            if (b.checked) {
              if (cur.indexOf(b.value) === -1) cur.push(b.value);
            } else {
              cur = cur.filter(function (v) { return v !== b.value; });
            }
            if (f.exclusiveOption) {
              if (b.checked && b.value === f.exclusiveOption) {
                cur = [f.exclusiveOption];
              } else if (cur.indexOf(f.exclusiveOption) > -1) {
                cur = cur.filter(function (v) { return v !== f.exclusiveOption; });
              }
              boxes.forEach(function (other) {
                other.checked = cur.indexOf(other.value) > -1;
              });
            }
            state.survey[f.key] = cur;
            if (f.otherKey && otherInput) {
              var showOther = f.otherOption && cur.indexOf(f.otherOption) > -1;
              otherInput.style.display = showOther ? "" : "none";
              if (!showOther) {
                otherInput.value = "";
                state.survey[f.otherKey] = "";
              }
            }
          });
        });
        if (otherInput) {
          otherInput.addEventListener("input", function () {
            state.survey[f.otherKey] = otherInput.value;
          });
        }
      } else if (f.type === "consent") {
        var consentBox = document.querySelector('input[data-consent="' + f.key + '"]');
        consentBox.addEventListener("change", function () {
          state.survey[f.key] = consentBox.checked;
        });
      }
    });

    if (stepIdx > 0) {
      document.getElementById("btn-back").addEventListener("click", function () {
        state.surveyStep = stepIdx - 1;
        saveDraft();
        render();
      });
    }

    document.getElementById("btn-fwd").addEventListener("click", function () {
      if (!validateStep(step)) return;
      if (isLast) {
        submitSurvey();
      } else {
        state.surveyStep = stepIdx + 1;
        saveDraft();
        render();
      }
    });
  }

  function validateStep(step) {
    var ok = true;
    step.fields.forEach(function (f) {
      if (!f.required) return;
      var val = state.survey[f.key];
      var invalid = false;
      if (f.type === "email") {
        invalid = !val || val.indexOf("@") === -1;
      } else if (f.type === "tel") {
        invalid = !val || val.replace(/[^0-9]/g, "").length < 9;
      } else {
        invalid = !val || !String(val).trim();
      }
      var fieldEl = document.querySelector('.field[data-key="' + f.key + '"]');
      if (fieldEl) fieldEl.classList.toggle("invalid", invalid);
      if (invalid) ok = false;
    });
    return ok;
  }

  function buildRecord() {
    var s = state.survey;
    return {
      id: uid(),
      submittedAt: formatKst(new Date()),
      company: s.company || "",
      name: s.name || "",
      email: s.email || "",
      role: s.role || "",
      department: s.department || "",
      title: s.title || "",
      phone: s.phone || "",
      decisionAuthority: s.decisionAuthority || "",
      companySize: s.companySize || "",
      itBudget: s.itBudget || "",
      interestAreas: s.interestAreas || [],
      interestAreasOther: s.interestAreasOther || "",
      interestProducts: s.interestProducts || [],
      adoptionIntent: s.adoptionIntent || "",
      adoptionTimeline: s.adoptionTimeline || "",
      consult: s.consult || "",
      aiConcernAreas: s.aiConcernAreas || [],
      aiConcernAreasOther: s.aiConcernAreasOther || "",
      aiAdoptionTimeline: s.aiAdoptionTimeline || "",
      sionicConsult: s.sionicConsult || "",
      consentRequired: s.consentRequired ? "예" : "아니오",
      consentMarketing: s.consentMarketing ? "예" : "아니오"
    };
  }

  function submitSurvey() {
    var record = buildRecord();
    clearDraft();
    state.screen = "submitting";
    render();
    sendRecord(record, 0).then(function () {
      state.screen = "thanks";
      render();
    }).catch(function (err) {
      console.error("mkiscore survey: failed to save to Google Sheets", err);
      var failed = getFailedSubmissions();
      failed.push(record);
      setFailedSubmissions(failed);
      state.screen = "thanks";
      state.saveFailed = true;
      render();
    });
  }

  function sendRecord(record, attempt) {
    if (!CONFIG.APPS_SCRIPT_URL) {
      return Promise.reject(new Error("no apps script url configured"));
    }
    return fetch(CONFIG.APPS_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(record)
    }).then(function (res) {
      if (!res.ok) throw new Error("bad status " + res.status);
      return res;
    }).catch(function (err) {
      if (attempt < MAX_RETRIES) {
        return new Promise(function (resolve) { setTimeout(resolve, 600 * (attempt + 1)); })
          .then(function () { return sendRecord(record, attempt + 1); });
      }
      throw err;
    });
  }

  function renderSubmitting() {
    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card" style="align-items:center;text-align:center;display:flex;flex-direction:column;">' +
          '<div class="spinner"></div>' +
          "<p class=\"lede\" style=\"margin:0;\">응답을 저장하고 있습니다...</p>" +
        "</div></div>" +
      "</div>"
    ));
  }

  function renderThanks() {
    var checkSvg = '<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 13l4 4L19 7" stroke="var(--good)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var note = state.saveFailed
      ? '<p class="lede" style="margin-top:14px;">네트워크 상태로 자동 저장이 지연될 수 있습니다. 스태프에게 알려주시면 확인해 드립니다.</p>'
      : "";
    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card">' +
          '<div class="thanks-icon">' + checkSvg + "</div>" +
          "<h1>설문 참여해 주셔서 감사합니다</h1>" +
          '<div class="staff-box"><p class="label">엠키스코어 스태프 확인용</p><p>설문 완료 화면을 엠키스코어 스태프에게 보여주세요.</p></div>' +
          note +
        "</div></div>" +
      "</div>"
    ));
    state.saveFailed = false;
  }

  function renderAdmin() {
    var failed = getFailedSubmissions();

    var rows = failed.map(function (r) {
      return "<tr><td>" + escapeHtml((r.submittedAt || "").slice(0, 16)) + "</td>" +
        "<td>" + escapeHtml(r.company) + "</td>" +
        "<td>" + escapeHtml(r.name) + "</td>" +
        "<td>" + escapeHtml(r.email) + "</td>" +
        "<td>" + escapeHtml(r.phone) + "</td></tr>";
    }).join("");

    app.appendChild(el(
      '<div class="shell">' +
        topbar("", 0, 0) +
        '<div class="content"><div class="card">' +
          '<p class="eyebrow">스태프 전용</p>' +
          "<h1>저장 실패 응답 확인</h1>" +
          '<p class="admin-note">전체 응답 현황은 이 화면이 아니라 구글시트에서 확인해 주세요. 여기서는 네트워크 문제로 이 기기에서 저장에 실패한 응답만 다시 전송할 수 있습니다.</p>' +
          (failed.length
            ? '<div class="admin-summary"><span class="num">' + failed.length + '</span><span class="step-label">이 기기에서 저장 실패한 응답</span></div>' +
              '<p class="admin-note">네트워크 문제로 구글시트에 자동 저장되지 못한 응답입니다. 아래 버튼으로 다시 전송을 시도해 주세요.</p>' +
              '<div class="table-wrap"><table><thead><tr><th>제출시각</th><th>회사</th><th>성함</th><th>이메일</th><th>연락처</th></tr></thead><tbody>' + rows + "</tbody></table></div>" +
              '<div class="btn-row" style="margin-top:0;"><button class="btn btn-ghost" id="btn-retry">다시 전송 시도</button></div>'
            : "") +
        "</div></div>" +
        '<div class="foot-link"><button id="btn-exit" type="button">참가자 화면으로 돌아가기</button></div>' +
      "</div>"
    ));

    if (failed.length) {
      document.getElementById("btn-retry").addEventListener("click", function () {
        Promise.all(failed.map(function (r) { return sendRecord(r, 0).then(function () { return r.id; }).catch(function () { return null; }); }))
          .then(function (succeededIds) {
            var stillFailed = failed.filter(function (r) { return succeededIds.indexOf(r.id) === -1; });
            setFailedSubmissions(stillFailed);
            render();
          });
      });
    }

    document.getElementById("btn-exit").addEventListener("click", function () {
      state.screen = "intro";
      render();
    });
  }

  function init() {
    if (location.hash === "#staff") {
      state.screen = "admin";
      render();
      return;
    }

    var draft = loadDraft();
    if (draft && draft.screen && draft.screen !== "thanks" && draft.screen !== "submitting" && draft.screen !== "admin") {
      state = draft;
      render();
      return;
    }

    render();
  }

  init();
})();
