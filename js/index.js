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

// Popup
const buttons = document.querySelectorAll('.btn--openModal');
const popup = document.querySelector('.popup');

buttons.forEach((button) =>
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    event.preventDefault();
    popup.classList.toggle('popup_open');
    document.body.style.overflow = 'hidden';
  }),
);

// Popup Questions
const btnQuestions = document.querySelectorAll('.btn--questions');
const popupQuestions = document.querySelector('.popup__questions');

btnQuestions.forEach((btn) => {
  btn.addEventListener('click', () => {
    const questionsItem = btn.closest('.questions__item');
    const { textContent: title } = questionsItem.querySelector('.questions__title');
    const { textContent: subtitle } = questionsItem.querySelector('.questions__subtitle');

    popupQuestions.classList.toggle('popup_open');
    document.body.style.overflow = 'hidden';

    const popupContent = popupQuestions.querySelector('.popup__questions--content');
    popupContent.innerHTML = `<p class="questions__title">${title}</p><p class="questions__subtitle">${subtitle}</p>`;
  });
});

// Close Popup
const popupClose = document.querySelectorAll('.popup_close');

popupClose.forEach((button) =>
  button.addEventListener('click', (event) => {
    popup.classList.remove('popup_open');
    popupQuestions.classList.remove('popup_open');
    document.body.style.overflow = '';
  }),
);

window.onclick = function (e) {
  if (e.target.classList.contains('popup')) {
    e.target.classList.remove('popup_open');
    document.body.style.overflow = '';
  }
};

// Button to top
const scrollBtnToTop = document.querySelector('.btn--toTop');
scrollBtnToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});