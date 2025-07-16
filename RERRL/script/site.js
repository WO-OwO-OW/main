// Конфигурация Telegram
const TELEGRAM_CONFIG = {
  BOT_TOKEN: '7578279966:AAFBTym2L5mWB18toYbHDnfXk6qOKPD3fmM', 
  CHAT_ID: '1263043831'
};

document.addEventListener('DOMContentLoaded', function() {
  initMaskedInput();
  
  // Скрываем все карточки кроме первой категории при загрузке
  const projectCards = document.querySelectorAll('.project-card');
  if (window.location.pathname.includes('apps.html')) {
    projectCards.forEach(card => {
      if (card.dataset.category !== 'mobile') {
        card.style.display = 'none';
      } else {
        card.style.display = 'block';
      }
    });
  } else {
    projectCards.forEach(card => {
      if (card.dataset.category !== 'landing') {
        card.style.display = 'none';
      }
    });
  }
  
  setupProjectFilters();
  setupProjectCarousel(); // Инициализируем карусель для первой категории по умолчанию
  setupReviewsCarousel();
  setupFormValidation();
  setupMobileMenu();
  setupSmoothScrolling();
  updateCurrentYear();
  setupSectionFadeBlur();
});

// Инициализация маски для телефона
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

// Фильтрация проектов
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filters button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      const category = button.dataset.category;
      const carouselTrack = document.querySelector('.carousel-track');
      
      carouselTrack.style.opacity = '0.5';
      carouselTrack.style.transition = 'opacity 0.3s ease';
      
      setTimeout(() => {
        projectCards.forEach(card => {
          if (card.dataset.category === category) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
        
        carouselTrack.style.opacity = '1';
        
        // Пересоздаем карусель для новой категории
        setupProjectCarousel();
      }, 300);
    });
  });
}

// Карусель проектов
function setupProjectCarousel() {
  const carouselTrack = document.querySelector('.carousel-track');
  const prevBtn = document.querySelector('.carousel-prev');
  const nextBtn = document.querySelector('.carousel-next');
  const dotsContainer = document.querySelector('.carousel-dots');
  
  if (!carouselTrack) return;
  
  // Очищаем предыдущие точки
  dotsContainer.innerHTML = '';
  
  // Получаем только видимые карточки (с display: block или без display: none)
  const visibleCards = Array.from(document.querySelectorAll('.project-card')).filter(card => {
    const style = window.getComputedStyle(card);
    return style.display !== 'none';
  });
  
  if (visibleCards.length === 0) return;
  
  let currentIndex = 0;
  const cardWidth = 380; // Ширина карточки + gap
  const maxVisibleCards = Math.min(3, visibleCards.length);
  
  // Создаем точки навигации только для видимых карточек
  const totalSlides = Math.max(1, visibleCards.length - maxVisibleCards + 1);
  
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
  
  function goToSlide(index) {
    currentIndex = Math.max(0, Math.min(index, visibleCards.length - maxVisibleCards));
    carouselTrack.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    
    // Обновляем активную точку
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  // Сбрасываем позицию карусели
  carouselTrack.style.transform = 'translateX(0)';
  currentIndex = 0;
  
  // Удаляем старые обработчики событий
  if (prevBtn) {
    prevBtn.replaceWith(prevBtn.cloneNode(true));
  }
  if (nextBtn) {
    nextBtn.replaceWith(nextBtn.cloneNode(true));
  }
  
  // Получаем обновленные кнопки
  const newPrevBtn = document.querySelector('.carousel-prev');
  const newNextBtn = document.querySelector('.carousel-next');
  
  // Кнопки навигации
  if (newPrevBtn) newPrevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  if (newNextBtn) newNextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));
  
  // Скрываем кнопки если карточек меньше или равно максимальному количеству
  if (visibleCards.length <= maxVisibleCards) {
    if (newPrevBtn) newPrevBtn.style.display = 'none';
    if (newNextBtn) newNextBtn.style.display = 'none';
  } else {
    if (newPrevBtn) newPrevBtn.style.display = 'flex';
    if (newNextBtn) newNextBtn.style.display = 'flex';
  }
  
  // Автопрокрутка только если есть больше карточек чем видимых
  if (visibleCards.length > maxVisibleCards) {
    let autoScroll = setInterval(() => {
      goToSlide((currentIndex + 1) % totalSlides);
    }, 5000);
    
    // Пауза при наведении
    carouselTrack.addEventListener('mouseenter', () => clearInterval(autoScroll));
    carouselTrack.addEventListener('mouseleave', () => {
      autoScroll = setInterval(() => {
        goToSlide((currentIndex + 1) % totalSlides);
      }, 5000);
    });
  }
}

