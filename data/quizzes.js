// Quiz data. To add a quiz, append an object below.
// Each question: { q, options: [4 strings], answer: index of correct option (0-3) }.
window.OCEAN_QUIZZES = [
  {
    id: "creatures",
    title: "Ocean Creatures",
    description: "From immortal jellyfish to record-breaking whales — how well do you know the locals?",
    questions: [
      {
        q: "What is the largest animal that has ever lived?",
        options: ["African elephant", "Blue whale", "Argentinosaurus", "Whale shark"],
        answer: 1,
      },
      {
        q: "How many hearts does an octopus have?",
        options: ["One", "Two", "Three", "Four"],
        answer: 2,
      },
      {
        q: "Which animal is known as the 'immortal jellyfish'?",
        options: ["Box jellyfish", "Moon jelly", "Turritopsis dohrnii", "Portuguese man o' war"],
        answer: 2,
      },
      {
        q: "In seahorses, who carries and gives birth to the young?",
        options: ["The female", "The male", "Both equally", "Neither — eggs float free"],
        answer: 1,
      },
      {
        q: "The mantis shrimp's strike is so fast it causes what effect?",
        options: ["An electric shock", "Cavitation bubbles", "A magnetic pulse", "A cloud of ink"],
        answer: 1,
      },
    ],
  },
  {
    id: "deep-sea",
    title: "The Deep Sea",
    description: "Descend into the crushing dark. Do you know what's down there?",
    questions: [
      {
        q: "What is the deepest known point in the ocean?",
        options: ["Puerto Rico Trench", "Challenger Deep", "Java Trench", "Tonga Trench"],
        answer: 1,
      },
      {
        q: "Roughly how much of the ocean remains unexplored?",
        options: ["About 20%", "About 50%", "Over 80%", "Almost none"],
        answer: 2,
      },
      {
        q: "Below about 1,000 meters, where does light come from?",
        options: ["Filtered sunlight", "Bioluminescence", "Hydrothermal glow", "There is faint moonlight"],
        answer: 1,
      },
      {
        q: "How do organisms around hydrothermal vents get their energy?",
        options: ["Photosynthesis", "Chemosynthesis", "Eating falling debris only", "Absorbing heat directly"],
        answer: 1,
      },
      {
        q: "About what percentage of Earth's water is in the ocean?",
        options: ["50%", "75%", "97%", "Almost 100%"],
        answer: 2,
      },
    ],
  },
  {
    id: "reefs-conservation",
    title: "Reefs & Conservation",
    description: "Coral cities and the health of our blue planet — test your eco-knowledge.",
    questions: [
      {
        q: "What tiny animals build coral reefs?",
        options: ["Sea sponges", "Coral polyps", "Barnacles", "Sea anemones"],
        answer: 1,
      },
      {
        q: "Roughly what share of marine species do reefs support?",
        options: ["About 5%", "About 25%", "About 50%", "About 75%"],
        answer: 1,
      },
      {
        q: "Coral 'bleaching' happens when corals expel what?",
        options: ["Their eggs", "Algae living in their tissue", "Excess salt", "Their outer skeleton"],
        answer: 1,
      },
      {
        q: "About how much of our oxygen does the ocean produce?",
        options: ["Under 10%", "Around 30%", "50–80%", "Nearly all of it"],
        answer: 2,
      },
      {
        q: "Which of these is a 'blue carbon' habitat that stores carbon quickly?",
        options: ["Open sand flats", "Mangrove forests", "Rocky tide pools", "Deep-sea trenches"],
        answer: 1,
      },
    ],
  },
];
