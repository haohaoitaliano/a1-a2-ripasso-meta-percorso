"use strict";

const reviewData = {
  p1q1: ["___ lezion___ di oggi è molto noios___.", "La lezione di oggi è molto noiosa.", "lezione 和 noiosa 都是阴性单数。"],
  p1q2: ["___ libr___ di storia sono interessant___.", "I libri di storia sono interessanti.", "libri 是阳性复数：i libri interessanti。"],
  p1q3: ["Marco è un barista. È alt___.\nAnna è una cameriera. È bass___.", "Marco è un barista. È alto.\nAnna è una cameriera. È bassa.", "Marco 用阳性词尾 -o；Anna 用阴性词尾 -a。"],
  p1q4: ["Marco ha ___ occhi azzurr___.", "Marco ha gli occhi azzurri.", "occhi 是阳性复数：gli occhi azzurri。"],
  p1q5: ["___ amici di Anna sono simpatic___.", "Gli amici di Anna sono simpatici.", "amici 是阳性复数：gli amici simpatici。"],
  p2q1: ["Io ______ sonno.", "Io ho sonno.", "sonno 与 avere 搭配：avere sonno。"],
  p2q2: ["Marta ______ stanc___.", "Marta è stanca.", "essere + aggettivo：Marta è stanca。"],
  p2q3: ["Noi ______ fame.", "Noi abbiamo fame.", "fame 与 avere 搭配：avere fame。"],
  p2q4: ["Luca e Paolo ______ content___.", "Luca e Paolo sono contenti.", "阳性复数使用 contenti。"],
  p2q5: ["Tu ______ 25 anni.", "Tu hai 25 anni.", "年龄使用 avere：avere + anni。"],
  p2q6: ["Voi (due ragazze) ______ molto stanc___ oggi.", "Voi (due ragazze) siete molto stanche oggi.", "两位女生是阴性复数：stanche。"],
  p3q1: ["Ogni mattina io (andare) ______ al lavoro alle otto.", "Ogni mattina io vado al lavoro alle otto.", "andare：io vado。"],
  p3q2: ["Marta e Luca (venire) ______ da Milano e adesso vivono a Bologna.", "Marta e Luca vengono da Milano e adesso vivono a Bologna.", "venire：loro vengono。"],
  p3q3: ["Tu (sapere) ______ parlare italiano e inglese?", "Tu sai parlare italiano e inglese?", "sapere：tu sai。"],
  p3q4: ["Stasera noi (potere) ______ uscire.", "Stasera noi possiamo uscire.", "potere：noi possiamo。"],
  p3q5: ["Oggi Marco (dovere) ______ studiare perché domani ha un esame.", "Oggi Marco deve studiare perché domani ha un esame.", "dovere：lui deve。"],
  p3q6: ["Voi (volere) ______ mangiare la pizza stasera?", "Voi volete mangiare la pizza stasera?", "volere：voi volete。"],
  p3q7: ["Io (avere) ______ due sorelle e un fratello.", "Io ho due sorelle e un fratello.", "avere：io ho。"],
  p3q8: ["Giulia (essere) ______ italiana, ma vive in Francia.", "Giulia è italiana, ma vive in Francia.", "essere：lei è；重音不能省略。"],
  p3q9: ["Marta (uscire) ______ spesso con le sue amiche e loro (mangiare) ______ insieme.", "Marta esce spesso con le sue amiche e loro mangiano insieme.", "uscire：io esco, tu esci, lui / lei esce。"],
  p3q10: ["Gli studenti (leggere) ______ il testo.\nLa lezione (finire) ______ alle undici.", "Gli studenti leggono il testo.\nLa lezione finisce alle undici.", "loro leggono；la lezione finisce。"],
  p4q1: ["Io ho un fratello.\n______ fratello si chiama Marco.", "Mio fratello si chiama Marco.", "单数家庭成员通常不使用定冠词：mio fratello。"],
  p4q2: ["Marta è una mia amica.\n______ casa è molto bella.", "La sua casa è molto bella.", "casa 不是家庭成员，所以使用：la sua casa。"],
  p4q3: ["Noi viviamo con ______ genitori.", "Noi viviamo con i nostri genitori.", "复数 genitori 使用：i nostri。"],
  p4q4: ["Luca e Anna hanno due figli.\n______ figli vanno a scuola.", "I loro figli vanno a scuola.", "loro 的形式不变，但需要冠词：i loro figli。"],
  p4q5: ["Tu esci spesso con ______ amiche?", "Tu esci spesso con le tue amiche?", "阴性复数使用：le tue amiche。"],
  p4q6: ["Voi avete una professoressa italiana.\nCome si chiama ______ professoressa?", "Come si chiama la vostra professoressa?", "阴性单数使用：la vostra professoressa。"],
  p5q1: ["我妹妹今年20岁，她今天晚上想和朋友出去。", "Mia sorella ha vent’anni e stasera vuole uscire con i suoi amici.", "年龄使用 avere：avere + anni。"],
  p5q2: ["我们通常周六去我们的爷爷奶奶家，他们的家非常大，非常漂亮。", "Di solito il sabato andiamo a casa dei nostri nonni. La loro casa è molto grande e molto bella.", "家人是 i nostri nonni；房子是 la loro casa。"],
  p5q3: ["你知道我的朋友 Marco 几点来吗？他通常晚上八点来我家。", "Sai a che ora viene il mio amico Marco? Di solito viene a casa mia alle otto di sera.", "记住：a che ora、a casa mia、alle otto。"]
};

