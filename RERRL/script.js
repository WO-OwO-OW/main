// script.js

document.addEventListener("DOMContentLoaded", function () {
  document.body.classList.add("dark");

  const themeToggle = document.querySelector(".theme-toggle");
  themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("nav-links");
  burger?.addEventListener("click", () => {
    navLinks?.classList.toggle("active");
  });

  const categoryButtons = document.querySelectorAll(".category-btn");
  const carousels = document.querySelectorAll(".portfolio-carousel");
  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryButtons.forEach(b => b.classList.remove("active"));
      carousels.forEach(c => c.classList.remove("active"));
      btn.classList.add("active");
      const target = document.getElementById(btn.dataset.target);
      target?.classList.add("active");
    });
  });

  window.openModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.add("active");
    }
  };

  window.closeModal = function (id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.classList.remove("active");
    }
  };

  // Закрытие модалки при клике вне или на модалку
  document.addEventListener("click", (e) => {
    document.querySelectorAll(".modal.active").forEach(modal => {
      if (e.target === modal || e.target.classList.contains("modal-close")) {
        modal.classList.remove("active");
      }
    });
  });

  // Только секции и карточки для анимации (исключаем .modal!)
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".section, .card, .portfolio-item").forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });
});
