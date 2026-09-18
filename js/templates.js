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
        box: { x: 1268, y: 668, w: 690, h: 70 }, align: "center", fontSize: 64, weight: 700 },

      { key: "studentName", label: "Student's Name", type: "text", placeholder: "e.g. Ali Mohammadi",
        box: { x: 1268, y: 772, w: 699, h: 70 }, align: "center", fontSize: 64, weight: 700 },

      { key: "oral", label: "Oral Score", type: "text", placeholder: "e.g. 95",
        box: { x: 730, y: 865, w: 150, h: 80 }, align: "center", valign: "bottom", fontSize: 70, weight: 800 },

      { key: "test", label: "Test Score", type: "text", placeholder: "e.g. 90",
        box: { x: 1491, y: 865, w: 150, h: 80 }, align: "center", valign: "bottom", fontSize: 70, weight: 800 },

      { key: "overall", label: "Overall Score", type: "text", placeholder: "e.g. 92",
        box: { x: 2377, y: 865, w: 150, h: 80 }, align: "center", valign: "bottom", fontSize: 70, weight: 800 },

      { key: "book", label: "Book", type: "text", placeholder: "e.g. Evolve 2",
        box: { x: 768, y: 988, w: 600, h: 70 }, align: "center", valign: "bottom", fontSize: 62, weight: 700 },

      { key: "term", label: "Term", type: "text", placeholder: "e.g. Term 2 A",
        box: { x: 2023, y: 988, w: 326, h: 70 }, align: "center", valign: "bottom", fontSize: 62, weight: 700 },

      { key: "date", label: "Exam Date", type: "date",
        // this box is the ACTUAL date line on the certificate (above the
        // static "DATE" caption); it was previously (wrongly) pointed at the
        // caption's own position, which is why two different dates used to
        // show up stacked on top of each other.
        box: { x: 1642, y: 1826, w: 260, h: 40 }, align: "center", fontSize: 34, weight: 600 },

      // Skill rows -> for each one the user picks OK / GOOD / EXCELLENT
      // (row centers measured directly from the printed circles on the
      // artwork, not guessed - so the checkmark lands dead-center every time)
      { key: "skill_activity", label: "Class Activity", type: "skill",
        row: { y: 1259, h: 58 } },
      { key: "skill_homework", label: "Homework", type: "skill",
        row: { y: 1342, h: 58 } },
      { key: "skill_speaking", label: "Speaking", type: "skill",
        row: { y: 1430, h: 58 } },
      { key: "skill_listening", label: "Listening", type: "skill",
        row: { y: 1511, h: 58 } },
      { key: "skill_writing", label: "Writing", type: "skill",
        row: { y: 1592, h: 58 } },
    ],
    // Column x-positions for OK / GOOD / EXCELLENT (measured from the actual
    // printed circles so the checkmark fills the ring instead of floating
    // near it)
    skillColumns: {
      ok: { x: 1467, w: 60 },
      good: { x: 1832, w: 60 },
      excellent: { x: 2216, w: 60 },
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
        box: { x: 460, y: 430, w: 590, h: 76 }, align: "center", fontSize: 64, weight: 700 },

      { key: "course", label: "Course Title", type: "text", placeholder: "e.g. English Language Course - Advanced Level",
        box: { x: 380, y: 648, w: 731, h: 30 }, align: "center", fontSize: 24, weight: 600 },

      { key: "exam", label: "Exam Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 471, y: 774, w: 100, h: 26 }, align: "center", fontSize: 23, weight: 700 },

      { key: "oral", label: "Oral Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 698, y: 775, w: 100, h: 26 }, align: "center", fontSize: 23, weight: 700 },

      { key: "total", label: "Total Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 922, y: 773, w: 100, h: 26 }, align: "center", fontSize: 23, weight: 700 },

      { key: "date", label: "Certificate Date", type: "date",
        box: { x: 1020, y: 880, w: 200, h: 26 }, align: "center", fontSize: 22, weight: 600 },
    ],
  },
};
