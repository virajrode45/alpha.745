-- =====================================================================
-- LearnMate AI - Verified Education Boards & Curriculum Seed Data
-- =====================================================================

-- 1. Populate Indian States & Union Territories
INSERT INTO public.states (id, name, code) VALUES
  ('maharashtra', 'Maharashtra', 'MSBSHSE / Balbharati'),
  ('gujarat', 'Gujarat', 'GSEB'),
  ('karnataka', 'Karnataka', 'KSEAB'),
  ('tamilnadu', 'Tamil Nadu', 'TNBSE / Samacheer Kalvi'),
  ('up', 'Uttar Pradesh', 'UPMSP'),
  ('rajasthan', 'Rajasthan', 'RBSE'),
  ('westbengal', 'West Bengal', 'WBBSE / WBCHSE'),
  ('andhrapradesh', 'Andhra Pradesh', 'BSEAP / BIEAP'),
  ('telangana', 'Telangana', 'BSE Telangana / TSBIE'),
  ('kerala', 'Kerala', 'KBPE / DHSE Kerala'),
  ('madhyapradesh', 'Madhya Pradesh', 'MPBSE'),
  ('bihar', 'Bihar', 'BSEB'),
  ('punjab', 'Punjab', 'PSEB'),
  ('haryana', 'Haryana', 'BSEH'),
  ('odisha', 'Odisha', 'BSE Odisha / CHSE'),
  ('assam', 'Assam', 'SEBA / AHSEC'),
  ('jammu_kashmir', 'Jammu and Kashmir', 'JKBOSE'),
  ('himachal', 'Himachal Pradesh', 'HPBOSE'),
  ('uttarakhand', 'Uttarakhand', 'UBSE'),
  ('jharkhand', 'Jharkhand', 'JAC'),
  ('chhattisgarh', 'Chhattisgarh', 'CGBSE'),
  ('goa', 'Goa', 'GBSHSE'),
  ('tripura', 'Tripura', 'TBSE'),
  ('manipur', 'Manipur', 'BSEM / COHSEM'),
  ('meghalaya', 'Meghalaya', 'MBOSE'),
  ('mizoram', 'Mizoram', 'MBSE'),
  ('nagaland', 'Nagaland', 'NBSE'),
  ('sikkim', 'Sikkim', 'Sikkim State Board'),
  ('arunachal', 'Arunachal Pradesh', 'DSE Arunachal'),
  ('delhi', 'Delhi (NCT)', 'DBSE / CBSE Delhi'),
  ('chandigarh', 'Chandigarh (UT)', 'Chandigarh Education'),
  ('puducherry', 'Puducherry (UT)', 'Puducherry State Board'),
  ('ladakh', 'Ladakh (UT)', 'Ladakh Board'),
  ('andaman_nicobar', 'Andaman and Nicobar Islands (UT)', 'A&N Education'),
  ('dadra_daman', 'Dadra and Nagar Haveli and Daman and Diu (UT)', 'DNH & DD Board'),
  ('lakshadweep', 'Lakshadweep (UT)', 'Lakshadweep Education') ON CONFLICT (id) DO NOTHING;

