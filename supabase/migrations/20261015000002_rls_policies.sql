-- =====================================================================
-- LearnMate AI - Supabase Security Migration
-- Migration 02: Row Level Security (RLS) & Secure RPC Functions
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1. Enable Row Level Security (RLS) on All Tables
-- ---------------------------------------------------------------------
ALTER TABLE public.states ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.boards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapter_progress ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------
-- 2. Public Read Policies for Curriculum Content
-- (Anyone authenticated or anonymous can read published curriculum)
-- ---------------------------------------------------------------------
CREATE POLICY "Public states are readable by all"
    ON public.states FOR SELECT
    USING (true);

CREATE POLICY "Public boards are readable by all"
    ON public.boards FOR SELECT
    USING (is_active = true);

CREATE POLICY "Public subjects are readable by all"
    ON public.subjects FOR SELECT
    USING (true);

CREATE POLICY "Public chapters are readable by all"
    ON public.chapters FOR SELECT
    USING (verification_status = 'verified');

CREATE POLICY "Public chapter notes are readable by all"
    ON public.chapter_notes FOR SELECT
    USING (true);

-- ---------------------------------------------------------------------
-- 3. Secure Question Bank Policies
-- Students can read questions and options, but correct answers are
-- strictly validated via secure database RPC functions below!
-- ---------------------------------------------------------------------
CREATE POLICY "Public questions are readable by all"
    ON public.questions FOR SELECT
    USING (is_verified = true);

-- ---------------------------------------------------------------------
-- 4. User-Specific Private Data Policies (Profiles, Progress, Quizzes)
-- ---------------------------------------------------------------------

-- Profiles: Students can only read and update their own profile
CREATE POLICY "Users can read own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- Chapter Progress: Students can only access their own learning progress
CREATE POLICY "Users can read own chapter progress"
    ON public.chapter_progress FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chapter progress"
    ON public.chapter_progress FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chapter progress"
    ON public.chapter_progress FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- Quiz Attempts: Students can only access their own quiz results
CREATE POLICY "Users can read own quiz attempts"
    ON public.quiz_attempts FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz attempts"
    ON public.quiz_attempts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Quiz Responses: Linked to quiz_attempts owned by user
CREATE POLICY "Users can read own quiz responses"
    ON public.quiz_responses FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.quiz_attempts
        WHERE public.quiz_attempts.id = quiz_responses.attempt_id
        AND public.quiz_attempts.user_id = auth.uid()
    ));

CREATE POLICY "Users can insert own quiz responses"
    ON public.quiz_responses FOR INSERT
    WITH CHECK (EXISTS (
        SELECT 1 FROM public.quiz_attempts
        WHERE public.quiz_attempts.id = quiz_responses.attempt_id
        AND public.quiz_attempts.user_id = auth.uid()
    ));

-- Study Plans: Students can only access their own study plans
CREATE POLICY "Users can read own study plans"
    ON public.study_plans FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own study plans"
    ON public.study_plans FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own study plans"
    ON public.study_plans FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own study plans"
    ON public.study_plans FOR DELETE
    USING (auth.uid() = user_id);

-- Study Tasks: Linked to study_plans owned by user
CREATE POLICY "Users can read own study tasks"
    ON public.study_tasks FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.study_plans
        WHERE public.study_plans.id = study_tasks.study_plan_id
        AND public.study_plans.user_id = auth.uid()
    ));

CREATE POLICY "Users can manage own study tasks"
    ON public.study_tasks FOR ALL
    USING (EXISTS (
        SELECT 1 FROM public.study_plans
        WHERE public.study_plans.id = study_tasks.study_plan_id
        AND public.study_plans.user_id = auth.uid()
    ));

-- ---------------------------------------------------------------------
-- 5. Automatic Profile Creation Trigger on Auth Signup
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, class_level)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Student'),
        COALESCE(NEW.raw_user_meta_data->>'class_level', '10')
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ---------------------------------------------------------------------
-- 6. Secure Quiz Answer Validation RPC Function
-- (Prevents exposing correct answers to students on the frontend)
-- ---------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.submit_quiz_answers(
    p_chapter_id TEXT,
    p_difficulty_level TEXT,
    p_answers JSONB -- [{ "question_id": "...", "submitted_answer": "..." }]
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_attempt_id UUID;
    v_total_questions INTEGER := 0;
    v_score INTEGER := 0;
    v_item JSONB;
    v_question RECORD;
    v_is_correct BOOLEAN;
    v_results JSONB := '[]'::jsonb;
BEGIN
    -- Verify user is logged in
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'Authentication required to submit quiz attempts.';
    END IF;

    -- Calculate total questions
    v_total_questions := jsonb_array_length(p_answers);

    -- Create attempt record
    INSERT INTO public.quiz_attempts (user_id, chapter_id, difficulty_level, total_questions)
    VALUES (v_user_id, p_chapter_id, p_difficulty_level, v_total_questions)
    RETURNING id INTO v_attempt_id;

    -- Loop over answers and validate each against database
    FOR v_item IN SELECT * FROM jsonb_array_elements(p_answers)
    LOOP
        SELECT id, correct_answer, explanation
        INTO v_question
        FROM public.questions
        WHERE id = (v_item->>'question_id')::UUID;

        IF FOUND THEN
            v_is_correct := (TRIM(LOWER(v_item->>'submitted_answer')) = TRIM(LOWER(v_question.correct_answer)));
            IF v_is_correct THEN
                v_score := v_score + 1;
            END IF;

            -- Store response
            INSERT INTO public.quiz_responses (attempt_id, question_id, submitted_answer, is_correct)
            VALUES (v_attempt_id, v_question.id, v_item->>'submitted_answer', v_is_correct);

            -- Build returned item with explanation revealed POST-submission
            v_results := v_results || jsonb_build_object(
                'question_id', v_question.id,
                'is_correct', v_is_correct,
                'correct_answer', v_question.correct_answer,
                'explanation', v_question.explanation
            );
        END IF;
    END LOOP;

    -- Update final score
    UPDATE public.quiz_attempts
    SET score = v_score
    WHERE id = v_attempt_id;

    -- Update chapter progress
    INSERT INTO public.chapter_progress (user_id, chapter_id, questions_attempted, completion_status)
    VALUES (v_user_id, p_chapter_id, v_total_questions, 'completed')
    ON CONFLICT (user_id, chapter_id)
    DO UPDATE SET
        questions_attempted = public.chapter_progress.questions_attempted + EXCLUDED.questions_attempted,
        completion_status = 'completed',
        updated_at = NOW();

    RETURN jsonb_build_object(
        'attempt_id', v_attempt_id,
        'score', v_score,
        'total_questions', v_total_questions,
        'results', v_results
    );
END;
$$;
