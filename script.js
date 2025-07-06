document.getElementById("downloadPDF").addEventListener("click", function () {
  const form = document.getElementById("cvForm");
  const formData = new FormData(form);

  // Fill the hidden CV template with form data
  document.getElementById("cvName").innerText = formData.get("name");
  document.getElementById("cvContact").innerText = `📧 ${formData.get("email")} | 📞 ${formData.get("phone")}`;
  document.getElementById("cvSummary").innerText = formData.get("summary");
  document.getElementById("cvEducation").innerText = formData.get("education");
  document.getElementById("cvExperience").innerText = formData.get("experience");
  document.getElementById("cvSkills").innerText = formData.get("skills");
  document.getElementById("cvCertifications").innerText = formData.get("certifications");
  document.getElementById("cvInterests").innerText = formData.get("interests");

  // Get the styled CV layout
  const cvLayout = document.getElementById("cvTemplate");

  // PDF generation settings
  const opt = {
    margin: [0.5, 0.5],
    filename: `${formData.get("name")}_CV.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  };

  html2pdf().from(cvLayout).set(opt).save();
});
