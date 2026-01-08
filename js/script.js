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
      ctx.fillStyle = "rgba(1, 1, 1, 0.35)";
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}
const menuBtn = document.getElementById("menuBtn");
const drawer = document.getElementById("drawer");
const overlay = document.getElementById("overlay");

menuBtn.addEventListener("click", () => {
  drawer.classList.toggle("is-open");
  overlay.classList.toggle("is-open");
});

overlay.addEventListener("click", () => {
  drawer.classList.remove("is-open");
  overlay.classList.remove("is-open");
});
