# LearnMate AI — The Curious Learning Universe

> **A student-friendly, curriculum-aligned educational learning platform designed for Indian school boards (CBSE and State Boards). Built with a local-first content architecture, rich handwritten-style study notes, an authentic question bank, interactive quizzes, search, persistent study planning, and server-side AI integration.**

---

## 1. Architecture Overview

LearnMate AI is architected as a **local-first educational web application** backed by a lightweight Python/Flask REST API server and a database adapter ready for optional Supabase cloud integration.

```
                      ┌───────────────────────────────────────────────┐
                      │              STUDENT BROWSER                  │
                      │  - Clean HTML5 + Sky-Blue (#87CEEB) Modern    │
                      │  - Lined Notebook & Vector SVG Diagrams       │
                      │  - Real-time Quiz Engine & Study Planner      │
                      │  - Global Search & Milo AI Learning Buddy     │
                      └───────┬───────────────────────────────┬───────┘
                              │                               │
                Local Data &  │                               │ Optional Cloud Sync
                Preferences   │                               │ (Supabase Auth/DB)
                              ▼                               ▼
       ┌───────────────────────────────┐          ┌───────────────────────┐
       │   MODULAR LOCAL DATA LAYER    │          │   SUPABASE BACKEND    │
       │ - data/mock_curriculum.json   │          │ - PostgreSQL Tables   │
       │ - data/mock_notes.json        │          │ - Row Level Security  │
       │ - data/mock_questions.json    │          │ - Student Auth & RPC  │
       │ - data/mock_study_plans.json  │          └───────────────────────┘
       │ - window.LearnMateData API    │
       │ - window.LearnMateStorage     │
       │ - window.LearnMateDataProvider│
       └──────────────┬────────────────┘
                      │
                      │ REST API & Static Asset Delivery
                      ▼
       ┌─────────────────────────────────────────────────────────────┐
       │                 FLASK BACKEND SERVER (app.py)               │
       │ - Static Asset Proxy (HTML, CSS, JS, JSON)                  │
       │ - REST Endpoints: Boards, States, Classes, Subjects, Chaps  │
       │ - Chapter-wise Multi-Tier Notes API                         │
       │ - Question Bank & Quiz Scoring Engine                       │
       │ - Search Engine Across All Content                          │
       │ - Student Progress & Study Plans Storage                    │
       │ - Secure Server-Side AI Tutor & Notes Generator             │
       └──────────────┬──────────────────────────────────────────────┘
                      │ Server-Side Secrets (.env)
                      ▼
         ┌───────────────────────────┐
         │ OPTIONAL AI PROVIDERS     │
         │ - Google Gemini API       │
         │ - OpenAI API (gpt-4o-mini)│
         └───────────────────────────┘
```

### Key Architectural Principles
1. **Local-First Core**: Browsing curriculum, reading multi-level notes, taking quizzes, searching, and tracking study plans require **zero external API keys or cloud database accounts**.
2. **Pedagogical Integrity**: Verified chapter notes provide authentic academic explanations across Beginner, Moderate, and Pro difficulty levels.
3. **Database Adapter Ready**: `window.LearnMateDataProvider` serves as an adapter interface that defaults to the local/Flask mock provider and cleanly swaps to Supabase whenever configured.
4. **Zero Secret Leaks**: No API keys or passwords are ever stored in browser `localStorage` or transmitted from client JavaScript. AI requests are strictly handled through server-side endpoints.
5. **Resilient Offline Fallback**: If external AI or Supabase services are unreachable or unconfigured, the application gracefully falls back to the built-in curriculum knowledge engine without breaking the user experience.

---

## 2. Directory Structure

```
ALPHA.745/
├── index.html                  # Main application frontend (curriculum dashboard, modals, quiz)
├── style.css                   # Master stylesheet (custom color tokens, Outfit typography)
├── script.js                   # Application controller, modal handling, quiz runner, search
├── syllabus-data.js            # Core curriculum database & LearnMateData access layer
├── app.py                      # Flask backend (serving static assets, REST APIs, & secure AI)
├── mock_data.py                # Python academic content layer (boards, notes, questions, grading)
├── supabase-client.js          # Supabase client & LearnMateDataProvider adapter
├── data/
│   ├── mock_curriculum.json    # Consolidated curriculum data (CBSE & State Boards)
│   ├── mock_notes.json         # Multi-level authored chapter notes (Beginner / Moderate / Pro)
│   ├── mock_questions.json     # Authentic question bank (MCQ, True/False, Short Answer, Numerical)
│   ├── mock_study_plans.json   # Structured student study plans and daily learning activities
│   ├── syllabus-data.js        # Reusable syllabus dataset
│   ├── notes-data.js           # JavaScript notes database module
│   ├── questions-data.js       # JavaScript questions database module
│   └── learning-resources.js   # Reference catalog, formulas, and global study tips
├── supabase/
│   ├── migrations/             # PostgreSQL database schemas and Row Level Security policies
│   └── seed/                   # Official curriculum seed data (36 States & Boards)
├── tests/
│   └── test_master_suite.py    # 20-point comprehensive automated QA test suite
├── .env.example                # Configuration template for server secrets & Supabase keys
├── .env                        # Local active environment variables (git-ignored)
└── README.md                   # Project documentation and guide
```

