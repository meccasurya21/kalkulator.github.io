// // Modal Pajak
// let currentTaxType = "TAX+";

// function applyTax(type) {
//   currentTaxType = type;
//   document.getElementById("modalTaxTitle").textContent = `Pajak (${type})`;
//   document.getElementById("tax-rate").value = "";
//   document.getElementById("modalTax").style.display = "block";
// }

// function submitTax() {
//   const rateInput = parseFloat(document.getElementById("tax-rate").value);
//   if (isNaN(rateInput)) return;

//   const taxRate = rateInput / 100;
//   let value = parseFloat(current) || 0;

//   if (currentTaxType === "TAX+") {
//     value *= 1 + taxRate;
//   } else {
//     value /= 1 + taxRate;
//   }

//   current = value.toFixed(2);
//   updateDisplay();
//   updateHistory(`${currentTaxType} (${taxRate * 100}%) = ${current}`);
//   closeModal("modalTax");
// }

// // Modal Margin
// let currentMarginType = "Margin";

// function calculateMargin(type) {
//   currentMarginType = type;
//   document.getElementById("modalMarginTitle").textContent = type;
//   document.getElementById("margin-cost").value = "";
//   document.getElementById("margin-price").value = "";
//   document.getElementById("modalMargin").style.display = "block";
// }

// function submitMargin() {
//   const cost = parseFloat(document.getElementById("margin-cost").value) || 0;
//   const price = parseFloat(document.getElementById("margin-price").value) || 0;
//   let result = 0;

//   if (currentMarginType === "Margin") {
//     result = ((price - cost) / price) * 100;
//   } else {
//     result = ((price - cost) / cost) * 100;
//   }

//   current = result.toFixed(2);
//   updateDisplay();
//   updateHistory(`${currentMarginType}: ${current}%`);
//   closeModal("modalMargin");
// }

// // Fungsi untuk menutup modal universal
// function closeModal(id) {
//   document.getElementById(id).style.display = "none";
// }
