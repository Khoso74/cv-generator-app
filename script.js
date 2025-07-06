document.getElementById("downloadPDF").addEventListener("click", function () {
  const form = document.getElementById("cvForm");
  const formData = new FormData(form);

  // Create a custom styled CV layout
  const cvHTML = `
    <div style="font-family: Arial; padding: 30px; line-height: 1.6;">
      <h1 style="text-align:center; color:#2c3e50;">${formData.get("name")}</h1>
      <p style="text-align:center;">📧 ${formData.get("email")} | 📞 ${formData.get("phone")}</p>
      <hr>

      <h2 style="color:#34495e;">🔹 Summary</h2>
      <p>${formData.get("summary")}</p>

      <h2 style="color:#34495e;">🎓 Education</h2>
      <p>${formData.get("education")}</p>

      <h2 style="color:#34495e;">💼 Experience</h2>
      <p>${formData.get("experience")}</p>

      <h2 style="color:#34495e;">🛠️ Skills</h2>
      <p>${formData.get("skills")}</p>

      <h2 style="color:#34495e;">📜 Certifications</h2>
      <p>${formData.get("certifications")}</p>

      <h2 style="color:#34495e;">🎯 Interests</h2>
      <p>${formData.get("interests")}</p>
    </div>
  `;

  const opt = {
    margin: 0.5,
    filename: `${formData.get("name")}_CV.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().from(cvHTML).set(opt).save();
});
