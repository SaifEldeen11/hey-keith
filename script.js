const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const product = document.querySelector('[data-draw]');

if ('IntersectionObserver' in window && !motion.matches) {
  product.classList.add('draw-pending');
  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      product.classList.add('draw-active');
      observer.disconnect();
    }
  }, { threshold: 0.26 });
  observer.observe(product);
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
