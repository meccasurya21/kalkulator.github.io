const buttonGroups = [
  { id: "basic", title: "🔢 Kalkulasi Dasar", buttons: ["7", "8", "9", "/", "x²", "4", "5", "6", "*", "1/x", "1", "2", "3", "-", "%", "0", ".", "=", "+"] },
  { id: "memory", title: "🧠 Memori", buttons: ["MC", "MR", "MS", "M+", "M-"] },
  { id: "fungsi", title: "🧮 Fungsi Umum", buttons: ["←", "CE", "C", "±", "√"] },
  { id: "stat", title: "📊 Statistik", buttons: ["Σx", "Mean", "σ"] },
  { id: "tvm", title: "📈 TVM / Keuangan", buttons: ["PV", "FV", "PMT", "I/Y", "N"] },
  { id: "depresiasi", title: "🏗️ Depresiasi", buttons: ["DEP", "SYD", "DB"] },
  { id: "pajak", title: "💸 Pajak / Laba", buttons: ["TAX+", "TAX-", "Margin", "Markup"] },
  { id: "export", title: "📤 Ekspor", buttons: ["Excel", "PDF"] }
];

const buttonsContainer = document.querySelector(".buttons");
buttonsContainer.innerHTML = "";

buttonGroups.forEach(group => {
  const tabWrapper = document.createElement("div");
  tabWrapper.classList.add("tab-content");
  tabWrapper.id = group.id;
  if (group.id === "basic") tabWrapper.classList.add("active");

  const groupGrid = document.createElement("div");
  groupGrid.classList.add("button-grid");
  if (group.id === "basic") groupGrid.classList.add("kalkulasi-dasar");

  group.buttons.forEach(label => {
    const btn = document.createElement("button");
    btn.textContent = label;

    if (["+", "-", "*", "/", "%"].includes(label)) btn.classList.add("operator");
    if (["MC", "MR", "MS", "M+", "M-"].includes(label)) btn.classList.add("memory");
    if (["CE", "C"].includes(label)) btn.classList.add("clear");
    if (["±", "√", "1/x", "x²", "←"].includes(label)) btn.classList.add("function");
    if (["="] .includes(label)) btn.classList.add("equal");
    if (["Excel", "PDF"].includes(label)) btn.classList.add("export");
    else btn.classList.add("extra");

    groupGrid.appendChild(btn);
  });

  tabWrapper.appendChild(groupGrid);
  buttonsContainer.appendChild(tabWrapper);
});

// Tab switcher
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});
