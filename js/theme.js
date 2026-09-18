/* =========================================================
   RAVAND - Theme toggle (light / dark)
   ========================================================= */
(function(){
  const STORAGE_KEY = "ravand-theme";
  const toggleBtn = document.getElementById("themeToggle");
  const root = document.documentElement;

  function applyTheme(theme){
    root.setAttribute("data-theme", theme);
  }

  // On load: respect a previously saved choice, otherwise follow the
  // visitor's OS-level light/dark preference.
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial = saved || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(initial);

  toggleBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  });
})();
