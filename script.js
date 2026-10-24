const dialog = document.querySelector("#project-dialog");
const openDialogButton = document.querySelector("#open-dialog");
const closeDialogButton = document.querySelector("#close-dialog");
const cancelDialogButton = document.querySelector("#cancel-dialog");
const projectForm = document.querySelector("#project-form");
const projectRows = document.querySelector("#project-rows");
const searchInput = document.querySelector("#project-search");
const searchStatus = document.querySelector("#search-status");

openDialogButton.addEventListener("click", () => {
  document.querySelector("#dialog-error").textContent = "";
  dialog.showModal();
  document.querySelector("#project-name").focus();
});
function closeDialog() {
  dialog.close();
  openDialogButton.focus();
}
closeDialogButton.addEventListener("click", closeDialog);
cancelDialogButton.addEventListener("click", closeDialog);

projectForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!projectForm.reportValidity()) return;
  const name = document.querySelector("#project-name").value.trim();
  const owner = document.querySelector("#project-owner").value.trim();
  const dueValue = document.querySelector("#project-due").value;
  if (!name || !owner || !dueValue) {
    document.querySelector("#dialog-error").textContent = "Complete all required fields.";
    return;
  }
  const row = document.createElement("tr");
  const projectCell = document.createElement("th");
  projectCell.scope = "row";
  projectCell.textContent = name;
  const ownerCell = document.createElement("td");
  ownerCell.textContent = owner;
  const statusCell = document.createElement("td");
  const status = document.createElement("span");
  status.className = "status status-progress";
  status.textContent = "In progress";
  statusCell.append(status);
  const dueCell = document.createElement("td");
  dueCell.textContent = new Date(`${dueValue}T12:00:00`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" });
  row.append(projectCell, ownerCell, statusCell, dueCell);
  projectRows.prepend(row);
  projectForm.reset();
  closeDialog();
  filterProjects();
});

searchInput.addEventListener("input", filterProjects);
function filterProjects() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  let visibleCount = 0;
  projectRows.querySelectorAll("tr").forEach((row) => {
    const visible = row.textContent.toLocaleLowerCase().includes(query);
    row.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  searchStatus.textContent = query ? `${visibleCount} project${visibleCount === 1 ? "" : "s"} found.` : "";
}

document.querySelector("#preferences-form").addEventListener("submit", (event) => {
  event.preventDefault();
  document.querySelector("#form-status").textContent = "Preferences saved for this demo.";
});

const menuToggle = document.querySelector("#menu-toggle");
const sidebar = document.querySelector("#sidebar");
menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});
