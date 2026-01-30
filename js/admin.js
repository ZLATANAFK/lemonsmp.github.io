/* =========================================
   LEMON SMP – ADMIN PANEL (Firestore)
   ========================================= */

const container = document.getElementById("applications");

container.innerHTML = `<p class="no-apps">Se încarcă aplicațiile...</p>`;

// Firebase trebuie deja inițializat în admin.html
const db = firebase.firestore();

db.collection("applications")
  .orderBy("createdAt", "desc")
  .onSnapshot(snapshot => {

    container.innerHTML = "";

    if (snapshot.empty) {
      container.innerHTML = `<p class="no-apps">❌ Nu există aplicații.</p>`;
      return;
    }

    snapshot.forEach(doc => {
      const app = doc.data();
      const div = document.createElement("div");
      div.className = "application";

      /* ================= STAFF ================= */
      if (app.type === "staff") {
        div.innerHTML = `
          <h3>🛡️ STAFF – ${app.name}</h3>
          <p><b>MC:</b> ${app.mc}</p>
          <p><b>Ore jucate:</b> ${app.hours}</p>
          <p><b>Sursă:</b> ${app.source}</p>
          <p><b>Vârstă:</b> ${app.age}</p>
          <p><b>CNP:</b> ${app.cnp}</p>
          <p><b>De ce staff:</b><br>${app.why}</p>
          <p><b>Ore disponibile:</b> ${app.time}</p>
          <p><b>Descriere:</b><br>${app.desc}</p>
          <p><b>Grad dorit:</b> ${app.rank}</p>
          <p><b>Diferență:</b><br>${app.diff}</p>
          <small>Status: ${app.status || "pending"}</small>
        `;
      }

      /* ================= MEDIA ================= */
      if (app.type === "media") {
        div.innerHTML = `
          <h3>🎥 MEDIA – ${app.name}</h3>
          <p><b>MC:</b> ${app.mc}</p>
          <p><b>Platformă:</b> ${app.platform}</p>
          <p><b>Urmăritori:</b> ${app.followers}</p>
          <p><b>Live:</b> ${app.live}</p>
          <p><b>Acceptă condițiile:</b><br>${app.agree}</p>
          <small>Status: ${app.status || "pending"}</small>
        `;
      }

      /* ================= UNBAN ================= */
      if (app.type === "unban") {
        div.innerHTML = `
          <h3>🚫 UNBAN – ${app.username}</h3>
          <p><b>Motiv:</b><br>${app.reason}</p>
          <small>Status: ${app.status || "pending"}</small>
        `;
      }

      container.appendChild(div);
    });
  });

console.log("✅ Admin panel conectat la Firestore");
