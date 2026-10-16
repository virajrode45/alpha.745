/**
 * LearnMate AI — Modular Chapter Notes Database
 * Comprehensive, verified study notes across Beginner, Moderate, and Pro levels.
 */

const NOTES_DATABASE = {
  "cbse_10_sci_1": {
    "chapterId": "cbse_10_sci_1",
    "chapterName": "Chemical Reactions and Equations",
    "subjectName": "Science",
    "boardName": "CBSE",
    "classNum": "10",
    "isAuthored": true,
    "source": "NCERT & State Board Curriculum Framework",
    "levels": {
      "Beginner": {
        "levelName": "Beginner",
        "levelBadgeClass": "beginner-badge",
        "title": "Chemical Reactions and Equations \u2014 Beginner Foundations",
        "overview": "A chemical reaction happens when original ingredients (called reactants) rearrange their bonds to create brand-new substances (called products). Unlike physical changes (like melting ice where water stays H2O), chemical changes produce entirely new identities that cannot be easily reversed.",
        "analogy": "Think of baking a chocolate cake: once eggs, sugar, flour, and cocoa powder are baked with oven heat, you cannot separate them back into eggs and flour. The chemical bonds transformed forever into a delicious new treat!",
        "definitions": [
          {
            "term": "Reactants",
            "def": "The starting materials that participate in a chemical reaction (written on the left side of the arrow)."
          },
          {
            "term": "Products",
            "def": "The new substances formed as a result of the chemical transformation (written on the right side)."
          },
          {
            "term": "Law of Conservation of Mass",
            "def": "Matter can neither be created nor destroyed in a chemical reaction; atoms simply change partners."
          }
        ],
        "formulas": [
          {
            "expr": "Reactants \u2794 Products",
            "desc": "General chemical equation format."
          },
          {
            "expr": "2H\u2082 + O\u2082 \u2794 2H\u2082O",
            "desc": "Formation of water: 4 hydrogen atoms and 2 oxygen atoms balance perfectly on both sides."
          }
        ],
        "workedExample": {
          "problem": "Why must a chemical equation always be balanced?",
          "steps": [
            "Step 1: Recall the Law of Conservation of Mass stated by Antoine Lavoisier.",
            "Step 2: The total mass of elements present in the products must equal the total mass present in the reactants.",
            "Step 3: Therefore, the number of atoms of each element must remain identical before and after the reaction."
          ],
          "solution": "Balancing ensures that no atoms mysteriously appear or vanish during the reaction."
        },
        "examTips": [
          "Always count the number of atoms of each element on both sides before declaring an equation balanced.",
          "Write the physical states (s, l, g, aq) next to formulas to earn extra presentation marks in CBSE board exams!"
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Which of the following observations confirms that a chemical reaction has taken place?",
            "options": [
              "Change in state and color",
              "Evolution of a gas",
              "Change in temperature",
              "All of the above"
            ],
            "correct": 3,
            "answer": "All of the above",
            "explanation": "Chemical changes are signaled by color shifts, gas release, temperature swings (heat absorbed or released), or precipitate formation."
          },
          {
            "type": "True/False",
            "question": "Rusting of an iron nail in moist air is a reversible physical change.",
            "options": [
              "True",
              "False"
            ],
            "correct": 1,
            "answer": "False",
            "explanation": "Rusting is an irreversible chemical oxidation reaction forming hydrated iron(III) oxide (Fe2O3\u00b7xH2O)."
          }
        ]
      },
      "Moderate": {
        "levelName": "Moderate",
        "levelBadgeClass": "moderate-badge",
        "title": "Chemical Reactions and Equations \u2014 Moderate Exam Preparation",
        "overview": "Detailed study of chemical equation balancing and the five major categories of reactions: Combination, Decomposition (thermal, electrolytic, photochemical), Displacement, Double Displacement (precipitation), and Redox (Reduction-Oxidation). We also investigate exothermic and endothermic reactions alongside real-world effects like corrosion and rancidity.",
        "analogy": "Imagine a dance floor: Combination is two solo dancers joining as a pair (A + B \u2794 AB); Decomposition is a dance pair splitting apart (AB \u2794 A + B); Displacement is when an energetic new dancer steps in and takes a partner (A + BC \u2794 AC + B)!",
        "definitions": [
          {
            "term": "Combination Reaction",
            "def": "A reaction where two or more reactants combine to form a single product (e.g. CaO + H\u2082O \u2794 Ca(OH)\u2082 + Heat)."
          },
          {
            "term": "Decomposition Reaction",
            "def": "A reaction where a single reactant breaks down into two or more simpler products using heat, light, or electricity."
          },
          {
            "term": "Redox Reaction",
            "def": "A complementary reaction where oxidation (loss of electrons / gain of oxygen) and reduction (gain of electrons / loss of oxygen) occur simultaneously."
          }
        ],
        "formulas": [
          {
            "expr": "Fe(s) + CuSO\u2084(aq) \u2794 FeSO\u2084(aq) + Cu(s)",
            "desc": "Displacement: More reactive iron displaces copper from copper sulfate, turning blue solution to pale green."
          },
          {
            "expr": "MnO\u2082 + 4HCl \u2794 MnCl\u2082 + 2H\u2082O + Cl\u2082",
            "desc": "Redox: HCl is oxidized to Cl\u2082; MnO\u2082 is reduced to MnCl\u2082."
          }
        ],
        "workedExample": {
          "problem": "Balance the skeletal equation: Fe + H\u2082O \u2794 Fe\u2083O\u2084 + H\u2082",
          "steps": [
            "Step 1: Balance Iron (Fe): Place coefficient 3 before Fe on LHS \u2794 3Fe + H\u2082O \u2794 Fe\u2083O\u2084 + H\u2082.",
            "Step 2: Balance Oxygen (O): Products have 4 oxygens in Fe\u2083O\u2084, so place 4 before H\u2082O \u2794 3Fe + 4H\u2082O \u2794 Fe\u2083O\u2084 + H\u2082.",
            "Step 3: Balance Hydrogen (H): Reactants now have 4\u00d72 = 8 hydrogens, so place 4 before H\u2082 on RHS \u2794 3Fe + 4H\u2082O \u2794 Fe\u2083O\u2084 + 4H\u2082.",
            "Step 4: Verify atom counts: LHS (3 Fe, 8 H, 4 O) = RHS (3 Fe, 8 H, 4 O). Balanced!"
          ],
          "solution": "Balanced Equation: 3Fe(s) + 4H\u2082O(g) \u2794 Fe\u2083O\u2084(s) + 4H\u2082(g)"
        },
        "examTips": [
          "In decomposition reactions, identify the energy source: Heat = Thermal, Electricity = Electrolytic, Sunlight = Photochemical (e.g., AgCl in sunlight).",
          "Respiration is exothermic because glucose combines with oxygen in cells releasing ATP energy."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "When white silver chloride (AgCl) is exposed to sunlight for a few hours, it turns grey due to:",
            "options": [
              "Formation of silver by photochemical decomposition",
              "Sublimation of silver chloride",
              "Evolution of chlorine gas only",
              "Oxidation of silver"
            ],
            "correct": 0,
            "answer": "Formation of silver by photochemical decomposition",
            "explanation": "2AgCl(s) --Sunlight--> 2Ag(s) [grey] + Cl2(g). This photochemical reaction is used in black-and-white photography."
          },
          {
            "type": "Short Answer",
            "question": "What is rancidity and what is one common method used by food manufacturers to prevent it?",
            "options": [],
            "correct": null,
            "answer": "Rancidity is the aerial oxidation of fats and oils in food resulting in foul odor and unpleasant taste. Manufacturers flush snack packets (like potato chips) with inert nitrogen gas (N2) to prevent oxidation.",
            "explanation": "Nitrogen creates an unreactive cushion preventing atmospheric oxygen from oxidizing unsaturated lipids."
          }
        ]
      },
      "Pro": {
        "levelName": "Pro",
        "levelBadgeClass": "pro-badge",
        "title": "Chemical Reactions and Equations \u2014 Pro Mastery & HOTS",
        "overview": "Advanced chemical mechanics covering electronic theory of redox processes, assigning formal oxidation states, distinguishing oxidizing and reducing agents, thermodynamic driving forces (Gibbs free energy and enthalpy in exothermic/endothermic shifts), and passivation kinetics in corrosion prevention.",
        "analogy": "At the atomic level, redox is like an international electronic currency exchange: the substance being oxidized transfers electrons (currency), while the reducing agent is the generous donor enabling someone else's reduction!",
        "definitions": [
          {
            "term": "Electronic Concept of Redox",
            "def": "Oxidation Is Loss of electrons (OIL); Reduction Is Gain of electrons (RIG). Mnemonics: OIL RIG."
          },
          {
            "term": "Oxidizing Agent (Oxidant)",
            "def": "The chemical species that accepts electrons and consequently undergoes reduction itself while facilitating oxidation of another reactant."
          },
          {
            "term": "Galvanization & Sacrificial Anode",
            "def": "Protecting iron from electrochemical corrosion by coating with more electropositive zinc, which oxidizes preferentially."
          }
        ],
        "formulas": [
          {
            "expr": "Zn(s) + Cu\u00b2\u207a(aq) \u2794 Zn\u00b2\u207a(aq) + Cu(s)",
            "desc": "Net ionic redox: Zn loses 2e\u207b (oxidation); Cu\u00b2\u207a gains 2e\u207b (reduction)."
          },
          {
            "expr": "\u0394G = \u0394H - T\u0394S",
            "desc": "Thermodynamic feasibility: Exothermic reactions (\u0394H < 0) often have favorable negative Gibbs energy."
          }
        ],
        "workedExample": {
          "problem": "Identify the oxidizing and reducing agents in: 2PbO + C \u2794 2Pb + CO\u2082",
          "steps": [
            "Step 1: Track oxygen transfer: Lead oxide (PbO) loses oxygen to become elemental Pb. Loss of oxygen = Reduction.",
            "Step 2: Carbon (C) gains oxygen to become carbon dioxide (CO\u2082). Gain of oxygen = Oxidation.",
            "Step 3: Species that is reduced (PbO) acts as the Oxidizing Agent because it supplied oxygen for carbon's oxidation.",
            "Step 4: Species that is oxidized (C) acts as the Reducing Agent because it extracted oxygen from PbO."
          ],
          "solution": "Oxidizing Agent: PbO; Reducing Agent: Carbon (C)."
        },
        "examTips": [
          "In competitive questions, remember that displacement only occurs if the standalone metal is higher in the electrochemical activity series than the cation in solution.",
          "Copper cannot displace hydrogen from dilute HCl because copper lies below hydrogen in the reactivity series."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Which of the following statements about the reaction 2FeCl\u2083 + H\u2082S \u2794 2FeCl\u2082 + 2HCl + S is correct?",
            "options": [
              "Fe\u00b3\u207a is reduced to Fe\u00b2\u207a and H\u2082S acts as the reducing agent",
              "Fe\u00b3\u207a is oxidized to Fe\u00b2\u207a and H\u2082S is the oxidizing agent",
              "Chlorine is oxidized",
              "Hydrogen is reduced"
            ],
            "correct": 0,
            "answer": "Fe\u00b3\u207a is reduced to Fe\u00b2\u207a and H\u2082S acts as the reducing agent",
            "explanation": "Fe goes from oxidation state +3 to +2 (gain of electron = reduction). Sulfur in H\u2082S goes from -2 to 0 in elemental S (loss of electrons = oxidation, acting as reducing agent)."
          },
          {
            "type": "Numerical",
            "question": "How many moles of oxygen gas (O\u2082) are required to completely combust 2 moles of propane (C\u2083H\u2088)?",
            "options": [],
            "correct": null,
            "answer": "10 moles of O\u2082",
            "explanation": "Balanced equation: C\u2083H\u2088 + 5O\u2082 \u2794 3CO\u2082 + 4H\u2082O. 1 mole of C\u2083H\u2088 requires 5 moles of O\u2082. Therefore, 2 moles of C\u2083H\u2088 require 2 \u00d7 5 = 10 moles of O\u2082."
          }
        ]
      }
    }
  },
  "cbse_10_sci_2": {
    "chapterId": "cbse_10_sci_2",
    "chapterName": "Acids, Bases and Salts",
    "subjectName": "Science",
    "boardName": "CBSE",
    "classNum": "10",
    "isAuthored": true,
    "source": "NCERT & State Board Curriculum Framework",
    "levels": {
      "Beginner": {
        "levelName": "Beginner",
        "levelBadgeClass": "beginner-badge",
        "title": "Acids, Bases and Salts \u2014 Beginner Foundations",
        "overview": "Acids are sour-tasting substances that turn blue litmus paper red, while bases taste bitter, feel soapy or slippery to the touch, and turn red litmus blue. When an acid and a base meet, they neutralize each other to produce neutral salt and water!",
        "analogy": "Acids and bases are like hot and cold water: mix boiling tea with ice cubes and you get pleasant lukewarm water. In chemistry, strong acid plus strong base produces neutral, safe saltwater!",
        "definitions": [
          {
            "term": "Acid",
            "def": "A chemical that produces hydrogen ions (H+ or H3O+) when dissolved in water."
          },
          {
            "term": "Base (Alkali)",
            "def": "A substance that produces hydroxide ions (OH-) in water. Soluble bases are called alkalis."
          },
          {
            "term": "pH Scale",
            "def": "A number scale from 0 to 14 measuring how acidic or basic a liquid is. 7 is neutral, below 7 is acidic, above 7 is basic."
          }
        ],
        "formulas": [
          {
            "expr": "Acid + Base \u2794 Salt + Water",
            "desc": "Neutralization reaction."
          },
          {
            "expr": "HCl + NaOH \u2794 NaCl + H\u2082O",
            "desc": "Hydrochloric acid and sodium hydroxide form common table salt and water."
          }
        ],
        "workedExample": {
          "problem": "Why does a bee sting hurt and why does applying baking soda give relief?",
          "steps": [
            "Step 1: Bee venom injects an acidic liquid (formic acid / methanoic acid) into the skin.",
            "Step 2: Baking soda (sodium hydrogencarbonate) is a mild base.",
            "Step 3: Rubbing baking soda paste neutralizes the acid, reducing the burning sensation."
          ],
          "solution": "Mild base neutralizes the stinging acid, bringing pH back to comfortable levels."
        },
        "examTips": [
          "Remember: Acids turn Blue litmus Red (A-B-R: Acid turns Blue Red). Bases turn Red litmus Blue (B-B: Base turns Blue).",
          "Pure water has a neutral pH of exactly 7 at room temperature."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "What is the pH of an aqueous solution that turns phenolphthalein indicator pink?",
            "options": [
              "pH = 3",
              "pH = 5",
              "pH = 7",
              "pH = 9"
            ],
            "correct": 3,
            "answer": "pH = 9",
            "explanation": "Phenolphthalein remains colorless in acidic or neutral solutions and turns vibrant pink in basic solutions (pH > 8.2)."
          }
        ]
      },
      "Moderate": {
        "levelName": "Moderate",
        "levelBadgeClass": "moderate-badge",
        "title": "Acids, Bases and Salts \u2014 Moderate Exam Preparation",
        "overview": "Rigorous treatment of ionic dissociation, the Arrhenius theory, chemical properties of acids and bases (reactions with metals, metal carbonates, metal oxides), universal indicators, importance of pH in daily life (tooth decay, soil testing, acid rain), and manufacturing of important industrial salts: Caustic Soda (Chlor-alkali process), Bleaching Powder, Baking Soda, Washing Soda, and Plaster of Paris.",
        "analogy": "The pH scale is logarithmic: moving from pH 6 to pH 5 doesn't mean it's 1 unit more acidic, it is 10 times more concentrated in H+ ions! Like the Richter scale for earthquakes, each step multiplies by 10.",
        "definitions": [
          {
            "term": "Universal Indicator",
            "def": "A mixture of several indicators that shows different color gradients across the entire pH spectrum from 0 to 14."
          },
          {
            "term": "Water of Crystallization",
            "def": "The fixed number of water molecules chemically bonded in one formula unit of a salt (e.g., CuSO\u2084\u00b75H\u2082O)."
          },
          {
            "term": "Chlor-Alkali Process",
            "def": "Electrolysis of aqueous sodium chloride (brine) producing chlorine gas, hydrogen gas, and sodium hydroxide."
          }
        ],
        "formulas": [
          {
            "expr": "2NaCl(aq) + 2H\u2082O(l) \u2794 2NaOH(aq) + Cl\u2082(g) + H\u2082(g)",
            "desc": "Industrial Chlor-alkali process."
          },
          {
            "expr": "CaSO\u2084\u00b7\u00bdH\u2082O + 1\u00bdH\u2082O \u2794 CaSO\u2084\u00b72H\u2082O",
            "desc": "Plaster of Paris setting into hard Gypsum upon hydration."
          }
        ],
        "workedExample": {
          "problem": "A compound 'X' is used by doctors to support fractured bones in position. Name 'X' and write its reaction with water.",
          "steps": [
            "Step 1: Identify compound 'X': Doctors use Plaster of Paris, which is Calcium Sulfate Hemihydrate (CaSO\u2084\u00b7\u00bdH\u2082O).",
            "Step 2: Mixing with water triggers recrystallization into hard gypsum (CaSO\u2084\u00b72H\u2082O).",
            "Step 3: Write balanced reaction: CaSO\u2084\u00b7\u00bdH\u2082O + 1\u00bdH\u2082O \u2794 CaSO\u2084\u00b72H\u2082O."
          ],
          "solution": "Compound X is Plaster of Paris (CaSO\u2084\u00b7\u00bdH\u2082O). When mixed with water, it sets into a hard solid mass (Gypsum)."
        },
        "examTips": [
          "Always add acid to water slowly with constant stirring, NEVER add water to concentrated acid! The reaction is extremely exothermic and can cause acid to violently splash out.",
          "Tooth decay begins when mouth pH falls below 5.5, because bacteria break down sugar to produce acid that dissolves calcium phosphate enamel."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Which gas is evolved when dilute hydrochloric acid reacts with sodium carbonate?",
            "options": [
              "Hydrogen (H2)",
              "Carbon Dioxide (CO2)",
              "Chlorine (Cl2)",
              "Oxygen (O2)"
            ],
            "correct": 1,
            "answer": "Carbon Dioxide (CO2)",
            "explanation": "Na2CO3 + 2HCl -> 2NaCl + H2O + CO2. The released CO2 turns lime water milky."
          }
        ]
      },
      "Pro": {
        "levelName": "Pro",
        "levelBadgeClass": "pro-badge",
        "title": "Acids, Bases and Salts \u2014 Pro Mastery & HOTS",
        "overview": "Advanced ionic equilibria, autoprotolysis of water (Kw = [H+][OH-] = 10^-14 at 25\u00b0C), buffer systems in biological blood pH regulation (pH 7.35\u20137.45), amphoteric oxides (Al2O3, ZnO), salt hydrolysis (acidic, basic, neutral salts), and crystal hydration thermodynamics.",
        "analogy": "Amphoteric substances like aluminum oxide are bilingual diplomats: facing a strong acid, they act like a base; facing a strong base, they turn around and behave like an acid!",
        "definitions": [
          {
            "term": "Amphoteric Oxides",
            "def": "Metal oxides that react with both acids and bases to produce salt and water (e.g. Al\u2082O\u2083, ZnO)."
          },
          {
            "term": "Salt Hydrolysis",
            "def": "Reaction of cations or anions of a salt with water to alter the solution pH away from neutral 7."
          },
          {
            "term": "Br\u00f8nsted-Lowry Theory",
            "def": "An acid is a proton (H+) donor; a base is a proton acceptor."
          }
        ],
        "formulas": [
          {
            "expr": "Al\u2082O\u2083 + 6HCl \u2794 2AlCl\u2083 + 3H\u2082O",
            "desc": "Alumina acting as a base against acid."
          },
          {
            "expr": "Al\u2082O\u2083 + 2NaOH \u2794 2NaAlO\u2082 + H\u2082O",
            "desc": "Alumina acting as an acid against strong base, forming sodium aluminate."
          }
        ],
        "workedExample": {
          "problem": "Explain why an aqueous solution of ammonium chloride (NH\u2084Cl) is acidic (pH < 7), while sodium carbonate (Na\u2082CO\u2083) is basic (pH > 7).",
          "steps": [
            "Step 1: NH\u2084Cl is formed from a weak base (NH\u2084OH) and a strong acid (HCl).",
            "Step 2: Cationic hydrolysis occurs: NH\u2084\u207a + H\u2082O \u21cc NH\u2084OH + H\u207a. The excess H\u207a ions make the solution acidic.",
            "Step 3: Na\u2082CO\u2083 is formed from a strong base (NaOH) and a weak acid (H\u2082CO\u2083).",
            "Step 4: Anionic hydrolysis occurs: CO\u2083\u00b2\u207b + H\u2082O \u21cc HCO\u2083\u207b + OH\u207b. The excess OH\u207b ions render the solution alkaline."
          ],
          "solution": "Salts of strong acid + weak base are acidic; salts of strong base + weak acid are basic."
        },
        "examTips": [
          "In Olympiad questions, note that dry HCl gas does NOT change the color of dry blue litmus paper because hydrogen ions only dissociate in aqueous medium to form hydronium ions (H3O+).",
          "Kw increases with temperature because auto-ionization of water is an endothermic process."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "What is the pH of a 10\u207b\u2078 M aqueous solution of HCl at 25\u00b0C?",
            "options": [
              "8.0",
              "6.98 (slightly less than 7)",
              "7.00",
              "2.00"
            ],
            "correct": 1,
            "answer": "6.98 (slightly less than 7)",
            "explanation": "At extreme dilution (10\u207b\u2078 M), the H\u207a contribution from water auto-ionization (10\u207b\u2077 M) cannot be neglected. Total [H\u207a] \u2248 10\u207b\u2078 + 10\u207b\u2077 = 1.1 \u00d7 10\u207b\u2077 M, giving pH \u2248 -log(1.1 \u00d7 10\u207b\u2077) = 6.96 to 6.98. An acid solution cannot have a basic pH of 8!"
          }
        ]
      }
    }
  },
  "cbse_10_sci_3": {
    "chapterId": "cbse_10_sci_3",
    "chapterName": "Metals and Non-metals",
    "subjectName": "Science",
    "boardName": "CBSE",
    "classNum": "10",
    "isAuthored": true,
    "source": "NCERT & State Board Curriculum Framework",
    "levels": {
      "Beginner": {
        "levelName": "Beginner",
        "levelBadgeClass": "beginner-badge",
        "title": "Metals and Non-metals \u2014 Beginner Foundations",
        "overview": "Elements are divided into metals and non-metals. Metals are usually shiny, malleable (can be beaten into thin sheets), ductile (can be drawn into wires), sonorous (make ringing sounds), and excellent conductors of heat and electricity. Non-metals have opposite properties, but are crucial for life (like oxygen and carbon).",
        "analogy": "Metals are like generous team players in sports: they love to give away valence electrons to achieve stability, while non-metals gladly catch those electrons to complete their outer shells!",
        "definitions": [
          {
            "term": "Malleability",
            "def": "The physical property of a metal allowing it to be hammered into ultra-thin sheets without cracking (e.g. gold and silver foil)."
          },
          {
            "term": "Ductility",
            "def": "The ability of a metal to be drawn out into thin long wires (e.g. copper electrical wiring)."
          },
          {
            "term": "Ionic Bond",
            "def": "The strong chemical bond created by the complete transfer of electrons from a metal atom to a non-metal atom."
          }
        ],
        "formulas": [
          {
            "expr": "Metal + Oxygen \u2794 Metal Oxide (Basic)",
            "desc": "e.g., 2Mg + O\u2082 \u2794 2MgO"
          },
          {
            "expr": "Non-metal + Oxygen \u2794 Non-metal Oxide (Acidic/Neutral)",
            "desc": "e.g., C + O\u2082 \u2794 CO\u2082"
          }
        ],
        "workedExample": {
          "problem": "Why is sodium stored in kerosene oil rather than open air or water?",
          "steps": [
            "Step 1: Sodium is an extremely reactive alkali metal at the top of the reactivity series.",
            "Step 2: When exposed to air, it reacts violently with moisture and oxygen in an exothermic reaction.",
            "Step 3: The heat released ignites the hydrogen gas produced, catching fire.",
            "Step 4: Kerosene is a non-reactive hydrocarbon that shields sodium from air and water."
          ],
          "solution": "Sodium is submerged in kerosene to prevent violent combustion with atmospheric moisture."
        },
        "examTips": [
          "Remember exceptions: Mercury is the only metal liquid at room temperature; Bromine is the only non-metal liquid at room temperature.",
          "Iodine is a non-metal that has a shiny metallic lustre; Diamond is a non-metal with the highest melting point."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Which of the following metals is the best conductor of electricity?",
            "options": [
              "Silver (Ag)",
              "Copper (Cu)",
              "Aluminium (Al)",
              "Iron (Fe)"
            ],
            "correct": 0,
            "answer": "Silver (Ag)",
            "explanation": "Silver has the highest electrical conductivity of all metals, followed closely by copper."
          }
        ]
      },
      "Moderate": {
        "levelName": "Moderate",
        "levelBadgeClass": "moderate-badge",
        "title": "Metals and Non-metals \u2014 Moderate Exam Preparation",
        "overview": "Comprehensive study of the Reactivity Series, ionic compound properties (high melting points, brittle crystal lattice, electrical conductivity in molten/aqueous state only), metallurgy stages (crushing, concentration of ore, roasting vs. calcination, reduction to metal, and electrolytic refining), and alloys (brass, bronze, solder, stainless steel, amalgam).",
        "analogy": "Ionic compounds are like 3D magnetic LEGO grids: positive cations and negative anions snap together tightly in all directions. When struck hard with a hammer, like charges shift and align next to each other, repelling violently and causing the crystal to shatter (brittleness).",
        "definitions": [
          {
            "term": "Reactivity Series",
            "def": "A vertical list of metals arranged in the decreasing order of their chemical reactivity (K > Na > Ca > Mg > Al > Zn > Fe > Pb > [H] > Cu > Hg > Ag > Au)."
          },
          {
            "term": "Roasting",
            "def": "Heating sulfide ores strongly in the presence of excess air to convert them into metal oxides (e.g. 2ZnS + 3O\u2082 \u2794 2ZnO + 2SO\u2082)."
          },
          {
            "term": "Calcination",
            "def": "Heating carbonate ores strongly in limited or absent air to convert them into metal oxides (e.g. ZnCO\u2083 \u2794 ZnO + CO\u2082)."
          }
        ],
        "formulas": [
          {
            "expr": "2ZnS + 3O\u2082 --Heat--> 2ZnO + 2SO\u2082",
            "desc": "Roasting of zinc blende ore."
          },
          {
            "expr": "Fe\u2082O\u2083 + 2Al \u2794 2Fe + Al\u2082O\u2083 + Heat",
            "desc": "Thermite reaction: Molten iron produced is used to join cracked railway tracks."
          }
        ],
        "workedExample": {
          "problem": "Differentiate between Roasting and Calcination with chemical equations.",
          "steps": [
            "Step 1: Define Roasting: Applied to sulfide ores; heated in excess air. 2ZnS + 3O\u2082 \u2794 2ZnO + 2SO\u2082.",
            "Step 2: Define Calcination: Applied to carbonate / hydrated ores; heated in limited/no air. ZnCO\u2083 \u2794 ZnO + CO\u2082.",
            "Step 3: Point out gas evolved: Roasting releases SO\u2082 (sulfur dioxide); Calcination releases CO\u2082 (carbon dioxide)."
          ],
          "solution": "Roasting treats sulfides with excess oxygen; calcination treats carbonates in oxygen-free conditions."
        },
        "examTips": [
          "Thermite reaction is highly exothermic: aluminum reduces iron oxide to produce liquid molten iron used for in-situ rail welding.",
          "Anodizing is forming a thick protective oxide layer on aluminum using electrolytic oxidation."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "An alloy called 'solder' used for welding electrical wires together is composed of:",
            "options": [
              "Lead and Tin (Pb + Sn)",
              "Copper and Zinc (Cu + Zn)",
              "Copper and Tin (Cu + Sn)",
              "Iron and Carbon (Fe + C)"
            ],
            "correct": 0,
            "answer": "Lead and Tin (Pb + Sn)",
            "explanation": "Solder is an alloy of lead and tin with a low melting point, ideal for soldering electronics."
          }
        ]
      },
      "Pro": {
        "levelName": "Pro",
        "levelBadgeClass": "pro-badge",
        "title": "Metals and Non-metals \u2014 Pro Mastery & HOTS",
        "overview": "Advanced metallurgy and electrochemistry: Ellingham diagram principles for reduction thermodynamic feasibility, Hall-H\u00e9roult process for aluminum extraction with cryolite (Na3AlF6) flux, corrosion electrochemistry, passivity of metals in concentrated nitric acid, and lattice energy in ionic crystals.",
        "analogy": "Cryolite added to bauxite acts like an ice melter on a frozen driveway: aluminum oxide melts at over 2050\u00b0C, but dissolving it in molten cryolite drops the melting point to 950\u00b0C, slashing energy consumption by more than half!",
        "definitions": [
          {
            "term": "Hall-H\u00e9roult Process",
            "def": "Electrolytic reduction of alumina (Al\u2082O\u2083) dissolved in molten cryolite (Na\u2083AlF\u2086) and fluorspar using carbon anodes."
          },
          {
            "term": "Corrosion Electrochemistry",
            "def": "Electrochemical cell formed on iron surface where iron oxidizes at anodic sites (Fe \u2794 Fe\u00b2\u207a + 2e\u207b) and oxygen reduces at cathodic sites."
          },
          {
            "term": "Passivation",
            "def": "Formation of a non-reactive microscopic oxide layer on metals like Fe, Cr, and Al upon treatment with conc. HNO\u2083, halting further corrosion."
          }
        ],
        "formulas": [
          {
            "expr": "Anode: C + O\u00b2\u207b \u2794 CO + 2e\u207b ; C + 2O\u00b2\u207b \u2794 CO\u2082 + 4e\u207b",
            "desc": "Carbon anodes in Hall-H\u00e9roult cell are slowly consumed and must be periodically replaced."
          },
          {
            "expr": "Fe\u00b2\u207a + 2OH\u207b \u2794 Fe(OH)\u2082 --O\u2082,H\u2082O--> Fe\u2082O\u2083\u00b7xH\u2082O",
            "desc": "Rust formation mechanism."
          }
        ],
        "workedExample": {
          "problem": "Why can copper displace silver from AgNO\u2083 solution, but cannot displace zinc from ZnSO\u2084 solution?",
          "steps": [
            "Step 1: Check standard reduction potentials: E\u00b0(Zn\u00b2\u207a/Zn) = -0.76V, E\u00b0(Cu\u00b2\u207a/Cu) = +0.34V, E\u00b0(Ag\u207a/Ag) = +0.80V.",
            "Step 2: Copper is more electropositive than silver (lies above Ag in reactivity series), so Cu transfers electrons to Ag\u207a: Cu + 2Ag\u207a \u2794 Cu\u00b2\u207a + 2Ag.",
            "Step 3: However, zinc is more electropositive than copper (lies above Cu), so copper cannot reduce Zn\u00b2\u207a ions."
          ],
          "solution": "Displacement is spontaneous only when the elemental metal has a more negative reduction potential than the cation."
        },
        "examTips": [
          "In electrolytic refining of copper: Impure copper slab is made ANODE; pure thin copper strip is CATHODE; copper sulfate is electrolyte. Valuable metals like gold and silver settle as 'anode mud'.",
          "Aqua regia is a 3:1 fresh mixture of conc. HCl and conc. HNO3 capable of dissolving noble metals (gold, platinum)."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "What is the primary role of cryolite (Na\u2083AlF\u2086) in the extraction of aluminum by electrolysis?",
            "options": [
              "Lowers the melting point of alumina and increases electrical conductivity",
              "Acts as an oxidizing agent",
              "Prevents the carbon anode from burning",
              "Bleaches the aluminum"
            ],
            "correct": 0,
            "answer": "Lowers the melting point of alumina and increases electrical conductivity",
            "explanation": "Alumina melts at ~2050\u00b0C; cryolite reduces the operating temperature to ~950\u00b0C and provides mobile ions for conductivity."
          }
        ]
      }
    }
  },
  "cbse_10_sci_5": {
    "chapterId": "cbse_10_sci_5",
    "chapterName": "Life Processes",
    "subjectName": "Science",
    "boardName": "CBSE",
    "classNum": "10",
    "isAuthored": true,
    "source": "NCERT & State Board Curriculum Framework",
    "levels": {
      "Beginner": {
        "levelName": "Beginner",
        "levelBadgeClass": "beginner-badge",
        "title": "Life Processes \u2014 Beginner Foundations",
        "overview": "Life processes are the essential maintenance jobs living organisms perform constantly to stay alive, grow, and heal. The four major life processes are: Nutrition (getting food energy), Respiration (burning food with oxygen to release energy), Transportation (moving blood, water, and nutrients around), and Excretion (flushing out toxic waste).",
        "analogy": "Your body is like a bustling, high-tech eco-city: food markets bring groceries (nutrition), energy powerplants turn coal into electricity (respiration), delivery highways dispatch goods to every home (circulation), and sanitation trucks clear away the garbage (excretion)!",
        "definitions": [
          {
            "term": "Autotrophic Nutrition",
            "def": "When organisms (like green plants) produce their own food from carbon dioxide and water using sunlight and chlorophyll."
          },
          {
            "term": "Heterotrophic Nutrition",
            "def": "When organisms depend on other plants or animals for their food energy (e.g. animals, fungi, humans)."
          },
          {
            "term": "Peristalsis",
            "def": "The rhythmic muscular contraction and relaxation of the gut wall that pushes food smoothly down the digestive tract."
          }
        ],
        "formulas": [
          {
            "expr": "6CO\u2082 + 6H\u2082O + Sunlight --Chlorophyll--> C\u2086H\u2081\u2082O\u2086 + 6O\u2082",
            "desc": "Photosynthesis equation: Glucose is formed and oxygen is released."
          },
          {
            "expr": "Glucose \u2794 Pyruvate + Energy (in cytoplasm)",
            "desc": "First stage of cellular respiration."
          }
        ],
        "workedExample": {
          "problem": "Why do herbivores (like cows) have longer small intestines than carnivores (like tigers)?",
          "steps": [
            "Step 1: Herbivores eat plant matter rich in cellulose.",
            "Step 2: Cellulose is a complex carbohydrate that requires extended enzymatic action and symbiotic bacteria to digest.",
            "Step 3: Carnivores eat meat, which is primarily protein and fat, much easier and quicker to digest."
          ],
          "solution": "Herbivores require longer intestines to provide sufficient transit time for digesting tough plant cellulose."
        },
        "examTips": [
          "Draw neat labelled diagrams of the Human Alimentary Canal, Human Heart (4 chambers), and Nephron for full marks in CBSE biology!",
          "Bile juice contains no digestive enzymes, yet it is essential: it turns acidic chyme alkaline and emulsifies large fat globules into small droplets."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Which enzyme present in human saliva begins the chemical digestion of carbohydrates in the mouth?",
            "options": [
              "Salivary Amylase (Ptyalin)",
              "Pepsin",
              "Trypsin",
              "Lipase"
            ],
            "correct": 0,
            "answer": "Salivary Amylase (Ptyalin)",
            "explanation": "Salivary amylase breaks down complex starch into simpler maltose sugar right inside your mouth."
          }
        ]
      },
      "Moderate": {
        "levelName": "Moderate",
        "levelBadgeClass": "moderate-badge",
        "title": "Life Processes \u2014 Moderate Exam Preparation",
        "overview": "Comprehensive physiological mechanisms: Light and dark reactions of photosynthesis, opening/closing of stomatal guard cells, anaerobic vs aerobic respiration pathways, ATP generation, human circulatory system with double circulation, pulmonary vs systemic circulation, xylem vessel/tracheid transpirational pull vs phloem sieve-tube translocation, and nephron ultrafiltration, selective reabsorption, and tubular secretion.",
        "analogy": "Double circulation is like two separate airport loops: the domestic shuttle takes blood from the heart to the lungs and back to pick up oxygen (pulmonary loop), then the international express takes that oxygenated blood all the way across the body (systemic loop)!",
        "definitions": [
          {
            "term": "Double Circulation",
            "def": "Blood passes through the heart twice during each complete cycle through the body (pulmonary and systemic circuits), preventing mixing of oxygenated and deoxygenated blood."
          },
          {
            "term": "Transpiration Pull",
            "def": "The suction force created in xylem vessels by the evaporation of water vapor through leaf stomata, drawing water upward from roots."
          },
          {
            "term": "Nephron Ultrafiltration",
            "def": "Filtration of blood under high hydrostatic pressure in the glomerulus into Bowman's capsule, separating glucose, amino acids, salts, and urea from blood cells."
          }
        ],
        "formulas": [
          {
            "expr": "Aerobic: C\u2086H\u2081\u2082O\u2086 + 6O\u2082 \u2794 6CO\u2082 + 6H\u2082O + 38 ATP (in mitochondria)",
            "desc": "Complete glucose oxidation yielding high energy."
          },
          {
            "expr": "Anaerobic (Muscle): Glucose \u2794 Lactic Acid + 2 ATP",
            "desc": "Causes muscle fatigue and cramps during sudden strenuous sprint."
          }
        ],
        "workedExample": {
          "problem": "Trace the step-by-step path of an oxygenated red blood cell starting from the lungs until it reaches a muscle cell in your leg.",
          "steps": [
            "Step 1: Oxygen diffuses across lung alveoli into pulmonary veins.",
            "Step 2: Pulmonary veins deliver oxygenated blood to the Left Atrium of the heart.",
            "Step 3: Left atrium contracts, passing blood through bicuspid/mitral valve into Left Ventricle.",
            "Step 4: Left ventricle pumps blood forcefully through the Aorta into systemic arteries branching into the femoral artery of the leg."
          ],
          "solution": "Lungs \u2794 Pulmonary Vein \u2794 Left Atrium \u2794 Left Ventricle \u2794 Aorta \u2794 Leg Capillaries."
        },
        "examTips": [
          "Ventricles have much thicker muscular walls than atria because they have to pump blood over long distances at high pressure.",
          "In nephrons, glucose, amino acids, and major salts in the initial filtrate (180 liters/day) are selectively reabsorbed, producing only 1.5 to 2 liters of urine."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "The breakdown of pyruvate to give carbon dioxide, water, and energy takes place inside which cell organelle?",
            "options": [
              "Mitochondria",
              "Cytoplasm",
              "Chloroplast",
              "Nucleus"
            ],
            "correct": 0,
            "answer": "Mitochondria",
            "explanation": "Glycolysis takes place in the cytoplasm, while the Krebs cycle and oxidative phosphorylation occur inside mitochondria."
          }
        ]
      },
      "Pro": {
        "levelName": "Pro",
        "levelBadgeClass": "pro-badge",
        "title": "Life Processes \u2014 Pro Mastery & HOTS",
        "overview": "Advanced biochemistry and biophysics: Chemiosmotic ATP synthesis in chloroplast thylakoids and mitochondrial cristae, counter-current multiplier mechanism in the loop of Henle, cardiac cycle pressure-volume relationships (systole, diastole, ECG P-Q-R-S-T waves), and mass flow hypothesis (M\u00fcnch pressure flow) in phloem translocation.",
        "analogy": "The loop of Henle acts like a clever counter-current heat exchanger: by running descending and ascending fluid limbs side-by-side in opposite directions with differing ion/water permeabilities, the kidney builds a steep osmotic gradient in the medulla without needing excessive active pumps!",
        "definitions": [
          {
            "term": "Frank-Starling Law of the Heart",
            "def": "The stroke volume of the heart increases in response to an increase in the volume of blood in the ventricles before contraction (end-diastolic volume)."
          },
          {
            "term": "Juxtaglomerular Apparatus (JGA)",
            "def": "Specialized kidney structure that secretes renin in response to low blood pressure, activating the RAAS pathway to restore glomerular filtration rate."
          },
          {
            "term": "M\u00fcnch Mass Flow Hypothesis",
            "def": "Movement of organic solutes in phloem from source (high turgor pressure) to sink (low turgor pressure) driven by osmotically generated hydrostatic gradients."
          }
        ],
        "formulas": [
          {
            "expr": "Cardiac Output = Stroke Volume \u00d7 Heart Rate (\u2248 70 mL \u00d7 72 bpm \u2248 5 L/min)",
            "desc": "Total volume of blood pumped per minute."
          },
          {
            "expr": "Glomerular Net Filtration Pressure (NFP) = GBHP - (CHP + BCOP) \u2248 10 mmHg",
            "desc": "Driving pressure for ultrafiltration."
          }
        ],
        "workedExample": {
          "problem": "Explain how stomatal opening and closing is regulated through potassium ion (K\u207a) flux and osmotic turgor in guard cells.",
          "steps": [
            "Step 1: In daylight, proton pumps (H\u207a-ATPase) actively pump protons out of guard cells.",
            "Step 2: The inside becomes negative, driving active influx of potassium ions (K\u207a) and accumulation of malate anions.",
            "Step 3: High solute concentration lowers water potential in guard cells, causing endosmosis of water from neighboring epidermal cells.",
            "Step 4: Guard cells swell with turgor pressure; their thicker inner walls cause them to bow outward, widening the stomatal pore."
          ],
          "solution": "Active K\u207a uptake leads to water endosmosis, increasing guard cell turgor and pulling the stomatal pore open."
        },
        "examTips": [
          "In hemodialysis (artificial kidney), dialyzing fluid has the same osmotic pressure and mineral composition as normal blood plasma, EXCEPT it contains ZERO nitrogenous waste (urea).",
          "Left ventricle operates at ~120 mmHg peak systolic pressure, whereas right ventricle operates at only ~25 mmHg into pulmonary arteries."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Which chamber of the human heart possesses the thickest myocardial wall?",
            "options": [
              "Left Ventricle",
              "Right Ventricle",
              "Left Atrium",
              "Right Atrium"
            ],
            "correct": 0,
            "answer": "Left Ventricle",
            "explanation": "The left ventricle must generate enough hydrostatic force to overcome systemic vascular resistance and pump blood through the entire body."
          }
        ]
      }
    }
  },
  "cbse_10_math_1": {
    "chapterId": "cbse_10_math_1",
    "chapterName": "Real Numbers",
    "subjectName": "Mathematics",
    "boardName": "CBSE",
    "classNum": "10",
    "isAuthored": true,
    "source": "NCERT & State Board Curriculum Framework",
    "levels": {
      "Beginner": {
        "levelName": "Beginner",
        "levelBadgeClass": "beginner-badge",
        "title": "Real Numbers \u2014 Beginner Foundations",
        "overview": "Real numbers comprise every number you can find on the number line: whole numbers, integers, fractions, repeating decimals, and mysterious numbers like \u221a2 and \u03c0 that never repeat or terminate! In this chapter, we master prime factorization and discover why every composite number has a unique prime DNA.",
        "analogy": "Prime numbers are like atomic chemical elements: gold, carbon, and oxygen cannot be broken down further. Composite numbers (like 12 = 2 \u00d7 2 \u00d7 3) are molecules built exclusively by assembling prime atoms together!",
        "definitions": [
          {
            "term": "Fundamental Theorem of Arithmetic",
            "def": "Every composite number can be uniquely factored as a product of prime numbers, apart from the order in which the prime factors occur."
          },
          {
            "term": "HCF (Highest Common Factor)",
            "def": "The largest positive integer that divides two or more given numbers without leaving a remainder (product of smallest powers of each common prime factor)."
          },
          {
            "term": "LCM (Lowest Common Multiple)",
            "def": "The smallest positive integer that is a multiple of two or more given numbers (product of greatest powers of each prime factor)."
          }
        ],
        "formulas": [
          {
            "expr": "HCF(a, b) \u00d7 LCM(a, b) = a \u00d7 b",
            "desc": "Fundamental identity valid for any two positive integers a and b."
          }
        ],
        "workedExample": {
          "problem": "Find the HCF and LCM of 12 and 18 using prime factorization, and verify that HCF \u00d7 LCM = Product of numbers.",
          "steps": [
            "Step 1: Write prime factorizations: 12 = 2\u00b2 \u00d7 3\u00b9; 18 = 2\u00b9 \u00d7 3\u00b2.",
            "Step 2: HCF = lowest power of common primes = 2\u00b9 \u00d7 3\u00b9 = 6.",
            "Step 3: LCM = highest power of all primes = 2\u00b2 \u00d7 3\u00b2 = 4 \u00d7 9 = 36.",
            "Step 4: Check identity: HCF \u00d7 LCM = 6 \u00d7 36 = 216. Product = 12 \u00d7 18 = 216. 216 = 216. Verified!"
          ],
          "solution": "HCF = 6, LCM = 36; Identity HCF \u00d7 LCM = a \u00d7 b holds true."
        },
        "examTips": [
          "Remember: The identity HCF(a, b, c) \u00d7 LCM(a, b, c) = a \u00d7 b \u00d7 c is NOT valid for three numbers! It only applies to two numbers.",
          "Any number ending in digit 0 must have both 2 and 5 in its prime factorization."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "If HCF(306, 657) = 9, what is the value of LCM(306, 657)?",
            "options": [
              "22338",
              "2238",
              "2338",
              "30665"
            ],
            "correct": 0,
            "answer": "22338",
            "explanation": "LCM = (a \u00d7 b) / HCF = (306 \u00d7 657) / 9 = 34 \u00d7 657 = 22,338."
          }
        ]
      },
      "Moderate": {
        "levelName": "Moderate",
        "levelBadgeClass": "moderate-badge",
        "title": "Real Numbers \u2014 Moderate Exam Preparation",
        "overview": "Rigorous proofs of irrationality using proof by contradiction (proving \u221a2, \u221a3, \u221a5, and expressions like 3 + 2\u221a5 are irrational), revisiting prime factorization applications, solving word problems involving simultaneous intervals (bells ringing together, circular race tracks using LCM vs dividing items into equal piles using HCF).",
        "analogy": "Proof by contradiction is like a detective mystery: assume the suspect is telling the truth (assume \u221a2 is rational = a/b in lowest terms). Trace the logical consequences until you hit an impossible paradox (both a and b must be even, violating the lowest terms fact!). That contradiction proves the original assumption was false!",
        "definitions": [
          {
            "term": "Rational Number",
            "def": "A number that can be expressed in the form p/q, where p and q are integers and q \u2260 0."
          },
          {
            "term": "Irrational Number",
            "def": "A real number that cannot be written as a ratio of integers; its decimal expansion is non-terminating and non-repeating."
          },
          {
            "term": "Coprime Integers",
            "def": "Two integers a and b are coprime if their only common positive factor is 1, i.e., HCF(a, b) = 1."
          }
        ],
        "formulas": [
          {
            "expr": "If prime p divides a\u00b2, then p divides a (where a is a positive integer)",
            "desc": "Key lemma used in irrationality proofs."
          }
        ],
        "workedExample": {
          "problem": "Prove that \u221a5 is an irrational number.",
          "steps": [
            "Step 1: Assume contrary: Let \u221a5 be rational, so \u221a5 = a/b where a and b are coprime integers (HCF = 1) and b \u2260 0.",
            "Step 2: Squaring both sides: 5 = a\u00b2/b\u00b2 \u2794 a\u00b2 = 5b\u00b2. This implies 5 divides a\u00b2.",
            "Step 3: By Fundamental Theorem lemma, 5 must divide a. Let a = 5c for some integer c.",
            "Step 4: Substitute back: (5c)\u00b2 = 5b\u00b2 \u2794 25c\u00b2 = 5b\u00b2 \u2794 b\u00b2 = 5c\u00b2. This implies 5 divides b\u00b2 and therefore 5 divides b.",
            "Step 5: Contradiction: Both a and b have 5 as a common factor, contradicting that a and b are coprime!"
          ],
          "solution": "Our assumption that \u221a5 is rational is false. Hence, \u221a5 is an irrational number. Q.E.D."
        },
        "examTips": [
          "In board exam 3-mark questions on irrationality, state clearly: 'Let us assume to the contrary that...' and conclude with 'This contradicts the fact that a and b are coprime.'",
          "When word problems ask for 'minimum time when events coincide again', calculate LCM. When they ask for 'maximum size of equal tiles/packets', calculate HCF."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "Three alarm bells ring at intervals of 4, 7, and 14 minutes. If they ring together at 6:00 AM, at what time will they next ring simultaneously?",
            "options": [
              "6:28 AM",
              "6:14 AM",
              "6:56 AM",
              "7:00 AM"
            ],
            "correct": 0,
            "answer": "6:28 AM",
            "explanation": "LCM(4, 7, 14): 4 = 2\u00b2, 7 = 7\u00b9, 14 = 2 \u00d7 7. LCM = 2\u00b2 \u00d7 7 = 28 minutes. 6:00 AM + 28 minutes = 6:28 AM."
          }
        ]
      },
      "Pro": {
        "levelName": "Pro",
        "levelBadgeClass": "pro-badge",
        "title": "Real Numbers \u2014 Pro Mastery & HOTS",
        "overview": "Number theory fundamentals: Euclid's division lemma extensions, modular arithmetic applications, p-adic valuations, irrationality of algebraic sums, and Dirichlet's theorem on primes in arithmetic progression.",
        "analogy": "Modular arithmetic is like clock math: after 12 o'clock comes 1 o'clock, not 13 o'clock! Real numbers modulo n fold the infinite number line into a tidy cyclical ring.",
        "definitions": [
          {
            "term": "Euclidean Algorithm",
            "def": "Method to compute HCF of a and b using repeated division: HCF(a, b) = HCF(b, a mod b) until remainder is zero."
          },
          {
            "term": "Transcendental vs Algebraic Numbers",
            "def": "Algebraic numbers are roots of non-zero polynomial equations with integer coefficients (e.g. \u221a2); transcendental numbers (e.g. \u03c0, e) are not."
          },
          {
            "term": "Diophantine Equation",
            "def": "Polynomial equation where only integer solutions are sought (e.g. ax + by = c has integer solutions iff HCF(a, b) divides c)."
          }
        ],
        "formulas": [
          {
            "expr": "B\u00e9zout's Identity: ax + by = HCF(a, b)",
            "desc": "HCF can always be written as a linear combination of the two numbers for integer x and y."
          }
        ],
        "workedExample": {
          "problem": "Prove that for any natural number n, the number 6\u207f cannot end with the digit 0.",
          "steps": [
            "Step 1: For a number to end with the digit 0, it must be divisible by 10, meaning its prime factorization must contain both 2 and 5.",
            "Step 2: Prime factorization of 6 is 2 \u00d7 3.",
            "Step 3: Therefore, 6\u207f = (2 \u00d7 3)\u207f = 2\u207f \u00d7 3\u207f.",
            "Step 4: By the uniqueness of the Fundamental Theorem of Arithmetic, the only prime factors of 6\u207f are 2 and 3.",
            "Step 5: Since prime factor 5 does not exist in 6\u207f, it can never be divisible by 10."
          ],
          "solution": "6\u207f can never end with digit 0 for any natural number n."
        },
        "examTips": [
          "In competitive math, use B\u00e9zout coefficients to quickly solve linear Diophantine congruences.",
          "The sum or difference of a rational number and an irrational number is always irrational."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "What is the greatest integer d such that d divides (n\u00b3 - n) for every positive integer n?",
            "options": [
              "6",
              "12",
              "24",
              "3"
            ],
            "correct": 0,
            "answer": "6",
            "explanation": "n\u00b3 - n = n(n\u00b2 - 1) = (n - 1)n(n + 1). The product of three consecutive integers is always divisible by 2 and by 3, hence always divisible by 2 \u00d7 3 = 6."
          }
        ]
      }
    }
  },
  "mh_10_sci1_1": {
    "chapterId": "mh_10_sci1_1",
    "chapterName": "Gravitation",
    "subjectName": "Science and Technology Part 1",
    "boardName": "Maharashtra",
    "classNum": "10",
    "isAuthored": true,
    "source": "NCERT & State Board Curriculum Framework",
    "levels": {
      "Beginner": {
        "levelName": "Beginner",
        "levelBadgeClass": "beginner-badge",
        "title": "Gravitation \u2014 Beginner Foundations",
        "overview": "Gravitation is the universal invisible force that pulls all objects toward one another. Sir Isaac Newton discovered that this pull is everywhere in the universe: it makes ripe mangoes fall to the ground, keeps you firmly planted on Earth, and holds the Moon in its circular orbit around us!",
        "analogy": "Imagine a bowling ball resting on a soft trampoline: it creates a dip in the fabric so that any marble rolled nearby curves around the bowling ball! That curving path is gravity in action.",
        "definitions": [
          {
            "term": "Gravity",
            "def": "The attractive force exerted by Earth (or any celestial body) on objects pulling them toward its center."
          },
          {
            "term": "Centripetal Force",
            "def": "The center-seeking force that acts on any object moving along a circular path (e.g. string tension swinging a stone)."
          },
          {
            "term": "Free Fall",
            "def": "The motion of an object falling toward Earth under the influence of gravity alone, with zero initial speed and no air resistance."
          }
        ],
        "formulas": [
          {
            "expr": "F = G \u00d7 (m\u2081 \u00d7 m\u2082) / r\u00b2",
            "desc": "Newton's Law of Universal Gravitation."
          },
          {
            "expr": "g = GM / R\u00b2 \u2248 9.8 m/s\u00b2",
            "desc": "Acceleration due to gravity on Earth's surface."
          }
        ],
        "workedExample": {
          "problem": "What is the difference between mass and weight?",
          "steps": [
            "Step 1: Mass (m) is the amount of matter in an object; it is measured in kg and never changes anywhere in the universe.",
            "Step 2: Weight (W = m \u00d7 g) is the gravitational force pulling on that mass; it is measured in Newtons (N).",
            "Step 3: On the Moon where gravity is 1/6th of Earth's, your mass stays identical, but your weight is 6 times lighter!"
          ],
          "solution": "Mass is universal scalar matter (kg); weight is local gravitational force (N)."
        },
        "examTips": [
          "Remember: Acceleration due to gravity (g) is MAXIMUM at the poles (9.832 m/s\u00b2) and MINIMUM at the equator (9.78 m/s\u00b2) because Earth bulges at the equator.",
          "At the exact geometric center of Earth, g = 0 m/s\u00b2."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "What is the value of acceleration due to gravity (g) at the center of the Earth?",
            "options": [
              "0 m/s\u00b2",
              "9.8 m/s\u00b2",
              "Infinite",
              "4.9 m/s\u00b2"
            ],
            "correct": 0,
            "answer": "0 m/s\u00b2",
            "explanation": "At the center of Earth, mass surrounds you equally on all sides, canceling out all gravitational attraction."
          }
        ]
      },
      "Moderate": {
        "levelName": "Moderate",
        "levelBadgeClass": "moderate-badge",
        "title": "Gravitation \u2014 Moderate Exam Preparation",
        "overview": "Detailed study of Kepler's three laws of planetary motion, derivation of Newton's inverse square law from Kepler's third law, variation in value of g (with altitude, depth, and Earth's oblate shape), kinematic equations for free fall (v = gt, s = \u00bdgt\u00b2, v\u00b2 = 2gs), and escape velocity derivation (v_esc = \u221a(2GM/R) = 11.2 km/s).",
        "analogy": "Kepler's second law is like a cosmic ice skater: when the planet is closest to the Sun (perihelion), gravity tugs harder, so it speeds up to sweep out the same triangular area as when it glides slowly far away (aphelion)!",
        "definitions": [
          {
            "term": "Kepler's 1st Law (Law of Orbits)",
            "def": "The orbit of a planet is an ellipse with the Sun located at one of the two foci."
          },
          {
            "term": "Kepler's 2nd Law (Law of Areas)",
            "def": "The line joining the planet and the Sun sweeps out equal areas in equal intervals of time."
          },
          {
            "term": "Kepler's 3rd Law (Law of Periods)",
            "def": "The square of the orbital period (T) of a planet is directly proportional to the cube of the mean distance (r) from the Sun (T\u00b2 \u221d r\u00b3)."
          }
        ],
        "formulas": [
          {
            "expr": "T\u00b2 / r\u00b3 = Constant (K)",
            "desc": "Kepler's Third Law constant."
          },
          {
            "expr": "v_esc = \u221a(2GM / R) = \u221a(2gR)",
            "desc": "Escape velocity: minimum speed required to escape Earth's gravitational field forever."
          }
        ],
        "workedExample": {
          "problem": "Calculate the escape velocity on the surface of Earth (Radius R = 6.4 \u00d7 10\u2076 m, g = 9.8 m/s\u00b2).",
          "steps": [
            "Step 1: Write formula: v_esc = \u221a(2gR).",
            "Step 2: Substitute values: v_esc = \u221a(2 \u00d7 9.8 \u00d7 6.4 \u00d7 10\u2076).",
            "Step 3: Multiply: 2 \u00d7 9.8 \u00d7 6400000 = 125,440,000.",
            "Step 4: Take square root: \u221a125,440,000 \u2248 11,200 m/s = 11.2 km/s."
          ],
          "solution": "Escape velocity on Earth is approximately 11.2 km/s."
        },
        "examTips": [
          "In MSBSHSE board exams, write the SI unit of Universal Gravitational Constant: G = 6.673 \u00d7 10\u207b\u00b9\u00b9 N\u00b7m\u00b2/kg\u00b2.",
          "Weightlessness in an orbiting satellite is NOT due to zero gravity; it is because the satellite and astronaut are in a state of perpetual free-fall toward Earth!"
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "If the distance between two objects is doubled, how does the gravitational force between them change?",
            "options": [
              "Becomes 1/4th of original",
              "Becomes 1/2 of original",
              "Doubles",
              "Remains unchanged"
            ],
            "correct": 0,
            "answer": "Becomes 1/4th of original",
            "explanation": "According to inverse square law (F \u221d 1/r\u00b2), doubling distance (r \u2794 2r) makes force 1/(2)\u00b2 = 1/4th."
          }
        ]
      },
      "Pro": {
        "levelName": "Pro",
        "levelBadgeClass": "pro-badge",
        "title": "Gravitation \u2014 Pro Mastery & HOTS",
        "overview": "Rigorous gravitational dynamics: Gravitational potential energy derivations (-GMm/(R+h)), orbital velocity and circular satellite orbits, geostationary vs polar satellites, tidal forces due to Moon differential field, and relativistic corrections to Newtonian gravity.",
        "analogy": "Gravitational potential energy is assigned a negative sign because infinity is defined as zero potential! As you fall closer to Earth, energy is released, dropping you into a deeper 'gravitational well' that requires positive energy input to climb back out.",
        "definitions": [
          {
            "term": "Gravitational Potential Energy",
            "def": "The work done in bringing an object of mass m from infinity to a point in the gravitational field of mass M: U = -GMm / r."
          },
          {
            "term": "Critical Orbital Velocity",
            "def": "The exact horizontal velocity needed to keep an artificial satellite in stable circular orbit around Earth: v_c = \u221a(GM / (R + h))."
          },
          {
            "term": "Geostationary Satellite",
            "def": "A satellite with an orbital period of exactly 24 hours orbiting at ~35,786 km above the equator, appearing stationary relative to Earth."
          }
        ],
        "formulas": [
          {
            "expr": "v_c = \u221a(GM / (R + h))",
            "desc": "Orbital velocity for circular satellite orbit at altitude h."
          },
          {
            "expr": "Total Energy = KE + PE = \u00bdmv_c\u00b2 - GMm/r = -GMm / 2r",
            "desc": "Bound orbital states always have negative total mechanical energy."
          }
        ],
        "workedExample": {
          "problem": "Show that the escape velocity of an object from Earth is \u221a2 times its critical orbital velocity near the Earth's surface.",
          "steps": [
            "Step 1: Write formula for critical orbital velocity at h \u2248 0: v_c = \u221a(GM/R).",
            "Step 2: Write formula for escape velocity from surface: v_esc = \u221a(2GM/R).",
            "Step 3: Compare: v_esc = \u221a(2 \u00d7 GM/R) = \u221a2 \u00d7 \u221a(GM/R) = \u221a2 \u00d7 v_c.",
            "Step 4: Numerically: 1.414 \u00d7 7.92 km/s \u2248 11.2 km/s."
          ],
          "solution": "v_esc = \u221a2 \u00d7 v_c proven."
        },
        "examTips": [
          "Remember: Critical orbital velocity does NOT depend on the mass of the satellite (m cancels out); it depends only on the central body's mass (M) and orbital radius (R + h).",
          "Total mechanical energy of a satellite in orbit is negative; if it becomes zero or positive, the satellite escapes into an open parabolic or hyperbolic trajectory."
        ],
        "practiceQuestions": [
          {
            "type": "MCQ",
            "question": "What is the orbital period of a geostationary communication satellite?",
            "options": [
              "24 hours",
              "12 hours",
              "90 minutes",
              "365 days"
            ],
            "correct": 0,
            "answer": "24 hours",
            "explanation": "A geostationary satellite completes one orbit in 24 hours, matching Earth's rotation on its axis so it remains fixed over one spot on the equator."
          }
        ]
      }
    }
  }
};

if (typeof window !== 'undefined') {
  window.NOTES_DATABASE = NOTES_DATABASE;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { NOTES_DATABASE };
}
