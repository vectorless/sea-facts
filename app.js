/* ===== Ocean Facts — shared front-end logic =====
   Loaded on every page. Each section runs only if its target element exists,
   so one file can drive the home, facts and quiz pages. */
(function () {
  "use strict";

  var FACTS = window.OCEAN_FACTS || [];
  var QUIZZES = window.OCEAN_QUIZZES || [];

  // Human-friendly labels for the category keys used in the data.
  var CATEGORY_LABELS = {
    creatures: "Creatures",
    depths: "The Deep",
    reefs: "Reefs",
    "waves-tides": "Waves & Tides",
    conservation: "Conservation",
  };

  function labelFor(category) {
    return CATEGORY_LABELS[category] || category;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  // ---------- Home: Fact of the day ----------
  function renderFactOfDay() {
    var container = document.getElementById("fact-of-day");
    if (!container || !FACTS.length) return;

    // Stable per calendar day: index by day-of-year.
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / 86400000);
    var fact = FACTS[dayOfYear % FACTS.length];

    container.innerHTML = "";
    container.appendChild(el("span", "tag", labelFor(fact.category)));
    container.appendChild(el("h3", null, fact.title));
    container.appendChild(el("p", null, fact.text));
  }

  // ---------- Facts page: grid + filters ----------
  var activeCategory = "all";

  function renderFacts(category) {
    var grid = document.getElementById("facts-grid");
    if (!grid) return;
    grid.innerHTML = "";

    var list = FACTS.filter(function (f) {
      return category === "all" || f.category === category;
    });

    list.forEach(function (fact) {
      var card = el("article", "card");
      card.appendChild(el("span", "tag", labelFor(fact.category)));
      card.appendChild(el("h3", null, fact.title));
      card.appendChild(el("p", null, fact.text));
      grid.appendChild(card);
    });
  }

  function setupCategoryFilters() {
    var filters = document.getElementById("filters");
    if (!filters) return;

    // Derive categories present in the data, preserving a sensible order.
    var order = ["creatures", "depths", "reefs", "waves-tides", "conservation"];
    var present = order.filter(function (c) {
      return FACTS.some(function (f) { return f.category === c; });
    });

    var keys = ["all"].concat(present);
    keys.forEach(function (key) {
      var btn = el("button", "filter-btn", key === "all" ? "All" : labelFor(key));
      if (key === activeCategory) btn.classList.add("active");
      btn.addEventListener("click", function () {
        activeCategory = key;
        Array.prototype.forEach.call(filters.children, function (c) {
          c.classList.toggle("active", c === btn);
        });
        renderFacts(key);
      });
      filters.appendChild(btn);
    });
  }

  // ---------- Quiz page ----------
  var currentQuiz = null;
  var currentIndex = 0;
  var score = 0;
  var answered = false;

  function show(id) {
    ["quiz-list-screen", "quiz-play-screen", "quiz-results-screen"].forEach(function (s) {
      var node = document.getElementById(s);
      if (node) node.classList.toggle("hidden", s !== id);
    });
  }

  function renderQuizList() {
    var list = document.getElementById("quiz-list");
    if (!list) return;
    list.innerHTML = "";

    QUIZZES.forEach(function (quiz) {
      var card = el("article", "card");
      card.style.cursor = "pointer";
      card.appendChild(el("h3", null, quiz.title));
      card.appendChild(el("p", null, quiz.description));
      var count = el("p", "muted", quiz.questions.length + " questions");
      count.style.marginTop = "0.75rem";
      count.style.fontWeight = "600";
      card.appendChild(count);
      card.addEventListener("click", function () { startQuiz(quiz.id); });
      list.appendChild(card);
    });
  }

  function startQuiz(id) {
    currentQuiz = QUIZZES.filter(function (q) { return q.id === id; })[0];
    if (!currentQuiz) return;
    currentIndex = 0;
    score = 0;
    document.getElementById("quiz-title").textContent = currentQuiz.title;
    show("quiz-play-screen");
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    var q = currentQuiz.questions[currentIndex];
    var total = currentQuiz.questions.length;

    document.getElementById("quiz-progress").textContent =
      "Question " + (currentIndex + 1) + " of " + total + " · Score: " + score;
    document.getElementById("quiz-bar-fill").style.width =
      (currentIndex / total) * 100 + "%";
    document.getElementById("question-text").textContent = q.q;

    var feedback = document.getElementById("feedback");
    feedback.textContent = "";
    feedback.className = "quiz-feedback";

    document.getElementById("next-btn").classList.add("hidden");

    var optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";
    q.options.forEach(function (opt, i) {
      var btn = el("button", "option", opt);
      btn.addEventListener("click", function () { handleAnswer(i, btn); });
      optionsBox.appendChild(btn);
    });
  }

  function handleAnswer(choiceIndex, btn) {
    if (answered) return;
    answered = true;

    var q = currentQuiz.questions[currentIndex];
    var correct = q.answer;
    var optionButtons = document.getElementById("options").children;
    var feedback = document.getElementById("feedback");

    // Lock all options and mark correct/wrong.
    Array.prototype.forEach.call(optionButtons, function (b, i) {
      b.disabled = true;
      if (i === correct) b.classList.add("correct");
    });

    if (choiceIndex === correct) {
      score++;
      feedback.textContent = "Correct! 🐳";
      feedback.className = "quiz-feedback right";
    } else {
      btn.classList.add("wrong");
      feedback.textContent = "Not quite — the right answer is highlighted.";
      feedback.className = "quiz-feedback nope";
    }

    var nextBtn = document.getElementById("next-btn");
    nextBtn.textContent =
      currentIndex + 1 < currentQuiz.questions.length ? "Next" : "See results";
    nextBtn.classList.remove("hidden");
  }

  function nextQuestion() {
    currentIndex++;
    if (currentIndex < currentQuiz.questions.length) {
      renderQuestion();
    } else {
      showResults(score, currentQuiz.questions.length);
    }
  }

  function showResults(finalScore, total) {
    show("quiz-results-screen");
    document.getElementById("result-score").textContent = finalScore + " / " + total;

    var pct = finalScore / total;
    var rank, message;
    if (pct === 1) {
      rank = "🏆 Master of the Deep";
      message = "A perfect score! The ocean has no secrets from you.";
    } else if (pct >= 0.8) {
      rank = "🐋 Deep Sea Explorer";
      message = "Impressive — you really know your way around the blue.";
    } else if (pct >= 0.6) {
      rank = "🐠 Reef Wanderer";
      message = "Solid work! A little more diving and you'll be an expert.";
    } else if (pct >= 0.4) {
      rank = "🐚 Tide Pool Beginner";
      message = "A decent start — explore the facts and try again!";
    } else {
      rank = "🌊 Just Getting Your Feet Wet";
      message = "The deep awaits! Browse the facts, then take another dip.";
    }
    document.getElementById("result-rank").textContent = rank;
    document.getElementById("result-message").textContent = message;
  }

  function setupQuizControls() {
    var nextBtn = document.getElementById("next-btn");
    if (!nextBtn) return; // not on the quiz page
    nextBtn.addEventListener("click", nextQuestion);
    document.getElementById("retry-btn").addEventListener("click", function () {
      startQuiz(currentQuiz.id);
    });
    document.getElementById("back-btn").addEventListener("click", function () {
      show("quiz-list-screen");
    });
  }

  // ---------- Boot ----------
  document.addEventListener("DOMContentLoaded", function () {
    renderFactOfDay();      // home
    setupCategoryFilters(); // facts
    renderFacts(activeCategory);
    renderQuizList();       // quiz
    setupQuizControls();    // quiz
  });
})();