-- 2. Populate Education Boards
INSERT INTO public.boards (id, name, board_type, state_id, official_source_url, is_active) VALUES
  ('cbse', 'Central Board of Secondary Education (CBSE)', 'CBSE', NULL, 'https://cbse.gov.in', TRUE),
  ('maharashtra_state', 'Maharashtra State Board of Secondary and Higher Secondary Education (MSBSHSE)', 'State Board', 'maharashtra', 'https://scert.maharashtra.gov.in', TRUE),
  ('gujarat_state', 'Gujarat Secondary and Higher Secondary Education Board (GSEB)', 'State Board', 'gujarat', 'https://scert.gujarat.gov.in', TRUE),
  ('karnataka_state', 'Karnataka School Examination and Assessment Board (KSEAB)', 'State Board', 'karnataka', 'https://scert.karnataka.gov.in', TRUE),
  ('tamilnadu_state', 'Tamil Nadu State Board of School Examinations (TNBSE / DGE)', 'State Board', 'tamilnadu', 'https://scert.tamilnadu.gov.in', TRUE),
  ('up_state', 'Uttar Pradesh Madhyamik Shiksha Parishad (UPMSP)', 'State Board', 'up', 'https://scert.up.gov.in', TRUE),
  ('rajasthan_state', 'Board of Secondary Education Rajasthan (RBSE / BSER)', 'State Board', 'rajasthan', 'https://scert.rajasthan.gov.in', TRUE),
  ('westbengal_state', 'West Bengal Board of Secondary Education (WBBSE)', 'State Board', 'westbengal', 'https://scert.westbengal.gov.in', TRUE),
  ('andhrapradesh_state', 'Board of Secondary Education, Andhra Pradesh (BSEAP)', 'State Board', 'andhrapradesh', 'https://scert.andhrapradesh.gov.in', TRUE),
  ('telangana_state', 'Directorate of Government Examinations Telangana (BSE Telangana)', 'State Board', 'telangana', 'https://scert.telangana.gov.in', TRUE),
  ('kerala_state', 'Kerala Board of Public Examinations (KBPE - Pareeksha Bhavan)', 'State Board', 'kerala', 'https://scert.kerala.gov.in', TRUE),
  ('madhyapradesh_state', 'Madhya Pradesh Board of Secondary Education (MPBSE)', 'State Board', 'madhyapradesh', 'https://scert.madhyapradesh.gov.in', TRUE),
  ('bihar_state', 'Bihar School Examination Board (BSEB)', 'State Board', 'bihar', 'https://scert.bihar.gov.in', TRUE),
  ('punjab_state', 'Punjab School Education Board (PSEB)', 'State Board', 'punjab', 'https://scert.punjab.gov.in', TRUE),
  ('haryana_state', 'Board of School Education Haryana (BSEH / HBSE)', 'State Board', 'haryana', 'https://scert.haryana.gov.in', TRUE),
  ('odisha_state', 'Board of Secondary Education, Odisha (BSE Odisha)', 'State Board', 'odisha', 'https://scert.odisha.gov.in', TRUE),
  ('assam_state', 'Board of Secondary Education, Assam (SEBA)', 'State Board', 'assam', 'https://scert.assam.gov.in', TRUE),
  ('jammu_kashmir_state', 'Jammu and Kashmir State Board of School Education (JKBOSE)', 'State Board', 'jammu_kashmir', 'https://scert.jammu_kashmir.gov.in', TRUE),
  ('himachal_state', 'Himachal Pradesh Board of School Education (HPBOSE)', 'State Board', 'himachal', 'https://scert.himachal.gov.in', TRUE),
  ('uttarakhand_state', 'Uttarakhand Board of School Education (UBSE)', 'State Board', 'uttarakhand', 'https://scert.uttarakhand.gov.in', TRUE),
  ('jharkhand_state', 'Jharkhand Academic Council (JAC)', 'State Board', 'jharkhand', 'https://scert.jharkhand.gov.in', TRUE),
  ('chhattisgarh_state', 'Chhattisgarh Board of Secondary Education (CGBSE)', 'State Board', 'chhattisgarh', 'https://scert.chhattisgarh.gov.in', TRUE),
  ('goa_state', 'Goa Board of Secondary and Higher Secondary Education (GBSHSE)', 'State Board', 'goa', 'https://scert.goa.gov.in', TRUE),
  ('tripura_state', 'Tripura Board of Secondary Education (TBSE)', 'State Board', 'tripura', 'https://scert.tripura.gov.in', TRUE),
  ('manipur_state', 'Board of Secondary Education, Manipur (BSEM)', 'State Board', 'manipur', 'https://scert.manipur.gov.in', TRUE),
  ('meghalaya_state', 'Meghalaya Board of School Education (MBOSE)', 'State Board', 'meghalaya', 'https://scert.meghalaya.gov.in', TRUE),
  ('mizoram_state', 'Mizoram Board of School Education (MBSE)', 'State Board', 'mizoram', 'https://scert.mizoram.gov.in', TRUE),
  ('nagaland_state', 'Nagaland Board of School Education (NBSE)', 'State Board', 'nagaland', 'https://scert.nagaland.gov.in', TRUE),
  ('sikkim_state', 'Directorate of School Education Sikkim / CBSE Aligned', 'State Board', 'sikkim', 'https://scert.sikkim.gov.in', TRUE),
  ('arunachal_state', 'Directorate of School Education Arunachal Pradesh / CBSE Aligned', 'State Board', 'arunachal', 'https://scert.arunachal.gov.in', TRUE),
  ('delhi_state', 'Delhi Board of School Education (DBSE)', 'State Board', 'delhi', 'https://scert.delhi.gov.in', TRUE),
  ('chandigarh_state', 'Chandigarh Education Department (CBSE Aligned)', 'State Board', 'chandigarh', 'https://scert.chandigarh.gov.in', TRUE),
  ('puducherry_state', 'Directorate of School Education Puducherry (TNBSE / KBPE Aligned)', 'State Board', 'puducherry', 'https://scert.puducherry.gov.in', TRUE),
  ('ladakh_state', 'Ladakh School Education Board / JKBOSE Aligned', 'State Board', 'ladakh', 'https://scert.ladakh.gov.in', TRUE),
  ('andaman_nicobar_state', 'Directorate of Education Andaman & Nicobar (CBSE Aligned)', 'State Board', 'andaman_nicobar', 'https://scert.andaman_nicobar.gov.in', TRUE),
  ('dadra_daman_state', 'Directorate of Education DNH & DD (GSEB / CBSE Aligned)', 'State Board', 'dadra_daman', 'https://scert.dadra_daman.gov.in', TRUE),
  ('lakshadweep_state', 'Department of Education Lakshadweep (KBPE Aligned)', 'State Board', 'lakshadweep', 'https://scert.lakshadweep.gov.in', TRUE) ON CONFLICT (id) DO NOTHING;

