/* =========================================================
   RAVAND - App logic
   ========================================================= */

let currentTemplate = null;   // آبجکت تمپلیت انتخاب‌شده از TEMPLATES
let currentData = {};         // مقادیر واردشده توسط فاندر

const templateGrid   = document.getElementById("templateGrid");
const formSection     = document.getElementById("formSection");
const certForm        = document.getElementById("certForm");
const previewSection  = document.getElementById("previewSection");
const certPreview     = document.getElementById("certPreview");
const downloadPngBtn  = document.getElementById("downloadPngBtn");
const downloadPdfBtn  = document.getElementById("downloadPdfBtn");

/* ---------- 1) رندر کارت‌های انتخاب قالب ---------- */
function renderTemplateGrid(){
  templateGrid.innerHTML = "";
  Object.values(TEMPLATES).forEach(tpl => {
    const el = document.createElement("div");
    el.className = "template-option";
    el.dataset.id = tpl.id;
    el.innerHTML = `
      <div class="check">✓</div>
      <img src="${tpl.thumb}" alt="${tpl.title}">
      <div class="tname">${tpl.title}</div>
    `;
    el.addEventListener("click", () => selectTemplate(tpl.id));
    templateGrid.appendChild(el);
  });
}

function selectTemplate(id){
  currentTemplate = TEMPLATES[id];
  currentData = {};

  document.querySelectorAll(".template-option").forEach(o => {
    o.classList.toggle("selected", o.dataset.id === id);
  });

  renderForm();
  formSection.style.display = "block";
  previewSection.style.display = "none";
  formSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- 2) رندر فرم داینامیک بر اساس فیلدهای تمپلیت ---------- */
function renderForm(){
  certForm.innerHTML = "";

  currentTemplate.fields.forEach(field => {
    const wrap = document.createElement("div");
    wrap.className = "form-group";

    if (field.type === "text") {
      wrap.innerHTML = `
        <label for="f_${field.key}">${field.label}</label>
        <input type="text" id="f_${field.key}" name="${field.key}" placeholder="${field.placeholder || ""}">
      `;
    } else if (field.type === "skill") {
      wrap.innerHTML = `
        <div class="skill-group">
          <div class="skill-title">${field.label}</div>
          <div class="skill-options">
            <label>
              <input type="radio" name="${field.key}" value="ok">
              OK
            </label>
            <label>
              <input type="radio" name="${field.key}" value="good">
              GOOD
            </label>
            <label>
              <input type="radio" name="${field.key}" value="excellent">
              EXCELLENT
            </label>
          </div>
        </div>
      `;
    }
    certForm.appendChild(wrap);
  });

  const submitBtn = document.createElement("button");
  submitBtn.type = "button";
  submitBtn.className = "btn btn-primary generate-btn";
  submitBtn.textContent = "ثبت و نمایش کارنامه";
  submitBtn.addEventListener("click", handleGenerate);
  certForm.appendChild(submitBtn);
}

/* ---------- 3) جمع‌آوری دیتا و ساخت پیش‌نمایش ---------- */
function handleGenerate(){
  currentData = {};

  currentTemplate.fields.forEach(field => {
    if (field.type === "text") {
      const input = document.getElementById(`f_${field.key}`);
      currentData[field.key] = (input.value || field.placeholder || "").trim();
    } else if (field.type === "skill") {
      const checked = certForm.querySelector(`input[name="${field.key}"]:checked`);
      currentData[field.key] = checked ? checked.value : null;
    }
  });

  renderPreview();
  previewSection.style.display = "block";
  previewSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- 4) ساخت پیش‌نمایش روی تصویر ---------- */
