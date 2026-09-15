/* =========================================================
   RAVAND - Template configuration
   هر تمپلیت شامل: تصویر پس‌زمینه، ابعاد اصلی (برای محاسبه درصد)،
   و لیست فیلدهایی که کاربر باید پر کند + موقعیت دقیق هرکدوم روی طرح.
   موقعیت‌ها بر اساس پیکسل روی تصویر اصلی (فول رزولوشن) استخراج شده‌اند
   و در کد به درصد تبدیل می‌شن تا روی هر سایز صفحه درست نمایش داده شن.
   ========================================================= */

const TEMPLATES = {
  kids: {
    id: "kids",
    title: "قالب کلاسیک (کودکان)",
    thumb: "assets/templates/kids-bg.jpg",
    bg: "assets/templates/kids-bg.jpg",
    fullWidth: 2984,
    fullHeight: 2108,
    fields: [
      { key: "teacherName", label: "نام معلم", type: "text", placeholder: "مثال: خانم احمدی",
        box: { x: 1268, y: 678, w: 690, h: 53 }, align: "center", fontSize: 34, weight: 600 },

      { key: "studentName", label: "نام دانش‌آموز", type: "text", placeholder: "مثال: علی محمدی",
        box: { x: 1268, y: 782, w: 699, h: 53 }, align: "center", fontSize: 34, weight: 600 },

      { key: "oral", label: "نمره Oral", type: "text", placeholder: "مثال: 95",
        box: { x: 730, y: 888, w: 138, h: 58 }, align: "center", fontSize: 34, weight: 700 },

      { key: "test", label: "نمره Test", type: "text", placeholder: "مثال: 90",
        box: { x: 1491, y: 888, w: 138, h: 58 }, align: "center", fontSize: 34, weight: 700 },

      { key: "overall", label: "نمره کل (Overall)", type: "text", placeholder: "مثال: 92",
        box: { x: 2377, y: 889, w: 138, h: 58 }, align: "center", fontSize: 34, weight: 700 },

      { key: "book", label: "نام کتاب", type: "text", placeholder: "مثال: Evolve 2",
        box: { x: 768, y: 1001, w: 317, h: 48 }, align: "center", fontSize: 30, weight: 600 },

      { key: "term", label: "ترم", type: "text", placeholder: "مثال: Term 2 A",
        box: { x: 2023, y: 985, w: 326, h: 63 }, align: "center", fontSize: 34, weight: 600 },

      { key: "date", label: "تاریخ", type: "text", placeholder: "مثال: 24 May 2024",
        box: { x: 1735, y: 1909, w: 260, h: 30 }, align: "center", fontSize: 22, weight: 500 },

      // ردیف‌های مهارت -> برای هرکدوم کاربر یکی از سه ستون رو انتخاب می‌کند
      { key: "skill_activity", label: "Class Activity", type: "skill",
        row: { y: 1256, h: 55 } },
      { key: "skill_homework", label: "Homework", type: "skill",
        row: { y: 1338, h: 55 } },
      { key: "skill_speaking", label: "Speaking", type: "skill",
        row: { y: 1430, h: 55 } },
      { key: "skill_listening", label: "Listening", type: "skill",
        row: { y: 1509, h: 55 } },
      { key: "skill_writing", label: "Writing", type: "skill",
        row: { y: 1590, h: 55 } },
    ],
    // موقعیت ستون‌های OK / GOOD / EXCELLENT برای فیلدهای نوع skill
    skillColumns: {
      ok: { x: 1479, w: 46 },
      good: { x: 1844, w: 46 },
      excellent: { x: 2229, w: 46 },
    },
  },

  adults: {
    id: "adults",
    title: "قالب مدرن (بزرگسالان)",
    thumb: "assets/templates/adults-bg.jpg",
    bg: "assets/templates/adults-bg.jpg",
    fullWidth: 1492,
    fullHeight: 1054,
    fields: [
      { key: "studentName", label: "نام دانش‌آموز", type: "text", placeholder: "مثال: Taha Taremi",
        box: { x: 473, y: 442, w: 565, h: 55 }, align: "center", fontSize: 40, weight: 700 },

      { key: "course", label: "عنوان دوره", type: "text", placeholder: "مثال: English Language Course - Advanced Level",
        box: { x: 420, y: 652, w: 651, h: 24 }, align: "center", fontSize: 17, weight: 500 },

      { key: "exam", label: "نمره Exam", type: "text", placeholder: "مثال: 99/100",
        box: { x: 483, y: 781, w: 78, h: 20 }, align: "center", fontSize: 16, weight: 700 },

      { key: "oral", label: "نمره Oral", type: "text", placeholder: "مثال: 99/100",
        box: { x: 710, y: 782, w: 78, h: 20 }, align: "center", fontSize: 16, weight: 700 },

      { key: "total", label: "نمره کل (Total)", type: "text", placeholder: "مثال: 99/100",
        box: { x: 934, y: 780, w: 78, h: 20 }, align: "center", fontSize: 16, weight: 700 },

      { key: "date", label: "تاریخ", type: "text", placeholder: "مثال: 24 May 2024",
        box: { x: 1042, y: 885, w: 157, h: 20 }, align: "center", fontSize: 15, weight: 500 },
    ],
  },
};
