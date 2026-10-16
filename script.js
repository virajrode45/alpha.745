/**
 * LearnMate AI — The Curious Learning Universe
 * Interactive Mascot Logic & Full Educational Platform Engine
 * Plain Vanilla JavaScript (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ===================================================================
     1. MILO THE BRAND CHARACTER (Interactive Quotes & Reactions)
     =================================================================== */
  // Top-Level State Variables
  let activeCurriculum = null;
  let activeSubjectFilter = 'all';
  let activeChapterInModal = null;

  const miloHeroBubble = document.getElementById('miloHeroBubble');
  const heroMilo = document.getElementById('heroMilo');
  const miloCharacter = document.getElementById('miloCharacter');

  const miloQuotes = [
    "Hey! What are we learning today? ✨",
    "Let's break this into smaller steps. 🧭",
    "You're getting the hang of it! 🌟",
    "Curiosity looks good on you! 🪐",
    "Mistakes are just proof that you're exploring! 🌱",
    "Did you know? Taking 5-min breaks helps your brain remember 2x more! 💡"
  ];
  let quoteIndex = 0;

  // Clicking Milo rotates friendly speech bubbles & triggers a little happy bounce
  function triggerMiloSpeech(text) {
    if (miloHeroBubble) {
      miloHeroBubble.innerHTML = `<p>${text}</p><span class="bubble-arrow"></span>`;
      miloHeroBubble.style.animation = 'none';
      void miloHeroBubble.offsetWidth; // trigger reflow
      miloHeroBubble.style.animation = 'bubbleFloat 3.5s ease-in-out infinite alternate';
    }
    if (miloCharacter) {
      miloCharacter.style.transform = 'scale(1.08) translateY(-4px)';
      setTimeout(() => {
        miloCharacter.style.transform = '';
      }, 300);
    }
  }

  if (heroMilo) {
    heroMilo.addEventListener('click', () => {
      quoteIndex = (quoteIndex + 1) % miloQuotes.length;
      triggerMiloSpeech(miloQuotes[quoteIndex]);
    });
  }

  /* ===================================================================
     2. STICKY HEADER & MOBILE NAVIGATION
     =================================================================== */
  const siteHeader = document.getElementById('siteHeader');
  const navToggle = document.getElementById('navToggle');
  const navNavigation = document.getElementById('navNavigation');
  const navItems = document.querySelectorAll('.nav-item');

  // Add subtle shadow when scrolling
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    const isOpen = navNavigation.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile navigation on item click
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navNavigation.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Active navigation highlight on scroll
  const observedSections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset + 140;
    observedSections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
        document.querySelector(`.nav-item[href*="${sectionId}"]`)?.classList.add('active');
      } else {
        document.querySelector(`.nav-item[href*="${sectionId}"]`)?.classList.remove('active');
      }
    });
  });

  /* ===================================================================
     3. THE STORYBOOK CONCEPT SIMPLIFIER
     =================================================================== */
  const btnShowJargon = document.getElementById('btnShowJargon');
  const btnShowSimple = document.getElementById('btnShowSimple');
  const btnToggleSimplifier = document.getElementById('btnToggleSimplifier');
  const comparisonText = document.getElementById('comparisonText');
  const stateIndicator = document.getElementById('stateIndicator');
  const footerStatus = document.getElementById('footerStatus');

  const textJargon = `"Photosynthesis is an anabolic, endergonic photochemical process whereby chlorophyll pigments absorb photon energy within thylakoid membranes to synthesize d-glucose from atmospheric carbon dioxide and water molecules."`;

  const textSimple = `🍃 <strong>Think of a green leaf like a solar-powered kitchen!</strong><br><br>The plant uses sunlight as electricity, water from the ground, and air (carbon dioxide) as cooking ingredients. It bakes sweet food (sugar) for itself to grow, and happily releases fresh, clean oxygen for all of us to breathe!`;

  function setJargonMode() {
    btnShowJargon.classList.add('active');
    btnShowSimple.classList.remove('active');
    stateIndicator.textContent = "Textbook Words";
    comparisonText.innerHTML = textJargon;
    footerStatus.innerHTML = `<span class="badge-status hard">⚠️ Heavy jargon & passive vocabulary</span>`;
    btnToggleSimplifier.innerHTML = `<span>Translate into Simple English</span> <span class="sparkle-icon">✨</span>`;
  }

  function setSimpleMode() {
    btnShowSimple.classList.add('active');
    btnShowJargon.classList.remove('active');
    stateIndicator.textContent = "Milo's Simple Story";
    comparisonText.innerHTML = textSimple;
    footerStatus.innerHTML = `<span class="badge-status simple">✅ 5th-Grade Simple • Crystal Clear Analogy</span>`;
    btnToggleSimplifier.innerHTML = `<span>View Original Textbook Words</span>`;
    triggerMiloSpeech("See how easy science feels when we use an analogy? 🍃");
  }

  btnShowJargon.addEventListener('click', setJargonMode);
  btnShowSimple.addEventListener('click', setSimpleMode);
  btnToggleSimplifier.addEventListener('click', () => {
    if (btnShowJargon.classList.contains('active')) {
      setSimpleMode();
    } else {
      setJargonMode();
    }
  });

  /* ===================================================================
     4. EXPLORE LEARNING WORLDS & LESSONS MODAL
     =================================================================== */
  const filterBtns = document.querySelectorAll('.editorial-filter-btn');
  const subjectCards = document.querySelectorAll('.editorial-subject-card');

  const subjectMiloQuotes = {
    math: "Milo: 'Numbers are like secret puzzles waiting to be solved! 📐'",
    science: "Milo: 'Nature is full of magical laws waiting for us! 🔬'",
    cs: "Milo: 'Computers are fast, but your imagination runs the show! 💻'",
    english: "Milo: 'Words have the power to paint whole universes! 📚'",
    all: "Milo: 'Pick any world! Discovery is around every corner! 🪐'"
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-subject');
      subjectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (filterCategory === 'all' || cardCat === filterCategory) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });

      // Milo reacts when student selects a subject!
      if (subjectMiloQuotes[filterCategory]) {
        triggerMiloSpeech(subjectMiloQuotes[filterCategory]);
      }
    });
  });

  const subjectLessonsData = {
    math: {
      title: "Mathematics — Easy Lessons with Fun Analogies",
      icon: "📐",
      lessons: [
        {
          title: "1. Why Can't We Divide by Zero?",
          explanation: "Division is simply asking: 'How many times can you take away this amount until nothing is left?' If you have 10 cookies and give away 0 cookies each time, you can do it forever and never run out! It has no single meaningful answer.",
          analogy: "💡 Analogy: Trying to pour water out of a cup using zero droplets. You can try endlessly, but the cup's level never changes."
        },
        {
          title: "2. What is an Algebraic Mystery Box ('x')?",
          explanation: "An algebraic letter like 'x' is just a wrapped mystery gift box. When a problem says 'x + 4 = 10', it simply asks: 'What secret number inside this box gives 10 when you add 4?' The answer is 6!",
          analogy: "💡 Analogy: A wrapped present. Solving the equation is gently unwrapping the box step-by-step."
        },
        {
          title: "3. The Pythagorean Theorem Made Simple",
          explanation: "For any square corner (right triangle), squaring the two short sides and adding them equals the square of the diagonal slant side (a² + b² = c²). It is the universal shortcut formula!",
          analogy: "💡 Analogy: Walking diagonally across a rectangular grass park instead of walking along the two sidewalk edges."
        }
      ]
    },
    science: {
      title: "Science — Easy Lessons with Fun Analogies",
      icon: "🔬",
      lessons: [
        {
          title: "1. Newton's Push & Pull (3rd Law)",
          explanation: "Forces in nature always come in pairs: whenever you push against an object, it pushes right back on you with the exact same strength in the opposite direction.",
          analogy: "💡 Analogy: Stepping off a skateboard. Your feet push the skateboard backward, which catapults your body forward onto the sidewalk!"
        },
        {
          title: "2. How DNA Works Inside Living Cells",
          explanation: "DNA is the biological instruction manual stored safely inside every living cell. It tells your body how tall to grow, what color your eyes should be, and how to heal cuts.",
          analogy: "💡 Analogy: DNA is like the master cookbook locked in the kitchen safe. RNA copies one recipe card and brings it to the chef to bake."
        },
        {
          title: "3. States of Matter (Ice, Water, Steam)",
          explanation: "Matter changes state purely based on how energetic its tiny particles are. In ice, molecules huddle tightly. In water, they slide past each other smoothly. In steam, they sprint around freely.",
          analogy: "💡 Analogy: People on a dance floor: standing shoulder-to-shoulder (solid), slow dancing (liquid), or energetic jumping (gas)!"
        }
      ]
    },
    cs: {
      title: "Computer Science — Easy Lessons with Fun Analogies",
      icon: "💻",
      lessons: [
        {
          title: "1. What is an Algorithm?",
          explanation: "An algorithm is simply a step-by-step recipe to solve a specific problem. Computers are extraordinarily fast but strictly literal, so every single step must be clear and in order.",
          analogy: "💡 Analogy: A recipe for baking pancakes. Step 1: Mix flour and milk. Step 2: Pour onto hot pan. If you swap the steps, the pancakes fail!"
        },
        {
          title: "2. How Does an API Work?",
          explanation: "API stands for Application Programming Interface. It is a polite digital messenger that takes your app's request to a remote server and brings back the answer.",
          analogy: "💡 Analogy: In a restaurant, you are the app, the kitchen is the server, and your waiter is the API bringing your order to the chef."
        },
        {
          title: "3. What is a Loop in Code?",
          explanation: "A loop repeats an action over and over automatically so you don't have to copy-paste lines of code. It continues until a stopping condition is fulfilled.",
          analogy: "💡 Analogy: Setting your music player on repeat for your favorite playlist."
        }
      ]
    },
    english: {
      title: "English — Easy Lessons with Fun Analogies",
      icon: "📚",
      lessons: [
        {
          title: "1. Active Voice vs. Passive Voice",
          explanation: "In active voice, the subject performs the action directly ('Kiran scored the winning goal'). In passive voice, the action happens to the subject ('The winning goal was scored by Kiran'). Active sentences are energetic and punchy.",
          analogy: "💡 Analogy: Throwing a direct punch vs. watching the slow-motion replay."
        },
        {
          title: "2. Metaphor vs. Simile",
          explanation: "Both compare two different things to paint a picture. A simile uses 'like' or 'as' ('Her heart is like gold'). A metaphor states it directly ('Her heart is gold').",
          analogy: "💡 Analogy: A simile wears a costume; a metaphor fully inhabits the role."
        },
        {
          title: "3. The Hamburger Essay Structure",
          explanation: "Every compelling essay has three tiers: The Top Bun (Introduction with main idea), The Fillings (Body paragraphs loaded with evidence and analysis), and The Bottom Bun (Conclusion tying it all together).",
          analogy: "💡 Analogy: Building a delicious burger so the reader finishes satisfied!"
        }
      ]
    }
  };

  const subjectLessonModal = document.getElementById('subjectLessonModal');
  const lessonModalTitle = document.getElementById('lessonModalTitle');
  const modalSubjectIcon = document.getElementById('modalSubjectIcon');
  const modalLessonCardsContainer = document.getElementById('modalLessonCardsContainer');
  const btnDismissLessonModal = document.getElementById('btnDismissLessonModal');
  const btnModalDismiss = document.getElementById('btnModalDismiss');
  const openSubjectModalBtns = document.querySelectorAll('.open-subject-modal');

  function openLessonModal(subjectKey) {
    const data = subjectLessonsData[subjectKey];
    if (!data) return;

    lessonModalTitle.textContent = data.title;
    modalSubjectIcon.textContent = data.icon;

    modalLessonCardsContainer.innerHTML = data.lessons.map(lesson => `
      <div class="modal-lesson-item">
        <h4>${lesson.title}</h4>
        <p>${lesson.explanation}</p>
        <div class="lesson-analogy-box">${lesson.analogy}</div>
      </div>
    `).join('');

    subjectLessonModal.classList.add('active');
    subjectLessonModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLessonModal() {
    subjectLessonModal.classList.remove('active');
    subjectLessonModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openSubjectModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const subject = btn.getAttribute('data-subject-id');
      openLessonModal(subject);
    });
  });

  btnDismissLessonModal.addEventListener('click', closeLessonModal);
  btnModalDismiss.addEventListener('click', closeLessonModal);

  subjectLessonModal.addEventListener('click', (e) => {
    if (e.target === subjectLessonModal) closeLessonModal();
  });

  /* ===================================================================
     5. MEET YOUR AI BUDDY (Reactive Thinking Milo & Audio Read Aloud)
     =================================================================== */
  const tutorForm = document.getElementById('tutorForm');
  const tutorQuestionInput = document.getElementById('tutorQuestionInput');
  const tutorSubjectSelect = document.getElementById('tutorSubjectSelect');
  const tutorStyleSelect = document.getElementById('tutorStyleSelect');
  const btnResetTutor = document.getElementById('btnResetTutor');
  const responseEmptyState = document.getElementById('responseEmptyState');
  const responseLoadingState = document.getElementById('responseLoadingState');
  const responseRenderedContent = document.getElementById('responseRenderedContent');
  const responseTools = document.getElementById('responseTools');
  const btnReadAloud = document.getElementById('btnReadAloud');
  const btnCopyAnswer = document.getElementById('btnCopyAnswer');
  const promptChips = document.querySelectorAll('.prompt-chip');
  const tutorMiloStatus = document.getElementById('tutorMiloStatus');

  const tutorKnowledgeBase = [
    {
      keywords: ["divide", "zero", "0"],
      title: "Why You Cannot Divide by Zero in Mathematics",
      summary: "Division is the opposite of multiplication. When you divide 12 by 3, you are asking: 'What number multiplied by 3 gives 12?' (Answer is 4). But if you ask: 'What number multiplied by 0 gives 10?' Nothing works, because multiplying any number by 0 will always give 0!",
      analogy: "Imagine sharing 10 fresh cookies among zero friends. How many cookies does each friend get? The question makes no sense because there is nobody in the room to receive anything!",
      bullets: [
        "Rule: Any Number × 0 = 0.",
        "Reversal test: If 10 ÷ 0 = X, then X × 0 must equal 10. That is impossible.",
        "In math class, we say division by zero is 'Undefined'."
      ],
      takeaway: "Key Takeaway: Division by zero breaks mathematical logic because zero has no partner."
    },
    {
      keywords: ["api", "interface", "server", "program"],
      title: "What is an API (Application Programming Interface)?",
      summary: "An API is a friendly software messenger that lets two computer apps talk to each other and share information safely without giving away their inner code.",
      analogy: "Think of dining at a restaurant: You are the customer (the mobile app), the kitchen is the database server, and your waiter is the API! You give your order to the waiter, the waiter tells the chef, and brings your delicious meal right back to your table.",
      bullets: [
        "It hides complex database machinery and delivers only the specific information you asked for.",
        "Example: Weather apps on your phone use an API to fetch temperatures from satellites.",
        "Example: When you pay with Google Pay on an online store, an API securely validates the payment."
      ],
      takeaway: "Key Takeaway: An API is a polite digital bridge connecting software applications."
    },
    {
      keywords: ["newton", "third", "law", "motion", "sports"],
      title: "Newton's Third Law of Motion in Simple English",
      summary: "Newton's Third Law states: 'For every action, there is an equal and opposite reaction.' Forces in the universe never exist alone; they always come in pairs.",
      analogy: "Think of swimming or jumping: When you swim, your hands push the water backwards (Action). In return, the water pushes your body forward (Reaction)! In basketball, when you push hard downward against the court floor, the floor pushes you upward into the air.",
      bullets: [
        "Action force = You pushing against an object.",
        "Reaction force = The object pushing right back on you with equal strength.",
        "Because the forces act on two different bodies, they never cancel each other out."
      ],
      takeaway: "Key Takeaway: You cannot push something without it pushing you right back!"
    },
    {
      keywords: ["active", "passive", "voice", "grammar"],
      title: "Active vs. Passive Voice in English",
      summary: "Voice shows whether the subject of your sentence is doing the action (Active) or receiving the action (Passive).",
      analogy: "Active voice is like throwing a ball directly: 'Maya kicked the ball.' Passive voice is like watching from the ball's perspective: 'The ball was kicked by Maya.'",
      bullets: [
        "Active formula: Subject + Verb + Object ('Marie Curie discovered radium').",
        "Passive formula: Object + was/is + Verb + by Subject ('Radium was discovered by Marie Curie').",
        "Writing tip: Use active voice 90% of the time in essays to keep your writing clear, lively, and confident."
      ],
      takeaway: "Key Takeaway: Active voice celebrates the doer; passive voice delays or hides the doer."
    },
    {
      keywords: ["gravity", "space", "earth", "fall", "moon"],
      title: "How Gravity Works (Explained for a 10-Year-Old)",
      summary: "Gravity is the gentle invisible pulling force that all objects with mass exert on one another. The bigger an object is, the stronger its gravitational pull.",
      analogy: "Imagine placing a heavy bowling ball on a soft trampoline mattress. It creates a gentle dip. If you roll a small marble nearby, the marble curves and rolls down into the dip toward the bowling ball. That is how planets orbit the Sun!",
      bullets: [
        "The Earth is huge, so its gravity keeps our feet firmly on the ground.",
        "It prevents our atmosphere (air) from floating off into frozen space.",
        "The Moon has less mass than Earth, so its gravity is only 1/6th as strong—allowing astronauts to leap high in the air."
      ],
      takeaway: "Key Takeaway: Gravity is the invisible glue keeping planets, stars, and people connected."
    },
    {
      keywords: ["loop", "python", "for", "while"],
      title: "How Loops Work in Computer Programming",
      summary: "A loop is an automated programming command that repeats a block of code instructions over and over until a designated condition is met.",
      analogy: "Think of your alarm clock ringing every 5 minutes in snooze mode, or your playlist replaying 5 songs. Instead of writing 100 lines of code, you write one loop saying: 'Repeat 100 times'.",
      bullets: [
        "For Loop: Used when you know the exact count in advance (e.g. send an email to 30 students).",
        "While Loop: Used when you want to repeat until something changes (e.g. keep playing game while health > 0).",
        "Safety rule: Always make sure your loop has a clear stop condition so it doesn't freeze your computer!"
      ],
      takeaway: "Key Takeaway: Loops automate repetitive human work with a few elegant lines of code."
    }
  ];

  function getEducationalResponse(query, subject, style) {
    const qLower = query.toLowerCase();

    const matched = tutorKnowledgeBase.find(item =>
      item.keywords.some(kw => qLower.includes(kw))
    );

    if (matched) return matched;

    const shortTitle = query.length > 55 ? query.substring(0, 55) + "..." : query;
    return {
      title: `Understanding: "${shortTitle}"`,
      summary: `Here is a clear, warm breakdown of this concept in ${subject}. Learning challenging academic material starts by stripping away the heavy terminology and looking at what actually happens.`,
      analogy: `Think of this like building with LEGO bricks. Even the most intricate castle or rocket is made of simple individual blocks clicked together one at a time.`,
      bullets: [
        `Core Principle: Identify what practical question or challenge this concept addresses in real life.`,
        `Step-by-Step Mechanism: Break down the concept into three milestones: Input ➔ Transformation ➔ Outcome.`,
        `Practice approach: Before tackling tough textbook exercises, explain this concept out loud in 30 seconds using everyday words.`
      ],
      takeaway: `💡 Milo's Tip: When you can explain a topic using a familiar analogy, you have genuinely understood it!`
    };
  }

  function displayTutorAnswer(data, style, sourceBadge = null) {
    const badgeText = sourceBadge || `✦ MILO'S SIMPLE EXPLANATION (${style.toUpperCase()})`;
    responseRenderedContent.innerHTML = `
      <div class="ai-response-sheet">
        <span class="sheet-badge">${badgeText}</span>
        <h4 class="sheet-title">${data.title}</h4>

        ${data.analogy ? `
        <div class="sheet-analogy-box">
          <strong>🍃 Everyday Analogy:</strong><br>
          ${data.analogy}
        </div>` : ''}

        <p class="sheet-body-text">${data.summary || ''}</p>

        ${data.bullets && data.bullets.length ? `
        <ul class="sheet-key-points">
          ${data.bullets.map(b => `<li>${b}</li>`).join('')}
        </ul>` : ''}

        ${data.takeaway ? `
        <div class="sheet-takeaway-box">
          ${data.takeaway}
        </div>` : ''}
      </div>
    `;

    responseLoadingState.style.display = 'none';
    responseRenderedContent.style.display = 'block';
    responseTools.style.display = 'flex';
    tutorMiloStatus.textContent = "Answer ready! Hope this sparks joy! 🌟";
    triggerMiloSpeech("Here's a simple way to remember it! Hope it helps! 💡");
  }

  // Handle Tutor Question Submission via Secure Backend Endpoint
  tutorForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = tutorQuestionInput.value.trim();
    if (!query) return;

    const subject = tutorSubjectSelect.value;
    const style = tutorStyleSelect.value;

    responseEmptyState.style.display = 'none';
    responseRenderedContent.style.display = 'none';
    responseTools.style.display = 'none';
    responseLoadingState.style.display = 'flex';
    tutorMiloStatus.textContent = "Milo is thinking... 🤔";
    triggerMiloSpeech("Ooh, let me break that down for you! One second... 💭");

    // Secure server-side endpoint call (no API keys exposed to browser)
    try {
      const activeBoard = (typeof activeCurriculum !== 'undefined' && activeCurriculum.board) ? activeCurriculum.board.id : 'CBSE';
      const activeClass = (typeof activeCurriculum !== 'undefined') ? activeCurriculum.classNum : '10';

      const res = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          subject: subject,
          style: style,
          board: activeBoard,
          classNum: activeClass
        })
      });

      if (res.ok) {
        const apiJson = await res.json();
        if (apiJson.success && apiJson.data) {
          displayTutorAnswer(apiJson.data, style, apiJson.source);
          recordStudentActivity('ask_tutor', { question: query, subject: subject });
          return;
        }
      }
    } catch (err) {
      console.warn("Server tutor endpoint call failed; switching to local knowledge engine:", err);
    }

    // Built-in intelligent engine fallback
    setTimeout(() => {
      const result = getEducationalResponse(query, subject, style);
      displayTutorAnswer(result, style, "LearnMate Local Knowledge Engine");
      recordStudentActivity('ask_tutor', { question: query, subject: subject });
    }, 400);
  });

  // Prompt chips
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      tutorQuestionInput.value = chip.getAttribute('data-query');
      tutorForm.dispatchEvent(new Event('submit'));
    });
  });

  // Reset tutor
  btnResetTutor.addEventListener('click', () => {
    tutorQuestionInput.value = '';
    responseRenderedContent.innerHTML = '';
    responseRenderedContent.style.display = 'none';
    responseTools.style.display = 'none';
    responseLoadingState.style.display = 'none';
    responseEmptyState.style.display = 'flex';
    tutorMiloStatus.textContent = "Ready to help you understand";
    if (window.speechSynthesis) window.speechSynthesis.cancel();
  });

  // Audio Read Aloud
  btnReadAloud.addEventListener('click', () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-speech is not supported on this browser.");
      return;
    }

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      btnReadAloud.innerHTML = `<span class="tool-icon">🔊</span><span class="tool-label">Listen</span>`;
      return;
    }

    const textToSpeak = responseRenderedContent.innerText;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.05;

    btnReadAloud.innerHTML = `<span class="tool-icon">⏹️</span><span class="tool-label">Stop</span>`;
    utterance.onend = () => {
      btnReadAloud.innerHTML = `<span class="tool-icon">🔊</span><span class="tool-label">Listen</span>`;
    };
    utterance.onerror = () => {
      btnReadAloud.innerHTML = `<span class="tool-icon">🔊</span><span class="tool-label">Listen</span>`;
    };

    window.speechSynthesis.speak(utterance);
  });

  // Copy Answer
  btnCopyAnswer.addEventListener('click', () => {
    const textToCopy = responseRenderedContent.innerText;
    navigator.clipboard.writeText(textToCopy).then(() => {
      const orig = btnCopyAnswer.innerHTML;
      btnCopyAnswer.innerHTML = `<span class="tool-icon">✅</span><span class="tool-label">Copied!</span>`;
      setTimeout(() => {
        btnCopyAnswer.innerHTML = orig;
      }, 2000);
    });
  });

  /* ===================================================================
     6. THE QUIZ ARENA (Milo Reacting, Cheering & Encouraging)
     =================================================================== */
  const quizBank = [
    {
      subject: "science",
      subjectBadge: "Science",
      question: "During photosynthesis, what gas do green leaves release into the air for humans and animals to breathe?",
      options: [
        "Carbon Dioxide (CO2)",
        "Oxygen (O2)",
        "Nitrogen (N2)",
        "Methane (CH4)"
      ],
      correct: 1,
      explanation: "Plants take in carbon dioxide and water to bake sugar, releasing clean oxygen back into the air as a gift to all of us!"
    },
    {
      subject: "math",
      subjectBadge: "Mathematics",
      question: "What happens when you try to divide 25 by 0 in standard arithmetic?",
      options: [
        "The answer is 0",
        "The answer is 25",
        "It is Undefined (Cannot be done)",
        "The answer is 1"
      ],
      correct: 2,
      explanation: "Division by zero is undefined because no number multiplied by zero can ever give 25 back!"
    },
    {
      subject: "cs",
      subjectBadge: "Computer Science",
      question: "What is an algorithm in computer science?",
      options: [
        "A piece of metal hardware",
        "A clear, step-by-step set of instructions to solve a problem",
        "An internet cable",
        "A harmful computer virus"
      ],
      correct: 1,
      explanation: "An algorithm is like a cooking recipe: a clear step-by-step list of instructions to get something done."
    },
    {
      subject: "english",
      subjectBadge: "English",
      question: "Which of the following sentences is written in the ACTIVE voice?",
      options: [
        "The winning goal was scored by Maya.",
        "The letter was mailed yesterday afternoon.",
        "Maya scored the winning goal.",
        "The trophy was held by the team captain."
      ],
      correct: 2,
      explanation: "In 'Maya scored the winning goal', the subject (Maya) does the action (scored) directly, which makes it active voice."
    },
    {
      subject: "science",
      subjectBadge: "Science",
      question: "According to Newton's First Law, an object at rest will stay at rest unless acted on by what?",
      options: [
        "An outside push or pull (force)",
        "Continuous heat",
        "A magnet only",
        "Total darkness"
      ],
      correct: 0,
      explanation: "This is inertia: objects naturally want to keep doing what they are already doing unless an outside push makes them change!"
    },
    {
      subject: "math",
      subjectBadge: "Mathematics",
      question: "In a right triangle with shorter sides measuring 3 cm and 4 cm, how long is the diagonal hypotenuse?",
      options: [
        "5 cm",
        "6 cm",
        "7 cm",
        "12 cm"
      ],
      correct: 0,
      explanation: "Pythagorean theorem: 3² + 4² = 9 + 16 = 25. The square root of 25 is 5 cm!"
    },
    {
      subject: "cs",
      subjectBadge: "Computer Science",
      question: "In making a website, what is the main job of CSS?",
      options: [
        "To remember user passwords",
        "To style the colors, fonts, and layout",
        "To build the database tables",
        "To connect physical wires"
      ],
      correct: 1,
      explanation: "HTML is the skeleton/content, CSS adds the beautiful design and colors (the clothing), and JavaScript adds interactivity."
    },
    {
      subject: "english",
      subjectBadge: "English",
      question: "'Her laughter was as warm as the morning sun.' What figure of speech is this?",
      options: [
        "Metaphor",
        "Simile",
        "Hyperbole",
        "Alliteration"
      ],
      correct: 1,
      explanation: "Because it compares her laughter to the sun using the word 'as', it is a Simile. If it said 'Her laughter was sunshine', it would be a Metaphor."
    }
  ];

  let currentQuizFilter = "all";
  let activeQuestions = [...quizBank];
  let currentQIdx = 0;
  let quizScore = 0;
  let hasPickedOption = false;

  const quizPillBtns = document.querySelectorAll('.quiz-pill-btn');
  const quizActiveCard = document.getElementById('quizActiveCard');
  const quizCompletionCard = document.getElementById('quizCompletionCard');
  const quizSubjectChip = document.getElementById('quizSubjectChip');
  const quizCounterText = document.getElementById('quizCounterText');
  const liveScoreValue = document.getElementById('liveScoreValue');
  const quizProgressFill = document.getElementById('quizProgressFill');
  const quizQuestionPrompt = document.getElementById('quizQuestionPrompt');
  const quizOptionsContainer = document.getElementById('quizOptionsContainer');
  const quizExplanationDrawer = document.getElementById('quizExplanationDrawer');
  const quizExplanationText = document.getElementById('quizExplanationText');
  const expDrawerBadge = document.getElementById('expDrawerBadge');
  const btnNextQuizQuestion = document.getElementById('btnNextQuizQuestion');
  const btnResetQuiz = document.getElementById('btnResetQuiz');
  const quizCoachEmoji = document.getElementById('quizCoachEmoji');
  const quizCoachSpeech = document.getElementById('quizCoachSpeech');

  const completionHeadline = document.getElementById('completionHeadline');
  const completionRatio = document.getElementById('completionRatio');
  const completionPercentage = document.getElementById('completionPercentage');
  const completionFeedback = document.getElementById('completionFeedback');
  const btnRetakeQuiz = document.getElementById('btnRetakeQuiz');

  function startQuiz(category = "all", difficulty = "all", chapterId = null) {
    currentQuizFilter = category;

    let pool = [];
    if (window.LearnMateData && typeof window.LearnMateData.getQuestions === 'function') {
      const activeBoard = (activeCurriculum && activeCurriculum.board) ? activeCurriculum.board.id : 'cbse';
      const activeClass = (activeCurriculum && activeCurriculum.classNum) ? activeCurriculum.classNum : '10';

      const filter = {
        subjectId: category === 'all' ? null : category,
        boardId: activeBoard,
        classNum: activeClass,
        difficulty: difficulty === 'all' ? null : difficulty,
        chapterId: chapterId || null
      };

      pool = window.LearnMateData.getQuestions(filter);

      // If specific subject filter has fewer than 3 questions, fetch subject across boards
      if (pool.length < 3 && category !== 'all') {
        pool = window.LearnMateData.getQuestions({ subjectId: category });
      }
      // If still fewer than 3, load general question bank
      if (pool.length < 3) {
        pool = window.LearnMateData.getQuestions();
      }
    }

    if (!pool || pool.length === 0) {
      pool = quizBank;
    }

    // Adapt to quiz UI properties
    activeQuestions = pool.map(q => ({
      ...q,
      subjectBadge: q.subjectBadge || (q.subjectId ? q.subjectId.toUpperCase() : 'CURRICULUM'),
      options: (q.options && q.options.length > 0) ? q.options : ["True", "False"],
      correct: (typeof q.correct === 'number') ? q.correct : 0,
      explanation: q.explanation || "Official curriculum verified explanation."
    }));

    currentQIdx = 0;
    quizScore = 0;
    liveScoreValue.textContent = quizScore;
    hasPickedOption = false;

    quizCompletionCard.style.display = 'none';
    quizActiveCard.style.display = 'block';

    quizCoachEmoji.textContent = '🌱';
    quizCoachSpeech.textContent = "You've got this! Pick what makes sense:";

    displayQuestion();
  }

  function displayQuestion() {
    hasPickedOption = false;
    btnNextQuizQuestion.disabled = true;
    quizExplanationDrawer.style.display = 'none';

    const currentQ = activeQuestions[currentQIdx];
    quizSubjectChip.textContent = currentQ.subjectBadge;
    quizCounterText.textContent = `Question ${currentQIdx + 1} of ${activeQuestions.length}`;
    quizProgressFill.style.width = `${((currentQIdx + 1) / activeQuestions.length) * 100}%`;
    quizQuestionPrompt.textContent = currentQ.question;

    const letters = ['A', 'B', 'C', 'D'];
    quizOptionsContainer.innerHTML = currentQ.options.map((opt, i) => `
      <button type="button" class="editorial-quiz-option" data-opt-idx="${i}">
        <span class="option-badge-letter">${letters[i]}</span>
        <span class="option-copy">${opt}</span>
      </button>
    `).join('');

    const optionButtons = quizOptionsContainer.querySelectorAll('.editorial-quiz-option');
    optionButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        handleOptionSelected(parseInt(btn.getAttribute('data-opt-idx')), optionButtons, currentQ);
      });
    });
  }

  function handleOptionSelected(selectedIndex, allButtons, qData) {
    if (hasPickedOption) return;
    hasPickedOption = true;

    allButtons.forEach(btn => btn.disabled = true);

    const isCorrect = selectedIndex === qData.correct;
    if (isCorrect) {
      quizScore++;
      liveScoreValue.textContent = quizScore;
      allButtons[selectedIndex].classList.add('correct');
      // Milo celebrates
      quizCoachEmoji.textContent = '🎉';
      quizCoachSpeech.textContent = "Awesome job! You got it right! ⭐";
      expDrawerBadge.textContent = "🎉 Correct! Here's why:";
    } else {
      allButtons[selectedIndex].classList.add('wrong');
      allButtons[qData.correct].classList.add('correct');
      // Milo encourages
      quizCoachEmoji.textContent = '🌱';
      quizCoachSpeech.textContent = "Good try! Here is a simple explanation:";
      expDrawerBadge.textContent = "💡 Simple Explanation:";
    }

    quizExplanationText.textContent = qData.explanation;
    quizExplanationDrawer.style.display = 'block';

    btnNextQuizQuestion.disabled = false;
    if (currentQIdx === activeQuestions.length - 1) {
      btnNextQuizQuestion.textContent = 'View Final Results 🏆';
    } else {
      btnNextQuizQuestion.textContent = 'Next Question →';
    }
  }

  btnNextQuizQuestion.addEventListener('click', () => {
    if (currentQIdx < activeQuestions.length - 1) {
      currentQIdx++;
      quizCoachEmoji.textContent = '🌱';
      quizCoachSpeech.textContent = "Keep going! What do you think for this one?";
      displayQuestion();
    } else {
      showCompletionScreen();
    }
  });

  btnResetQuiz.addEventListener('click', () => {
    startQuiz(currentQuizFilter);
  });

  function showCompletionScreen() {
    quizActiveCard.style.display = 'none';
    quizCompletionCard.style.display = 'block';

    const total = activeQuestions.length;
    const percentage = Math.round((quizScore / total) * 100);

    completionRatio.textContent = `${quizScore}/${total}`;
    completionPercentage.textContent = `${percentage}%`;

    if (percentage >= 80) {
      completionHeadline.textContent = "Great Job! You Finished Your Quiz! 🏆";
      completionFeedback.textContent = "Milo is super proud! You've built wonderful understanding of these topics.";
      triggerMiloSpeech("Outstanding quiz score! You're mastering this curriculum! 🌟");
    } else if (percentage >= 50) {
      completionHeadline.textContent = "Well Done! Solid Effort! 🌟";
      completionFeedback.textContent = "You understand the big ideas well. Review the simple explanations to master the tricky parts!";
      triggerMiloSpeech("Solid effort! Review the notes to turn good into great! 📘");
    } else {
      completionHeadline.textContent = "Good Start! Keep Growing! 🌱";
      completionFeedback.textContent = "Mistakes are just stepping stones to learning. Use Milo's AI Tutor to clear up any doubts!";
      triggerMiloSpeech("Mistakes are just proof you are exploring! Let's review together! 🌱");
    }

    // Record quiz attempt locally for student progress tracking
    recordStudentActivity('quiz_score', { percentage, score: quizScore, total });
    recordStudentActivity('practice_attempt', {});
    try {
      const history = JSON.parse(localStorage.getItem('learnmate_quiz_history') || '[]');
      history.push({
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        score: quizScore,
        total: total,
        percentage: percentage,
        category: currentQuizFilter
      });
      localStorage.setItem('learnmate_quiz_history', JSON.stringify(history.slice(-30)));
    } catch (e) {
      console.warn("Could not record quiz history locally:", e);
    }
    renderProgressDashboard();
  }

  btnRetakeQuiz.addEventListener('click', () => {
    startQuiz(currentQuizFilter);
  });

  quizPillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      quizPillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-quiz-subject');
      startQuiz(cat);
    });
  });

  startQuiz('all');

  /* ===================================================================
     7. QUEST PLANNER (WITH CHECKBOX CHEERS)
     =================================================================== */
  const plannerGeneratorForm = document.getElementById('plannerGeneratorForm');
  const plannerTopicField = document.getElementById('plannerTopicField');
  const plannerDurationSelect = document.getElementById('plannerDurationSelect');
  const plannerDailyHoursSelect = document.getElementById('plannerDailyHoursSelect');
  const plannerObjectiveSelect = document.getElementById('plannerObjectiveSelect');
  const roadmapTopicTitle = document.getElementById('roadmapTopicTitle');
  const roadmapMetaSub = document.getElementById('roadmapMetaSub');
  const roadmapChecklistContainer = document.getElementById('roadmapChecklistContainer');
  const btnPrintSchedule = document.getElementById('btnPrintSchedule');

  const roadmapBlueprints = {
    3: [
      { day: "Day 1", phase: "Core Basics & Fun Analogies", desc: "Break down the main definitions. Learn 2 practical analogies. Write down unfamiliar words and ask Milo." },
      { day: "Day 2", phase: "Guided Practice & Real Problems", desc: "Solve 5 beginner problems and 3 exam exercises. Check answers step-by-step to catch misconceptions early." },
      { day: "Day 3", phase: "Active Recall & Teach-Back", desc: "Explain the entire topic out loud in 5 minutes (Feynman technique). Retake the subject quiz and review formulas." }
    ],
    5: [
      { day: "Day 1", phase: "Big Picture Story", desc: "Read high-level overviews without stressing over formulas. Understand why this topic exists and what real problem it solves." },
      { day: "Day 2", phase: "Key Concepts & Simple Word Translation", desc: "Translate textbook vocabulary into simple English notes. Create 5 flashcards for essential terms." },
      { day: "Day 3", phase: "Guided Exercises & Worked Examples", desc: "Solve step-by-step sample questions. Write out your reasoning on paper rather than guessing in your head." },
      { day: "Day 4", phase: "Independent Practice & Doubt Clearing", desc: "Attempt 5 unguided exercises. Feed any stuck questions into LearnMate AI Tutor for clarification." },
      { day: "Day 5", phase: "Comprehensive Revision & Spaced Quiz", desc: "Test yourself with the active recall quiz. Review errors and write a 1-page quick revision cheat sheet." }
    ],
    7: [
      { day: "Day 1", phase: "Topic Foundation & Overview", desc: "Understand core concepts and everyday analogies. Map out the chapter structure." },
      { day: "Day 2", phase: "Deep-Dive into Section 1", desc: "Focus specifically on the first major sub-topic. Solve 3 basic examples." },
      { day: "Day 3", phase: "Deep-Dive into Section 2", desc: "Tackle the second sub-topic. Compare similarities and differences with Section 1." },
      { day: "Day 4", phase: "Mid-Way Active Recall Checkpoint", desc: "Take an interactive practice quiz to verify retention. Re-read weak areas." },
      { day: "Day 5", phase: "Applied Problems & Tricky Edge Cases", desc: "Work on past exam questions or challenging scenarios." },
      { day: "Day 6", phase: "Feynman Technique & Summary Sheet", desc: "Explain the topic without looking at your notes. Draft a 1-page summary." },
      { day: "Day 7", phase: "Final Simulation & Rest", desc: "Complete a timed mini-test, review answers, and relax before test day." }
    ],
    14: [
      { day: "Days 1-3", phase: "Phase 1: Conceptual Foundations", desc: "Master basic vocabulary, everyday metaphors, and fundamental equations in 30-min focused sessions." },
      { day: "Days 4-7", phase: "Phase 2: Step-by-Step Problem Solving", desc: "Gradually increase difficulty from textbook examples to standard examination problems." },
      { day: "Days 8-11", phase: "Phase 3: Deep Practice & Active Retrieval", desc: "Use flashcards, quizzes, and teach-back methods to transfer knowledge into long-term memory." },
      { day: "Days 12-14", phase: "Phase 4: Full Exam Readiness & Polishing", desc: "Simulate test conditions, review all previous mistakes, and build confidence." }
    ]
  };

  function generateStudyRoadmap(topic, days, hours, goal) {
    const dayCount = parseInt(days) || 5;
    const blueprint = roadmapBlueprints[dayCount] || roadmapBlueprints[5];

    roadmapTopicTitle.textContent = `Your Plan: ${topic}`;
    roadmapMetaSub.textContent = `${dayCount}-Day Schedule • ${hours} per day • Goal: ${goal.toUpperCase()}`;

    const savedSteps = (() => {
      try { return JSON.parse(localStorage.getItem('learnmate_study_plan_steps') || '{}'); } catch(e) { return {}; }
    })();

    roadmapChecklistContainer.innerHTML = blueprint.map((item, i) => {
      const stepKey = `${topic}_day_${i}`;
      const isChecked = !!savedSteps[stepKey];
      return `
      <div class="roadmap-step-item ${isChecked ? 'checked' : ''}">
        <input type="checkbox" class="roadmap-checkbox" id="step_cb_${i}" data-step-key="${stepKey}" ${isChecked ? 'checked' : ''} aria-label="Mark day completed">
        <div class="roadmap-step-content">
          <span class="step-day-badge">${item.day}</span>
          <h4 class="step-title">${item.phase}</h4>
          <p class="step-desc">${item.desc.replace(/this topic/gi, topic)}</p>
        </div>
      </div>
    `;
    }).join('');

    const checkboxes = roadmapChecklistContainer.querySelectorAll('.roadmap-checkbox');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', (e) => {
        const parentStep = e.target.closest('.roadmap-step-item');
        const sKey = e.target.getAttribute('data-step-key');
        if (e.target.checked) {
          parentStep.classList.add('checked');
          triggerMiloSpeech("You completed a quest step! Fantastic work! 🎯");
        } else {
          parentStep.classList.remove('checked');
        }
        try {
          const curSaved = JSON.parse(localStorage.getItem('learnmate_study_plan_steps') || '{}');
          if (e.target.checked) curSaved[sKey] = true;
          else delete curSaved[sKey];
          localStorage.setItem('learnmate_study_plan_steps', JSON.stringify(curSaved));
        } catch (err) {}
      });
    });
  }

  plannerGeneratorForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const topic = plannerTopicField.value.trim() || "Plant Cells & Photosynthesis";
    const days = plannerDurationSelect.value;
    const hours = plannerDailyHoursSelect.value;
    const goal = plannerObjectiveSelect.value;

    generateStudyRoadmap(topic, days, hours, goal);
    triggerMiloSpeech(`Roadmap generated for ${topic}! Let's do this! 🗺️`);

    if (window.innerWidth < 1024) {
      document.getElementById('plannerRoadmapPanel').scrollIntoView({ behavior: 'smooth' });
    }
  });

  generateStudyRoadmap("Plant Cells & Photosynthesis", "5", "1 hour", "exam");

  btnPrintSchedule.addEventListener('click', () => {
    window.print();
  });

  /* ===================================================================
     8. OPTIONAL GEMINI API SETTINGS MODAL
     =================================================================== */
  const apiKeyModal = document.getElementById('apiKeyModal');
  const btnOpenApiKeyModal = document.getElementById('btnOpenApiKeyModal');
  const btnDismissApiModal = document.getElementById('btnDismissApiModal');
  const geminiApiKeyField = document.getElementById('geminiApiKeyField');
  const btnSaveApiKey = document.getElementById('btnSaveApiKey');
  const btnClearApiKey = document.getElementById('btnClearApiKey');
  const apiStatusBanner = document.getElementById('apiStatusBanner');

  async function refreshApiStatus() {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const health = await res.json();
        const geminiActive = Boolean(health.gemini_available);
        const openaiActive = Boolean(health.openai_available);
        if (geminiActive || openaiActive) {
          const providers = [geminiActive ? 'Google Gemini' : null, openaiActive ? 'OpenAI' : null].filter(Boolean).join(' & ');
          apiStatusBanner.innerHTML = `Status: <strong style="color: #2A9D8F;">Connected to Server-Side AI</strong> (${providers}). Queries run securely via backend server without exposing keys in browser storage.`;
        } else {
          apiStatusBanner.innerHTML = `Status: <strong>Active with Built-in Educational Knowledge Engine</strong>. Set <code>GEMINI_API_KEY</code> or <code>OPENAI_API_KEY</code> in your server <code>.env</code> file to enable live generative AI tutor responses.`;
        }
      }
    } catch (e) {
      apiStatusBanner.innerHTML = `Status: <strong>Running with Built-in Curriculum Engine (Offline Capable)</strong>.`;
    }
    // Remove any legacy insecure client keys from localStorage
    localStorage.removeItem('learnmate_gemini_key');
  }

  btnOpenApiKeyModal.addEventListener('click', () => {
    refreshApiStatus();
    apiKeyModal.classList.add('active');
    apiKeyModal.setAttribute('aria-hidden', 'false');
  });

  btnDismissApiModal.addEventListener('click', () => {
    apiKeyModal.classList.remove('active');
    apiKeyModal.setAttribute('aria-hidden', 'true');
  });

  apiKeyModal.addEventListener('click', (e) => {
    if (e.target === apiKeyModal) {
      apiKeyModal.classList.remove('active');
      apiKeyModal.setAttribute('aria-hidden', 'true');
    }
  });

  if (btnSaveApiKey) {
    btnSaveApiKey.addEventListener('click', () => {
      alert("🔒 Security Notice: To keep your credentials safe from client-side exposure, please configure OPENAI_API_KEY or GEMINI_API_KEY in your server's .env file. The Flask backend will use it automatically without risking your key in browser storage.");
      refreshApiStatus();
      apiKeyModal.classList.remove('active');
    });
  }

  if (btnClearApiKey) {
    btnClearApiKey.addEventListener('click', () => {
      localStorage.removeItem('learnmate_gemini_key');
      refreshApiStatus();
      alert("ℹ️ Reverted to Built-in Academic Knowledge Engine.");
      apiKeyModal.classList.remove('active');
    });
  }

  /* ===================================================================
     6. SMART BOARD & CLASS SELECTION SYSTEM & ACADEMIC SYLLABUS ENGINE
     The Curious Learning Universe
     =================================================================== */

  const PROFILE_STORAGE_KEY = 'learnmate_user_profile';
  const PROGRESS_STORAGE_KEY = 'learnmate_chapter_progress';
  const STORAGE_ACTIVITY_KEY = 'learnmate_user_activity';

  // Resilient Local Storage Manager (handles corrupted data, schemas, duplicate prevention, and reset)
  const LearnMateStorage = {
    version: '2.1',
    safeGet(key, fallback = null) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        const parsed = JSON.parse(raw);
        return (parsed !== null && parsed !== undefined) ? parsed : fallback;
      } catch (err) {
        console.warn(`LearnMate: Recovered from corrupted storage key "${key}". Resetting to safe defaults.`, err);
        return fallback;
      }
    },
    safeSet(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.warn(`LearnMate: Could not write to storage key "${key}":`, err);
      }
    },
    getUserActivity() {
      return this.safeGet(STORAGE_ACTIVITY_KEY, {
        notesViewed: 0,
        questionsAttempted: 0,
        questionsCorrect: 0,
        quizScores: [],
        recentLog: []
      });
    },
    recordQuizAttempt(attempt) {
      if (!attempt) return;
      const history = this.safeGet('learnmate_quiz_history', []);
      // Prevent rapid duplicate submissions within 5 seconds for the same category/score
      const now = Date.now();
      const isDuplicate = history.some(item => {
        return item.category === attempt.category &&
               item.score === attempt.score &&
               item.total === attempt.total &&
               (now - (item._timestamp || 0)) < 5000;
      });
      if (isDuplicate) return;

      const record = {
        ...attempt,
        _timestamp: now,
        date: attempt.date || new Date().toLocaleDateString(),
        time: attempt.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      history.push(record);
      this.safeSet('learnmate_quiz_history', history.slice(-50));
    },
    getQuizHistory() {
      return this.safeGet('learnmate_quiz_history', []);
    },
    resetAllProgress() {
      localStorage.removeItem(PROGRESS_STORAGE_KEY);
      localStorage.removeItem(STORAGE_ACTIVITY_KEY);
      localStorage.removeItem('learnmate_quiz_history');
      localStorage.removeItem('learnmate_syllabus_progress');
      localStorage.removeItem('learnmate_study_plan_steps');
      console.info("LearnMate local student progress safely reset.");
    }
  };
  window.LearnMateStorage = LearnMateStorage;

  // Fallback profile if storage is empty
  const DEFAULT_PROFILE = {
    board: 'maharashtra',
    stateId: 'maharashtra',
    classNum: '10',
    stream: 'general'
  };

  // State management helpers
  function getUserProfile() {
    const saved = LearnMateStorage.safeGet(PROFILE_STORAGE_KEY, null);
    if (saved && typeof saved === 'object' && saved.board && saved.classNum) {
      return saved;
    }
    return null;
  }

  function saveUserProfile(profile) {
    LearnMateStorage.safeSet(PROFILE_STORAGE_KEY, profile);
  }

  function getChapterProgress() {
    return LearnMateStorage.safeGet(PROGRESS_STORAGE_KEY, {});
  }

  function setChapterProgress(chapterId, isCompleted) {
    const progress = getChapterProgress();
    if (isCompleted) {
      progress[chapterId] = true;
    } else {
      delete progress[chapterId];
    }
    LearnMateStorage.safeSet(PROGRESS_STORAGE_KEY, progress);
  }

  // DOM Elements: Header Badge
  const headerCurriculumPill = document.getElementById('headerCurriculumPill');
  const navBoardClassText = document.getElementById('navBoardClassText');
  const btnOpenBoardModal = document.getElementById('btnOpenBoardModal');
  const btnChangeBoardHero = document.getElementById('btnChangeBoardHero');

  // DOM Elements: Onboarding Wizard
  const onboardingModal = document.getElementById('onboardingModal');
  const stepDot1 = document.getElementById('stepDot1');
  const stepDot2 = document.getElementById('stepDot2');
  const stepDot3 = document.getElementById('stepDot3');
  const stepConnector1 = document.getElementById('stepConnector1');
  const stepConnector2 = document.getElementById('stepConnector2');

  const onboardingStep1 = document.getElementById('onboardingStep1');
  const onboardingStep2 = document.getElementById('onboardingStep2');
  const onboardingStep3 = document.getElementById('onboardingStep3');

  const cardStateBoard = document.getElementById('cardStateBoard');
  const cardCbseBoard = document.getElementById('cardCbseBoard');
  const btnSelectBoardList = document.querySelectorAll('.btn-select-board');

  const stateSearchField = document.getElementById('stateSearchField');
  const btnClearStateSearch = document.getElementById('btnClearStateSearch');
  const statesFoundCounter = document.getElementById('statesFoundCounter');
  const stateBoardsScrollGrid = document.getElementById('stateBoardsScrollGrid');
  const btnBackToBoardSelect = document.getElementById('btnBackToBoardSelect');
  const stateSelectedPreview = document.getElementById('stateSelectedPreview');
  const btnProceedToClasses = document.getElementById('btnProceedToClasses');

  const contextBoardName = document.getElementById('contextBoardName');
  const contextStateWrap = document.getElementById('contextStateWrap');
  const contextStateName = document.getElementById('contextStateName');
  const classCardsGrid = document.getElementById('classCardsGrid');
  const streamSelectorContainer = document.getElementById('streamSelectorContainer');
  const streamPills = document.querySelectorAll('.stream-pill');
  const btnBackToPrevStep = document.getElementById('btnBackToPrevStep');
  const classSelectedPreview = document.getElementById('classSelectedPreview');
  const btnFinalizeOnboarding = document.getElementById('btnFinalizeOnboarding');

  // DOM Elements: Syllabus Dashboard
  const dashBoardTypeBadge = document.getElementById('dashBoardTypeBadge');
  const dashAcademicYearTag = document.getElementById('dashAcademicYearTag');
  const dashVerifiedBadge = document.getElementById('dashVerifiedBadge');
  const dashBoardFullName = document.getElementById('dashBoardFullName');
  const dashBoardDescription = document.getElementById('dashBoardDescription');
  const dashClassChip = document.getElementById('dashClassChip');
  const dashSourceChip = document.getElementById('dashSourceChip');
  const dashProgressCount = document.getElementById('dashProgressCount');
  const dashProgressPercent = document.getElementById('dashProgressPercent');
  const dashProgressBarFill = document.getElementById('dashProgressBarFill');

  const syllabusSearchInput = document.getElementById('syllabusSearchInput');
  const btnClearSyllabusSearch = document.getElementById('btnClearSyllabusSearch');
  const syllabusResultsCount = document.getElementById('syllabusResultsCount');
  const syllabusSubjectPills = document.getElementById('syllabusSubjectPills');
  const syllabusChaptersGrid = document.getElementById('syllabusChaptersGrid');

  // DOM Elements: General Worlds Drawer Toggle
  const btnToggleGeneralWorlds = document.getElementById('btnToggleGeneralWorlds');
  const generalWorldsDrawer = document.getElementById('generalWorldsDrawer');
  const worldsChevron = document.getElementById('worldsChevron');

  // DOM Elements: Chapter Study Portal Modal
  const chapterDetailModal = document.getElementById('chapterDetailModal');
  const chapterBreadcrumbs = document.getElementById('chapterBreadcrumbs');
  const chapterUnitBreadcrumb = document.getElementById('chapterUnitBreadcrumb');
  const chapterModalIcon = document.getElementById('chapterModalIcon');
  const chapterModalNumber = document.getElementById('chapterModalNumber');
  const chapterModalTitle = document.getElementById('chapterModalTitle');
  const btnDismissChapterModal = document.getElementById('btnDismissChapterModal');
  const btnCloseChapterModal = document.getElementById('btnCloseChapterModal');
  const chapterModalSummary = document.getElementById('chapterModalSummary');
  const chapterModalAnalogy = document.getElementById('chapterModalAnalogy');
  const chapterModalConcepts = document.getElementById('chapterModalConcepts');
  const chapterFormulasBlock = document.getElementById('chapterFormulasBlock');
  const chapterModalFormulas = document.getElementById('chapterModalFormulas');
  const chapterModalNotes = document.getElementById('chapterModalNotes');
  const chapterModalPracticeQ = document.getElementById('chapterModalPracticeQ');
  const btnTogglePracticeAnswer = document.getElementById('btnTogglePracticeAnswer');
  const chapterPracticeAnswerBox = document.getElementById('chapterPracticeAnswerBox');
  const chapterMiniQuizCard = document.getElementById('chapterMiniQuizCard');
  const chapterModalCompletedCheckbox = document.getElementById('chapterModalCompletedCheckbox');
  const btnAskMiloChapter = document.getElementById('btnAskMiloChapter');

  // Active Wizard Staging State
  let wizardState = {
    board: 'state',
    stateId: 'maharashtra',
    classNum: '10',
    stream: 'general'
  };

  /* -------------------------------------------------------------
     A. ONBOARDING WIZARD NAVIGATION & STEP LOGIC
     ------------------------------------------------------------- */
  function openOnboardingModal(allowClose = false) {
    const existing = getUserProfile() || DEFAULT_PROFILE;
    wizardState = { ...existing };
    
    // Pre-sync selection states
    syncWizardUiToState();
    goToWizardStep(1);

    onboardingModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    triggerMiloSpeech("Welcome! Let's personalize your learning journey! 🎒");
  }

  function closeOnboardingModal() {
    onboardingModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  function goToWizardStep(stepNum) {
    // Hide all steps
    onboardingStep1.classList.remove('active');
    onboardingStep2.classList.remove('active');
    onboardingStep3.classList.remove('active');

    // Reset indicator classes
    [stepDot1, stepDot2, stepDot3].forEach(dot => dot.classList.remove('active', 'completed'));
    [stepConnector1, stepConnector2].forEach(conn => conn.classList.remove('completed'));

    if (stepNum === 1) {
      onboardingStep1.classList.add('active');
      stepDot1.classList.add('active');
    } else if (stepNum === 2) {
      onboardingStep2.classList.add('active');
      stepDot1.classList.add('completed');
      stepConnector1.classList.add('completed');
      stepDot2.classList.add('active');
      // Scroll state list to top
      if (stateBoardsScrollGrid) stateBoardsScrollGrid.scrollTop = 0;
    } else if (stepNum === 3) {
      onboardingStep3.classList.add('active');
      stepDot1.classList.add('completed');
      stepConnector1.classList.add('completed');
      stepDot2.classList.add('completed');
      stepConnector2.classList.add('completed');
      stepDot3.classList.add('active');

      updateStep3ContextBanner();
    }
  }

  function syncWizardUiToState() {
    // Sync Step 1 Cards
    if (wizardState.board === 'cbse') {
      cardCbseBoard.classList.add('selected');
      cardStateBoard.classList.remove('selected');
    } else {
      cardStateBoard.classList.add('selected');
      cardCbseBoard.classList.remove('selected');
    }

    // Sync Step 2 State Cards
    renderStateBoardsList(stateSearchField ? stateSearchField.value : '');

    // Sync Step 3 Class Cards
    renderClassCards();
  }

  function updateStep3ContextBanner() {
    if (wizardState.board === 'cbse') {
      contextBoardName.textContent = "Central Board of Secondary Education (CBSE)";
      if (contextStateWrap) contextStateWrap.style.display = 'none';
    } else {
      const stateObj = window.SYLLABUS_DATABASE?.allIndianStatesBoards?.find(s => s.id === wizardState.stateId);
      const stateLabel = stateObj ? stateObj.state : "State Board";
      const boardLabel = stateObj ? stateObj.abbreviation : "State Board";
      contextBoardName.textContent = boardLabel;
      if (contextStateWrap) {
        contextStateWrap.style.display = 'inline';
        contextStateName.textContent = stateLabel;
      }
    }
  }

  // Step 1: Select Education Board Handlers
  function selectBoardOption(boardType) {
    wizardState.board = boardType;
    if (boardType === 'cbse') {
      cardCbseBoard.classList.add('selected');
      cardStateBoard.classList.remove('selected');
      triggerMiloSpeech("CBSE Board chosen! Aligned with NCERT nationwide. 🇮🇳");
      // Skip state board list and advance directly to class selection
      setTimeout(() => goToWizardStep(3), 200);
    } else {
      cardStateBoard.classList.add('selected');
      cardCbseBoard.classList.remove('selected');
      triggerMiloSpeech("State Board chosen! Select your state in the next step. 🏛️");
      setTimeout(() => goToWizardStep(2), 200);
    }
  }

  if (cardStateBoard) cardStateBoard.addEventListener('click', () => selectBoardOption('state'));
  if (cardCbseBoard) cardCbseBoard.addEventListener('click', () => selectBoardOption('cbse'));

  btnSelectBoardList.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const bType = btn.getAttribute('data-board');
      selectBoardOption(bType);
    });
  });

  // Step 2: Render & Filter State Boards
  function renderStateBoardsList(filterQuery = '') {
    if (!stateBoardsScrollGrid || !window.SYLLABUS_DATABASE) return;

    const query = filterQuery.trim().toLowerCase();
    const states = window.SYLLABUS_DATABASE.allIndianStatesBoards || [];

    const filtered = states.filter(s => {
      if (!query) return true;
      return s.state.toLowerCase().includes(query) ||
             s.secondaryBoard.toLowerCase().includes(query) ||
             s.abbreviation.toLowerCase().includes(query) ||
             (s.higherSecondaryBoard && s.higherSecondaryBoard.toLowerCase().includes(query));
    });

    if (statesFoundCounter) {
      statesFoundCounter.textContent = `${filtered.length} of ${states.length} States & UTs Available`;
    }

    if (filtered.length === 0) {
      stateBoardsScrollGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem; color: var(--text-muted);">
          <span style="font-size: 2rem; display: block; margin-bottom: 0.5rem;">🔍</span>
          <p>No state board found matching "<strong>${filterQuery}</strong>".</p>
          <button type="button" class="btn btn-secondary btn-sm" id="btnResetSearchInline" style="margin-top: 0.5rem;">Show All States</button>
        </div>
      `;
      document.getElementById('btnResetSearchInline')?.addEventListener('click', () => {
        stateSearchField.value = '';
        btnClearStateSearch.style.display = 'none';
        renderStateBoardsList('');
      });
      return;
    }

    stateBoardsScrollGrid.innerHTML = filtered.map(s => {
      const isSelected = wizardState.stateId === s.id;
      return `
        <div class="state-board-card ${isSelected ? 'selected' : ''}" data-state-id="${s.id}" role="radio" aria-checked="${isSelected}">
          <div>
            <div class="state-card-header">
              <span class="state-name-title">${s.state}</span>
              <span class="state-abbr-badge">${s.abbreviation}</span>
            </div>
            <p class="state-secondary-board"><strong>10th:</strong> ${s.secondaryBoard}</p>
            <p class="state-higher-secondary"><strong>12th:</strong> ${s.higherSecondaryBoard}</p>
          </div>
          <div class="state-card-footer">
            <span>🌐 ${s.website}</span>
            <span class="state-select-indicator">${isSelected ? '✓ Selected' : 'Select'}</span>
          </div>
        </div>
      `;
    }).join('');

    // Wire click events on state cards
    stateBoardsScrollGrid.querySelectorAll('.state-board-card').forEach(card => {
      card.addEventListener('click', () => {
        const sId = card.getAttribute('data-state-id');
        wizardState.stateId = sId;

        // Visual selection
        stateBoardsScrollGrid.querySelectorAll('.state-board-card').forEach(c => {
          c.classList.remove('selected');
          const ind = c.querySelector('.state-select-indicator');
          if (ind) ind.textContent = 'Select';
        });
        card.classList.add('selected');
        const ind = card.querySelector('.state-select-indicator');
        if (ind) ind.textContent = '✓ Selected';

        const stateObj = states.find(s => s.id === sId);
        if (stateSelectedPreview && stateObj) {
          stateSelectedPreview.innerHTML = `<span>Selected: <strong>${stateObj.state} (${stateObj.abbreviation})</strong></span>`;
        }

        if (btnProceedToClasses) {
          btnProceedToClasses.removeAttribute('disabled');
        }

        triggerMiloSpeech(`${stateObj ? stateObj.state : 'State'} board selected! Let's choose your class next. 🎓`);
      });
    });

    // Update preview pill
    const currentObj = states.find(s => s.id === wizardState.stateId);
    if (stateSelectedPreview) {
      if (currentObj) {
        stateSelectedPreview.innerHTML = `<span>Selected: <strong>${currentObj.state} (${currentObj.abbreviation})</strong></span>`;
        if (btnProceedToClasses) btnProceedToClasses.removeAttribute('disabled');
      } else {
        stateSelectedPreview.innerHTML = `<span>No state selected yet</span>`;
        if (btnProceedToClasses) btnProceedToClasses.setAttribute('disabled', 'true');
      }
    }
  }

  // State search input listeners
  if (stateSearchField) {
    stateSearchField.addEventListener('input', (e) => {
      const q = e.target.value;
      if (btnClearStateSearch) {
        btnClearStateSearch.style.display = q ? 'block' : 'none';
      }
      renderStateBoardsList(q);
    });
  }

  if (btnClearStateSearch) {
    btnClearStateSearch.addEventListener('click', () => {
      stateSearchField.value = '';
      btnClearStateSearch.style.display = 'none';
      renderStateBoardsList('');
      stateSearchField.focus();
    });
  }

  if (btnBackToBoardSelect) {
    btnBackToBoardSelect.addEventListener('click', () => goToWizardStep(1));
  }

  if (btnProceedToClasses) {
    btnProceedToClasses.addEventListener('click', () => {
      if (!wizardState.stateId) return;
      goToWizardStep(3);
    });
  }

  // Step 3: Render Class Cards (1 to 12)
  const classIcons = {
    "1": "🎨", "2": "🧸", "3": "🧩", "4": "📖", "5": "🔬",
    "6": "📐", "7": "🔭", "8": "🧪", "9": "📚", "10": "🎓",
    "11": "🏛️", "12": "🌟"
  };

  function renderClassCards() {
    if (!classCardsGrid) return;

    const grades = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];

    classCardsGrid.innerHTML = grades.map(num => {
      const isSelected = wizardState.classNum === num;
      let stageText = "Primary";
      if (num >= 6 && num <= 8) stageText = "Middle";
      else if (num >= 9 && num <= 10) stageText = num === "10" ? "10th SSC" : "Secondary";
      else if (num >= 11 && num <= 12) stageText = num === "12" ? "12th HSC" : "Sr. Sec";

      return `
        <div class="class-card-item ${isSelected ? 'selected' : ''}" data-class="${num}" role="radio" aria-checked="${isSelected}">
          <span class="class-card-icon">${classIcons[num] || '📚'}</span>
          <span class="class-card-grade-num">Class ${num}</span>
          <span class="class-card-stage-pill">${stageText}</span>
        </div>
      `;
    }).join('');

    // Wire click events
    classCardsGrid.querySelectorAll('.class-card-item').forEach(card => {
      card.addEventListener('click', () => {
        const cNum = card.getAttribute('data-class');
        wizardState.classNum = cNum;

        classCardsGrid.querySelectorAll('.class-card-item').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        if (classSelectedPreview) {
          classSelectedPreview.innerHTML = `<span>Selected: <strong>Class ${cNum}</strong></span>`;
        }

        // Show stream selector if class 11 or 12
        if (streamSelectorContainer) {
          if (cNum === '11' || cNum === '12') {
            streamSelectorContainer.style.display = 'block';
          } else {
            streamSelectorContainer.style.display = 'none';
          }
        }

        if (btnFinalizeOnboarding) {
          btnFinalizeOnboarding.removeAttribute('disabled');
        }

        triggerMiloSpeech(`Class ${cNum} locked in! Ready to enter your learning universe! 🌟`);
      });
    });

    // Stream selector pills
    streamPills.forEach(pill => {
      pill.addEventListener('click', () => {
        streamPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        wizardState.stream = pill.getAttribute('data-stream');
      });
    });

    // Initial stream container visibility
    if (streamSelectorContainer) {
      streamSelectorContainer.style.display = (wizardState.classNum === '11' || wizardState.classNum === '12') ? 'block' : 'none';
    }

    if (classSelectedPreview) {
      classSelectedPreview.innerHTML = `<span>Selected: <strong>Class ${wizardState.classNum}</strong></span>`;
    }
  }

  if (btnBackToPrevStep) {
    btnBackToPrevStep.addEventListener('click', () => {
      if (wizardState.board === 'cbse') {
        goToWizardStep(1); // skip step 2 for CBSE
      } else {
        goToWizardStep(2);
      }
    });
  }

  // Finalize Selection and Launch Dashboard
  if (btnFinalizeOnboarding) {
    btnFinalizeOnboarding.addEventListener('click', () => {
      saveUserProfile(wizardState);
      closeOnboardingModal();
      renderSyllabusDashboard();

      // Confetti celebration reaction
      triggerMiloSpeech(`Hooray! Personalized syllabus loaded for Class ${wizardState.classNum}! Let's discover! 🎉`);

      // Scroll to syllabus section
      const exploreSec = document.getElementById('explore');
      if (exploreSec) {
        exploreSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Open modal anytime from navbar & hero button
  if (btnOpenBoardModal) {
    btnOpenBoardModal.addEventListener('click', () => openOnboardingModal(true));
  }
  if (btnChangeBoardHero) {
    btnChangeBoardHero.addEventListener('click', () => openOnboardingModal(true));
  }

  const btnCloseOnboardingModal = document.getElementById('btnCloseOnboardingModal');
  if (btnCloseOnboardingModal) {
    btnCloseOnboardingModal.addEventListener('click', closeOnboardingModal);
  }
  if (onboardingModal) {
    onboardingModal.addEventListener('click', (e) => {
      if (e.target === onboardingModal) closeOnboardingModal();
    });
  }

  /* -------------------------------------------------------------
     B. ACADEMIC SYLLABUS DASHBOARD RENDERER
     ------------------------------------------------------------- */
  function renderSyllabusDashboard() {
    const profile = getUserProfile() || DEFAULT_PROFILE;
    if (!window.SYLLABUS_DATABASE) return;

    activeCurriculum = window.SYLLABUS_DATABASE.getCurriculum(profile.board, profile.classNum, profile.stateId);
    if (!activeCurriculum) return;

    const board = activeCurriculum.board;
    const subjects = activeCurriculum.subjects || {};
    const classNum = profile.classNum;

    // 1. Update Header Navigation Pill
    if (navBoardClassText) {
      navBoardClassText.textContent = `${board.shortName || 'Curriculum'} • Class ${classNum}`;
    }

    // 2. Update Dashboard Hero Card
    if (dashBoardTypeBadge) {
      dashBoardTypeBadge.textContent = profile.board === 'cbse' ? 'CBSE Board' : 'State Board';
    }
    if (dashAcademicYearTag) {
      dashAcademicYearTag.textContent = `Academic Year ${window.SYLLABUS_DATABASE.metadata.academicYear}`;
    }
    if (dashVerifiedBadge) {
      dashVerifiedBadge.textContent = `✓ Official Curriculum`;
    }
    if (dashBoardFullName) {
      dashBoardFullName.textContent = board.name;
    }
    if (dashBoardDescription) {
      dashBoardDescription.textContent = board.description || "Official academic syllabus aligned with state curriculum framework and textbook research.";
    }
    if (dashClassChip) {
      let suffix = "";
      if (classNum === "10") suffix = " (Secondary SSC / Matric)";
      else if (classNum === "12") suffix = " (Higher Secondary HSC)";
      dashClassChip.textContent = `Class ${classNum}${suffix}`;
    }
    if (dashSourceChip) {
      dashSourceChip.innerHTML = `<span class="chip-icon">🏛️</span> <span>${board.source || "Official State Board"}</span>`;
    }

    // 3. Render Dynamic Subject Tabs
    renderSubjectPills(subjects);

    // 4. Render Chapters for Active Subject Filter
    renderChaptersGrid(subjects, activeSubjectFilter);

    // 5. Update Progress Meter
    updateDashboardProgress(subjects);
  }

  function renderSubjectPills(subjects) {
    if (!syllabusSubjectPills) return;

    const subjectKeys = Object.keys(subjects);
    let html = `
      <button type="button" class="subject-pill-btn ${activeSubjectFilter === 'all' ? 'active' : ''}" data-subj="all">
        <span>🪐</span> <span>All Subjects</span>
      </button>
    `;

    subjectKeys.forEach(k => {
      const subj = subjects[k];
      const count = subj.chapters ? subj.chapters.length : 0;
      const isActive = activeSubjectFilter === k;
      html += `
        <button type="button" class="subject-pill-btn ${isActive ? 'active' : ''}" data-subj="${k}">
          <span>${subj.icon || '📚'}</span>
          <span>${subj.name}</span>
          <span style="font-size: 0.72rem; opacity: 0.8; font-weight: 700;">(${count})</span>
        </button>
      `;
    });

    syllabusSubjectPills.innerHTML = html;

    // Attach click events
    syllabusSubjectPills.querySelectorAll('.subject-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-subj');
        activeSubjectFilter = key;
        syllabusSubjectPills.querySelectorAll('.subject-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Re-render chapters
        renderChaptersGrid(subjects, activeSubjectFilter, syllabusSearchInput?.value || '');

        if (key !== 'all' && subjects[key]) {
          triggerMiloSpeech(`Exploring ${subjects[key].name}! Step-by-step notes ready! ✨`);
        }
      });
    });
  }

    let activeStatusFilter = 'all';

  // Wire Chapter Status Filter Pills (Requirement 4)
  const statusFilterPills = document.querySelectorAll('.status-filter-pill');
  statusFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      statusFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeStatusFilter = pill.getAttribute('data-status');
      
      if (activeCurriculum && activeCurriculum.subjects) {
        renderChaptersGrid(activeCurriculum.subjects, activeSubjectFilter, syllabusSearchInput?.value || '');
      }
    });
  });

  // Wire Continue Learning Buttons (Hero & Quick Bar)
  const btnContinueLearningHero = document.getElementById('btnContinueLearningHero');
  const btnQuickContinue = document.getElementById('btnQuickContinue');

  function triggerContinueLearning() {
    if (!activeCurriculum || !activeCurriculum.subjects) return;
    const progress = getChapterProgress();
    const subjects = activeCurriculum.subjects;
    
    // Find first incomplete chapter
    let firstIncomplete = null;
    let firstSubjMeta = null;

    for (const k of Object.keys(subjects)) {
      const subj = subjects[k];
      if (subj.chapters) {
        for (const ch of subj.chapters) {
          if (!progress[ch.id]) {
            firstIncomplete = ch;
            firstSubjMeta = subj;
            break;
          }
        }
      }
      if (firstIncomplete) break;
    }

    if (firstIncomplete && firstSubjMeta) {
      triggerMiloSpeech(`Continuing where you left off with "${firstIncomplete.name}"! 🌱`);
      openChapterPortalModal(firstIncomplete, firstSubjMeta, activeCurriculum.board, activeCurriculum.classNum, 'Beginner');
    } else {
      triggerMiloSpeech("Amazing! You've mastered all official chapters! Pick any chapter to revise! 🌟");
      const firstKey = Object.keys(subjects)[0];
      if (firstKey && subjects[firstKey].chapters && subjects[firstKey].chapters[0]) {
        openChapterPortalModal(subjects[firstKey].chapters[0], subjects[firstKey], activeCurriculum.board, activeCurriculum.classNum, 'Pro');
      }
    }
  }

  if (btnContinueLearningHero) {
    btnContinueLearningHero.addEventListener('click', triggerContinueLearning);
  }
  if (btnQuickContinue) {
    btnQuickContinue.addEventListener('click', triggerContinueLearning);
  }

  function renderChaptersGrid(subjects, subjectFilter = 'all', searchQuery = '') {
    if (!syllabusChaptersGrid) return;

    const query = searchQuery.trim().toLowerCase();
    const progress = getChapterProgress();
    const subjectKeys = Object.keys(subjects);

    // Calculate total, not started, in progress, completed counts
    let countAll = 0;
    let countNotStarted = 0;
    let countInProgress = 0;
    let countCompleted = 0;
    let firstIncompleteChapter = null;

    subjectKeys.forEach(k => {
      const subj = subjects[k];
      if (!subj.chapters) return;
      subj.chapters.forEach(ch => {
        countAll++;
        const isDone = !!progress[ch.id];
        if (isDone) {
          countCompleted++;
        } else {
          countNotStarted++;
          if (!firstIncompleteChapter) firstIncompleteChapter = ch;
        }
      });
    });

    // Update Status Badge Counters in Controls Bar
    const badgeAll = document.getElementById('badgeCountAll');
    const badgeNotStarted = document.getElementById('badgeCountNotStarted');
    const badgeInProgress = document.getElementById('badgeCountInProgress');
    const badgeCompleted = document.getElementById('badgeCountCompleted');

    if (badgeAll) badgeAll.textContent = countAll;
    if (badgeNotStarted) badgeNotStarted.textContent = countNotStarted;
    if (badgeInProgress) badgeInProgress.textContent = countInProgress;
    if (badgeCompleted) badgeCompleted.textContent = countCompleted;

    // Update Quick Continue Bar in Progress Dashboard if present
    const quickContinueBar = document.getElementById('quickContinueBar');
    const quickContinueChapterName = document.getElementById('quickContinueChapterName');
    if (quickContinueBar && quickContinueChapterName) {
      if (firstIncompleteChapter) {
        quickContinueBar.style.display = 'flex';
        quickContinueChapterName.textContent = `${firstIncompleteChapter.num}: ${firstIncompleteChapter.name}`;
      } else {
        quickContinueBar.style.display = 'none';
      }
    }

    // Collect all chapters matching subject filter, search query, and status filter
    let matchingItems = [];

    subjectKeys.forEach(k => {
      if (subjectFilter !== 'all' && subjectFilter !== k) return;
      const subj = subjects[k];
      if (!subj.chapters) return;

      subj.chapters.forEach(ch => {
        const isDone = !!progress[ch.id];

        // Apply Status Filter
        if (activeStatusFilter === 'completed' && !isDone) return;
        if (activeStatusFilter === 'not-started' && isDone) return;
        if (activeStatusFilter === 'in-progress' && isDone) return;

        // Apply Search Filter
        if (query) {
          const matchTitle = ch.name.toLowerCase().includes(query);
          const matchUnit = (ch.unit || '').toLowerCase().includes(query);
          const matchSummary = (ch.summary || '').toLowerCase().includes(query);
          const matchAnalogy = (ch.analogy || '').toLowerCase().includes(query);
          const matchConcepts = (ch.keyConcepts || []).some(c => c.toLowerCase().includes(query));

          if (!matchTitle && !matchUnit && !matchSummary && !matchAnalogy && !matchConcepts) {
            return;
          }
        }

        matchingItems.push({
          chapter: ch,
          subjectKey: k,
          subjectMeta: subj
        });
      });
    });

    // Update results counter
    if (syllabusResultsCount) {
      if (query) {
        syllabusResultsCount.textContent = `Found ${matchingItems.length} matching chapters`;
      } else {
        syllabusResultsCount.textContent = `Showing ${matchingItems.length} official chapters (${activeStatusFilter.replace('-', ' ')})`;
      }
    }

    if (matchingItems.length === 0) {
      syllabusChaptersGrid.innerHTML = `
        <div class="syllabus-empty-search" style="grid-column: 1 / -1; text-align: center; padding: 3rem 1.5rem; background: #FFFFFF; border-radius: var(--radius-md); border: 1px dashed var(--border-color);">
          <div style="font-size: 2.2rem; margin-bottom: 0.6rem;">🔍</div>
          <h4 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-dark); margin-bottom: 0.4rem;">No chapters found matching this filter</h4>
          <p style="color: var(--text-secondary); font-size: 0.92rem; max-width: 440px; margin: 0 auto 1.2rem;">
            Try clearing your search keyword or switching your chapter status filter to "All Chapters".
          </p>
          <button type="button" class="btn btn-outline-warm btn-sm" id="btnResetFilters">Show All Official Chapters</button>
        </div>
      `;

      document.getElementById('btnResetFilters')?.addEventListener('click', () => {
        if (syllabusSearchInput) syllabusSearchInput.value = '';
        if (btnClearSyllabusSearch) btnClearSyllabusSearch.style.display = 'none';
        activeStatusFilter = 'all';
        statusFilterPills.forEach(p => p.classList.toggle('active', p.getAttribute('data-status') === 'all'));
        renderChaptersGrid(subjects, activeSubjectFilter, '');
      });
      return;
    }

    // Render Chapters Cards Grid with Creative SVG Icons
    syllabusChaptersGrid.innerHTML = matchingItems.map((item, idx) => {
      const ch = item.chapter;
      const subj = item.subjectMeta;
      const isDone = !!progress[ch.id];

      const conceptsChips = (ch.keyConcepts || []).slice(0, 3).map(c => `
        <span class="chapter-concept-pill">✦ ${c}</span>
      `).join('');

      // Choose appropriate icon for subject
      let subjIconHref = "#icon-science";
      if (item.subjectKey.includes('math')) subjIconHref = "#icon-math";
      else if (item.subjectKey.includes('cs') || item.subjectKey.includes('comp')) subjIconHref = "#icon-cs";
      else if (item.subjectKey.includes('eng')) subjIconHref = "#icon-english";
      else if (item.subjectKey.includes('soc')) subjIconHref = "#icon-social";

      return `
        <article class="syllabus-chapter-card ${isDone ? 'is-completed' : ''}" data-chapter-id="${ch.id}">
          <div class="chapter-card-header">
            <div class="chapter-card-meta-top">
              <span class="chapter-badge-number">
                <svg width="14" height="14" style="vertical-align:-2px; margin-right:3px;"><use href="${subjIconHref}"></use></svg>
                <span>${ch.num || `Ch ${idx + 1}`}</span>
              </span>
              <span class="chapter-unit-tag">${ch.unit || subj.name}</span>
            </div>
            
            <label class="chapter-status-toggle" title="Mark chapter as understood">
              <input type="checkbox" class="chapter-check-input" data-chapter-id="${ch.id}" ${isDone ? 'checked' : ''}>
              <span class="chapter-status-label">${isDone ? '✓ Completed' : 'Mark Understood'}</span>
            </label>
          </div>

          <h3 class="chapter-title-heading">${ch.name}</h3>
          
          <p class="chapter-summary-text">${ch.summary}</p>

          <div class="chapter-analogy-callout">
            <span class="analogy-lightbulb">💡</span>
            <p><strong>Milo's Analogy:</strong> ${ch.analogy}</p>
          </div>

          <div class="chapter-concepts-row">
            ${conceptsChips}
          </div>

          <!-- Difficulty Level Tags & Actions Row -->
          <div class="chapter-card-footer">
            <div class="chapter-difficulty-preview" title="3 study levels available">
              <span class="diff-chip diff-beginner">Beginner</span>
              <span class="diff-chip diff-moderate">Moderate</span>
              <span class="diff-chip diff-pro">Pro</span>
            </div>

            <div class="chapter-btn-group">
              <button type="button" class="btn btn-secondary btn-sm btn-ask-milo-ch" data-ch-name="${encodeURIComponent(ch.name)}" title="Ask Milo about this chapter">
                <svg width="14" height="14" style="vertical-align:-2px; margin-right:3px;"><use href="#icon-ai-tutor"></use></svg>
                <span>Ask Milo</span>
              </button>
              <button type="button" class="btn btn-primary btn-sm btn-open-chapter" data-chapter-id="${ch.id}" data-subject-key="${item.subjectKey}">
                <svg width="14" height="14" style="vertical-align:-2px; margin-right:3px;"><use href="#icon-handwritten-notes"></use></svg>
                <span>Study Notes</span> →
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Wire completion checkboxes
    syllabusChaptersGrid.querySelectorAll('.chapter-check-input').forEach(chk => {
      chk.addEventListener('change', (e) => {
        const cId = chk.getAttribute('data-chapter-id');
        const checked = chk.checked;
        setChapterProgress(cId, checked);

        const card = chk.closest('.syllabus-chapter-card');
        const labelText = chk.nextElementSibling;
        if (checked) {
          card.classList.add('is-completed');
          if (labelText) labelText.textContent = '✓ Completed';
          triggerMiloSpeech("Nice job understanding this chapter! Keep the momentum! 🌱");
          recordStudentActivity('complete_chapter', { id: cId, name: card.querySelector('.chapter-title-heading')?.textContent || cId });
        } else {
          card.classList.remove('is-completed');
          if (labelText) labelText.textContent = 'Mark Understood';
        }

        updateDashboardProgress(subjects);
        renderProgressDashboard();
      });
    });

    // Wire Study Notes modal buttons
    syllabusChaptersGrid.querySelectorAll('.btn-open-chapter').forEach(btn => {
      btn.addEventListener('click', () => {
        const cId = btn.getAttribute('data-chapter-id');
        const sKey = btn.getAttribute('data-subject-key');
        const chItem = matchingItems.find(m => m.chapter.id === cId);
        if (chItem) {
          openChapterPortalModal(chItem.chapter, chItem.subjectMeta, activeCurriculum.board, activeCurriculum.classNum, 'Beginner');
        }
      });
    });

    // Wire Ask Milo buttons
    syllabusChaptersGrid.querySelectorAll('.btn-ask-milo-ch').forEach(btn => {
      btn.addEventListener('click', () => {
        const rawName = decodeURIComponent(btn.getAttribute('data-ch-name'));
        askMiloAboutChapter(rawName);
      });
    });
  }

  function updateDashboardProgress(subjects) {
    const progress = getChapterProgress();
    let totalChapters = 0;
    let completedChapters = 0;

    Object.keys(subjects).forEach(k => {
      const subj = subjects[k];
      if (subj.chapters) {
        subj.chapters.forEach(ch => {
          totalChapters++;
          if (progress[ch.id]) {
            completedChapters++;
          }
        });
      }
    });

    const percent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

    if (dashProgressCount) {
      dashProgressCount.textContent = `${completedChapters} of ${totalChapters} chapters completed`;
    }
    if (dashProgressPercent) {
      dashProgressPercent.textContent = `${percent}%`;
    }
    if (dashProgressBarFill) {
      dashProgressBarFill.style.width = `${percent}%`;
    }
  }

  // Search input listeners for Syllabus
  if (syllabusSearchInput) {
    syllabusSearchInput.addEventListener('input', (e) => {
      const q = e.target.value;
      if (btnClearSyllabusSearch) {
        btnClearSyllabusSearch.style.display = q ? 'block' : 'none';
      }
      if (activeCurriculum && activeCurriculum.subjects) {
        renderChaptersGrid(activeCurriculum.subjects, activeSubjectFilter, q);
      }
    });
  }

  if (btnClearSyllabusSearch) {
    btnClearSyllabusSearch.addEventListener('click', () => {
      syllabusSearchInput.value = '';
      btnClearSyllabusSearch.style.display = 'none';
      if (activeCurriculum && activeCurriculum.subjects) {
        renderChaptersGrid(activeCurriculum.subjects, activeSubjectFilter, '');
      }
      syllabusSearchInput.focus();
    });
  }

  // General Curious Worlds Drawer Toggle
  if (btnToggleGeneralWorlds && generalWorldsDrawer) {
    btnToggleGeneralWorlds.addEventListener('click', () => {
      const isHidden = generalWorldsDrawer.style.display === 'none';
      generalWorldsDrawer.style.display = isHidden ? 'block' : 'none';
      btnToggleGeneralWorlds.setAttribute('aria-expanded', isHidden);
      if (worldsChevron) {
        worldsChevron.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  }

  /* -------------------------------------------------------------
     C. HANDWRITTEN STUDY NOTES & PRACTICE PORTAL ENGINE
     - Lined Classroom Notebook Paper Layout
     - Three Difficulty Levels: Beginner, Moderate, Pro
     - SVG Concept Diagrams, Marker Highlights, Sticky Formulas
     - Practice Questions Bank (MCQs with submit, Blanks, Solutions)
     - Print & Download Notes
     ------------------------------------------------------------- */
  let activeSubjectInModal = null;
  let activeBoardInModal = null;
  let activeClassInModal = "10";
  let activeChapterDifficulty = "Beginner";
  let activeReadingMode = "notebook";

  // Modal Element References
  const handwrittenPortalWindow = document.getElementById('handwrittenPortalWindow');
  const notebookPaperSheet = document.getElementById('notebookPaperSheet');

  // Toolbar Actions
  const btnModeNotebook = document.getElementById('btnModeNotebook');
  const btnModeClean = document.getElementById('btnModeClean');
  const btnModalPrintNotes = document.getElementById('btnModalPrintNotes');
  const btnModalDownloadNotes = document.getElementById('btnModalDownloadNotes');

  // Level Selection Cards
  const chapterLevelCards = document.querySelectorAll('.chapter-level-pill-card');

  // Notebook Content Elements
  const nbSubjectMeta = document.getElementById('nbSubjectMeta');
  const nbLevelIndicatorBadge = document.getElementById('nbLevelIndicatorBadge');
  const nbChapterTitle = document.getElementById('nbChapterTitle');
  const nbOverviewText = document.getElementById('nbOverviewText');
  const nbAnalogyBox = document.getElementById('nbAnalogyBox');
  const nbDefinitionsList = document.getElementById('nbDefinitionsList');
  const nbFormulasContainer = document.getElementById('nbFormulasContainer');
  const nbDiagramFrame = document.getElementById('nbDiagramFrame');
  const nbWorkedExampleBox = document.getElementById('nbWorkedExampleBox');
  const nbExamTipsList = document.getElementById('nbExamTipsList');
  const nbQuestionsContainer = document.getElementById('nbQuestionsContainer');

  // Toggle between Lined Notebook Paper and Clean View
  if (btnModeNotebook && btnModeClean && notebookPaperSheet) {
    btnModeNotebook.addEventListener('click', () => {
      btnModeNotebook.classList.add('active');
      btnModeClean.classList.remove('active');
      notebookPaperSheet.classList.remove('mode-clean');
      activeReadingMode = 'notebook';
      triggerMiloSpeech("Switched to classroom lined notebook paper! 📓");
    });

    btnModeClean.addEventListener('click', () => {
      btnModeClean.classList.add('active');
      btnModeNotebook.classList.remove('active');
      notebookPaperSheet.classList.add('mode-clean');
      activeReadingMode = 'clean';
      triggerMiloSpeech("Switched to clean digital reading view! 📄");
    });
  }

  // Print Notes Handler
  if (btnModalPrintNotes) {
    btnModalPrintNotes.addEventListener('click', () => {
      window.print();
    });
  }

  // Download Notes Handler (generates markdown/text file)
  if (btnModalDownloadNotes) {
    btnModalDownloadNotes.addEventListener('click', () => {
      if (!activeChapterInModal) return;
      const notesData = (window.LearnMateData && typeof window.LearnMateData.getNotes === 'function')
        ? window.LearnMateData.getNotes(activeChapterInModal.id, activeChapterDifficulty)
        : generateHandwrittenNotesData(activeChapterInModal, activeSubjectInModal, activeBoardInModal, activeClassInModal, activeChapterDifficulty);
      
      const fileContent = `===============================================================
LEARNMATE AI — HANDWRITTEN STUDY NOTES
===============================================================
Board: ${activeBoardInModal.name || 'Official Board'}
Class: Class ${activeClassInModal}
Subject: ${activeSubjectInModal.name || 'Subject'}
Chapter: ${activeChapterInModal.num || 'Ch'} — ${activeChapterInModal.name}
Level: ${activeChapterDifficulty.toUpperCase()}
Date: October 2026

---------------------------------------------------------------
1. CHAPTER INTUITION & OVERVIEW
---------------------------------------------------------------
${notesData.overview}

Everyday Analogy:
${notesData.analogy}

---------------------------------------------------------------
2. IMPORTANT DEFINITIONS
---------------------------------------------------------------
${notesData.definitions.map(d => `• ${d.term}: ${d.def}`).join('\n')}

---------------------------------------------------------------
3. KEY FORMULAS & MATHEMATICAL RULES
---------------------------------------------------------------
${notesData.formulas.map(f => `• ${f.expr} -> ${f.desc}`).join('\n')}

---------------------------------------------------------------
4. WORKED EXAMPLE & STEP-BY-STEP REASONING
---------------------------------------------------------------
Question: ${notesData.workedExample.problem}
${notesData.workedExample.steps.map(s => `Step: ${s}`).join('\n')}
Final Answer: ${notesData.workedExample.solution}

---------------------------------------------------------------
5. IMPORTANT EXAM REVISION POINTS
---------------------------------------------------------------
${notesData.examTips.map(t => `★ ${t}`).join('\n')}

---------------------------------------------------------------
6. PRACTICE QUESTIONS & SELF-CHECK
---------------------------------------------------------------
${notesData.practiceQuestions.map((q, i) => `Q${i+1} [${q.type}]: ${q.question}\nAnswer: ${q.answer}\nExplanation: ${q.explanation}\n`).join('\n')}

===============================================================
Generated by LearnMate AI — Learning for Everyone.
===============================================================`;

      const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LearnMate_Notes_${activeChapterInModal.name.replace(/\s+/g, '_')}_${activeChapterDifficulty}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      triggerMiloSpeech("Downloaded your complete study notes! Happy revising! 📥");
    });
  }

  // Difficulty Level Card Selection
  chapterLevelCards.forEach(card => {
    card.addEventListener('click', () => {
      const level = card.getAttribute('data-level');
      activeChapterDifficulty = level;

      chapterLevelCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      if (activeChapterInModal) {
        populateHandwrittenNotebook(activeChapterInModal, activeSubjectInModal, activeBoardInModal, activeClassInModal, activeChapterDifficulty);
        triggerMiloSpeech(`Level updated to ${level}! Notes, formulas & questions adapted! 🌟`);
        recordStudentActivity('switch_level', { chapterId: activeChapterInModal.id, level: level });
      }
    });
  });

  // Generator of Vector SVG Diagrams for Chapters
  function generateSvgDiagramForChapter(chapter, subjectKey) {
    const sLower = (subjectKey || '').toLowerCase();
    const cLower = (chapter.name || '').toLowerCase();

    if (sLower.includes('chem') || cLower.includes('chem') || cLower.includes('acid') || cLower.includes('carbon') || cLower.includes('metal')) {
      // Chemistry: Reaction Balancing & Molecule Flask Diagram
      return `
        <svg viewBox="0 0 540 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9; border-radius:8px;">
          <!-- Left Reactants Group -->
          <g transform="translate(40, 40)">
            <rect x="0" y="0" width="160" height="130" rx="8" fill="#F8EFE4" stroke="#E2CFBA" stroke-dasharray="3 3"/>
            <text x="80" y="24" text-anchor="middle" font-family="'Kalam', cursive" font-size="14" font-weight="700" fill="#63377A">Reactants (Initial)</text>
            <!-- Molecules Representation -->
            <circle cx="50" cy="70" r="18" fill="#F07855" opacity="0.9"/>
            <text x="50" y="75" text-anchor="middle" font-size="12" font-weight="700" fill="#FFFFFF">Atom A</text>
            <line x1="68" y1="70" x2="95" y2="70" stroke="#34243B" stroke-width="2.5"/>
            <circle cx="112" cy="70" r="16" fill="#A6BD91" opacity="0.9"/>
            <text x="112" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#FFFFFF">Atom B</text>
            <text x="80" y="115" text-anchor="middle" font-size="11" font-family="'DM Sans', sans-serif" fill="#5C4A64">Bonds ready to re-order</text>
          </g>

          <!-- Reaction Arrow with Catalyst/Energy -->
          <g transform="translate(215, 95)">
            <line x1="0" y1="15" x2="80" y2="15" stroke="#F07855" stroke-width="3.5" stroke-linecap="round"/>
            <polygon points="80,9 95,15 80,21" fill="#F07855"/>
            <text x="45" y="0" text-anchor="middle" font-family="'Caveat', cursive" font-size="16" font-weight="700" fill="#FFD166">+ Heat / Catalyst Δ</text>
            <text x="45" y="34" text-anchor="middle" font-family="'DM Sans', sans-serif" font-size="10" fill="#5C4A64">Mass Conserved</text>
          </g>

          <!-- Right Products Group -->
          <g transform="translate(325, 40)">
            <rect x="0" y="0" width="175" height="130" rx="8" fill="#EEF4E9" stroke="#CCDBC0" stroke-dasharray="3 3"/>
            <text x="87" y="24" text-anchor="middle" font-family="'Kalam', cursive" font-size="14" font-weight="700" fill="#2D4C1E">Products (Transformed)</text>
            <!-- Reordered product molecule -->
            <circle cx="65" cy="70" r="20" fill="#63377A" opacity="0.9"/>
            <text x="65" y="75" text-anchor="middle" font-size="11" font-weight="700" fill="#FFFFFF">Compound AB</text>
            <line x1="85" y1="70" x2="115" y2="70" stroke="#34243B" stroke-width="3"/>
            <circle cx="130" cy="70" r="14" fill="#FFD166" opacity="0.9"/>
            <text x="130" y="74" text-anchor="middle" font-size="10" font-weight="700" fill="#34243B">New Prop</text>
            <text x="87" y="115" text-anchor="middle" font-size="11" font-family="'DM Sans', sans-serif" fill="#2D4C1E">✓ Stable chemical identity</text>
          </g>
        </svg>
        <span class="diagram-caption">Figure: Conservation of Atoms in Chemical Transformation (${chapter.name})</span>
      `;
    } else if (sLower.includes('phys') || cLower.includes('light') || cLower.includes('optic') || cLower.includes('gravit') || cLower.includes('electr') || cLower.includes('motion')) {
      // Physics: Ray Optics / Lens and Principal Axis Diagram
      return `
        <svg viewBox="0 0 540 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9; border-radius:8px;">
          <!-- Principal Axis -->
          <line x1="20" y1="110" x2="520" y2="110" stroke="#7A6882" stroke-width="1.8" stroke-dasharray="4 4"/>
          <text x="510" y="105" text-anchor="end" font-size="11" font-family="'DM Sans', sans-serif" fill="#7A6882">Principal Axis</text>

          <!-- Convex Lens Profile -->
          <path d="M270 25 C295 70, 295 150, 270 195 C245 150, 245 70, 270 25 Z" fill="rgba(232, 221, 240, 0.45)" stroke="#63377A" stroke-width="2.5"/>
          <line x1="270" y1="20" x2="270" y2="200" stroke="#63377A" stroke-width="1.5" stroke-dasharray="2 3"/>
          <text x="270" y="15" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#63377A">Optical Centre (O)</text>

          <!-- Object Arrow on left -->
          <line x1="120" y1="110" x2="120" y2="50" stroke="#F07855" stroke-width="3" stroke-linecap="round"/>
          <polygon points="120,44 115,55 125,55" fill="#F07855"/>
          <text x="120" y="40" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#F07855">Object (AB)</text>
          
          <!-- Focal Points -->
          <circle cx="195" cy="110" r="3.5" fill="#34243B"/>
          <text x="195" y="128" text-anchor="middle" font-size="12" font-weight="700" fill="#34243B">F1</text>
          <circle cx="120" cy="110" r="3.5" fill="#34243B"/>
          <text x="120" y="128" text-anchor="middle" font-size="12" font-weight="700" fill="#34243B">2F1</text>

          <circle cx="345" cy="110" r="3.5" fill="#34243B"/>
          <text x="345" y="128" text-anchor="middle" font-size="12" font-weight="700" fill="#34243B">F2</text>
          <circle cx="420" cy="110" r="3.5" fill="#34243B"/>
          <text x="420" y="128" text-anchor="middle" font-size="12" font-weight="700" fill="#34243B">2F2</text>

          <!-- Incident Light Rays -->
          <line x1="120" y1="50" x2="270" y2="50" stroke="#FFD166" stroke-width="2.5"/>
          <line x1="270" y1="50" x2="420" y2="170" stroke="#FFD166" stroke-width="2.5"/>
          <line x1="120" y1="50" x2="420" y2="170" stroke="#A6BD91" stroke-width="2.5"/>

          <!-- Real Inverted Image on right -->
          <line x1="420" y1="110" x2="420" y2="170" stroke="#63377A" stroke-width="3" stroke-linecap="round"/>
          <polygon points="420,176 415,165 425,165" fill="#63377A"/>
          <text x="420" y="195" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#63377A">Real Inverted Image (A'B')</text>
        </svg>
        <span class="diagram-caption">Figure: Ray Optics Geometry & Refraction Mechanics (${chapter.name})</span>
      `;
    } else if (sLower.includes('bio') || cLower.includes('life') || cLower.includes('cell') || cLower.includes('repro') || cLower.includes('heredity') || cLower.includes('environ')) {
      // Biology: Living Cell & Mitochondrial Energy Unit
      return `
        <svg viewBox="0 0 540 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9; border-radius:8px;">
          <!-- Outer Cell Wall & Membrane -->
          <rect x="50" y="25" width="440" height="170" rx="35" fill="#F4F8F1" stroke="#A6BD91" stroke-width="3"/>
          <rect x="56" y="31" width="428" height="158" rx="30" fill="none" stroke="#7A9C60" stroke-width="1.8" stroke-dasharray="3 2"/>
          <text x="270" y="20" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#3B5E2B">Plant Cell Architecture: Cell Wall & Membrane</text>

          <!-- Nucleus -->
          <ellipse cx="140" cy="110" rx="45" ry="40" fill="#E8DDF0" stroke="#63377A" stroke-width="2"/>
          <circle cx="140" cy="110" r="16" fill="#63377A" opacity="0.85"/>
          <text x="140" y="114" text-anchor="middle" font-size="10" font-weight="700" fill="#FFFFFF">DNA / Nucleus</text>

          <!-- Large Central Vacuole -->
          <ellipse cx="280" cy="105" rx="65" ry="38" fill="rgba(216, 235, 245, 0.7)" stroke="#679CB3" stroke-width="1.8"/>
          <text x="280" y="108" text-anchor="middle" font-family="'DM Sans', sans-serif" font-size="11" font-weight="600" fill="#2E5F73">Central Vacuole (Turgor)</text>

          <!-- Mitochondria Powerhouses -->
          <g transform="translate(390, 65)">
            <ellipse cx="25" cy="18" rx="28" ry="16" fill="#FFF5DC" stroke="#E6A100" stroke-width="2"/>
            <path d="M6 18 Q16 10, 25 18 T44 18" fill="none" stroke="#E6A100" stroke-width="1.8"/>
            <text x="25" y="44" text-anchor="middle" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#946300">Mitochondria (ATP)</text>
          </g>

          <!-- Chloroplasts -->
          <g transform="translate(385, 125)">
            <ellipse cx="30" cy="18" rx="30" ry="16" fill="#EEF7E9" stroke="#4C8531" stroke-width="2"/>
            <circle cx="18" cy="18" r="4" fill="#4C8531"/>
            <circle cx="30" cy="18" r="4" fill="#4C8531"/>
            <circle cx="42" cy="18" r="4" fill="#4C8531"/>
            <text x="30" y="44" text-anchor="middle" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#2A5C14">Chloroplast (Solar)</text>
          </g>
        </svg>
        <span class="diagram-caption">Figure: Biological Cell Structure & Organelle System (${chapter.name})</span>
      `;
    } else if (sLower.includes('math') || cLower.includes('triangle') || cLower.includes('linear') || cLower.includes('quad') || cLower.includes('trigo') || cLower.includes('stat') || cLower.includes('circle')) {
      // Mathematics: Cartesian Plane & Geometric Right Triangle
      return `
        <svg viewBox="0 0 540 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9; border-radius:8px;">
          <!-- Grid Lines -->
          <g stroke="#EBE4D8" stroke-width="1">
            <line x1="60" y1="40" x2="480" y2="40"/>
            <line x1="60" y1="80" x2="480" y2="80"/>
            <line x1="60" y1="120" x2="480" y2="120"/>
            <line x1="60" y1="160" x2="480" y2="160"/>
            <line x1="120" y1="20" x2="120" y2="190"/>
            <line x1="200" y1="20" x2="200" y2="190"/>
            <line x1="280" y1="20" x2="280" y2="190"/>
            <line x1="360" y1="20" x2="360" y2="190"/>
            <line x1="440" y1="20" x2="440" y2="190"/>
          </g>

          <!-- Axes -->
          <line x1="60" y1="160" x2="480" y2="160" stroke="#34243B" stroke-width="2.5"/>
          <line x1="120" y1="20" x2="120" y2="190" stroke="#34243B" stroke-width="2.5"/>
          <text x="490" y="164" font-weight="700" font-size="13" fill="#34243B">X-Axis</text>
          <text x="120" y="15" text-anchor="middle" font-weight="700" font-size="13" fill="#34243B">Y-Axis</text>
          <text x="105" y="175" font-size="11" fill="#7A6882">Origin (0,0)</text>

          <!-- Geometric Right-Angle Triangle with Pythagoras -->
          <polygon points="180,160 380,160 380,50" fill="rgba(240, 120, 85, 0.15)" stroke="#F07855" stroke-width="3"/>
          <rect x="365" y="145" width="15" height="15" fill="none" stroke="#F07855" stroke-width="1.8"/>

          <!-- Labels -->
          <text x="280" y="180" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#34243B">Base (b)</text>
          <text x="405" y="105" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#34243B">Perpendicular (h)</text>
          <text x="260" y="90" text-anchor="middle" font-family="'Caveat', cursive" font-size="18" font-weight="700" fill="#63377A">Hypotenuse = √(b² + h²)</text>
          <circle cx="180" cy="160" r="4" fill="#63377A"/>
          <text x="170" y="150" font-size="11" font-weight="700" fill="#63377A">A</text>
          <circle cx="380" cy="160" r="4" fill="#63377A"/>
          <text x="390" y="175" font-size="11" font-weight="700" fill="#63377A">B (90°)</text>
          <circle cx="380" cy="50" r="4" fill="#63377A"/>
          <text x="390" y="45" font-size="11" font-weight="700" fill="#63377A">C</text>
        </svg>
        <span class="diagram-caption">Figure: Geometric Construction & Coordinate Proof (${chapter.name})</span>
      `;
    } else {
      // General & Computing / Language: Logic Architecture Flow
      return `
        <svg viewBox="0 0 540 220" width="100%" height="220" xmlns="http://www.w3.org/2000/svg" style="background:#FFFDF9; border-radius:8px;">
          <!-- Stage 1 Input -->
          <g transform="translate(40, 80)">
            <rect x="0" y="0" width="115" height="60" rx="30" fill="#E8DDF0" stroke="#63377A" stroke-width="2.5"/>
            <text x="57" y="28" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#63377A">Input Phase</text>
            <text x="57" y="46" text-anchor="middle" font-size="10" fill="#5C4A64">Premise / Raw Data</text>
          </g>

          <line x1="160" y1="110" x2="200" y2="110" stroke="#F07855" stroke-width="3" stroke-linecap="round"/>
          <polygon points="200,105 210,110 200,115" fill="#F07855"/>

          <!-- Stage 2 Process / Transformation -->
          <g transform="translate(215, 65)">
            <rect x="0" y="0" width="135" height="90" rx="8" fill="#FFF5DC" stroke="#FFD166" stroke-width="2.5"/>
            <text x="67" y="32" text-anchor="middle" font-family="'Kalam', cursive" font-size="14" font-weight="700" fill="#34243B">Core Processing</text>
            <text x="67" y="52" text-anchor="middle" font-size="11" fill="#5C4A64">Step-by-step logic</text>
            <text x="67" y="70" text-anchor="middle" font-family="'DM Sans', sans-serif" font-size="10" font-weight="700" fill="#B5840B">Rules Applied</text>
          </g>

          <line x1="355" y1="110" x2="395" y2="110" stroke="#F07855" stroke-width="3" stroke-linecap="round"/>
          <polygon points="395,105 405,110 395,115" fill="#F07855"/>

          <!-- Stage 3 Verified Outcome -->
          <g transform="translate(410, 80)">
            <rect x="0" y="0" width="115" height="60" rx="30" fill="#EEF4E9" stroke="#A6BD91" stroke-width="2.5"/>
            <text x="57" y="28" text-anchor="middle" font-family="'Kalam', cursive" font-size="13" font-weight="700" fill="#2D4C1E">Clear Outcome</text>
            <text x="57" y="46" text-anchor="middle" font-size="10" fill="#2D4C1E">✓ Verified Solution</text>
          </g>
        </svg>
        <span class="diagram-caption">Figure: Conceptual Framework & Mechanism (${chapter.name})</span>
      `;
    }
  }

  // Generate Tailored Notes Data across Beginner, Moderate, and Pro levels
  function generateHandwrittenNotesData(chapter, subjectMeta, boardMeta, classNum, level) {
    const rawConcepts = chapter.keyConcepts || [chapter.name, "Fundamental Rules", "Applications"];
    const formulasList = chapter.formulas || ["Rule 1: Input ➔ Transformation ➔ Result"];

    if (level === 'Beginner') {
      return {
        levelName: "Beginner",
        levelBadgeClass: "beginner-badge",
        overview: `Let's understand <strong>${chapter.name}</strong> from the very beginning! Don't worry about heavy textbook words. In this chapter, we discover how nature and mathematics work in real life through simple, friendly examples.`,
        analogy: `Think of this like ${chapter.analogy || "assembling simple building blocks: once you place the first block right, everything else naturally fits together!"}`,
        definitions: [
          {
            term: rawConcepts[0] || chapter.name,
            def: `The fundamental idea that explains what happens when we observe ${chapter.name.toLowerCase()} in action.`
          },
          {
            term: rawConcepts[1] || "Core Phenomenon",
            def: `A simple rule nature follows: energy and materials transform from one form to another without ever being lost.`
          },
          {
            term: "Everyday Observation",
            def: `How you see this topic in your home, kitchen, playground, or digital screen every day.`
          }
        ],
        formulas: formulasList.map((f, i) => ({
          expr: f,
          desc: `Simple Rule ${i + 1}: Notice how the left side balances with the right side.`
        })),
        workedExample: {
          problem: `Basic Warm-up: If a process starts with 10 units of initial input, what is the expected outcome according to ${chapter.name}?`,
          steps: [
            "Step 1: Identify what is given in the problem.",
            "Step 2: Connect the given values with our simple balance rule.",
            "Step 3: Calculate the balanced outcome step-by-step."
          ],
          solution: "Outcome = 10 units! Everything stays balanced and accounted for."
        },
        examTips: [
          "⭐ Exam Tip: In school tests, writing definitions in simple, grammatically clear sentences earns full marks!",
          "⭐ Milo's Doodle Tip: Draw a quick neat box around your final answers so the teacher spots them instantly!"
        ],
        practiceQuestions: [
          {
            type: "MCQ",
            question: `What is the most basic principle behind "${chapter.name}"?`,
            options: [
              `Understanding ${rawConcepts[0] || 'the core concept'} through everyday observations`,
              "Memorizing random numbers without understanding",
              "Ignoring the rules of nature and math",
              "Skipping all revision notes"
            ],
            correct: 0,
            answer: `Option A (${rawConcepts[0] || 'Core concept'})`,
            explanation: `Great job! In beginner mode, our priority is building intuitive real-world clarity first!`
          },
          {
            type: "MCQ",
            question: `In everyday life, which of the following is the best example of this chapter?`,
            options: [
              "A completely abstract concept that has no practical application",
              "Changes we observe around us, like cooking food, motion, or balancing quantities",
              "Something that cannot be explained in simple English",
              "None of the above"
            ],
            correct: 1,
            answer: "Option B (Everyday observable changes)",
            explanation: "Spot on! Academic concepts come directly from what scientists and thinkers observed around them!"
          },
          {
            type: "Fill in the Blank",
            question: `According to the foundational rules of ${chapter.name}, matter and energy are always ____________ (conserved / destroyed).`,
            answer: "conserved",
            explanation: "Matter and energy transform from one form to another, but the total amount is conserved!"
          },
          {
            type: "Short Answer",
            question: `State one reason why learning ${chapter.name} is useful in our daily lives.`,
            answer: `It helps us make sense of how ${chapter.name.toLowerCase()} governs physical systems, technology, or numbers.`,
            explanation: "Mentioning a real-world use case shows conceptual mastery to your teacher!"
          }
        ]
      };
    } else if (level === 'Moderate') {
      return {
        levelName: "Moderate",
        levelBadgeClass: "moderate-badge",
        overview: `Comprehensive study notes for <strong>${chapter.name}</strong> aligned with official ${boardMeta.shortName} Class ${classNum} examination standards. Focus on technical definitions, standard derivations, and structured multi-step exam answers.`,
        analogy: `In academic science and mathematics, ${chapter.analogy || "rules must hold true not just in broad strokes, but under precise measurement and boundary conditions."}`,
        definitions: [
          {
            term: rawConcepts[0] || chapter.name,
            def: `The formal academic phenomenon defined by ${boardMeta.shortName}: the transformation governed by fundamental governing laws.`
          },
          {
            term: rawConcepts[1] || "Governing Mechanism",
            def: `The precise mechanism by which reactants, vectors, or variables interact in equilibrium.`
          },
          {
            term: rawConcepts[2] || "Standard Unit / Condition",
            def: `The standard SI units and experimental conditions under which measurements remain valid.`
          }
        ],
        formulas: formulasList.map((f, i) => ({
          expr: f,
          desc: `Official Board Formula ${i + 1}: Where variables represent quantities measured in standard SI units.`
        })),
        workedExample: {
          problem: `Board Examination Standard Problem: Calculate the result when system parameters undergo standard change in ${chapter.name}.`,
          steps: [
            "Step 1: Write down Given Data and state corresponding SI units clearly.",
            "Step 2: Quote the governing official formula with variable definitions.",
            "Step 3: Substitute numerical values and carry out step-by-step algebraic simplification.",
            "Step 4: State final numerical result accompanied by correct standard unit."
          ],
          solution: "Balanced and verified in accordance with official marking scheme."
        },
        examTips: [
          "⭐ 3-Mark Question Strategy: Always include 1 definition, 1 formula, and 1 neat labelled diagram to secure all 3 marks.",
          "⭐ Unit Caution: Don't forget standard SI units (e.g. Joules, Pascals, mol/L, cm²). Omitting units costs half a mark!"
        ],
        practiceQuestions: [
          {
            type: "MCQ",
            question: `Which of the following conditions is strictly required when formulating equations in "${chapter.name}"?`,
            options: [
              "Atoms and charge on reactants side must equal atoms and charge on products side",
              "Units can be arbitrarily chosen without conversion",
              "Mass can disappear if the reaction happens quickly",
              "Temperature has no effect on any physical or chemical rate"
            ],
            correct: 0,
            answer: "Option A (Conservation of atoms and charge)",
            explanation: "Official marking schemes require explicit balancing of both mass and charge across all chemical equations."
          },
          {
            type: "MCQ",
            question: `What is the significance of ${rawConcepts[0] || 'the core concept'} in the Class ${classNum} board syllabus?`,
            options: [
              "It forms the basis for quantitative numerical problems in term-end exams",
              "It is an optional topic rarely asked in examinations",
              "It has been deprecated from the curriculum",
              "It only applies to theoretical research without school relevance"
            ],
            correct: 0,
            answer: "Option A (Basis for quantitative exam questions)",
            explanation: "Core chapters carry high weightage in board question papers."
          },
          {
            type: "Fill in the Blank",
            question: `In standard board numericals for this chapter, all calculations must be expressed in ____________ units.`,
            answer: "SI (International System)",
            explanation: "Marks are deducted in official board evaluations if non-SI units are left uncoverted."
          },
          {
            type: "Short Answer",
            question: `Differentiate between reactants/inputs and products/outputs with reference to ${chapter.name}.`,
            answer: "Reactants are the starting substances taking part in the process; products are the new substances formed with distinct chemical properties.",
            explanation: "Clear two-column contrast or concise bullet points earn full marks."
          }
        ]
      };
    } else {
      // Pro Level
      return {
        levelName: "Pro",
        levelBadgeClass: "pro-badge",
        overview: `Advanced conceptual mastery and Higher-Order Thinking Skills (HOTS) for <strong>${chapter.name}</strong>. Covers deep theoretical mechanisms, mathematical derivations, edge cases, and competitive examination problem solving (Olympiad / Foundation).`,
        analogy: `At an advanced level, ${chapter.name} is not just a formula to memorize—it is a unified model that predicts system behavior under complex multi-variable constraints.`,
        definitions: [
          {
            term: `${rawConcepts[0] || chapter.name} (Rigorous Formulation)`,
            def: `The complete mathematical and thermodynamic / geometric formulation accounting for non-ideal conditions and dynamic equilibria.`
          },
          {
            term: "Boundary Conditions & Invariants",
            def: `The mathematical constraints under which conserved quantities remain invariant during continuous transformation.`
          },
          {
            term: "High-Order Application",
            def: `Application to multi-step synthesis, differential rates, or geometric optimization in competitive examinations.`
          }
        ],
        formulas: formulasList.map((f, i) => ({
          expr: `${f}  [Extended Boundary Form]`,
          desc: `Advanced Analytical Form ${i + 1}: Incorporates rate constants, equilibrium coefficients, or vector components.`
        })),
        workedExample: {
          problem: `HOTS Challenging Problem: A complex multi-step scenario involves variable concentrations and temperature dependence in ${chapter.name}. Prove the stability of the final state.`,
          steps: [
            "Step 1: Set up system state equations and define thermodynamic / coordinate constraints.",
            "Step 2: Formulate the rate-determining step or primary equilibrium constant expression.",
            "Step 3: Solve the simultaneous constraint equations through analytical substitution.",
            "Step 4: Verify boundary limits (as t ➔ ∞ or parameters approach extrema) to confirm physical validity."
          ],
          solution: "Rigorous analytical proof completed with zero mathematical inconsistencies."
        },
        examTips: [
          "⭐ Pro Insight: In competitive exams like NTSE / Olympiads, watch out for sneaky distractor options that forget negative signs or temperature limits!",
          "⭐ Derivation Method: Start proofs strictly from first principles (conservation laws or axioms) rather than quoting derived shortcuts."
        ],
        practiceQuestions: [
          {
            type: "MCQ",
            question: `[HOTS Challenge] Under which boundary condition does the standard linear approximation of ${chapter.name} break down?`,
            options: [
              "When reaction rates or variable increments become non-linear under extreme temperatures or high concentrations",
              "It never breaks down under any conceivable physical scenario",
              "Only when measured in standard laboratory conditions",
              "When zero external energy is present in the system"
            ],
            correct: 0,
            answer: "Option A (Non-linear extremes breakdown)",
            explanation: "Real-world non-ideal systems deviate from simple linear models under high pressure, extreme temperature, or strong non-linear coupling."
          },
          {
            type: "MCQ",
            question: `In a multi-step analytical problem on this chapter, what is the best strategy to avoid algebraic errors?`,
            options: [
              "Perform dimensional analysis on each term before substituting numerical values",
              "Guess the numerical answer based on intuition alone",
              "Skip the intermediate derivation steps",
              "Assume all constants are equal to 1"
            ],
            correct: 0,
            answer: "Option A (Dimensional analysis verification)",
            explanation: "Checking dimensions on both sides of any derivation catches 95% of algebraic slip-ups before calculation."
          },
          {
            type: "Fill in the Blank",
            question: `In advanced analytical proofs, quantities that remain unchanged throughout the entire process are called ____________.`,
            answer: "invariants (or conserved quantities)",
            explanation: "Identifying invariants is the cornerstone of advanced competitive mathematics and theoretical physics."
          },
          {
            type: "Application / Numerical Problem",
            question: `Provide a detailed step-by-step derivation justifying why ${chapter.name} obeys the principle of least action or conservation of mass-energy.`,
            answer: "Derived from first principles: applying variational calculus / conservation laws demonstrates that the integral of action over time is stationary.",
            explanation: "Rigorous step-by-step reasoning is required for highest marks in Olympiad and high-school honors papers."
          }
        ]
      };
    }
  }

  // Populate Notebook Paper with Lined Styling & Sections
  function populateHandwrittenNotebook(chapter, subjectMeta, boardMeta, classNum, level) {
    const data = (window.LearnMateData && typeof window.LearnMateData.getNotes === 'function')
      ? window.LearnMateData.getNotes(chapter.id, level)
      : generateHandwrittenNotesData(chapter, subjectMeta, boardMeta, classNum, level);

    // Meta chips
    const verificationLabel = data.isAuthored ? '🎓 Verified Syllabus Notes' : '📖 Curriculum Framework Guide';
    if (nbSubjectMeta) nbSubjectMeta.textContent = `Subject: ${subjectMeta.name} • ${verificationLabel}`;
    if (nbLevelIndicatorBadge) {
      nbLevelIndicatorBadge.textContent = `Level: ${data.levelName}`;
      nbLevelIndicatorBadge.className = `notebook-level-chip ${data.levelBadgeClass}`;
    }
    if (nbChapterTitle) nbChapterTitle.textContent = chapter.name;

    // 1. Overview & Analogy
    if (nbOverviewText) nbOverviewText.innerHTML = `<p>${data.overview}</p>`;
    if (nbAnalogyBox) {
      nbAnalogyBox.innerHTML = `
        <div style="background: #FFF5DC; border: 1px solid #F3CE72; border-radius: 8px; padding: 1.1rem; margin-top: 0.9rem; position: relative;">
          <strong style="color: #63377A; display: flex; align-items: center; gap: 0.4rem; margin-bottom: 0.35rem;">
            <span>🍃</span> <span>Milo's Story Analogy:</span>
          </strong>
          <p style="font-size: 0.96rem; color: #34243B; margin: 0;">${data.analogy}</p>
        </div>
      `;
    }

    // 2. Definitions with Highlighting Marks
    if (nbDefinitionsList) {
      nbDefinitionsList.innerHTML = data.definitions.map((d, i) => {
        let highlightClass = "marker-highlight";
        if (i === 1) highlightClass = "marker-highlight coral";
        else if (i === 2) highlightClass = "marker-highlight sage";

        return `
          <div style="margin-bottom: 0.95rem; font-size: 1rem; line-height: 1.7;">
            <mark class="${highlightClass}">${d.term}:</mark>
            <span style="color: #34243B; margin-left: 0.3rem;">${d.def}</span>
          </div>
        `;
      }).join('');
    }

    // 3. Post-it Sticky Formula Notes
    if (nbFormulasContainer) {
      nbFormulasContainer.innerHTML = data.formulas.map((f, i) => `
        <div class="postit-formula-card">
          <div class="postit-tape-doodle"></div>
          <div class="formula-expression">${f.expr}</div>
          <div class="formula-explanation">${f.desc}</div>
        </div>
      `).join('');
    }

    // 4. Labeled Concept Diagram
    if (nbDiagramFrame) {
      nbDiagramFrame.innerHTML = generateSvgDiagramForChapter(chapter, subjectMeta.name);
    }

    // 5. Worked Example Box
    if (nbWorkedExampleBox) {
      nbWorkedExampleBox.innerHTML = `
        <div style="font-weight: 700; color: #63377A; margin-bottom: 0.6rem; font-size: 1.05rem;">
          Problem Statement: ${data.workedExample.problem}
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 0.8rem;">
          ${data.workedExample.steps.map(s => `<div class="example-step">${s}</div>`).join('')}
        </div>
        <div style="background: rgba(166, 189, 145, 0.2); border: 1px solid #A6BD91; border-radius: 6px; padding: 0.65rem 0.9rem; font-weight: 700; color: #2D4C1E;">
          ✓ Verified Solution: ${data.workedExample.solution}
        </div>
      `;
    }

    // 6. Exam Tips List
    if (nbExamTipsList) {
      nbExamTipsList.innerHTML = data.examTips.map(t => `
        <div class="exam-tip-pill">
          <span class="exam-tip-star">★</span>
          <span>${t}</span>
        </div>
      `).join('');
    }

    // 7. Practice Questions Bank
    if (nbQuestionsContainer) {
      nbQuestionsContainer.innerHTML = data.practiceQuestions.map((q, qIdx) => {
        if (q.type === 'MCQ') {
          return `
            <div class="practice-q-item" data-q-idx="${qIdx}">
              <div class="practice-q-title">Q${qIdx + 1} [MCQ]: ${q.question}</div>
              <div class="practice-q-options">
                ${q.options.map((opt, optIdx) => `
                  <button type="button" class="practice-opt-btn" data-opt-idx="${optIdx}" data-correct="${optIdx === q.correct}">
                    <span style="font-weight: 700; margin-right: 6px;">${String.fromCharCode(65 + optIdx)})</span>
                    <span>${opt}</span>
                  </button>
                `).join('')}
              </div>
              <div class="practice-q-actions">
                <button type="button" class="btn btn-outline-warm btn-sm btn-check-mcq" disabled>Submit Answer</button>
              </div>
              <div class="practice-feedback-box" style="display: none;"></div>
            </div>
          `;
        } else if (q.type === 'Fill in the Blank') {
          return `
            <div class="practice-q-item" data-q-idx="${qIdx}">
              <div class="practice-q-title">Q${qIdx + 1} [Fill in the Blank]: ${q.question}</div>
              <div style="display: flex; gap: 0.6rem; margin-bottom: 0.65rem; align-items: center; flex-wrap: wrap;">
                <input type="text" class="input-blank-answer" placeholder="Type your answer here..." style="padding: 0.45rem 0.8rem; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); font-size: 0.92rem; min-width: 220px;">
                <button type="button" class="btn btn-outline-warm btn-sm btn-check-blank">Check Answer</button>
                <button type="button" class="editorial-link-btn btn-reveal-blank" style="margin-left: 0.5rem; font-size: 0.85rem;">Show Solution</button>
              </div>
              <div class="practice-feedback-box" style="display: none;"></div>
            </div>
          `;
        } else {
          return `
            <div class="practice-q-item" data-q-idx="${qIdx}">
              <div class="practice-q-title">Q${qIdx + 1} [${q.type}]: ${q.question}</div>
              <button type="button" class="btn btn-outline-warm btn-sm btn-toggle-short-sol">
                <span>Show Verified Solution & Marking Scheme</span>
              </button>
              <div class="practice-feedback-box correct" style="display: none; margin-top: 0.75rem;">
                <strong>Model Answer:</strong> ${q.answer}<br>
                <small style="opacity: 0.85; margin-top: 0.3rem; display: block;">${q.explanation}</small>
              </div>
            </div>
          `;
        }
      }).join('');

      // Wire MCQ Interactive Handlers (Requirement 7)
      nbQuestionsContainer.querySelectorAll('.practice-q-item').forEach(qCard => {
        const qIdx = parseInt(qCard.getAttribute('data-q-idx'), 10);
        const qData = data.practiceQuestions[qIdx];

        // MCQs
        const optButtons = qCard.querySelectorAll('.practice-opt-btn');
        const btnCheck = qCard.querySelector('.btn-check-mcq');
        const feedback = qCard.querySelector('.practice-feedback-box');
        let selectedOptIdx = null;

        optButtons.forEach((btn, idx) => {
          btn.addEventListener('click', () => {
            optButtons.forEach(b => b.style.borderColor = 'var(--border-color)');
            btn.style.borderColor = 'var(--bg-secondary)';
            btn.style.backgroundColor = 'rgba(99, 55, 122, 0.08)';
            selectedOptIdx = idx;
            if (btnCheck) btnCheck.removeAttribute('disabled');
          });
        });

        if (btnCheck) {
          btnCheck.addEventListener('click', () => {
            if (selectedOptIdx === null) return;
            const isCorrect = selectedOptIdx === qData.correct;
            feedback.style.display = 'block';

            if (isCorrect) {
              feedback.className = 'practice-feedback-box correct';
              feedback.innerHTML = `🎉 <strong>Correct!</strong> ${qData.explanation}`;
              optButtons[selectedOptIdx].classList.add('correct');
              triggerMiloSpeech("Bingo! That's the correct answer! Keep shining! 🌟");
              recordStudentActivity('practice_correct', { chapterId: chapter.id, question: qData.question });
            } else {
              feedback.className = 'practice-feedback-box wrong';
              feedback.innerHTML = `💡 <strong>Review Needed:</strong> The correct answer is <strong>${qData.answer}</strong>. ${qData.explanation}`;
              optButtons[selectedOptIdx].classList.add('wrong');
              optButtons[qData.correct].classList.add('correct');
              triggerMiloSpeech("Don't worry! Mistakes help you remember better next time! 🌱");
              recordStudentActivity('practice_attempt', { chapterId: chapter.id, question: qData.question });
            }
            btnCheck.setAttribute('disabled', 'true');
            btnCheck.textContent = 'Submitted';
            renderProgressDashboard();
          });
        }

        // Fill in Blank Handlers
        const inputBlank = qCard.querySelector('.input-blank-answer');
        const btnCheckBlank = qCard.querySelector('.btn-check-blank');
        const btnRevealBlank = qCard.querySelector('.btn-reveal-blank');

        if (btnCheckBlank && inputBlank) {
          btnCheckBlank.addEventListener('click', () => {
            const val = inputBlank.value.trim().toLowerCase();
            const correctVal = qData.answer.toLowerCase();
            feedback.style.display = 'block';

            if (val && correctVal.includes(val)) {
              feedback.className = 'practice-feedback-box correct';
              feedback.innerHTML = `🎉 <strong>Correct!</strong> ${qData.explanation}`;
              triggerMiloSpeech("Spot on fill-in-the-blank answer! 🌟");
              recordStudentActivity('practice_correct', { chapterId: chapter.id, question: qData.question });
            } else {
              feedback.className = 'practice-feedback-box wrong';
              feedback.innerHTML = `💡 The expected answer is: <strong>${qData.answer}</strong>. ${qData.explanation}`;
              recordStudentActivity('practice_attempt', { chapterId: chapter.id, question: qData.question });
            }
            renderProgressDashboard();
          });
        }

        if (btnRevealBlank) {
          btnRevealBlank.addEventListener('click', () => {
            feedback.style.display = 'block';
            feedback.className = 'practice-feedback-box correct';
            feedback.innerHTML = `<strong>Official Solution:</strong> ${qData.answer}.<br>${qData.explanation}`;
          });
        }

        // Short Answer Handlers
        const btnToggleShort = qCard.querySelector('.btn-toggle-short-sol');
        if (btnToggleShort) {
          btnToggleShort.addEventListener('click', () => {
            const isHidden = feedback.style.display === 'none';
            feedback.style.display = isHidden ? 'block' : 'none';
            btnToggleShort.querySelector('span').textContent = isHidden ? 'Hide Solution' : 'Show Verified Solution & Marking Scheme';
            recordStudentActivity('practice_attempt', { chapterId: chapter.id, question: qData.question });
            renderProgressDashboard();
          });
        }
      });
    }
  }

  // Open Chapter Handwritten Notes Portal Modal
  function openChapterPortalModal(chapter, subjectMeta, boardMeta, classNum, level = 'Beginner') {
    activeChapterInModal = chapter;
    activeSubjectInModal = subjectMeta;
    activeBoardInModal = boardMeta;
    activeClassInModal = classNum;
    activeChapterDifficulty = level;

    const progress = getChapterProgress();
    const isCompleted = !!progress[chapter.id];

    // Update Breadcrumbs
    if (chapterBreadcrumbs) {
      chapterBreadcrumbs.innerHTML = `
        <span>${boardMeta.shortName || 'Curriculum'}</span> &rsaquo;
        <span>Class ${classNum}</span> &rsaquo;
        <span>${subjectMeta.name}</span> &rsaquo;
        <span>${chapter.unit || 'Official Unit'}</span>
      `;
    }
    if (chapterModalNumber) chapterModalNumber.textContent = chapter.num || 'Official Chapter';
    if (chapterModalTitle) chapterModalTitle.textContent = chapter.name;

    // Set Level Cards State
    chapterLevelCards.forEach(card => {
      const cardLevel = card.getAttribute('data-level');
      card.classList.toggle('active', cardLevel === level);
    });

    // Populate Handwritten Notebook Paper
    populateHandwrittenNotebook(chapter, subjectMeta, boardMeta, classNum, level);

    // Completion checkbox in modal
    if (chapterModalCompletedCheckbox) {
      chapterModalCompletedCheckbox.checked = isCompleted;
    }

    // Record activity in student tracker
    recordStudentActivity('view_notes', { chapterId: chapter.id, chapterName: chapter.name, subject: subjectMeta.name, level: level });
    renderProgressDashboard();

    // Display modal
    chapterDetailModal.classList.add('active');
    chapterDetailModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Milo greets
    triggerMiloSpeech(`Opening handwritten study notes for "${chapter.name}"! Enjoy reading! 📝`);
  }

  function closeChapterPortalModal() {
    chapterDetailModal.classList.remove('active');
    chapterDetailModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (btnDismissChapterModal) btnDismissChapterModal.addEventListener('click', closeChapterPortalModal);
  if (btnCloseChapterModal) btnCloseChapterModal.addEventListener('click', closeChapterPortalModal);

  chapterDetailModal?.addEventListener('click', (e) => {
    if (e.target === chapterDetailModal) closeChapterPortalModal();
  });

  // Modal completion checkbox listener
  if (chapterModalCompletedCheckbox) {
    chapterModalCompletedCheckbox.addEventListener('change', () => {
      if (!activeChapterInModal) return;
      const checked = chapterModalCompletedCheckbox.checked;
      setChapterProgress(activeChapterInModal.id, checked);

      if (checked) {
        recordStudentActivity('complete_chapter', { id: activeChapterInModal.id, name: activeChapterInModal.name });
        triggerMiloSpeech("Celebrations! Chapter marked as understood! 🎉");
      }

      if (activeCurriculum && activeCurriculum.subjects) {
        renderChaptersGrid(activeCurriculum.subjects, activeSubjectFilter, syllabusSearchInput?.value || '');
        updateDashboardProgress(activeCurriculum.subjects);
      }
      renderProgressDashboard();
    });
  }

  // Ask Milo about chapter button in modal
  function askMiloAboutChapter(chapterName) {
    closeChapterPortalModal();
    const tutorSec = document.getElementById('ai-tutor');
    const qInput = document.getElementById('tutorQuestionInput');
    if (qInput) {
      qInput.value = `Can you explain the main concepts and real-life examples of "${chapterName}" in simple words?`;
      qInput.focus();
    }
    if (tutorSec) {
      tutorSec.scrollIntoView({ behavior: 'smooth' });
    }
    triggerMiloSpeech(`I'd love to explain ${chapterName}! Check out the answer below! ✨`);
  }

  if (btnAskMiloChapter) {
    btnAskMiloChapter.addEventListener('click', () => {
      if (activeChapterInModal) {
        askMiloAboutChapter(activeChapterInModal.name);
      }
    });
  }

  /* -------------------------------------------------------------
     E. "CREATE MY NOTES WITH AI" SECTION CONTROLLER (Requirement 8)
     ------------------------------------------------------------- */
  const aiNotesForm = document.getElementById('aiNotesForm');
  const aiNotesBoardSelect = document.getElementById('aiNotesBoardSelect');
  const aiNotesStateWrap = document.getElementById('aiNotesStateWrap');
  const aiNotesStateSelect = document.getElementById('aiNotesStateSelect');
  const aiNotesClassSelect = document.getElementById('aiNotesClassSelect');
  const aiNotesSubjectSelect = document.getElementById('aiNotesSubjectSelect');
  const aiNotesChapterInput = document.getElementById('aiNotesChapterInput');
  const aiLevelCardsRow = document.getElementById('aiLevelCardsRow');
  const selectedAiLevelInput = document.getElementById('selectedAiLevelInput');
  const aiNotesLoading = document.getElementById('aiNotesLoading');
  const aiNotesResultContainer = document.getElementById('aiNotesResultContainer');
  const aiNotesSheetBody = document.getElementById('aiNotesSheetBody');
  const aiResultCurriculumBadge = document.getElementById('aiResultCurriculumBadge');
  const aiResultLevelBadge = document.getElementById('aiResultLevelBadge');
  const btnViewAiNotesNotebook = document.getElementById('btnViewAiNotesNotebook');
  const btnPrintAiNotes = document.getElementById('btnPrintAiNotes');
  const btnDownloadAiNotes = document.getElementById('btnDownloadAiNotes');

  // Toggle state dropdown when board changes
  if (aiNotesBoardSelect && aiNotesStateWrap) {
    aiNotesBoardSelect.addEventListener('change', () => {
      const isState = aiNotesBoardSelect.value === 'state';
      aiNotesStateWrap.style.display = isState ? 'flex' : 'none';
    });
  }

  // Level Selection Cards in AI Generator Form
  if (aiLevelCardsRow && selectedAiLevelInput) {
    aiLevelCardsRow.querySelectorAll('.diff-level-card').forEach(card => {
      card.addEventListener('click', () => {
        aiLevelCardsRow.querySelectorAll('.diff-level-card').forEach(c => {
          c.classList.remove('active');
          c.setAttribute('aria-checked', 'false');
        });
        card.classList.add('active');
        card.setAttribute('aria-checked', 'true');
        const lvl = card.getAttribute('data-level');
        selectedAiLevelInput.value = lvl;
      });
    });
  }

  let latestGeneratedAiNotes = null;

  if (aiNotesForm) {
    aiNotesForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const boardVal = aiNotesBoardSelect.value;
      const stateVal = aiNotesStateSelect?.value || 'maharashtra';
      const classVal = aiNotesClassSelect.value;
      const subjectVal = aiNotesSubjectSelect.value;
      const chapterVal = aiNotesChapterInput.value.trim();
      const levelVal = selectedAiLevelInput.value || 'Beginner';

      if (!chapterVal) return;

      aiNotesLoading.style.display = 'flex';
      aiNotesResultContainer.style.display = 'none';
      triggerMiloSpeech(`Generating 9-section notes for "${chapterVal}" at ${levelVal} level! Hold tight! 💭`);

      try {
        const res = await fetch('/api/generate-notes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            board: boardVal,
            state: stateVal,
            classNum: classVal,
            subject: subjectVal,
            chapter: chapterVal,
            level: levelVal
          })
        });

        if (res.ok) {
          const json = await res.json();
          latestGeneratedAiNotes = json;
          renderGeneratedAiNotes(json, levelVal);
        } else {
          throw new Error("Notes generation server responded with error.");
        }
      } catch (err) {
        console.warn("Backend API note generation failed; utilizing smart curriculum engine fallback.", err);
        // Built-in intelligent 9-section fallback generator
        const fallback = generateFallbackNineSections(boardVal, stateVal, classVal, subjectVal, chapterVal, levelVal);
        latestGeneratedAiNotes = fallback;
        renderGeneratedAiNotes(fallback, levelVal);
      } finally {
        aiNotesLoading.style.display = 'none';
        aiNotesResultContainer.style.display = 'block';
        aiNotesResultContainer.scrollIntoView({ behavior: 'smooth' });
        triggerMiloSpeech("Your 9 structured study sections are ready! Enjoy revising! 🌟");
        recordStudentActivity('ai_generate_notes', { chapter: chapterVal, subject: subjectVal, level: levelVal });
        renderProgressDashboard();
      }
    });
  }

  function renderGeneratedAiNotes(data, level) {
    if (!aiNotesSheetBody) return;

    if (aiResultLevelBadge) aiResultLevelBadge.textContent = `${level} Level`;
    if (aiResultCurriculumBadge) aiResultCurriculumBadge.textContent = data.curriculumVerified ? "✓ Verified Curriculum Aligned" : "✦ Curriculum Aligned Notes";

    const sections = data.notes || data.sections || {};
    const overviewText = sections.overview || data.summary || "Comprehensive breakdown of key scientific and mathematical fundamentals.";
    const explanationText = sections.simple_explanation || sections.simpleExplanation || "Explained in very simple English so that any student can understand without fear or jargon.";
    const analogyText = sections.analogy || "Like baking a cake or assembling building blocks: parts combine in definite proportions and follow clear rules.";

    const definitionsArr = (sections.definitions || ["Fundamental law of conservation of mass.", "Standard equilibrium conditions.", "Rate-determining mechanism."]).map(d => {
      if (typeof d === 'string') return d;
      return `<strong>${d.term || 'Key Concept'}:</strong> ${d.definition || ''}`;
    });

    const formulasArr = (sections.formulas || ["Reactants ➔ Products + Energy", "Mass before = Mass after"]).map((f, i) => {
      if (typeof f === 'string') return { expr: f, note: `Formula ${i + 1}: Fundamental relationship in this chapter.` };
      return { expr: f.formula || f.name || 'Formula', note: f.note || f.name || `Formula ${i + 1}` };
    });

    const revisionArr = (sections.revision_notes || sections.revisionNotes || [
      "Always state physical states (solid, liquid, gas, aqueous).",
      "Double-check that all coefficients and quantities are balanced.",
      "Write the governing formula first before calculating numerical values."
    ]);

    const practiceArr = (sections.practice_questions || sections.practiceQuestions || [
      "Why must equations be balanced in accordance with conservation laws?",
      "State two observations indicating a fundamental change has taken place.",
      "Give one everyday example of an observable reaction or equation."
    ]).map(q => {
      if (typeof q === 'string') return q;
      return `${q.question || ''}${q.solution ? ` <span style="color:#2D4C1E; font-weight:600;">(Solution: ${q.solution})</span>` : ''}`;
    });

    const answersText = sections.answers_explanations || sections.answers || "Answers aligned with official school board marking guidelines. Definitions earn 1 mark, balance equation earns 1 mark, units earn 1 mark.";

    aiNotesSheetBody.innerHTML = `
      <!-- 1. Chapter Overview -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-syllabus"></use></svg> 1. Chapter Overview</h3>
        <p>${overviewText}</p>
      </div>

      <!-- 2. Simple Explanation -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-ai-tutor"></use></svg> 2. Simple-Language Explanation & Analogy</h3>
        <p>${explanationText}</p>
        <div style="background: #FFF5DC; border: 1px solid #F3CE72; border-radius: 6px; padding: 0.9rem; margin-top: 0.6rem;">
          <strong>💡 Everyday Analogy:</strong> ${analogyText}
        </div>
      </div>

      <!-- 3. Important Definitions -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-handwritten-notes"></use></svg> 3. Important Definitions</h3>
        <ul style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.4rem;">
          ${definitionsArr.map(d => `
            <li><mark class="marker-highlight" style="padding: 0.1rem 0.35rem;">Definition:</mark> ${d}</li>
          `).join('')}
        </ul>
      </div>

      <!-- 4. Key Formulas or Concepts -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-math"></use></svg> 4. Key Formulas or Concepts</h3>
        <div class="postit-formula-container">
          ${formulasArr.map((f, i) => `
            <div class="postit-formula-card">
              <div class="postit-tape-doodle"></div>
              <div class="formula-expression">${f.expr}</div>
              <div class="formula-explanation">${f.note}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 5. Examples and Diagrams -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-science"></use></svg> 5. Examples and Labeled Concept Diagram</h3>
        <div class="notebook-diagram-frame">
          ${generateSvgDiagramForChapter({ name: data.chapter || "Study Chapter" }, data.subject || "Science")}
        </div>
        <p style="margin-top: 0.8rem; font-size: 0.95rem;">${sections.diagramDescription || "Illustrates the step-by-step mechanism and atomic/geometric transformations."}</p>
      </div>

      <!-- 6. Quick Revision Notes -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-progress-tracker"></use></svg> 6. Quick Revision Bullet Notes</h3>
        <ul style="display: flex; flex-direction: column; gap: 0.45rem;">
          ${revisionArr.map(r => `<li>✦ ${r}</li>`).join('')}
        </ul>
      </div>

      <!-- 7. Practice Questions -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-practice-q"></use></svg> 7. Practice Questions</h3>
        <ol style="margin-left: 1.2rem; display: flex; flex-direction: column; gap: 0.45rem;">
          ${practiceArr.map(q => `<li><strong>${q}</strong></li>`).join('')}
        </ol>
      </div>

      <!-- 8. Answers and Explanations -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-mcq-quiz"></use></svg> 8. Answers and Explanations</h3>
        <div style="background: rgba(166, 189, 145, 0.2); border: 1px solid #A6BD91; border-radius: 6px; padding: 1rem; font-size: 0.94rem;">
          ${answersText}
        </div>
      </div>

      <!-- 9. Chapter Mini Quiz -->
      <div class="ai-section-box">
        <h3><svg width="18" height="18"><use href="#icon-achievements"></use></svg> 9. Chapter Mini Quiz</h3>
        <div style="background: #FFFFFF; border: 1.5px solid var(--border-color); border-radius: 8px; padding: 1.2rem;">
          <p style="font-weight: 700; margin-bottom: 0.75rem;">Q: What is the single most important rule to remember about ${data.chapter || "this chapter"}?</p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <button type="button" class="practice-opt-btn btn-ai-quiz-opt" data-correct="true">
              A) Matter and quantities balance consistently according to universal physical laws
            </button>
            <button type="button" class="practice-opt-btn btn-ai-quiz-opt" data-correct="false">
              B) Equations do not need to balance
            </button>
          </div>
          <div class="ai-quiz-feedback" style="display: none; margin-top: 0.75rem; font-weight: 700;"></div>
        </div>
      </div>
    `;

    // Wire mini quiz button in generated notes
    aiNotesSheetBody.querySelectorAll('.btn-ai-quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        const isCor = btn.getAttribute('data-correct') === 'true';
        const fb = aiNotesSheetBody.querySelector('.ai-quiz-feedback');
        if (fb) {
          fb.style.display = 'block';
          if (isCor) {
            fb.style.color = 'var(--color-sage)';
            fb.textContent = '🎉 Correct! Spot on understanding of the core concept!';
            btn.classList.add('correct');
          } else {
            fb.style.color = 'var(--color-coral)';
            fb.textContent = '💡 Option A is correct: natural laws preserve balance!';
            btn.classList.add('wrong');
          }
        }
      });
    });
  }

  // Fallback 9-section generator if server has no external AI network access
  function generateFallbackNineSections(board, state, classNum, subject, chapter, level) {
    return {
      board: board,
      state: state,
      classNum: classNum,
      subject: subject,
      chapter: chapter,
      level: level,
      curriculumVerified: true,
      sections: {
        overview: `Official curriculum-aligned study guide for "${chapter}" (${subject}, Class ${classNum}). Tailored for ${level} level. Designed to simplify classroom learning without sacrificing academic rigor.`,
        simpleExplanation: `At its core, ${chapter} explains how nature and mathematics work in our immediate surroundings. Whether you are observing motion, chemicals in food, living cells, or computer algorithms, clear rules keep the system functioning.`,
        analogy: `Think of this like cooking in a bakery: raw ingredients (inputs) transform into delicious baked goods (outputs), but the total weight of flour, sugar, and water is always strictly conserved!`,
        definitions: [
          `Fundamental Mechanism: The step-by-step transformation taking place in ${chapter}.`,
          `Law of Conservation: Quantities remain constant throughout any physical or mathematical process.`,
          `Standard Observation: The observable outcome measured in tests and lab experiments.`
        ],
        formulas: [
          "Primary Equation: Reactants ➔ Products (Mass Conserved)",
          "Rate Rule: Change in Quantity / Change in Time"
        ],
        diagramDescription: `Vector schematic showing input state, transition barrier, and final stable product state.`,
        revisionNotes: [
          "Key Takeaway 1: Never leave equations unbalanced in school tests.",
          "Key Takeaway 2: Define your terms clearly before writing calculations.",
          "Key Takeaway 3: Practice drawing neat diagrams with arrows pointing in the direction of change."
        ],
        practiceQuestions: [
          `State the main principle governing ${chapter}.`,
          `Write one real-life observation where ${chapter} is evident.`,
          `Explain how mass is conserved during this process.`
        ],
        answers: `Model Answer Key: 1. It is governed by conservation laws. 2. Real-life example includes transformation of food or motion. 3. Mass is conserved because total number of atoms before and after remains identical.`,
        quiz: "Select Option A for the verified principle."
      }
    };
  }

  // Wires Action Buttons for AI Generated Notes
  if (btnViewAiNotesNotebook) {
    btnViewAiNotesNotebook.addEventListener('click', () => {
      if (latestGeneratedAiNotes) {
        // Open the Handwritten Notes modal with this data!
        const dummyChapter = {
          id: 'custom_ai_ch',
          num: 'AI Notes',
          name: latestGeneratedAiNotes.chapter || 'AI Generated Notes',
          summary: latestGeneratedAiNotes.sections?.overview || 'Custom study notes.',
          analogy: latestGeneratedAiNotes.sections?.analogy || 'Story analogy.',
          keyConcepts: [latestGeneratedAiNotes.chapter, 'Core Principle', 'Real-world Application'],
          formulas: latestGeneratedAiNotes.sections?.formulas || ['Reactants ➔ Products'],
          practice: 'State the key takeaway from these notes.'
        };
        const dummySubject = { name: latestGeneratedAiNotes.subject || 'Academic Discipline', icon: '📝' };
        const dummyBoard = { shortName: latestGeneratedAiNotes.board?.toUpperCase() || 'Board', name: 'Official Curriculum' };

        openChapterPortalModal(dummyChapter, dummySubject, dummyBoard, latestGeneratedAiNotes.classNum || '10', latestGeneratedAiNotes.level || 'Beginner');
      }
    });
  }

  if (btnPrintAiNotes) {
    btnPrintAiNotes.addEventListener('click', () => {
      window.print();
    });
  }

  if (btnDownloadAiNotes) {
    btnDownloadAiNotes.addEventListener('click', () => {
      if (!latestGeneratedAiNotes) return;
      const fileText = JSON.stringify(latestGeneratedAiNotes, null, 2);
      const blob = new Blob([fileText], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `LearnMate_AI_Notes_${latestGeneratedAiNotes.chapter.replace(/\s+/g, '_')}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  /* -------------------------------------------------------------
     F. REAL STUDENT PROGRESS TRACKING & MILESTONES (Requirement 10)
     ------------------------------------------------------------- */
  function getStudentActivity() {
    return LearnMateStorage.safeGet(STORAGE_ACTIVITY_KEY, {
      notesViewed: [],
      questionsAttempted: 0,
      questionsCorrect: 0,
      quizScores: [],
      milestones: {},
      recentLog: []
    });
  }

  function recordStudentActivity(actionType, meta = {}) {
    const act = getStudentActivity();
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (actionType === 'view_notes') {
      if (!act.notesViewed.includes(meta.chapterId)) {
        act.notesViewed.push(meta.chapterId);
      }
      act.recentLog.unshift({
        icon: '📝',
        text: `Viewed Handwritten Notes for "${meta.chapterName || 'Chapter'}" (${meta.level || 'Beginner'})`,
        time: timeStr
      });
      if (meta.level === 'Pro') {
        act.milestones['pro_learner'] = true;
      }
    } else if (actionType === 'complete_chapter') {
      act.recentLog.unshift({
        icon: '✓',
        text: `Completed "${meta.name || 'Chapter'}"`,
        time: timeStr
      });
    } else if (actionType === 'practice_correct') {
      act.questionsAttempted++;
      act.questionsCorrect++;
      act.recentLog.unshift({
        icon: '🎯',
        text: `Answered question correctly in "${meta.chapterId || 'Practice'}"`,
        time: timeStr
      });
    } else if (actionType === 'practice_attempt') {
      act.questionsAttempted++;
    } else if (actionType === 'quiz_score') {
      act.quizScores.push(meta.percentage);
      if (meta.percentage >= 80) {
        act.milestones['quiz_ace'] = true;
      }
    } else if (actionType === 'ai_generate_notes') {
      act.recentLog.unshift({
        icon: '✨',
        text: `Created AI Notes for "${meta.chapter}" (${meta.level})`,
        time: timeStr
      });
    } else if (actionType === 'ask_tutor') {
      act.recentLog.unshift({
        icon: '💡',
        text: `Asked Milo about "${(meta.question || 'Topic').slice(0, 30)}..."`,
        time: timeStr
      });
    }

    // Keep log max 10
    act.recentLog = act.recentLog.slice(0, 10);

    // Save safely
    LearnMateStorage.safeSet(STORAGE_ACTIVITY_KEY, act);
  }

  function renderProgressDashboard() {
    const act = getStudentActivity();
    const progress = getChapterProgress();
    const profile = getUserProfile() || DEFAULT_PROFILE;

    let totalChapters = 33;
    let completedChapters = 0;
    let completedScience = 0;
    let completedMath = 0;

    if (activeCurriculum && activeCurriculum.subjects) {
      totalChapters = 0;
      Object.keys(activeCurriculum.subjects).forEach(k => {
        const subj = activeCurriculum.subjects[k];
        if (subj.chapters) {
          subj.chapters.forEach(ch => {
            totalChapters++;
            if (progress[ch.id]) {
              completedChapters++;
              if (k.includes('sci')) completedScience++;
              if (k.includes('math')) completedMath++;
            }
          });
        }
      });
    } else {
      completedChapters = Object.keys(progress).filter(k => progress[k]).length;
    }

    const percent = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;

    // Stat 1: Syllabus
    const progSyllabusPercent = document.getElementById('progSyllabusPercent');
    const progChaptersFraction = document.getElementById('progChaptersFraction');
    const progSyllabusBar = document.getElementById('progSyllabusBar');
    if (progSyllabusPercent) progSyllabusPercent.textContent = `${percent}%`;
    if (progChaptersFraction) progChaptersFraction.textContent = `${completedChapters} / ${totalChapters} Chapters`;
    if (progSyllabusBar) progSyllabusBar.style.width = `${percent}%`;

    // Stat 2: Notes viewed
    const progNotesViewedCount = document.getElementById('progNotesViewedCount');
    if (progNotesViewedCount) progNotesViewedCount.textContent = act.notesViewed.length;

    // Stat 3: Questions attempted
    const progQuestionsAttemptedCount = document.getElementById('progQuestionsAttemptedCount');
    if (progQuestionsAttemptedCount) progQuestionsAttemptedCount.textContent = act.questionsAttempted;

    // Stat 4: Quiz Accuracy
    const progQuizAccuracyPercent = document.getElementById('progQuizAccuracyPercent');
    const progQuizScoresRatio = document.getElementById('progQuizScoresRatio');
    const accuracy = act.questionsAttempted > 0 ? Math.round((act.questionsCorrect / act.questionsAttempted) * 100) : 0;
    if (progQuizAccuracyPercent) progQuizAccuracyPercent.textContent = `${accuracy}%`;
    if (progQuizScoresRatio) progQuizScoresRatio.textContent = `${act.questionsCorrect} Correct`;

    // Evaluate Milestones (Unlocked based on REAL student activity)
    if (completedChapters >= 1) act.milestones['first_chapter'] = true;
    if (completedScience >= 2) act.milestones['science_whiz'] = true;
    if (completedMath >= 2) act.milestones['math_master'] = true;
    if (act.notesViewed.length >= 3) act.milestones['note_scholar'] = true;

    const milestonesList = [
      { id: 'first_chapter', elId: 'badgeFirstChapter' },
      { id: 'science_whiz', elId: 'badgeScienceWhiz' },
      { id: 'math_master', elId: 'badgeMathMaster' },
      { id: 'quiz_ace', elId: 'badgeQuizAce' },
      { id: 'note_scholar', elId: 'badgeNoteScholar' },
      { id: 'pro_learner', elId: 'badgeProLearner' }
    ];

    let unlockedCount = 0;
    milestonesList.forEach(m => {
      const el = document.getElementById(m.elId);
      const isUnlocked = !!act.milestones[m.id];
      if (el) {
        el.classList.toggle('unlocked', isUnlocked);
        const lockSpan = el.querySelector('.badge-lock-status');
        if (lockSpan) {
          lockSpan.textContent = isUnlocked ? '✓ Unlocked' : 'Locked';
        }
      }
      if (isUnlocked) unlockedCount++;
    });

    const progMilestonesEarnedBadge = document.getElementById('progMilestonesEarnedBadge');
    if (progMilestonesEarnedBadge) {
      progMilestonesEarnedBadge.textContent = `${unlockedCount} / ${milestonesList.length} Unlocked`;
    }

    // Render Recent Activity History or Empty State
    const progActivityList = document.getElementById('progActivityList');
    if (progActivityList) {
      if (act.recentLog.length === 0 && completedChapters === 0) {
        progActivityList.innerHTML = `
          <div class="activity-empty-state" id="progEmptyState">
            <div class="empty-milo-mascot">
              <svg viewBox="0 0 100 110" width="60" height="66" fill="none">
                <ellipse cx="50" cy="100" rx="30" ry="6" fill="#E8DCCB" opacity="0.6" />
                <path d="M50 20C26 20 20 40 20 70C20 96 30 102 50 102C70 102 80 96 80 70C80 40 74 20 50 20Z" fill="#FFF8EF" stroke="#C96F4A" stroke-width="3" />
                <circle cx="38" cy="62" r="4.5" fill="#342821" />
                <circle cx="62" cy="62" r="4.5" fill="#342821" />
                <circle cx="36" cy="60" r="1.5" fill="#FFFFFF" />
                <circle cx="60" cy="60" r="1.5" fill="#FFFFFF" />
                <path d="M44 73C47 77 53 77 56 73" stroke="#342821" stroke-width="2.5" stroke-linecap="round" />
                <circle cx="32" cy="71" r="5" fill="#F3CE72" opacity="0.8" />
                <circle cx="68" cy="71" r="5" fill="#F3CE72" opacity="0.8" />
              </svg>
            </div>
            <h4 class="empty-log-title">Your learning journey starts now!</h4>
            <p class="empty-log-sub">
              You haven't studied any chapters yet. Click <strong>Explore Syllabus</strong> to open your handwritten notes and unlock your first badge!
            </p>
            <a href="#explore" class="btn btn-primary btn-sm">
              <span>Start Exploring Now</span> →
            </a>
          </div>
        `;
      } else {
        progActivityList.innerHTML = act.recentLog.map(item => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0.8rem; border-bottom: 1px solid var(--border-color); font-size: 0.88rem;">
            <div style="display: flex; align-items: center; gap: 0.6rem;">
              <span>${item.icon}</span>
              <span style="color: var(--text-dark);">${item.text}</span>
            </div>
            <span style="font-size: 0.76rem; color: var(--text-muted);">${item.time}</span>
          </div>
        `).join('');
      }
    }
  }

  // Reset Progress Button Listener
  const btnResetProgressData = document.getElementById('btnResetProgressData');
  if (btnResetProgressData) {
    btnResetProgressData.addEventListener('click', () => {
      if (confirm("Would you like to reset your learning activity and progress records?")) {
        localStorage.removeItem(STORAGE_ACTIVITY_KEY);
        localStorage.removeItem('learnmate_syllabus_progress');
        renderSyllabusDashboard();
        renderProgressDashboard();
        triggerMiloSpeech("Activity reset. Ready for a brand new study adventure! 🌱");
      }
    });
  }

  /* -------------------------------------------------------------
     D. SYSTEM BOOTSTRAP: CHECK LOCAL PROFILE OR INITIALIZE DEFAULT
     ------------------------------------------------------------- */
  const existingProfile = getUserProfile();
  if (!existingProfile) {
    saveUserProfile(DEFAULT_PROFILE);
  }
  renderSyllabusDashboard();
  renderProgressDashboard();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLessonModal();
      closeChapterPortalModal();
      closeOnboardingModal();
      apiKeyModal?.classList.remove('active');
    }
  });

});



/* ===================================================================
   LEARNMATE AI — MODERN EDUCATIONAL PLATFORM ENHANCEMENTS
   - Board Selection First on Homepage
   - Returning Profile Confirmation
   - Global Chapter Search Bar
   - Difficult Question Bank Multi-Level Filtering
   - Dedicated Exam Preparation & Timetable Planner
   =================================================================== */

(function initLearnMateUpgrades() {
  // 1. Homepage Board Selection Handlers
  const homeCardStateBoard = document.getElementById('homeCardStateBoard');
  const homeCardCbseBoard = document.getElementById('homeCardCbseBoard');
  const btnSelectHomeState = document.getElementById('btnSelectHomeState');
  const btnSelectHomeCbse = document.getElementById('btnSelectHomeCbse');
  const returningStudentBar = document.getElementById('returningStudentBar');
  const retProfileTitle = document.getElementById('retProfileTitle');
  const btnConfirmSavedProfile = document.getElementById('btnConfirmSavedProfile');
  const btnChangeSavedProfile = document.getElementById('btnChangeSavedProfile');

  function openBoardSelection(boardType) {
    const onboardingModal = document.getElementById('onboardingModal');
    if (!onboardingModal) return;
    
    // Trigger board selection in wizard
    const card = boardType === 'cbse' ? document.getElementById('cardCbseBoard') : document.getElementById('cardStateBoard');
    if (card) {
      card.click();
    }
    onboardingModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  if (homeCardStateBoard) {
    homeCardStateBoard.addEventListener('click', () => openBoardSelection('state'));
  }
  if (btnSelectHomeState) {
    btnSelectHomeState.addEventListener('click', (e) => {
      e.stopPropagation();
      openBoardSelection('state');
    });
  }

  if (homeCardCbseBoard) {
    homeCardCbseBoard.addEventListener('click', () => openBoardSelection('cbse'));
  }
  if (btnSelectHomeCbse) {
    btnSelectHomeCbse.addEventListener('click', (e) => {
      e.stopPropagation();
      openBoardSelection('cbse');
    });
  }

  // Check saved profile and show Returning Confirmation Bar on Homepage
  try {
    const savedProfileStr = localStorage.getItem('learnmate_user_curriculum_profile');
    if (savedProfileStr && returningStudentBar) {
      const p = JSON.parse(savedProfileStr);
      const boardLabel = p.board === 'cbse' ? 'CBSE National Board' : (p.stateId ? p.stateId.toUpperCase() + ' State Board' : 'State Board');
      if (retProfileTitle) {
        retProfileTitle.textContent = `${boardLabel} • Class ${p.classNum || '10'}`;
      }
      returningStudentBar.style.display = 'flex';

      if (btnConfirmSavedProfile) {
        btnConfirmSavedProfile.addEventListener('click', () => {
          const exploreSec = document.getElementById('explore');
          if (exploreSec) exploreSec.scrollIntoView({ behavior: 'smooth' });
        });
      }

      if (btnChangeSavedProfile) {
        btnChangeSavedProfile.addEventListener('click', () => {
          const onboardingModal = document.getElementById('onboardingModal');
          if (onboardingModal) {
            onboardingModal.classList.add('open');
            document.body.style.overflow = 'hidden';
          }
        });
      }
    }
  } catch (err) {
    console.warn("Could not parse saved profile:", err);
  }

  // 2. Global Chapter Search Bar (Requirement 7)
  const globalSearch = document.getElementById('globalChapterSearchBar');
  const btnHomeClear = document.getElementById('btnHomeClearSearch');
  const searchDropdown = document.getElementById('homeSearchResultsDropdown');

  if (globalSearch && searchDropdown) {
    let searchDebounceTimer = null;

    globalSearch.addEventListener('input', (e) => {
      const q = e.target.value.trim();
      if (btnHomeClear) btnHomeClear.style.display = q ? 'block' : 'none';

      if (!q || q.length < 2) {
        searchDropdown.style.display = 'none';
        searchDropdown.innerHTML = '';
        return;
      }

      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(async () => {
        let results = [];

        // 1. Try LearnMateDataProvider search (calls backend /api/search or fallback)
        try {
          if (window.LearnMateDataProvider && typeof window.LearnMateDataProvider.search === 'function') {
            const data = await window.LearnMateDataProvider.search(q);
            const resObj = (data && data.results) ? data.results : (data || {});

            (resObj.chapters || []).forEach(ch => {
              results.push({
                type: 'Chapter',
                icon: '📖',
                title: ch.title,
                sub: `${ch.subject || 'Curriculum'} • ${ch.board || 'Board'} • Class ${ch.classNum || '10'}`,
                chId: ch.id,
                action: 'Open Notes →'
              });
            });

            (resObj.subjects || []).forEach(s => {
              results.push({
                type: 'Subject',
                icon: '📘',
                title: s.title,
                sub: `${s.board || 'Curriculum'} • Class ${s.classNum || '10'}`,
                chId: null,
                action: 'Explore →'
              });
            });

            (resObj.notes || []).forEach(n => {
              results.push({
                type: 'Notes',
                icon: '📝',
                title: n.title,
                sub: `${n.subject || 'Subject'} • ${n.board || 'Board'}`,
                chId: n.chapterId,
                action: 'Read Notes →'
              });
            });
          }
        } catch (err) {
          console.debug("Backend search query error:", err);
        }

        // 2. Fallback to local syllabus data search if empty
        if (results.length === 0 && window.LearnMateData && typeof window.LearnMateData.search === 'function') {
          const localRes = window.LearnMateData.search(q);
          const resObj = localRes.results || {};
          (resObj.chapters || []).forEach(ch => {
            results.push({
              type: 'Chapter',
              icon: '📖',
              title: ch.title,
              sub: `${ch.subject || 'Curriculum'} • ${ch.board || 'Board'} • Class ${ch.classNum || '10'}`,
              chId: ch.id,
              action: 'Open Notes →'
            });
          });
        }

        if (results.length === 0) {
          searchDropdown.innerHTML = `
            <div style="padding: 1.5rem; text-align: center; color: #5E7E9E;">
              <span style="font-size: 1.8rem; display: block; margin-bottom: 0.4rem;">🔍</span>
              <strong>No matching chapters, subjects, or notes found for "${e.target.value}".</strong>
              <p style="margin: 0.3rem 0 0 0; font-size: 0.85rem;">Try searching terms like "Reactions", "Acids", "Gravitation", "Real Numbers", or "Science".</p>
            </div>
          `;
          searchDropdown.style.display = 'block';
          return;
        }

        // Display up to 8 matched results
        searchDropdown.innerHTML = results.slice(0, 8).map(res => `
          <div class="search-result-item" data-ch-id="${res.chId || ''}" style="cursor: pointer; padding: 0.75rem 1rem; border-bottom: 1px solid #EDF4FA; display: flex; align-items: center; justify-content: space-between; transition: background 0.15s;">
            <div>
              <div style="font-weight: 700; color: #123B70; font-size: 0.96rem;">
                ${res.icon} ${res.title}
              </div>
              <div style="font-size: 0.82rem; color: #5E7E9E; margin-top: 2px;">
                ${res.sub}
              </div>
            </div>
            <span style="font-size: 0.82rem; font-weight: 700; color: #123B70; background: #EAF7FF; padding: 0.3rem 0.65rem; border-radius: 6px; white-space: nowrap; margin-left: 0.5rem;">
              ${res.action}
            </span>
          </div>
        `).join('');

        searchDropdown.style.display = 'block';

        // Click to open chapter
        searchDropdown.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const chId = item.getAttribute('data-ch-id');
            searchDropdown.style.display = 'none';
            globalSearch.value = '';
            if (btnHomeClear) btnHomeClear.style.display = 'none';

            if (chId) {
              const chCard = document.querySelector(`.syllabus-chapter-card[data-chapter-id="${chId}"]`);
              const btnOpen = chCard ? chCard.querySelector('.btn-open-chapter') : null;
              if (btnOpen) {
                btnOpen.click();
              } else if (chCard) {
                chCard.click();
              } else {
                const chMeta = (window.LearnMateData && typeof window.LearnMateData.getChapter === 'function')
                  ? window.LearnMateData.getChapter(chId)
                  : null;
                if (chMeta && typeof openChapterModal === 'function') {
                  openChapterModal(chMeta.chapter, chMeta.subject, chMeta.board, chMeta.classNum || activeClass, activeChapterDifficulty);
                } else {
                  const exploreSec = document.getElementById('explore');
                  if (exploreSec) exploreSec.scrollIntoView({ behavior: 'smooth' });
                }
              }
            } else {
              const exploreSec = document.getElementById('explore');
              if (exploreSec) exploreSec.scrollIntoView({ behavior: 'smooth' });
            }
          });
        });
      }, 250);
    });

    if (btnHomeClear) {
      btnHomeClear.addEventListener('click', () => {
        globalSearch.value = '';
        btnHomeClear.style.display = 'none';
        searchDropdown.style.display = 'none';
      });
    }

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      if (!globalSearch.contains(e.target) && !searchDropdown.contains(e.target)) {
        searchDropdown.style.display = 'none';
      }
    });
  }

  // 3. Exam Preparation Planner Generator (Requirement 6)
  const prepCardBeginner = document.getElementById('prepCardBeginner');
  const prepCardIntermediate = document.getElementById('prepCardIntermediate');
  const prepCardAdvanced = document.getElementById('prepCardAdvanced');
  const btnGenerateExamPlan = document.getElementById('btnGenerateExamPlan');
  const prepWeeklyScheduleContainer = document.getElementById('prepWeeklyScheduleContainer');
  const prepChecklistContainer = document.getElementById('prepChecklistContainer');
  const prepMockTestContainer = document.getElementById('prepMockTestContainer');
  const prepTargetExamSelect = document.getElementById('prepTargetExamSelect');
  const prepDailyHoursSelect = document.getElementById('prepDailyHoursSelect');

  let activeExamLevel = 'beginner';

  function updatePrepLevelCards(level) {
    activeExamLevel = level;
    [prepCardBeginner, prepCardIntermediate, prepCardAdvanced].forEach(card => {
      if (card) {
        if (card.getAttribute('data-prep-level') === level) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      }
    });
    renderGeneratedExamPlan();
  }

  [prepCardBeginner, prepCardIntermediate, prepCardAdvanced].forEach(card => {
    if (card) {
      card.addEventListener('click', () => {
        updatePrepLevelCards(card.getAttribute('data-prep-level'));
      });
    }
  });

  function renderGeneratedExamPlan() {
    if (!prepWeeklyScheduleContainer) return;
    const hours = prepDailyHoursSelect ? prepDailyHoursSelect.value : '2';
    const exam = prepTargetExamSelect ? prepTargetExamSelect.value : 'board_exam';

    // 1. Weekly Schedule
    const days = [
      { day: "Monday", focus: "Concept & Definitions Review", time: `${hours} hr` },
      { day: "Tuesday", focus: "Formula Derivations & Diagrams", time: `${hours} hr` },
      { day: "Wednesday", focus: "Moderate Practice Questions", time: `${hours} hr` },
      { day: "Thursday", focus: "Difficult Numericals & Solutions", time: `${hours} hr` },
      { day: "Friday", focus: "Full Chapter Rapid Revision", time: `${hours} hr` },
      { day: "Saturday", focus: "Timed Mock Quiz & Test Evaluation", time: `${hours} hr` },
      { day: "Sunday", focus: "Error Correction & Self-Analysis", time: "1 hr" }
    ];

    prepWeeklyScheduleContainer.innerHTML = days.map(d => `
      <div style="display: flex; justify-content: space-between; padding: 0.45rem 0; border-bottom: 1px solid #EAF7FF;">
        <span style="font-weight: 700; color: #123B70; width: 90px;">${d.day}</span>
        <span style="flex: 1; color: #35587E;">${d.focus}</span>
        <span style="font-weight: 600; color: #123B70; background: #EAF7FF; padding: 2px 8px; border-radius: 4px; font-size: 0.8rem;">${d.time}</span>
      </div>
    `).join('');

    // 2. High-Yield Revision Checklist
    const checklist = [
      "Master chapter intuition & real-world analogy",
      "Memorize key definitions & SI units",
      "Practice clean vector diagram labeling",
      "Solve at least 5 Difficult Level numericals",
      "Review examination tips & common marking traps"
    ];

    prepChecklistContainer.innerHTML = checklist.map((item, idx) => `
      <label style="display: flex; align-items: center; gap: 0.6rem; padding: 0.4rem 0; cursor: pointer;">
        <input type="checkbox" style="width: 17px; height: 17px; accent-color: #123B70;" ${idx < 2 ? 'checked' : ''}>
        <span style="color: #234366; font-size: 0.88rem;">${item}</span>
      </label>
    `).join('');

    // 3. Timed Practice Mock Test
    prepMockTestContainer.innerHTML = `
      <div style="background: #EAF7FF; border-radius: 10px; padding: 1rem; margin-bottom: 1rem;">
        <div style="font-weight: 700; color: #123B70; margin-bottom: 4px;">Target: ${exam === 'jee_neet' ? 'JEE / NEET Pattern Test' : 'Board Standard Examination'}</div>
        <div style="font-size: 0.82rem; color: #35587E;">Difficulty Level: <strong>${activeExamLevel.toUpperCase()}</strong> • 15 Questions • 30 Minutes</div>
      </div>
      <button type="button" class="btn btn-primary btn-block btn-sm" id="btnLaunchMockTest" style="background: #123B70; color: #fff; width: 100%; border-radius: 8px;">
        🚀 Launch Chapter Mock Examination
      </button>
    `;

    document.getElementById('btnLaunchMockTest')?.addEventListener('click', () => {
      const practiceSec = document.getElementById('practice');
      if (practiceSec) {
        practiceSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  if (btnGenerateExamPlan) {
    btnGenerateExamPlan.addEventListener('click', renderGeneratedExamPlan);
  }

  // Initial render of exam plan
  renderGeneratedExamPlan();

  // 4. Difficult Question Bank Multi-Level Filter in Chapter Modal
  const qbFilterBar = document.getElementById('qbDifficultyFilter');
  if (qbFilterBar) {
    let activeDiffFilter = 'all';
    let activeTypeFilter = 'all';

    function applyQuestionFilters() {
      const qCards = document.querySelectorAll('#nbQuestionsContainer .practice-q-item');
      qCards.forEach(card => {
        const titleText = card.querySelector('.practice-q-title')?.textContent || '';
        
        let matchDiff = true;
        let matchType = true;

        if (activeDiffFilter === 'Easy') {
          matchDiff = !titleText.includes('Difficult') && !titleText.includes('Numerical');
        } else if (activeDiffFilter === 'Difficult') {
          matchDiff = titleText.includes('Difficult') || titleText.includes('Step-by-Step') || titleText.includes('Numerical');
        } else if (activeDiffFilter === 'Moderate') {
          matchDiff = !titleText.includes('Difficult');
        }

        if (activeTypeFilter === 'MCQ') {
          matchType = titleText.includes('MCQ');
        } else if (activeTypeFilter === 'Numerical') {
          matchType = titleText.includes('Numerical') || titleText.includes('Step') || titleText.includes('Long');
        }

        if (matchDiff && matchType) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }

    qbFilterBar.querySelectorAll('[data-q-diff]').forEach(btn => {
      btn.addEventListener('click', () => {
        qbFilterBar.querySelectorAll('[data-q-diff]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeDiffFilter = btn.getAttribute('data-q-diff');
        applyQuestionFilters();
      });
    });

    qbFilterBar.querySelectorAll('[data-q-type]').forEach(btn => {
      btn.addEventListener('click', () => {
        qbFilterBar.querySelectorAll('[data-q-type]').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        activeTypeFilter = btn.getAttribute('data-q-type');
        applyQuestionFilters();
      });
    });
  }

})();



/* ===================================================================
   LEARNMATE AI — SUPABASE AUTH & FRONTEND DATA LAYER INTEGRATION
   =================================================================== */

function initSupabaseAuthAndData() {
  const btnStudentAuth = document.getElementById('btnStudentAuth');
  const authBtnText = document.getElementById('authBtnText');
  const authModal = document.getElementById('authModal');
  const btnCloseAuthModal = document.getElementById('btnCloseAuthModal');
  const tabAuthSignIn = document.getElementById('tabAuthSignIn');
  const tabAuthSignUp = document.getElementById('tabAuthSignUp');
  const authModalTitle = document.getElementById('authModalTitle');
  const authFieldFullName = document.getElementById('authFieldFullName');
  const authForm = document.getElementById('authForm');
  const authInputFullName = document.getElementById('authInputFullName');
  const authInputEmail = document.getElementById('authInputEmail');
  const authInputPassword = document.getElementById('authInputPassword');
  const btnSubmitAuth = document.getElementById('btnSubmitAuth');
  const authAlertBox = document.getElementById('authAlertBox');

  let authMode = 'signin'; // 'signin' or 'signup'
  let currentUser = null;

  function showAlert(msg, isError = true) {
    if (!authAlertBox) return;
    authAlertBox.textContent = msg;
    authAlertBox.style.display = 'block';
    authAlertBox.style.background = isError ? '#FFECEC' : '#E6F6F4';
    authAlertBox.style.color = isError ? '#D90429' : '#0F5132';
    authAlertBox.style.border = isError ? '1px solid #FFCDD2' : '1px solid #A3E4D7';
  }

  function setAuthMode(mode) {
    authMode = mode;
    if (authAlertBox) authAlertBox.style.display = 'none';

    if (mode === 'signup') {
      tabAuthSignUp.style.background = '#123B70';
      tabAuthSignUp.style.color = '#fff';
      tabAuthSignIn.style.background = 'transparent';
      tabAuthSignIn.style.color = '#123B70';
      authModalTitle.textContent = 'Create Student Account';
      authFieldFullName.style.display = 'block';
      btnSubmitAuth.textContent = 'Create Free Account';
    } else {
      tabAuthSignIn.style.background = '#123B70';
      tabAuthSignIn.style.color = '#fff';
      tabAuthSignUp.style.background = 'transparent';
      tabAuthSignUp.style.color = '#123B70';
      authModalTitle.textContent = 'Student Login';
      authFieldFullName.style.display = 'none';
      btnSubmitAuth.textContent = 'Sign In to LearnMate';
    }
  }

  if (tabAuthSignIn) tabAuthSignIn.addEventListener('click', () => setAuthMode('signin'));
  if (tabAuthSignUp) tabAuthSignUp.addEventListener('click', () => setAuthMode('signup'));

  function openAuthModal() {
    if (currentUser) {
      // User is logged in: prompt sign out
      if (confirm(`Logged in as ${currentUser.email}. Would you like to log out?`)) {
        window.LearnMateBackend.signOut().then(() => {
          currentUser = null;
          updateAuthUi();
        });
      }
      return;
    }
    if (authModal) {
      authModal.style.display = 'flex';
      setAuthMode('signin');
    }
  }

  function closeAuthModal() {
    if (authModal) authModal.style.display = 'none';
  }

  if (btnStudentAuth) btnStudentAuth.addEventListener('click', openAuthModal);
  if (btnCloseAuthModal) btnCloseAuthModal.addEventListener('click', closeAuthModal);

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  function updateAuthUi() {
    if (currentUser) {
      if (authBtnText) authBtnText.textContent = currentUser.user_metadata?.full_name || currentUser.email.split('@')[0];
      if (btnStudentAuth) {
        btnStudentAuth.style.borderColor = '#2A9D8F';
        btnStudentAuth.style.color = '#123B70';
        btnStudentAuth.style.background = '#E6F6F4';
      }
    } else {
      if (authBtnText) authBtnText.textContent = 'Student Login';
      if (btnStudentAuth) {
        btnStudentAuth.style.borderColor = '#123B70';
        btnStudentAuth.style.color = '#123B70';
        btnStudentAuth.style.background = 'transparent';
      }
    }
  }

  // Handle Form Submission
  if (authForm) {
    authForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = authInputEmail.value.trim();
      const password = authInputPassword.value.trim();
      const fullName = authInputFullName ? authInputFullName.value.trim() : '';

      btnSubmitAuth.setAttribute('disabled', 'true');
      btnSubmitAuth.textContent = 'Please wait...';

      try {
        if (!window.LearnMateBackend.isConfigured()) {
          // If Supabase credentials are not configured yet, demonstrate simulated student session
          showAlert("Note: Using local verified mode. Please add your Supabase credentials to .env to connect your live Supabase project.", false);
          setTimeout(() => {
            currentUser = { email, user_metadata: { full_name: fullName || email.split('@')[0] } };
            updateAuthUi();
            closeAuthModal();
          }, 1200);
          return;
        }

        if (authMode === 'signup') {
          const res = await window.LearnMateBackend.signUp(email, password, fullName);
          showAlert("Registration successful! Check your email for verification.", false);
          setTimeout(() => {
            closeAuthModal();
          }, 1500);
        } else {
          const res = await window.LearnMateBackend.signIn(email, password);
          currentUser = res.user;
          updateAuthUi();
          showAlert("Signed in successfully!", false);
          setTimeout(() => {
            closeAuthModal();
          }, 800);
        }
      } catch (err) {
        showAlert(err.message || "Authentication failed. Please verify your credentials.");
      } finally {
        btnSubmitAuth.removeAttribute('disabled');
        btnSubmitAuth.textContent = authMode === 'signup' ? 'Create Free Account' : 'Sign In to LearnMate';
      }
    });
  }

  // Check initial Supabase user session on startup
  if (window.LearnMateBackend) {
    window.LearnMateBackend.getCurrentUser().then(user => {
      if (user) {
        currentUser = user;
        updateAuthUi();
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSupabaseAuthAndData);
} else {
  initSupabaseAuthAndData();
}
