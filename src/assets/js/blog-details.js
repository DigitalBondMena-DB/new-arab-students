function createContactBox() {
  const isEn = document.documentElement.dir !== "rtl";
  const contactDiv = document.createElement("div");
  contactDiv.innerHTML = isEn
    ? `
    <div class="contact-box flex flex-col lg:flex-row text-center justify-between items-center mt-6 px-4 py-10 rounded-[10px]">
      <div>
        <h5>You want to study abroad</h5>
        <p class="text-lg !text-main-text font-medium">Contact an academic expert now</p>
      </div>
      <div class="mt-3 gap-2 flex items-center justify-center">
        <a href="https://wa.me/201287911113" target="_blank" class="px-6 py-2 bg-main-green rounded-full text-main-white">WhatsApp</a>
        <a href="tel:+201287911113" class="px-6 py-2 bg-main-text rounded-full text-main-white">Contact us</a>
      </div>
    </div>
  `
    : `
    <div class="contact-box mt-6 px-4 py-10 rounded-[10px] relative overflow-hidden">
    <img src="../../assets/images/home/study-outside-bg.webp" width="976" height="173" alt="" loading="lazy" decoding="async" role="presentation" class="absolute inset-0 size-full object-cover object-center">
    <div class="z-10 relative flex flex-col lg:flex-row text-center lg:text-start  justify-between items-center">
    <div>
      <h5 class="text-2xl! text-natural-100! font-normal! mb-2">بوابة قبول جامعات مصر</h5>
      <p class="text-lg! text-natural-100! font-normal!">للاستفسار عن دراسة الطب في مصر للسودانيين تواصل معنا الان!</p>
    </div>
    <div class="mt-3 gap-4 flex items-center justify-center">
      <a href="https://wa.me/" target="_blank" class="px-4 py-2.5 bg-main-green rounded-lg text-natural-100 bg-[#25D366] flex items-center gap-4">
      <span>واتس اب</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><path fill="#fff" fill-rule="evenodd" d="M9.597 0C4.305 0 0 4.306 0 9.6c0 2.1.677 4.046 1.828 5.627L.632 18.794l3.69-1.18a9.52 9.52 0 0 0 5.28 1.586c5.293 0 9.598-4.306 9.598-9.6S14.895 0 9.603 0zm-2.68 4.876c-.186-.445-.327-.462-.61-.474a5 5 0 0 0-.32-.011c-.368 0-.751.107-.983.344-.282.288-.981.96-.981 2.337s1.004 2.709 1.14 2.895c.14.186 1.957 3.053 4.778 4.222 2.206.914 2.861.83 3.363.722.733-.158 1.653-.7 1.885-1.355.23-.654.23-1.213.163-1.332-.068-.118-.254-.186-.536-.327s-1.653-.818-1.913-.909c-.254-.095-.496-.062-.688.21-.27.377-.536.761-.75.993-.17.18-.446.203-.677.107-.31-.13-1.18-.435-2.252-1.389-.829-.739-1.393-1.659-1.557-1.935-.163-.282-.017-.446.113-.598.141-.176.276-.3.418-.463.14-.164.22-.249.31-.44.096-.187.028-.379-.04-.52-.067-.141-.631-1.518-.863-2.077" clip-rule="evenodd"/></svg>
      </a>
<a href="tel:0123123" target="_blank" class="px-4 py-2.5 bg-main-green rounded-lg text-natural-100 bg-secondary flex items-center gap-4">
      <span>اتصل بنا</span>
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none"><g clip-path="url(#a)"><path stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.708 1.667a7.5 7.5 0 0 1 6.667 6.616M11.708 5A4.17 4.17 0 0 1 15 8.333m3.333 5.767v2.5a1.667 1.667 0 0 1-1.816 1.667 16.5 16.5 0 0 1-7.192-2.559 16.25 16.25 0 0 1-5-5 16.5 16.5 0 0 1-2.558-7.225 1.666 1.666 0 0 1 1.658-1.816h2.5A1.67 1.67 0 0 1 7.592 3.1c.105.8.3 1.586.583 2.342A1.67 1.67 0 0 1 7.8 7.2L6.742 8.258a13.33 13.33 0 0 0 5 5L12.8 12.2a1.67 1.67 0 0 1 1.758-.375c.756.282 1.542.478 2.342.583a1.666 1.666 0 0 1 1.433 1.692"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h20v20H0z"/></clipPath></defs></svg>      
</a>    
</div>
    </div>
    </div>
  `;
  return contactDiv;
}
function generateRandomId() {
  return "id-" + Math.random().toString(36).substring(2, 9);
}
function generateTableOfContents() {
  const container = document.getElementById("articleContainer");
  const tocContainers = document.querySelectorAll(".tableOfContents ul");
  if (!container || tocContainers.length === 0) return;

  const headings = container.querySelectorAll("h2");
  const allLinks = [];

  tocContainers.forEach((con) => {
    con.innerHTML = "";
    headings.forEach((heading, index) => {
      let id = heading.getAttribute("id");
      if (!id) {
        id = generateRandomId();
        heading.setAttribute("id", id);
      }

      const li = document.createElement("li");
      const a = document.createElement("a");
      a.textContent = `${index + 1}- ${heading.textContent}`;
      a.href = `#${id}`;
      a.dataset.targetId = id;
      a.className = `block text-natural-400 hover:text-natural-100/70 transition-colors duration-300 text-lg leading-[28px]`;

      a.addEventListener("click", (e) => {
        e.preventDefault();
        const targetElement = document.getElementById(id);
        if (targetElement) {
          const headerOffset = 180;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });

      li.appendChild(a);
      con.appendChild(li);
      allLinks.push(a);
    });
  });

  // Intersection Observer for highlighting active link
  const observerOptions = {
    root: null,
    rootMargin: "-180px 0px -60% 0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        allLinks.forEach((link) => {
          if (link.dataset.targetId === id) {
            link.classList.remove("text-natural-400");
            link.classList.add("text-natural-100");
          } else {
            link.classList.remove("text-natural-100");
            link.classList.add("text-natural-400");
          }
        });
      }
    });
  }, observerOptions);

  headings.forEach((heading) => observer.observe(heading));
}
function insertContactBox() {
  const container = document.getElementById("articleContainer");
  const paragraphs = [...container.querySelectorAll("p")].filter((p) => {
    return !p.closest("table");
  });
  paragraphs.forEach((h2, index) => {
    if ((index + 1) % 8 === 0) {
      const contactDiv = createContactBox();
      h2.insertAdjacentElement("beforebegin", contactDiv);
    }
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
  insertContactBox();
  generateTableOfContents();
  initContactForm();
});
