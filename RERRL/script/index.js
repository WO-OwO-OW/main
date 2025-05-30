document.addEventListener('DOMContentLoaded', function() {
  // Удаляем все функции, связанные с модальным окном
  
  // Оставляем только эти функции:
  initMaskedInput();
  setupProjectFilters();
  setupFormValidation();
  updateCurrentYear();
  setupSmoothScrolling();
  setupMobileMenu();
});

function initMaskedInput() {
  const phoneInput = document.getElementById('phone');
  if (phoneInput) {
    IMask(phoneInput, {
      mask: '+{7} (000) 000-00-00',
      lazy: false,
      placeholderChar: '_'
    });
  }
}

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filters button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      projectCards.forEach(card => {
        card.style.display = (category === 'all' || card.getAttribute('data-category') === category) 
          ? 'block' 
          : 'none';
      });
      
      document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });
}

function setupFormValidation() {
  const form = document.getElementById('request-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const phone = document.getElementById('phone').value;
      if (phone.replace(/\D/g, '').length !== 11) {
        alert('Введите корректный номер телефона');
        return;
      }
      
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    });
  }
}

function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

function setupSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    });
  }
}