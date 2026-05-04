function initFaqAccordion() {
  const accordion = document.getElementById("faqAccordion");
  if (!accordion) return;

  accordion.addEventListener("click", function (e) {
    const trigger = e.target.closest("[data-accordion-trigger]");
    if (!trigger) return;

    const item = trigger.closest("[data-accordion-item]");
    if (!item) return;

    const isOpen = item.hasAttribute("data-open");

    // Prevent closing if it's already the only open item
    if (isOpen) return;

    // Close all other items
    accordion.querySelectorAll("[data-accordion-item][data-open]").forEach((openItem) => {
      openItem.removeAttribute("data-open");
      openItem.querySelector("[data-accordion-trigger]").setAttribute("aria-expanded", "false");
    });

    // Open the clicked item
    item.setAttribute("data-open", "");
    trigger.setAttribute("aria-expanded", "true");
  });
}
document.addEventListener("DOMContentLoaded", () => {
  initFaqAccordion();
});
