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

// Button to top
const scrollBtnToTop = document.querySelector('.btn--toTop');
scrollBtnToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});