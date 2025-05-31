document.addEventListener('DOMContentLoaded', function() {
  initMaskedInput();
  setupProjectFilters();
  setupFormValidation();
  updateCurrentYear();
  setupSmoothScrolling();
  setupMobileMenu();
  setupProjectCarousel();
  sendToTelegram(formData);
});

function initMaskedInput() {
  const phoneInput = document.getElementById('phone');
  if (!phoneInput) return;
  
  try {
    IMask(phoneInput, {
      mask: '+{7} (000) 000-00-00',
      lazy: false,
      placeholderChar: '_'
    });
  } catch (error) {
    console.error('Ошибка инициализации маски:', error);
    phoneInput.type = 'tel';
    phoneInput.placeholder = '+7 (XXX) XXX-XX-XX';
  }
}

function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filters button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.dataset.category;
      const cardsContainer = document.querySelector('.project-cards');
      
      cardsContainer.style.opacity = '0.5';
      cardsContainer.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        projectCards.forEach(card => {
          card.style.display = (category === 'all' || card.dataset.category === category) 
            ? 'block' 
            : 'none';
        });
        
        cardsContainer.style.opacity = '1';
        
        if (category !== 'all') {
          document.querySelector('#projects').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    });
  });
}

function setupFormValidation() {
  const form = document.getElementById('request-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
      name: form.elements['name'].value.trim(),
      phone: form.elements['phone'].value,
      service: form.elements['service'].value,
      message: form.elements['message'].value.trim()
    };

    if (formData.phone.replace(/\D/g, '').length !== 11) {
      alert('Введите корректный номер телефона');
      return;
    }

    const isSent = await sendToTelegram(formData);
    
    if (isSent) {
      alert('✅ Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    } else {
      alert('❌ Ошибка отправки. Пожалуйста, попробуйте позже.');
    }
  });
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
      
      try {
        const targetElement = document.querySelector(targetId);
        if (!targetElement) throw new Error('Целевой элемент не найден');
        
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      } catch (error) {
        console.error('Ошибка плавного скролла:', error);
        // Fallback для старых браузеров
        window.location.href = targetId;
      }
    });
  });
}

function setupMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  if (!menuToggle) return;
  
  const navLinks = document.querySelector('.nav-links');
  const body = document.body;
  
  menuToggle.addEventListener('click', () => {
    const isOpening = !navLinks.classList.contains('active');
    
    navLinks.classList.toggle('active');
    menuToggle.setAttribute('aria-expanded', isOpening);
    
    body.style.overflow = isOpening ? 'hidden' : '';
    
    menuToggle.innerHTML = isOpening 
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
  
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      body.style.overflow = '';
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function setupProjectCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  // Клонируем существующие карточки
  const cards = Array.from(document.querySelectorAll('.project-card'));
  
  // Очищаем старый grid и переносим карточки в карусель
  document.querySelector('.project-cards').style.display = 'none';
  carouselTrack.innerHTML = '';
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.style.minWidth = '350px';
    clone.style.margin = '0';
    carouselTrack.appendChild(clone);
  });
  
  // Инициализация карусели
  let currentIndex = 0;
  const cardWidth = 350; // Ширина карточки + gap
  const visibleCards = Math.min(3, cards.length);
  
  // Создаем точки навигации
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  // Функция перехода к слайду
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, cards.length - visibleCards));
    carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Обновляем активную точку
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  // Кнопки навигации
  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
  // Автопрокрутка (опционально)
  let autoScroll = setInterval(() => {
    goToSlide((currentIndex + 1) % (cards.length - visibleCards + 1));
  }, 5000);
  
  // Пауза при наведении
  carouselTrack.addEventListener('mouseenter', () => clearInterval(autoScroll));
  carouselTrack.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      goToSlide((currentIndex + 1) % (cards.length - visibleCards + 1));
    }, 5000);
  });
}

async function sendToTelegram(formData) {
  const botToken = '7578279966:AAFBTym2L5mWB18toYbHDnfXk6qOKPD3fmM';
  const chatId = '7578279966';
  
  const text = `📌 Новая заявка!\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nУслуга: ${formData.service}\nСообщение: ${formData.message || '—'}`;

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML'
      })
    });
    
    return response.ok;
  } catch (error) {
    console.error('Ошибка:', error);
    return false;
  }
}