/* ======================================================
   LEMON SMP PLATFORM – EFFECTS JS
   Visual & UX Enhancements:
   - Smooth transitions
   - Mouse glow effect
   - Parallax movement
   - Page reveal animations
   ====================================================== */

/* ===================== MOUSE GLOW ===================== */
const glow = document.createElement("div");
glow.id = "mouse-glow";
document.body.appendChild(glow);

glow.style.position = "fixed";
glow.style.width = "300px";
glow.style.height = "300px";
glow.style.pointerEvents = "none";
glow.style.borderRadius = "50%";
glow.style.background =
  "radial-gradient(circle, rgba(34,197,94,0.25) 0%, rgba(34,197,94,0) 70%)";
glow.style.transform = "translate(-50%, -50%)";
glow.style.zIndex = "1";
glow.style.transition = "opacity .3s ease";

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* ===================== PARALLAX HERO ===================== */
const hero = document.querySelector(".hero");

window.addEventListener("scroll", () => {
  if (!hero) return;
  const offset = window.scrollY;
  hero.style.transform = `translateY(${offset * 0.15}px)`;
});

/* ===================== PAGE REVEAL ===================== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".page, .card, .hero-card, .staff-card, .app-card")
  .forEach(el => observer.observe(el));

/* ===================== SMOOTH PAGE TRANSITION ===================== */
const pages = document.querySelectorAll(".page");

pages.forEach(page => {
  page.style.opacity = "0";
  page.style.transition = "opacity .6s ease, transform .6s ease";
});

document.addEventListener("click", e => {
  if (e.target.matches(".nav-links li")) {
    pages.forEach(p => {
      p.style.opacity = "0";
      p.style.transform = "translateY(20px)";
    });

    setTimeout(() => {
      pages.forEach(p => {
        if (p.classList.contains("active")) {
          p.style.opacity = "1";
          p.style.transform = "translateY(0)";
        }
      });
    }, 200);
  }
});

/* ===================== BUTTON MICRO INTERACTION ===================== */
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("mouseenter", () => {
    btn.style.transform = "scale(1.05)";
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "scale(1)";
  });
});

/* ===================== PERFORMANCE SAFE ===================== */
window.addEventListener("blur", () => {
  glow.style.opacity = "0";
});

window.addEventListener("focus", () => {
  glow.style.opacity = "1";
});

/* ===================== DEV LOG ===================== */
console.log("✨ Effects system loaded");