---

## 3. Getting Started & Running Locally

### Prerequisites
- **Python 3.10+** (Python 3.14 recommended)
- **Flask 3.0+** (`pip install flask`)
- Optional for live AI models: `openai` (`pip install openai`)

### Quick Start
1. Open the repository directory in your terminal:
   ```bash
   cd d:\ALPHA.745
   ```

2. Install dependencies:
   ```bash
   python -m pip install flask openai
   ```

3. Start the Flask application:
   ```bash
   python app.py
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 4. Complete Backend REST API Reference

The Flask backend in `app.py` exposes a clean, consistent REST API with standard JSON responses:

| Method | Endpoint | Description | Query / Body Parameters |
|---|---|---|---|
| `GET` | `/api/health` | Application status & loaded AI providers | None |
| `GET` | `/api/curriculum/boards` | List of supported education boards | None |
| `GET` | `/api/curriculum/states` | List of 36 Indian states & UTs with board details | None |
| `GET` | `/api/curriculum/classes` | Available classes for a board | `?board=cbse` |
| `GET` | `/api/curriculum/subjects` | Subjects for a given board & class | `?board=cbse&classNum=10` |
| `GET` | `/api/curriculum/chapters` | Chapters for board, class, and subject | `?board=cbse&classNum=10&subject=science` |
| `GET` | `/api/notes/<chapter_id>` | Multi-level chapter study notes | `?level=Beginner` or `Moderate` or `Pro` |
| `GET` | `/api/questions` | Filtered question bank | `?chapterId=...&difficulty=...&limit=10` |
| `POST` | `/api/quiz/submit` | Accurately grade quiz & return explanations | `{ chapterId: "...", answers: [...] }` |
| `GET` | `/api/progress` | Retrieve student progress & statistics | `?userId=guest_student` |
| `POST` | `/api/progress` | Update student progress safely | `{ userId: "...", progress: { ... } }` |
| `GET` | `/api/study-plans` | Retrieve curated study plans & daily tasks | `?board=cbse&classNum=10` |
| `POST` | `/api/study-plans` | Mark daily study plan tasks completed | `{ planId: "...", taskId: "...", completed: true }` |
| `GET` | `/api/search` | Full search across subjects, chapters, notes, Qs | `?q=chemical&limit=25` |
| `POST` | `/api/tutor` | Server-side Milo AI Tutor explanation | `{ question: "...", subject: "...", board: "..." }` |
| `POST` | `/api/generate-notes`| AI-powered 9-section structured chapter notes | `{ board: "...", classNum: "...", chapter: "..." }` |

---

## 5. Mock Data Architecture & Content Editing

The educational content layer uses clean, authoritative data files inside `data/`:

### Where to Add or Edit Educational Content

1. **Curriculum (Boards, Classes, Subjects, Chapters)**:
   - Edit `data/mock_curriculum.json` or `syllabus-data.js`.
   - Each board contains classes (e.g. `"10"`, `"8"`), subjects (e.g. `"science"`, `"math"`), and chapter arrays with `id`, `num`, `name`, and `topics`.

2. **Chapter Notes (Beginner, Moderate, Pro)**:
   - Edit `data/mock_notes.json` or `data/notes-data.js`.
   - Keyed by `chapterId` (e.g. `cbse_10_sci_1`).
   - Each chapter contains `levels: { Beginner, Moderate, Pro }` with:
     - `overview`: Conceptual introduction
     - `analogy`: Everyday relatable story
     - `definitions`: Array of `{ term, def }`
     - `formulas`: Array of `{ expr, desc }`
     - `workedExample`: Detailed problem with step-by-step reasoning
     - `examTips`: Revision bullets
     - `practiceQuestions`: Self-check questions with solutions

3. **Question Bank**:
   - Edit `data/mock_questions.json` or `data/questions-data.js`.
   - Contains questions tagged with `chapterId`, `subjectId`, `boardId`, `classNum`, `difficulty`, `type` (MCQ, True/False, Short Answer, Numerical), `options`, `correctAnswer` or `correctOptionIndex`, and `explanation`.

4. **Study Plans & Daily Learning Activities**:
   - Edit `data/mock_study_plans.json`.
   - Structured milestones with daily activities, estimated minutes, subjects, and completion statuses.

---

## 6. How Quiz Scoring & Persistence Work

### Quiz Scoring Engine
- Submissions are sent to `POST /api/quiz/submit` (or graded locally via `window.LearnMateDataProvider.submitQuiz`).
- User selections are compared against the verified question database.
- Calculates exact score, total, percentage, passed status (`score >= 60%`), and returns a detailed breakdown including user choice, correct option, and pedagogical explanation.
- Rapid duplicate submissions within 5 seconds for the same quiz category/score are prevented by `LearnMateStorage.recordQuizAttempt()`.

### Student Progress Persistence
- Student-specific activity is managed by `LearnMateStorage` with corruption safety:
  - `learnmate_chapter_progress`: Completed chapter checklist.
  - `learnmate_user_activity`: Notes viewed counter, questions attempted, correct answers, recent log.
  - `learnmate_quiz_history`: Historical quiz attempt records.
  - `learnmate_study_plan_steps`: Checked roadmap milestones.
- Corrupted `localStorage` data is intercepted with automatic recovery to safe defaults without crashing the website.
- Progress is preserved across page refreshes and synchronized to `/api/progress`.

### Resetting Progress
To safely reset all stored progress, run:
```javascript
window.LearnMateStorage.resetAllProgress();
```

---

## 7. Future Database Adapter (Supabase Plug-in)

The frontend uses `window.LearnMateDataProvider` as a unified adapter:
- **Default Mode**: Uses local mock data and the Flask `/api` backend.
- **Supabase Mode**: When `SUPABASE_URL` and `SUPABASE_ANON_KEY` are provided in `.env`, the adapter can sync user progress and authenticate accounts with Supabase PostgreSQL and Row Level Security.
- The application **never falsely claims** Supabase is connected when operating in local/mock mode.

---

## 8. Configuring AI Providers (Optional)

Copy `.env.example` to `.env` in the project root:

```bash
copy .env.example .env
```

Set the optional keys:
```env
# Optional: Google Gemini API key for live AI Tutor responses
GEMINI_API_KEY=AIzaSy_your_gemini_api_key_here

