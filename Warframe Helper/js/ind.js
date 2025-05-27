const items = [
  "Hydroid Prime Blueprint",
  "Forma Blueprint",
  "Nekros Prime Systems",
  "Orokin Cell",
  "Ceres - Gabii (миссия)",
  "Neo N13 (реликвия)",
  "Soma Prime (оружие)",
  "Plastids (ресурс)",
  "Argon Crystal (ресурс)",
  "Draco (прокачка)",
  "Sanctuary Onslaught (прокачка)",
  "Kuva Bramma (оружие)",
];

const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");
const searchWrapper = document.querySelector(".search-wrapper"); // добавлено

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  resultsList.innerHTML = "";

  if (value.length === 0) {
    searchWrapper.classList.remove("show-results"); // убираем класс
    return;
  }

  const filtered = items.filter(item =>
    item.toLowerCase().includes(value)
  );

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Ничего не найдено";
    resultsList.appendChild(li);
  } else {
    filtered.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      resultsList.appendChild(li);
    });
  }

  // Показываем или скрываем класс в зависимости от результата
  if (filtered.length > 0 || value.length > 0) {
    searchWrapper.classList.add("show-results");
  } else {
    searchWrapper.classList.remove("show-results");
  }
});
