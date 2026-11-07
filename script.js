document.getElementById("yr").textContent = new Date().getFullYear();

// scroll reveal
const targets = document.querySelectorAll("section > *, .card, .project, .layer, .timeline > li");
targets.forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
targets.forEach(el => io.observe(el));

// count-up stats
document.querySelectorAll("[data-count]").forEach(el => {
  const end = +el.dataset.count; let n = 0;
  const step = () => { n += Math.max(1, end / 40); if (n >= end) n = end; el.textContent = Math.round(n); if (n < end) requestAnimationFrame(step); };
  step();
});

// neural-network style background (skipped for reduced motion)
const canvas = document.getElementById("bg");
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const ctx = canvas.getContext("2d");
  let w, h, pts;
  const init = () => {
    w = canvas.width = innerWidth; h = canvas.height = innerHeight;
    const count = Math.min(70, Math.floor(w * h / 22000));
    pts = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
      ctx.fillStyle = "rgba(34,211,238,.7)";
      ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill();
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
      if (d < 140) {
        ctx.strokeStyle = `rgba(124,92,255,${.28 * (1 - d / 140)})`;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
    }
    requestAnimationFrame(draw);
  };
  addEventListener("resize", init);
  init(); draw();
}
