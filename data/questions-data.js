/**
 * LearnMate AI — Comprehensive Question Bank
 * Supports MCQs, True/False, Short Answer, and Numerical questions
 * tagged by Board, Class, Subject, Chapter, and Difficulty Level.
 */

const QUESTIONS_DATABASE = [
  {
    "id": "cbse-10-sci-1-q1",
    "chapterId": "cbse_10_sci_1",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "What type of reaction occurs when quicklime (calcium oxide) reacts vigorously with water to produce slaked lime?",
    "options": [
      "Combination and Exothermic",
      "Decomposition and Endothermic",
      "Displacement reaction",
      "Photochemical reaction"
    ],
    "correct": 0,
    "correctAnswer": "Combination and Exothermic",
    "explanation": "CaO + H2O -> Ca(OH)2 + Heat. Two reactants unite into one product and heat is released, making it combination and exothermic.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-1-q2",
    "chapterId": "cbse_10_sci_1",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "A shiny brown-colored element 'X' on heating in air becomes black in color. Identify element 'X' and the black-colored compound formed:",
    "options": [
      "Copper and Copper(II) Oxide (CuO)",
      "Iron and Iron Oxide (Fe2O3)",
      "Silver and Silver Sulfide (Ag2S)",
      "Magnesium and MgO"
    ],
    "correct": 0,
    "correctAnswer": "Copper and Copper(II) Oxide (CuO)",
    "explanation": "Copper (Cu) is reddish-brown. When heated in oxygen, it oxidizes to form black copper(II) oxide (2Cu + O2 -> 2CuO).",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-1-q3",
    "chapterId": "cbse_10_sci_1",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Difficult",
    "question": "Which of the following is an example of a double displacement and precipitation reaction?",
    "options": [
      "BaCl\u2082(aq) + Na\u2082SO\u2084(aq) \u2794 BaSO\u2084(s)\u2193 + 2NaCl(aq)",
      "2H\u2082 + O\u2082 \u2794 2H\u2082O",
      "Zn + H\u2082SO\u2084 \u2794 ZnSO\u2084 + H\u2082",
      "2Pb(NO\u2083)\u2082 \u2794 2PbO + 4NO\u2082 + O\u2082"
    ],
    "correct": 0,
    "correctAnswer": "BaCl\u2082(aq) + Na\u2082SO\u2084(aq) \u2794 BaSO\u2084(s)\u2193 + 2NaCl(aq)",
    "explanation": "Barium chloride exchanges ions with sodium sulfate to form an insoluble white precipitate of barium sulfate (BaSO4).",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-1-q4",
    "chapterId": "cbse_10_sci_1",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "True/False",
    "difficulty": "Easy",
    "question": "In a balanced chemical equation, the total mass of the reactants is equal to the total mass of the products.",
    "options": [
      "True",
      "False"
    ],
    "correct": 0,
    "correctAnswer": "True",
    "explanation": "This directly reflects the fundamental Law of Conservation of Mass.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-1-q5",
    "chapterId": "cbse_10_sci_1",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "Short Answer",
    "difficulty": "Moderate",
    "question": "Why do we store hydrogen peroxide in dark or colored bottles?",
    "options": [],
    "correct": null,
    "correctAnswer": "Hydrogen peroxide slowly decomposes into water and oxygen when exposed to light (photochemical decomposition). Dark bottles prevent light penetration.",
    "explanation": "2H2O2 --Light--> 2H2O + O2. Opaque or amber bottles block photochemical acceleration.",
    "marks": 2
  },
  {
    "id": "cbse-10-sci-2-q1",
    "chapterId": "cbse_10_sci_2",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "Which acid is naturally present in curd / sour milk?",
    "options": [
      "Lactic acid",
      "Citric acid",
      "Oxalic acid",
      "Tartaric acid"
    ],
    "correct": 0,
    "correctAnswer": "Lactic acid",
    "explanation": "Lactic acid is produced by Lactobacillus bacteria fermenting lactose in milk into curd.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-2-q2",
    "chapterId": "cbse_10_sci_2",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "Bleaching powder is chemically produced by passing chlorine gas over which substance?",
    "options": [
      "Dry slaked lime [Ca(OH)\u2082]",
      "Quicklime [CaO]",
      "Limestone [CaCO\u2083]",
      "Gypsum [CaSO\u2084\u00b72H\u2082O]"
    ],
    "correct": 0,
    "correctAnswer": "Dry slaked lime [Ca(OH)\u2082]",
    "explanation": "Ca(OH)\u2082 + Cl\u2082 -> CaOCl\u2082 (Bleaching powder) + H\u2082O.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-2-q3",
    "chapterId": "cbse_10_sci_2",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "True/False",
    "difficulty": "Easy",
    "question": "Distilled water conducts electricity readily.",
    "options": [
      "True",
      "False"
    ],
    "correct": 1,
    "correctAnswer": "False",
    "explanation": "Distilled water contains virtually no free dissolved mineral ions and therefore does not conduct electricity. Rainwater conducts because dissolved gases form ions.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-3-q1",
    "chapterId": "cbse_10_sci_3",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "Which non-metal is a good conductor of electricity?",
    "options": [
      "Graphite (allotrope of carbon)",
      "Diamond",
      "Sulphur",
      "Phosphorus"
    ],
    "correct": 0,
    "correctAnswer": "Graphite (allotrope of carbon)",
    "explanation": "In graphite, each carbon atom bonds to 3 other carbons in planar hexagonal layers, leaving one free delocalized electron per atom to conduct electricity.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-3-q2",
    "chapterId": "cbse_10_sci_3",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "During electrolytic refining of impure copper, where does the pure copper deposit?",
    "options": [
      "At the Cathode",
      "At the Anode",
      "In the anode mud",
      "Suspended in electrolyte solution"
    ],
    "correct": 0,
    "correctAnswer": "At the Cathode",
    "explanation": "Cu\u00b2\u207a ions in the electrolyte migrate to the negatively charged cathode, accept 2 electrons, and deposit as pure copper (Cu\u00b2\u207a + 2e\u207b -> Cu).",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-5-q1",
    "chapterId": "cbse_10_sci_5",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "What is the functional filtration unit of the human kidney called?",
    "options": [
      "Nephron",
      "Neuron",
      "Alveolus",
      "Villus"
    ],
    "correct": 0,
    "correctAnswer": "Nephron",
    "explanation": "Each human kidney contains approximately 1 million microscopic filtering units called nephrons. (Neurons are nerve cells).",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-5-q2",
    "chapterId": "cbse_10_sci_5",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "During intense physical sprinting, accumulation of which chemical substance in muscle fibers causes painful cramps?",
    "options": [
      "Lactic acid",
      "Ethanol",
      "Carbon dioxide",
      "Hydrochloric acid"
    ],
    "correct": 0,
    "correctAnswer": "Lactic acid",
    "explanation": "When oxygen delivery falls behind cellular energy demand, muscle cells switch to anaerobic fermentation of pyruvate into lactic acid.",
    "marks": 1
  },
  {
    "id": "cbse-10-math-1-q1",
    "chapterId": "cbse_10_math_1",
    "subjectId": "mathematics",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "What is the HCF of two consecutive natural numbers n and n + 1?",
    "options": [
      "1",
      "2",
      "n",
      "n(n + 1)"
    ],
    "correct": 0,
    "correctAnswer": "1",
    "explanation": "Any two consecutive integers have a difference of 1 and share no common factors other than 1, making them coprime.",
    "marks": 1
  },
  {
    "id": "cbse-10-math-1-q2",
    "chapterId": "cbse_10_math_1",
    "subjectId": "mathematics",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "The product of a non-zero rational number and an irrational number is always:",
    "options": [
      "Irrational",
      "Rational",
      "An integer",
      "Zero"
    ],
    "correct": 0,
    "correctAnswer": "Irrational",
    "explanation": "If r \u00d7 i = q (where r is non-zero rational and q is rational), then i = q/r would be rational, creating a contradiction.",
    "marks": 1
  },
  {
    "id": "mh-10-sci1-1-q1",
    "chapterId": "mh_10_sci1_1",
    "subjectId": "science_part_1",
    "boardId": "maharashtra",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "Who formulated the three empirical laws describing planetary motion around the Sun?",
    "options": [
      "Johannes Kepler",
      "Isaac Newton",
      "Galileo Galilei",
      "Albert Einstein"
    ],
    "correct": 0,
    "correctAnswer": "Johannes Kepler",
    "explanation": "Johannes Kepler deduced the three laws of planetary motion by analyzing Tycho Brahe's astronomical observations.",
    "marks": 1
  },
  {
    "id": "mh-10-sci1-1-q2",
    "chapterId": "mh_10_sci1_1",
    "subjectId": "science_part_1",
    "boardId": "maharashtra",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "What is the SI unit of Universal Gravitational Constant G?",
    "options": [
      "N\u00b7m\u00b2/kg\u00b2",
      "N\u00b7m/kg",
      "m/s\u00b2",
      "kg\u00b7m/s"
    ],
    "correct": 0,
    "correctAnswer": "N\u00b7m\u00b2/kg\u00b2",
    "explanation": "Rearranging F = G*m1*m2/r\u00b2 gives G = F*r\u00b2/(m1*m2) = N*m\u00b2/kg\u00b2.",
    "marks": 1
  },
  {
    "id": "cbse-10-math-2-q1",
    "chapterId": "cbse_10_math_2",
    "subjectId": "mathematics",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "What is the maximum number of zeroes a quadratic polynomial ax\u00b2 + bx + c (a \u2260 0) can have?",
    "options": [
      "2",
      "1",
      "3",
      "Infinite"
    ],
    "correct": 0,
    "correctAnswer": "2",
    "explanation": "By the Fundamental Theorem of Algebra, a polynomial of degree n can have at most n real zeroes. A quadratic polynomial has degree 2, so it has at most 2 zeroes.",
    "marks": 1
  },
  {
    "id": "cbse-10-math-2-q2",
    "chapterId": "cbse_10_math_2",
    "subjectId": "mathematics",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "If \u03b1 and \u03b2 are the zeroes of the polynomial p(x) = 2x\u00b2 - 5x + 7, what is the value of \u03b1 + \u03b2?",
    "options": [
      "5/2",
      "-5/2",
      "7/2",
      "-7/2"
    ],
    "correct": 0,
    "correctAnswer": "5/2",
    "explanation": "For quadratic polynomial ax\u00b2 + bx + c, sum of zeroes \u03b1 + \u03b2 = -b/a = -(-5)/2 = 5/2.",
    "marks": 1
  },
  {
    "id": "cbse-10-math-4-q1",
    "chapterId": "cbse_10_math_4",
    "subjectId": "mathematics",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "If the discriminant D = b\u00b2 - 4ac of a quadratic equation is equal to 0, the roots are:",
    "options": [
      "Real and Equal",
      "Real and Distinct",
      "Complex / Imaginary",
      "Undefined"
    ],
    "correct": 0,
    "correctAnswer": "Real and Equal",
    "explanation": "When discriminant D = 0, the quadratic formula x = (-b \u00b1 \u221a0)/(2a) yields two identical real roots: x = -b/(2a).",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-9-q1",
    "chapterId": "cbse_10_sci_9",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "Which type of mirror is preferred as a rear-view mirror in motor vehicles?",
    "options": [
      "Convex mirror",
      "Concave mirror",
      "Plane mirror",
      "Parabolic mirror"
    ],
    "correct": 0,
    "correctAnswer": "Convex mirror",
    "explanation": "Convex mirrors always form an erect, diminished virtual image and provide a much wider field of view than plane mirrors.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-9-q2",
    "chapterId": "cbse_10_sci_9",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "What is the focal length of a spherical lens having power of -2.0 Dioptres?",
    "options": [
      "-0.5 m (concave lens)",
      "+0.5 m (convex lens)",
      "-2.0 m",
      "+2.0 m"
    ],
    "correct": 0,
    "correctAnswer": "-0.5 m (concave lens)",
    "explanation": "Power P = 1/f (in meters). Therefore f = 1/P = 1/(-2.0) = -0.5 m. The negative sign designates a diverging (concave) lens.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-11-q1",
    "chapterId": "cbse_10_sci_11",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "What is the SI unit of electric potential difference (voltage)?",
    "options": [
      "Volt (V)",
      "Ampere (A)",
      "Ohm (\u03a9)",
      "Watt (W)"
    ],
    "correct": 0,
    "correctAnswer": "Volt (V)",
    "explanation": "1 Volt = 1 Joule per Coulomb (1 V = 1 J/C). Ampere is for current, Ohm for resistance, and Watt for power.",
    "marks": 1
  },
  {
    "id": "cbse-10-sci-11-q2",
    "chapterId": "cbse_10_sci_11",
    "subjectId": "science",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "If three resistors of resistances 2 \u03a9, 3 \u03a9, and 6 \u03a9 are connected in parallel, what is their equivalent resistance?",
    "options": [
      "1 \u03a9",
      "11 \u03a9",
      "3 \u03a9",
      "0.5 \u03a9"
    ],
    "correct": 0,
    "correctAnswer": "1 \u03a9",
    "explanation": "1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 6/6 = 1. Therefore R_eq = 1 \u03a9.",
    "marks": 1
  },
  {
    "id": "mh-10-m1-1-q1",
    "chapterId": "mh_10_m1_1",
    "subjectId": "math_part_1",
    "boardId": "maharashtra",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "In Cramer's Rule for solving simultaneous equations, the determinant Dx is obtained by replacing which coefficients with constants?",
    "options": [
      "Replacing x-coefficients with constant terms",
      "Replacing y-coefficients with constant terms",
      "Replacing both x and y",
      "Squaring all terms"
    ],
    "correct": 0,
    "correctAnswer": "Replacing x-coefficients with constant terms",
    "explanation": "In Cramer's rule, Dx replaces the column of x-coefficients [a1, a2] with constant terms [c1, c2]. Then x = Dx / D.",
    "marks": 1
  },
  {
    "id": "mh-10-m1-1-q2",
    "chapterId": "mh_10_m1_1",
    "subjectId": "math_part_1",
    "boardId": "maharashtra",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "What is the degree of a linear equation in two variables ax + by + c = 0?",
    "options": [
      "1",
      "2",
      "0",
      "Undefined"
    ],
    "correct": 0,
    "correctAnswer": "1",
    "explanation": "In a linear equation, the highest power of each variable term is 1, producing a straight line graph.",
    "marks": 1
  },
  {
    "id": "mh-10-m2-2-q1",
    "chapterId": "mh_10_m2_2",
    "subjectId": "math_part_2",
    "boardId": "maharashtra",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "Which of the following triples is a Pythagorean triplet?",
    "options": [
      "(3, 4, 5)",
      "(2, 3, 4)",
      "(4, 5, 6)",
      "(5, 6, 7)"
    ],
    "correct": 0,
    "correctAnswer": "(3, 4, 5)",
    "explanation": "3\u00b2 + 4\u00b2 = 9 + 16 = 25 = 5\u00b2. Satisfies a\u00b2 + b\u00b2 = c\u00b2.",
    "marks": 1
  },
  {
    "id": "mh-10-sci1-2-q1",
    "chapterId": "mh_10_sci1_2",
    "subjectId": "science_part_1",
    "boardId": "maharashtra",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "Henry Moseley established that the fundamental property of an element is its:",
    "options": [
      "Atomic Number (Z)",
      "Atomic Mass (A)",
      "Density",
      "Melting point"
    ],
    "correct": 0,
    "correctAnswer": "Atomic Number (Z)",
    "explanation": "In 1913, Moseley showed through X-ray spectra that atomic number (number of protons) is more fundamental than atomic mass for periodic periodicity.",
    "marks": 1
  },
  {
    "id": "cbse-10-eng-1-q1",
    "chapterId": "cbse_10_eng_1",
    "subjectId": "english",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Easy",
    "question": "In 'A Letter to God' by G.L. Fuentes, what did Lencho hope for to save his ripe corn crops?",
    "options": [
      "A gentle downpour or shower of rain",
      "A sudden heavy snowfall",
      "New chemical fertilizers",
      "A tractor"
    ],
    "correct": 0,
    "correctAnswer": "A gentle downpour or shower of rain",
    "explanation": "Lencho hoped for rain to nourish his crops, but unfortunately a devastating hailstorm destroyed his entire field.",
    "marks": 1
  },
  {
    "id": "cbse-10-soc-1-q1",
    "chapterId": "cbse_10_soc_1",
    "subjectId": "social",
    "boardId": "cbse",
    "classNum": "10",
    "type": "MCQ",
    "difficulty": "Moderate",
    "question": "Who was proclaimed the King of United Italy in 1861 during the unification of Italy?",
    "options": [
      "Victor Emmanuel II",
      "Giuseppe Garibaldi",
      "Count Cavour",
      "Giuseppe Mazzini"
    ],
    "correct": 0,
    "correctAnswer": "Victor Emmanuel II",
    "explanation": "Victor Emmanuel II was proclaimed King of United Italy in 1861 following the diplomatic and military campaigns led by Cavour and Garibaldi.",
    "marks": 1
  }
];

if (typeof window !== 'undefined') {
  window.QUESTIONS_DATABASE = QUESTIONS_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { QUESTIONS_DATABASE };
}
