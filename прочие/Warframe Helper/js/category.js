document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get("category") || "all";

  const list = document.getElementById("items-list");
  const title = document.getElementById("page-title");

  // Установка заголовка
  const categoryNames = {
    all: "Все предметы",
    resource: "Ресурсы",
    warframe: "Варфреймы",
    weapon: "Оружие"
  };
  title.textContent = categoryNames[selectedCategory] || "Категория";

  // Фильтрация данных
  const filteredItems = selectedCategory === "all"
    ? items
    : items.filter(item => item.category === selectedCategory);

  // Отображение
  list.innerHTML = filteredItems.map(item => `
    <div class="item-card">
      <div class="item-title">${item.name}</div>
      <div class="item-description">${item.description}</div>
    </div>
  `).join("");

  // Обработчики кнопок
  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      window.location.href = `category.html?category=${filter}`;
    });
  });
});