-- 3. Populate Subjects (CBSE & State Boards)
INSERT INTO public.subjects (id, board_id, class_level, name, description, display_order) VALUES
  ('cbse-10-sci', 'cbse', '10', 'Science (PCB)', 'Physics, Chemistry & Biology NCERT', 1),
  ('cbse-10-math', 'cbse', '10', 'Mathematics', 'Real Numbers, Polynomials & Geometry', 2),
  ('cbse-10-eng', 'cbse', '10', 'English Language & Literature', 'First Flight & Footprints without Feet', 3),
  ('cbse-10-soc', 'cbse', '10', 'Social Science', 'History, Geography, Civics & Economics', 4),
  ('mah-10-sci-1', 'maharashtra_state', '10', 'Science & Technology Part 1', 'Gravitation, Periodic Classification & Optics', 1),
  ('mah-10-sci-2', 'maharashtra_state', '10', 'Science & Technology Part 2', 'Cell Biology, Genetics & Ecosystems', 2),
  ('mah-10-math-1', 'maharashtra_state', '10', 'Mathematics Part 1 (Algebra)', 'Linear Equations, Quadratic Equations & Arithmetic Progression', 3),
  ('mah-10-math-2', 'maharashtra_state', '10', 'Mathematics Part 2 (Geometry)', 'Similarity, Pythagoras Theorem & Circle', 4)
ON CONFLICT (id) DO NOTHING;

-- 4. Populate Chapters
INSERT INTO public.chapters (id, subject_id, title, chapter_number, description, verification_status, display_order) VALUES
  ('cbse-10-sci-ch1', 'cbse-10-sci', 'Chemical Reactions and Equations', '1', 'Types of chemical reactions, balancing equations, oxidation & reduction', 'verified', 1),
  ('cbse-10-sci-ch2', 'cbse-10-sci', 'Acids, Bases and Salts', '2', 'Indicators, chemical properties, pH scale and salts in everyday life', 'verified', 2),
  ('cbse-10-sci-ch3', 'cbse-10-sci', 'Metals and Non-metals', '3', 'Physical & chemical properties, reactivity series and extraction', 'verified', 3),
  ('cbse-10-sci-ch6', 'cbse-10-sci', 'Life Processes', '6', 'Nutrition, respiration, transportation and excretion in plants and animals', 'verified', 4),
  ('cbse-10-sci-ch10', 'cbse-10-sci', 'Light - Reflection and Refraction', '10', 'Mirrors, lenses, ray diagrams and refractive index formulas', 'verified', 5),
  ('mah-10-sci1-ch1', 'mah-10-sci-1', 'Gravitation', '1', 'Kepler laws, Newton law of gravitation, free fall and escape velocity', 'verified', 1),
  ('mah-10-sci1-ch2', 'mah-10-sci-1', 'Periodic Classification of Elements', '2', 'Dobereiner triads, Newlands octaves, Mendeleev & Modern periodic table', 'verified', 2),
  ('mah-10-math1-ch1', 'mah-10-math-1', 'Linear Equations in Two Variables', '1', 'Simultaneous equations, graphical method and Cramer rule', 'verified', 1)
