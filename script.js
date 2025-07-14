let display = document.getElementById("display");
let history = document.getElementById("history");
let current = "";
let memory = 0;
let statData = [];
let tvm = {};
let logHistory = [];

// Load history dari localStorage saat halaman dibuka
const savedHistory = localStorage.getItem("logHistory");
if (savedHistory) {
  logHistory = JSON.parse(savedHistory);
  history.innerHTML = logHistory.slice(-5).join("<br>");
}

// Update tampilan kalkulator
function updateDisplay(val = "") {
  display.textContent = val || current || "0";
}

// Tambahkan ke riwayat
function updateHistory(note) {
  logHistory.push(note);
  localStorage.setItem("logHistory", JSON.stringify(logHistory));
  history.innerHTML = logHistory.slice(-5).join("<br>");
}

// Evaluasi ekspresi
function evaluateExpression() {
  try {
    const expr = current.replace(/×/g, "*").replace(/÷/g, "/");
    const result = Function(`return (${expr})`)();
    updateHistory(`${current} = ${result}`);
    current = result.toString();
    updateDisplay();
  } catch (e) {
    updateDisplay("ERROR");
    current = "";
  }
}

// Event klik tombol
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", () => handleClick(btn.textContent));
});

function handleClick(label) {
  if (!isNaN(label) || label === ".") {
    current += label;
  } else if (label === "←") {
    current = current.slice(0, -1);
  } else if (label === "C") {
    current = "";
  } else if (label === "CE") {
    current = "";
    statData = [];
    tvm = {};
    memory = 0;
    logHistory = [];
    localStorage.removeItem("logHistory");
    updateHistory("Reset semua");
  } else if (label === "=") {
    evaluateExpression();
    return;
  } else if (["+", "-", "*", "/", "%"].includes(label)) {
    current += ` ${label} `;
  } else if (label === "±") {
    current = current.startsWith("-") ? current.slice(1) : `-${current}`;
  } else if (label === "√") {
    current = Math.sqrt(parseFloat(current)).toString();
  } else if (label === "x²") {
    current = (parseFloat(current) ** 2).toString();
  } else if (label === "1/x") {
    current = (1 / parseFloat(current)).toString();
  }

  // Memory
  else if (label === "MC") {
    memory = 0;
    updateHistory("Memory Cleared");
  } else if (label === "MR") {
    current += memory;
  } else if (label === "MS") {
    memory = parseFloat(current) || 0;
    updateHistory(`Memory Saved: ${memory}`);
  } else if (label === "M+") {
    memory += parseFloat(current) || 0;
    updateHistory(`Memory += ${current}`);
  } else if (label === "M-") {
    memory -= parseFloat(current) || 0;
    updateHistory(`Memory -= ${current}`);
  }

  // Statistik dasar
  else if (label === "Σx") {
    statData.push(parseFloat(current));
    updateHistory(`Σx: ${statData.join(", ")}`);
  } else if (label === "Mean") {
    const mean = statData.reduce((a, b) => a + b, 0) / statData.length;
    current = mean.toFixed(4);
    updateHistory(`Mean: ${current}`);
  } else if (label === "σ") {
    const mean = statData.reduce((a, b) => a + b, 0) / statData.length;
    const sd = Math.sqrt(statData.reduce((a, b) => a + (b - mean) ** 2, 0) / statData.length);
    current = sd.toFixed(4);
    updateHistory(`SD: ${current}`);
  }

  updateDisplay();
}

// ==== TVM Functions ====
function calculateTVM(type) {
  // sudah digantikan dengan modal di index.html
}

// ==== Depresiasi ====
function calculateDepreciation(method) {
  // sudah digantikan dengan modal di index.html
}

// Pajak
let currentTaxType = "TAX+";
function applyTax(type) {
  currentTaxType = type;
  document.getElementById("modalTaxTitle").textContent = `Pajak (${type})`;
  document.getElementById("tax-rate").value = "";
  document.getElementById("modalTax").style.display = "block";
}

function submitTax() {
  const rateInput = parseFloat(document.getElementById("tax-rate").value);
  if (isNaN(rateInput)) return;

  const taxRate = rateInput / 100;
  let value = parseFloat(current) || 0;

  if (currentTaxType === "TAX+") {
    value *= 1 + taxRate;
  } else {
    value /= 1 + taxRate;
  }

  current = value.toFixed(2);
  updateDisplay();
  updateHistory(`${currentTaxType} (${taxRate * 100}%) = ${current}`);
  closeModal("modalTax");
}

// Margin / Markup
let currentMarginType = "Margin";
function calculateMargin(type) {
  currentMarginType = type;
  document.getElementById("modalMarginTitle").textContent = type;
  document.getElementById("margin-cost").value = "";
  document.getElementById("margin-price").value = "";
  document.getElementById("modalMargin").style.display = "block";
}

function submitMargin() {
  const cost = parseFloat(document.getElementById("margin-cost").value) || 0;
  const price = parseFloat(document.getElementById("margin-price").value) || 0;
  let result = 0;

  if (currentMarginType === "Margin") {
    result = ((price - cost) / price) * 100;
  } else {
    result = ((price - cost) / cost) * 100;
  }

  current = result.toFixed(2);
  updateDisplay();
  updateHistory(`${currentMarginType}: ${current}%`);
  closeModal("modalMargin");
}

// ==== Ekspor PDF & Excel ====
function exportToPDF() {
  const doc = new jsPDF();
  doc.text("Riwayat Kalkulasi:", 10, 10);
  logHistory.forEach((log, i) => {
    doc.text(`${i + 1}. ${log}`, 10, 20 + i * 10);
  });
  doc.save("kalkulasi.pdf");
}

function exportToExcel() {
  let wb = XLSX.utils.book_new();
  let ws = XLSX.utils.aoa_to_sheet(logHistory.map((log, i) => [`${i + 1}`, log]));
  XLSX.utils.book_append_sheet(wb, ws, "Riwayat");
  XLSX.writeFile(wb, "kalkulasi.xlsx");
}
