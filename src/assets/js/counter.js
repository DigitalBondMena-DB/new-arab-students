/**
 * about.js
 * Optimized Counter Animator for the About Page
 */

class CounterAnimator {
  /**
   * Initialize the CounterAnimator.
   * @param {Object} options Configuration options
   * @param {string} options.selector CSS selector for counter elements
   * @param {number} options.duration Animation duration in milliseconds
   */
  constructor(options = {}) {
    this.selector = options.selector || ".counter";
    this.duration = options.duration || 5000;
    this.sectionGroups = new Map();
    this.observer = null;
    this.init();
  }

  init() {
    const counterElements = document.querySelectorAll(this.selector);
    if (counterElements.length === 0) return;

    // Parse values and prepare for animation
    counterElements.forEach((el) => {
      // Get the original text
      const originalText = el.textContent.trim();

      // Match prefix, numeric target (allowing commas/decimals), and suffix
      // e.g. "+ 1931" -> prefix: "+ ", target: 1931, suffix: ""
      const match = originalText.match(
        /^([^\d]*)(\d+(?:,\d+)*|\d*\.\d+)([^\d]*)$/,
      );

      let targetValue = 0;
      let prefix = "";
      let suffix = "";

      if (match) {
        prefix = match[1];
        targetValue = parseFloat(match[2].replace(/,/g, ""));
        suffix = match[3];
      } else {
        // Fallback: extract the first sequence of numbers
        const numbersOnly = originalText.replace(/[^\d.]/g, "");
        if (numbersOnly) {
          targetValue = parseFloat(numbersOnly);
          const splitText = originalText.split(numbersOnly);
          prefix = splitText[0] || "";
          suffix = splitText[1] || "";
        }
      }

      // Skip elements that don't have valid numbers
      if (isNaN(targetValue)) return;

      const counterObj = {
        element: el,
        target: targetValue,
        prefix,
        suffix,
      };

      // Find the closest section or use the element itself
      const section = el.closest("section") || el;
      if (!this.sectionGroups.has(section)) {
        this.sectionGroups.set(section, []);
      }
      this.sectionGroups.get(section).push(counterObj);

      // Initialize element visually to zero
      el.textContent = `${prefix}0${suffix}`;
    });

    if (this.sectionGroups.size === 0) return;

    // Use IntersectionObserver to trigger animation when the user scrolls to it
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target;
            const counters = this.sectionGroups.get(section);
            if (counters) {
              this.startAnimation(counters);
              observer.unobserve(section); // Ensure it only runs once per section
            }
          }
        });
      },
      { threshold: 0.4 }, // Trigger when 50% of section is visible
    );

    // Observe each section
    this.sectionGroups.forEach((counters, section) => {
      this.observer.observe(section);
    });
  }

  /**
   * Easing function: easeOutExpo
   * Starts fast and slows down towards the end.
   */
  easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  startAnimation(counters) {
    let startTime = null;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsedTime = currentTime - startTime;
      let progress = Math.min(elapsedTime / this.duration, 1);

      // Apply easing
      const easedProgress = this.easeOutExpo(progress);

      counters.forEach((counter) => {
        // Calculate current frame value
        const currentValue = Math.floor(counter.target * easedProgress);
        counter.element.textContent = `${counter.prefix}${currentValue}${counter.suffix}`;
      });

      if (progress < 1) {
        // Continue animation loop
        requestAnimationFrame(animate);
      } else {
        // Ensure final exact value is set when animation completes
        counters.forEach((counter) => {
          counter.element.textContent = `${counter.prefix}${counter.target}${counter.suffix}`;
        });
      }
    };

    // Start animation loop
    requestAnimationFrame(animate);
  }
}

// Initialize when DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  new CounterAnimator({
    selector: ".counter",
    duration: 2500, // 2.5 seconds duration
  });
});
