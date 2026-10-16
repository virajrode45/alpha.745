/**
 * LearnMate AI — Learning Resources and Reference Catalog
 */

const LEARNING_RESOURCES = {
  "examTipsGlobal": [
    "Read question papers carefully during the first 15 minutes of reading time.",
    "Highlight final numerical answers with neat rectangular boxes and SI units.",
    "Include diagrams in 3-mark and 5-mark answers to earn full marks.",
    "Practice solving previous years' board papers under strict 3-hour exam conditions."
  ],
  "difficultyLevels": {
    "Beginner": {
      "name": "Beginner Guide",
      "desc": "Intuitive definitions, everyday analogies, visual diagrams, and confidence-building warm-up questions."
    },
    "Moderate": {
      "name": "Moderate Level",
      "desc": "Exam-style technical depth, standard formulas, step-by-step derivations, and board question patterns."
    },
    "Pro": {
      "name": "Pro Mastery",
      "desc": "HOTS (Higher Order Thinking Skills), competitive foundation (Olympiad / NTSE), and edge-case analytical problems."
    }
  }
};

if (typeof window !== 'undefined') {
  window.LEARNING_RESOURCES = LEARNING_RESOURCES;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LEARNING_RESOURCES };
}
