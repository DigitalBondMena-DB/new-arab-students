const Animations = (() => {
  const e = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
    distance: "100px",
    duration: "0.8s",
    timing: "cubic-bezier(0.22, 1, 0.36, 1)",
  };

  const t = (e, t) => {
    e.forEach((e) => {
      if (e.isIntersecting) {
        o(e.target);
        t.unobserve(e.target);
      }
    });
  };

  const n = (t) => {
    const direction = t.dataset.animationDirection || "start";
    const dist = t.dataset.animationDistance || e.distance;
    const duration = t.dataset.animationDuration || e.duration;
    const delay = t.dataset.animationDelay || "0s";

    // Prepare initial state without transition
    t.style.opacity = "0";
    t.style.transition = "none";
    t.style.willChange = "transform, opacity";

    let x = "0",
      y = "0";
    const isRTL =
      document.dir === "rtl" || document.documentElement.dir === "rtl";

    switch (direction) {
      case "start":
        x = isRTL ? dist : `-${dist}`;
        break;
      case "end":
        x = isRTL ? `-${dist}` : dist;
        break;
      case "top":
        y = `-${dist}`;
        break;
      case "bottom":
        y = dist;
        break;
      case "fade-out":
        break;
    }

    t.style.transform = `translate3d(${x}, ${y}, 0)`;
  };

  const o = (t) => {
    const duration = t.dataset.animationDuration || e.duration;
    const delay = t.dataset.animationDelay || "0s";

    // Add transition and move to final state in the next frame
    requestAnimationFrame(() => {
      t.style.transition = `transform ${duration} ${e.timing}, opacity ${duration} ${e.timing}`;
      t.style.transitionDelay = delay;
      t.style.opacity = "1";
      t.style.transform = "translate3d(0, 0, 0)";

      const onEnd = () => {
        t.style.willChange = "auto";
        t.removeEventListener("transitionend", onEnd);
      };
      t.addEventListener("transitionend", onEnd);
    });
  };

  return {
    init: (config = {}) => {
      try {
        const settings = { ...e, ...config };
        const elements = document.querySelectorAll("[data-animate]");
        if (0 === elements.length) return;

        const observer = new IntersectionObserver(t, {
          threshold: settings.threshold,
          rootMargin: settings.rootMargin,
        });

        elements.forEach((el) => {
          n(el);
          observer.observe(el);
        });
      } catch (err) {
        console.warn("Animations.js: Initialization failed", err);
      }
    },
  };
})();
document.addEventListener("DOMContentLoaded", () => {
  (Animations.init(),
    syncMobileMenu(),
    handleDesktopNavigation(),
    handleMobileNavigation(),
    handleGlobalEvents(),
    handleSocialBarTheme());
});
let activeDropdown = null;
function syncMobileMenu() {
  const e = () => {
    const e = document.querySelector("#sidenav-content nav"),
      t = document.querySelectorAll("header > div nav > ul");
    if (!e || 0 === t.length) return;
    const n = document.createDocumentFragment();
    t.forEach((e) => {
      Array.from(e.children).forEach((e) => {
        const t = e.querySelector("a"),
          o = e.querySelector("span")?.textContent || t?.textContent,
          a = e.querySelector(".dropdown-menu");
        if (a) {
          const e = document.createElement("div");
          e.className = "mobile-dropdown";
          const t = document.createElement("button");
          ((t.className =
            "flex items-center justify-between w-full hover:text-primary transition-colors"),
            (t.innerHTML = `\n            <span>${o}</span>\n            <img src="../../assets/images/shared/icons/chevron-down.svg" width="16" height="16" loading="lazy" decoding="async" alt="Chevron" class="w-4 h-4 transition-transform duration-300" />\n          `));
          const s = document.createElement("div");
          ((s.className =
            "hidden flex-col gap-3 pr-4 mt-3 text-lg text-natural-500"),
            a.querySelectorAll("a").forEach((e) => {
              const t = e.cloneNode(!0);
              ((t.className = "hover:text-primary transition-colors"),
                s.appendChild(t));
            }),
            e.appendChild(t),
            e.appendChild(s),
            n.appendChild(e));
        } else if (t) {
          const e = t.cloneNode(!0);
          ((e.className =
            "hover:text-primary transition-colors border-b border-natural-75 pb-2"),
            n.appendChild(e));
        }
      });
    });
    const o = Array.from(
      e.querySelectorAll("a.border-secondary, a[href*='contact']"),
    );
    ((e.innerHTML = ""),
      e.appendChild(n),
      o.forEach((t) => {
        (t.classList.add("mt-8"), e.appendChild(t));
      }));
  };
  "requestIdleCallback" in window ? requestIdleCallback(e) : setTimeout(e, 1);
}
function handleDesktopNavigation() {
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-dropdown-trigger]"),
      n = e.target.closest(".dropdown-menu a");
    t
      ? (e.preventDefault(), e.stopPropagation(), toggleDropdown(t))
      : (n || (activeDropdown && !e.target.closest(".dropdown-menu"))) &&
        closeAllDropdowns();
  });
}
function toggleDropdown(e) {
  const t = e.querySelector(".dropdown-menu"),
    n = e.querySelector("svg, img");
  if (
    (activeDropdown && activeDropdown !== t && closeDropdown(activeDropdown),
    !t)
  )
    return;
  t.classList.contains("visible") ? closeDropdown(t) : openDropdown(t, n);
}
function openDropdown(e, t) {
  (e.classList.remove("invisible", "opacity-0", "translate-y-4"),
    e.classList.add("visible", "opacity-100", "translate-y-0"),
    t && t.classList.add("rotate-180"),
    (activeDropdown = e));
}
function closeDropdown(e) {
  if (!e) return;
  const t = e.closest("[data-dropdown-trigger]"),
    n = t ? t.querySelector("svg, img") : null;
  (e.classList.add("invisible", "opacity-0", "translate-y-4"),
    e.classList.remove("visible", "opacity-100", "translate-y-0"),
    n && n.classList.remove("rotate-180"),
    activeDropdown === e && (activeDropdown = null));
}
function closeAllDropdowns() {
  document
    .querySelectorAll(".dropdown-menu.visible")
    .forEach((e) => closeDropdown(e));
}
function handleMobileNavigation() {
  const e = document.getElementById("mobile-menu-toggle"),
    t = document.getElementById("mobile-menu-close"),
    n = document.getElementById("sidenav-overlay"),
    o = document.querySelector("#sidenav-content nav");
  (e?.addEventListener("click", (e) => {
    (e.preventDefault(), setSidenavState(!0));
  }),
    t?.addEventListener("click", (e) => {
      (e.preventDefault(), setSidenavState(!1));
    }),
    n?.addEventListener("click", () => setSidenavState(!1)),
    o?.addEventListener("click", (e) => {
      const t = e.target.closest(".mobile-dropdown button");
      t && (e.preventDefault(), toggleMobileDropdown(t.parentElement));
    }));
}
function setSidenavState(e) {
  const t = document.getElementById("mobile-sidenav"),
    n = document.getElementById("sidenav-content"),
    o = document.getElementById("sidenav-overlay");
  e
    ? (t.classList.remove("invisible"),
      o.classList.remove("opacity-0"),
      o.classList.add("opacity-100"),
      n.classList.remove("translate-x-full", "ltr:-translate-x-full!"),
      n.classList.add("translate-x-0"),
      (document.body.style.overflow = "hidden"))
    : (o.classList.remove("opacity-100"),
      o.classList.add("opacity-0"),
      n.classList.remove("translate-x-0"),
      n.classList.add("translate-x-full", "ltr:-translate-x-full!"),
      setTimeout(() => {
        (t.classList.add("invisible"), (document.body.style.overflow = ""));
      }, 300));
}
function toggleMobileDropdown(e) {
  const t = e.querySelector("div"),
    n = e.querySelector("img");
  t.classList.contains("hidden")
    ? (t.classList.remove("hidden"),
      t.classList.add("flex"),
      n.classList.add("rotate-180"))
    : (t.classList.add("hidden"),
      t.classList.remove("flex"),
      n.classList.remove("rotate-180"));
}
function handleGlobalEvents() {
  let e;
  (document.addEventListener("keydown", (e) => {
    "Escape" === e.key && (closeAllDropdowns(), setSidenavState(!1));
  }),
    window.addEventListener("resize", () => {
      (clearTimeout(e),
        (e = setTimeout(() => {
          window.innerWidth >= 1341 && setSidenavState(!1);
        }, 250)));
    }));
}
function handleSocialBarTheme() {
  const socialBar = document.getElementById("social-bar");
  if (!socialBar) return;
  const sections = document.querySelectorAll("section, header, footer");
  const updateTheme = () => {
    const barRect = socialBar.getBoundingClientRect();
    const barMid = barRect.top + barRect.height / 2;
    let currentTheme = "light";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= barMid && rect.bottom >= barMid) {
        if (
          section.classList.contains("hero-section") ||
          section.classList.contains("bg-primary") ||
          "dark" === section.dataset.theme
        ) {
          currentTheme = "dark";
        }
      }
    });
    if ("dark" === currentTheme) {
      socialBar.classList.remove("text-natural-900");
      socialBar.classList.add("text-natural-25");
      socialBar.querySelectorAll("img").forEach((img) => {
        img.style.filter = "none";
      });
    } else {
      socialBar.classList.remove("text-natural-25");
      socialBar.classList.add("text-natural-900");
      socialBar.querySelectorAll("img").forEach((img) => {
        img.style.filter = "invert(1) brightness(0)";
      });
    }
  };
  window.addEventListener("scroll", updateTheme, { passive: true });
  updateTheme();
}
