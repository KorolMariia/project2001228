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
const buttons = document.querySelectorAll('.btn--color');
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup_close');
buttons.forEach((button) =>
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    popup.classList.toggle('popup_open');
    document.body.style.overflow = 'hidden';
  }),
);
popupClose.addEventListener('click', () => {
  popup.classList.remove('popup_open');
  document.body.style.overflow = '';
});

document.addEventListener('click', (event) => {
  const target = event.target;
  if (!popup.contains(target) && target !== popup) {
    popup.classList.remove('popup_open');
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