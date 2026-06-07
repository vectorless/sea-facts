# 🌊 Ocean Facts

A fun, educational website all about the ocean — facts, quizzes, minigames, readable
short books, and fill-in-the-blank worksheets. Built as a plain static site (HTML, CSS
and vanilla JavaScript) with no build step: just open `index.html` in a browser.

## Pages
- **Home** (`index.html`) — hero, a "Fact of the Day", and links to everything.
- **Facts** (`facts.html`) — browse ocean facts, filter by category.
- **Quizzes** (`quiz.html`) — scored multiple-choice quizzes with instant feedback.
- **Games** (`games.html`) — Memory Match, Which Zone?, and Ocean Cleanup.
- **Books** (`books.html`) — short illustrated reads you flip through page by page.
- **Papers** (`papers.html`) — fill-in-the-blank worksheets that check your answers.

## Adding content
All content lives in the `data/` folder as plain JavaScript files — no build needed:
- `data/facts.js` — facts
- `data/quizzes.js` — quizzes
- `data/games.js` — minigame content
- `data/books.js` — books
- `data/worksheets.js` — worksheets

Append a new object to the relevant array and reload — the pages build themselves.

## Running locally
Just open `index.html`, or serve the folder:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080/
```
