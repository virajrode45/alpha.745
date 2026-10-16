"""
LearnMate AI — Mock Data Provider & Academic Content Layer
===========================================================
Unified, reliable, database-ready data access layer.
Loads and caches curriculum, notes, questions, and study plans from:
  - data/mock_curriculum.json
  - data/mock_notes.json
  - data/mock_questions.json
  - data/mock_study_plans.json

Provides a standard adapter interface for all learning operations.
"""

import os
import json
import logging
from typing import Dict, List, Optional, Any

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(BASE_DIR, "data")

logger = logging.getLogger("LearnMateMockData")

# ---------------------------------------------------------------------------
# Data Caching & File Loaders
# ---------------------------------------------------------------------------
_CURRICULUM_CACHE = None
_NOTES_CACHE = None
_QUESTIONS_CACHE = None
_STUDY_PLANS_CACHE = None
_PROGRESS_STORE: Dict[str, Any] = {}


def _load_json_file(filename: str, default_val: Any) -> Any:
    filepath = os.path.join(DATA_DIR, filename)
    if not os.path.exists(filepath):
        logger.warning(f"Mock data file {filepath} not found, using default fallback.")
        return default_val
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception as e:
        logger.error(f"Error loading {filepath}: {e}")
        return default_val


def get_curriculum_data() -> Dict[str, Any]:
    global _CURRICULUM_CACHE
    if _CURRICULUM_CACHE is None:
        _CURRICULUM_CACHE = _load_json_file("mock_curriculum.json", {"boards": {}, "allIndianStatesBoards": []})
    return _CURRICULUM_CACHE


def get_notes_data() -> Dict[str, Any]:
    global _NOTES_CACHE
    if _NOTES_CACHE is None:
        _NOTES_CACHE = _load_json_file("mock_notes.json", {})
    return _NOTES_CACHE


def get_questions_data() -> List[Dict[str, Any]]:
    global _QUESTIONS_CACHE
    if _QUESTIONS_CACHE is None:
        _QUESTIONS_CACHE = _load_json_file("mock_questions.json", [])
    return _QUESTIONS_CACHE


def get_study_plans_data() -> List[Dict[str, Any]]:
    global _STUDY_PLANS_CACHE
    if _STUDY_PLANS_CACHE is None:
        _STUDY_PLANS_CACHE = _load_json_file("mock_study_plans.json", [])
    return _STUDY_PLANS_CACHE


# ---------------------------------------------------------------------------
# Curriculum & Academic Metadata Operations
# ---------------------------------------------------------------------------
def get_boards() -> List[Dict[str, Any]]:
    """Returns list of supported educational boards with metadata."""
    curr = get_curriculum_data()
    boards_dict = curr.get("boards", {})
    board_list = []
    for bid, bdata in boards_dict.items():
        classes_raw = bdata.get("classes", {})
        classes_avail = list(classes_raw.keys()) if isinstance(classes_raw, dict) else [str(c.get("class")) for c in classes_raw]
        board_list.append({
            "id": bdata.get("id", bid),
            "name": bdata.get("name", bid.upper()),
            "shortName": bdata.get("shortName", bid.upper()),
            "type": bdata.get("type", "national"),
            "website": bdata.get("website", ""),
            "classesAvailable": classes_avail
        })
    return board_list


def get_states() -> List[Dict[str, Any]]:
    """Returns list of 36 Indian states and union territories with exam boards."""
    curr = get_curriculum_data()
    return curr.get("allIndianStatesBoards", [])


def get_classes(board_id: str) -> List[Dict[str, Any]]:
    """Returns available classes for a given board."""
    curr = get_curriculum_data()
    board = curr.get("boards", {}).get(board_id.lower())
    if not board:
        return [{"class": str(c), "name": f"Class {c}", "subjectsCount": 4} for c in range(1, 13)]
    
    classes_raw = board.get("classes", {})
    classes = []
    if isinstance(classes_raw, dict):
        for c_key, c_val in classes_raw.items():
            subs = c_val.get("subjects", {})
            subs_count = len(subs) if isinstance(subs, (dict, list)) else 0
            classes.append({
                "class": str(c_key),
                "name": f"Class {c_key}",
                "subjectsCount": subs_count
            })
    elif isinstance(classes_raw, list):
        for c in classes_raw:
            classes.append({
                "class": str(c.get("class")),
                "name": f"Class {c.get('class')}",
                "subjectsCount": len(c.get("subjects", []))
            })
    return classes


