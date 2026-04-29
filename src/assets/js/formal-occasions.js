
class TabsManager {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    this.triggers = this.container.querySelectorAll("[data-tab-target]");
    this.contents = this.container.querySelectorAll("[data-tab-content]");
    this.activeClass = "active-tab";
    this.hiddenClass = "hidden";
    this.transitionClass = "tab-transitioning";
    this.visibleClass = "tab-visible";

    this.init();
  }

  init() {
    this.triggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault();
        const targetSelector = trigger.getAttribute("data-tab-target");
        this.switchTab(trigger, targetSelector);
      });
    });

    // Activate the first tab by default
    const activeTrigger = this.container.querySelector(
      `[data-tab-target].${this.activeClass}`,
    );
    if (activeTrigger) {
      const targetSelector = activeTrigger.getAttribute("data-tab-target");
      this.showInitialTab(activeTrigger, targetSelector);
    } else if (this.triggers.length > 0) {
      const firstTarget = this.triggers[0].getAttribute("data-tab-target");
      this.switchTab(this.triggers[0], firstTarget);
    }
  }

  showInitialTab(trigger, targetSelector) {
    const targetContent = this.container.querySelector(targetSelector);
    if (!targetContent) return;

    // Ensure it's not hidden and visible
    targetContent.classList.remove(this.hiddenClass);
    requestAnimationFrame(() => {
      targetContent.classList.add(this.visibleClass);
    });
  }

  switchTab(trigger, targetSelector) {
    const targetContent = this.container.querySelector(targetSelector);
    if (
      !targetContent ||
      (trigger.classList.contains(this.activeClass) &&
        this.container.querySelector(`.${this.visibleClass}`) === targetContent)
    )
      return;

    // Update triggers
    this.triggers.forEach((t) =>
      t.classList.remove(this.activeClass, "bg-orange-500", "text-white"),
    );
    trigger.classList.add(this.activeClass, "bg-orange-500", "text-white");

    // Get currently visible content
    const currentVisible = Array.from(this.contents).find((c) =>
      c.classList.contains(this.visibleClass),
    );

    if (currentVisible && currentVisible !== targetContent) {
      this.fadeOut(currentVisible, () => {
        this.fadeIn(targetContent);
      });
    } else if (!currentVisible) {
      this.fadeIn(targetContent);
    }
  }

  fadeOut(element, callback) {
    element.classList.add(this.transitionClass);
    element.style.willChange = "opacity, transform";

    requestAnimationFrame(() => {
      element.classList.remove(this.visibleClass);

      // Wait for transition to end
      const onTransitionEnd = (e) => {
        if (e.propertyName === "opacity") {
          element.removeEventListener("transitionend", onTransitionEnd);
          element.classList.add(this.hiddenClass);
          element.classList.remove(this.transitionClass);
          element.style.willChange = "";
          if (callback) callback();
        }
      };
      element.addEventListener("transitionend", onTransitionEnd);
    });
  }

  fadeIn(element) {
    element.classList.remove(this.hiddenClass);
    element.classList.add(this.transitionClass);
    element.style.willChange = "opacity, transform";

    // Force reflow
    element.offsetHeight;

    requestAnimationFrame(() => {
      element.classList.add(this.visibleClass);

      const onTransitionEnd = (e) => {
        if (e.propertyName === "opacity") {
          element.removeEventListener("transitionend", onTransitionEnd);
          element.classList.remove(this.transitionClass);
          element.style.willChange = "";
        }
      };
      element.addEventListener("transitionend", onTransitionEnd);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TabsManager("#occasions-tabs-section");
});
