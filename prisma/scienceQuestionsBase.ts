// 30 real, unique science questions for seeding

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

module.exports = { scienceQuestionsBase }; 