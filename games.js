/* ===== Ocean Facts — minigames =====
   Runs only on games.html (guarded by element presence). Three games:
   Memory Match, Which Zone?, and Ocean Cleanup. */
(function () {
  "use strict";

  var DATA = window.OCEAN_GAMES;
  if (!DATA) return;

  function $(id) { return document.getElementById(id); }
  function el(tag, className, html) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  var SCREENS = [
    "games-list-screen",
    "game-memory-screen",
    "game-zones-screen",
    "game-cleanup-screen",
  ];
  function show(id) {
    SCREENS.forEach(function (s) {
      var node = $(s);
      if (node) node.classList.toggle("hidden", s !== id);
    });
  }

  // ============ Memory Match ============
  var mMoves, mFound, mFirst, mLock;

  function startMemory() {
    mMoves = 0; mFound = 0; mFirst = null; mLock = false;
    $("memory-moves").textContent = "0";
    $("memory-found").textContent = "0";
    $("memory-log").innerHTML = "";
    $("memory-win").classList.add("hidden");

    var pairs = DATA.memory.slice(0, 8); // 8 pairs = 16 cards
    var deck = shuffle(pairs.concat(pairs));
    var grid = $("memory-grid");
    grid.innerHTML = "";

    deck.forEach(function (creature) {
      var card = el("button", "memory-card", "<span class='memory-face'>🌊</span>");
      card.dataset.name = creature.name;
      card.dataset.emoji = creature.emoji;
      card.dataset.fact = creature.fact;
      card.addEventListener("click", function () { flipCard(card); });
      grid.appendChild(card);
    });
  }

  function flipCard(card) {
    if (mLock || card.classList.contains("matched") || card === mFirst) return;
    if (card.classList.contains("flipped")) return;

    card.classList.add("flipped");
    card.querySelector(".memory-face").textContent = card.dataset.emoji;

    if (!mFirst) { mFirst = card; return; }

    // Second card flipped — count the move and check.
    mMoves++;
    $("memory-moves").textContent = mMoves;

    if (mFirst.dataset.name === card.dataset.name) {
      card.classList.add("matched");
      mFirst.classList.add("matched");
      mFound++;
      $("memory-found").textContent = mFound;
      logMatch(card.dataset.emoji, card.dataset.name, card.dataset.fact);
      mFirst = null;
      if (mFound === DATA.memory.slice(0, 8).length) {
        $("memory-final-moves").textContent = mMoves;
        $("memory-win").classList.remove("hidden");
      }
    } else {
      mLock = true;
      var first = mFirst;
      mFirst = null;
      setTimeout(function () {
        [first, card].forEach(function (c) {
          c.classList.remove("flipped");
          c.querySelector(".memory-face").textContent = "🌊";
        });
        mLock = false;
      }, 850);
    }
  }

  function logMatch(emoji, name, fact) {
    var entry = el("div", "log-entry",
      "<strong>" + emoji + " " + name + "</strong> — " + fact);
    var log = $("memory-log");
    log.insertBefore(entry, log.firstChild);
  }

  // ============ Which Zone? ============
  var zList, zIndex, zScore, zAnswered;
  var ZONE_NAMES = {
    sunlight: "☀️ Sunlight Zone",
    twilight: "🌒 Twilight Zone",
    midnight: "🌑 Midnight Zone",
  };

  function startZones() {
    zList = shuffle(DATA.zones);
    zIndex = 0; zScore = 0;
    $("zones-play").classList.remove("hidden");
    $("zones-results").classList.add("hidden");
    renderZone();
  }

  function renderZone() {
    zAnswered = false;
    var q = zList[zIndex];
    $("zones-progress").textContent =
      "Creature " + (zIndex + 1) + " of " + zList.length + " · Score: " + zScore;
    $("zones-bar").style.width = (zIndex / zList.length) * 100 + "%";
    $("zones-prompt").innerHTML =
      "<span class='zones-emoji'>" + q.emoji + "</span>" +
      "<span>Where does the <strong>" + q.item + "</strong> live?</span>";
    $("zones-feedback").textContent = "";
    $("zones-feedback").className = "quiz-feedback";
    $("zones-next").classList.add("hidden");
    var btns = document.querySelectorAll(".zone-btn");
    Array.prototype.forEach.call(btns, function (b) {
      b.disabled = false;
      b.classList.remove("correct", "wrong");
    });
  }

  function answerZone(btn) {
    if (zAnswered) return;
    zAnswered = true;
    var q = zList[zIndex];
    var chosen = btn.dataset.zone;
    var btns = document.querySelectorAll(".zone-btn");
    Array.prototype.forEach.call(btns, function (b) {
      b.disabled = true;
      if (b.dataset.zone === q.zone) b.classList.add("correct");
    });
    var fb = $("zones-feedback");
    if (chosen === q.zone) {
      zScore++;
      fb.className = "quiz-feedback right";
      fb.textContent = "Correct! " + q.explain;
    } else {
      btn.classList.add("wrong");
      fb.className = "quiz-feedback nope";
      fb.textContent = "It's the " + ZONE_NAMES[q.zone] + ". " + q.explain;
    }
    var next = $("zones-next");
    next.textContent = zIndex + 1 < zList.length ? "Next" : "See results";
    next.classList.remove("hidden");
  }

  function nextZone() {
    zIndex++;
    if (zIndex < zList.length) { renderZone(); return; }
    $("zones-play").classList.add("hidden");
    var res = $("zones-results");
    res.classList.remove("hidden");
    $("zones-score").textContent = zScore + " / " + zList.length;
    var pct = zScore / zList.length;
    $("zones-rank").textContent =
      pct === 1 ? "🐋 Deep-sea naturalist!" :
      pct >= 0.6 ? "🐠 Sharp diver — well done!" :
      "🐚 Keep exploring the depths!";
  }

  // ============ Ocean Cleanup ============
  var cScore, cTime, cSpawnTimer, cClockTimer, cActive;

  function startCleanup() {
    $("cleanup-start").classList.add("hidden");
    $("cleanup-results").classList.add("hidden");
    cleanupClear();
    cScore = 0; cTime = 30; cActive = true;
    $("cleanup-score").textContent = "0";
    $("cleanup-time").textContent = "30";

    cSpawnTimer = setInterval(spawnItem, 650);
    cClockTimer = setInterval(function () {
      cTime--;
      $("cleanup-time").textContent = cTime;
      if (cTime <= 0) endCleanup();
    }, 1000);
  }

  function cleanupClear() {
    if (cSpawnTimer) clearInterval(cSpawnTimer);
    if (cClockTimer) clearInterval(cClockTimer);
    cSpawnTimer = cClockTimer = null;
    var area = $("cleanup-area");
    // Remove spawned items but keep the start/overlay element.
    Array.prototype.slice.call(area.querySelectorAll(".cleanup-item")).forEach(function (n) {
      n.remove();
    });
  }

  function spawnItem() {
    if (!cActive) return;
    var area = $("cleanup-area");
    var isTrash = Math.random() < 0.65;
    var pool = isTrash ? DATA.trash : DATA.sealife;
    var emoji = pool[Math.floor(Math.random() * pool.length)];

    var item = el("button", "cleanup-item", emoji);
    item.dataset.trash = isTrash ? "1" : "0";
    // Random position within the area (leave a margin for the 48px item).
    var maxX = area.clientWidth - 56;
    var maxY = area.clientHeight - 56;
    item.style.left = Math.max(8, Math.floor(Math.random() * maxX)) + "px";
    item.style.top = Math.max(8, Math.floor(Math.random() * maxY)) + "px";

    item.addEventListener("click", function () {
      if (!cActive || item.dataset.done) return;
      item.dataset.done = "1";
      if (item.dataset.trash === "1") {
        cScore++;
        item.classList.add("hit-good");
      } else {
        cScore = Math.max(0, cScore - 1);
        item.classList.add("hit-bad");
      }
      $("cleanup-score").textContent = cScore;
      setTimeout(function () { item.remove(); }, 200);
    });

    area.appendChild(item);
    // Auto-remove if not tapped in time.
    setTimeout(function () { if (item.parentNode) item.remove(); }, 1400);
  }

  function endCleanup() {
    cActive = false;
    cleanupClear();
    $("cleanup-results").classList.remove("hidden");
    $("cleanup-final").textContent = cScore;
    var rank, tip;
    if (cScore >= 25) {
      rank = "🌟 Ocean Guardian!";
    } else if (cScore >= 12) {
      rank = "♻️ Reef Protector";
    } else {
      rank = "🐚 Beach Helper";
    }
    $("cleanup-rank").textContent = rank;
    $("cleanup-tip").textContent =
      "Did you know? Around 8–11 million tonnes of plastic enter the ocean every year. " +
      "Sea creatures often mistake it for food — so in real life, never grab the wildlife, just the trash.";
  }

  // ============ Wiring ============
  document.addEventListener("DOMContentLoaded", function () {
    var list = $("games-list");
    if (!list) return; // not on games page

    // Launch buttons
    Array.prototype.forEach.call(document.querySelectorAll(".game-card"), function (card) {
      card.addEventListener("click", function () {
        var game = card.dataset.game;
        if (game === "memory") { show("game-memory-screen"); startMemory(); }
        else if (game === "zones") { show("game-zones-screen"); startZones(); }
        else if (game === "cleanup") { show("game-cleanup-screen"); resetCleanupIntro(); }
      });
    });

    // Back buttons (also stop any running cleanup timers)
    Array.prototype.forEach.call(document.querySelectorAll(".back-to-games"), function (b) {
      b.addEventListener("click", function () {
        cActive = false;
        cleanupClear();
        show("games-list-screen");
      });
    });

    // Memory
    $("memory-replay").addEventListener("click", startMemory);

    // Zones
    Array.prototype.forEach.call(document.querySelectorAll(".zone-btn"), function (b) {
      b.addEventListener("click", function () { answerZone(b); });
    });
    $("zones-next").addEventListener("click", nextZone);
    $("zones-replay").addEventListener("click", startZones);

    // Cleanup
    $("cleanup-go").addEventListener("click", startCleanup);
    $("cleanup-replay").addEventListener("click", startCleanup);
  });

  function resetCleanupIntro() {
    cActive = false;
    cleanupClear();
    $("cleanup-results").classList.add("hidden");
    $("cleanup-start").classList.remove("hidden");
    $("cleanup-score").textContent = "0";
    $("cleanup-time").textContent = "30";
  }
})();