def get_subjects(board_id: str, class_num: str, state_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """Returns subjects for a board and class."""
    curr = get_curriculum_data()
    effective_board = board_id.lower()
    if effective_board in ["state", "stateboard"] and state_id:
        effective_board = state_id.lower()

    board = curr.get("boards", {}).get(effective_board)
    if not board:
        board = curr.get("boards", {}).get("cbse", {})

    classes_raw = board.get("classes", {})
    c_val = None
    if isinstance(classes_raw, dict):
        c_val = classes_raw.get(str(class_num))
    elif isinstance(classes_raw, list):
        for c in classes_raw:
            if str(c.get("class")) == str(class_num):
                c_val = c
                break

    if not c_val:
        return []

    subs = c_val.get("subjects", {})
    subjects = []
    if isinstance(subs, dict):
        for s_key, s_data in subs.items():
            subjects.append({
                "id": s_key,
                "name": s_data.get("name", s_key.title()),
                "icon": s_data.get("icon", "📘"),
                "chaptersCount": len(s_data.get("chapters", [])),
                "description": s_data.get("description", "")
            })
    elif isinstance(subs, list):
        for s in subs:
            subjects.append({
                "id": s.get("id"),
                "name": s.get("name"),
                "icon": s.get("icon", "📘"),
                "chaptersCount": len(s.get("chapters", [])),
                "description": s.get("description", "")
            })
    return subjects


def get_chapters(board_id: str, class_num: str, subject_id: str, state_id: Optional[str] = None) -> List[Dict[str, Any]]:
    """Returns chapters for a board, class, and subject."""
    curr = get_curriculum_data()
    effective_board = board_id.lower()
    if effective_board in ["state", "stateboard"] and state_id:
        effective_board = state_id.lower()

    board = curr.get("boards", {}).get(effective_board)
    if not board:
        board = curr.get("boards", {}).get("cbse", {})

    classes_raw = board.get("classes", {})
    c_val = None
    if isinstance(classes_raw, dict):
        c_val = classes_raw.get(str(class_num))
    elif isinstance(classes_raw, list):
        for c in classes_raw:
            if str(c.get("class")) == str(class_num):
                c_val = c
                break

    if not c_val:
        return []

    subs = c_val.get("subjects", {})
    sub_data = None
    sub_norm = subject_id.lower().replace("-", "_").replace(" ", "")

    if isinstance(subs, dict):
        for s_key, s_val in subs.items():
            k_norm = s_key.lower().replace("-", "_").replace(" ", "")
            name_norm = str(s_val.get("name", "")).lower().replace("-", "_").replace(" ", "")
            if sub_norm in k_norm or sub_norm in name_norm or k_norm in sub_norm:
                sub_data = s_val
                break
    elif isinstance(subs, list):
        for s in subs:
            k_norm = str(s.get("id", "")).lower().replace("-", "_").replace(" ", "")
            name_norm = str(s.get("name", "")).lower().replace("-", "_").replace(" ", "")
            if sub_norm in k_norm or sub_norm in name_norm or k_norm in sub_norm:
                sub_data = s
                break

    if not sub_data:
        return []

    chapters = []
    for ch in sub_data.get("chapters", []):
        chapters.append({
            "id": ch.get("id"),
            "num": ch.get("num"),
            "name": ch.get("name"),
            "topics": ch.get("topics", []),
            "hasAuthoredNotes": ch.get("id") in get_notes_data()
        })
    return chapters


def get_chapter_by_id(chapter_id: str) -> Optional[Dict[str, Any]]:
    """Looks up a chapter across all boards, classes, and subjects."""
    curr = get_curriculum_data()
    for b_key, b_val in curr.get("boards", {}).items():
        classes_raw = b_val.get("classes", {})
        c_items = classes_raw.items() if isinstance(classes_raw, dict) else [(c.get("class"), c) for c in classes_raw]
        for c_num, c_val in c_items:
            subs = c_val.get("subjects", {})
            s_items = subs.items() if isinstance(subs, dict) else [(s.get("id"), s) for s in subs]
            for s_key, s_val in s_items:
                for ch in s_val.get("chapters", []):
                    if ch.get("id") == chapter_id:
                        return {
                            "chapter": ch,
                            "subject": {"id": s_key, "name": s_val.get("name"), "icon": s_val.get("icon")},
                            "board": {"id": b_val.get("id", b_key), "name": b_val.get("name")},
                            "classNum": str(c_num)
                        }
    return None


# ---------------------------------------------------------------------------
# Notes Retrieval
# ---------------------------------------------------------------------------
def get_notes(chapter_id: str, difficulty: str = "Moderate") -> Optional[Dict[str, Any]]:
    """
    Returns chapter notes for a requested difficulty level.
    Supports Beginner, Moderate, and Pro levels.
    """
    notes_db = get_notes_data()
    chapter_notes = notes_db.get(chapter_id)
    if not chapter_notes:
        ch_meta = get_chapter_by_id(chapter_id)
        if ch_meta:
            ch_name = ch_meta["chapter"]["name"]
            sub_name = ch_meta["subject"]["name"]
            board_name = ch_meta["board"]["name"]
            class_num = ch_meta["classNum"]
            from app import build_verified_chapter_notes
            return {
                "chapterId": chapter_id,
                "chapterName": ch_name,
                "subjectName": sub_name,
                "boardName": board_name,
                "classNum": str(class_num),
                "isAuthored": False,
                "level": difficulty,
                "notes": build_verified_chapter_notes(board_name, class_num, sub_name, ch_name, difficulty, "")
            }
        return None

    level_key = difficulty.capitalize()
    if level_key not in ["Beginner", "Moderate", "Pro"]:
        level_key = "Moderate"

    level_content = chapter_notes.get("levels", {}).get(level_key)
    if not level_content:
        level_content = chapter_notes.get("levels", {}).get("Moderate") or list(chapter_notes.get("levels", {}).values())[0]

    return {
        "chapterId": chapter_notes.get("chapterId", chapter_id),
        "chapterName": chapter_notes.get("chapterName", ""),
        "subjectName": chapter_notes.get("subjectName", ""),
        "boardName": chapter_notes.get("boardName", ""),
        "classNum": chapter_notes.get("classNum", ""),
        "isAuthored": True,
        "level": level_key,
        "availableLevels": list(chapter_notes.get("levels", {}).keys()),
        "notes": level_content
    }


# ---------------------------------------------------------------------------
# Question Bank & Quiz Operations
# ---------------------------------------------------------------------------
def get_questions(
    chapter_id: Optional[str] = None,
    subject_id: Optional[str] = None,
    board_id: Optional[str] = None,
    difficulty: Optional[str] = None,
    limit: Optional[int] = None
) -> List[Dict[str, Any]]:
    """Filters questions from the question bank."""
    questions = get_questions_data()
    filtered = []

    for q in questions:
        if chapter_id and q.get("chapterId") != chapter_id:
            continue
        if subject_id and q.get("subjectId") != subject_id.lower():
            continue
        if board_id and q.get("boardId") != board_id.lower():
            continue
        if difficulty and str(q.get("difficulty", "")).lower() != difficulty.lower():
            continue
        filtered.append(q)

    # If filtered result is empty for a specific chapter, return subject or general questions
    if not filtered and chapter_id:
        ch_meta = get_chapter_by_id(chapter_id)
        if ch_meta:
            sub_id = ch_meta["subject"]["id"]
            for q in questions:
                if q.get("subjectId") == sub_id.lower() or sub_id.lower() in str(q.get("subjectId")):
                    filtered.append(q)

    if limit and limit > 0:
        return filtered[:limit]
    return filtered


def grade_quiz(chapter_id: str, submissions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Accurately validates quiz submissions against question database.
    Calculates score, percentage, passed status, and detailed explanations.
    """
    questions_list = get_questions_data()
    q_map = {q["id"]: q for q in questions_list}

    correct_count = 0
    total_evaluated = 0
    breakdown = []

    for sub in submissions:
        qid = sub.get("questionId")
        q = q_map.get(qid)
        if not q:
            continue

        total_evaluated += 1
        sel_answer = sub.get("selectedAnswer")
        sel_opt = sub.get("selectedOption")
        options = q.get("options", [])
        correct_answer = q.get("correctAnswer")
        correct_index = q.get("correctOptionIndex")

        is_correct = False
        user_answer_text = ""

        if sel_answer is not None:
            user_answer_text = str(sel_answer).strip()
            if correct_answer is not None:
                is_correct = (user_answer_text.lower() == str(correct_answer).strip().lower())
            elif correct_index is not None and 0 <= correct_index < len(options):
                is_correct = (user_answer_text.lower() == str(options[correct_index]).strip().lower())
        elif sel_opt is not None:
            try:
                opt_idx = int(sel_opt)
                if 0 <= opt_idx < len(options):
                    user_answer_text = options[opt_idx]
                if correct_index is not None:
                    is_correct = (opt_idx == correct_index)
                elif correct_answer is not None and 0 <= opt_idx < len(options):
                    is_correct = (str(options[opt_idx]).strip().lower() == str(correct_answer).strip().lower())
            except (ValueError, TypeError):
                is_correct = False

        if is_correct:
            correct_count += 1

        breakdown.append({
            "questionId": qid,
            "question": q.get("question", ""),
            "userAnswer": user_answer_text,
            "correctAnswer": correct_answer or (options[correct_index] if (correct_index is not None and 0 <= correct_index < len(options)) else ""),
            "isCorrect": is_correct,
            "explanation": q.get("explanation", "Standard verified academic solution."),
            "difficulty": q.get("difficulty", "Medium")
        })

    score_pct = round((correct_count / total_evaluated * 100), 1) if total_evaluated > 0 else 0.0

    return {
        "chapterId": chapter_id,
        "score": correct_count,
        "total": total_evaluated,
        "percentage": score_pct,
        "passed": score_pct >= 60.0,
        "grade": "Outstanding" if score_pct >= 90 else ("Excellent" if score_pct >= 75 else ("Good" if score_pct >= 50 else "Needs Practice")),
        "timestamp": "2026-10-16T18:00:00Z",
        "breakdown": breakdown
    }


# ---------------------------------------------------------------------------
# Search Across Educational Content
# ---------------------------------------------------------------------------
def search_content(query: str, limit: int = 25) -> Dict[str, Any]:
    """
    Searches across boards, subjects, chapters, notes, and question bank.
    Returns categorized, clickable result set.
    """
    q = (query or "").strip().lower()
    if not q:
        return {"query": query, "total": 0, "results": {"subjects": [], "chapters": [], "notes": [], "questions": []}}

    curr = get_curriculum_data()
    notes_db = get_notes_data()
    questions_list = get_questions_data()

    sub_matches = []
    ch_matches = []
    notes_matches = []
    q_matches = []

    seen_ch = set()
    for b_key, b_val in curr.get("boards", {}).items():
        b_name = b_val.get("name", b_key.upper())
        classes_raw = b_val.get("classes", {})
        c_items = classes_raw.items() if isinstance(classes_raw, dict) else [(c.get("class"), c) for c in classes_raw]
        for c_num, c_val in c_items:
            subs = c_val.get("subjects", {})
            s_items = subs.items() if isinstance(subs, dict) else [(s.get("id"), s) for s in subs]
            for s_key, s_val in s_items:
                s_name = s_val.get("name", "")
                if q in s_name.lower():
                    sub_matches.append({
                        "id": s_key,
                        "title": s_name,
                        "board": b_name,
                        "classNum": str(c_num),
                        "type": "subject",
                        "description": f"{b_name} Class {c_num} • {len(s_val.get('chapters', []))} chapters"
                    })

                for ch in s_val.get("chapters", []):
                    ch_id = ch.get("id")
                    ch_name = ch.get("name", "")
                    if (q in ch_name.lower() or any(q in t.lower() for t in ch.get("topics", []))) and ch_id not in seen_ch:
                        seen_ch.add(ch_id)
                        ch_matches.append({
                            "id": ch_id,
                            "title": ch_name,
                            "subject": s_name,
                            "board": b_name,
                            "classNum": str(c_num),
                            "type": "chapter",
                            "topics": ch.get("topics", [])[:3]
                        })

    # Search Notes
    for ch_id, ndata in notes_db.items():
        ch_name = ndata.get("chapterName", "")
        for lvl_name, lvl_data in ndata.get("levels", {}).items():
            overview = lvl_data.get("overview", "")
            if q in ch_name.lower() or q in overview.lower():
                notes_matches.append({
                    "chapterId": ch_id,
                    "title": f"{ch_name} ({lvl_name} Notes)",
                    "level": lvl_name,
                    "snippet": overview[:140] + "...",
                    "subject": ndata.get("subjectName", ""),
                    "board": ndata.get("boardName", ""),
                    "type": "note"
                })
                break

    # Search Questions Bank
    for q_item in questions_list:
        q_text = q_item.get("question", "")
        if q in q_text.lower():
            q_matches.append({
                "id": q_item.get("id"),
                "question": q_text[:120] + "...",
                "chapterId": q_item.get("chapterId"),
                "difficulty": q_item.get("difficulty"),
                "type": "question"
            })

    total_count = len(sub_matches) + len(ch_matches) + len(notes_matches) + len(q_matches)
    return {
        "query": query,
        "total": total_count,
        "results": {
            "subjects": sub_matches[:limit],
            "chapters": ch_matches[:limit],
            "notes": notes_matches[:limit],
            "questions": q_matches[:limit]
        }
    }


# ---------------------------------------------------------------------------
# Study Plans & Student Progress
# ---------------------------------------------------------------------------
def get_study_plans(board_id: Optional[str] = None, class_num: Optional[str] = None) -> List[Dict[str, Any]]:
    """Returns available study plans filtered by board/class if requested."""
    plans = get_study_plans_data()
    if not board_id and not class_num:
        return plans
    filtered = []
    for p in plans:
        if board_id and p.get("board") != board_id.lower():
            continue
        if class_num and str(p.get("classNum")) != str(class_num):
            continue
        filtered.append(p)
    return filtered or plans


def get_progress(user_id: str = "guest_student") -> Dict[str, Any]:
    """Retrieves student progress state with resilient defaults."""
    if user_id in _PROGRESS_STORE:
        return _PROGRESS_STORE[user_id]
    default_progress = {
        "userId": user_id,
        "completedChapters": ["cbse_10_sci_1"],
        "recentChapters": [
            {"id": "cbse_10_sci_1", "name": "Chemical Reactions and Equations", "subject": "Science", "lastViewed": "Today"}
        ],
        "quizAttempts": [
            {"chapterId": "cbse_10_sci_1", "score": 4, "total": 5, "percentage": 80.0, "timestamp": "2026-10-16T17:30:00Z"}
        ],
        "studyPlanProgress": {
            "cbse-10-sprint": {"completedTasks": ["task-1", "task-2"], "totalTasks": 6, "percentage": 33.3}
        },
        "stats": {
            "notesRead": 3,
            "questionsAttempted": 10,
            "questionsCorrect": 8,
            "overallAccuracy": 80.0
        }
    }
    _PROGRESS_STORE[user_id] = default_progress
    return default_progress


def update_progress(user_id: str, new_data: Dict[str, Any]) -> Dict[str, Any]:
    """Updates student progress state safely."""
    current = get_progress(user_id)
    if not isinstance(new_data, dict):
        return current

    for key, val in new_data.items():
        if key == "completedChapters" and isinstance(val, list):
            current["completedChapters"] = list(set(current.get("completedChapters", []) + val))
        elif key == "quizAttempts" and isinstance(val, list):
            current["quizAttempts"] = (current.get("quizAttempts", []) + val)[-20:]
        elif key == "stats" and isinstance(val, dict):
            current.setdefault("stats", {}).update(val)
        else:
            current[key] = val

    _PROGRESS_STORE[user_id] = current
    return current
