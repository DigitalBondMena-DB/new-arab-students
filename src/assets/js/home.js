function initSpecializationsSwiper() {
  const e = document.querySelector(".specializations-swiper");
  e &&
    new Swiper(e, {
      slidesPerView: 1.2,
      spaceBetween: 16,
      centeredSlides: !0,
      a11y: {
        enabled: !0,
        prevSlideMessage: "السابق",
        nextSlideMessage: "التالي",
      },
      grabCursor: !0,
      watchSlidesProgress: !0,
      navigation: { nextEl: ".swiper-spec-next", prevEl: ".swiper-spec-prev" },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 24, centeredSlides: !1 },
        1024: { slidesPerView: 3, spaceBetween: 32, centeredSlides: !1 },
      },
      on: {
        init: function () {
          [
            document.querySelector(".swiper-spec-prev"),
            document.querySelector(".swiper-spec-next"),
          ].forEach((e) => {
            e &&
              e.addEventListener("mousedown", function () {
                this.style.outline = "none";
              });
          });
        },
      },
    });
}
function initStoriesSwiper() {
  const e = document.querySelector(".stories-swiper");
  if (!e) return;
  const t = document.getElementById("stories-fraction"),
    n = document.querySelector(".stories-progressbar-fill"),
    i = document.querySelector(".stories-prev-btn"),
    s = document.querySelector(".stories-next-btn");
  function r(e) {
    const i = e.slides.length,
      s = e.activeIndex + 1;
    if ((t && (t.textContent = `${s}/${i}`), n)) {
      const e = (s / i) * 100;
      n.style.width = `${e}%`;
    }
  }
  new Swiper(e, {
    effect: "creative",
    grabCursor: !0,
    loop: !1,
    allowTouchMove: !1,
    speed: 600,
    creativeEffect: {
      prev: { shadow: !1, translate: ["-120%", 0, 0] },
      next: { translate: [0, 20, -20], scale: 0.95, opacity: 0.5 },
    },
    navigation: { nextEl: s, prevEl: i },
    on: {
      init: function () {
        r(this);
      },
      slideChange: function () {
        r(this);
      },
    },
  });
}
function initContactForm() {
  const e = document.getElementById("contactForm");
  if (!e) return;
  const t = document.getElementById("nameInput"),
    n = document.getElementById("emailInput"),
    i = document.getElementById("phoneInput"),
    s = document.getElementById("message"),
    r = document.getElementById("actualPhone"),
    o = document.getElementById("nameError"),
    d = document.getElementById("emailError"),
    c = document.getElementById("validMsg"),
    l = document.getElementById("messageError");
  let iti = null;
  const u = new IntersectionObserver((e) => {
    e[0].isIntersecting &&
      !iti &&
      ((iti = window.intlTelInput(i, {
        initialCountry: "sa",
        preferredCountries: ["sa", "eg", "ae", "kw", "qa", "jo"],
        separateDialCode: !0,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
      })),
      u.disconnect());
  });
  function m() {
    const e = t.value.trim(),
      n = /\d/.test(e);
    return (
      o.classList.add("hidden"),
      o.children[0].classList.add("hidden"),
      o.children[1].classList.add("hidden"),
      e.length < 3
        ? (o.classList.remove("hidden"),
          o.children[0].classList.remove("hidden"),
          !1)
        : !n ||
          (o.classList.remove("hidden"),
          o.children[1].classList.remove("hidden"),
          !1)
    );
  }
  function p() {
    const e = n.value.trim();
    return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i.test(e)
      ? (d.classList.add("hidden"), !0)
      : (d.classList.remove("hidden"), !1);
  }
  function v() {
    const e = i.value.trim();
    return (
      c.classList.add("hidden"),
      e
        ? (iti && iti.isValidNumber()) ||
          ((c.textContent = "الرجاء إدخال رقم جوال صحيح"),
          c.classList.remove("hidden"),
          !1)
        : ((c.textContent = "الرجاء إدخال رقم الجوال"),
          c.classList.remove("hidden"),
          !1)
    );
  }
  function h() {
    return s.value.trim().length < 10
      ? (l.classList.remove("hidden"), !1)
      : (l.classList.add("hidden"), !0);
  }
  (u.observe(i),
    i.addEventListener("input", function () {
      this.value = this.value.replace(/\D/g, "");
    }),
    t.addEventListener("input", m),
    n.addEventListener("input", p),
    i.addEventListener("input", v),
    i.addEventListener("blur", v),
    s.addEventListener("input", h),
    e.addEventListener("submit", function (e) {
      const t = m(),
        n = p(),
        s = v(),
        o = h();
      if (t && n && s && o) {
        const e = iti.getSelectedCountryData().dialCode,
          t = i.value.trim();
        ((r.value = +(+e) + t),
          console.log("Form is valid. Full Phone:", r.value));
      } else (e.preventDefault(), console.log("Form validation failed."));
    }));
}
document.addEventListener("DOMContentLoaded", () => {
  (initSpecializationsSwiper(), initStoriesSwiper(), initContactForm());
});