ON CONFLICT (id) DO NOTHING;

-- 5. Populate Chapter Notes (Beginner, Moderate, and Pro)
INSERT INTO public.chapter_notes (chapter_id, difficulty_level, content, key_points, formulas, examples, source_type) VALUES
  ('cbse-10-sci-ch1', 'Beginner', 'Chemical reactions are processes where initial substances (reactants) chemically transform to create new substances (products) with completely different properties. Everyday examples include rusting of iron, digestion of food, and milk turning into curd.', '["Mass is always conserved in chemical reactions.", "Chemical equations must have balanced numbers of atoms on both sides.", "Signs of a reaction: color change, temperature change, gas evolution, or precipitate formation."]'::jsonb, '["Reactants -> Products", "2H₂ + O₂ -> 2H₂O"]'::jsonb, '["Rusting of iron: 4Fe + 3O₂ + xH₂O -> 2Fe₂O₃·xH₂O"]'::jsonb, 'official_textbook'),
  ('cbse-10-sci-ch1', 'Moderate', 'A chemical equation represents a symbolic representation of a reaction using formulas. Unbalanced equations violate the Law of Conservation of Mass. Types of reactions include Combination, Decomposition, Displacement, Double Displacement, and Redox.', '["Redox reaction: Simultaneous oxidation (loss of electrons / gain of oxygen) and reduction (gain of electrons / loss of oxygen).", "Exothermic reactions release heat (e.g., respiration), while Endothermic reactions absorb heat."]'::jsonb, '["Fe + CuSO₄ -> FeSO₄ + Cu (Displacement)", "BaCl₂ + Na₂SO₄ -> BaSO₄↓ + 2NaCl (Precipitation)"]'::jsonb, '["Thermal decomposition of Ferrous Sulphate: 2FeSO₄(s) --Heat-> Fe₂O₃(s) + SO₂(g) + SO₃(g)"]'::jsonb, 'official_textbook'),
  ('cbse-10-sci-ch1', 'Pro', 'Advanced chemical mechanics: Identification of oxidizing and reducing agents via formal oxidation states. Corrosion and Rancidity as practical detrimental redox processes in industry and food preservation.', '["Oxidizing agent gets reduced; Reducing agent gets oxidized.", "Prevention of rancidity: adding antioxidants (BHA/BHT), flushing with nitrogen gas.", "Galvanization: protective zinc coating against atmospheric oxidation."]'::jsonb, '["MnO₂ + 4HCl -> MnCl₂ + 2H₂O + Cl₂ (HCl is oxidized to Cl₂; MnO₂ is reduced to MnCl₂)"]'::jsonb, '["Step-by-step balancing of hydrocarbon combustion: C₃H₈ + 5O₂ -> 3CO₂ + 4H₂O"]'::jsonb, 'official_textbook'),
  ('mah-10-sci1-ch1', 'Beginner', 'Gravitation is a universal attractive force that acts between any two objects possessing mass anywhere in the cosmos. Earth exerts gravitational pull toward its center, causing apples to fall and tides to rise in oceans.', '["Gravity attracts all objects regardless of size.", "Planets orbit the Sun due to centripetal gravitational pull.", "Acceleration due to gravity on Earth surface is approximately 9.8 m/s²."]'::jsonb, '["F = (G * m₁ * m₂) / r²", "g = GM / R²"]'::jsonb, '["Weight calculation: W = m * g"]'::jsonb, 'official_textbook'),
  ('mah-10-sci1-ch1', 'Moderate', 'Newton Universal Law of Gravitation: Every object in the universe attracts every other object with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.', '["Gravitational constant G = 6.673 x 10⁻¹¹ N m²/kg².", "Value of g decreases with height above Earth surface and depth into Earth.", "Free fall occurs when an object moves solely under the influence of gravity without air drag."]'::jsonb, '["v = u + gt", "s = ut + 0.5gt²", "v² = u² + 2gs"]'::jsonb, '["Calculation of escape velocity: v_esc = √(2GM/R) = √(2gR) = 11.2 km/s for Earth"]'::jsonb, 'official_textbook'),
  ('mah-10-sci1-ch1', 'Pro', 'Advanced gravitational dynamics: Kepler three laws of planetary motion, potential energy derivations in gravitational fields, circular orbital mechanics, and zero-gravity weightlessness conditions in orbiting satellites.', '["Kepler Third Law: T² ∝ r³ (Square of orbital period is proportional to cube of mean distance).", "Gravitational Potential Energy: -GMm / (R + h).", "Weightlessness in orbit is caused by perpetual free-fall state, not absence of gravity."]'::jsonb, '["T² / r³ = Constant (K)", "v_esc = √(2gR)"]'::jsonb, '["Derivation of inverse square law from Kepler third law using centripetal acceleration"]'::jsonb, 'official_textbook')
