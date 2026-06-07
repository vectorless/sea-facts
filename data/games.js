// Data for the minigames. Each game pulls from here so content is easy to extend.
window.OCEAN_GAMES = {
  // Memory Match: each card pair is a creature; matching it reveals the fact.
  memory: [
    { name: "Octopus", emoji: "🐙", fact: "Octopuses have three hearts and blue blood." },
    { name: "Blue whale", emoji: "🐋", fact: "The blue whale is the largest animal that has ever lived." },
    { name: "Sea turtle", emoji: "🐢", fact: "Sea turtles can navigate thousands of miles back to the beach where they hatched." },
    { name: "Jellyfish", emoji: "🪼", fact: "One jellyfish species can revert to a younger stage — it's nearly immortal." },
    { name: "Crab", emoji: "🦀", fact: "Crabs 'talk' by waving their claws and drumming on the ground." },
    { name: "Dolphin", emoji: "🐬", fact: "Dolphins use echolocation — they 'see' with sound." },
    { name: "Shark", emoji: "🦈", fact: "Sharks have existed for over 400 million years — older than trees." },
    { name: "Pufferfish", emoji: "🐡", fact: "Pufferfish gulp water to balloon up and scare off predators." },
  ],

  // Which Zone? Sort each creature/feature into its ocean depth layer.
  // zone is one of: "sunlight", "twilight", "midnight".
  zones: [
    { item: "Coral reefs", emoji: "🪸", zone: "sunlight", explain: "Corals need sunlight for the algae living inside them, so reefs grow in the bright Sunlight Zone (0–200 m)." },
    { item: "Sea turtle", emoji: "🐢", zone: "sunlight", explain: "Sea turtles breathe air and feed near the surface, in the Sunlight Zone (0–200 m)." },
    { item: "Dolphins", emoji: "🐬", zone: "sunlight", explain: "Dolphins are air-breathing mammals that live in the sunlit surface waters (0–200 m)." },
    { item: "Lanternfish", emoji: "🐟", zone: "twilight", explain: "Lanternfish live in the dim Twilight Zone (200–1000 m) and glow to communicate." },
    { item: "Hatchetfish", emoji: "🐠", zone: "twilight", explain: "Hatchetfish patrol the Twilight Zone (200–1000 m), using mirror-like sides for camouflage." },
    { item: "Giant squid", emoji: "🦑", zone: "twilight", explain: "Giant squid roam the deep Twilight Zone (200–1000 m), hunted by sperm whales." },
    { item: "Anglerfish", emoji: "🎣", zone: "midnight", explain: "The anglerfish dangles a glowing lure in the pitch-black Midnight Zone (1000 m+)." },
    { item: "Gulper eel", emoji: "🐍", zone: "midnight", explain: "The gulper eel's huge mouth helps it catch rare meals in the Midnight Zone (1000 m+)." },
    { item: "Vampire squid", emoji: "🦑", zone: "midnight", explain: "The vampire squid survives in the oxygen-poor Midnight Zone (1000 m+)." },
  ],

  // Ocean Cleanup: trash to remove vs. sea life to protect.
  trash: ["🛍️", "🥤", "🧴", "🥫", "🩴", "📦"],
  sealife: ["🐠", "🐢", "🐬", "🦀", "🐙", "🪸"],
};
