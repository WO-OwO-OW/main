// ============================
// Переключение темной/светлой темы
// ============================
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// По умолчанию темная тема
body.classList.add("dark-mode");
updateThemeColors();

// Переключение темы при клике
themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
  updateThemeColors();
});

// Обновление цветов шрифтов и фонов в зависимости от темы
function updateThemeColors() {
  const isLight = body.classList.contains("light-mode");
  document.documentElement.style.setProperty('--text-color', isLight ? '#222' : '#fff');
  document.documentElement.style.setProperty('--bg-color', isLight ? '#fff' : '#111');
  document.documentElement.style.setProperty('--card-bg', isLight ? '#f9f9f9' : '#222');
  document.documentElement.style.setProperty('--card-border', isLight ? '#ccc' : '#333');
}

// ============================
// Анимация появления элементов при скролле
// ============================
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

document.querySelectorAll("section, .service-card, .portfolio-item").forEach((el) => {
  observer.observe(el);
});

// ============================
// Модальные окна для примеров работ
// ============================
const modal = document.getElementById("modal");
const modalGallery = document.getElementById("modal-gallery");
const modalDesc = document.getElementById("modal-desc");
const modalClose = document.getElementById("modal-close");

function openModal(images, description) {
  modalGallery.innerHTML = images.map(src => `<img src="${src}" alt="preview">`).join("");
  modalDesc.textContent = description;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// ============================
// Фильтрация работ по категориям
// ============================
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".filter-btn.active")?.classList.remove("active");
    btn.classList.add("active");
    const filter = btn.getAttribute("data-filter");

    portfolioItems.forEach((item) => {
      const match = item.getAttribute("data-category") === filter || filter === "all";
      item.style.display = match ? "block" : "none";
    });
  });
});

// ============================
// Маска для телефона
// ============================
const phoneInput = document.getElementById("form-phone");

phoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replace(/\D/g, "");
  if (value.length > 0) value = "+7 (" + value;
  if (value.length > 6) value = value.slice(0, 6) + ") " + value.slice(6);
  if (value.length > 11) value = value.slice(0, 11) + "-" + value.slice(11);
  if (value.length > 14) value = value.slice(0, 14) + "-" + value.slice(14);
  if (value.length > 17) value = value.slice(0, 17);
  e.target.value = value;
});