-- =====================================================================
-- LearnMate AI - Supabase Database Schema Migration
-- Migration 01: Initial Core Schema, Tables, Indexes, and Constraints
-- =====================================================================

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ---------------------------------------------------------------------
-- 1. states Table (Indian States & Union Territories)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.states (
    id TEXT PRIMARY KEY,                       -- e.g. 'maharashtra', 'delhi', 'gujarat'
    name TEXT NOT NULL UNIQUE,                -- e.g. 'Maharashtra'
    code TEXT NOT NULL UNIQUE,                -- e.g. 'MH', 'DL', 'GJ'
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 2. boards Table (State Boards and CBSE)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.boards (
    id TEXT PRIMARY KEY,                       -- e.g. 'cbse', 'maharashtra_ssc', 'gseb'
    name TEXT NOT NULL,                        -- e.g. 'Central Board of Secondary Education (CBSE)'
    board_type TEXT NOT NULL CHECK (board_type IN ('CBSE', 'State Board')),
    state_id TEXT REFERENCES public.states(id) ON DELETE SET NULL,
    official_source_url TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 3. profiles Table (Linked to auth.users)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT,
    board_id TEXT REFERENCES public.boards(id) ON DELETE SET NULL,
    state_id TEXT REFERENCES public.states(id) ON DELETE SET NULL,
    class_level TEXT NOT NULL DEFAULT '10',    -- '1' to '12'
    preferred_language TEXT DEFAULT 'en',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 4. subjects Table
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.subjects (
    id TEXT PRIMARY KEY,                       -- e.g. 'cbse-10-science', 'mah-10-math-1'
    board_id TEXT NOT NULL REFERENCES public.boards(id) ON DELETE CASCADE,
    class_level TEXT NOT NULL,                 -- '1' to '12'
    name TEXT NOT NULL,                        -- e.g. 'Science (PCB)', 'Mathematics Part 1'
    description TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(board_id, class_level, name)
);

-- ---------------------------------------------------------------------
-- 5. chapters Table
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chapters (
    id TEXT PRIMARY KEY,                       -- e.g. 'cbse-10-sci-ch1'
    subject_id TEXT NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,                       -- e.g. 'Chemical Reactions and Equations'
    chapter_number TEXT,                       -- e.g. 'Ch 1' or '1'
    description TEXT,
    academic_year TEXT DEFAULT '2026-2027',
    verification_status TEXT DEFAULT 'verified' CHECK (verification_status IN ('verified', 'pending_verification', 'draft')),
    source_url TEXT,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 6. chapter_notes Table (Beginner, Moderate, and Pro Reading Modes)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chapter_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id TEXT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Beginner', 'Moderate', 'Pro')),
    language TEXT DEFAULT 'en',
    content TEXT NOT NULL,                     -- Main structured chapter text / explanation
    key_points JSONB DEFAULT '[]'::jsonb,      -- Key takeaways & revision bullet points
    formulas JSONB DEFAULT '[]'::jsonb,        -- Important formulas and equations
    examples JSONB DEFAULT '[]'::jsonb,        -- Step-by-step worked examples
    analogy TEXT,                              -- Intuitive real-world analogy
    diagram_svg TEXT,                          -- SVG diagram markup
    source_type TEXT DEFAULT 'curriculum_team' CHECK (source_type IN ('curriculum_team', 'ai_generated', 'official_textbook')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(chapter_id, difficulty_level, language)
);

-- ---------------------------------------------------------------------
-- 7. questions Table (Difficult Question Bank)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    chapter_id TEXT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    difficulty_level TEXT NOT NULL CHECK (difficulty_level IN ('Easy', 'Moderate', 'Difficult')),
    question_type TEXT NOT NULL CHECK (question_type IN ('MCQ', 'Short Answer', 'Long Answer', 'Numerical', 'Fill in the Blank')),
    question_text TEXT NOT NULL,
    options JSONB DEFAULT '[]'::jsonb,         -- Array of string choices for MCQs
    correct_answer TEXT NOT NULL,              -- Stored securely, protected from public students
    explanation TEXT,                          -- Step-by-step solution
    marks INTEGER DEFAULT 1,
    source_type TEXT DEFAULT 'verified_curriculum',
    is_verified BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 8. quiz_attempts Table
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    chapter_id TEXT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    difficulty_level TEXT NOT NULL,
    score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 9. quiz_responses Table
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID NOT NULL REFERENCES public.quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    submitted_answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 10. study_plans Table (Exam Preparation Timetable)
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    target_exam TEXT NOT NULL,                 -- e.g. 'board_exam', 'school_term', 'jee_neet'
    preparation_level TEXT NOT NULL,           -- e.g. 'beginner', 'intermediate', 'advanced'
    start_date DATE DEFAULT CURRENT_DATE,
    end_date DATE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 11. study_tasks Table
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.study_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    study_plan_id UUID NOT NULL REFERENCES public.study_plans(id) ON DELETE CASCADE,
    chapter_id TEXT REFERENCES public.chapters(id) ON DELETE SET NULL,
    task_title TEXT NOT NULL,
    scheduled_date DATE DEFAULT CURRENT_DATE,
    estimated_minutes INTEGER DEFAULT 60,
    is_completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ---------------------------------------------------------------------
-- 12. chapter_progress Table
-- ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.chapter_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    chapter_id TEXT NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
    notes_completed BOOLEAN DEFAULT FALSE,
    questions_attempted INTEGER DEFAULT 0,
    completion_status TEXT DEFAULT 'in_progress' CHECK (completion_status IN ('not_started', 'in_progress', 'completed')),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_id, chapter_id)
);

-- ---------------------------------------------------------------------
-- Indexes for High Performance Queries & Scaling
-- ---------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_subjects_board_class ON public.subjects(board_id, class_level);
CREATE INDEX IF NOT EXISTS idx_chapters_subject ON public.chapters(subject_id);
CREATE INDEX IF NOT EXISTS idx_chapters_title_trgm ON public.chapters USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX IF NOT EXISTS idx_chapter_notes_chapter ON public.chapter_notes(chapter_id, difficulty_level);
CREATE INDEX IF NOT EXISTS idx_questions_chapter_diff ON public.questions(chapter_id, difficulty_level);
CREATE INDEX IF NOT EXISTS idx_chapter_progress_user ON public.chapter_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
