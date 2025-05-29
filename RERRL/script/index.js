document.addEventListener('DOMContentLoaded', function() {
  // Инициализация всех модулей
  setupModal();
  initMaskedInput();
  setupProjectFilters();
  setupFormValidation();
  updateCurrentYear();
  setupSmoothScrolling();
  setupMobileMenu(); // Если нужно мобильное меню (добавь HTML-структуру)
});

// 1. Маска для телефона
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

// 2. Модальное окно для проектов
function setupModal() {
  // 1. Находим элементы с защитой от ошибок
  const modal = document.getElementById('project-modal');
  const closeBtn = modal?.querySelector('.close-modal');
  const buttons = document.querySelectorAll('.view-project');

  // Если элементов нет - выходим
  if (!modal || !closeBtn || buttons.length === 0) {
    console.error('Не найдены элементы модального окна! Проверьте:');
    console.log('- Модальное окно:', modal);
    console.log('- Кнопка закрытия:', closeBtn);
    console.log('- Кнопки "Подробнее":', buttons);
    return;
  }

  // 2. Данные проектов (полная версия)
  const projectsData = {
    1: {
      title: "Строительная компания",
      type: "Лендинг",
      time: "2 недели",
      tech: "HTML, CSS, JavaScript",
      description: "Лендинг для компании по ремонту квартир с формой заявки и галереей работ.",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80"
    },
    2: {
      title: "Фитнес-центр",
      type: "Лендинг",
      time: "3 недели",
      tech: "HTML, CSS, JavaScript, PHP",
      description: "Промо-сайт для нового фитнес-клуба с расписанием и формой записи.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    3: {
      title: "Стоматология",
      type: "Лендинг",
      time: "2 недели",
      tech: "HTML, CSS, JavaScript",
      description: "Сайт для клиники эстетической стоматологии с онлайн-записью.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    4: {
      title: "Производственная компания",
      type: "Корпоративный сайт",
      time: "1 месяц",
      tech: "HTML, CSS, JavaScript, CMS",
      description: "Многостраничный сайт для производителя оборудования с каталогом.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
    },
    5: {
      title: "Юридическая фирма",
      type: "Корпоративный сайт",
      time: "3 недели",
      tech: "HTML, CSS, JavaScript",
      description: "Сайт для юридической компании с каталогом услуг и блогом.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    6: {
      title: "IT компания",
      type: "Корпоративный сайт",
      time: "1.5 месяца",
      tech: "React, Node.js",
      description: "Современный сайт для разработчика ПО с портфолио.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    7: {
      title: "Магазин одежды",
      type: "Интернет-магазин",
      time: "2 месяца",
      tech: "HTML, CSS, JavaScript, CMS",
      description: "Онлайн-магазин модной одежды и аксессуаров с корзиной.",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    8: {
      title: "Магазин электроники",
      type: "Интернет-магазин",
      time: "2.5 месяца",
      tech: "HTML, CSS, JavaScript, PHP",
      description: "Продажа гаджетов и аксессуаров с фильтрами товаров.",
      image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    },
    9: {
      title: "Магазин мебели",
      type: "Интернет-магазин",
      time: "3 месяца",
      tech: "HTML, CSS, JavaScript, CMS",
      description: "Онлайн-магазин дизайнерской мебели с 3D-превью товаров.",
      image: "https://images.unsplash.com/photo-1607082349566-0077024786f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
    }
  };

 // 3. Вешаем обработчики на кнопки
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      const projectId = this.getAttribute('data-id');
      const project = projectsData[projectId];
      
      if (!project) {
        console.error(`Проект с ID ${projectId} не найден`);
        return;
      }

      // Заполняем модальное окно
      modal.querySelector('#modal-title').textContent = project.title;
      modal.querySelector('#modal-img').src = project.image;
      modal.querySelector('#modal-type').textContent = project.type;
      modal.querySelector('#modal-time').textContent = project.time;
      modal.querySelector('#modal-tech').textContent = project.tech;
      modal.querySelector('#modal-description').textContent = project.description;
      
      // Показываем модальное окно
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  // 4. Закрытие модального окна
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  // Закрытие при клике вне окна
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Инициализация после загрузки DOM
document.addEventListener('DOMContentLoaded', setupModal);

  projectButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-id');
      const project = projectsData[projectId];
      document.getElementById('modal-title').textContent = project.title;
      document.getElementById('modal-img').src = project.image;
      document.getElementById('modal-type').textContent = project.type;
      document.getElementById('modal-time').textContent = project.time;
      document.getElementById('modal-tech').textContent = project.tech;
      document.getElementById('modal-description').textContent = project.description;
      
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });


// 3. Фильтрация проектов
function setupProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filters button');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Удаляем активный класс у всех кнопок
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Добавляем активный класс текущей кнопке
      button.classList.add('active');
      
      const category = button.getAttribute('data-category');
      
      projectCards.forEach(card => {
        if (category === 'all' || card.getAttribute('data-category') === category) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// 4. Валидация формы
function setupFormValidation() {
  const form = document.getElementById('request-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Простая валидация
      const phone = document.getElementById('phone').value;
      if (phone.replace(/\D/g, '').length !== 11) {
        alert('Введите корректный номер телефона');
        return;
      }
      
      // Здесь можно добавить AJAX-отправку
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      form.reset();
    });
  }
}

// 5. Обновление года в футере
function updateCurrentYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// 6. Плавная прокрутка для якорных ссылок
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

// 7. Мобильное меню (добавь HTML-структуру в header)
function setupMobileMenu() {
  const menuToggle = document.createElement('button');
  menuToggle.className = 'mobile-menu-toggle';
  menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
  
  const header = document.querySelector('.navbar .container');
  if (header) {
    header.prepend(menuToggle);
    
    menuToggle.addEventListener('click', () => {
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.toggle('active');
    });
  }
}