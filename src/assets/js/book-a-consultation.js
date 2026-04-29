function initBookConsultationForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const actualPhone = document.getElementById("actualPhone");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("validMsg");

  const countryInput = document.getElementById("countryInput");
  const nationalityInput = document.getElementById("nationalityInput");
  const degreeInput = document.getElementById("degreeInput");
  const specializationInput = document.getElementById("specializationInput");
  const gpaInput = document.getElementById("gpaInput");

  const countryError = document.getElementById("countryError");
  const nationalityError = document.getElementById("nationalityError");
  const degreeError = document.getElementById("degreeError");
  const specializationError = document.getElementById("specializationError");
  const gpaError = document.getElementById("gpaError");

  if (
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !actualPhone ||
    !nameError ||
    !emailError ||
    !phoneError ||
    !countryInput ||
    !nationalityInput ||
    !degreeInput ||
    !specializationInput ||
    !gpaInput ||
    !countryError ||
    !nationalityError ||
    !degreeError ||
    !specializationError ||
    !gpaError
  ) {
    return;
  }

  let iti = null;
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !iti) {
      iti = window.intlTelInput(phoneInput, {
        initialCountry: "sa",
        preferredCountries: ["sa", "eg", "ae", "kw", "qa", "jo"],
        separateDialCode: true,
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
      });
      observer.disconnect();
    }
  });

  function validateName() {
    const value = nameInput.value.trim();
    const hasNumbers = /\d/.test(value);

    nameError.classList.add("hidden");
    nameError.children[0].classList.add("hidden");
    nameError.children[1].classList.add("hidden");

    if (value.length < 3) {
      nameError.classList.remove("hidden");
      nameError.children[0].classList.remove("hidden");
      return false;
    }

    if (hasNumbers) {
      nameError.classList.remove("hidden");
      nameError.children[1].classList.remove("hidden");
      return false;
    }

    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    const isValid = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i.test(value);

    if (isValid) {
      emailError.classList.add("hidden");
      return true;
    }

    emailError.classList.remove("hidden");
    return false;
  }

  function validatePhone() {
    const value = phoneInput.value.trim();
    phoneError.classList.add("hidden");

    if (!value) {
      phoneError.textContent = "الرجاء إدخال رقم الجوال";
      phoneError.classList.remove("hidden");
      return false;
    }

    if (iti && !iti.isValidNumber()) {
      phoneError.textContent = "الرجاء إدخال رقم جوال صحيح";
      phoneError.classList.remove("hidden");
      return false;
    }

    return true;
  }

  function validateSelect(selectElement, errorElement, message) {
    if (selectElement.value.trim() === "") {
      errorElement.textContent = message;
      errorElement.classList.remove("hidden");
      return false;
    }

    errorElement.classList.add("hidden");
    return true;
  }

  observer.observe(phoneInput);

  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });

  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  phoneInput.addEventListener("blur", validatePhone);

  countryInput.addEventListener("change", () =>
    validateSelect(countryInput, countryError, "الرجاء إدخال الدولة"),
  );
  countryInput.addEventListener("input", () =>
    validateSelect(countryInput, countryError, "الرجاء إدخال الدولة"),
  );
  nationalityInput.addEventListener("change", () =>
    validateSelect(nationalityInput, nationalityError, "الرجاء اختيار الجنسية"),
  );
  degreeInput.addEventListener("change", () =>
    validateSelect(degreeInput, degreeError, "الرجاء اختيار الدرجة العلمية"),
  );
  specializationInput.addEventListener("change", () =>
    validateSelect(
      specializationInput,
      specializationError,
      "الرجاء اختيار التخصص الدراسي",
    ),
  );
  gpaInput.addEventListener("change", () =>
    validateSelect(gpaInput, gpaError, "الرجاء اختيار المعدل الدراسي"),
  );

  form.addEventListener("submit", (event) => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isCountryValid = validateSelect(
      countryInput,
      countryError,
      "الرجاء إدخال الدولة",
    );
    const isNationalityValid = validateSelect(
      nationalityInput,
      nationalityError,
      "الرجاء اختيار الجنسية",
    );
    const isDegreeValid = validateSelect(
      degreeInput,
      degreeError,
      "الرجاء اختيار الدرجة العلمية",
    );
    const isSpecializationValid = validateSelect(
      specializationInput,
      specializationError,
      "الرجاء اختيار التخصص الدراسي",
    );
    const isGpaValid = validateSelect(
      gpaInput,
      gpaError,
      "الرجاء اختيار المعدل الدراسي",
    );

    if (
      isNameValid &&
      isEmailValid &&
      isPhoneValid &&
      isCountryValid &&
      isNationalityValid &&
      isDegreeValid &&
      isSpecializationValid &&
      isGpaValid
    ) {
      const dialCode = iti ? iti.getSelectedCountryData().dialCode : "";
      actualPhone.value = dialCode ? "+" + dialCode + phoneInput.value.trim() : phoneInput.value.trim();
      return;
    }

    event.preventDefault();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initBookConsultationForm();
});