const missedQuestions = new Set();
const attemptedQuestions = new Set();
const firstAttemptResults = new Map();

const moduleData = {
  "1": "Articoli e aggettivi｜冠词和形容词",
  "2": "Essere e avere｜essere 和 avere",
  "3": "Verbi regolari e irregolari al presente｜规则动词和不规则动词的现在时",
  "4": "I possessivi｜物主形容词",
  "5": "Frasi complete｜完整句子"
};

const topicData = {
  adjectiveAgreement: ["Concordanza dell’aggettivo｜形容词性数一致", "形容词要和所描述的人或事物保持一致。", "Marta è stanca. · Luca e Paolo sono contenti."],
  articles: ["Articoli determinativi｜定冠词", "再复习名词前定冠词的选择。", "la lezione · i libri · gli occhi"],
  essereAvere: ["Essere o avere｜essere 还是 avere", "注意名词表达和形容词表达使用不同动词。", "avere fame · essere stanco/a"],
  avereEta: ["Avere + età｜表达年龄", "年龄使用 avere。", "Mia sorella ha vent’anni."],
  modalVerbs: ["Verbi modali｜情态动词", "potere / dovere / volere 的现在时需要再巩固。", "possiamo · deve · volete"],
  andareVenire: ["Andare e venire｜andare 和 venire", "再复习它们的现在时变位。", "vado · vengono"],
  sapereUscire: ["Sapere e uscire｜sapere 和 uscire", "再复习常见不规则形式。", "sai · esce"],
  presentVerbs: ["Il presente｜动词现在时", "注意主语和现在时变位的对应。", "mangiano · leggono · finisce"],
  possessiveArticle: ["Articolo + possessivo｜定冠词 + 物主形容词", "注意什么时候需要定冠词。", "mio fratello · la sua casa"],
  possessives: ["I possessivi｜物主形容词", "注意物主形容词和名词的性数配合。", "i nostri genitori · le tue amiche"],
  completeSentences: ["Frasi complete｜完整句子", "再练习把时间、人物和动作组织成完整句子。", "Di solito… · stasera… · a casa mia…"]
};

const questionTopics = {
  p1q1: ["adjectiveAgreement", "articles"], p1q2: ["adjectiveAgreement", "articles"], p1q3: ["adjectiveAgreement"], p1q4: ["adjectiveAgreement", "articles"], p1q5: ["adjectiveAgreement", "articles"],
  p2q1: ["essereAvere"], p2q2: ["essereAvere", "adjectiveAgreement"], p2q3: ["essereAvere"], p2q4: ["essereAvere", "adjectiveAgreement"], p2q5: ["avereEta"], p2q6: ["essereAvere", "adjectiveAgreement"],
  p3q1: ["andareVenire"], p3q2: ["andareVenire"], p3q3: ["sapereUscire"], p3q4: ["modalVerbs"], p3q5: ["modalVerbs"], p3q6: ["modalVerbs"], p3q7: ["presentVerbs"], p3q8: ["presentVerbs"], p3q9: ["sapereUscire", "presentVerbs"], p3q10: ["presentVerbs"],
  p4q1: ["possessiveArticle"], p4q2: ["possessiveArticle"], p4q3: ["possessives"], p4q4: ["possessiveArticle"], p4q5: ["possessives"], p4q6: ["possessives"],
  p5q1: ["avereEta", "completeSentences"], p5q2: ["possessiveArticle", "completeSentences"], p5q3: ["sapereUscire", "andareVenire", "completeSentences"]
};

