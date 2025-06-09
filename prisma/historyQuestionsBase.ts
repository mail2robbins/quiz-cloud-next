// 100 real, unique history questions for seeding
/**
 * Each question: {
 *   text: string,
 *   options: Array<{ text: string, isCorrect: boolean }>,
 *   explanation: string
 * }
 */

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

module.exports = { historyQuestionsBase }; 