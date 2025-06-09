const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Helper to generate placeholder questions
 * @param {Array<{text: string, options: Array<{text: string, isCorrect: boolean}>, explanation: string}>} baseQuestions
 * @param {string} category
 */
function generateQuestions(baseQuestions, category) {
  const questions = [...baseQuestions];
  for (let i = baseQuestions.length + 1; i <= 100; i++) {
    questions.push({
      text: `${category} Placeholder Question #${i}`,
      options: [
        { text: `${category} Option A`, isCorrect: i % 4 === 1 },
        { text: `${category} Option B`, isCorrect: i % 4 === 2 },
        { text: `${category} Option C`, isCorrect: i % 4 === 3 },
        { text: `${category} Option D`, isCorrect: i % 4 === 0 },
      ],
      explanation: `This is a placeholder explanation for ${category} question #${i}.`
    });
  }
  return questions;
}

const historyQuestionsBase = [
  {
    text: 'Who was the first President of the United States?',
    options: [
      { text: 'George Washington', isCorrect: true },
      { text: 'John Adams', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false },
      { text: 'James Madison', isCorrect: false }
    ],
    explanation: 'George Washington was the first President of the United States.'
  },
  {
    text: 'In which year did World War II end?',
    options: [
      { text: '1945', isCorrect: true },
      { text: '1944', isCorrect: false },
      { text: '1946', isCorrect: false },
      { text: '1943', isCorrect: false }
    ],
    explanation: 'World War II ended in 1945.'
  },
  {
    text: 'Which empire was ruled by Genghis Khan?',
    options: [
      { text: 'Mongol Empire', isCorrect: true },
      { text: 'Ottoman Empire', isCorrect: false },
      { text: 'Roman Empire', isCorrect: false },
      { text: 'Persian Empire', isCorrect: false }
    ],
    explanation: 'Genghis Khan founded and ruled the Mongol Empire.'
  },
  {
    text: 'What was the name of the ship on which the Pilgrims traveled to North America in 1620?',
    options: [
      { text: 'Mayflower', isCorrect: true },
      { text: 'Santa Maria', isCorrect: false },
      { text: 'Endeavour', isCorrect: false },
      { text: 'Beagle', isCorrect: false }
    ],
    explanation: 'The Pilgrims traveled on the Mayflower.'
  },
  {
    text: 'Who discovered penicillin?',
    options: [
      { text: 'Alexander Fleming', isCorrect: true },
      { text: 'Marie Curie', isCorrect: false },
      { text: 'Isaac Newton', isCorrect: false },
      { text: 'Louis Pasteur', isCorrect: false }
    ],
    explanation: 'Alexander Fleming discovered penicillin in 1928.'
  },
  {
    text: 'Which ancient civilization built the pyramids of Giza?',
    options: [
      { text: 'Egyptians', isCorrect: true },
      { text: 'Romans', isCorrect: false },
      { text: 'Greeks', isCorrect: false },
      { text: 'Babylonians', isCorrect: false }
    ],
    explanation: 'The Egyptians built the pyramids of Giza.'
  },
  {
    text: 'Who was the British Prime Minister during most of World War II?',
    options: [
      { text: 'Winston Churchill', isCorrect: true },
      { text: 'Neville Chamberlain', isCorrect: false },
      { text: 'Clement Attlee', isCorrect: false },
      { text: 'Margaret Thatcher', isCorrect: false }
    ],
    explanation: 'Winston Churchill was the British Prime Minister during most of WWII.'
  },
  {
    text: 'Which war was fought between the North and South regions in the United States?',
    options: [
      { text: 'Civil War', isCorrect: true },
      { text: 'Revolutionary War', isCorrect: false },
      { text: 'Vietnam War', isCorrect: false },
      { text: 'Korean War', isCorrect: false }
    ],
    explanation: 'The American Civil War was fought between the North and South.'
  },
  {
    text: 'Who was the first man to step on the moon?',
    options: [
      { text: 'Neil Armstrong', isCorrect: true },
      { text: 'Buzz Aldrin', isCorrect: false },
      { text: 'Yuri Gagarin', isCorrect: false },
      { text: 'Michael Collins', isCorrect: false }
    ],
    explanation: 'Neil Armstrong was the first man to step on the moon in 1969.'
  },
  {
    text: 'Which city was divided by a wall from 1961 to 1989?',
    options: [
      { text: 'Berlin', isCorrect: true },
      { text: 'Paris', isCorrect: false },
      { text: 'London', isCorrect: false },
      { text: 'Moscow', isCorrect: false }
    ],
    explanation: 'Berlin was divided by the Berlin Wall.'
  },
  {
    text: 'Who was the first President of South Africa after apartheid?',
    options: [
      { text: 'Nelson Mandela', isCorrect: true },
      { text: 'F.W. de Klerk', isCorrect: false },
      { text: 'Jacob Zuma', isCorrect: false },
      { text: 'Thabo Mbeki', isCorrect: false }
    ],
    explanation: 'Nelson Mandela became the first black President of South Africa in 1994.'
  },
  {
    text: 'Which treaty ended World War I?',
    options: [
      { text: 'Treaty of Versailles', isCorrect: true },
      { text: 'Treaty of Paris', isCorrect: false },
      { text: 'Treaty of Tordesillas', isCorrect: false },
      { text: 'Treaty of Ghent', isCorrect: false }
    ],
    explanation: 'The Treaty of Versailles was signed in 1919, ending World War I.'
  },
  {
    text: 'Who was the longest-reigning British monarch before Queen Elizabeth II?',
    options: [
      { text: 'Queen Victoria', isCorrect: true },
      { text: 'King George III', isCorrect: false },
      { text: 'Queen Elizabeth I', isCorrect: false },
      { text: 'King Henry VIII', isCorrect: false }
    ],
    explanation: 'Queen Victoria reigned from 1837 to 1901.'
  },
  {
    text: 'Which ancient city was destroyed by a volcanic eruption in 79 AD?',
    options: [
      { text: 'Pompeii', isCorrect: true },
      { text: 'Athens', isCorrect: false },
      { text: 'Carthage', isCorrect: false },
      { text: 'Alexandria', isCorrect: false }
    ],
    explanation: 'Pompeii was destroyed by the eruption of Mount Vesuvius.'
  },
  {
    text: 'Who was the first female Prime Minister of the United Kingdom?',
    options: [
      { text: 'Margaret Thatcher', isCorrect: true },
      { text: 'Theresa May', isCorrect: false },
      { text: 'Angela Merkel', isCorrect: false },
      { text: 'Indira Gandhi', isCorrect: false }
    ],
    explanation: 'Margaret Thatcher served as Prime Minister from 1979 to 1990.'
  },
  {
    text: 'Which empire built the Colosseum in Rome?',
    options: [
      { text: 'Roman Empire', isCorrect: true },
      { text: 'Greek Empire', isCorrect: false },
      { text: 'Byzantine Empire', isCorrect: false },
      { text: 'Ottoman Empire', isCorrect: false }
    ],
    explanation: 'The Colosseum was built by the Romans in the 1st century AD.'
  },
  {
    text: 'Who was the leader of the Soviet Union during World War II?',
    options: [
      { text: 'Joseph Stalin', isCorrect: true },
      { text: 'Vladimir Lenin', isCorrect: false },
      { text: 'Nikita Khrushchev', isCorrect: false },
      { text: 'Leon Trotsky', isCorrect: false }
    ],
    explanation: 'Joseph Stalin led the Soviet Union during WWII.'
  },
  {
    text: 'Which U.S. President issued the Emancipation Proclamation?',
    options: [
      { text: 'Abraham Lincoln', isCorrect: true },
      { text: 'Ulysses S. Grant', isCorrect: false },
      { text: 'Andrew Johnson', isCorrect: false },
      { text: 'James Buchanan', isCorrect: false }
    ],
    explanation: 'Abraham Lincoln issued the Emancipation Proclamation in 1863.'
  },
  {
    text: 'What was the name of the first successful English colony in America?',
    options: [
      { text: 'Jamestown', isCorrect: true },
      { text: 'Plymouth', isCorrect: false },
      { text: 'Roanoke', isCorrect: false },
      { text: 'Salem', isCorrect: false }
    ],
    explanation: 'Jamestown, Virginia, was founded in 1607.'
  },
  {
    text: 'Who was the famous nurse during the Crimean War?',
    options: [
      { text: 'Florence Nightingale', isCorrect: true },
      { text: 'Clara Barton', isCorrect: false },
      { text: 'Mary Seacole', isCorrect: false },
      { text: 'Edith Cavell', isCorrect: false }
    ],
    explanation: 'Florence Nightingale is known as the founder of modern nursing.'
  },
  {
    text: 'Which ancient civilization built the Machu Picchu complex?',
    options: [
      { text: 'Incas', isCorrect: true },
      { text: 'Mayans', isCorrect: false },
      { text: 'Aztecs', isCorrect: false },
      { text: 'Olmecs', isCorrect: false }
    ],
    explanation: 'Machu Picchu was built by the Incas in the 15th century.'
  },
  {
    text: 'Who was the first Emperor of Rome?',
    options: [
      { text: 'Augustus', isCorrect: true },
      { text: 'Julius Caesar', isCorrect: false },
      { text: 'Nero', isCorrect: false },
      { text: 'Constantine', isCorrect: false }
    ],
    explanation: 'Augustus (Octavian) became the first Roman Emperor in 27 BCE.'
  },
  {
    text: 'In which year did World War II end?',
    options: [
      { text: '1945', isCorrect: true },
      { text: '1944', isCorrect: false },
      { text: '1946', isCorrect: false },
      { text: '1943', isCorrect: false }
    ],
    explanation: 'World War II ended in 1945 with the surrender of Germany and Japan.'
  },
  {
    text: 'Which dynasty ruled China for the longest time?',
    options: [
      { text: 'Han', isCorrect: true },
      { text: 'Ming', isCorrect: false },
      { text: 'Qing', isCorrect: false },
      { text: 'Tang', isCorrect: false }
    ],
    explanation: 'The Han Dynasty ruled China for over 400 years.'
  },
  {
    text: 'Who was the first President of the United States?',
    options: [
      { text: 'George Washington', isCorrect: true },
      { text: 'John Adams', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false },
      { text: 'James Madison', isCorrect: false }
    ],
    explanation: 'George Washington served as the first President from 1789 to 1797.'
  },
  {
    text: 'Which ancient civilization is known for the Hanging Gardens?',
    options: [
      { text: 'Babylonians', isCorrect: true },
      { text: 'Egyptians', isCorrect: false },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false }
    ],
    explanation: 'The Hanging Gardens of Babylon were one of the Seven Wonders of the Ancient World.'
  },
  {
    text: 'Who was the first female pharaoh of Egypt?',
    options: [
      { text: 'Hatshepsut', isCorrect: true },
      { text: 'Cleopatra', isCorrect: false },
      { text: 'Nefertiti', isCorrect: false },
      { text: 'Nefertari', isCorrect: false }
    ],
    explanation: 'Hatshepsut ruled Egypt as pharaoh in the 15th century BCE.'
  },
  {
    text: 'Which empire was ruled by Genghis Khan?',
    options: [
      { text: 'Mongol Empire', isCorrect: true },
      { text: 'Ottoman Empire', isCorrect: false },
      { text: 'Byzantine Empire', isCorrect: false },
      { text: 'Persian Empire', isCorrect: false }
    ],
    explanation: 'Genghis Khan founded and ruled the Mongol Empire in the 13th century.'
  },
  {
    text: 'In which year did the Titanic sink?',
    options: [
      { text: '1912', isCorrect: true },
      { text: '1910', isCorrect: false },
      { text: '1915', isCorrect: false },
      { text: '1920', isCorrect: false }
    ],
    explanation: 'The Titanic sank on April 15, 1912, after hitting an iceberg.'
  },
  {
    text: 'Which ancient civilization built the Great Wall of China?',
    options: [
      { text: 'Ming Dynasty', isCorrect: true },
      { text: 'Han Dynasty', isCorrect: false },
      { text: 'Qin Dynasty', isCorrect: false },
      { text: 'Tang Dynasty', isCorrect: false }
    ],
    explanation: 'The Great Wall of China was primarily built during the Ming Dynasty.'
  },
  {
    text: 'Who was the first President of Turkey?',
    options: [
      { text: 'Mustafa Kemal Atatürk', isCorrect: true },
      { text: 'Recep Tayyip Erdoğan', isCorrect: false },
      { text: 'Ismet Inönü', isCorrect: false },
      { text: 'Abdullah Gül', isCorrect: false }
    ],
    explanation: 'Mustafa Kemal Atatürk was the founder and first President of Turkey.'
  },
  {
    text: 'Which battle marked the end of Napoleons rule as Emperor of the French?',
    options: [
      { text: 'Battle of Waterloo', isCorrect: true },
      { text: 'Battle of Trafalgar', isCorrect: false },
      { text: 'Battle of Leipzig', isCorrect: false },
      { text: 'Battle of Austerlitz', isCorrect: false }
    ],
    explanation: 'Napoleon was defeated at the Battle of Waterloo in 1815.'
  },
  {
    text: 'Who was the first woman to fly solo across the Atlantic Ocean?',
    options: [
      { text: 'Amelia Earhart', isCorrect: true },
      { text: 'Harriet Quimby', isCorrect: false },
      { text: 'Bessie Coleman', isCorrect: false },
      { text: 'Valentina Tereshkova', isCorrect: false }
    ],
    explanation: 'Amelia Earhart flew solo across the Atlantic in 1932.'
  },
  {
    text: 'Which U.S. President was in office during the Cuban Missile Crisis?',
    options: [
      { text: 'John F. Kennedy', isCorrect: true },
      { text: 'Dwight D. Eisenhower', isCorrect: false },
      { text: 'Lyndon B. Johnson', isCorrect: false },
      { text: 'Richard Nixon', isCorrect: false }
    ],
    explanation: 'John F. Kennedy was President during the Cuban Missile Crisis in 1962.'
  },
  {
    text: 'What was the name of the ship Charles Darwin sailed on to the Galapagos Islands?',
    options: [
      { text: 'HMS Beagle', isCorrect: true },
      { text: 'HMS Endeavour', isCorrect: false },
      { text: 'HMS Victory', isCorrect: false },
      { text: 'HMS Bounty', isCorrect: false }
    ],
    explanation: 'Darwin sailed on the HMS Beagle.'
  },
  {
    text: 'Who was the first Chancellor of the German Empire?',
    options: [
      { text: 'Otto von Bismarck', isCorrect: true },
      { text: 'Wilhelm II', isCorrect: false },
      { text: 'Adolf Hitler', isCorrect: false },
      { text: 'Konrad Adenauer', isCorrect: false }
    ],
    explanation: 'Otto von Bismarck was the first Chancellor of the German Empire.'
  },
  {
    text: 'Which ancient civilization invented cuneiform writing?',
    options: [
      { text: 'Sumerians', isCorrect: true },
      { text: 'Egyptians', isCorrect: false },
      { text: 'Phoenicians', isCorrect: false },
      { text: 'Babylonians', isCorrect: false }
    ],
    explanation: 'The Sumerians invented cuneiform writing.'
  },
  {
    text: 'Who was the first Tsar of Russia?',
    options: [
      { text: 'Ivan the Terrible', isCorrect: true },
      { text: 'Peter the Great', isCorrect: false },
      { text: 'Nicholas II', isCorrect: false },
      { text: 'Catherine the Great', isCorrect: false }
    ],
    explanation: 'Ivan IV, known as Ivan the Terrible, was the first Tsar of Russia.'
  },
  {
    text: 'Which U.S. President signed the Civil Rights Act of 1964?',
    options: [
      { text: 'Lyndon B. Johnson', isCorrect: true },
      { text: 'John F. Kennedy', isCorrect: false },
      { text: 'Richard Nixon', isCorrect: false },
      { text: 'Dwight D. Eisenhower', isCorrect: false }
    ],
    explanation: 'Lyndon B. Johnson signed the Civil Rights Act in 1964.'
  },
  {
    text: 'Who was the first Emperor of China?',
    options: [
      { text: 'Qin Shi Huang', isCorrect: true },
      { text: 'Liu Bang', isCorrect: false },
      { text: 'Kublai Khan', isCorrect: false },
      { text: 'Sun Yat-sen', isCorrect: false }
    ],
    explanation: 'Qin Shi Huang was the first Emperor of a unified China.'
  },
  {
    text: 'Which explorer led the first expedition to circumnavigate the globe?',
    options: [
      { text: 'Ferdinand Magellan', isCorrect: true },
      { text: 'Christopher Columbus', isCorrect: false },
      { text: 'Vasco da Gama', isCorrect: false },
      { text: 'James Cook', isCorrect: false }
    ],
    explanation: 'Ferdinand Magellan led the first expedition to circumnavigate the globe.'
  },
  {
    text: 'Who was the founder of the Mongol Empire?',
    options: [
      { text: 'Genghis Khan', isCorrect: true },
      { text: 'Kublai Khan', isCorrect: false },
      { text: 'Tamerlane', isCorrect: false },
      { text: 'Ogedei Khan', isCorrect: false }
    ],
    explanation: 'Genghis Khan founded the Mongol Empire.'
  },
  {
    text: 'Which U.S. President was in office during the Great Depression and World War II?',
    options: [
      { text: 'Franklin D. Roosevelt', isCorrect: true },
      { text: 'Herbert Hoover', isCorrect: false },
      { text: 'Harry S. Truman', isCorrect: false },
      { text: 'Woodrow Wilson', isCorrect: false }
    ],
    explanation: 'Franklin D. Roosevelt was President during the Great Depression and most of WWII.'
  },
  {
    text: 'Who was the first female Prime Minister of India?',
    options: [
      { text: 'Indira Gandhi', isCorrect: true },
      { text: 'Sonia Gandhi', isCorrect: false },
      { text: 'Pratibha Patil', isCorrect: false },
      { text: 'Sarojini Naidu', isCorrect: false }
    ],
    explanation: 'Indira Gandhi was the first female Prime Minister of India.'
  },
  {
    text: 'Which war was fought between the United States and Mexico from 1846 to 1848?',
    options: [
      { text: 'Mexican-American War', isCorrect: true },
      { text: 'Spanish-American War', isCorrect: false },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Texas Revolution', isCorrect: false }
    ],
    explanation: 'The Mexican-American War was fought from 1846 to 1848.'
  },
  {
    text: 'Who was the first President of the Republic of China?',
    options: [
      { text: 'Sun Yat-sen', isCorrect: true },
      { text: 'Chiang Kai-shek', isCorrect: false },
      { text: 'Mao Zedong', isCorrect: false },
      { text: 'Yuan Shikai', isCorrect: false }
    ],
    explanation: 'Sun Yat-sen was the first President of the Republic of China.'
  },
  {
    text: 'Which ancient civilization built the city of Petra?',
    options: [
      { text: 'Nabataeans', isCorrect: true },
      { text: 'Romans', isCorrect: false },
      { text: 'Greeks', isCorrect: false },
      { text: 'Egyptians', isCorrect: false }
    ],
    explanation: 'The Nabataeans built the city of Petra.'
  },
  {
    text: 'Who was the first President of the Fifth French Republic?',
    options: [
      { text: 'Charles de Gaulle', isCorrect: true },
      { text: 'François Mitterrand', isCorrect: false },
      { text: 'Jacques Chirac', isCorrect: false },
      { text: 'Nicolas Sarkozy', isCorrect: false }
    ],
    explanation: 'Charles de Gaulle was the first President of the Fifth French Republic.'
  },
  {
    text: 'Which U.S. President purchased the Louisiana Territory from France?',
    options: [
      { text: 'Thomas Jefferson', isCorrect: true },
      { text: 'James Monroe', isCorrect: false },
      { text: 'John Adams', isCorrect: false },
      { text: 'James Madison', isCorrect: false }
    ],
    explanation: 'Thomas Jefferson purchased the Louisiana Territory in 1803.'
  },
  {
    text: 'Who was the first female ruler of Russia?',
    options: [
      { text: 'Catherine the Great', isCorrect: true },
      { text: 'Elizabeth I', isCorrect: false },
      { text: 'Anna Ivanovna', isCorrect: false },
      { text: 'Olga of Kiev', isCorrect: false }
    ],
    explanation: 'Catherine the Great was the first female ruler of Russia.'
  },
  {
    text: 'Who was the first President of the United States to be impeached?',
    options: [
      { text: 'Andrew Johnson', isCorrect: true },
      { text: 'Richard Nixon', isCorrect: false },
      { text: 'Bill Clinton', isCorrect: false },
      { text: 'Donald Trump', isCorrect: false }
    ],
    explanation: 'Andrew Johnson was the first U.S. President to be impeached in 1868.'
  },
  {
    text: 'Which ancient civilization built Stonehenge?',
    options: [
      { text: 'Neolithic Britons', isCorrect: true },
      { text: 'Romans', isCorrect: false },
      { text: 'Celts', isCorrect: false },
      { text: 'Vikings', isCorrect: false }
    ],
    explanation: 'Stonehenge was built by Neolithic Britons.'
  },
  {
    text: 'Who was the first President of the United States to resign from office?',
    options: [
      { text: 'Richard Nixon', isCorrect: true },
      { text: 'Gerald Ford', isCorrect: false },
      { text: 'Andrew Johnson', isCorrect: false },
      { text: 'Ulysses S. Grant', isCorrect: false }
    ],
    explanation: 'Richard Nixon resigned in 1974 due to the Watergate scandal.'
  },
  {
    text: 'Which war was fought between the British and the Zulu Kingdom in 1879?',
    options: [
      { text: 'Anglo-Zulu War', isCorrect: true },
      { text: 'Boer War', isCorrect: false },
      { text: 'Crimean War', isCorrect: false },
      { text: 'Opium War', isCorrect: false }
    ],
    explanation: 'The Anglo-Zulu War was fought in 1879.'
  },
  {
    text: 'Who was the first President of the United States to live in the White House?',
    options: [
      { text: 'John Adams', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false },
      { text: 'James Madison', isCorrect: false }
    ],
    explanation: 'John Adams was the first President to live in the White House.'
  },
  {
    text: 'Which ancient civilization built the Parthenon?',
    options: [
      { text: 'Greeks', isCorrect: true },
      { text: 'Romans', isCorrect: false },
      { text: 'Egyptians', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Parthenon was built by the ancient Greeks in Athens.'
  },
  {
    text: 'Who was the first female ruler of England?',
    options: [
      { text: 'Mary I', isCorrect: true },
      { text: 'Elizabeth I', isCorrect: false },
      { text: 'Anne', isCorrect: false },
      { text: 'Victoria', isCorrect: false }
    ],
    explanation: 'Mary I, also known as "Bloody Mary," was the first queen regnant of England.'
  },
  {
    text: 'Which U.S. President issued the New Deal?',
    options: [
      { text: 'Franklin D. Roosevelt', isCorrect: true },
      { text: 'Herbert Hoover', isCorrect: false },
      { text: 'Harry S. Truman', isCorrect: false },
      { text: 'Woodrow Wilson', isCorrect: false }
    ],
    explanation: 'Franklin D. Roosevelt issued the New Deal during the Great Depression.'
  },
  {
    text: 'Who was the first Emperor of Japan?',
    options: [
      { text: 'Emperor Jimmu', isCorrect: true },
      { text: 'Emperor Meiji', isCorrect: false },
      { text: 'Emperor Hirohito', isCorrect: false },
      { text: 'Emperor Taisho', isCorrect: false }
    ],
    explanation: 'Emperor Jimmu is considered the first Emperor of Japan.'
  },
  {
    text: 'Which war was fought between the United States and Spain in 1898?',
    options: [
      { text: 'Spanish-American War', isCorrect: true },
      { text: 'Mexican-American War', isCorrect: false },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Civil War', isCorrect: false }
    ],
    explanation: 'The Spanish-American War was fought in 1898.'
  },
  {
    text: 'Who was the first President of the United States to be assassinated?',
    options: [
      { text: 'Abraham Lincoln', isCorrect: true },
      { text: 'James Garfield', isCorrect: false },
      { text: 'William McKinley', isCorrect: false },
      { text: 'John F. Kennedy', isCorrect: false }
    ],
    explanation: 'Abraham Lincoln was assassinated in 1865.'
  },
  {
    text: 'Which ancient civilization built the city of Carthage?',
    options: [
      { text: 'Phoenicians', isCorrect: true },
      { text: 'Romans', isCorrect: false },
      { text: 'Greeks', isCorrect: false },
      { text: 'Egyptians', isCorrect: false }
    ],
    explanation: 'The Phoenicians founded Carthage.'
  },
  {
    text: 'Who was the first President of the United States to serve two non-consecutive terms?',
    options: [
      { text: 'Grover Cleveland', isCorrect: true },
      { text: 'Ulysses S. Grant', isCorrect: false },
      { text: 'Theodore Roosevelt', isCorrect: false },
      { text: 'Woodrow Wilson', isCorrect: false }
    ],
    explanation: 'Grover Cleveland served as the 22nd and 24th President.'
  },
  {
    text: 'Which war was fought between the Greeks and the city of Troy?',
    options: [
      { text: 'Trojan War', isCorrect: true },
      { text: 'Peloponnesian War', isCorrect: false },
      { text: 'Punic War', isCorrect: false },
      { text: 'Persian War', isCorrect: false }
    ],
    explanation: 'The Trojan War is a famous conflict in Greek mythology.'
  },
  {
    text: 'Who was the first President of the United States to die in office?',
    options: [
      { text: 'William Henry Harrison', isCorrect: true },
      { text: 'Zachary Taylor', isCorrect: false },
      { text: 'James A. Garfield', isCorrect: false },
      { text: 'Abraham Lincoln', isCorrect: false }
    ],
    explanation: 'William Henry Harrison died in 1841, just a month after taking office.'
  },
  {
    text: 'Which ancient civilization built the city of Babylon?',
    options: [
      { text: 'Babylonians', isCorrect: true },
      { text: 'Assyrians', isCorrect: false },
      { text: 'Persians', isCorrect: false },
      { text: 'Sumerians', isCorrect: false }
    ],
    explanation: 'The Babylonians built the city of Babylon.'
  },
  {
    text: 'Who was the first President of the United States to be born in a hospital?',
    options: [
      { text: 'Jimmy Carter', isCorrect: true },
      { text: 'John F. Kennedy', isCorrect: false },
      { text: 'Richard Nixon', isCorrect: false },
      { text: 'Lyndon B. Johnson', isCorrect: false }
    ],
    explanation: 'Jimmy Carter was the first U.S. President born in a hospital.'
  },
  {
    text: 'Which war was fought between the United States and Britain in 1812?',
    options: [
      { text: 'War of 1812', isCorrect: true },
      { text: 'Revolutionary War', isCorrect: false },
      { text: 'Civil War', isCorrect: false },
      { text: 'Mexican-American War', isCorrect: false }
    ],
    explanation: 'The War of 1812 was fought between the U.S. and Britain.'
  },
  {
    text: 'Who was the first President of the United States to be born outside the original 13 colonies?',
    options: [
      { text: 'Abraham Lincoln', isCorrect: true },
      { text: 'Andrew Jackson', isCorrect: false },
      { text: 'James K. Polk', isCorrect: false },
      { text: 'Martin Van Buren', isCorrect: false }
    ],
    explanation: 'Abraham Lincoln was born in Kentucky, outside the original 13 colonies.'
  },
  {
    text: 'Which ancient civilization built the city of Athens?',
    options: [
      { text: 'Greeks', isCorrect: true },
      { text: 'Romans', isCorrect: false },
      { text: 'Egyptians', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Greeks built the city of Athens.'
  },
  {
    text: 'Which battle marked the end of Napoleons rule as Emperor of the French?',
    options: [
      { text: 'Battle of Waterloo', isCorrect: true },
      { text: 'Battle of Trafalgar', isCorrect: false },
      { text: 'Battle of Austerlitz', isCorrect: false },
      { text: 'Battle of Borodino', isCorrect: false }
    ],
    explanation: 'Napoleon was defeated at the Battle of Waterloo in 1815.'
  },
  {
    text: 'Who was the first President of the United States to appear on television?',
    options: [
      { text: 'Franklin D. Roosevelt', isCorrect: true },
      { text: 'Herbert Hoover', isCorrect: false },
      { text: 'Harry S. Truman', isCorrect: false },
      { text: 'Dwight D. Eisenhower', isCorrect: false }
    ],
    explanation: 'Franklin D. Roosevelt was the first U.S. President to appear on TV, at the 1939 Worlds Fair.'
  },
  {
    text: 'Which ancient civilization built the city of Tenochtitlan?',
    options: [
      { text: 'Aztecs', isCorrect: true },
      { text: 'Mayans', isCorrect: false },
      { text: 'Incas', isCorrect: false },
      { text: 'Olmecs', isCorrect: false }
    ],
    explanation: 'The Aztecs built Tenochtitlan, now Mexico City.'
  },
  {
    text: 'Who was the first President of the United States to visit China?',
    options: [
      { text: 'Richard Nixon', isCorrect: true },
      { text: 'John F. Kennedy', isCorrect: false },
      { text: 'Gerald Ford', isCorrect: false },
      { text: 'Jimmy Carter', isCorrect: false }
    ],
    explanation: 'Richard Nixon visited China in 1972.'
  },
  {
    text: 'Which war was fought between the North and South in Korea from 1950 to 1953?',
    options: [
      { text: 'Korean War', isCorrect: true },
      { text: 'Vietnam War', isCorrect: false },
      { text: 'World War II', isCorrect: false },
      { text: 'Sino-Japanese War', isCorrect: false }
    ],
    explanation: 'The Korean War was fought from 1950 to 1953.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 20th century?',
    options: [
      { text: 'John F. Kennedy', isCorrect: true },
      { text: 'Lyndon B. Johnson', isCorrect: false },
      { text: 'Richard Nixon', isCorrect: false },
      { text: 'Gerald Ford', isCorrect: false }
    ],
    explanation: 'John F. Kennedy was born in 1917.'
  },
  {
    text: 'Which ancient civilization built the city of Persepolis?',
    options: [
      { text: 'Persians', isCorrect: true },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false },
      { text: 'Babylonians', isCorrect: false }
    ],
    explanation: 'The Persians built Persepolis as their ceremonial capital.'
  },
  {
    text: 'Who was the first President of the United States to be awarded the Nobel Peace Prize?',
    options: [
      { text: 'Theodore Roosevelt', isCorrect: true },
      { text: 'Woodrow Wilson', isCorrect: false },
      { text: 'Jimmy Carter', isCorrect: false },
      { text: 'Barack Obama', isCorrect: false }
    ],
    explanation: 'Theodore Roosevelt won the Nobel Peace Prize in 1906.'
  },
  {
    text: 'Which war was fought between the United States and the Confederacy?',
    options: [
      { text: 'Civil War', isCorrect: true },
      { text: 'Revolutionary War', isCorrect: false },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Spanish-American War', isCorrect: false }
    ],
    explanation: 'The American Civil War was fought from 1861 to 1865.'
  },
  {
    text: 'Who was the first President of the United States to be born in a log cabin?',
    options: [
      { text: 'Andrew Jackson', isCorrect: true },
      { text: 'Abraham Lincoln', isCorrect: false },
      { text: 'James Buchanan', isCorrect: false },
      { text: 'Millard Fillmore', isCorrect: false }
    ],
    explanation: 'Andrew Jackson was the first President born in a log cabin.'
  },
  {
    text: 'Which ancient civilization built the city of Thebes?',
    options: [
      { text: 'Egyptians', isCorrect: true },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Egyptians built the city of Thebes.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 19th century?',
    options: [
      { text: 'Millard Fillmore', isCorrect: true },
      { text: 'John Tyler', isCorrect: false },
      { text: 'James K. Polk', isCorrect: false },
      { text: 'Franklin Pierce', isCorrect: false }
    ],
    explanation: 'Millard Fillmore was born in 1800.'
  },
  {
    text: 'Which war was fought between the United States and the Barbary States?',
    options: [
      { text: 'Barbary Wars', isCorrect: true },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Mexican-American War', isCorrect: false },
      { text: 'Civil War', isCorrect: false }
    ],
    explanation: 'The Barbary Wars were fought in the early 19th century.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 21st century?',
    options: [
      { text: 'No president yet', isCorrect: true },
      { text: 'Barack Obama', isCorrect: false },
      { text: 'Donald Trump', isCorrect: false },
      { text: 'Joe Biden', isCorrect: false }
    ],
    explanation: 'As of 2024, no U.S. President has been born in the 21st century.'
  },
  {
    text: 'Which ancient civilization built the city of Ur?',
    options: [
      { text: 'Sumerians', isCorrect: true },
      { text: 'Babylonians', isCorrect: false },
      { text: 'Assyrians', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Sumerians built the city of Ur.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 18th century?',
    options: [
      { text: 'John Adams', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false },
      { text: 'James Madison', isCorrect: false }
    ],
    explanation: 'John Adams was born in 1735.'
  },
  {
    text: 'Which war was fought between the United States and the Philippines?',
    options: [
      { text: 'Philippine-American War', isCorrect: true },
      { text: 'Spanish-American War', isCorrect: false },
      { text: 'Vietnam War', isCorrect: false },
      { text: 'Korean War', isCorrect: false }
    ],
    explanation: 'The Philippine-American War was fought from 1899 to 1902.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 17th century?',
    options: [
      { text: 'None', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'John Adams', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false }
    ],
    explanation: 'No U.S. President was born in the 1600s.'
  },
  {
    text: 'Which ancient civilization built the city of Memphis?',
    options: [
      { text: 'Egyptians', isCorrect: true },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Egyptians built the city of Memphis.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 16th century?',
    options: [
      { text: 'None', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'John Adams', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false }
    ],
    explanation: 'No U.S. President was born in the 1500s.'
  },
  {
    text: 'Which war was fought between the United States and Tripoli?',
    options: [
      { text: 'First Barbary War', isCorrect: true },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Mexican-American War', isCorrect: false },
      { text: 'Civil War', isCorrect: false }
    ],
    explanation: 'The First Barbary War was fought from 1801 to 1805.'
  },
  {
    text: 'Who was the first President of the United States to appear on television?',
    options: [
      { text: 'Franklin D. Roosevelt', isCorrect: true },
      { text: 'Herbert Hoover', isCorrect: false },
      { text: 'Harry S. Truman', isCorrect: false },
      { text: 'Dwight D. Eisenhower', isCorrect: false }
    ],
    explanation: 'Franklin D. Roosevelt was the first U.S. President to appear on TV, at the 1939 World's Fair.'
  },
  {
    text: 'Which ancient civilization built the city of Tenochtitlan?',
    options: [
      { text: 'Aztecs', isCorrect: true },
      { text: 'Mayans', isCorrect: false },
      { text: 'Incas', isCorrect: false },
      { text: 'Olmecs', isCorrect: false }
    ],
    explanation: 'The Aztecs built Tenochtitlan, now Mexico City.'
  },
  {
    text: 'Who was the first President of the United States to visit China?',
    options: [
      { text: 'Richard Nixon', isCorrect: true },
      { text: 'John F. Kennedy', isCorrect: false },
      { text: 'Gerald Ford', isCorrect: false },
      { text: 'Jimmy Carter', isCorrect: false }
    ],
    explanation: 'Richard Nixon visited China in 1972.'
  },
  {
    text: 'Which war was fought between the North and South in Korea from 1950 to 1953?',
    options: [
      { text: 'Korean War', isCorrect: true },
      { text: 'Vietnam War', isCorrect: false },
      { text: 'World War II', isCorrect: false },
      { text: 'Sino-Japanese War', isCorrect: false }
    ],
    explanation: 'The Korean War was fought from 1950 to 1953.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 20th century?',
    options: [
      { text: 'John F. Kennedy', isCorrect: true },
      { text: 'Lyndon B. Johnson', isCorrect: false },
      { text: 'Richard Nixon', isCorrect: false },
      { text: 'Gerald Ford', isCorrect: false }
    ],
    explanation: 'John F. Kennedy was born in 1917.'
  },
  {
    text: 'Which ancient civilization built the city of Persepolis?',
    options: [
      { text: 'Persians', isCorrect: true },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false },
      { text: 'Babylonians', isCorrect: false }
    ],
    explanation: 'The Persians built Persepolis as their ceremonial capital.'
  },
  {
    text: 'Who was the first President of the United States to be awarded the Nobel Peace Prize?',
    options: [
      { text: 'Theodore Roosevelt', isCorrect: true },
      { text: 'Woodrow Wilson', isCorrect: false },
      { text: 'Jimmy Carter', isCorrect: false },
      { text: 'Barack Obama', isCorrect: false }
    ],
    explanation: 'Theodore Roosevelt won the Nobel Peace Prize in 1906.'
  },
  {
    text: 'Which war was fought between the United States and the Confederacy?',
    options: [
      { text: 'Civil War', isCorrect: true },
      { text: 'Revolutionary War', isCorrect: false },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Spanish-American War', isCorrect: false }
    ],
    explanation: 'The American Civil War was fought from 1861 to 1865.'
  },
  {
    text: 'Who was the first President of the United States to be born in a log cabin?',
    options: [
      { text: 'Andrew Jackson', isCorrect: true },
      { text: 'Abraham Lincoln', isCorrect: false },
      { text: 'James Buchanan', isCorrect: false },
      { text: 'Millard Fillmore', isCorrect: false }
    ],
    explanation: 'Andrew Jackson was the first President born in a log cabin.'
  },
  {
    text: 'Which ancient civilization built the city of Thebes?',
    options: [
      { text: 'Egyptians', isCorrect: true },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Egyptians built the city of Thebes.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 19th century?',
    options: [
      { text: 'Millard Fillmore', isCorrect: true },
      { text: 'John Tyler', isCorrect: false },
      { text: 'James K. Polk', isCorrect: false },
      { text: 'Franklin Pierce', isCorrect: false }
    ],
    explanation: 'Millard Fillmore was born in 1800.'
  },
  {
    text: 'Which war was fought between the United States and the Barbary States?',
    options: [
      { text: 'Barbary Wars', isCorrect: true },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Mexican-American War', isCorrect: false },
      { text: 'Civil War', isCorrect: false }
    ],
    explanation: 'The Barbary Wars were fought in the early 19th century.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 21st century?',
    options: [
      { text: 'No president yet', isCorrect: true },
      { text: 'Barack Obama', isCorrect: false },
      { text: 'Donald Trump', isCorrect: false },
      { text: 'Joe Biden', isCorrect: false }
    ],
    explanation: 'As of 2024, no U.S. President has been born in the 21st century.'
  },
  {
    text: 'Which ancient civilization built the city of Ur?',
    options: [
      { text: 'Sumerians', isCorrect: true },
      { text: 'Babylonians', isCorrect: false },
      { text: 'Assyrians', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Sumerians built the city of Ur.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 18th century?',
    options: [
      { text: 'John Adams', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false },
      { text: 'James Madison', isCorrect: false }
    ],
    explanation: 'John Adams was born in 1735.'
  },
  {
    text: 'Which war was fought between the United States and the Philippines?',
    options: [
      { text: 'Philippine-American War', isCorrect: true },
      { text: 'Spanish-American War', isCorrect: false },
      { text: 'Vietnam War', isCorrect: false },
      { text: 'Korean War', isCorrect: false }
    ],
    explanation: 'The Philippine-American War was fought from 1899 to 1902.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 17th century?',
    options: [
      { text: 'None', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'John Adams', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false }
    ],
    explanation: 'No U.S. President was born in the 1600s.'
  },
  {
    text: 'Which ancient civilization built the city of Memphis?',
    options: [
      { text: 'Egyptians', isCorrect: true },
      { text: 'Greeks', isCorrect: false },
      { text: 'Romans', isCorrect: false },
      { text: 'Persians', isCorrect: false }
    ],
    explanation: 'The Egyptians built the city of Memphis.'
  },
  {
    text: 'Who was the first President of the United States to be born in the 16th century?',
    options: [
      { text: 'None', isCorrect: true },
      { text: 'George Washington', isCorrect: false },
      { text: 'John Adams', isCorrect: false },
      { text: 'Thomas Jefferson', isCorrect: false }
    ],
    explanation: 'No U.S. President was born in the 1500s.'
  },
  {
    text: 'Which war was fought between the United States and Tripoli?',
    options: [
      { text: 'First Barbary War', isCorrect: true },
      { text: 'War of 1812', isCorrect: false },
      { text: 'Mexican-American War', isCorrect: false },
      { text: 'Civil War', isCorrect: false }
    ],
    explanation: 'The First Barbary War was fought from 1801 to 1805.'
  },
];

const generalQuestionsBase = [
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

const scienceQuestionsBase = [
  {
    text: 'What is the chemical symbol for gold?',
    options: [
      { text: 'Au', isCorrect: true },
      { text: 'Ag', isCorrect: false },
      { text: 'Fe', isCorrect: false },
      { text: 'Cu', isCorrect: false }
    ],
    explanation: 'The chemical symbol for gold is Au, from the Latin word "aurum."'
  },
  {
    text: 'Which planet is known as the Red Planet?',
    options: [
      { text: 'Mars', isCorrect: true },
      { text: 'Venus', isCorrect: false },
      { text: 'Jupiter', isCorrect: false },
      { text: 'Saturn', isCorrect: false }
    ],
    explanation: 'Mars is called the Red Planet due to its reddish appearance.'
  },
  {
    text: 'What is the hardest natural substance on Earth?',
    options: [
      { text: 'Diamond', isCorrect: true },
      { text: 'Quartz', isCorrect: false },
      { text: 'Topaz', isCorrect: false },
      { text: 'Ruby', isCorrect: false }
    ],
    explanation: 'Diamond is the hardest natural substance on Earth.'
  },
  {
    text: 'Which gas do plants absorb from the air?',
    options: [
      { text: 'Carbon Dioxide', isCorrect: true },
      { text: 'Oxygen', isCorrect: false },
      { text: 'Nitrogen', isCorrect: false },
      { text: 'Hydrogen', isCorrect: false }
    ],
    explanation: 'Plants absorb carbon dioxide for photosynthesis.'
  },
  {
    text: 'What is the main component of the Sun?',
    options: [
      { text: 'Hydrogen', isCorrect: true },
      { text: 'Helium', isCorrect: false },
      { text: 'Oxygen', isCorrect: false },
      { text: 'Carbon', isCorrect: false }
    ],
    explanation: 'The Sun is primarily composed of hydrogen.'
  },
  {
    text: 'Which of the following is a type of electromagnetic radiation?',
    options: [
      { text: 'X-rays', isCorrect: true },
      { text: 'Sound waves', isCorrect: false },
      { text: 'Water waves', isCorrect: false },
      { text: 'Seismic waves', isCorrect: false }
    ],
    explanation: 'X-rays are a type of electromagnetic radiation.'
  },
  {
    text: 'What is the process by which plants make their own food?',
    options: [
      { text: 'Photosynthesis', isCorrect: true },
      { text: 'Respiration', isCorrect: false },
      { text: 'Digestion', isCorrect: false },
      { text: 'Fermentation', isCorrect: false }
    ],
    explanation: 'Photosynthesis is the process by which plants make their own food.'
  },
  {
    text: 'Which of the following is a noble gas?',
    options: [
      { text: 'Helium', isCorrect: true },
      { text: 'Chlorine', isCorrect: false },
      { text: 'Fluorine', isCorrect: false },
      { text: 'Bromine', isCorrect: false }
    ],
    explanation: 'Helium is a noble gas.'
  },
  {
    text: 'What is the SI unit of electric current?',
    options: [
      { text: 'Ampere', isCorrect: true },
      { text: 'Volt', isCorrect: false },
      { text: 'Ohm', isCorrect: false },
      { text: 'Watt', isCorrect: false }
    ],
    explanation: 'The SI unit of electric current is the ampere.'
  },
  {
    text: 'Which of the following is a type of RNA?',
    options: [
      { text: 'mRNA', isCorrect: true },
      { text: 'DNA', isCorrect: false },
      { text: 'ATP', isCorrect: false },
      { text: 'NAD', isCorrect: false }
    ],
    explanation: 'mRNA is a type of RNA involved in protein synthesis.'
  },
  {
    text: 'What is the chemical formula for water?',
    options: [
      { text: 'H2O', isCorrect: true },
      { text: 'CO2', isCorrect: false },
      { text: 'O2', isCorrect: false },
      { text: 'H2SO4', isCorrect: false }
    ],
    explanation: 'The chemical formula for water is H2O.'
  },
  {
    text: 'Which of the following is a type of force?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Energy', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Gravity is a type of force.'
  },
  {
    text: 'What is the main function of the mitochondria?',
    options: [
      { text: 'Energy production', isCorrect: true },
      { text: 'Protein synthesis', isCorrect: false },
      { text: 'Waste removal', isCorrect: false },
      { text: 'Cell division', isCorrect: false }
    ],
    explanation: 'Mitochondria are responsible for energy production in cells.'
  },
  {
    text: 'Which of the following is a type of chemical bond?',
    options: [
      { text: 'Covalent', isCorrect: true },
      { text: 'Kinetic', isCorrect: false },
      { text: 'Potential', isCorrect: false },
      { text: 'Thermal', isCorrect: false }
    ],
    explanation: 'A covalent bond is a type of chemical bond.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of cell division?',
    options: [
      { text: 'Mitosis', isCorrect: true },
      { text: 'Photosynthesis', isCorrect: false },
      { text: 'Respiration', isCorrect: false },
      { text: 'Fermentation', isCorrect: false }
    ],
    explanation: 'Mitosis is a type of cell division.'
  },
  {
    text: 'What is the chemical symbol for silver?',
    options: [
      { text: 'Ag', isCorrect: true },
      { text: 'Au', isCorrect: false },
      { text: 'Fe', isCorrect: false },
      { text: 'Cu', isCorrect: false }
    ],
    explanation: 'The chemical symbol for silver is Ag, from the Latin word "argentum."'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the chemical symbol for iron?',
    options: [
      { text: 'Fe', isCorrect: true },
      { text: 'Ir', isCorrect: false },
      { text: 'In', isCorrect: false },
      { text: 'Fr', isCorrect: false }
    ],
    explanation: 'The chemical symbol for iron is Fe, from the Latin word "ferrum."'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the chemical symbol for copper?',
    options: [
      { text: 'Cu', isCorrect: true },
      { text: 'Co', isCorrect: false },
      { text: 'Cr', isCorrect: false },
      { text: 'Ca', isCorrect: false }
    ],
    explanation: 'The chemical symbol for copper is Cu, from the Latin word "cuprum."'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the name of the process by which water changes from a gas to a liquid?',
    options: [
      { text: 'Condensation', isCorrect: true },
      { text: 'Evaporation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Condensation is the process by which water changes from a gas to a liquid.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
  {
    text: 'What is the chemical symbol for carbon?',
    options: [
      { text: 'C', isCorrect: true },
      { text: 'Ca', isCorrect: false },
      { text: 'Co', isCorrect: false },
      { text: 'Cr', isCorrect: false }
    ],
    explanation: 'The chemical symbol for carbon is C.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Fusion', isCorrect: true },
      { text: 'Combustion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Fusion is a type of nuclear reaction.'
  },
  {
    text: 'What is the chemical symbol for oxygen?',
    options: [
      { text: 'O', isCorrect: true },
      { text: 'Ox', isCorrect: false },
      { text: 'O2', isCorrect: false },
      { text: 'O3', isCorrect: false }
    ],
    explanation: 'The chemical symbol for oxygen is O.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Red Blood Cell', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A red blood cell is a type of cell found in the blood.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the chemical symbol for nitrogen?',
    options: [
      { text: 'N', isCorrect: true },
      { text: 'Ni', isCorrect: false },
      { text: 'Na', isCorrect: false },
      { text: 'Ne', isCorrect: false }
    ],
    explanation: 'The chemical symbol for nitrogen is N.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the chemical symbol for hydrogen?',
    options: [
      { text: 'H', isCorrect: true },
      { text: 'He', isCorrect: false },
      { text: 'Hy', isCorrect: false },
      { text: 'Ho', isCorrect: false }
    ],
    explanation: 'The chemical symbol for hydrogen is H.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the chemical symbol for carbon?',
    options: [
      { text: 'C', isCorrect: true },
      { text: 'Ca', isCorrect: false },
      { text: 'Co', isCorrect: false },
      { text: 'Cr', isCorrect: false }
    ],
    explanation: 'The chemical symbol for carbon is C.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a gas to a liquid?',
    options: [
      { text: 'Condensation', isCorrect: true },
      { text: 'Evaporation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Condensation is the process by which water changes from a gas to a liquid.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Fusion', isCorrect: true },
      { text: 'Combustion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Fusion is a type of nuclear reaction.'
  },
  {
    text: 'What is the chemical symbol for helium?',
    options: [
      { text: 'He', isCorrect: true },
      { text: 'H', isCorrect: false },
      { text: 'Hy', isCorrect: false },
      { text: 'Ho', isCorrect: false }
    ],
    explanation: 'The chemical symbol for helium is He.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'White Blood Cell', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A white blood cell is a type of cell found in the blood.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the chemical symbol for neon?',
    options: [
      { text: 'Ne', isCorrect: true },
      { text: 'N', isCorrect: false },
      { text: 'Ni', isCorrect: false },
      { text: 'Na', isCorrect: false }
    ],
    explanation: 'The chemical symbol for neon is Ne.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the chemical symbol for argon?',
    options: [
      { text: 'Ar', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'Ag', isCorrect: false },
      { text: 'Au', isCorrect: false }
    ],
    explanation: 'The chemical symbol for argon is Ar.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the chemical symbol for krypton?',
    options: [
      { text: 'Kr', isCorrect: true },
      { text: 'K', isCorrect: false },
      { text: 'Ky', isCorrect: false },
      { text: 'Ko', isCorrect: false }
    ],
    explanation: 'The chemical symbol for krypton is Kr.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
  {
    text: 'What is the chemical symbol for xenon?',
    options: [
      { text: 'Xe', isCorrect: true },
      { text: 'X', isCorrect: false },
      { text: 'Xn', isCorrect: false },
      { text: 'Xo', isCorrect: false }
    ],
    explanation: 'The chemical symbol for xenon is Xe.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Muscle Cell', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A muscle cell is a type of cell found in muscle tissue.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the chemical symbol for radon?',
    options: [
      { text: 'Rn', isCorrect: true },
      { text: 'R', isCorrect: false },
      { text: 'Rd', isCorrect: false },
      { text: 'Ro', isCorrect: false }
    ],
    explanation: 'The chemical symbol for radon is Rn.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the chemical symbol for uranium?',
    options: [
      { text: 'U', isCorrect: true },
      { text: 'Ur', isCorrect: false },
      { text: 'Un', isCorrect: false },
      { text: 'Uo', isCorrect: false }
    ],
    explanation: 'The chemical symbol for uranium is U.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the chemical symbol for plutonium?',
    options: [
      { text: 'Pu', isCorrect: true },
      { text: 'P', isCorrect: false },
      { text: 'Pl', isCorrect: false },
      { text: 'Po', isCorrect: false }
    ],
    explanation: 'The chemical symbol for plutonium is Pu.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a gas to a liquid?',
    options: [
      { text: 'Condensation', isCorrect: true },
      { text: 'Evaporation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Condensation is the process by which water changes from a gas to a liquid.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Fusion', isCorrect: true },
      { text: 'Combustion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Fusion is a type of nuclear reaction.'
  },
  {
    text: 'What is the chemical symbol for americium?',
    options: [
      { text: 'Am', isCorrect: true },
      { text: 'A', isCorrect: false },
      { text: 'Am', isCorrect: false },
      { text: 'Ao', isCorrect: false }
    ],
    explanation: 'The chemical symbol for americium is Am.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'White Blood Cell', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A white blood cell is a type of cell found in the blood.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the chemical symbol for curium?',
    options: [
      { text: 'Cm', isCorrect: true },
      { text: 'C', isCorrect: false },
      { text: 'Cu', isCorrect: false },
      { text: 'Co', isCorrect: false }
    ],
    explanation: 'The chemical symbol for curium is Cm.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the chemical symbol for berkelium?',
    options: [
      { text: 'Bk', isCorrect: true },
      { text: 'B', isCorrect: false },
      { text: 'Be', isCorrect: false },
      { text: 'Bo', isCorrect: false }
    ],
    explanation: 'The chemical symbol for berkelium is Bk.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the chemical symbol for californium?',
    options: [
      { text: 'Cf', isCorrect: true },
      { text: 'C', isCorrect: false },
      { text: 'Ca', isCorrect: false },
      { text: 'Co', isCorrect: false }
    ],
    explanation: 'The chemical symbol for californium is Cf.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
  {
    text: 'What is the chemical symbol for einsteinium?',
    options: [
      { text: 'Es', isCorrect: true },
      { text: 'E', isCorrect: false },
      { text: 'Ei', isCorrect: false },
      { text: 'En', isCorrect: false }
    ],
    explanation: 'The chemical symbol for einsteinium is Es.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Muscle Cell', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A muscle cell is a type of cell found in muscle tissue.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the chemical symbol for fermium?',
    options: [
      { text: 'Fm', isCorrect: true },
      { text: 'F', isCorrect: false },
      { text: 'Fe', isCorrect: false },
      { text: 'Fr', isCorrect: false }
    ],
    explanation: 'The chemical symbol for fermium is Fm.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the chemical symbol for mendelevium?',
    options: [
      { text: 'Md', isCorrect: true },
      { text: 'M', isCorrect: false },
      { text: 'Me', isCorrect: false },
      { text: 'Mn', isCorrect: false }
    ],
    explanation: 'The chemical symbol for mendelevium is Md.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the chemical symbol for nobelium?',
    options: [
      { text: 'No', isCorrect: true },
      { text: 'N', isCorrect: false },
      { text: 'Nb', isCorrect: false },
      { text: 'Ni', isCorrect: false }
    ],
    explanation: 'The chemical symbol for nobelium is No.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a gas to a liquid?',
    options: [
      { text: 'Condensation', isCorrect: true },
      { text: 'Evaporation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Condensation is the process by which water changes from a gas to a liquid.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Fusion', isCorrect: true },
      { text: 'Combustion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Fusion is a type of nuclear reaction.'
  },
  {
    text: 'What is the chemical symbol for lawrencium?',
    options: [
      { text: 'Lr', isCorrect: true },
      { text: 'L', isCorrect: false },
      { text: 'La', isCorrect: false },
      { text: 'Li', isCorrect: false }
    ],
    explanation: 'The chemical symbol for lawrencium is Lr.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'White Blood Cell', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A white blood cell is a type of cell found in the blood.'
  },
  {
    text: 'What is the name of the force that opposes motion?',
    options: [
      { text: 'Friction', isCorrect: true },
      { text: 'Gravity', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Friction is the force that opposes motion.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Kinetic', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Kinetic energy is the energy of motion.'
  },
  {
    text: 'What is the chemical symbol for rutherfordium?',
    options: [
      { text: 'Rf', isCorrect: true },
      { text: 'R', isCorrect: false },
      { text: 'Ru', isCorrect: false },
      { text: 'Rh', isCorrect: false }
    ],
    explanation: 'The chemical symbol for rutherfordium is Rf.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Light', isCorrect: true },
      { text: 'Sound', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Light is a type of electromagnetic wave.'
  },
  {
    text: 'What is the name of the process by which water changes from a liquid to a gas?',
    options: [
      { text: 'Evaporation', isCorrect: true },
      { text: 'Condensation', isCorrect: false },
      { text: 'Sublimation', isCorrect: false },
      { text: 'Deposition', isCorrect: false }
    ],
    explanation: 'Evaporation is the process by which water changes from a liquid to a gas.'
  },
  {
    text: 'Which of the following is a type of reaction?',
    options: [
      { text: 'Combustion', isCorrect: true },
      { text: 'Fusion', isCorrect: false },
      { text: 'Fission', isCorrect: false },
      { text: 'Sublimation', isCorrect: false }
    ],
    explanation: 'Combustion is a type of chemical reaction.'
  },
  {
    text: 'What is the chemical symbol for dubnium?',
    options: [
      { text: 'Db', isCorrect: true },
      { text: 'D', isCorrect: false },
      { text: 'Du', isCorrect: false },
      { text: 'Do', isCorrect: false }
    ],
    explanation: 'The chemical symbol for dubnium is Db.'
  },
  {
    text: 'Which of the following is a type of cell?',
    options: [
      { text: 'Neuron', isCorrect: true },
      { text: 'Atom', isCorrect: false },
      { text: 'Molecule', isCorrect: false },
      { text: 'Element', isCorrect: false }
    ],
    explanation: 'A neuron is a type of cell found in the nervous system.'
  },
  {
    text: 'What is the name of the force that keeps planets in orbit around the Sun?',
    options: [
      { text: 'Gravity', isCorrect: true },
      { text: 'Friction', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Inertia', isCorrect: false }
    ],
    explanation: 'Gravity is the force that keeps planets in orbit around the Sun.'
  },
  {
    text: 'Which of the following is a type of energy?',
    options: [
      { text: 'Potential', isCorrect: true },
      { text: 'Force', isCorrect: false },
      { text: 'Momentum', isCorrect: false },
      { text: 'Velocity', isCorrect: false }
    ],
    explanation: 'Potential energy is the energy stored in an object due to its position.'
  },
  {
    text: 'What is the chemical symbol for seaborgium?',
    options: [
      { text: 'Sg', isCorrect: true },
      { text: 'S', isCorrect: false },
      { text: 'Se', isCorrect: false },
      { text: 'Si', isCorrect: false }
    ],
    explanation: 'The chemical symbol for seaborgium is Sg.'
  },
  {
    text: 'Which of the following is a type of wave?',
    options: [
      { text: 'Sound', isCorrect: true },
      { text: 'Light', isCorrect: false },
      { text: 'Water', isCorrect: false },
      { text: 'Seismic', isCorrect: false }
    ],
    explanation: 'Sound is a type of mechanical wave.'
  },
];

const historyQuestions = generateQuestions(historyQuestionsBase, 'History');
const scienceQuestions = generateQuestions(scienceQuestionsBase, 'Science');
const generalQuestions = generateQuestions(generalQuestionsBase, 'General');

async function main() {
  // Clear existing data
  await prisma.quizAttempt.deleteMany();
  await prisma.answer.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.category.deleteMany();

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com';
  // Create categories
  const historyCategory = await prisma.category.create({
    data: {
      name: 'History',
      description: 'Questions about world history and historical events'
    }
  });

  const scienceCategory = await prisma.category.create({
    data: {
      name: 'Science',
      description: 'Questions about various scientific disciplines'
    }
  });

  const generalCategory = await prisma.category.create({
    data: {
      name: 'General Knowledge',
      description: 'Questions about various topics including geography, culture, and current events'
    }
  });

  // Create History Quiz
   // Upsert admin user (no password field)
   await prisma.user.upsert({
    where: { email: adminEmail },
    update: { role: 'ADMIN' },
    create: {
      email: adminEmail,
      name: 'Admin',
      role: 'ADMIN',
    },
  });
  
  const historyQuiz = await prisma.quiz.create({
    data: {
      title: 'World History Quiz',
      description: 'Test your knowledge of world history from ancient civilizations to modern times',
      categoryId: historyCategory.id,
      timeLimit: 30,
      createdBy: 'system',
      questions: {
        create: historyQuestions.map(q => ({
          text: q.text,
          explanation: q.explanation,
          options: {
            create: q.options
          }
        }))
      }
    }
  });

  // Create Science Quiz
  const scienceQuiz = await prisma.quiz.create({
    data: {
      title: 'General Science Quiz',
      description: 'Test your knowledge of physics, chemistry, biology, and astronomy',
      categoryId: scienceCategory.id,
      timeLimit: 30,
      createdBy: 'system',
      questions: {
        create: scienceQuestions.map(q => ({
          text: q.text,
          explanation: q.explanation,
          options: {
            create: q.options
          }
        }))
      }
    }
  });

  // Create General Knowledge Quiz
  const generalQuiz = await prisma.quiz.create({
    data: {
      title: 'General Knowledge Quiz',
      description: 'Test your knowledge of various topics including geography, culture, and current events',
      categoryId: generalCategory.id,
      timeLimit: 30,
      createdBy: 'system',
      questions: {
        create: generalQuestions.map(q => ({
          text: q.text,
          explanation: q.explanation,
          options: {
            create: q.options
          }
        }))
      }
    }
  });

  console.log('Database has been seeded. 🌱');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 