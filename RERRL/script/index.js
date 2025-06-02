const TELEGRAM_CONFIG = {
  BOT_TOKEN: '7578279966:AAFBTym2L5mWB18toYbHDnfXk6qOKPD3fmM', 
  CHAT_ID: '1263043831'
};

// Временно добавьте в начало index.js
console.log('Проверка конфигурации:', {
  tokenLength: TELEGRAM_CONFIG.BOT_TOKEN.length,
  chatId: TELEGRAM_CONFIG.CHAT_ID,
  isTokenValid: /^\d+:[\w-]+$/.test(TELEGRAM_CONFIG.BOT_TOKEN),
  isChatIdValid: /^-?\d+$/.test(TELEGRAM_CONFIG.CHAT_ID)
});

// Временный код для проверки (удалите после использования)
window.showTelegramConfig = function() {
  console.log('Токен:', TELEGRAM_CONFIG.BOT_TOKEN);
  console.log('Chat ID:', TELEGRAM_CONFIG.CHAT_ID);
};

// Временный код (удалить после проверки)
const testBtn = document.createElement('button');
testBtn.textContent = 'Тест API';
testBtn.style.position = 'fixed';
testBtn.style.bottom = '10px';
testBtn.style.right = '10px';
testBtn.style.zIndex = '9999';
testBtn.onclick = async () => {
  try {
    const testData = {
      name: "Тест",
      phone: "79991234567",
      service: "Тестовая услуга"
    };
    
    console.log('Отправка тестовых данных:', testData);
    const result = await sendTelegramMessage(testData);
    console.log('Результат:', result);
    alert('Тест успешен! Проверьте чат Telegram');
  } catch (error) {
    console.error('Тест провален:', error);
    alert(`Тест не пройден: ${error.message}`);
  }
};
document.body.appendChild(testBtn);

document.addEventListener('DOMContentLoaded', function() {
  initMaskedInput();
  setupProjectFilters();
  sendTelegramMessage();
  setupFormValidation();
  updateCurrentYear();
  setupSmoothScrolling();
  setupMobileMenu();
  setupProjectCarousel();
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

async function sendTelegramMessage(data) {
  // Проверка данных
  if (!data || typeof data !== 'object') {
  console.error('Полученные данные:', data);
  throw new Error('Форма не содержит данных');
}

if (!data.phone || data.phone.replace(/\D/g, '').length !== 11) {
  console.error('Некорректный телефон:', data.phone);
  throw new Error('Требуется корректный номер телефона');
}

  // Форматируем сообщение
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
      chat_id: Number(TELEGRAM_CONFIG.CHAT_ID), // Важно: число, а не строка
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

function setupFormValidation() {
  const form = document.getElementById('request-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    
    try {
      // Блокируем кнопку
      submitBtn.disabled = true;
      submitBtn.textContent = 'Отправка...';

      // Получаем данные
      const formData = {
        name: form.querySelector('[name="name"]')?.value.trim(),
        phone: form.querySelector('[name="phone"]')?.value.replace(/\D/g, ''),
        email: form.querySelector('[name="email"]')?.value.trim(),
        service: form.querySelector('[name="service"]')?.value,
        message: form.querySelector('[name="message"]')?.value.trim()
      };

      // Валидация
      if (!formData.phone || formData.phone.length !== 11) {
        throw new Error('Введите корректный номер телефона');
      }

      // Отправка
      const result = await sendTelegramMessage(formData);
      
      if (result.ok) {
        alert('✅ Заявка отправлена!');
        form.reset();
      }
    } catch (error) {
      alert(`❌ ${error.message}`);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить';
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