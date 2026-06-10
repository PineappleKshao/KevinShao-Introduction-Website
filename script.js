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