function renderPreview(){
  const tpl = currentTemplate;
  certPreview.style.setProperty("--ar", tpl.fullWidth / tpl.fullHeight);
  certPreview.innerHTML = `<img class="bg" src="${tpl.bg}" alt="cert">`;

  const pct = (val, full) => (val / full) * 100;

  tpl.fields.forEach(field => {
    if (field.type === "text") {
      const value = currentData[field.key];
      if (!value) return;
      const box = field.box;
      const div = document.createElement("div");
      div.className = "cert-field";
      div.dataset.fieldKey = field.key;
      div.textContent = value;
      div.style.left   = pct(box.x, tpl.fullWidth) + "%";
      div.style.top    = pct(box.y, tpl.fullHeight) + "%";
      div.style.width  = pct(box.w, tpl.fullWidth) + "%";
      div.style.height = pct(box.h, tpl.fullHeight) + "%";
      div.style.fontSize = (field.fontSize / tpl.fullWidth * 100) + "cqw"; // fallback handled below
      div.style.fontWeight = field.weight || 600;
      div.style.justifyContent = field.align === "center" ? "center" : "flex-start";
      // فونت را متناسب با درصد عرض تصویر تنظیم می‌کنیم (نسبت به baseline فول‌رزولوشن)
      div.style.fontSize = (field.fontSize / tpl.fullWidth) * 100 + "vw";
      certPreview.appendChild(div);
    }

    if (field.type === "skill") {
      const value = currentData[field.key];
      if (!value) return;
      const col = tpl.skillColumns[value];
      if (!col) return;
      const row = field.row;
      const div = document.createElement("div");
      div.className = "cert-check";
      div.textContent = "✔";
      div.style.left   = pct(col.x, tpl.fullWidth) + "%";
      div.style.top    = pct(row.y, tpl.fullHeight) + "%";
      div.style.width  = pct(col.w, tpl.fullWidth) + "%";
      div.style.height = pct(row.h, tpl.fullHeight) + "%";
      div.style.fontSize = (row.h / tpl.fullHeight) * 60 + "vw" ;
      div.style.fontSize = (34 / tpl.fullWidth) * 100 + "vw";
      certPreview.appendChild(div);
    }
  });

  // اصلاح سایز فونت بر اساس عرض واقعی کانتینر (به‌جای vw که به viewport وابسته است)
  requestAnimationFrame(fixFontSizes);
}

function fixFontSizes(){
  const containerWidth = certPreview.getBoundingClientRect().width;
  const tpl = currentTemplate;
  const scale = containerWidth / tpl.fullWidth;

  certPreview.querySelectorAll(".cert-field").forEach(el => {
    const field = tpl.fields.find(f => f.key === el.dataset.fieldKey);
    if (field) el.style.fontSize = (field.fontSize * scale) + "px";
  });
  certPreview.querySelectorAll(".cert-check").forEach(el => {
    el.style.fontSize = (34 * scale) + "px";
  });
}

window.addEventListener("resize", () => {
  if (currentTemplate && certPreview.innerHTML) fixFontSizes();
});

/* ---------- 5) دانلود PNG / PDF ---------- */
async function exportCanvas(){
  return await html2canvas(certPreview, {
    scale: 3,          // کیفیت بالا برای پرینت
    useCORS: true,
    backgroundColor: null,
  });
}

downloadPngBtn.addEventListener("click", async () => {
  downloadPngBtn.textContent = "در حال آماده‌سازی...";
  try {
    const canvas = await exportCanvas();
    const link = document.createElement("a");
    link.download = `certificate_${(currentData.studentName || "student").replace(/\s+/g,"_")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } finally {
    downloadPngBtn.textContent = "دانلود PNG";
  }
});

downloadPdfBtn.addEventListener("click", async () => {
  downloadPdfBtn.textContent = "در حال آماده‌سازی...";
  try {
    const canvas = await exportCanvas();
    const imgData = canvas.toDataURL("image/png");
    const { jsPDF } = window.jspdf;
    const orientation = canvas.width >= canvas.height ? "landscape" : "portrait";
    const pdf = new jsPDF({
      orientation,
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`certificate_${(currentData.studentName || "student").replace(/\s+/g,"_")}.pdf`);
  } finally {
    downloadPdfBtn.textContent = "دانلود PDF";
  }
});

/* ---------- شروع ---------- */
renderTemplateGrid();
