// Переключение темы сайта
function toggleTheme() {
  const body = document.body;
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    body.classList.add('light');
  } else {
    body.classList.remove('light');
    body.classList.add('dark');
  }
}

// Открытие модального окна с содержимым проекта
function openModal(projectId) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  // Здесь можно добавить контент в зависимости от projectId
  modalBody.innerHTML = `
    <h2>Подробности проекта ${projectId}</h2>
    <p>Описание проекта и галерея изображений...</p>
    <img src="https://via.placeholder.com/500x300" alt="Пример изображения">
  `;

  modal.style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

// Закрытие модального окна при клике вне содержимого
document.getElementById('modal').addEventListener('click', function (e) {
  if (e.target === this) {
    closeModal();
  }
});

// Обработка формы отправки
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const object = Object.fromEntries(formData);

  try {
    // Здесь должна быть серверная часть, например PHP/Python или внешняя форма как Formspree
    const response = await fetch("https://formspree.io/f/your_form_id", {
      method: "POST",
      headers: { 'Accept': 'application/json' },
      body: formData
    });

    if (response.ok) {
      formStatus.textContent = "Сообщение отправлено успешно!";
      contactForm.reset();
    } else {
      formStatus.textContent = "Ошибка при отправке сообщения.";
    }
  } catch (error) {
    formStatus.textContent = "Произошла ошибка при отправке.";
  }
});

// Переключение категорий работ
const projectCategories = document.querySelectorAll('.project-category');
const projectTitles = document.querySelectorAll('.project-category h3');

projectTitles.forEach(title => {
  title.style.cursor = 'pointer';
  title.addEventListener('click', () => {
    projectCategories.forEach(category => {
      category.style.display = 'none';
    });
    title.parentElement.style.display = 'block';
  });
});

// Переключение категорий
const tabs = document.querySelectorAll('.tab');
const projectCards = document.querySelectorAll('.project-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Удалить класс active у всех вкладок
    tabs.forEach(t => t.classList.remove('active'));
    // Добавить класс active к текущей вкладке
    tab.classList.add('active');

    const category = tab.getAttribute('data-category');
    projectCards.forEach(card => {
      if (card.getAttribute('data-category') === category) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Открытие модального окна
function openModal(projectId) {
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modal-body');

  // Здесь можно добавить динамическое содержимое в зависимости от projectId
  modalBody.innerHTML = `
    <h2>Детали проекта ${projectId}</h2>
    <p>Подробное описание проекта.</p>
    <img src="preview_${projectId}.jpg" alt="Проект ${projectId}" style="width:100%; height:auto; border-radius:5px;">
  `;

  modal.style.display = 'flex';
}

// Закрытие модального окна
function closeModal() {
  document.getElementById('modal').style.display = 'none';
}
