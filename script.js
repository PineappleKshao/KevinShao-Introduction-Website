const revealTargets = document.querySelectorAll(
  ".profile-section, .timeline-item, .method-grid article, .skills-matrix article, .publication-list article, .teaching-band, .contact-section"
);

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach(target => observer.observe(target));

const heroCanvas = document.querySelector(".hero-canvas");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (heroCanvas && !prefersReducedMotion) {
  const context = heroCanvas.getContext("2d");
  const glyphs = ["01", "10", "fn", "SQL", "R", "py", "C++", "∑", "if", "for", "AI"];
  let width = 0;
  let height = 0;
  let particles = [];
  let animationFrame;

  const resizeCanvas = () => {
    const rect = heroCanvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = rect.width;
    height = rect.height;
    heroCanvas.width = Math.floor(width * pixelRatio);
    heroCanvas.height = Math.floor(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const count = Math.max(36, Math.floor((width * height) / 24000));
    particles = Array.from({ length: count }, (_, index) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.18 + Math.random() * 0.42,
      drift: (Math.random() - 0.5) * 0.18,
      size: 10 + Math.random() * 8,
      label: glyphs[index % glyphs.length],
      alpha: 0.14 + Math.random() * 0.3
    }));
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    context.strokeStyle = "rgba(255,255,255,0.08)";
    context.lineWidth = 1;
    for (let x = -48; x < width + 48; x += 48) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x + 36, height);
      context.stroke();
    }

    context.font = "600 12px IBM Plex Mono, monospace";
    particles.forEach(particle => {
      particle.y -= particle.speed;
      particle.x += particle.drift;
      if (particle.y < -24) {
        particle.y = height + 24;
        particle.x = Math.random() * width;
      }

      context.fillStyle = `rgba(255,255,255,${particle.alpha})`;
      context.fillText(particle.label, particle.x, particle.y);
    });

    animationFrame = requestAnimationFrame(draw);
  };

  resizeCanvas();
  draw();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pagehide", () => cancelAnimationFrame(animationFrame));
}