ON CONFLICT (chapter_id, difficulty_level, language) DO NOTHING;

-- 6. Populate Verified Questions (Difficult Question Bank)
INSERT INTO public.questions (chapter_id, difficulty_level, question_type, question_text, options, correct_answer, explanation, marks, is_verified) VALUES
  ('cbse-10-sci-ch1', 'Easy', 'MCQ', 'Which of the following is NOT a chemical change?', '["Rusting of iron nail", "Digestion of food in body", "Melting of ice cube", "Curdling of milk"]'::jsonb, 'Melting of ice cube', 'Melting of ice is a physical change because only the physical phase transitions from solid to liquid without altering the chemical molecular composition of H₂O.', 1, TRUE),
  ('cbse-10-sci-ch1', 'Moderate', 'MCQ', 'When copper powder is heated in a china dish, the reddish-brown surface becomes coated with a black substance. This black substance is:', '["Copper oxide (CuO)", "Copper hydroxide", "Copper carbonate", "Cuprous oxide"]'::jsonb, 'Copper oxide (CuO)', 'Copper reacts with atmospheric oxygen upon heating to form black Copper(II) oxide: 2Cu + O₂ -> 2CuO.', 1, TRUE),
  ('cbse-10-sci-ch1', 'Difficult', 'Numerical', 'In the reaction: MnO₂ + 4HCl -> MnCl₂ + 2H₂O + Cl₂, identify the substance oxidized, the substance reduced, and explain step-by-step.', '[]'::jsonb, 'HCl is oxidized to Cl₂, MnO₂ is reduced to MnCl₂', 'Step 1: HCl loses hydrogen and forms chlorine gas (Cl₂), representing oxidation. Step 2: MnO₂ loses oxygen to form MnCl₂, representing reduction. Therefore, HCl is the reducing agent and MnO₂ is the oxidizing agent.', 3, TRUE),
  ('mah-10-sci1-ch1', 'Easy', 'MCQ', 'The SI unit of the Universal Gravitational Constant (G) is:', '["N m²/kg²", "N m/kg", "N/kg²", "m/s²"]'::jsonb, 'N m²/kg²', 'From Newton Law F = (G * m₁ * m₂) / r², rearranging yields G = (F * r²) / (m₁ * m₂), giving units N * m² / kg².', 1, TRUE),
  ('mah-10-sci1-ch1', 'Moderate', 'MCQ', 'If the mass of the Earth is M and its radius is R, the escape velocity of a body from the surface of the Earth is given by:', '["√(2GM/R)", "√(GM/R)", "2GM/R²", "√(GM/2R)"]'::jsonb, '√(2GM/R)', 'Equating kinetic energy at launch to gravitational potential energy at surface: 1/2 m v_esc² = GMm/R => v_esc = √(2GM/R).', 1, TRUE),
  ('mah-10-sci1-ch1', 'Difficult', 'Numerical', 'An iron ball of mass 3 kg is dropped from a height of 19.6 m on Earth (take g = 9.8 m/s²). Calculate the time taken to reach the ground and its velocity just before hitting the ground.', '[]'::jsonb, 'Time = 2.0 s, Velocity = 19.6 m/s', 'Using kinematic formulas with initial velocity u = 0: (1) s = ut + 0.5gt² => 19.6 = 0 + 0.5(9.8)t² => 4.9t² = 19.6 => t² = 4 => t = 2.0 s. (2) v² = u² + 2gs => v² = 0 + 2(9.8)(19.6) = 19.6² => v = 19.6 m/s.', 4, TRUE)
ON CONFLICT DO NOTHING;
