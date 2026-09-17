/* =========================================================
   RAVAND - Template configuration
   Each template has: background image, native pixel size
   (used to compute % positions), and the list of fields the
   founder must fill, with exact px coordinates taken from the
   original PSD layers.
   ========================================================= */

const TEMPLATES = {
  kids: {
    id: "kids",
    title: "Kids",
    thumb: "assets/templates/kids-thumb.jpg",
    bg: "assets/templates/kids-bg.png",
    fullWidth: 2984,
    fullHeight: 2108,
    fields: [
      { key: "teacherName", label: "Teacher's Name", type: "text", placeholder: "e.g. Ms. Ahmadi",
        box: { x: 1268, y: 668, w: 690, h: 70 }, align: "center", fontSize: 46, weight: 700 },

      { key: "studentName", label: "Student's Name", type: "text", placeholder: "e.g. Ali Mohammadi",
        box: { x: 1268, y: 772, w: 699, h: 70 }, align: "center", fontSize: 46, weight: 700 },

      { key: "oral", label: "Oral Score", type: "text", placeholder: "e.g. 95",
        box: { x: 730, y: 875, w: 138, h: 70 }, align: "center", fontSize: 44, weight: 800 },

      { key: "test", label: "Test Score", type: "text", placeholder: "e.g. 90",
        box: { x: 1491, y: 875, w: 138, h: 70 }, align: "center", fontSize: 44, weight: 800 },

      { key: "overall", label: "Overall Score", type: "text", placeholder: "e.g. 92",
        box: { x: 2377, y: 876, w: 138, h: 70 }, align: "center", fontSize: 44, weight: 800 },

      { key: "book", label: "Book", type: "text", placeholder: "e.g. Evolve 2",
        box: { x: 768, y: 992, w: 317, h: 60 }, align: "center", fontSize: 38, weight: 700 },

      { key: "term", label: "Term", type: "text", placeholder: "e.g. Term 2 A",
        box: { x: 2023, y: 975, w: 326, h: 70 }, align: "center", fontSize: 42, weight: 700 },

      { key: "date", label: "Exam Date", type: "date",
        box: { x: 1700, y: 1900, w: 340, h: 34 }, align: "center", fontSize: 26, weight: 600 },

      // Skill rows -> for each one the user picks OK / GOOD / EXCELLENT
      { key: "skill_activity", label: "Class Activity", type: "skill",
        row: { y: 1250, h: 55 } },
      { key: "skill_homework", label: "Homework", type: "skill",
        row: { y: 1332, h: 55 } },
      { key: "skill_speaking", label: "Speaking", type: "skill",
        row: { y: 1424, h: 55 } },
      { key: "skill_listening", label: "Listening", type: "skill",
        row: { y: 1503, h: 55 } },
      { key: "skill_writing", label: "Writing", type: "skill",
        row: { y: 1584, h: 55 } },
    ],
    // Column x-positions for OK / GOOD / EXCELLENT (used by skill fields)
    skillColumns: {
      ok: { x: 1471, w: 62 },
      good: { x: 1836, w: 62 },
      excellent: { x: 2221, w: 62 },
    },
  },

  adults: {
    id: "adults",
    title: "Adults",
    thumb: "assets/templates/adults-thumb.jpg",
    bg: "assets/templates/adults-bg.png",
    fullWidth: 1492,
    fullHeight: 1054,
    fields: [
      { key: "studentName", label: "Student's Name", type: "text", placeholder: "e.g. Taha Taremi",
        box: { x: 460, y: 435, w: 590, h: 65 }, align: "center", fontSize: 48, weight: 700 },

      { key: "course", label: "Course Title", type: "text", placeholder: "e.g. English Language Course - Advanced Level",
        box: { x: 380, y: 648, w: 731, h: 30 }, align: "center", fontSize: 21, weight: 600 },

      { key: "exam", label: "Exam Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 471, y: 774, w: 100, h: 26 }, align: "center", fontSize: 20, weight: 700 },

      { key: "oral", label: "Oral Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 698, y: 775, w: 100, h: 26 }, align: "center", fontSize: 20, weight: 700 },

      { key: "total", label: "Total Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 922, y: 773, w: 100, h: 26 }, align: "center", fontSize: 20, weight: 700 },

      { key: "date", label: "Certificate Date", type: "date",
        box: { x: 1020, y: 880, w: 200, h: 26 }, align: "center", fontSize: 18, weight: 600 },
    ],
  },
};
