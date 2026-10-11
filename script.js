/* Techverse game logic — plain JavaScript, no build step required. */
(() => {
  "use strict";

  const WINNING_SCORE = 2; // Change this number to adjust the voucher threshold.
  const QUESTION_COUNT = 5;
  const SESSION_KEY = "gdgoc-techverse-session-v1";
  const INSTAGRAM_URL = "https://www.instagram.com/gdgoncampus_ndu.nlc?dlrf=ejlyM3B3cWZxbDY2";
  const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const LEVELS = {
    explorer: { label: "TECH EXPLORER", short: "Explorer" },
    enthusiast: { label: "CODE ENTHUSIAST", short: "Enthusiast" },
    geek: { label: "TECH GEEK", short: "Tech Geek" }
  };

  const CATEGORY_LABELS = {
    code: "GUESS THE OUTPUT",
    ai_facts: "AI FACTS",
    myth_fact: "MYTH OR FACT",
    tech_myth: "TECH MYTH OR FACT",
    guess_technology: "GUESS THE TECHNOLOGY",
    cs_trivia: "TECH TRIVIA"
  };

  const IDENTITIES = {
    legend: {
      title: "THE TECH LEGEND",
      icon: "✹",
      description: "A perfect round! You connected the dots across all five questions. That's some serious tech-legend energy.",
      color: "#84f0be"
    },
    ai: {
      title: "THE AI EXPLORER",
      icon: "✳",
      description: "You seem drawn to the possibilities of intelligent tools, machine learning, and what's next. Keep asking big questions.",
      color: "#a99aff"
    },
    code: {
      title: "THE CODE ENTHUSIAST",
      icon: "</>",
      description: "You like making sense of logic and instructions. A few lines of code can open a whole world of possibilities.",
      color: "#75e4f3"
    },
    logic: {
      title: "THE DEBUGGING DETECTIVE",
      icon: "⌕",
      description: "You look for patterns and enjoy figuring out why things behave the way they do. Curiosity is your debugging superpower.",
      color: "#9ea9ff"
    },
    security: {
      title: "THE CYBER GUARDIAN",
      icon: "⬡",
      description: "You pay attention to the details that keep people and systems safer. Smart habits are powerful tech.",
      color: "#84f0be"
    },
    innovator: {
      title: "THE FUTURE INNOVATOR",
      icon: "✦",
      description: "You enjoy the bigger picture: how technology, people, and new ideas can come together to make something useful.",
      color: "#ff9bd1"
    },
    explorer: {
      title: "THE TECH EXPLORER",
      icon: "✧",
      description: "You're open to discovering a bit of everything. There is no single way into tech — curiosity is a great place to start.",
      color: "#75e4f3"
    }
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const screens = {
    home: $("#screen-home"),
    difficulty: $("#screen-difficulty"),
    quiz: $("#screen-quiz"),
    results: $("#screen-results")
  };

  const state = {
    screen: "home",
    difficulty: null,
    questions: [],
    currentIndex: 0,
    answers: [],
    selectedOption: null,
    submitted: false,
    identityKey: null,
    won: false,
    voucher: null
  };

  function deepCopy(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function saveSession() {
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(state));
    } catch (error) {
      // The game still works if browser storage is disabled.
      console.warn("Techverse session could not be saved.", error);
    }
  }

  function restoreSession() {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY);
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const validScreen = Object.prototype.hasOwnProperty.call(screens, parsed.screen);
      const validGame = Array.isArray(parsed.questions) && parsed.questions.length === QUESTION_COUNT;
      if (validScreen && (parsed.screen === "home" || parsed.screen === "difficulty" || validGame)) {
        Object.assign(state, parsed);
      }
    } catch (error) {
      console.warn("Techverse session could not be restored.", error);
    }
  }

  function setScreen(name) {
    state.screen = name;
    Object.entries(screens).forEach(([key, element]) => {
      const active = key === name;
      element.hidden = !active;
      element.classList.toggle("is-active", active);
    });
    saveSession();
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    updateHomeVoucherShortcut();
  }

  function updateHomeVoucherShortcut() {
    const button = $("#reopen-voucher");
    if (!button) return;
    button.hidden = !(state.won && state.voucher && state.screen === "home");
  }

  function goHome() {
    setScreen("home");
    updateHomeVoucherShortcut();
  }

  function randomNumber(max) {
    if (max <= 0) return 0;
    try {
      const cryptoObj = window.crypto;
      if (cryptoObj && cryptoObj.getRandomValues) {
        const array = new Uint32Array(1);
        cryptoObj.getRandomValues(array);
        return array[0] % max;
      }
    } catch (_) {
      // Fall through to Math.random in restricted browsers.
    }
    return Math.floor(Math.random() * max);
  }

  function shuffle(items) {
    const result = items.slice();
    for (let i = result.length - 1; i > 0; i -= 1) {
      const j = randomNumber(i + 1);
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function makeAttemptQuestion(source) {
    const copy = deepCopy(source);
    const optionPairs = copy.options.map((text, index) => ({
      text,
      isCorrect: index === copy.answer
    }));
    const shuffledOptions = shuffle(optionPairs);
    copy.options = shuffledOptions.map((option) => option.text);
    copy.answer = shuffledOptions.findIndex((option) => option.isCorrect);
    return copy;
  }

  function beginNewGame(level) {
    if (!window.GAME_QUESTIONS || !Array.isArray(window.GAME_QUESTIONS)) {
      showFatalMessage("The question bank could not be loaded. Please reload the page and try again.");
      return;
    }
    const pool = window.GAME_QUESTIONS.filter((question) => question.difficulty === level);
    if (pool.length < QUESTION_COUNT) {
      showFatalMessage("This level needs at least five questions. Please check questions.js.");
      return;
    }

    state.difficulty = level;
    state.questions = shuffle(pool).slice(0, QUESTION_COUNT).map(makeAttemptQuestion);
    state.currentIndex = 0;
    state.answers = [];
    state.selectedOption = null;
    state.submitted = false;
    state.identityKey = null;
    state.won = false;
    state.voucher = null;
    setScreen("quiz");
    renderQuiz();
  }

  function showFatalMessage(message) {
    const existing = $("#runtime-alert");
    if (existing) existing.remove();
    const alert = document.createElement("div");
    alert.id = "runtime-alert";
    alert.className = "runtime-alert";
    alert.setAttribute("role", "alert");
    alert.textContent = message;
    $("main").prepend(alert);
    window.scrollTo({ top: 0, behavior: "auto" });
  }

  function currentQuestion() {
    return state.questions[state.currentIndex];
  }

  function scoreNow() {
    return state.answers.reduce((sum, answer) => sum + (answer.correct ? 1 : 0), 0);
  }

  function renderQuiz() {
    if (!currentQuestion()) return;
    const question = currentQuestion();
    const answeredCount = state.answers.length;
    const score = scoreNow();

    $("#quiz-level-label").textContent = LEVELS[state.difficulty]?.label || "TECHVERSE";
    $("#question-counter").innerHTML = `QUESTION ${state.currentIndex + 1} <span>OF ${QUESTION_COUNT}</span>`;
    $("#running-score").textContent = String(score);
    const progressValue = Math.min(QUESTION_COUNT, state.currentIndex + (state.submitted ? 1 : 0));
    $("#progress-fill").style.width = `${(progressValue / QUESTION_COUNT) * 100}%`;
    $("#progress-track").setAttribute("aria-valuenow", String(progressValue));
    $("#question-number").textContent = `Q / ${String(state.currentIndex + 1).padStart(2, "0")}`;
    $("#question-category").textContent = CATEGORY_LABELS[question.type] || String(question.category).toUpperCase();
    $("#question-title").textContent = question.question;

    const snippet = $("#question-snippet");
    if (question.snippet) {
      snippet.hidden = false;
      snippet.querySelector("code").textContent = question.snippet;
      snippet.dataset.language = question.language || "code";
    } else {
      snippet.hidden = true;
      snippet.querySelector("code").textContent = "";
    }

    const answerList = $("#answer-list");
    answerList.replaceChildren();
    const letters = ["A", "B", "C", "D"];
    question.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.setAttribute("aria-pressed", String(state.selectedOption === index));
      button.disabled = state.submitted;
      if (state.selectedOption === index) button.classList.add("is-selected");

      if (state.submitted) {
        if (index === question.answer) button.classList.add("is-correct");
        if (index === state.selectedOption && index !== question.answer) button.classList.add("is-wrong");
      }

      const letter = document.createElement("span");
      letter.className = "answer-letter";
      letter.textContent = letters[index] || String(index + 1);
      const label = document.createElement("span");
      label.className = "answer-text";
      label.textContent = option;
      button.append(letter, label);
      button.addEventListener("click", () => {
        if (state.submitted) return;
        state.selectedOption = index;
        saveSession();
        renderQuiz();
      });
      answerList.append(button);
    });

    const feedback = $("#answer-feedback");
    if (state.submitted) {
      const lastAnswer = state.answers[state.answers.length - 1];
      const isCorrect = Boolean(lastAnswer && lastAnswer.correct);
      feedback.hidden = false;
      feedback.className = `feedback-box${isCorrect ? "" : " feedback-wrong"}`;
      feedback.replaceChildren();

      const symbol = document.createElement("span");
      symbol.className = "feedback-symbol";
      symbol.textContent = isCorrect ? "✓" : "↗";
      const copy = document.createElement("div");
      copy.className = "feedback-copy";
      const title = document.createElement("strong");
      title.textContent = isCorrect ? randomFeedback() : "Close! Here's something cool to know.";
      const explanation = document.createElement("p");
      explanation.textContent = question.explanation;
      copy.append(title, explanation);
      feedback.append(symbol, copy);
    } else {
      feedback.hidden = true;
      feedback.className = "feedback-box";
      feedback.replaceChildren();
    }

    $("#submit-answer").hidden = state.submitted;
    $("#continue-answer").hidden = !state.submitted;
    $("#submit-answer").disabled = state.selectedOption === null;
    $("#choose-hint").textContent = state.submitted ? "NICE WORK — ONE STEP CLOSER" : "PICK THE ANSWER THAT FEELS RIGHT";
    $("#continue-answer").textContent = state.currentIndex === QUESTION_COUNT - 1 ? "SEE MY RESULTS →" : "CONTINUE →";
    $("#continue-answer").setAttribute("aria-label", state.currentIndex === QUESTION_COUNT - 1 ? "See your results" : "Continue to the next question");
  }

  const positiveFeedback = ["Nice one!", "Good catch!", "Look at you go!", "Exactly! Keep that energy.", "You're on a roll!"];
  function randomFeedback() {
    return positiveFeedback[randomNumber(positiveFeedback.length)];
  }

  function submitAnswer() {
    if (state.submitted || state.selectedOption === null) return;
    const question = currentQuestion();
    if (!question) return;

    state.answers.push({
      questionId: question.id,
      selected: state.selectedOption,
      correct: state.selectedOption === question.answer
    });
    state.submitted = true;
    saveSession();
    renderQuiz();
  }

  function continueFromAnswer() {
    if (!state.submitted) return;
    if (state.currentIndex >= QUESTION_COUNT - 1) {
      finishGame();
      return;
    }
    state.currentIndex += 1;
    state.selectedOption = null;
    state.submitted = false;
    saveSession();
    renderQuiz();
    $("#question-title").focus({ preventScroll: true });
  }

  function generateVoucherReference() {
    let value = "";
    for (let i = 0; i < 5; i += 1) value += ALPHABET[randomNumber(ALPHABET.length)];
    return `GDG-${value}`;
  }

  function determineIdentity() {
    const score = scoreNow();
    if (score === QUESTION_COUNT) return "legend";

    const counts = {};
    state.answers.forEach((answer, index) => {
      if (!answer.correct) return;
      const category = state.questions[index].category;
      counts[category] = (counts[category] || 0) + 1;
    });

    const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (!entries.length || entries[0][1] < 2) return "explorer";
    const topCount = entries[0][1];
    const tied = entries.filter((entry) => entry[1] === topCount);
    if (tied.length > 1) return "explorer";

    const category = entries[0][0];
    const mapping = {
      AI: "ai",
      Code: "code",
      Logic: "logic",
      Cybersecurity: "security",
      Hardware: "innovator",
      Tech: "innovator",
      Innovation: "innovator",
      Networking: "innovator",
      Web: "innovator",
      Data: "innovator"
    };
    return mapping[category] || "explorer";
  }

  function performanceMessage(score) {
    if (score <= 1) return "Every expert starts somewhere. Keep exploring!";
    if (score <= 3) return "Nice! You're building your tech instincts.";
    if (score === 4) return "Impressive! You've got some serious tech knowledge.";
    return "PERFECT SCORE! TECH LEGEND STATUS UNLOCKED!";
  }

  function finishGame() {
    if (state.answers.length !== QUESTION_COUNT) return;
    state.identityKey = determineIdentity();
    state.won = scoreNow() >= WINNING_SCORE;
    state.voucher = state.won ? generateVoucherReference() : null;
    setScreen("results");
    renderResults();
  }

  function renderResults() {
    const score = scoreNow();
    const percent = Math.round((score / QUESTION_COUNT) * 100);
    const identity = IDENTITIES[state.identityKey] || IDENTITIES.explorer;
    const perfect = score === QUESTION_COUNT;

    $("#results-title").innerHTML = score >= 4
      ? (perfect ? 'PERFECT<br><span class="gradient-word">ROUND.</span>' : 'NICE<br><span class="gradient-word">WORK.</span>')
      : 'THAT’S A<br><span class="gradient-word">WRAP.</span>';
    $("#results-message").textContent = performanceMessage(score);
    $("#final-score").innerHTML = `0<span>/${QUESTION_COUNT}</span>`;
    $("#score-percent").textContent = `${percent}%`;
    $("#score-meter-fill").style.width = "0%";
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      $("#final-score").innerHTML = `${score}<span>/${QUESTION_COUNT}</span>`;
      $("#score-meter-fill").style.width = `${percent}%`;
    } else {
      const scoreNode = $("#final-score");
      const startedAt = performance.now();
      const duration = 420;
      const countFrame = (now) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const visibleScore = Math.round(score * (1 - Math.pow(1 - progress, 3)));
        scoreNode.innerHTML = `${visibleScore}<span>/${QUESTION_COUNT}</span>`;
        if (progress < 1) window.requestAnimationFrame(countFrame);
      };
      window.requestAnimationFrame(countFrame);
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => { $("#score-meter-fill").style.width = `${percent}%`; });
      });
    }

    $("#identity-icon").textContent = identity.icon;
    $("#identity-icon").style.color = identity.color;
    $("#identity-result-card").style.borderColor = `${identity.color}55`;
    $("#identity-type").textContent = identity.title;
    $("#identity-description").textContent = identity.description;
    $("#identity-result-card .identity-serial").textContent = `TV / ${String(score * 17 + state.currentIndex + 1).padStart(3, "0")}`;

    $("#result-status").innerHTML = `<span class="status-pip"></span> ${state.won ? "VOUCHER UNLOCKED" : "ROUND COMPLETE"}`;
    $("#voucher-panel").hidden = !state.won;
    $("#no-voucher-panel").hidden = state.won;
    if (state.won) {
      $("#voucher-reference").textContent = state.voucher || generateVoucherReference();
      $("#voucher-title").innerHTML = perfect ? "PERFECT ROUND. <span>PRIZE UNLOCKED!</span>" : "YOU DID IT. <span>YOU WON!</span>";
      $("#follow-note").textContent = "Claim your voucher at our table. Following is optional and never a condition for your prize.";
      launchConfetti();
    } else {
      $("#follow-note").textContent = "Following is optional — your result is yours either way.";
    }

    renderReview();
    $("#share-feedback").textContent = "";
    updateHomeVoucherShortcut();
  }

  function renderReview() {
    const list = $("#review-list");
    list.replaceChildren();
    state.questions.forEach((question, index) => {
      const answer = state.answers[index];
      const details = document.createElement("details");
      details.className = "review-item";
      const summary = document.createElement("summary");

      const mark = document.createElement("span");
      mark.className = `review-result-mark${answer && answer.correct ? "" : " wrong"}`;
      mark.textContent = answer && answer.correct ? "✓" : "↗";
      const copy = document.createElement("span");
      copy.className = "review-summary-copy";
      const meta = document.createElement("small");
      meta.textContent = `QUESTION ${String(index + 1).padStart(2, "0")} · ${String(question.category).toUpperCase()}`;
      const title = document.createElement("strong");
      title.textContent = question.question;
      copy.append(meta, title);
      const chevron = document.createElement("span");
      chevron.className = "review-chevron";
      chevron.textContent = "⌄";
      summary.append(mark, copy, chevron);

      const detail = document.createElement("div");
      detail.className = "review-detail";
      const yourAnswer = document.createElement("p");
      yourAnswer.className = `review-answer-line${answer && answer.correct ? " correct-line" : " wrong-line"}`;
      const selectedText = answer && Number.isInteger(answer.selected) ? question.options[answer.selected] : "No answer selected";
      yourAnswer.append(document.createTextNode("Your answer: "));
      const yourStrong = document.createElement("strong");
      yourStrong.textContent = selectedText;
      yourAnswer.append(yourStrong);

      const correctAnswer = document.createElement("p");
      correctAnswer.className = "review-answer-line correct-line";
      correctAnswer.append(document.createTextNode("Correct answer: "));
      const correctStrong = document.createElement("strong");
      correctStrong.textContent = question.options[question.answer];
      correctAnswer.append(correctStrong);

      const explanation = document.createElement("p");
      explanation.className = "review-explanation";
      explanation.textContent = question.explanation;
      detail.append(yourAnswer, correctAnswer);
      if (question.snippet) {
        const code = document.createElement("pre");
        code.className = "code-snippet";
        const codeText = document.createElement("code");
        codeText.textContent = question.snippet;
        code.append(codeText);
        detail.append(code);
      }
      detail.append(explanation);
      details.append(summary, detail);
      list.append(details);
    });
    $("#review-count").textContent = `${state.questions.length} QUESTIONS`;
  }

  function launchConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const panel = $("#voucher-panel");
    $$(".confetti-bit", panel).forEach((node) => node.remove());
    const layer = $(".voucher-confetti", panel);
    if (!layer) return;
    layer.replaceChildren();
    const colors = ["#84f0be", "#75e4f3", "#a99aff", "#ff9bd1", "#f2d47c"];
    for (let i = 0; i < 24; i += 1) {
      const piece = document.createElement("span");
      piece.className = "confetti-bit";
      piece.style.left = `${randomNumber(100)}%`;
      piece.style.background = colors[randomNumber(colors.length)];
      piece.style.animationDelay = `${randomNumber(600)}ms`;
      piece.style.transform = `rotate(${randomNumber(360)}deg)`;
      layer.append(piece);
    }
  }

  function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
    const words = String(text).split(/\s+/);
    let line = "";
    let lineCount = 0;
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      if (ctx.measureText(testLine).width > maxWidth && line) {
        ctx.fillText(line, x, y);
        y += lineHeight;
        lineCount += 1;
        line = word;
        if (lineCount >= maxLines - 1) break;
      } else {
        line = testLine;
      }
    }
    if (line && lineCount < maxLines) ctx.fillText(line, x, y);
  }

  function createScorecardBlob() {
    const score = scoreNow();
    const identity = IDENTITIES[state.identityKey] || IDENTITIES.explorer;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext("2d");
    if (!ctx) return Promise.resolve(null);

    const background = ctx.createLinearGradient(0, 0, 1080, 1350);
    background.addColorStop(0, "#111a32");
    background.addColorStop(.54, "#0b1021");
    background.addColorStop(1, "#1d1535");
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glowA = ctx.createRadialGradient(170, 170, 10, 170, 170, 460);
    glowA.addColorStop(0, "rgba(91, 211, 242, .20)");
    glowA.addColorStop(1, "rgba(91, 211, 242, 0)");
    ctx.fillStyle = glowA;
    ctx.fillRect(0, 0, 1080, 700);

    ctx.strokeStyle = "rgba(159, 183, 245, .09)";
    ctx.lineWidth = 1;
    for (let x = 0; x < 1080; x += 54) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, 1350); ctx.stroke();
    }
    for (let y = 0; y < 1350; y += 54) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(1080, y); ctx.stroke();
    }

    roundedRect(ctx, 64, 64, 952, 1222, 34, "rgba(8, 12, 25, .76)", "rgba(164, 189, 247, .24)");
    ctx.fillStyle = "#78e7f3";
    ctx.font = "700 25px Inter, sans-serif";
    ctx.fillText("✳  GDGoC NDU", 110, 133);
    ctx.fillStyle = "#99a8c4";
    ctx.font = "15px monospace";
    ctx.fillText("TECHVERSE EXPERIENCE", 110, 166);
    ctx.textAlign = "right";
    ctx.fillStyle = "#a99aff";
    ctx.font = "16px monospace";
    ctx.fillText("YOUR ROUND / RECAP", 966, 133);
    ctx.textAlign = "left";

    ctx.fillStyle = "#f3f6ff";
    ctx.font = "700 74px 'Arial', sans-serif";
    ctx.fillText(score === 5 ? "PERFECT ROUND." : "WHAT'S YOUR", 110, 300);
    if (score !== 5) {
      const gradient = ctx.createLinearGradient(110, 330, 760, 415);
      gradient.addColorStop(0, "#7ce6f4");
      gradient.addColorStop(.6, "#9f9cff");
      gradient.addColorStop(1, "#c3a1ff");
      ctx.fillStyle = gradient;
      ctx.font = "700 82px Arial, sans-serif";
      ctx.fillText("TECH IDENTITY?", 110, 392);
    } else {
      ctx.fillStyle = "#a89aff";
      ctx.font = "700 82px Arial, sans-serif";
      ctx.fillText("TECH LEGEND", 110, 392);
    }

    roundedRect(ctx, 110, 465, 860, 282, 25, "rgba(35, 44, 75, .66)", "rgba(157, 178, 241, .22)");
    ctx.fillStyle = identity.color;
    ctx.font = "700 26px Inter, sans-serif";
    ctx.fillText(identity.title, 155, 530);
    ctx.fillStyle = "#f2f5ff";
    ctx.font = "700 115px Arial, sans-serif";
    ctx.fillText(`${score}/5`, 155, 660);
    ctx.fillStyle = "#9cabc7";
    ctx.font = "18px monospace";
    ctx.fillText(`${Math.round(score / QUESTION_COUNT * 100)}% CORRECT`, 470, 652);

    ctx.fillStyle = "#d2daf0";
    ctx.font = "23px Inter, sans-serif";
    wrapCanvasText(ctx, identity.description, 155, 715, 760, 34, 2);

    ctx.fillStyle = "#8b9ab8";
    ctx.font = "16px monospace";
    ctx.fillText("5 FUN QUESTIONS  ·  ONE TECH IDENTITY", 110, 840);
    ctx.fillStyle = "#f0f4ff";
    ctx.font = "600 29px Inter, sans-serif";
    ctx.fillText("What's your tech identity?", 110, 925);
    ctx.fillStyle = "#aab7d0";
    ctx.font = "21px Inter, sans-serif";
    ctx.fillText("Try the challenge and discover yours.", 110, 967);

    roundedRect(ctx, 110, 1045, 860, 122, 19, "rgba(117, 228, 243, .08)", "rgba(117, 228, 243, .24)");
    ctx.fillStyle = "#83e9f4";
    ctx.font = "700 21px Inter, sans-serif";
    ctx.fillText("GDGoC NDU  /  YOUR NEXT TECH COMMUNITY", 145, 1094);
    ctx.fillStyle = "#aab7d0";
    ctx.font = "17px Inter, sans-serif";
    ctx.fillText("Workshops · AI · Coding · Ideas · People", 145, 1134);

    ctx.textAlign = "center";
    ctx.fillStyle = "#7b8baa";
    ctx.font = "15px monospace";
    ctx.fillText("A FUN GAME RESULT — NOT A MEASURE OF YOUR SKILLS OR POTENTIAL", 540, 1230);
    ctx.textAlign = "left";

    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), "image/png"));
  }

  function roundedRect(ctx, x, y, width, height, radius, fill, stroke) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + width, y, x + width, y + height, r);
    ctx.arcTo(x + width, y + height, x, y + height, r);
    ctx.arcTo(x, y + height, x, y, r);
    ctx.arcTo(x, y, x + width, y, r);
    ctx.closePath();
    if (fill) { ctx.fillStyle = fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle = stroke; ctx.stroke(); }
  }

  function shareSummary() {
    const score = scoreNow();
    const identity = IDENTITIES[state.identityKey] || IDENTITIES.explorer;
    return `I got ${score}/5 in the GDGoC NDU Techverse challenge and my fun tech identity is ${identity.title}! What's yours?`;
  }

  async function shareResult() {
    const feedback = $("#share-feedback");
    const text = shareSummary();
    try {
      const blob = await createScorecardBlob();
      if (blob && typeof File !== "undefined") {
        const file = new File([blob], "techverse-result.png", { type: "image/png" });
        if (navigator.canShare && navigator.canShare({ files: [file] }) && navigator.share) {
          await navigator.share({ title: "My Techverse result", text, files: [file] });
          feedback.textContent = "Your result is ready to share.";
          return;
        }
      }
      if (navigator.share) {
        await navigator.share({ title: "My Techverse result", text, url: window.location.href });
        feedback.textContent = "Your result is ready to share.";
        return;
      }
      await copyText(text);
      feedback.textContent = "Result copied — send it to your friends and challenge them!";
    } catch (error) {
      if (error && error.name === "AbortError") return;
      try {
        await copyText(text);
        feedback.textContent = "Result copied — send it to your friends and challenge them!";
      } catch (_) {
        feedback.textContent = text;
      }
    }
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const input = document.createElement("textarea");
    input.value = text;
    input.setAttribute("readonly", "");
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    if (!copied) throw new Error("Clipboard copy is not available.");
  }

  async function downloadResult() {
    const feedback = $("#share-feedback");
    try {
      const blob = await createScorecardBlob();
      if (!blob) throw new Error("Could not create a scorecard.");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "gdgoc-ndu-techverse-result.png";
      document.body.append(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1500);
      feedback.textContent = "Your scorecard has been downloaded. It doesn't include your voucher reference.";
    } catch (_) {
      feedback.textContent = "Your browser couldn't create the image. Use Share My Result to copy your result instead.";
    }
  }

  function handleLevelSelection(button) {
    const level = button.dataset.level;
    if (!LEVELS[level]) return;
    state.difficulty = level;
    $$("[data-level]").forEach((item) => {
      const selected = item === button;
      item.setAttribute("aria-pressed", String(selected));
    });
    $("#begin-quiz").disabled = false;
    saveSession();
  }

  function initialize() {
    restoreSession();

    $("#start-experience").addEventListener("click", () => {
      setScreen("difficulty");
      syncLevelSelection();
      $("#difficulty-title").focus?.({ preventScroll: true });
    });

    $$("[data-go-home]").forEach((button) => button.addEventListener("click", goHome));

    $("#reopen-voucher")?.addEventListener("click", () => {
      if (state.won && state.voucher && state.questions.length === QUESTION_COUNT) {
        setScreen("results");
        renderResults();
      }
    });

    $$("[data-level]").forEach((button) => {
      button.addEventListener("click", () => handleLevelSelection(button));
    });

    $("#begin-quiz").addEventListener("click", () => {
      if (state.difficulty && LEVELS[state.difficulty]) beginNewGame(state.difficulty);
    });

    $("#submit-answer").addEventListener("click", submitAnswer);
    $("#continue-answer").addEventListener("click", continueFromAnswer);

    $("#change-level").addEventListener("click", () => {
      setScreen("difficulty");
      syncLevelSelection();
    });

    $("#play-again").addEventListener("click", () => {
      if (state.difficulty && LEVELS[state.difficulty]) beginNewGame(state.difficulty);
      else { setScreen("difficulty"); syncLevelSelection(); }
    });

    $("#share-result").addEventListener("click", shareResult);
    $("#download-result").addEventListener("click", downloadResult);

    // Restore the screen and interaction state if the page is refreshed during a round.
    setScreen(state.screen || "home");
    if (state.screen === "difficulty") {
      syncLevelSelection();
    } else if (state.screen === "quiz" && state.questions.length === QUESTION_COUNT) {
      renderQuiz();
    } else if (state.screen === "results" && state.questions.length === QUESTION_COUNT) {
      renderResults();
    }
    updateHomeVoucherShortcut();
  }

  function syncLevelSelection() {
    $$("[data-level]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.level === state.difficulty));
    });
    $("#begin-quiz").disabled = !LEVELS[state.difficulty];
  }

  document.addEventListener("DOMContentLoaded", initialize);
})();