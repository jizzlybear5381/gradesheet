// Shared utilities used across every calculator page.

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});

const ICONS = {
  check: `<svg class="check-stamp" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="21" stroke="currentColor" stroke-width="2.5"/>
    <path d="M15 24.5L21 30.5L33 17.5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  error: `<svg class="check-stamp" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="24" r="21" stroke="currentColor" stroke-width="2.5"/>
    <path d="M17 17L31 31M31 17L17 31" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
  </svg>`,
};

/**
 * Renders a result into a result panel.
 * @param {HTMLElement} panel - the .result-panel container
 * @param {string} value - big headline value, e.g. "3.62"
 * @param {string} label - supporting label text
 * @param {boolean} isError
 */
function renderResult(panel, value, label, isError = false) {
  panel.classList.toggle("is-error", isError);
  panel.querySelector(".check-stamp-slot").innerHTML = isError ? ICONS.error : ICONS.check;
  panel.querySelector(".result-value").textContent = value;
  panel.querySelector(".result-label").textContent = label;
  panel.classList.remove("is-visible");
  // restart animation
  void panel.offsetWidth;
  panel.classList.add("is-visible");
}

/**
 * Generic manager for a dynamic list of input rows (add / remove).
 * @param {HTMLElement} body - container that holds the rows
 * @param {() => HTMLElement} rowFactory - builds a new row element
 * @param {number} minRows - minimum rows that can remain
 */
function createRowManager(body, rowFactory, minRows = 1) {
  function addRow() {
    const row = rowFactory();
    body.appendChild(row);
  }

  body.addEventListener("click", (e) => {
    const btn = e.target.closest(".remove-row");
    if (!btn) return;
    const rows = body.querySelectorAll(".row-grid:not(.head)");
    if (rows.length <= minRows) return;
    btn.closest(".row-grid").remove();
  });

  return { addRow };
}
