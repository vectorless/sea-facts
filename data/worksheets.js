// Fill-in-the-blank worksheets. Each item is one sentence with a blank.
// `answers` lists accepted answers (matched case-insensitively, trimmed).
// To add a worksheet: append { id, title, description, items: [{ before, answers, after }] }.
window.OCEAN_WORKSHEETS = [
  {
    id: "ocean-basics",
    title: "Ocean Basics",
    description: "Fill in the blanks about the big picture of our blue planet.",
    items: [
      { before: "The blue whale is the ", answers: ["largest", "biggest"], after: " animal that has ever lived." },
      { before: "Marine plants make over half of the ", answers: ["oxygen"], after: " we breathe." },
      { before: "The ocean holds about ", answers: ["97", "97%"], after: " percent of all the water on Earth." },
      { before: "Tides are caused mainly by the gravity of the ", answers: ["moon"], after: "." },
      { before: "Most ordinary waves are created by the ", answers: ["wind"], after: " blowing across the surface." },
    ],
  },
  {
    id: "deep-sea-detective",
    title: "Deep-Sea Detective",
    description: "How much do you remember about the darkest depths? Fill in the gaps.",
    items: [
      { before: "The deepest known point in the ocean is the Challenger ", answers: ["deep"], after: ", almost 11 km down." },
      { before: "Below about 1,000 metres, the only light comes from animals through ", answers: ["bioluminescence"], after: "." },
      { before: "The ", answers: ["anglerfish", "angler fish"], after: " uses a glowing lure to attract its prey." },
      { before: "Around hydrothermal vents, bacteria make food using chemicals in a process called ", answers: ["chemosynthesis"], after: "." },
      { before: "Scientists say that over ", answers: ["80", "80%"], after: " percent of the ocean is still unexplored." },
    ],
  },
  {
    id: "reefs-conservation",
    title: "Reefs & Conservation",
    description: "Test your reef and eco knowledge by filling in the blanks.",
    items: [
      { before: "Coral reefs are built by tiny animals called coral ", answers: ["polyps", "polyp"], after: "." },
      { before: "Reefs support about ", answers: ["25", "25%", "a quarter"], after: " percent of all marine species." },
      { before: "When corals get too hot they turn white in a process called ", answers: ["bleaching"], after: "." },
      { before: "Every year, millions of tonnes of ", answers: ["plastic"], after: " enter the ocean." },
      { before: "Mangroves and seagrass store carbon and are called ", answers: ["blue carbon", "blue-carbon"], after: " habitats." },
    ],
  },
];
