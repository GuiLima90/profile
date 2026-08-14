// ===== FOOTER YEAR =====
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== EMAIL TOGGLE =====
const emailBtn = document.getElementById("email-btn");
const emailTooltip = document.getElementById("email-tooltip");

if (emailBtn && emailTooltip) {
  emailBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const isVisible = emailTooltip.style.display === "block";
    emailTooltip.style.display = isVisible ? "none" : "block";
  });
}


// ===== BACKGROUND ANIMATION =====

const canvas = document.getElementById("bg-canvas");

if (canvas) {
  const ctx = canvas.getContext("2d");

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  const particles = [];
  const COUNT = 40;

  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.4,
      dy: (Math.random() - 0.5) * 0.4
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(165, 163, 255, 0.35)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

if (menuBtn && drawer && overlay) {
  menuBtn.addEventListener("click", () => {
    drawer.classList.toggle("is-open");
    overlay.classList.toggle("is-open");
  });

  overlay.addEventListener("click", () => {
    drawer.classList.remove("is-open");
    overlay.classList.remove("is-open");
  });
}

// ===== 3D TILT ON HOVER =====
(function () {
  var targets = document.querySelectorAll(".tilt-target");
  if (!targets.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (window.matchMedia && window.matchMedia("(hover: none)").matches) return; // skip touch devices

  targets.forEach(function (el) {
    var maxTilt = 10;

    el.addEventListener("mousemove", function (e) {
      var rect = el.getBoundingClientRect();
      var px = (e.clientX - rect.left) / rect.width; // 0..1
      var py = (e.clientY - rect.top) / rect.height; // 0..1
      var rotateY = (px - 0.5) * maxTilt * 2;
      var rotateX = (0.5 - py) * maxTilt * 2;

      el.style.transform =
        "perspective(800px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" +
        rotateY.toFixed(2) + "deg) scale3d(1.02, 1.02, 1.02)";
    });

    el.addEventListener("mouseleave", function () {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
    });
  });
})();

// ===== PARALLAX HERO SHAPES =====
(function () {
  var shapes = document.querySelectorAll(".parallax-shape");
  if (!shapes.length) return;
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var ticking = false;

  function update() {
    var scrollY = window.scrollY || window.pageYOffset;
    shapes.forEach(function (shape) {
      var speed = parseFloat(shape.getAttribute("data-speed")) || 0.2;
      shape.style.transform = "translateY(" + (scrollY * speed).toFixed(1) + "px)";
    });
    ticking = false;
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

// ===== ORBIT BADGE (draggable rotating circle) =====
(function () {
  var badge = document.getElementById("orbitBadge");
  if (!badge) return;
  var ring = badge.querySelector(".orbit-badge__ring");
  if (!ring) return;

  var dragging = false;
  var startAngle = 0;
  var currentRotation = 0;
  var baseRotation = 0;

  function angleFromCenter(clientX, clientY) {
    var rect = badge.getBoundingClientRect();
    var cx = rect.left + rect.width / 2;
    var cy = rect.top + rect.height / 2;
    return Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
  }

  function onPointerDown(e) {
    dragging = true;
    badge.classList.add("is-dragging");
    startAngle = angleFromCenter(e.clientX, e.clientY) - currentRotation;
    badge.setPointerCapture && badge.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e) {
    if (!dragging) return;
    var angle = angleFromCenter(e.clientX, e.clientY);
    currentRotation = angle - startAngle;
    ring.style.transform = "rotate(" + currentRotation + "deg)";
  }

  function onPointerUp() {
    if (!dragging) return;
    dragging = false;
    badge.classList.remove("is-dragging");
    // Hand back off to the CSS auto-rotate animation from the current angle.
    ring.style.animationDelay = "-" + (Math.abs(currentRotation) % 360 / 360) * 14 + "s";
    ring.style.transform = "";
  }

  badge.addEventListener("pointerdown", onPointerDown);
  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", onPointerUp);
})();

// ===== LANGUAGE TOGGLE (EN / PT) =====
(function () {
  var STORAGE_KEY = "gs-portfolio-lang";

  function setLanguage(lang) {
    document.documentElement.setAttribute("lang", lang);

    document.querySelectorAll("[data-en]").forEach(function (el) {
      var value = el.getAttribute("data-" + lang);
      if (value !== null) el.textContent = value;
    });

    document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-set-lang") === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* ignore */ }
  }

  document.querySelectorAll("[data-set-lang]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.getAttribute("data-set-lang"));
    });
  });

  var savedLang = null;
  try { savedLang = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignore */ }
  setLanguage(savedLang === "pt" ? "pt" : "en");
})();
