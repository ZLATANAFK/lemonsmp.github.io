/* =========================================
   LEMON SMP – ADMIN PANEL
   Reads applications from LocalStorage
   ========================================= */

const container = document.getElementById("applications");

const data = localStorage.getItem("lemonsmp_applications");

if (!data) {
  container.innerHTML = `
    <p class="no-apps">❌ Nu există aplicații trimise.</p>
  `;
} else {
  const applications = JSON.parse(data);

  if (applications.length === 0) {
    container.innerHTML = `
      <p class="no-apps">❌ Lista de aplicații este goală.</p>
    `;
  } else {
    applications.forEach((app, index) => {
      const div = document.createElement("div");
      div.className = "application";

      div.innerHTML = `
        <h3>${app.type.toUpperCase()}</h3>
        <p><b>User:</b> ${app.username}</p>
        <p><b>Mesaj:</b> ${app.reason}</p>
        <small>Aplicația #${index + 1}</small>
      `;

      container.appendChild(div);
    });
  }
}

console.log("✅ Admin panel loaded");
