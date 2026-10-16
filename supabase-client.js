/**
 * LearnMate AI — Supabase Client Configuration & Reusable Data Layer
 * Connects the frontend to Supabase PostgreSQL, Auth, and Storage.
 * Gracefully falls back to local verified curriculum if Supabase is offline
 * or credentials have not been configured yet.
 */

(function () {
  // Read config from meta tags or window global, or defaults
  const SUPABASE_URL = window.LEARNMATE_SUPABASE_URL || "https://your-project-id.supabase.co";
  const SUPABASE_ANON_KEY = window.LEARNMATE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your_anon_key_here";

  const isConfigured = Boolean(
    SUPABASE_URL &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_URL.includes("your-project-id") &&
    !SUPABASE_ANON_KEY.includes("your_anon_key")
  );

  let supabaseClient = null;

  if (isConfigured && window.supabase && typeof window.supabase.createClient === "function") {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
      console.info("⚡ LearnMate AI: Connected to live Supabase backend.");
    } catch (e) {
      console.warn("⚠️ LearnMate AI: Could not initialize Supabase client:", e);
    }
  } else {
    console.info("ℹ️ LearnMate AI: Running with local verified curriculum engine (Supabase credentials pending in .env).");
  }

  // Global LearnMate Data Interface
  window.LearnMateBackend = {
    isConfigured: () => Boolean(supabaseClient),
    getClient: () => supabaseClient,

    // -------------------------------------------------------------------
    // 1. Authentication & Profile
    // -------------------------------------------------------------------
    async getCurrentUser() {
      if (!supabaseClient) return null;
      try {
        const { data: { user }, error } = await supabaseClient.auth.getUser();
        if (error || !user) return null;
        return user;
      } catch (e) {
        return null;
      }
    },

    async signUp(email, password, fullName, classLevel = "10") {
      if (!supabaseClient) {
        throw new Error("Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY.");
      }
      const { data, error } = await supabaseClient.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            class_level: classLevel
          }
        }
      });
      if (error) throw error;
      return data;
    },

    async signIn(email, password) {
      if (!supabaseClient) {
        throw new Error("Supabase is not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY.");
      }
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      return data;
    },

    async signOut() {
      if (!supabaseClient) return;
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
    },

    async getUserProfile(userId) {
      if (!supabaseClient) return null;
      try {
        const { data, error } = await supabaseClient
          .from("profiles")
          .select("*, boards(*), states(*)")
          .eq("id", userId)
          .single();
        if (error) return null;
        return data;
      } catch (e) {
        return null;
      }
    },

    async updateUserProfile(userId, profileData) {
      if (!supabaseClient) return null;
      const { data, error } = await supabaseClient
        .from("profiles")
        .update({
          board_id: profileData.board_id,
          state_id: profileData.state_id,
          class_level: profileData.class_level,
          full_name: profileData.full_name,
          updated_at: new Date().toISOString()
        })
        .eq("id", userId)
        .select()
        .single();
      if (error) throw error;
      return data;
    },

    // -------------------------------------------------------------------
    // 2. Boards and States
    // -------------------------------------------------------------------
    async getStates() {
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient
            .from("states")
            .select("*")
            .order("name", { ascending: true });
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase states query failed, falling back to local dataset:", e);
        }
      }
      // Local fallback
      return window.SYLLABUS_DATABASE?.allIndianStatesBoards || [];
    },

    async getBoards() {
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient
            .from("boards")
            .select("*")
            .eq("is_active", true);
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase boards query failed, falling back to local dataset:", e);
        }
      }
      return [
        { id: "cbse", name: "Central Board of Secondary Education (CBSE)", board_type: "CBSE" },
        { id: "maharashtra_state", name: "Maharashtra State Board (MSBSHSE)", board_type: "State Board", state_id: "maharashtra" }
      ];
    },

    // -------------------------------------------------------------------
    // 3. Subjects & Chapters
    // -------------------------------------------------------------------
    async getSubjects(boardId, classLevel) {
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient
            .from("subjects")
            .select("*, chapters(*)")
            .eq("board_id", boardId)
            .eq("class_level", classLevel)
            .order("display_order", { ascending: true });
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase subjects query failed, falling back to local dataset:", e);
        }
      }
      // Local fallback
      const cur = window.SYLLABUS_DATABASE?.getCurriculum(boardId, classLevel);
      return cur?.subjects || [];
    },

    async getChapterNotes(chapterId, difficultyLevel = "Beginner") {
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient
            .from("chapter_notes")
            .select("*")
            .eq("chapter_id", chapterId)
            .eq("difficulty_level", difficultyLevel)
            .maybeSingle();
          if (!error && data) return data;
        } catch (e) {
          console.warn("Supabase chapter notes query failed:", e);
        }
      }
      return null;
    },

    async getQuestions(chapterId, difficultyLevel = null) {
      if (supabaseClient) {
        try {
          let query = supabaseClient
            .from("questions")
            .select("id, chapter_id, difficulty_level, question_type, question_text, options, marks, is_verified")
            .eq("chapter_id", chapterId);
          if (difficultyLevel && difficultyLevel !== "all") {
            query = query.eq("difficulty_level", difficultyLevel);
          }
          const { data, error } = await query;
          if (!error && data && data.length > 0) return data;
        } catch (e) {
          console.warn("Supabase questions query failed:", e);
        }
      }
      return null;
    },

    // -------------------------------------------------------------------
    // 4. Secure Quiz Submission (RPC Function)
    // -------------------------------------------------------------------
    async submitQuiz(chapterId, difficultyLevel, answers) {
      if (supabaseClient) {
        try {
          const { data, error } = await supabaseClient.rpc("submit_quiz_answers", {
            p_chapter_id: chapterId,
            p_difficulty_level: difficultyLevel,
            p_answers: answers
          });
          if (!error && data) return data;
        } catch (e) {
          console.warn("Supabase RPC quiz submission failed, falling back locally:", e);
        }
      }

      // Local validation fallback
      let score = 0;
      const results = answers.map(a => {
        const isCorrect = Boolean(a.isCorrect);
        if (isCorrect) score += 1;
        return {
          question_id: a.question_id,
          is_correct: isCorrect,
          correct_answer: a.correctAnswerText || "Verified Answer",
          explanation: a.explanationText || "Good job! Review the chapter summary for more depth."
        };
      });

      return {
        score,
        total_questions: answers.length,
        results
      };
    },

    // -------------------------------------------------------------------
    // 5. Study Plans & Progress
    // -------------------------------------------------------------------
    async getStudyPlan(userId) {
      if (!supabaseClient || !userId) return null;
      try {
        const { data, error } = await supabaseClient
          .from("study_plans")
          .select("*, study_tasks(*)")
          .eq("user_id", userId)
          .order("created_at", { ascending: false })
          .limit(1)
          .maybeSingle();
        if (error) return null;
        return data;
      } catch (e) {
        return null;
      }
    },

    async saveStudyPlan(userId, planData) {
      if (!supabaseClient || !userId) return null;
      try {
        const { data: plan, error: planErr } = await supabaseClient
          .from("study_plans")
          .insert({
            user_id: userId,
            title: planData.title,
            target_exam: planData.target_exam,
            preparation_level: planData.preparation_level,
            start_date: new Date().toISOString().split("T")[0]
          })
          .select()
          .single();

        if (planErr) throw planErr;

        if (planData.tasks && planData.tasks.length > 0) {
          const taskRows = planData.tasks.map(t => ({
            study_plan_id: plan.id,
            chapter_id: t.chapter_id || null,
            task_title: t.title,
            scheduled_date: t.date || new Date().toISOString().split("T")[0],
            estimated_minutes: t.minutes || 60
          }));
          await supabaseClient.from("study_tasks").insert(taskRows);
        }

        return plan;
      } catch (e) {
        console.error("Failed to save study plan:", e);
        return null;
      }
    },

    async getChapterProgress(userId) {
      if (!supabaseClient || !userId) {
        // Return local storage progress
        try {
          return JSON.parse(localStorage.getItem("learnmate_syllabus_progress") || "{}");
        } catch (e) {
          return {};
        }
      }
      try {
        const { data, error } = await supabaseClient
          .from("chapter_progress")
          .select("*")
          .eq("user_id", userId);
        if (error) return {};
        const map = {};
        data.forEach(p => {
          if (p.completion_status === "completed") {
            map[p.chapter_id] = true;
          }
        });
        return map;
      } catch (e) {
        return {};
      }
    },

    async updateChapterProgress(userId, chapterId, isCompleted) {
      // Always persist to localStorage for instant UI responsiveness
      try {
        const local = JSON.parse(localStorage.getItem("learnmate_syllabus_progress") || "{}");
        if (isCompleted) local[chapterId] = true;
        else delete local[chapterId];
        localStorage.setItem("learnmate_syllabus_progress", JSON.stringify(local));
      } catch (e) {}

      // If user is authenticated with Supabase, sync to PostgreSQL
      if (supabaseClient && userId) {
        try {
          await supabaseClient.from("chapter_progress").upsert({
            user_id: userId,
            chapter_id: chapterId,
            notes_completed: isCompleted,
            completion_status: isCompleted ? "completed" : "in_progress",
            updated_at: new Date().toISOString()
          }, { onConflict: "user_id,chapter_id" });
        } catch (e) {
          console.warn("Could not sync progress to Supabase:", e);
        }
      }
    }
  };

  // -------------------------------------------------------------------
  // 6. Unified Data Provider Adapter (Database-Ready Architecture)
  // -------------------------------------------------------------------
  window.LearnMateDataProvider = {
    // Current active provider: 'mock' (default) or 'supabase'
    getProviderName: () => (supabaseClient ? "supabase" : "mock"),
    isRemoteDatabaseConnected: () => Boolean(supabaseClient),

    async getBoards() {
      try {
        const res = await fetch("/api/curriculum/boards");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {
        console.debug("Backend fetch failed, falling back to local dataset:", e);
      }
      return (window.LearnMateData && typeof window.LearnMateData.getBoards === "function")
        ? window.LearnMateData.getBoards()
        : [];
    },

    async getStates() {
      try {
        const res = await fetch("/api/curriculum/states");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.SYLLABUS_DATABASE && window.SYLLABUS_DATABASE.allIndianStatesBoards) || [];
    },

    async getClasses(boardId = "cbse") {
      try {
        const res = await fetch(`/api/curriculum/classes?board=${encodeURIComponent(boardId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return [{ class: "10", name: "Class 10" }, { class: "8", name: "Class 8" }];
    },

    async getSubjects(boardId = "cbse", classNum = "10", stateId = "") {
      try {
        const url = `/api/curriculum/subjects?board=${encodeURIComponent(boardId)}&classNum=${encodeURIComponent(classNum)}${stateId ? '&state=' + encodeURIComponent(stateId) : ''}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.LearnMateData && typeof window.LearnMateData.getSubjects === "function")
        ? window.LearnMateData.getSubjects(boardId, classNum, stateId)
        : [];
    },

    async getChapters(boardId = "cbse", classNum = "10", subjectId = "science", stateId = "") {
      try {
        const url = `/api/curriculum/chapters?board=${encodeURIComponent(boardId)}&classNum=${encodeURIComponent(classNum)}&subject=${encodeURIComponent(subjectId)}${stateId ? '&state=' + encodeURIComponent(stateId) : ''}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.LearnMateData && typeof window.LearnMateData.getChapters === "function")
        ? window.LearnMateData.getChapters(boardId, classNum, subjectId, stateId)
        : [];
    },

    async getNotes(chapterId, difficulty = "Moderate") {
      try {
        const res = await fetch(`/api/notes/${encodeURIComponent(chapterId)}?level=${encodeURIComponent(difficulty)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.LearnMateData && typeof window.LearnMateData.getNotes === "function")
        ? window.LearnMateData.getNotes(chapterId, difficulty)
        : null;
    },

    async getQuestions(chapterId, difficulty = null, limit = null) {
      try {
        let url = `/api/questions?chapterId=${encodeURIComponent(chapterId || "")}`;
        if (difficulty) url += `&difficulty=${encodeURIComponent(difficulty)}`;
        if (limit) url += `&limit=${limit}`;
        const res = await fetch(url);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.LearnMateData && typeof window.LearnMateData.getQuestions === "function")
        ? window.LearnMateData.getQuestions(chapterId, difficulty)
        : [];
    },

    async submitQuiz(chapterId, answers) {
      try {
        const res = await fetch("/api/quiz/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chapterId, answers })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.LearnMateData && typeof window.LearnMateData.gradeQuiz === "function")
        ? window.LearnMateData.gradeQuiz(chapterId, answers)
        : { chapterId, score: 0, total: answers.length, percentage: 0 };
    },

    async saveQuizAttempt(attempt) {
      if (window.LearnMateStorage && typeof window.LearnMateStorage.recordQuizAttempt === "function") {
        window.LearnMateStorage.recordQuizAttempt(attempt);
      }
      try {
        await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quizAttempts: [attempt] })
        });
      } catch (e) {}
    },

    async getProgress(userId = "guest_student") {
      try {
        const res = await fetch(`/api/progress?userId=${encodeURIComponent(userId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      if (window.LearnMateStorage && typeof window.LearnMateStorage.getUserActivity === "function") {
        return window.LearnMateStorage.getUserActivity();
      }
      return {};
    },

    async updateProgress(userId = "guest_student", progressData = {}) {
      try {
        const res = await fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, progress: progressData })
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return progressData;
    },

    async getStudyPlans(boardId = "cbse", classNum = "10") {
      try {
        const res = await fetch(`/api/study-plans?board=${encodeURIComponent(boardId)}&classNum=${encodeURIComponent(classNum)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return [];
    },

    async search(query) {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) return json.data;
        }
      } catch (e) {}
      return (window.LearnMateData && typeof window.LearnMateData.search === "function")
        ? window.LearnMateData.search(query)
        : { total: 0, results: {} };
    }
  };
})();
