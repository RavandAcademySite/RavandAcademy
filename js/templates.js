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
        box: { x: 692, y: 988, w: 600, h: 70 }, align: "center", valign: "bottom", fontSize: 62, weight: 700 },

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
        row: { y: 1265.3, h: 58, checkDy: -37.3 } },
      { key: "skill_homework", label: "Homework", type: "skill",
        row: { y: 1348.7, h: 58, checkDy: -38.7 } },
      { key: "skill_speaking", label: "Speaking", type: "skill",
        row: { y: 1431.8, h: 58, checkDy: -29.8 } },
      { key: "skill_listening", label: "Listening", type: "skill",
        row: { y: 1515.0, h: 58, checkDy: -34.0 } },
      { key: "skill_writing", label: "Writing", type: "skill",
        row: { y: 1597.2, h: 58, checkDy: -35.2 } },
    ],
    // Column x-positions for OK / GOOD / EXCELLENT. x + w/2 is the exact CENTER
    // of each printed ring, measured from kids-bg.png (rings are 60px wide).
    // (Row centers above are measured the same way: y + h/2.)
    skillColumns: {
      ok:        { x: 1467.6, w: 60, checkDx: -17.6 },
      good:      { x: 1832.1, w: 60, checkDx: -16.6 },
      excellent: { x: 2216.3, w: 60, checkDx: -16.3 },
    },
    // Checkmark artwork, traced from the approved reference file
    // ("kodakan nahayi por shode"). `path` is drawn in a 44x54 box whose
    // top-left corner sits at (dx, dy) from the ring's center - so the tick's
    // long stroke intentionally sticks out past the ring's top-right, exactly
    // like the reference. Do not scale or re-center it.
    // dx / dy below are only the fallback (average); the exact offsets copied
    // from the reference live on each column (checkDx) and each row (checkDy)
    // because the reference is not perfectly uniform from row to row.
    checkMark: {
      path: "M15.5,53.9 L13.7,53.5 L12.5,52.3 L0.4,32.5 L-0.3,28.5 L0.2,25.5 L2.5,23.2 L3.5,23.2 L4.5,23.8 L6.7,26.5 L14.5,39.4 L15.5,39.0 L38.3,1.5 L39.5,0.0 L41.5,-0.7 L43.5,0.9 L44.5,3.5 L44.7,5.5 L43.9,8.5 L17.9,51.5 Z",
      viewBox: [-2, -2, 48, 58],   // x, y, w, h  (44x54 glyph + 2px safety margin)
      dx: -16.9,
      dy: -35.0,
      color: "#1f3d2b",
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
        box: { x: 471, y: 782, w: 100, h: 26 }, align: "center", fontSize: 23, weight: 700 },

      { key: "oral", label: "Oral Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 698, y: 783, w: 100, h: 26 }, align: "center", fontSize: 23, weight: 700 },

      { key: "total", label: "Total Score", type: "text", placeholder: "e.g. 99/100",
        box: { x: 922, y: 781, w: 100, h: 26 }, align: "center", fontSize: 23, weight: 700 },

      { key: "date", label: "Certificate Date", type: "date",
        box: { x: 1020, y: 880, w: 200, h: 26 }, align: "center", fontSize: 22, weight: 600 },
    ],
  },
};
