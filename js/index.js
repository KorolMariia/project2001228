// Zoom images Uses
const liItems = document.querySelectorAll('.uses__zoom--img');
liItems.forEach((li) => {
  const img = li.querySelector('.zoomable-img');

  li.addEventListener('mouseenter', () => {
    img.classList.add('zoomed-img');
  });

  li.addEventListener('mouseleave', () => {
    img.classList.remove('zoomed-img');
  });
});

// Nav mobile
const mobileNavOpen = document.querySelector('.header__nav--open');
const navMobile = document.querySelector('.header__nav--xs');
const navLinks = document.querySelectorAll('.header__link--xs a');
const headerContacts = document.querySelectorAll('.header__contacts--img');

mobileNavOpen.addEventListener('click', () => {
  mobileNavOpen.classList.toggle('open');
  navMobile.classList.toggle('show');
});

navMobile.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('header__contacts--img') || target.closest('.header__link--xs')) {
    navMobile.classList.remove('show');
    mobileNavOpen.classList.remove('open');
  }
});

headerContacts.forEach((icon) => {
  icon.addEventListener('click', () => {
    navMobile.classList.remove('show');
    mobileNavOpen.classList.remove('open');
  });
});

// Popup
const buttons = document.querySelectorAll('.js--open--modal');
const popup = document.querySelector('.popup');

buttons.forEach((button) =>
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    popup.classList.toggle('show');
    document.body.style.overflow = 'hidden';
  }),
);

// Popup Questions
const btnQuestions = document.querySelectorAll('.js--popup--questions');
const popupQuestions = document.querySelector('.popup__questions');

btnQuestions.forEach((btn) => {
  btn.addEventListener('click', () => {
    const questionsItem = btn.closest('.questions__item');
    const { textContent: title } = questionsItem.querySelector('.questions__title');
    const { textContent: subtitle } = questionsItem.querySelector('.questions__subtitle');

    popupQuestions.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    const popupContent = popupQuestions.querySelector('.popup__questions--content');
    popupContent.innerHTML = `<p class="questions__title">${title}</p><p class="questions__subtitle">${subtitle}</p>`;
  });
  document.addEventListener('click', (event) => {
    if (event.target === popupQuestions) {
      popupQuestions.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
});

// Close Popup
const popupClose = document.querySelectorAll('.popup_close');

const countrySelects = document.querySelectorAll('.iti__country--list');
countrySelects.forEach((select) =>
  select.addEventListener('click', (event) => {
    event.stopPropagation();
  }),
);

popupClose.forEach((button) =>
  button.addEventListener('click', () => {
    popup.classList.remove('show');
    popupQuestions.classList.remove('show');
    document.body.style.overflow = '';
  }),
);
document.addEventListener('click', (event) => {
  const target = event.target;
  if (!target.closest('.popup__wrapper') && !target.closest('.popup_close')) {
    popup.classList.remove('show');
    document.body.style.overflow = '';
  }
});

// Button to top
const scrollBtnToTop = document.querySelector('.btn--toTop');
scrollBtnToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});

// Form error
const formError = document.querySelectorAll('.js--form--error');

formError.forEach((button) =>
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const parentForm = button.parentElement;
    if (parentForm) {
      const formInputs = parentForm.querySelectorAll('.form__input');
      const errorHidden = parentForm.querySelectorAll('.error--hidden');
      formInputs.forEach((input) => {
        input.classList.toggle('error--active');
      });
      errorHidden.forEach((error) => {
        error.classList.toggle('error--text');
      });
    }
  }),
);

// Form country code
const inputs = document.querySelectorAll(".js--phone");
let itiInstances = [];

inputs.forEach(input => {
  let iti;
  const countryCodeSpan = document.createElement("span");
  countryCodeSpan.classList.add("iti__country--code");

  window.intlTelInput(input, {
    initialCountry: "ru",
    geoIpLookup: callback => {
      fetch("https://ipapi.co/json")
        .then(res => res.json())
        .then(data => callback(data.country_code))
        .catch(() => callback("us"));
    }
  });

  window.addEventListener("load", () => {
    iti = window.intlTelInputGlobals.getInstance(input);
    itiInstances.push(iti);

    if (iti.getSelectedCountryData().iso2 === "ru") {
      const dialCode = iti.getSelectedCountryData().dialCode;
      countryCodeSpan.textContent = `+${dialCode}`;

      const numberFormat = getNumberFormat("ru");
      applyInputMask(input, numberFormat, dialCode);
    }
  });

  input.addEventListener("countrychange", () => {
    const selectedCountryData = iti.getSelectedCountryData();
    const dialCode = selectedCountryData.dialCode;
    countryCodeSpan.textContent = `+${dialCode}`;

    const numberFormat = getNumberFormat(selectedCountryData.iso2);
    applyInputMask(input, numberFormat);
  });

  input.parentNode.insertBefore(countryCodeSpan, input.nextSibling);

  input.addEventListener("focus", () => {
    input.placeholder = "";
  });

  input.addEventListener("blur", () => {
    input.placeholder = "(999)999-99-99";
  });
});

const getNumberFormat = (countryCode) => {
  const phoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
  const phoneNumber = phoneNumberUtil.getExampleNumberForType(countryCode, libphonenumber.PhoneNumberType.MOBILE);
  const formattedNumber = phoneNumberUtil.format(phoneNumber, libphonenumber.PhoneNumberFormat.INTERNATIONAL);
  return formattedNumber;
}

const applyInputMask = (input, numberFormat) => {
  input.value = "";
  input.removeAttribute("readonly");

  const countryCode = numberFormat.substring(0, numberFormat.indexOf(" "));
  const mask = numberFormat.replace(countryCode, "").trim();

  const inputMask = new Inputmask({
    mask: mask.replace(/[0-9]/g, "9"),
    showMaskOnHover: false,
    showMaskOnFocus: false,
    jitMasking: true
  });

  if (input.inputmask) {
    input.inputmask.remove();
  }
  inputMask.mask(input);

  input.placeholder = mask;

  input.addEventListener("blur", () => {
    if (input.value.trim() === "") {
      input.placeholder = mask;
    }
  });
};