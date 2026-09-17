/* =========================================================
   RAVAND - App logic
   ========================================================= */

let currentTemplate = null;   // selected template object from TEMPLATES
let currentData = {};         // values entered by the founder

const templateGrid    = document.getElementById("templateGrid");
const formSection      = document.getElementById("formSection");
const certForm         = document.getElementById("certForm");
const previewSection   = document.getElementById("previewSection");
const certPreview      = document.getElementById("certPreview");
const downloadPngBtn   = document.getElementById("downloadPngBtn");
const downloadPdfBtn   = document.getElementById("downloadPdfBtn");

const MIN_DATE = "2020-01-01";

/* ---------- checkmark SVG (crisp at any size) ---------- */
const CHECK_SVG = `
<svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 21 L16 30 L34 9" fill="none" stroke="#1f3d2b"
        stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

/* ---------- date helpers ---------- */
function formatDateDisplay(isoStr){
  if (!isoStr) return "";
  const d = new Date(isoStr + "T00:00:00");
  if (isNaN(d)) return isoStr;
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}
function todayISO(){
  return new Date().toISOString().slice(0,10);
}

/* ---------- 1) render template selection cards ---------- */
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

/* ---------- 2) render the dynamic form ---------- */
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
    } else if (field.type === "date") {
      wrap.innerHTML = `
        <label for="f_${field.key}">${field.label}</label>
        <input type="date" id="f_${field.key}" name="${field.key}" min="${MIN_DATE}" value="${todayISO()}">
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
  submitBtn.textContent = "Generate Report Card";
  submitBtn.addEventListener("click", handleGenerate);
  certForm.appendChild(submitBtn);
}

/* ---------- 3) collect data & build preview ---------- */
function handleGenerate(){
  currentData = {};

  currentTemplate.fields.forEach(field => {
    if (field.type === "text") {
      const input = document.getElementById(`f_${field.key}`);
      currentData[field.key] = (input.value || field.placeholder || "").trim();
    } else if (field.type === "date") {
      const input = document.getElementById(`f_${field.key}`);
      currentData[field.key] = input.value || todayISO();
      currentData[field.key + "_display"] = formatDateDisplay(currentData[field.key]);
    } else if (field.type === "skill") {
      const checked = certForm.querySelector(`input[name="${field.key}"]:checked`);
      currentData[field.key] = checked ? checked.value : null;
    }
  });

  renderPreview();
  previewSection.style.display = "block";
  previewSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ---------- 4) build the on-screen (responsive) preview ---------- */
function buildCertLayer(container, tpl, scale){
  // scale = px multiplier from native template px -> container px (1 = full native res)
  container.innerHTML = `<img class="bg" src="${tpl.bg}" alt="cert">`;

  tpl.fields.forEach(field => {
    if (field.type === "text" || field.type === "date") {
      const value = field.type === "date"
        ? currentData[field.key + "_display"]
        : currentData[field.key];
      if (!value) return;
      const box = field.box;
      const div = document.createElement("div");
      div.className = "cert-field";
      div.dataset.fieldKey = field.key;
      div.textContent = value;
      div.style.left   = (box.x * scale) + "px";
      div.style.top    = (box.y * scale) + "px";
      div.style.width  = (box.w * scale) + "px";
      div.style.height = (box.h * scale) + "px";
      div.style.fontSize = (field.fontSize * scale) + "px";
      div.style.fontWeight = field.weight || 600;
      div.style.justifyContent = field.align === "center" ? "center" : "flex-start";
      container.appendChild(div);
    }

    if (field.type === "skill") {
      const value = currentData[field.key];
      if (!value) return;
      const col = tpl.skillColumns[value];
      if (!col) return;
      const row = field.row;
      const div = document.createElement("div");
      div.className = "cert-check";
      div.innerHTML = CHECK_SVG;
      div.style.left   = (col.x * scale) + "px";
      div.style.top    = (row.y * scale) + "px";
      div.style.width  = (col.w * scale) + "px";
      div.style.height = (row.h * scale) + "px";
      container.appendChild(div);
    }
  });
}