# Optional: OpenAI API key for live GPT-4o-mini note generation
OPENAI_API_KEY=sk-proj-your_openai_api_key_here

PORT=3000
```

> **Note**: If neither key is provided, the application automatically uses the **Built-in Academic Knowledge Engine**, which delivers verified, high-quality answers and structured notes for Indian curricula.

---

## 9. Running the Automated Test Suite

A complete 20-point automated QA test suite verifies the entire system:

```bash
python tests/test_master_suite.py
```

### Verified Test Cases (20/20 Passed)
- [x] **[1/20]** Flask server starts and `/api/health` returns healthy status.
- [x] **[2/20]** Home page (`index.html`) loads completely with correct title.
- [x] **[3/20]** Core static assets (`style.css`, `script.js`, `syllabus-data.js`) load cleanly.
- [x] **[4/20]** Curriculum boards endpoint returns all 8 supported boards.
- [x] **[5/20]** States endpoint returns all 36 Indian states and union territories.
- [x] **[6/20]** Classes endpoint returns available class levels.
- [x] **[7/20]** Subjects endpoint returns board- and class-specific subjects.
- [x] **[8/20]** Chapters endpoint returns authentic chapters (13 chapters for CBSE 10 Science).
- [x] **[9/20]** Notes endpoint delivers authentic Beginner-tier notes with analogies.
- [x] **[10/20]** Notes endpoint delivers Moderate and Pro difficulty tiers.
- [x] **[11/20]** Question bank retrieves filtered questions for specific chapters.
- [x] **[12/20]** Quiz scoring accurately computes score, percentage, and returns explanations.
- [x] **[13/20]** Search returns relevant matches across subjects, chapters, notes, and questions.
- [x] **[14/20]** Search gracefully handles non-existent queries with empty result structures.
- [x] **[15/20]** Student progress GET and POST persist completed chapters and statistics.
- [x] **[16/20]** Study plans retrieve curated daily learning milestones and update completion.
- [x] **[17/20]** AI Tutor responds with pedagogical explanations under missing credentials.
- [x] **[18/20]** AI Notes generator generates 9-section structured notes under missing credentials.
- [x] **[19/20]** Negative request validation returns HTTP 400 on empty inputs and HTTP 404 on missing content.
- [x] **[20/20]** Modular JSON data files (`mock_curriculum.json`, `mock_notes.json`, etc.) are served cleanly.

---

## 10. Known Limitations & Roadmap

- **Live Database Sync**: Cloud synchronization is optional; user progress is primarily persisted in browser `localStorage` and Flask memory until Supabase PostgreSQL credentials are configured.
- **Offline PWA**: Full offline caching via a Service Worker is scheduled for the next major release.
- **Math LaTeX Rendering**: Complex mathematical equations currently render as standard ASCII/Unicode strings; MathJax/KaTeX integration is planned for advanced mathematical derivations.

---

## 11. Credits & Aesthetics

- **Application**: LearnMate AI — The Curious Learning Universe
- **Color Palette**: Sky Blue (`#87CEEB`), Dark Blue (`#123B70`), Accent Navy (`#0B2545`)
- **Typography**: Outfit & DM Sans via Google Fonts