function normalize(value) {
  return value
    .normalize("NFKC")
    .replace(/[。｡]/g, ".")
    .replace(/，/g, ",")
    .replace(/？/g, "?")
    .replace(/！/g, "!")
    .replace(/[；]/g, ";")
    .replace(/[：]/g, ":")
    .replace(/[‘’]/g, "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([.,?!;:])/g, "$1")
    .trim()
    .toLocaleLowerCase("it-IT")
    .replace(/[.!?]+$/g, "")
    .trim();
}

const acceptedAnswers = {
  translation1: (() => {
    const ages = ["vent'anni", "20 anni"];
    const times = ["stasera", "questa sera"];
    const friends = ["gli amici", "i suoi amici", "le sue amiche"];
    const answers = [];
    ages.forEach((age) => times.forEach((time) => friends.forEach((friend) => {
      const ageClauses = [
        `Quest'anno mia sorella ha ${age}`,
        `Mia sorella quest'anno ha ${age}`,
        `Mia sorella ha ${age} quest'anno`,
        `Mia sorella ha ${age}`
      ];
      const outingClauses = [
        `${time} mia sorella vuole uscire con ${friend}`,
        `Mia sorella ${time} vuole uscire con ${friend}`,
        `Mia sorella vuole uscire con ${friend} ${time}`
      ];
      const implicitOutingClauses = [
        `${time} vuole uscire con ${friend}`,
        `vuole uscire con ${friend} ${time}`
      ];
      const implicitAgeClauses = [
        `Quest'anno ha ${age}`,
        `Ha ${age} quest'anno`,
        `Ha ${age}`
      ];

      ageClauses.forEach((ageClause) => implicitOutingClauses.forEach((outingClause) => {
        answers.push(`${ageClause} e ${outingClause}.`);
        answers.push(`${ageClause}, ${outingClause}.`);
        answers.push(`${ageClause}. ${outingClause}.`);
      }));
      outingClauses.forEach((outingClause) => implicitAgeClauses.forEach((ageClause) => {
        answers.push(`${outingClause}. ${ageClause}.`);
      }));
    })));
    return answers;
  })(),
  translation2: (() => {
    const sentencePatterns = [
      (destination) => `Di solito il sabato andiamo ${destination}`,
      (destination) => `Il sabato di solito andiamo ${destination}`,
      (destination) => `Di solito andiamo ${destination} il sabato`,
      (destination) => `Il sabato andiamo di solito ${destination}`
    ];
    const destinations = ["a casa dei nostri nonni", "dai nostri nonni"];
    const houseSubjects = ["La loro casa", "La casa dei nostri nonni", "Casa loro"];
    const descriptions = ["molto grande e molto bella", "molto grande e bella"];
    const answers = [];
    sentencePatterns.forEach((pattern) => destinations.forEach((destination) => houseSubjects.forEach((houseSubject) => descriptions.forEach((description) => {
      answers.push(`${pattern(destination)}. ${houseSubject} è ${description}.`);
    }))));
    return answers;
  })(),
  translation3: (() => {
    const questions = [
      "Sai a che ora viene il mio amico Marco?",
      "Sai a che ora il mio amico Marco viene?",
      "Sai a che ora viene Marco, il mio amico?"
    ];
    const secondClauses = [
      "Di solito viene a casa mia alle otto di sera.",
      "Di solito viene a casa mia alle otto.",
      "Di solito viene alle otto di sera a casa mia.",
      "Di solito viene alle otto a casa mia.",
      "Viene di solito a casa mia alle otto di sera.",
      "Viene di solito a casa mia alle otto."
    ];
    return questions.flatMap((question) => secondClauses.map((secondClause) => `${question} ${secondClause}`));
  })()
};

function isTextQuestionCorrect(question) {
  return [...question.querySelectorAll("input[data-answer]")].every((input) => normalize(input.value) === normalize(input.dataset.answer));
}

function isChoiceQuestionCorrect(question) {
  const selected = question.querySelector("input[type='radio']:checked");
  return Boolean(selected && selected.value === question.dataset.answer);
}

function isTranslationCorrect(question) {
  const textarea = question.querySelector("textarea");
  const variants = acceptedAnswers[textarea.dataset.validator];
  const answer = normalizeTranslation(textarea.value);
  return variants.some((variant) => normalizeTranslation(variant) === answer);
}

function normalizeTranslation(value) {
  return value
    .normalize("NFKC")
    .toLocaleLowerCase("it-IT")
    .replace(/[’‘`´]/gu, "'")
    .replace(/\s*'\s*/g, "'")
    .replace(/['"‘’“”‚‛„‟‹›«»`´]/gu, "")
    .replace(/\p{P}+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function isQuestionCorrect(question) {
  if (question.querySelector("textarea")) return isTranslationCorrect(question);
  if (question.querySelector("input[type='radio']")) return isChoiceQuestionCorrect(question);
  return isTextQuestionCorrect(question);
}

function checkPart(part) {
  const questions = [...part.querySelectorAll(".question")];
  const incorrect = [];

  questions.forEach((question) => {
    const correct = isQuestionCorrect(question);
    question.classList.toggle("needs-review", !correct);
    question.classList.toggle("is-correct", correct);
    const questionId = question.dataset.question;
    if (!attemptedQuestions.has(questionId)) {
      attemptedQuestions.add(questionId);
      firstAttemptResults.set(questionId, correct);
      if (!correct) missedQuestions.add(questionId);
    }
    if (!correct) {
      incorrect.push(question);
    }
  });

  const feedback = part.querySelector(".feedback");
  const continueButton = part.querySelector(".continue-button");
  const learningNote = part.querySelector(".learning-note");
  if (learningNote) learningNote.hidden = false;

  if (incorrect.length) {
    feedback.textContent = "再检查一下标出的题目，修改后重新点击 Controlla。";
    feedback.className = "feedback retry";
    continueButton.hidden = true;
    incorrect[0].scrollIntoView({ behavior: "smooth", block: "center" });
    const firstControl = incorrect[0].querySelector("input, textarea");
    if (firstControl) firstControl.focus({ preventScroll: true });
    return;
  }

  feedback.textContent = "Bravissimo/a! Tutto corretto! 🎉";
  feedback.className = "feedback success";
  continueButton.hidden = false;
  continueButton.focus({ preventScroll: true });
}

function showPart(number) {
  document.querySelectorAll(".part, .result").forEach((section) => {
    const active = String(section.dataset.part) === String(number);
    section.hidden = !active;
    section.classList.toggle("is-active", active);
  });
  window.scrollTo({ top: 0, behavior: "instant" });
  const heading = document.querySelector(`[data-part="${number}"] h2`);
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}

function renderResult() {
  renderEvaluation();
  renderModulePerformance();
  renderFocusTopics();
  const review = document.querySelector("#review-section");
  if (!missedQuestions.size) {
    review.innerHTML = '<h3>Bravissimo/a! Hai completato tutto senza errori. 🎉</h3>';
  } else {
    const cards = [...missedQuestions].map((id) => {
      const [prompt, answer, tip] = reviewData[id];
      return `<article class="review-item"><p>${escapeHtml(prompt)}</p><p class="review-answer">↓<br>✅ ${escapeHtml(answer)}</p><p class="review-tip">↓<br>💡 ${escapeHtml(tip)}</p></article>`;
    }).join("");
    review.innerHTML = `<h3>Le frasi da rivedere｜错题回顾</h3><div class="review-list">${cards}</div><p class="read-aloud">🔊 Leggi le frasi corrette ad alta voce almeno 5 volte.<br>请把正确的句子大声朗读至少 5 遍。</p>`;
  }
  showPart("result");
}

function renderEvaluation() {
  const total = document.querySelectorAll(".question").length;
  const correct = [...firstAttemptResults.values()].filter(Boolean).length;
  const percentage = total ? Math.round((correct / total) * 100) : 0;
  const feedback = percentage >= 90
    ? ["Ottimo lavoro! 🌟", "你已经很好地掌握了这一阶段的主要内容。"]
    : percentage >= 80
      ? ["Molto bene! 🌱", "你已经掌握了大部分内容，还有少量内容可以继续巩固。"]
      : percentage >= 70
        ? ["Buon lavoro!", "你已经掌握了不少基础内容，建议再加强几个知识点。"]
        : ["Continuiamo a ripassare 🌱", "你已经有了一定基础，再复习和练习一下会更稳。"];

  document.querySelector("#score-percentage").textContent = `${percentage}%`;
  document.querySelector("#score-message").innerHTML = `<strong>${feedback[0]}</strong><br>${feedback[1]}`;
}

function renderModulePerformance() {
  const strong = [];
  const reinforce = [];

  Object.entries(moduleData).forEach(([partNumber, label]) => {
    const questions = [...document.querySelectorAll(`[data-part="${partNumber}"] .question`)];
    const correct = questions.filter((question) => firstAttemptResults.get(question.dataset.question) === true).length;
    const rate = questions.length ? correct / questions.length : 0;
    (rate >= 0.8 ? strong : reinforce).push(label);
  });

  const list = (items, emptyText) => items.length
    ? `<ul>${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
    : `<p class="empty-note">${emptyText}</p>`;

  document.querySelector("#module-performance").innerHTML = `
    <div class="performance-group"><h3>Hai fatto bene｜你掌握得不错 ✅</h3>${list(strong, "继续保持，你正在稳步进步。")}</div>
    <div class="performance-group reinforce"><h3>Da rinforzare｜建议加强 📌</h3>${list(reinforce, "本次各模块首次作答都很稳定。")}</div>`;
}

function renderFocusTopics() {
  const counts = new Map();
  [...missedQuestions].forEach((questionId) => {
    (questionTopics[questionId] || []).forEach((topicId) => counts.set(topicId, (counts.get(topicId) || 0) + 1));
  });

  const topics = [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const content = topics.length
    ? `<div class="topic-list">${topics.map(([topicId]) => {
      const [title, tip, example] = topicData[topicId];
      return `<article class="topic-item"><h4>${escapeHtml(title)}</h4><p>💡 ${escapeHtml(tip)}</p><small>例如：${escapeHtml(example)}</small></article>`;
    }).join("")}</div>`
    : '<p class="empty-note">本次首次作答没有需要重点加强的知识点，继续保持！🎉</p>';

  document.querySelector("#focus-topics").innerHTML = `<h3>Da ripassare｜建议重点复习 📌</h3>${content}`;
}

function escapeHtml(value) {
  const node = document.createElement("div");
  node.textContent = value;
  return node.innerHTML;
}

function restart() {
  document.querySelectorAll("input[type='text'], input:not([type]), textarea").forEach((control) => { control.value = ""; });
  document.querySelectorAll("input[type='radio']").forEach((radio) => { radio.checked = false; });
  document.querySelectorAll(".question").forEach((question) => question.classList.remove("needs-review", "is-correct"));
  document.querySelectorAll(".feedback").forEach((feedback) => { feedback.textContent = ""; feedback.className = "feedback"; });
  document.querySelectorAll(".continue-button, .learning-note").forEach((element) => { element.hidden = true; });
  missedQuestions.clear();
  attemptedQuestions.clear();
  firstAttemptResults.clear();
  document.querySelector("#score-percentage").textContent = "";
  document.querySelector("#score-message").textContent = "";
  document.querySelector("#module-performance").innerHTML = "";
  document.querySelector("#focus-topics").innerHTML = "";
  document.querySelector("#review-section").innerHTML = "";
  showPart(1);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".check-button").forEach((button) => {
    button.addEventListener("click", () => checkPart(button.closest(".part")));
  });

  document.querySelectorAll(".continue-button").forEach((button) => {
    button.addEventListener("click", () => {
      const current = Number(button.closest(".part").dataset.part);
      if (current === 5) renderResult(); else showPart(current + 1);
    });
  });

  document.querySelector("#restart-button").addEventListener("click", restart);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && event.target.matches("input")) event.preventDefault();
  });
});
