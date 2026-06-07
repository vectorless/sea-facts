/* ===== Ask the Ocean — a free, offline "AI" assistant =====
   No API key, no network. It answers by scoring the question against the
   facts database (title + text + category) and returning the best match.
   It also recognises greetings, thanks, and "tell me a fact" style intents. */
(function () {
  "use strict";

  var FACTS = window.OCEAN_FACTS || [];

  var CATEGORY_LABELS = {
    creatures: "creatures",
    depths: "the deep sea",
    reefs: "coral reefs",
    "waves-tides": "waves and tides",
    conservation: "ocean conservation",
  };

  // Words too common to be useful when matching.
  var STOPWORDS = {
    the: 1, a: 1, an: 1, is: 1, are: 1, was: 1, were: 1, of: 1, to: 1, in: 1,
    on: 1, at: 1, and: 1, or: 1, do: 1, does: 1, did: 1, how: 1, what: 1,
    why: 1, when: 1, where: 1, who: 1, which: 1, can: 1, you: 1, me: 1, i: 1,
    tell: 1, about: 1, for: 1, with: 1, that: 1, this: 1, it: 1, its: 1,
    there: 1, here: 1, some: 1, any: 1, much: 1, many: 1, more: 1, most: 1,
    have: 1, has: 1, be: 1, my: 1, your: 1, please: 1, know: 1, ocean: 1,
    sea: 1, oceans: 1, seas: 1,
  };

  function tokenize(str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  }

  // Lightweight singular form so "whales" matches "whale".
  function stem(word) {
    if (word.length > 4 && /ies$/.test(word)) return word.slice(0, -3) + "y";
    if (word.length > 3 && /es$/.test(word)) return word.slice(0, -2);
    if (word.length > 3 && /s$/.test(word)) return word.slice(0, -1);
    return word;
  }

  function keywords(str) {
    var out = [];
    tokenize(str).forEach(function (w) {
      if (STOPWORDS[w]) return;
      out.push(stem(w));
    });
    return out;
  }

  // Maps a question word to extra fact keywords, so e.g. "important" can find
  // the facts about oxygen and carbon even though they never say "important".
  var SYNONYMS = {
    important: ["oxygen", "produce", "breathe", "carbon"],
    matter: ["oxygen", "produce", "carbon"],
    oxygen: ["produce", "breathe"],
    breathe: ["oxygen"],
    big: ["large", "largest"],
    biggest: ["large", "largest"],
    large: ["largest"],
    huge: ["large", "largest"],
    pollution: ["plastic"],
    trash: ["plastic"],
    plastic: ["pollution"],
    warming: ["acidic", "carbon", "bleaching", "warm"],
    warm: ["bleaching", "acidic"],
    climate: ["carbon", "acidic", "warm"],
    danger: ["plastic", "bleaching", "acidic"],
    dangerous: ["plastic", "bleaching"],
    glow: ["bioluminescence", "light"],
    light: ["bioluminescence", "sunlight"],
    tide: ["moon", "fundy"],
    wave: ["wind", "tsunami"],
    fast: ["mantis", "shrimp"],
    smart: ["octopus"],
  };

  // Query keywords plus their synonyms, de-duplicated.
  function expandQuery(question) {
    var seen = {}, out = [];
    function add(k) { if (k && !seen[k]) { seen[k] = 1; out.push(k); } }
    keywords(question).forEach(function (k) {
      add(k);
      (SYNONYMS[k] || []).forEach(function (syn) { add(stem(syn)); });
    });
    return out;
  }

  // Pre-index each fact: a map of keyword -> weight (title words count more).
  var INDEX = FACTS.map(function (fact) {
    var weights = {};
    keywords(fact.title).forEach(function (k) { weights[k] = (weights[k] || 0) + 3; });
    keywords(fact.text).forEach(function (k) { weights[k] = (weights[k] || 0) + 1; });
    keywords(CATEGORY_LABELS[fact.category] || fact.category).forEach(function (k) {
      weights[k] = (weights[k] || 0) + 2;
    });
    return { fact: fact, weights: weights };
  });

  function bestMatches(question) {
    var qk = expandQuery(question);
    if (!qk.length) return [];
    var scored = INDEX.map(function (entry) {
      var score = 0, hits = 0;
      qk.forEach(function (k) {
        if (entry.weights[k]) { score += entry.weights[k]; hits++; }
      });
      return { fact: entry.fact, score: score, hits: hits };
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.filter(function (s) { return s.score > 0; });
  }

  function randomFact() {
    return FACTS[Math.floor(Math.random() * FACTS.length)];
  }

  // ---------- Intents ----------
  function detectIntent(text) {
    var t = text.toLowerCase().trim();
    if (/^(hi|hey|hello|yo|howdy|hiya|sup)\b/.test(t)) return "greeting";
    if (/(thank|thanks|cheers|ty)\b/.test(t)) return "thanks";
    if (/\b(bye|goodbye|see ya|cya)\b/.test(t)) return "bye";
    if (/(what can you do|who are you|help|how does this work)/.test(t)) return "help";
    if (/(surprise me|surprise|random|tell me something|a fact|fun fact|cool fact|interesting fact)/.test(t)) return "random";
    return "question";
  }

  function answerFor(text) {
    var intent = detectIntent(text);

    if (intent === "greeting")
      return "Hi there! 🌊 Ask me anything about the ocean — try “How deep is the ocean?” or “Tell me about octopuses.”";
    if (intent === "thanks")
      return "You're very welcome! 🐬 Ask me another one whenever you like.";
    if (intent === "bye")
      return "Catch you later — keep our seas blue! 💙";
    if (intent === "help")
      return "I'm a little offline ocean helper. Type a question and I'll dig through my facts to find the best answer. Topics I know: sea creatures, the deep sea, coral reefs, waves and tides, and conservation.";
    if (intent === "random") {
      var f = randomFact();
      return "Here's one for you 🐚 — " + f.title + ". " + f.text;
    }

    // General question → search the facts.
    var matches = bestMatches(text);
    if (!matches.length) {
      var r = randomFact();
      return "Hmm, I don't have a fact that fits that one. 🪼 I know about sea creatures, " +
        "the deep sea, reefs, tides and conservation. Here's something interesting anyway: " +
        r.title + " — " + r.text;
    }

    var top = matches[0];
    // Frame low-confidence answers honestly instead of stating them as gospel.
    var lead = top.score <= 2
      ? "I'm not totally sure, but this might be related — "
      : "🐳 ";
    var reply = lead + top.fact.title + ". " + top.fact.text;

    // If a second match is also strong, offer it as a follow-up.
    if (matches[1] && matches[1].score >= Math.max(3, top.score * 0.6)) {
      reply += "\n\nYou might also like: " + matches[1].fact.title + ".";
    }
    return reply;
  }

  // ---------- Chat UI ----------
  function addMessage(text, who) {
    var chat = document.getElementById("chat");
    var msg = document.createElement("div");
    msg.className = "msg msg--" + who;
    // Preserve line breaks in bot replies.
    text.split("\n").forEach(function (line, i) {
      if (i) msg.appendChild(document.createElement("br"));
      msg.appendChild(document.createTextNode(line));
    });
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
    return msg;
  }

  function botReply(question) {
    // Brief "typing" pause so it feels conversational.
    var typing = addMessage("…", "bot");
    typing.classList.add("msg--typing");
    setTimeout(function () {
      typing.remove();
      addMessage(answerFor(question), "bot");
    }, 350);
  }

  var SUGGESTIONS = [
    "How deep is the ocean?",
    "Tell me about octopuses",
    "What is coral bleaching?",
    "Why are oceans important?",
    "Surprise me!",
  ];

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("chat-form");
    if (!form) return;
    var input = document.getElementById("chat-input");

    addMessage(
      "Hi! I'm the Ocean helper. 🌊 Ask me anything about the sea, or tap a suggestion below.",
      "bot"
    );

    var chips = document.getElementById("chips");
    SUGGESTIONS.forEach(function (s) {
      var chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip";
      chip.textContent = s;
      chip.addEventListener("click", function () {
        addMessage(s, "user");
        botReply(s);
      });
      chips.appendChild(chip);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim();
      if (!q) return;
      addMessage(q, "user");
      input.value = "";
      botReply(q);
    });
  });
})();