// Карусель отзывов
function setupReviewsCarousel() {
  const reviewsTrack = document.querySelector('.reviews-track');
  const prevBtn = document.querySelector('.reviews-prev');
  const nextBtn = document.querySelector('.reviews-next');
  const dotsContainer = document.querySelector('.reviews-dots');
  
  if (!reviewsTrack) return;
  
  const reviews = Array.from(document.querySelectorAll('.review-card'));
  let currentIndex = 0;
  const reviewWidth = 380;
  const visibleReviews = Math.min(3, reviews.length);
  
  // Создаем точки навигации
  reviews.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-dot');
    if (index === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToReview(index));
    dotsContainer.appendChild(dot);
  });
  
  function goToReview(index) {
    currentIndex = Math.max(0, Math.min(index, reviews.length - visibleReviews));
    reviewsTrack.style.transform = `translateX(-${currentIndex * reviewWidth}px)`;
    
    // Обновляем активную точку
    document.querySelectorAll('.reviews-dots .carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }
  
  // Кнопки навигации
  if (prevBtn) prevBtn.addEventListener('click', () => goToReview(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToReview(currentIndex + 1));
  
  // Автопрокрутка
  let autoScroll = setInterval(() => {
    goToReview((currentIndex + 1) % (reviews.length - visibleReviews + 1));
  }, 4000);
  
  // Пауза при наведении
  reviewsTrack.addEventListener('mouseenter', () => clearInterval(autoScroll));
  reviewsTrack.addEventListener('mouseleave', () => {
    autoScroll = setInterval(() => {
      goToReview((currentIndex + 1) % (reviews.length - visibleReviews + 1));
    }, 4000);
  });
}

// Отправка сообщения в Telegram
async function sendTelegramMessage(data) {
  if (!data || typeof data !== 'object') {
    console.error('Полученные данные:', data);
    throw new Error('Форма не содержит данных');
  }

  if (!data.phone || data.phone.replace(/\D/g, '').length !== 11) {
    console.error('Некорректный телефон:', data.phone);
    throw new Error('Требуется корректный номер телефона');
  }

  const text = `
📌 <b>Новая заявка!</b>
──────────────
<b>Имя:</b> ${data.name || 'Не указано'}
<b>Телефон:</b> <code>${data.phone}</code>
<b>Email:</b> ${data.email || 'Не указан'}
<b>Услуга:</b> ${data.service || 'Не выбрана'}
${data.message ? `\n<b>Сообщение:</b>\n${data.message}` : ''}
  `;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_CONFIG.BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: Number(TELEGRAM_CONFIG.CHAT_ID),
        text: text,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();
    
    if (!result.ok) {
      console.error('Telegram API Error:', result);
      throw new Error(result.description || 'Ошибка Telegram API');
    }

    return result;
  } catch (error) {
    console.error('Полная ошибка:', {
      error: error.message,
      config: TELEGRAM_CONFIG,
      request: { chat_id: TELEGRAM_CONFIG.CHAT_ID }
    });
    throw error;
  }
}

// Валидация и отправка формы
function setupFormValidation() {
  const form = document.getElementById('request-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    try {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';

      const formData = {
        name: form.querySelector('[name="name"]')?.value.trim(),
        phone: form.querySelector('[name="phone"]')?.value.replace(/\D/g, ''),
        email: form.querySelector('[name="email"]')?.value.trim(),
        service: form.querySelector('[name="service"]')?.value,
        message: form.querySelector('[name="message"]')?.value.trim()
      };

      if (!formData.phone || formData.phone.length !== 11) {
        throw new Error('Введите корректный номер телефона');
      }

      const result = await sendTelegramMessage(formData);
      
      if (result.ok) {
        document.getElementById('successModal').classList.remove('hidden');
        form.reset();
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  });
}

// Мобильное меню
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

// Плавная прокрутка
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
        window.location.href = targetId;
      }
    });
  });
}

// Обновление года в подвале
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Fade/blur секций при скролле
function setupSectionFadeBlur() {
  const sections = Array.from(document.querySelectorAll('section'));
  function updateSections() {
    let wh = window.innerHeight;
    let minDist = Infinity;
    let activeIdx = 0;
    sections.forEach((sec, i) => {
      const rect = sec.getBoundingClientRect();
      const center = rect.top + rect.height/2;
      const dist = Math.abs(center - wh/2);
      if (dist < minDist) {
        minDist = dist;
        activeIdx = i;
      }
    });
    sections.forEach((sec, i) => {
      sec.classList.remove('section-active', 'section-faded');
      if (i === activeIdx) {
        sec.classList.add('section-active');
      } else if (i === activeIdx - 1 || i === activeIdx + 1) {
        sec.classList.add('section-faded');
      }
    });
  }
  window.addEventListener('scroll', updateSections);
  window.addEventListener('resize', updateSections);
  setTimeout(updateSections, 200);
} 