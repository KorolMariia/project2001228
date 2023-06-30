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

mobileNavOpen.addEventListener('click', () => {
  navMobile.classList.toggle('show');
});

navMobile.addEventListener('click', (event) => {
  const target = event.target;
  if (target.classList.contains('header-contacts--icon')) {
    navMobile.classList.remove('show');
  }
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('show');
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