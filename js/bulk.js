/* =========================================================
   RAVAND - Bulk generation from Excel
   Independent of the single-certificate flow in app.js: it builds its
   own data objects per spreadsheet row and calls the shared renderer
   (buildHiResCanvas from app.js) explicitly, so it never touches
   `currentData` / `currentTemplate` / `lastCanvas` used by the single
   certificate flow above. The two features cannot corrupt each other.
   ========================================================= */

const bulkTemplateSelect   = document.getElementById("bulkTemplateSelect");
const bulkDownloadSampleBtn= document.getElementById("bulkDownloadSampleBtn");
const bulkFileInput        = document.getElementById("bulkFileInput");
const bulkGenerateBtn      = document.getElementById("bulkGenerateBtn");
const bulkStatus           = document.getElementById("bulkStatus");

let bulkWorkbookRows = null; // parsed rows waiting to be generated

/* ---------- populate the template dropdown ---------- */
function initBulkTemplateSelect(){
  bulkTemplateSelect.innerHTML = "";
  Object.values(TEMPLATES).forEach(tpl => {
    const opt = document.createElement("option");
    opt.value = tpl.id;
    opt.textContent = tpl.title;
    bulkTemplateSelect.appendChild(opt);
  });
}
initBulkTemplateSelect();

/* ---------- header <-> field-key mapping ----------
   The sample file uses each field's human label as the column header
   (e.g. "Student's name"). Matching is case-insensitive and ignores
   surrounding whitespace, so small edits to the header (extra spaces,
   different casing) still work. */
function headerKeyFor(field){
  return field.label.trim().toLowerCase();
}

function buildHeaderMap(tpl){
  const map = {};
  tpl.fields.forEach(f => { map[headerKeyFor(f)] = f; });
  return map;
}

/* ---------- sample value for the template-download file ---------- */
function sampleValueFor(field){
  if (field.type === "skill") return "OK";
  if (field.type === "date") return todayISO();
  return field.placeholder ? field.placeholder.replace(/^e\.g\.\s*/i, "") : "";
}

/* ---------- 1) download a ready-made Excel template ---------- */
bulkDownloadSampleBtn.addEventListener("click", () => {
  const tpl = TEMPLATES[bulkTemplateSelect.value];
  const headers = tpl.fields.map(f => f.label);
  const sampleRow = tpl.fields.map(sampleValueFor);

  const ws = XLSX.utils.aoa_to_sheet([headers, sampleRow]);
  ws["!cols"] = headers.map(h => ({ wch: Math.max(14, h.length + 2) }));
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Students");
  XLSX.writeFile(wb, `ravand_${tpl.id}_template.xlsx`);
});

/* ---------- 2) read the uploaded file ---------- */
bulkFileInput.addEventListener("change", () => {
  const file = bulkFileInput.files[0];
  bulkWorkbookRows = null;
  bulkGenerateBtn.disabled = true;
  bulkStatus.textContent = "";

  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const wb = XLSX.read(e.target.result, { type: "array", cellDates: true });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
      if (!rows.length) {
        bulkStatus.textContent = "That file has no data rows.";
        bulkStatus.className = "bulk-status error";
        return;
      }
      bulkWorkbookRows = rows;
      bulkGenerateBtn.disabled = false;
      bulkStatus.textContent = `${rows.length} row(s) found. Ready to generate.`;
      bulkStatus.className = "bulk-status";
    } catch (err) {
      bulkStatus.textContent = "Couldn't read that file. Please upload a valid .xlsx file.";
      bulkStatus.className = "bulk-status error";
    }
  };
  reader.readAsArrayBuffer(file);
});

/* ---------- helpers to turn one spreadsheet row into cert data ---------- */
function excelDateToISO(value){
  if (value instanceof Date && !isNaN(value)) {
    return value.toISOString().slice(0, 10);
  }
  const parsed = new Date(value);
  if (!isNaN(parsed)) return parsed.toISOString().slice(0, 10);
  return null;
}

function rowToCertData(row, tpl, headerMap){
  const data = {};
  const missing = [];

  // row keys come from the sheet's own header cells; match them against
  // our expected headers case-insensitively
  const rowLookup = {};
  Object.keys(row).forEach(k => { rowLookup[k.trim().toLowerCase()] = row[k]; });

  for (const field of tpl.fields) {
    const raw = rowLookup[headerKeyFor(field)];
    const value = (raw === undefined || raw === null) ? "" : String(raw).trim();

    if (field.type === "skill") {
      const v = value.toLowerCase();
      if (!["ok", "good", "excellent"].includes(v)) {
        missing.push(field.label);
        continue;
      }
      data[field.key] = v;
    } else if (field.type === "date") {
      const iso = raw ? excelDateToISO(raw) : null;
      if (!iso) { missing.push(field.label); continue; }
      data[field.key] = iso;
      data[field.key + "_display"] = formatDateDisplay(iso);
    } else {
      if (!value) { missing.push(field.label); continue; }
      data[field.key] = value;
    }
  }

  return { data, missing };
}

function safeFileName(str){
  return (str || "certificate").replace(/[^\w\-]+/g, "_").slice(0, 60);
}

/* ---------- 3) generate every row and zip the results ---------- */
bulkGenerateBtn.addEventListener("click", async () => {
  if (!bulkWorkbookRows || !bulkWorkbookRows.length) return;

  const tpl = TEMPLATES[bulkTemplateSelect.value];
  const headerMap = buildHeaderMap(tpl);

  bulkGenerateBtn.disabled = true;
  bulkFileInput.disabled = true;
  bulkTemplateSelect.disabled = true;

  const zip = new JSZip();
  const skipped = [];
  const usedNames = new Set();
  let generated = 0;

  for (let i = 0; i < bulkWorkbookRows.length; i++) {
    const rowNum = i + 2; // +1 for header row, +1 for 1-based row numbers
    bulkStatus.textContent = `Generating ${i + 1} / ${bulkWorkbookRows.length}...`;
    bulkStatus.className = "bulk-status";

    const { data, missing } = rowToCertData(bulkWorkbookRows[i], tpl, headerMap);
    if (missing.length) {
      skipped.push(`Row ${rowNum}: missing/invalid ${missing.join(", ")}`);
      continue;
    }

    try {
      const canvas = await buildHiResCanvas(tpl, data);
      const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/png"));

      let base = safeFileName(data.studentName) + "_" + (data.date || todayISO());
      let name = base;
      let dupeCount = 1;
      while (usedNames.has(name)) { name = `${base}_${++dupeCount}`; }
      usedNames.add(name);

      zip.file(`${name}.png`, blob);
      generated++;
    } catch (err) {
      skipped.push(`Row ${rowNum}: failed to render (${err.message || "unknown error"})`);
    }
  }

  if (generated === 0) {
    bulkStatus.textContent = `Nothing was generated. ${skipped.join(" | ")}`;
    bulkStatus.className = "bulk-status error";
  } else {
    bulkStatus.textContent = `Zipping ${generated} certificate(s)...`;
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = `ravand_certificates_${todayISO()}.zip`;
    link.click();
    URL.revokeObjectURL(link.href);

    bulkStatus.textContent = skipped.length
      ? `Done: ${generated} generated, ${skipped.length} skipped. ${skipped.join(" | ")}`
      : `Done: ${generated} certificate(s) generated and downloaded as a .zip.`;
    bulkStatus.className = skipped.length ? "bulk-status warning" : "bulk-status success";
  }

  bulkGenerateBtn.disabled = false;
  bulkFileInput.disabled = false;
  bulkTemplateSelect.disabled = false;
});
