document.addEventListener("DOMContentLoaded", () => {
  initBecomeConsultantForm();
});

function initBecomeConsultantForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("nameInput");
  const emailInput = document.getElementById("emailInput");
  const phoneInput = document.getElementById("phoneInput");
  const messageInput = document.getElementById("message");
  const actualPhone = document.getElementById("actualPhone");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("validMsg");
  const messageError = document.getElementById("messageError");
  const cvInput = document.getElementById("cvUpload");
  const cvTrigger = document.getElementById("cvUploadTrigger");
  const cvFileName = document.getElementById("cvFileName");
  const cvError = document.getElementById("cvError");

  if (
    !form ||
    !nameInput ||
    !emailInput ||
    !phoneInput ||
    !messageInput ||
    !actualPhone ||
    !nameError ||
    !emailError ||
    !phoneError ||
    !messageError ||
    !cvInput ||
    !cvTrigger ||
    !cvFileName
  ) {
    return;
  }

  const iti =
    typeof window.intlTelInput === "function"
      ? window.intlTelInput(phoneInput, {
          initialCountry: "sa",
          preferredCountries: ["sa", "eg", "ae", "kw", "qa", "jo"],
          separateDialCode: true,
          utilsScript:
            "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.13/js/utils.js",
        })
      : null;

  const defaultText = "الحد الأقصى لحجم الملف 2 ميجابايت";
  const maxSizeInBytes = 2 * 1024 * 1024;

  const validateName = () => {
    const value = nameInput.value.trim();
    const hasNumber = /\d/.test(value);

    nameError.classList.add("hidden");
    nameError.children[0]?.classList.add("hidden");
    nameError.children[1]?.classList.add("hidden");

    if (value.length < 3) {
      nameError.classList.remove("hidden");
      nameError.children[0]?.classList.remove("hidden");
      return false;
    }

    if (hasNumber) {
      nameError.classList.remove("hidden");
      nameError.children[1]?.classList.remove("hidden");
      return false;
    }

    return true;
  };

  const validateEmail = () => {
    const value = emailInput.value.trim();
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i;

    if (!regex.test(value)) {
      emailError.classList.remove("hidden");
      return false;
    }

    emailError.classList.add("hidden");
    return true;
  };

  const validatePhone = () => {
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
  };

  const validateMessage = () => {
    const value = messageInput.value.trim();
    if (value.length < 10) {
      messageError.classList.remove("hidden");
      return false;
    }

    messageError.classList.add("hidden");
    return true;
  };

  const resetFieldState = () => {
    cvInput.value = "";
    cvFileName.textContent = defaultText;
    cvFileName.classList.remove("text-natural-700");
    cvFileName.classList.add("text-natural-400");
    if (cvError) cvError.classList.add("hidden");
  };

  const showSelectedFile = (file) => {
    cvFileName.textContent = file.name;
    cvFileName.classList.remove("text-natural-400");
    cvFileName.classList.add("text-natural-700");
    if (cvError) cvError.classList.add("hidden");
  };

  const validateSelectedFile = () => {
    const selectedFile = cvInput.files?.[0];
    if (!selectedFile) {
      resetFieldState();
      return true;
    }

    if (selectedFile.size > maxSizeInBytes) {
      if (cvError) cvError.classList.remove("hidden");
      resetFieldState();
      return false;
    }

    showSelectedFile(selectedFile);
    return true;
  };

  cvTrigger.addEventListener("click", () => {
    cvInput.click();
  });

  cvTrigger.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cvInput.click();
    }
  });

  cvInput.addEventListener("change", validateSelectedFile);

  phoneInput.addEventListener("input", function () {
    this.value = this.value.replace(/\D/g, "");
  });
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  phoneInput.addEventListener("input", validatePhone);
  phoneInput.addEventListener("blur", validatePhone);
  messageInput.addEventListener("input", validateMessage);

  form.addEventListener("submit", (event) => {
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();
    const isCvValid = validateSelectedFile();

    if (iti) {
      const countryData = iti.getSelectedCountryData();
      const dialCode = countryData?.dialCode || "";
      actualPhone.value = dialCode + phoneInput.value.trim();
    } else {
      actualPhone.value = phoneInput.value.trim();
    }

    if (
      !isNameValid ||
      !isEmailValid ||
      !isPhoneValid ||
      !isMessageValid ||
      !isCvValid
    ) {
      event.preventDefault();
    }
  });
}
