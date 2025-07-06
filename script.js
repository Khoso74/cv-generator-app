document.getElementById("cvForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  // Send data to Google Sheet via Apps Script
  fetch("https://script.google.com/macros/s/AKfycbyeT_AYAl9ZghFS_O42Dq52ctjVifTox8l8Pf8lzp8AwgedjoHH3mSRKzjqrOk-pAIzOg/exec", {
    method: "POST",
    body: JSON.stringify(data),
  });

  alert("Data sent successfully!");
});

// PDF generation
document.getElementById("downloadPDF").addEventListener("click", function () {
  window.print(); // simple approach to download CV from filled form (later jsPDF se customize krenge)
});