function renderPreview(){
  const tpl = currentTemplate;
  certPreview.style.setProperty("--ar", tpl.fullWidth / tpl.fullHeight);
  certPreview.style.position = "relative";

  // render responsively based on the current rendered width of the container
  const containerWidth = certPreview.getBoundingClientRect().width || 480;
  const scale = containerWidth / tpl.fullWidth;
  buildCertLayer(certPreview, tpl, scale);
}

window.addEventListener("resize", () => {
  if (currentTemplate && previewSection.style.display !== "none") renderPreview();
});

/* ---------- 5) high-resolution export ----------
   Instead of screenshotting the small responsive preview (which caps
   quality at the on-screen pixel size), we build an off-screen clone at
   the template's FULL native resolution and capture that with html2canvas
   at an extra supersampling factor for crisp PNG/PDF output. */
async function buildHiResCanvas(){
  const tpl = currentTemplate;

  const hidden = document.createElement("div");
  hidden.style.position = "fixed";
  hidden.style.left = "-99999px";
  hidden.style.top = "0";
  hidden.style.width = tpl.fullWidth + "px";
  hidden.style.height = tpl.fullHeight + "px";
  hidden.style.overflow = "hidden";
  document.body.appendChild(hidden);

  buildCertLayer(hidden, tpl, 1); // scale 1 = native px, matches PSD coordinates exactly

  // wait for the background image to fully load before capturing
  const bgImg = hidden.querySelector("img.bg");
  if (bgImg && !bgImg.complete) {
    await new Promise(resolve => { bgImg.onload = resolve; bgImg.onerror = resolve; });
  }

  const canvas = await html2canvas(hidden, {
    width: tpl.fullWidth,
    height: tpl.fullHeight,
    scale: 1,          // background is already native full-resolution artwork;
                        // no extra supersampling needed (this alone was the main
                        // cause of the huge 26MB PDF files)
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  document.body.removeChild(hidden);
  return canvas;
}

function fileDateStamp(){
  // prefer the certificate's own date field if present, otherwise today
  const dateField = currentTemplate.fields.find(f => f.type === "date");
  const iso = dateField ? currentData[dateField.key] : null;
  return iso || todayISO();
}

function fileBaseName(){
  const name = (currentData.studentName || "student").replace(/\s+/g, "_");
  return `${name}_${fileDateStamp()}`;
}

downloadPngBtn.addEventListener("click", async () => {
  downloadPngBtn.disabled = true;
  downloadPngBtn.textContent = "Preparing...";
  try {
    const canvas = await buildHiResCanvas();
    const link = document.createElement("a");
    link.download = `${fileBaseName()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  } finally {
    downloadPngBtn.disabled = false;
    downloadPngBtn.textContent = "Download PNG";
  }
});

downloadPdfBtn.addEventListener("click", async () => {
  downloadPdfBtn.disabled = true;
  downloadPdfBtn.textContent = "Preparing...";
  try {
    const canvas = await buildHiResCanvas();
    // JPEG instead of PNG for the embedded image: visually identical for this
    // kind of artwork/photo-like background, but a fraction of the file size.
    // (PNG here was the reason the PDF used to come out ~26MB.)
    const imgData = canvas.toDataURL("image/jpeg", 0.92);

    const margin = Math.round(canvas.width * 0.015); // small margin on all 4 sides
    const pageW = canvas.width + margin * 2;
    const pageH = canvas.height + margin * 2;

    const { jsPDF } = window.jspdf;
    const orientation = pageW >= pageH ? "landscape" : "portrait";
    const pdf = new jsPDF({
      orientation,
      unit: "px",
      format: [pageW, pageH],
      compress: true,
    });
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageW, pageH, "F");
    pdf.addImage(imgData, "JPEG", margin, margin, canvas.width, canvas.height);
    pdf.save(`${fileBaseName()}.pdf`);
  } finally {
    downloadPdfBtn.disabled = false;
    downloadPdfBtn.textContent = "Download PDF";
  }
});

/* ---------- start ---------- */
renderTemplateGrid();
