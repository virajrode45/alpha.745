# LearnMate AI — Supabase Backend & Database Integration Guide

Welcome to the **LearnMate AI** Supabase Backend! This document explains how to set up, configure, migrate, and test your Supabase PostgreSQL database and connect it to your LearnMate AI website.

---

## 1. Architecture Overview

- **Database**: Supabase PostgreSQL
- **Security**: Row Level Security (RLS) on all user data with secure database RPC functions (`submit_quiz_answers`)
- **Authentication**: Supabase Auth (Email & Password, student profile synchronization)
- **Frontend Integration**: Official `@supabase/supabase-js` SDK via modular client [`supabase-client.js`](file:///d:/New%20folder/supabase-client.js)
- **Fallback Resilience**: If Supabase credentials are pending or the database is temporarily offline, the frontend seamlessly defaults to the verified curriculum engine without breaking.

---

## 2. Directory Structure

```
├── .env.example                                  # Template for Supabase & API secrets
├── .env                                          # Local environment configuration
├── supabase-client.js                            # Reusable Supabase client & data access layer
├── supabase/
│   ├── migrations/
│   │   ├── 20261015000001_initial_schema.sql    # 12 relational tables, foreign keys, indexes
│   │   └── 20261015000002_rls_policies.sql      # RLS policies, auth trigger & quiz RPC function
│   └── seed/
│       └── seed.sql                              # 36 Indian States & UTs, Boards, Subjects, Notes & Questions
├── index.html                                    # Main application frontend with Student Auth Modal
├── script.js                                     # Frontend controller & UI interactions
└── app.py                                        # Flask local server proxy
```

---

## 3. Database Schema Tables

| Table | Purpose | Access Control |
|---|---|---|
| `public.states` | 36 Indian states & union territories | Public read |
| `public.boards` | State Boards & CBSE curriculum bodies | Public read |
| `public.profiles` | Student profile (linked to `auth.users(id)`) | User own read/write |
| `public.subjects` | Curriculum subjects per board and class | Public read |
| `public.chapters` | Official syllabus chapters | Public read |
| `public.chapter_notes` | Notes across Beginner, Moderate, and Pro levels | Public read |
| `public.questions` | Chapter question bank (Easy, Moderate, Difficult) | Public read (Solutions validated via RPC) |
| `public.quiz_attempts` | Quiz sessions and final scores | User own read/write |
| `public.quiz_responses` | Individual student answers per quiz | User own read/write |
| `public.study_plans` | Personalized exam preparation schedules | User own read/write |
| `public.study_tasks` | Individual revision tasks in study plans | User own read/write |
| `public.chapter_progress`| Chapter completion and questions attempted | User own read/write |

---

## 4. Step-by-Step Setup Instructions

### Step 1: Create a Supabase Project
1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project**, name it `LearnMate-AI`, choose a database password, and select your preferred region.

### Step 2: Apply Database Migrations
1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation bar.
2. Open [`supabase/migrations/20261015000001_initial_schema.sql`](file:///d:/New%20folder/supabase/migrations/20261015000001_initial_schema.sql), copy its contents, paste them into the SQL Editor, and click **Run**.
3. Open [`supabase/migrations/20261015000002_rls_policies.sql`](file:///d:/New%20folder/supabase/migrations/20261015000002_rls_policies.sql), copy its contents, paste them into the SQL Editor, and click **Run**.

### Step 3: Seed Official Curriculum Data
1. Open the SQL Editor in Supabase.
2. Open [`supabase/seed/seed.sql`](file:///d:/New%20folder/supabase/seed/seed.sql), copy its contents, paste them into the SQL Editor, and click **Run**.
3. Your database will now have all 36 Indian States and Union Territories, CBSE and State boards, verified Class 10 subjects, chapters, notes, and question banks.

### Step 4: Configure Environment Variables
1. In your Supabase project, go to **Project Settings** > **API**.
2. Copy your **Project URL** and **anon public Key**.
3. In your project root, open [`.env`](file:///d:/New%20folder/.env) and set:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```
4. If you wish to pass these values directly into the browser, you can also define them in a `<script>` tag in [`index.html`](file:///d:/New%20folder/index.html) or let your backend serve them:
   ```html
   <script>
     window.LEARNMATE_SUPABASE_URL = "https://your-project-id.supabase.co";
     window.LEARNMATE_SUPABASE_ANON_KEY = "your_actual_anon_key_here";
   </script>
   ```

---

## 5. Security & Row Level Security (RLS) Verification

- **Public Syllabus Browsing**: Anonymous visitors and registered students can freely browse official boards, subjects, and notes.
- **Answer Concealment**: Correct answers and solutions for the active quiz are never sent to the client during an exam; they are submitted to `public.submit_quiz_answers` RPC which validates the answers server-side and returns the verified scores and explanations post-submission.
- **Student Privacy**: Every student's quiz attempts, study timetables, and chapter progress are isolated using `auth.uid() = user_id` RLS policies. No student can read or edit another student's data.
