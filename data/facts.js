// Ocean facts data. To add a fact, append an object below.
// Fields: id (unique), category, title, text.
// Categories: creatures, depths, reefs, waves-tides, conservation.
window.OCEAN_FACTS = [
  // --- Creatures ---
  {
    id: 1,
    category: "creatures",
    title: "The blue whale is the largest animal ever",
    text: "Bigger than any known dinosaur, a blue whale can reach 30 meters long and weigh up to 180 tonnes. Its heart alone is about the size of a small car, and its call can be louder than a jet engine.",
  },
  {
    id: 2,
    category: "creatures",
    title: "Octopuses have three hearts and blue blood",
    text: "Two hearts pump blood to the gills while a third circulates it to the body. Their blood is blue because it uses copper-based hemocyanin instead of iron-based hemoglobin to carry oxygen in cold, low-oxygen water.",
  },
  {
    id: 3,
    category: "creatures",
    title: "Some jellyfish are functionally immortal",
    text: "Turritopsis dohrnii, the 'immortal jellyfish,' can revert its cells back to an earlier life stage when stressed or injured, effectively restarting its life cycle and avoiding death by old age.",
  },
  {
    id: 4,
    category: "creatures",
    title: "A group of fish is called a school for a reason",
    text: "Fish school to confuse predators, save energy by drafting off one another, and find mates. They coordinate using their eyes and a 'lateral line' organ that senses tiny changes in water pressure.",
  },
  {
    id: 5,
    category: "creatures",
    title: "The mantis shrimp throws the fastest punch in nature",
    text: "Its club-like appendage strikes so fast it briefly creates bubbles that collapse with a flash of light and heat — a phenomenon called cavitation. The blow can crack aquarium glass.",
  },
  {
    id: 6,
    category: "creatures",
    title: "Seahorses are the only animals where males give birth",
    text: "Female seahorses deposit eggs into a pouch on the male, who fertilizes and carries them until they hatch, releasing fully-formed baby seahorses into the water.",
  },
  {
    id: 7,
    category: "creatures",
    title: "Sea otters hold hands while they sleep",
    text: "To avoid drifting apart on the currents, sea otters link paws while resting. They also wrap themselves in kelp as a natural anchor.",
  },

  // --- Depths ---
  {
    id: 8,
    category: "depths",
    title: "The ocean's deepest point is nearly 11 km down",
    text: "The Challenger Deep in the Mariana Trench reaches about 10,935 meters. If Mount Everest were dropped in, its peak would still be more than 2 km underwater.",
  },
  {
    id: 9,
    category: "depths",
    title: "Over 80% of the ocean is unexplored",
    text: "We have better maps of the surface of Mars and the Moon than of our own seafloor. Most of the deep ocean has never been seen by human eyes.",
  },
  {
    id: 10,
    category: "depths",
    title: "Sunlight runs out before 1,000 meters",
    text: "The 'twilight zone' fades to black around 1,000 m. Below that, in the 'midnight zone,' the only light comes from creatures that make their own through bioluminescence.",
  },
  {
    id: 11,
    category: "depths",
    title: "The pressure in the deep sea is crushing",
    text: "At the bottom of the Mariana Trench the pressure is over 1,000 times that at sea level — equivalent to balancing about 50 jumbo jets on your body.",
  },
  {
    id: 12,
    category: "depths",
    title: "Hydrothermal vents host life without sunlight",
    text: "Deep-sea vents spew superheated, mineral-rich water. Bacteria there turn chemicals into energy (chemosynthesis), feeding entire ecosystems of tube worms, crabs and shrimp in total darkness.",
  },
  {
    id: 13,
    category: "depths",
    title: "The ocean holds about 97% of Earth's water",
    text: "Only a tiny fraction of the planet's water is fresh and accessible. The vast majority is salt water filling the global ocean.",
  },

  // --- Reefs ---
  {
    id: 14,
    category: "reefs",
    title: "Coral reefs are built by tiny animals",
    text: "Reefs are made by coral polyps — small relatives of jellyfish — that secrete calcium carbonate skeletons. Over thousands of years these skeletons stack into vast reef structures.",
  },
  {
    id: 15,
    category: "reefs",
    title: "The Great Barrier Reef is visible from space",
    text: "Stretching over 2,300 km along Australia's coast, it's the largest living structure on Earth and is made up of nearly 3,000 individual reefs.",
  },
  {
    id: 16,
    category: "reefs",
    title: "Reefs support a quarter of all marine species",
    text: "Though they cover less than 1% of the ocean floor, coral reefs are home to roughly 25% of all marine life, earning them the nickname 'rainforests of the sea.'",
  },
  {
    id: 17,
    category: "reefs",
    title: "Coral and algae live in partnership",
    text: "Corals get much of their color and energy from algae called zooxanthellae living in their tissues. When stressed by heat, corals expel the algae and turn white — a process called bleaching.",
  },

  // --- Waves & Tides ---
  {
    id: 18,
    category: "waves-tides",
    title: "Tides are caused mostly by the Moon",
    text: "The Moon's gravity tugs on the ocean, creating bulges that we experience as high and low tides. The Sun adds a smaller pull, producing extra-large 'spring' tides when they align.",
  },
  {
    id: 19,
    category: "waves-tides",
    title: "Most waves are made by wind",
    text: "Wind dragging across the surface transfers energy to the water. The longer and harder the wind blows over a stretch of sea (the 'fetch'), the bigger the waves grow.",
  },
  {
    id: 20,
    category: "waves-tides",
    title: "A tsunami is not a normal wave",
    text: "Tsunamis are triggered by earthquakes, landslides or eruptions that displace huge volumes of water. In open ocean they're barely noticeable, but they slow and pile up into towering walls near shore.",
  },
  {
    id: 21,
    category: "waves-tides",
    title: "Ocean currents move heat around the planet",
    text: "Currents like the Gulf Stream act as a global conveyor belt, carrying warm water toward the poles and cold water back. This circulation shapes climates worldwide.",
  },
  {
    id: 22,
    category: "waves-tides",
    title: "The Bay of Fundy has the highest tides on Earth",
    text: "In Canada's Bay of Fundy the water can rise and fall by up to 16 meters between low and high tide — about the height of a five-story building.",
  },

  // --- Conservation ---
  {
    id: 23,
    category: "conservation",
    title: "The ocean produces over half our oxygen",
    text: "Marine plants, especially tiny phytoplankton near the surface, generate an estimated 50–80% of the oxygen we breathe — more than all the world's forests combined.",
  },
  {
    id: 24,
    category: "conservation",
    title: "Millions of tonnes of plastic enter the sea each year",
    text: "An estimated 8–11 million tonnes of plastic reach the ocean annually. It breaks into microplastics that spread through the food web, from plankton to people.",
  },
  {
    id: 25,
    category: "conservation",
    title: "The ocean absorbs much of our carbon dioxide",
    text: "The sea has soaked up roughly a third of human CO2 emissions. This buffers the climate but makes seawater more acidic, threatening shellfish, corals and plankton.",
  },
  {
    id: 26,
    category: "conservation",
    title: "Healthy seagrass and mangroves are carbon superheroes",
    text: "Coastal 'blue carbon' habitats like mangroves, seagrass and salt marshes can store carbon far faster per hectare than rainforests, while also sheltering young fish and buffering storms.",
  },
];
