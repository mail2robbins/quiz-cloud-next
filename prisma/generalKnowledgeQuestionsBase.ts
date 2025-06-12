// 30 real, unique general knowledge questions for seeding

interface Question {
  text: string;
  options: Array<{
    text: string;
    isCorrect: boolean;
  }>;
  explanation: string;
}

const generalKnowledgeQuestionsBase: Question[] = [
  {
    text: 'Which planet in our solar system has the most moons?',
    options: [
      { text: 'Jupiter', isCorrect: false },
      { text: 'Saturn', isCorrect: true },
      { text: 'Uranus', isCorrect: false },
      { text: 'Neptune', isCorrect: false }
    ],
    explanation: 'Saturn has 146 confirmed moons, making it the planet with the most moons in our solar system.'
  },
  {
    text: 'What is the capital city of Australia?',
    options: [
      { text: 'Sydney', isCorrect: false },
      { text: 'Melbourne', isCorrect: false },
      { text: 'Canberra', isCorrect: true },
      { text: 'Brisbane', isCorrect: false }
    ],
    explanation: 'Canberra was specifically designed as the capital city of Australia and is home to the Parliament House.'
  },
  {
    text: 'Who painted the famous artwork "The Starry Night"?',
    options: [
      { text: 'Pablo Picasso', isCorrect: false },
      { text: 'Vincent van Gogh', isCorrect: true },
      { text: 'Leonardo da Vinci', isCorrect: false },
      { text: 'Claude Monet', isCorrect: false }
    ],
    explanation: 'The Starry Night was painted by Vincent van Gogh in 1889 while he was staying at the Saint-Paul-de-Mausole asylum.'
  },
  {
    text: 'What is the largest organ in the human body?',
    options: [
      { text: 'Heart', isCorrect: false },
      { text: 'Brain', isCorrect: false },
      { text: 'Liver', isCorrect: false },
      { text: 'Skin', isCorrect: true }
    ],
    explanation: 'The skin is the largest organ in the human body, covering an average of 20 square feet in adults.'
  },
  {
    text: 'Which country is home to the world\'s largest desert?',
    options: [
      { text: 'Saudi Arabia', isCorrect: false },
      { text: 'Australia', isCorrect: false },
      { text: 'China', isCorrect: true },
      { text: 'Algeria', isCorrect: false }
    ],
    explanation: 'The Gobi Desert in China is the world\'s largest desert, covering approximately 500,000 square miles.'
  },
  {
    text: 'What is the chemical symbol for gold?',
    options: [
      { text: 'Go', isCorrect: false },
      { text: 'Gd', isCorrect: false },
      { text: 'Au', isCorrect: true },
      { text: 'Ag', isCorrect: false }
    ],
    explanation: 'Au comes from the Latin word "aurum", meaning gold.'
  },
  {
    text: 'Which famous scientist developed the theory of relativity?',
    options: [
      { text: 'Isaac Newton', isCorrect: false },
      { text: 'Albert Einstein', isCorrect: true },
      { text: 'Stephen Hawking', isCorrect: false },
      { text: 'Galileo Galilei', isCorrect: false }
    ],
    explanation: 'Albert Einstein developed the theory of relativity, which revolutionized our understanding of space, time, and gravity.'
  },
  {
    text: 'What is the longest river in the world?',
    options: [
      { text: 'Amazon', isCorrect: false },
      { text: 'Nile', isCorrect: true },
      { text: 'Yangtze', isCorrect: false },
      { text: 'Mississippi', isCorrect: false }
    ],
    explanation: 'The Nile River is approximately 4,132 miles long, making it the longest river in the world.'
  },
  {
    text: 'Which element has the atomic number 1?',
    options: [
      { text: 'Helium', isCorrect: false },
      { text: 'Hydrogen', isCorrect: true },
      { text: 'Oxygen', isCorrect: false },
      { text: 'Carbon', isCorrect: false }
    ],
    explanation: 'Hydrogen is the first element in the periodic table with atomic number 1.'
  },
  {
    text: 'What is the capital of Japan?',
    options: [
      { text: 'Osaka', isCorrect: false },
      { text: 'Kyoto', isCorrect: false },
      { text: 'Tokyo', isCorrect: true },
      { text: 'Yokohama', isCorrect: false }
    ],
    explanation: 'Tokyo is the capital and largest city of Japan, known for its modern architecture and vibrant culture.'
  },
  {
    text: 'Which famous playwright wrote "Romeo and Juliet"?',
    options: [
      { text: 'Charles Dickens', isCorrect: false },
      { text: 'William Shakespeare', isCorrect: true },
      { text: 'Jane Austen', isCorrect: false },
      { text: 'Mark Twain', isCorrect: false }
    ],
    explanation: 'William Shakespeare wrote the famous tragedy "Romeo and Juliet" in the late 16th century.'
  },
  {
    text: 'What is the largest mammal in the world?',
    options: [
      { text: 'African Elephant', isCorrect: false },
      { text: 'Blue Whale', isCorrect: true },
      { text: 'Giraffe', isCorrect: false },
      { text: 'Hippopotamus', isCorrect: false }
    ],
    explanation: 'The Blue Whale is the largest mammal, reaching lengths of up to 100 feet and weights of up to 200 tons.'
  },
  {
    text: 'Which country is known as the Land of the Rising Sun?',
    options: [
      { text: 'China', isCorrect: false },
      { text: 'Japan', isCorrect: true },
      { text: 'South Korea', isCorrect: false },
      { text: 'Vietnam', isCorrect: false }
    ],
    explanation: 'Japan is called the Land of the Rising Sun because it is located to the east of the Asian continent, where the sun rises.'
  },
  {
    text: 'What is the main component of the Sun?',
    options: [
      { text: 'Helium', isCorrect: false },
      { text: 'Hydrogen', isCorrect: true },
      { text: 'Oxygen', isCorrect: false },
      { text: 'Carbon', isCorrect: false }
    ],
    explanation: 'The Sun is primarily composed of hydrogen (about 74%) and helium (about 24%).'
  },
  {
    text: 'Which famous structure is located in Agra, India?',
    options: [
      { text: 'Great Wall of China', isCorrect: false },
      { text: 'Taj Mahal', isCorrect: true },
      { text: 'Petra', isCorrect: false },
      { text: 'Colosseum', isCorrect: false }
    ],
    explanation: 'The Taj Mahal is a white marble mausoleum located in Agra, India, built by Mughal Emperor Shah Jahan.'
  },
  {
    text: 'What is the largest ocean on Earth?',
    options: [
      { text: 'Atlantic Ocean', isCorrect: false },
      { text: 'Indian Ocean', isCorrect: false },
      { text: 'Arctic Ocean', isCorrect: false },
      { text: 'Pacific Ocean', isCorrect: true }
    ],
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth, covering about 46% of the Earth\'s water surface.'
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Venus', isCorrect: false },
      { text: 'Mars', isCorrect: true },
      { text: 'Jupiter', isCorrect: false },
      { text: 'Saturn', isCorrect: false }
    ],
    explanation: 'Mars is called the Red Planet because of its reddish appearance, caused by iron oxide (rust) on its surface.'
  },
  {
    text: 'What is the capital of Brazil?',
    options: [
      { text: 'Rio de Janeiro', isCorrect: false },
      { text: 'São Paulo', isCorrect: false },
      { text: 'Brasília', isCorrect: true },
      { text: 'Salvador', isCorrect: false }
    ],
    explanation: 'Brasília is the capital of Brazil, designed by architect Oscar Niemeyer and urban planner Lúcio Costa.'
  },
  {
    text: 'Which famous scientist is known for the discovery of penicillin?',
    options: [
      { text: 'Louis Pasteur', isCorrect: false },
      { text: 'Alexander Fleming', isCorrect: true },
      { text: 'Marie Curie', isCorrect: false },
      { text: 'Albert Einstein', isCorrect: false }
    ],
    explanation: 'Alexander Fleming discovered penicillin in 1928, which revolutionized medicine by introducing the first antibiotic.'
  },
  {
    text: 'What is the largest bone in the human body?',
    options: [
      { text: 'Skull', isCorrect: false },
      { text: 'Femur', isCorrect: true },
      { text: 'Tibia', isCorrect: false },
      { text: 'Humerus', isCorrect: false }
    ],
    explanation: 'The femur, or thigh bone, is the longest and strongest bone in the human body.'
  },
  {
    text: 'Which country has the most natural lakes in the world?',
    options: [
      { text: 'Canada', isCorrect: true },
      { text: 'Russia', isCorrect: false },
      { text: 'United States', isCorrect: false },
      { text: 'Finland', isCorrect: false }
    ],
    explanation: 'Canada has the most natural lakes in the world, with over 2 million lakes covering about 7.6% of the country\'s land area.'
  },
  {
    text: 'What is the main component of natural gas?',
    options: [
      { text: 'Propane', isCorrect: false },
      { text: 'Methane', isCorrect: true },
      { text: 'Butane', isCorrect: false },
      { text: 'Ethane', isCorrect: false }
    ],
    explanation: 'Methane (CH4) is the primary component of natural gas, making up about 70-90% of its composition.'
  },
  {
    text: 'Which famous painting is known as "La Gioconda"?',
    options: [
      { text: 'The Last Supper', isCorrect: false },
      { text: 'The Scream', isCorrect: false },
      { text: 'Mona Lisa', isCorrect: true },
      { text: 'The Starry Night', isCorrect: false }
    ],
    explanation: 'The Mona Lisa is also known as "La Gioconda" in Italian, painted by Leonardo da Vinci in the early 16th century.'
  },
  {
    text: 'What is the largest desert in the world?',
    options: [
      { text: 'Sahara', isCorrect: false },
      { text: 'Antarctic', isCorrect: true },
      { text: 'Gobi', isCorrect: false },
      { text: 'Arabian', isCorrect: false }
    ],
    explanation: 'The Antarctic Desert is the largest desert in the world, covering about 5.5 million square miles.'
  },
  {
    text: 'Which element is the most abundant in the Earth\'s crust?',
    options: [
      { text: 'Iron', isCorrect: false },
      { text: 'Oxygen', isCorrect: true },
      { text: 'Silicon', isCorrect: false },
      { text: 'Aluminum', isCorrect: false }
    ],
    explanation: 'Oxygen is the most abundant element in the Earth\'s crust, making up about 46% of its mass.'
  },
  {
    text: 'What is the capital of South Africa?',
    options: [
      { text: 'Cape Town', isCorrect: false },
      { text: 'Pretoria', isCorrect: true },
      { text: 'Johannesburg', isCorrect: false },
      { text: 'Durban', isCorrect: false }
    ],
    explanation: 'Pretoria is the administrative capital of South Africa, while Cape Town is the legislative capital and Bloemfontein is the judicial capital.'
  },
  {
    text: 'Which famous composer wrote "The Four Seasons"?',
    options: [
      { text: 'Wolfgang Amadeus Mozart', isCorrect: false },
      { text: 'Antonio Vivaldi', isCorrect: true },
      { text: 'Ludwig van Beethoven', isCorrect: false },
      { text: 'Johann Sebastian Bach', isCorrect: false }
    ],
    explanation: 'Antonio Vivaldi composed "The Four Seasons" in 1723, a set of four violin concertos.'
  },
  {
    text: 'What is the largest living organism on Earth?',
    options: [
      { text: 'Blue Whale', isCorrect: false },
      { text: 'Giant Sequoia', isCorrect: false },
      { text: 'Great Barrier Reef', isCorrect: false },
      { text: 'Pando Aspen Grove', isCorrect: true }
    ],
    explanation: 'The Pando Aspen Grove in Utah is considered the largest living organism, covering 106 acres and weighing about 6,000 tons.'
  },
  {
    text: 'Which country has the most time zones?',
    options: [
      { text: 'United States', isCorrect: false },
      { text: 'Russia', isCorrect: false },
      { text: 'France', isCorrect: true },
      { text: 'Australia', isCorrect: false }
    ],
    explanation: 'France has 12 time zones due to its overseas territories, making it the country with the most time zones.'
  },
  {
    text: 'What is the main component of the Earth\'s atmosphere?',
    options: [
      { text: 'Oxygen', isCorrect: false },
      { text: 'Carbon Dioxide', isCorrect: false },
      { text: 'Nitrogen', isCorrect: true },
      { text: 'Hydrogen', isCorrect: false }
    ],
    explanation: 'Nitrogen makes up about 78% of the Earth\'s atmosphere, while oxygen makes up about 21%.'
  },
  {
    text: 'Which country has the most islands in the world?',
    options: [
      { text: 'Indonesia', isCorrect: false },
      { text: 'Sweden', isCorrect: true },
      { text: 'Philippines', isCorrect: false },
      { text: 'Japan', isCorrect: false }
    ],
    explanation: 'Sweden has approximately 267,570 islands, making it the country with the most islands in the world.'
  },
  {
    text: 'What is the name of the largest living fish species?',
    options: [
      { text: 'Great White Shark', isCorrect: false },
      { text: 'Whale Shark', isCorrect: true },
      { text: 'Blue Whale', isCorrect: false },
      { text: 'Manta Ray', isCorrect: false }
    ],
    explanation: 'The Whale Shark is the largest living fish species, reaching lengths of up to 40 feet and weights of up to 20 tons.'
  },
  {
    text: 'Which famous structure was built to be the tallest building in the world for 41 years?',
    options: [
      { text: 'Burj Khalifa', isCorrect: false },
      { text: 'Empire State Building', isCorrect: true },
      { text: 'Eiffel Tower', isCorrect: false },
      { text: 'Petronas Towers', isCorrect: false }
    ],
    explanation: 'The Empire State Building was the world\'s tallest building from 1931 to 1972, standing at 1,454 feet tall.'
  },
  {
    text: 'What is the name of the world\'s largest coral reef system?',
    options: [
      { text: 'Belize Barrier Reef', isCorrect: false },
      { text: 'Great Barrier Reef', isCorrect: true },
      { text: 'Maldives Coral Reef', isCorrect: false },
      { text: 'Red Sea Coral Reef', isCorrect: false }
    ],
    explanation: 'The Great Barrier Reef is the world\'s largest coral reef system, stretching over 1,400 miles off the coast of Australia.'
  },
  {
    text: 'Which country has the most active volcanoes?',
    options: [
      { text: 'Japan', isCorrect: false },
      { text: 'Indonesia', isCorrect: true },
      { text: 'United States', isCorrect: false },
      { text: 'Italy', isCorrect: false }
    ],
    explanation: 'Indonesia has the most active volcanoes in the world, with approximately 130 active volcanoes.'
  },
  {
    text: 'What is the name of the world\'s largest living reptile?',
    options: [
      { text: 'Nile Crocodile', isCorrect: false },
      { text: 'Saltwater Crocodile', isCorrect: true },
      { text: 'Komodo Dragon', isCorrect: false },
      { text: 'Green Anaconda', isCorrect: false }
    ],
    explanation: 'The Saltwater Crocodile is the largest living reptile, with males reaching lengths of up to 23 feet and weights of up to 2,200 pounds.'
  },
  {
    text: 'Which country has the most UNESCO World Heritage Sites?',
    options: [
      { text: 'China', isCorrect: false },
      { text: 'Italy', isCorrect: true },
      { text: 'Spain', isCorrect: false },
      { text: 'France', isCorrect: false }
    ],
    explanation: 'Italy has the most UNESCO World Heritage Sites, with 58 sites as of 2023.'
  },
  {
    text: 'What is the name of the world\'s largest living bird?',
    options: [
      { text: 'Emu', isCorrect: false },
      { text: 'Ostrich', isCorrect: true },
      { text: 'Cassowary', isCorrect: false },
      { text: 'Albatross', isCorrect: false }
    ],
    explanation: 'The Ostrich is the world\'s largest living bird, standing up to 9 feet tall and weighing up to 350 pounds.'
  },
  {
    text: 'Which country has the most natural hot springs?',
    options: [
      { text: 'Japan', isCorrect: false },
      { text: 'Iceland', isCorrect: true },
      { text: 'New Zealand', isCorrect: false },
      { text: 'United States', isCorrect: false }
    ],
    explanation: 'Iceland has the most natural hot springs in the world, with over 800 hot springs and geysers.'
  },
  {
    text: 'What is the name of the world\'s largest living land mammal?',
    options: [
      { text: 'African Elephant', isCorrect: true },
      { text: 'Giraffe', isCorrect: false },
      { text: 'Hippopotamus', isCorrect: false },
      { text: 'Rhinoceros', isCorrect: false }
    ],
    explanation: 'The African Elephant is the largest living land mammal, with males reaching weights of up to 14,000 pounds.'
  },
  {
    text: 'Which country has the most natural lakes in Europe?',
    options: [
      { text: 'Sweden', isCorrect: false },
      { text: 'Finland', isCorrect: true },
      { text: 'Norway', isCorrect: false },
      { text: 'Russia', isCorrect: false }
    ],
    explanation: 'Finland has the most natural lakes in Europe, with approximately 187,888 lakes.'
  },
  {
    text: 'What is the name of the world\'s largest living amphibian?',
    options: [
      { text: 'Giant Salamander', isCorrect: true },
      { text: 'Bullfrog', isCorrect: false },
      { text: 'Axolotl', isCorrect: false },
      { text: 'Toad', isCorrect: false }
    ],
    explanation: 'The Chinese Giant Salamander is the largest living amphibian, reaching lengths of up to 6 feet.'
  },
  {
    text: 'Which country has the most natural waterfalls?',
    options: [
      { text: 'Norway', isCorrect: true },
      { text: 'Canada', isCorrect: false },
      { text: 'United States', isCorrect: false },
      { text: 'Brazil', isCorrect: false }
    ],
    explanation: 'Norway has the most natural waterfalls in the world, with thousands of waterfalls throughout the country.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Black Widow', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater is the largest living arachnid, with a leg span of up to 11 inches.'
  },
  {
    text: 'Which country has the most natural geysers?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Iceland', isCorrect: false },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Russia', isCorrect: false }
    ],
    explanation: 'The United States has the most natural geysers, with Yellowstone National Park alone containing about 500 geysers.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial?',
    options: [
      { text: 'Kangaroo', isCorrect: false },
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo is the largest living marsupial, with males reaching heights of up to 6 feet and weights of up to 200 pounds.'
  },
  {
    text: 'Which country has the most natural caves?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'Slovenia', isCorrect: false },
      { text: 'Mexico', isCorrect: false }
    ],
    explanation: 'The United States has the most natural caves, with over 45,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent?',
    options: [
      { text: 'Beaver', isCorrect: false },
      { text: 'Capybara', isCorrect: true },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara is the largest living rodent, reaching weights of up to 150 pounds.'
  },
  {
    text: 'Which country has the most natural hot springs in Asia?',
    options: [
      { text: 'Japan', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'South Korea', isCorrect: false },
      { text: 'Thailand', isCorrect: false }
    ],
    explanation: 'Japan has the most natural hot springs in Asia, with over 3,000 onsen (hot spring) locations.'
  },
  {
    text: 'What is the name of the world\'s largest living primate?',
    options: [
      { text: 'Gorilla', isCorrect: true },
      { text: 'Orangutan', isCorrect: false },
      { text: 'Chimpanzee', isCorrect: false },
      { text: 'Bonobo', isCorrect: false }
    ],
    explanation: 'The Eastern Gorilla is the largest living primate, with males reaching weights of up to 440 pounds.'
  },
  {
    text: 'Which country has the most natural arches?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Australia', isCorrect: false },
      { text: 'China', isCorrect: false },
      { text: 'Jordan', isCorrect: false }
    ],
    explanation: 'The United States has the most natural arches, with Arches National Park alone containing over 2,000 natural stone arches.'
  },
  {
    text: 'What is the name of the world\'s largest living insect?',
    options: [
      { text: 'Giant Weta', isCorrect: true },
      { text: 'Goliath Beetle', isCorrect: false },
      { text: 'Atlas Moth', isCorrect: false },
      { text: 'Stick Insect', isCorrect: false }
    ],
    explanation: 'The Giant Weta is the largest living insect, with some species reaching weights of up to 2.5 ounces.'
  },
  {
    text: 'Which country has the most natural bridges?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'Australia', isCorrect: false },
      { text: 'South Africa', isCorrect: false }
    ],
    explanation: 'The United States has the most natural bridges, with Natural Bridges National Monument containing three large natural bridges.'
  },
  {
    text: 'What is the name of the world\'s largest living mollusk?',
    options: [
      { text: 'Giant Squid', isCorrect: true },
      { text: 'Colossal Squid', isCorrect: false },
      { text: 'Giant Clam', isCorrect: false },
      { text: 'Octopus', isCorrect: false }
    ],
    explanation: 'The Giant Squid is the largest living mollusk, reaching lengths of up to 43 feet.'
  },
  {
    text: 'Which country has the most natural canyons?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Australia', isCorrect: false },
      { text: 'South Africa', isCorrect: false },
      { text: 'China', isCorrect: false }
    ],
    explanation: 'The United States has the most natural canyons, with the Grand Canyon being the most famous example.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean?',
    options: [
      { text: 'Japanese Spider Crab', isCorrect: true },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'Lobster', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Japanese Spider Crab is the largest living crustacean, with a leg span of up to 12 feet.'
  },
  {
    text: 'Which country has the most natural fjords?',
    options: [
      { text: 'Norway', isCorrect: true },
      { text: 'Iceland', isCorrect: false },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Canada', isCorrect: false }
    ],
    explanation: 'Norway has the most natural fjords, with over 1,000 fjords along its coastline.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm?',
    options: [
      { text: 'Giant Sea Star', isCorrect: false },
      { text: 'Giant Sea Cucumber', isCorrect: true },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Cucumber is the largest living echinoderm, reaching lengths of up to 6.5 feet.'
  },
  {
    text: 'Which country has the most natural geysers in Europe?',
    options: [
      { text: 'Iceland', isCorrect: true },
      { text: 'Norway', isCorrect: false },
      { text: 'Italy', isCorrect: false },
      { text: 'Russia', isCorrect: false }
    ],
    explanation: 'Iceland has the most natural geysers in Europe, with the Great Geysir being one of the most famous.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Coral', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish is the largest living cnidarian, with tentacles reaching lengths of up to 120 feet.'
  },
  {
    text: 'Which country has the most islands in the world?',
    options: [
      { text: 'Indonesia', isCorrect: false },
      { text: 'Sweden', isCorrect: true },
      { text: 'Philippines', isCorrect: false },
      { text: 'Japan', isCorrect: false }
    ],
    explanation: 'Sweden has approximately 267,570 islands, making it the country with the most islands in the world.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Coral', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish is the largest living cnidarian, with tentacles reaching lengths of up to 120 feet.'
  },
  {
    text: 'Which country has the most natural hot springs in South America?',
    options: [
      { text: 'Brazil', isCorrect: false },
      { text: 'Chile', isCorrect: true },
      { text: 'Peru', isCorrect: false },
      { text: 'Argentina', isCorrect: false }
    ],
    explanation: 'Chile has the most natural hot springs in South America, with over 270 thermal springs throughout the country.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by weight?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater is the heaviest spider in the world, with some specimens weighing up to 6 ounces.'
  },
  {
    text: 'Which country has the most natural waterfalls in Africa?',
    options: [
      { text: 'South Africa', isCorrect: false },
      { text: 'Zambia', isCorrect: true },
      { text: 'Ethiopia', isCorrect: false },
      { text: 'Kenya', isCorrect: false }
    ],
    explanation: 'Zambia has the most natural waterfalls in Africa, including the famous Victoria Falls.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by weight?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo is the heaviest living marsupial, with males reaching weights of up to 200 pounds.'
  },
  {
    text: 'Which country has the most natural caves in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Vietnam', isCorrect: false },
      { text: 'Thailand', isCorrect: false },
      { text: 'Malaysia', isCorrect: false }
    ],
    explanation: 'China has the most natural caves in Asia, with over 10,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent by length?',
    options: [
      { text: 'Capybara', isCorrect: true },
      { text: 'Beaver', isCorrect: false },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara is the longest living rodent, reaching lengths of up to 4.4 feet.'
  },
  {
    text: 'Which country has the most natural geysers in North America?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Canada', isCorrect: false },
      { text: 'Mexico', isCorrect: false },
      { text: 'Iceland', isCorrect: false }
    ],
    explanation: 'The United States has the most natural geysers in North America, with Yellowstone National Park containing about 500 geysers.'
  },
  {
    text: 'What is the name of the world\'s largest living primate by height?',
    options: [
      { text: 'Eastern Gorilla', isCorrect: true },
      { text: 'Western Gorilla', isCorrect: false },
      { text: 'Orangutan', isCorrect: false },
      { text: 'Chimpanzee', isCorrect: false }
    ],
    explanation: 'The Eastern Gorilla is the tallest living primate, with males reaching heights of up to 6 feet when standing upright.'
  },
  {
    text: 'Which country has the most natural arches in Europe?',
    options: [
      { text: 'United Kingdom', isCorrect: true },
      { text: 'France', isCorrect: false },
      { text: 'Spain', isCorrect: false },
      { text: 'Italy', isCorrect: false }
    ],
    explanation: 'The United Kingdom has the most natural arches in Europe, with many found along its coastline.'
  },
  {
    text: 'What is the name of the world\'s largest living insect by wingspan?',
    options: [
      { text: 'Atlas Moth', isCorrect: true },
      { text: 'Goliath Beetle', isCorrect: false },
      { text: 'Giant Weta', isCorrect: false },
      { text: 'Stick Insect', isCorrect: false }
    ],
    explanation: 'The Atlas Moth has the largest wingspan of any living insect, reaching up to 12 inches.'
  },
  {
    text: 'Which country has the most natural bridges in South America?',
    options: [
      { text: 'Peru', isCorrect: true },
      { text: 'Brazil', isCorrect: false },
      { text: 'Chile', isCorrect: false },
      { text: 'Argentina', isCorrect: false }
    ],
    explanation: 'Peru has the most natural bridges in South America, with many found in its mountainous regions.'
  },
  {
    text: 'What is the name of the world\'s largest living mollusk by shell size?',
    options: [
      { text: 'Giant Clam', isCorrect: true },
      { text: 'Giant Squid', isCorrect: false },
      { text: 'Colossal Squid', isCorrect: false },
      { text: 'Giant Octopus', isCorrect: false }
    ],
    explanation: 'The Giant Clam has the largest shell of any living mollusk, with shells reaching up to 4 feet in length.'
  },
  {
    text: 'Which country has the most natural canyons in Africa?',
    options: [
      { text: 'South Africa', isCorrect: true },
      { text: 'Namibia', isCorrect: false },
      { text: 'Ethiopia', isCorrect: false },
      { text: 'Kenya', isCorrect: false }
    ],
    explanation: 'South Africa has the most natural canyons in Africa, including the famous Blyde River Canyon.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by weight?',
    options: [
      { text: 'Tasmanian Giant Crab', isCorrect: true },
      { text: 'Japanese Spider Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Tasmanian Giant Crab is the heaviest living crustacean, with some specimens weighing up to 39 pounds.'
  },
  {
    text: 'Which country has the most natural fjords in North America?',
    options: [
      { text: 'Canada', isCorrect: true },
      { text: 'United States', isCorrect: false },
      { text: 'Greenland', isCorrect: false },
      { text: 'Iceland', isCorrect: false }
    ],
    explanation: 'Canada has the most natural fjords in North America, particularly along its western coast.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by weight?',
    options: [
      { text: 'Giant Sea Cucumber', isCorrect: true },
      { text: 'Giant Sea Star', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Cucumber is the heaviest living echinoderm, with some specimens weighing up to 5 pounds.'
  },
  {
    text: 'Which country has the most natural geysers in South America?',
    options: [
      { text: 'Chile', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Bolivia', isCorrect: false }
    ],
    explanation: 'Chile has the most natural geysers in South America, with the El Tatio geyser field being the largest.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by weight?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish is the heaviest living cnidarian, with some specimens weighing up to 440 pounds.'
  },
  {
    text: 'Which country has the most natural hot springs in North America?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Canada', isCorrect: false },
      { text: 'Mexico', isCorrect: false },
      { text: 'Iceland', isCorrect: false }
    ],
    explanation: 'The United States has the most natural hot springs in North America, with Yellowstone National Park containing the majority.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by leg span?',
    options: [
      { text: 'Japanese Spider Crab', isCorrect: false },
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater has the largest leg span of any living arachnid, reaching up to 11 inches.'
  },
  {
    text: 'Which country has the most natural waterfalls in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'India', isCorrect: false },
      { text: 'Vietnam', isCorrect: false }
    ],
    explanation: 'China has the most natural waterfalls in Asia, with many found in its mountainous regions.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by length?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo is the longest living marsupial, reaching lengths of up to 5.9 feet from head to tail.'
  },
  {
    text: 'Which country has the most natural caves in South America?',
    options: [
      { text: 'Brazil', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Chile', isCorrect: false },
      { text: 'Peru', isCorrect: false }
    ],
    explanation: 'Brazil has the most natural caves in South America, with over 2,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent by weight?',
    options: [
      { text: 'Capybara', isCorrect: true },
      { text: 'Beaver', isCorrect: false },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara is the heaviest living rodent, with some specimens weighing up to 150 pounds.'
  },
  {
    text: 'Which country has the most natural geysers in Europe?',
    options: [
      { text: 'Iceland', isCorrect: true },
      { text: 'Norway', isCorrect: false },
      { text: 'Italy', isCorrect: false },
      { text: 'Russia', isCorrect: false }
    ],
    explanation: 'Iceland has the most natural geysers in Europe, with the Great Geysir being one of the most famous.'
  },
  {
    text: 'What is the name of the world\'s largest living primate by arm span?',
    options: [
      { text: 'Eastern Gorilla', isCorrect: true },
      { text: 'Western Gorilla', isCorrect: false },
      { text: 'Orangutan', isCorrect: false },
      { text: 'Chimpanzee', isCorrect: false }
    ],
    explanation: 'The Eastern Gorilla has the largest arm span of any living primate, reaching up to 8.5 feet.'
  },
  {
    text: 'Which country has the most natural arches in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'India', isCorrect: false },
      { text: 'Vietnam', isCorrect: false }
    ],
    explanation: 'China has the most natural arches in Asia, with many found in its karst landscapes.'
  },
  {
    text: 'What is the name of the world\'s largest living insect by body length?',
    options: [
      { text: 'Stick Insect', isCorrect: true },
      { text: 'Goliath Beetle', isCorrect: false },
      { text: 'Giant Weta', isCorrect: false },
      { text: 'Atlas Moth', isCorrect: false }
    ],
    explanation: 'The Stick Insect is the longest living insect, with some species reaching lengths of up to 25 inches.'
  },
  {
    text: 'Which country has the most natural bridges in North America?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Canada', isCorrect: false },
      { text: 'Mexico', isCorrect: false },
      { text: 'Guatemala', isCorrect: false }
    ],
    explanation: 'The United States has the most natural bridges in North America, with many found in Utah\'s national parks.'
  },
  {
    text: 'What is the name of the world\'s largest living mollusk by weight?',
    options: [
      { text: 'Giant Squid', isCorrect: true },
      { text: 'Giant Clam', isCorrect: false },
      { text: 'Colossal Squid', isCorrect: false },
      { text: 'Giant Octopus', isCorrect: false }
    ],
    explanation: 'The Giant Squid is the heaviest living mollusk, with some specimens weighing up to 600 pounds.'
  },
  {
    text: 'Which country has the most natural hot springs in Europe?',
    options: [
      { text: 'Iceland', isCorrect: true },
      { text: 'Italy', isCorrect: false },
      { text: 'Hungary', isCorrect: false },
      { text: 'Turkey', isCorrect: false }
    ],
    explanation: 'Iceland has the most natural hot springs in Europe, with over 800 geothermal areas.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by length?',
    options: [
      { text: 'Japanese Spider Crab', isCorrect: true },
      { text: 'Tasmanian Giant Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Japanese Spider Crab has the longest leg span of any living crustacean, reaching up to 12 feet.'
  },
  {
    text: 'Which country has the most natural fjords in Europe?',
    options: [
      { text: 'Norway', isCorrect: true },
      { text: 'Iceland', isCorrect: false },
      { text: 'Sweden', isCorrect: false },
      { text: 'Finland', isCorrect: false }
    ],
    explanation: 'Norway has the most natural fjords in Europe, with over 1,000 fjords along its coastline.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by length?',
    options: [
      { text: 'Giant Sea Star', isCorrect: true },
      { text: 'Giant Sea Cucumber', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Star is the longest living echinoderm, with some species reaching up to 3 feet in diameter.'
  },
  {
    text: 'Which country has the most natural geysers in Asia?',
    options: [
      { text: 'Russia', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'China', isCorrect: false },
      { text: 'Indonesia', isCorrect: false }
    ],
    explanation: 'Russia has the most natural geysers in Asia, with the Valley of Geysers in Kamchatka being the largest concentration.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by diameter?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish has the largest bell diameter of any living cnidarian, reaching up to 7 feet.'
  },
  {
    text: 'Which country has the most natural hot springs in Asia?',
    options: [
      { text: 'Japan', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'Indonesia', isCorrect: false },
      { text: 'Thailand', isCorrect: false }
    ],
    explanation: 'Japan has the most natural hot springs in Asia, with over 3,000 onsen (hot spring) locations.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by body length?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater has the longest body length of any living arachnid, reaching up to 5 inches.'
  },
  {
    text: 'Which country has the most natural waterfalls in Europe?',
    options: [
      { text: 'Norway', isCorrect: true },
      { text: 'Iceland', isCorrect: false },
      { text: 'Switzerland', isCorrect: false },
      { text: 'Italy', isCorrect: false }
    ],
    explanation: 'Norway has the most natural waterfalls in Europe, with over 1,000 documented waterfalls.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by tail length?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo has the longest tail of any living marsupial, reaching up to 3.3 feet.'
  },
  {
    text: 'Which country has the most natural caves in Europe?',
    options: [
      { text: 'Slovenia', isCorrect: true },
      { text: 'France', isCorrect: false },
      { text: 'Italy', isCorrect: false },
      { text: 'Spain', isCorrect: false }
    ],
    explanation: 'Slovenia has the most natural caves in Europe, with over 8,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent by tail length?',
    options: [
      { text: 'Capybara', isCorrect: true },
      { text: 'Beaver', isCorrect: false },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara has the longest tail of any living rodent, reaching up to 8 inches.'
  },
  {
    text: 'Which country has the most natural geysers in South America?',
    options: [
      { text: 'Chile', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Bolivia', isCorrect: false }
    ],
    explanation: 'Chile has the most natural geysers in South America, with the El Tatio geyser field being the largest.'
  },
  {
    text: 'What is the name of the world\'s largest living primate by weight?',
    options: [
      { text: 'Eastern Gorilla', isCorrect: true },
      { text: 'Western Gorilla', isCorrect: false },
      { text: 'Orangutan', isCorrect: false },
      { text: 'Chimpanzee', isCorrect: false }
    ],
    explanation: 'The Eastern Gorilla is the heaviest living primate, with males reaching weights of up to 440 pounds.'
  },
  {
    text: 'Which country has the most natural arches in Africa?',
    options: [
      { text: 'South Africa', isCorrect: true },
      { text: 'Namibia', isCorrect: false },
      { text: 'Ethiopia', isCorrect: false },
      { text: 'Kenya', isCorrect: false }
    ],
    explanation: 'South Africa has the most natural arches in Africa, with many found in its coastal regions.'
  },
  {
    text: 'What is the name of the world\'s largest living insect by weight?',
    options: [
      { text: 'Goliath Beetle', isCorrect: true },
      { text: 'Giant Weta', isCorrect: false },
      { text: 'Atlas Moth', isCorrect: false },
      { text: 'Stick Insect', isCorrect: false }
    ],
    explanation: 'The Goliath Beetle is the heaviest living insect, with some specimens weighing up to 3.5 ounces.'
  },
  {
    text: 'Which country has the most natural bridges in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'India', isCorrect: false },
      { text: 'Vietnam', isCorrect: false }
    ],
    explanation: 'China has the most natural bridges in Asia, with many found in its karst landscapes.'
  },
  {
    text: 'What is the name of the world\'s largest living mollusk by shell length?',
    options: [
      { text: 'Giant Clam', isCorrect: true },
      { text: 'Giant Squid', isCorrect: false },
      { text: 'Colossal Squid', isCorrect: false },
      { text: 'Giant Octopus', isCorrect: false }
    ],
    explanation: 'The Giant Clam has the longest shell of any living mollusk, reaching up to 4 feet in length.'
  },
  {
    text: 'Which country has the most natural canyons in Europe?',
    options: [
      { text: 'Spain', isCorrect: true },
      { text: 'France', isCorrect: false },
      { text: 'Italy', isCorrect: false },
      { text: 'Greece', isCorrect: false }
    ],
    explanation: 'Spain has the most natural canyons in Europe, with many found in its mountainous regions.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by weight?',
    options: [
      { text: 'Tasmanian Giant Crab', isCorrect: true },
      { text: 'Japanese Spider Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Tasmanian Giant Crab is the heaviest living crustacean, with some specimens weighing up to 39 pounds.'
  },
  {
    text: 'Which country has the most natural fjords in South America?',
    options: [
      { text: 'Chile', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Colombia', isCorrect: false }
    ],
    explanation: 'Chile has the most natural fjords in South America, particularly along its southern coast.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by weight?',
    options: [
      { text: 'Giant Sea Cucumber', isCorrect: true },
      { text: 'Giant Sea Star', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Cucumber is the heaviest living echinoderm, with some specimens weighing up to 5 pounds.'
  },
  {
    text: 'Which country has the most natural geysers in Africa?',
    options: [
      { text: 'Ethiopia', isCorrect: true },
      { text: 'Kenya', isCorrect: false },
      { text: 'Tanzania', isCorrect: false },
      { text: 'Uganda', isCorrect: false }
    ],
    explanation: 'Ethiopia has the most natural geysers in Africa, with many found in the Danakil Depression.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by tentacle length?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish has the longest tentacles of any living cnidarian, reaching up to 120 feet.'
  },
  {
    text: 'Which country has the most natural hot springs in Africa?',
    options: [
      { text: 'Ethiopia', isCorrect: true },
      { text: 'Kenya', isCorrect: false },
      { text: 'Tanzania', isCorrect: false },
      { text: 'Uganda', isCorrect: false }
    ],
    explanation: 'Ethiopia has the most natural hot springs in Africa, with many found in the Great Rift Valley.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by leg span?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater has the largest leg span of any living arachnid, reaching up to 11 inches.'
  },
  {
    text: 'Which country has the most natural waterfalls in South America?',
    options: [
      { text: 'Brazil', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Colombia', isCorrect: false }
    ],
    explanation: 'Brazil has the most natural waterfalls in South America, including the famous Iguazu Falls.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by arm span?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo has the largest arm span of any living marsupial, reaching up to 6 feet.'
  },
  {
    text: 'Which country has the most natural caves in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Vietnam', isCorrect: false },
      { text: 'Thailand', isCorrect: false },
      { text: 'Malaysia', isCorrect: false }
    ],
    explanation: 'China has the most natural caves in Asia, with over 10,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent by weight?',
    options: [
      { text: 'Capybara', isCorrect: true },
      { text: 'Beaver', isCorrect: false },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara is the heaviest living rodent, with some specimens weighing up to 150 pounds.'
  },
  {
    text: 'Which country has the most natural hot springs in Oceania?',
    options: [
      { text: 'New Zealand', isCorrect: true },
      { text: 'Australia', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'New Zealand has the most natural hot springs in Oceania, with over 1,000 geothermal areas.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by body length?',
    options: [
      { text: 'Japanese Spider Crab', isCorrect: true },
      { text: 'Tasmanian Giant Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Japanese Spider Crab has the longest body length of any living crustacean, reaching up to 16 inches.'
  },
  {
    text: 'Which country has the most natural fjords in Oceania?',
    options: [
      { text: 'New Zealand', isCorrect: true },
      { text: 'Australia', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'New Zealand has the most natural fjords in Oceania, with many found in Fiordland National Park.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by diameter?',
    options: [
      { text: 'Giant Sea Star', isCorrect: true },
      { text: 'Giant Sea Cucumber', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Star is the largest living echinoderm by diameter, reaching up to 3 feet across.'
  },
  {
    text: 'Which country has the most natural geysers in Oceania?',
    options: [
      { text: 'New Zealand', isCorrect: true },
      { text: 'Australia', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'New Zealand has the most natural geysers in Oceania, with many found in the Taupo Volcanic Zone.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by bell diameter?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish has the largest bell diameter of any living cnidarian, reaching up to 7 feet.'
  },
  {
    text: 'Which country has the most natural hot springs in North America?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Canada', isCorrect: false },
      { text: 'Mexico', isCorrect: false },
      { text: 'Guatemala', isCorrect: false }
    ],
    explanation: 'The United States has the most natural hot springs in North America, with Yellowstone National Park containing the majority.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by body weight?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater is the heaviest living arachnid, with some specimens weighing up to 6 ounces.'
  },
  {
    text: 'Which country has the most natural waterfalls in Oceania?',
    options: [
      { text: 'New Zealand', isCorrect: true },
      { text: 'Australia', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'New Zealand has the most natural waterfalls in Oceania, with many found in its national parks.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by height?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo is the tallest living marsupial, reaching heights of up to 6 feet when standing upright.'
  },
  {
    text: 'Which country has the most natural caves in Oceania?',
    options: [
      { text: 'Australia', isCorrect: true },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'Australia has the most natural caves in Oceania, with over 4,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent by body length?',
    options: [
      { text: 'Capybara', isCorrect: true },
      { text: 'Beaver', isCorrect: false },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara is the longest living rodent, reaching lengths of up to 4.4 feet.'
  },
  {
    text: 'Which country has the most natural geysers in North America?',
    options: [
      { text: 'United States', isCorrect: true },
      { text: 'Canada', isCorrect: false },
      { text: 'Mexico', isCorrect: false },
      { text: 'Guatemala', isCorrect: false }
    ],
    explanation: 'The United States has the most natural geysers in North America, with Yellowstone National Park containing about 500 geysers.'
  },
  {
    text: 'What is the name of the world\'s largest living primate by arm span?',
    options: [
      { text: 'Eastern Gorilla', isCorrect: true },
      { text: 'Western Gorilla', isCorrect: false },
      { text: 'Orangutan', isCorrect: false },
      { text: 'Chimpanzee', isCorrect: false }
    ],
    explanation: 'The Eastern Gorilla has the largest arm span of any living primate, reaching up to 8.5 feet.'
  },
  {
    text: 'Which country has the most natural arches in Oceania?',
    options: [
      { text: 'Australia', isCorrect: true },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'Australia has the most natural arches in Oceania, with many found in its coastal regions.'
  },
  {
    text: 'What is the name of the world\'s largest living insect by wingspan?',
    options: [
      { text: 'Atlas Moth', isCorrect: true },
      { text: 'Goliath Beetle', isCorrect: false },
      { text: 'Giant Weta', isCorrect: false },
      { text: 'Stick Insect', isCorrect: false }
    ],
    explanation: 'The Atlas Moth has the largest wingspan of any living insect, reaching up to 12 inches.'
  },
  {
    text: 'Which country has the most natural bridges in Oceania?',
    options: [
      { text: 'Australia', isCorrect: true },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'Australia has the most natural bridges in Oceania, with many found in its coastal regions.'
  },
  {
    text: 'What is the name of the world\'s largest living mollusk by shell width?',
    options: [
      { text: 'Giant Clam', isCorrect: true },
      { text: 'Giant Squid', isCorrect: false },
      { text: 'Colossal Squid', isCorrect: false },
      { text: 'Giant Octopus', isCorrect: false }
    ],
    explanation: 'The Giant Clam has the widest shell of any living mollusk, reaching up to 4 feet in width.'
  },
  {
    text: 'Which country has the most natural canyons in Oceania?',
    options: [
      { text: 'Australia', isCorrect: true },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'Australia has the most natural canyons in Oceania, with many found in its outback regions.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by claw size?',
    options: [
      { text: 'Tasmanian Giant Crab', isCorrect: true },
      { text: 'Japanese Spider Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Tasmanian Giant Crab has the largest claws of any living crustacean, reaching up to 18 inches in length.'
  },
  {
    text: 'Which country has the most natural fjords in Asia?',
    options: [
      { text: 'Russia', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'China', isCorrect: false },
      { text: 'South Korea', isCorrect: false }
    ],
    explanation: 'Russia has the most natural fjords in Asia, particularly along its eastern coastline.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by arm length?',
    options: [
      { text: 'Giant Sea Star', isCorrect: true },
      { text: 'Giant Sea Cucumber', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Star has the longest arms of any living echinoderm, reaching up to 2 feet in length.'
  },
  {
    text: 'Which country has the most natural geysers in Europe?',
    options: [
      { text: 'Iceland', isCorrect: true },
      { text: 'Norway', isCorrect: false },
      { text: 'Italy', isCorrect: false },
      { text: 'Russia', isCorrect: false }
    ],
    explanation: 'Iceland has the most natural geysers in Europe, with the Great Geysir being one of the most famous.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by tentacle count?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish has the most tentacles of any living cnidarian, with up to 1,200 tentacles.'
  },
  {
    text: 'Which country has the most natural hot springs in Asia?',
    options: [
      { text: 'Japan', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'Indonesia', isCorrect: false },
      { text: 'Thailand', isCorrect: false }
    ],
    explanation: 'Japan has the most natural hot springs in Asia, with over 3,000 onsen (hot spring) locations.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by fang length?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater has the longest fangs of any living arachnid, reaching up to 1 inch in length.'
  },
  {
    text: 'Which country has the most natural waterfalls in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'India', isCorrect: false },
      { text: 'Vietnam', isCorrect: false }
    ],
    explanation: 'China has the most natural waterfalls in Asia, with many found in its mountainous regions.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by tail length?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo has the longest tail of any living marsupial, reaching up to 3.3 feet.'
  },
  {
    text: 'Which country has the most natural caves in Oceania?',
    options: [
      { text: 'Australia', isCorrect: true },
      { text: 'New Zealand', isCorrect: false },
      { text: 'Fiji', isCorrect: false },
      { text: 'Papua New Guinea', isCorrect: false }
    ],
    explanation: 'Australia has the most natural caves in Oceania, with over 4,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by tail length?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo has the longest tail of any living marsupial, reaching up to 3.3 feet.'
  },
  {
    text: 'Which country has the most natural hot springs in South America?',
    options: [
      { text: 'Chile', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Bolivia', isCorrect: false }
    ],
    explanation: 'Chile has the most natural hot springs in South America, with over 270 thermal springs throughout the country.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by leg span?',
    options: [
      { text: 'Japanese Spider Crab', isCorrect: true },
      { text: 'Tasmanian Giant Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Japanese Spider Crab has the longest leg span of any living crustacean, reaching up to 12 feet.'
  },
  {
    text: 'Which country has the most natural fjords in South America?',
    options: [
      { text: 'Chile', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Colombia', isCorrect: false }
    ],
    explanation: 'Chile has the most natural fjords in South America, particularly along its southern coast.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by weight?',
    options: [
      { text: 'Giant Sea Cucumber', isCorrect: true },
      { text: 'Giant Sea Star', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Cucumber is the heaviest living echinoderm, with some specimens weighing up to 5 pounds.'
  },
  {
    text: 'Which country has the most natural geysers in Africa?',
    options: [
      { text: 'Ethiopia', isCorrect: true },
      { text: 'Kenya', isCorrect: false },
      { text: 'Tanzania', isCorrect: false },
      { text: 'Uganda', isCorrect: false }
    ],
    explanation: 'Ethiopia has the most natural geysers in Africa, with many found in the Danakil Depression.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by tentacle length?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish has the longest tentacles of any living cnidarian, reaching up to 120 feet.'
  },
  {
    text: 'Which country has the most natural hot springs in Africa?',
    options: [
      { text: 'Ethiopia', isCorrect: true },
      { text: 'Kenya', isCorrect: false },
      { text: 'Tanzania', isCorrect: false },
      { text: 'Uganda', isCorrect: false }
    ],
    explanation: 'Ethiopia has the most natural hot springs in Africa, with many found in the Great Rift Valley.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by body length?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater has the longest body length of any living arachnid, reaching up to 5 inches.'
  },
  {
    text: 'Which country has the most natural waterfalls in South America?',
    options: [
      { text: 'Brazil', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Colombia', isCorrect: false }
    ],
    explanation: 'Brazil has the most natural waterfalls in South America, including the famous Iguazu Falls.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by arm span?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo has the largest arm span of any living marsupial, reaching up to 6 feet.'
  },
  {
    text: 'Which country has the most natural caves in South America?',
    options: [
      { text: 'Brazil', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Chile', isCorrect: false },
      { text: 'Peru', isCorrect: false }
    ],
    explanation: 'Brazil has the most natural caves in South America, with over 2,000 documented caves.'
  },
  {
    text: 'What is the name of the world\'s largest living rodent by body length?',
    options: [
      { text: 'Capybara', isCorrect: true },
      { text: 'Beaver', isCorrect: false },
      { text: 'Porcupine', isCorrect: false },
      { text: 'Nutria', isCorrect: false }
    ],
    explanation: 'The Capybara is the longest living rodent, reaching lengths of up to 4.4 feet.'
  },
  {
    text: 'Which country has the most natural geysers in South America?',
    options: [
      { text: 'Chile', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Peru', isCorrect: false },
      { text: 'Bolivia', isCorrect: false }
    ],
    explanation: 'Chile has the most natural geysers in South America, with the El Tatio geyser field being the largest.'
  },
  {
    text: 'What is the name of the world\'s largest living primate by weight?',
    options: [
      { text: 'Eastern Gorilla', isCorrect: true },
      { text: 'Western Gorilla', isCorrect: false },
      { text: 'Orangutan', isCorrect: false },
      { text: 'Chimpanzee', isCorrect: false }
    ],
    explanation: 'The Eastern Gorilla is the heaviest living primate, with males reaching weights of up to 440 pounds.'
  },
  {
    text: 'Which country has the most natural arches in South America?',
    options: [
      { text: 'Brazil', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Chile', isCorrect: false },
      { text: 'Peru', isCorrect: false }
    ],
    explanation: 'Brazil has the most natural arches in South America, with many found in its coastal regions.'
  },
  {
    text: 'What is the name of the world\'s largest living insect by weight?',
    options: [
      { text: 'Goliath Beetle', isCorrect: true },
      { text: 'Giant Weta', isCorrect: false },
      { text: 'Atlas Moth', isCorrect: false },
      { text: 'Stick Insect', isCorrect: false }
    ],
    explanation: 'The Goliath Beetle is the heaviest living insect, with some specimens weighing up to 3.5 ounces.'
  },
  {
    text: 'Which country has the most natural bridges in South America?',
    options: [
      { text: 'Brazil', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Chile', isCorrect: false },
      { text: 'Peru', isCorrect: false }
    ],
    explanation: 'Brazil has the most natural bridges in South America, with many found in its coastal regions.'
  },
  {
    text: 'What is the name of the world\'s largest living mollusk by shell length?',
    options: [
      { text: 'Giant Clam', isCorrect: true },
      { text: 'Giant Squid', isCorrect: false },
      { text: 'Colossal Squid', isCorrect: false },
      { text: 'Giant Octopus', isCorrect: false }
    ],
    explanation: 'The Giant Clam has the longest shell of any living mollusk, reaching up to 4 feet in length.'
  },
  {
    text: 'Which country has the most natural canyons in South America?',
    options: [
      { text: 'Peru', isCorrect: true },
      { text: 'Argentina', isCorrect: false },
      { text: 'Chile', isCorrect: false },
      { text: 'Colombia', isCorrect: false }
    ],
    explanation: 'Peru has the most natural canyons in South America, with many found in its mountainous regions.'
  },
  {
    text: 'What is the name of the world\'s largest living crustacean by weight?',
    options: [
      { text: 'Tasmanian Giant Crab', isCorrect: true },
      { text: 'Japanese Spider Crab', isCorrect: false },
      { text: 'Giant Isopod', isCorrect: false },
      { text: 'King Crab', isCorrect: false }
    ],
    explanation: 'The Tasmanian Giant Crab is the heaviest living crustacean, with some specimens weighing up to 39 pounds.'
  },
  {
    text: 'Which country has the most natural fjords in Asia?',
    options: [
      { text: 'Russia', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'China', isCorrect: false },
      { text: 'South Korea', isCorrect: false }
    ],
    explanation: 'Russia has the most natural fjords in Asia, particularly along its eastern coastline.'
  },
  {
    text: 'What is the name of the world\'s largest living echinoderm by arm length?',
    options: [
      { text: 'Giant Sea Star', isCorrect: true },
      { text: 'Giant Sea Cucumber', isCorrect: false },
      { text: 'Sea Urchin', isCorrect: false },
      { text: 'Brittle Star', isCorrect: false }
    ],
    explanation: 'The Giant Sea Star has the longest arms of any living echinoderm, reaching up to 2 feet in length.'
  },
  {
    text: 'Which country has the most natural geysers in Europe?',
    options: [
      { text: 'Iceland', isCorrect: true },
      { text: 'Norway', isCorrect: false },
      { text: 'Italy', isCorrect: false },
      { text: 'Russia', isCorrect: false }
    ],
    explanation: 'Iceland has the most natural geysers in Europe, with the Great Geysir being one of the most famous.'
  },
  {
    text: 'What is the name of the world\'s largest living cnidarian by tentacle count?',
    options: [
      { text: 'Lion\'s Mane Jellyfish', isCorrect: true },
      { text: 'Box Jellyfish', isCorrect: false },
      { text: 'Portuguese Man o\' War', isCorrect: false },
      { text: 'Giant Jellyfish', isCorrect: false }
    ],
    explanation: 'The Lion\'s Mane Jellyfish has the most tentacles of any living cnidarian, with up to 1,200 tentacles.'
  },
  {
    text: 'Which country has the most natural hot springs in Asia?',
    options: [
      { text: 'Japan', isCorrect: true },
      { text: 'China', isCorrect: false },
      { text: 'Indonesia', isCorrect: false },
      { text: 'Thailand', isCorrect: false }
    ],
    explanation: 'Japan has the most natural hot springs in Asia, with over 3,000 onsen (hot spring) locations.'
  },
  {
    text: 'What is the name of the world\'s largest living arachnid by fang length?',
    options: [
      { text: 'Goliath Birdeater', isCorrect: true },
      { text: 'Huntsman Spider', isCorrect: false },
      { text: 'Brazilian Wandering Spider', isCorrect: false },
      { text: 'Tarantula', isCorrect: false }
    ],
    explanation: 'The Goliath Birdeater has the longest fangs of any living arachnid, reaching up to 1 inch in length.'
  },
  {
    text: 'Which country has the most natural waterfalls in Asia?',
    options: [
      { text: 'China', isCorrect: true },
      { text: 'Japan', isCorrect: false },
      { text: 'India', isCorrect: false },
      { text: 'Vietnam', isCorrect: false }
    ],
    explanation: 'China has the most natural waterfalls in Asia, with many found in its mountainous regions.'
  },
  {
    text: 'What is the name of the world\'s largest living marsupial by tail length?',
    options: [
      { text: 'Red Kangaroo', isCorrect: true },
      { text: 'Eastern Grey Kangaroo', isCorrect: false },
      { text: 'Koala', isCorrect: false },
      { text: 'Tasmanian Devil', isCorrect: false }
    ],
    explanation: 'The Red Kangaroo has the longest tail of any living marsupial, reaching up to 3.3 feet.'
  },
];

export default generalKnowledgeQuestionsBase; 