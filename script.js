let skillArray = [];

function addEducation() {
  const section = document.getElementById('educationSection');
  const entry = document.createElement('div');
  entry.className = 'education-entry';
  entry.innerHTML = `
    <input type="text" name="degree[]" placeholder="Degree" required />
    <input type="text" name="institution[]" placeholder="Institution" required />
    <input type="text" name="year[]" placeholder="Year" required />
    <input type="text" name="grade[]" placeholder="Grade / Percentage" required />
  `;
  section.appendChild(entry);
}

function addExperience() {
  const section = document.getElementById('experienceSection');
  const entry = document.createElement('div');
  entry.className = 'experience-entry';
  entry.innerHTML = `
    <input type="text" name="jobTitle[]" placeholder="Job Title" required />
    <input type="text" name="company[]" placeholder="Company Name" required />
    <input type="text" name="duration[]" placeholder="Duration" required />
    <textarea name="jobDesc[]" placeholder="Describe your responsibilities..." required></textarea>
  `;
  section.appendChild(entry);
}

function addSkill() {
  const input = document.getElementById('skillInput');
  const skill = input.value.trim();
  if (skill !== "") {
    skillArray.push(skill);
    const list = document.getElementById('skillsList');
    const li = document.createElement('li');
    li.innerText = skill;
    list.appendChild(li);
    input.value = "";
  }
}

// 🟡 Rok do default submit behavior taake blank PDF na aaye
document.getElementById("cvForm").addEventListener("submit", function (e) {
  e.preventDefault();
  document.getElementById("downloadPDF").click();
});

document.getElementById("downloadPDF").addEventListener("click", function () {
  const form = document.getElementById("cvForm");
  const formData = new FormData(form);

  let pdfHTML = `
    <div style="font-family: Arial; padding: 30px; line-height: 1.6;">
      <h1 style="text-align:center; color:#2c3e50;">${formData.get("name")}</h1>
      <p style="text-align:center;">📧 ${formData.get("email")} | 📞 ${formData.get("phone")}</p>
      <hr>

      <h2 style="color:#34495e;">🔹 Summary</h2>
      <p>${formData.get("summary")}</p>

      <h2 style="color:#34495e;">🎓 Education</h2>
      <ul>`;

  const degrees = formData.getAll("degree[]");
  const institutions = formData.getAll("institution[]");
  const years = formData.getAll("year[]");
  const grades = formData.getAll("grade[]");
  degrees.forEach((deg, i) => {
    pdfHTML += `<li>${deg} - ${institutions[i]} (${years[i]}) - Grade: ${grades[i]}</li>`;
  });

  pdfHTML += `</ul>
      <h2 style="color:#34495e;">💼 Experience</h2>
      <ul>`;

  const jobs = formData.getAll("jobTitle[]");
  const comps = formData.getAll("company[]");
  const durs = formData.getAll("duration[]");
  const descs = formData.getAll("jobDesc[]");
  jobs.forEach((job, i) => {
    pdfHTML += `<li><strong>${job}</strong> at ${comps[i]} (${durs[i]})<br>${descs[i]}</li>`;
  });

  pdfHTML += `</ul>
      <h2 style="color:#34495e;">🛠️ Skills</h2>
      <ul>`;
  skillArray.forEach(skill => {
    pdfHTML += `<li>${skill}</li>`;
  });

  pdfHTML += `</ul>
      <h2 style="color:#34495e;">📜 Certifications</h2>
      <p>${formData.get("certifications")}</p>

      <h2 style="color:#34495e;">🎯 Interests</h2>
      <p>${formData.get("interests")}</p>
    </div>`;

  html2pdf().from(pdfHTML).set({
    margin: 0.5,
    filename: `${formData.get("name")}_CV.pdf`,
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
  }).save();
});
