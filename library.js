/* ===== Ocean Facts — books reader + fill-in worksheets =====
   Loaded on books.html and papers.html; each part runs only if its
   list element is present. */
(function () {
  "use strict";

  var BOOKS = window.OCEAN_BOOKS || [];
  var WORKSHEETS = window.OCEAN_WORKSHEETS || [];

  function $(id) { return document.getElementById(id); }
  function el(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  // ============ Books ============
  var currentBook = null;
  var pageIndex = 0;

  function renderBookList() {
    var list = $("books-list");
    if (!list) return;
    list.innerHTML = "";
    BOOKS.forEach(function (book) {
      var card = el("article", "card book-card");
      card.appendChild(el("span", "book-cover-emoji", book.emoji));
      card.appendChild(el("h3", null, book.title));
      card.appendChild(el("p", null, book.blurb));
      var meta = el("p", "muted", book.pages.length + " pages");
      meta.style.marginTop = "0.75rem";
      meta.style.fontWeight = "600";
      card.appendChild(meta);
      card.addEventListener("click", function () { openBook(book.id); });
      list.appendChild(card);
    });
  }

  function openBook(id) {
    currentBook = BOOKS.filter(function (b) { return b.id === id; })[0];
    if (!currentBook) return;
    pageIndex = 0;
    $("books-list-screen").classList.add("hidden");
    $("book-reader-screen").classList.remove("hidden");
    $("book-title").textContent = currentBook.title;
    renderPage();
  }

  function renderPage() {
    var page = currentBook.pages[pageIndex];
    var total = currentBook.pages.length;
    $("book-art").textContent = page.art;
    $("book-text").textContent = page.text;
    $("book-progress").textContent = "Page " + (pageIndex + 1) + " of " + total;
    $("book-prev").disabled = pageIndex === 0;
    var next = $("book-next");
    next.textContent = pageIndex + 1 < total ? "Next →" : "Finish";
  }

  function changePage(delta) {
    var total = currentBook.pages.length;
    if (pageIndex + delta >= total) { closeBook(); return; }
    pageIndex = Math.max(0, Math.min(total - 1, pageIndex + delta));
    renderPage();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeBook() {
    $("book-reader-screen").classList.add("hidden");
    $("books-list-screen").classList.remove("hidden");
  }

  // ============ Worksheets ============
  var currentSheet = null;

  function renderPaperList() {
    var list = $("papers-list");
    if (!list) return;
    list.innerHTML = "";
    WORKSHEETS.forEach(function (sheet) {
      var card = el("article", "card book-card");
      card.appendChild(el("span", "book-cover-emoji", "📝"));
      card.appendChild(el("h3", null, sheet.title));
      card.appendChild(el("p", null, sheet.description));
      var meta = el("p", "muted", sheet.items.length + " blanks to fill");
      meta.style.marginTop = "0.75rem";
      meta.style.fontWeight = "600";
      card.appendChild(meta);
      card.addEventListener("click", function () { openSheet(sheet.id); });
      list.appendChild(card);
    });
  }

  function openSheet(id) {
    currentSheet = WORKSHEETS.filter(function (s) { return s.id === id; })[0];
    if (!currentSheet) return;
    $("papers-list-screen").classList.add("hidden");
    $("paper-screen").classList.remove("hidden");
    $("paper-title").textContent = currentSheet.title;
    $("paper-desc").textContent = currentSheet.description;
    renderSheet();
  }

  function renderSheet() {
    var ol = $("paper-items");
    ol.innerHTML = "";
    currentSheet.items.forEach(function (item, i) {
      var li = el("li", "paper-item");
      li.appendChild(document.createTextNode(item.before));
      var input = el("input", "paper-blank");
      input.type = "text";
      input.autocomplete = "off";
      input.setAttribute("aria-label", "answer " + (i + 1));
      input.dataset.index = i;
      li.appendChild(input);
      li.appendChild(document.createTextNode(item.after));
      ol.appendChild(li);
    });
    clearFeedback();
  }

  function clearFeedback() {
    var fb = $("paper-feedback");
    fb.textContent = "";
    fb.className = "quiz-feedback";
  }

  function normalize(s) {
    return String(s).trim().toLowerCase().replace(/%$/, "").replace(/\s+/g, " ");
  }

  function isCorrect(value, answers) {
    var v = normalize(value);
    if (!v) return false;
    return answers.some(function (a) { return normalize(a) === v; });
  }

  function checkSheet() {
    var inputs = $("paper-items").querySelectorAll(".paper-blank");
    var correct = 0;
    Array.prototype.forEach.call(inputs, function (input) {
      var item = currentSheet.items[+input.dataset.index];
      input.classList.remove("right", "wrong");
      if (isCorrect(input.value, item.answers)) {
        input.classList.add("right");
        correct++;
      } else {
        input.classList.add("wrong");
      }
    });
    var total = currentSheet.items.length;
    var fb = $("paper-feedback");
    fb.textContent = "You got " + correct + " of " + total + " correct" +
      (correct === total ? " — perfect! 🐳" : ". Try the red ones again, or peek at the answers.");
    fb.className = "quiz-feedback " + (correct === total ? "right" : "nope");
  }

  function revealAnswers() {
    var inputs = $("paper-items").querySelectorAll(".paper-blank");
    Array.prototype.forEach.call(inputs, function (input) {
      var item = currentSheet.items[+input.dataset.index];
      input.value = item.answers[0];
      input.classList.remove("wrong");
      input.classList.add("right");
    });
    var fb = $("paper-feedback");
    fb.textContent = "Answers filled in — now you know! Hit Reset to try again from scratch.";
    fb.className = "quiz-feedback";
  }

  function resetSheet() {
    renderSheet();
  }

  function closeSheet() {
    $("paper-screen").classList.add("hidden");
    $("papers-list-screen").classList.remove("hidden");
  }

  // ============ Wiring ============
  document.addEventListener("DOMContentLoaded", function () {
    // Books page
    if ($("books-list")) {
      renderBookList();
      $("book-prev").addEventListener("click", function () { changePage(-1); });
      $("book-next").addEventListener("click", function () { changePage(1); });
      $("book-back").addEventListener("click", closeBook);
    }
    // Papers page
    if ($("papers-list")) {
      renderPaperList();
      $("paper-check").addEventListener("click", checkSheet);
      $("paper-reveal").addEventListener("click", revealAnswers);
      $("paper-reset").addEventListener("click", resetSheet);
      $("paper-back").addEventListener("click", closeSheet);
    }
  });
})();
