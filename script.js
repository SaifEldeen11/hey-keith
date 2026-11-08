const motion = window.matchMedia('(prefers-reduced-motion: reduce)');

if ('IntersectionObserver' in window && !motion.matches) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('draw-active');
        observer.unobserve(entry.target);
      }
    }
  }, { threshold: 0.26 });
  for (const figure of document.querySelectorAll('[data-draw]')) {
    figure.classList.add('draw-pending');
    observer.observe(figure);
  }
}

let scheduled = false;
function updateProgress() {
  const root = document.documentElement;
  const range = root.scrollHeight - root.clientHeight;
  const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
  root.style.setProperty('--reading-progress', progress);
  scheduled = false;
}

window.addEventListener('scroll', () => {
  if (!scheduled) {
    scheduled = true;
    window.requestAnimationFrame(updateProgress);
  }
}, { passive: true });
window.addEventListener('resize', updateProgress);
window.addEventListener('load', updateProgress, { once: true });
updateProgress();
