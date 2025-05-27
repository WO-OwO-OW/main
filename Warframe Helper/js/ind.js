const items = [
  { name: "Hydroid Prime Blueprint", category: "prime" },
  { name: "Forma Blueprint", category: "prime" },
  { name: "Nekros Prime Systems", category: "prime" },
  { name: "Orokin Cell", category: "resource" },
  { name: "Ceres - Gabii (миссия)", category: "mission" },
  { name: "Neo N13 (реликвия)", category: "relic" },
  { name: "Soma Prime (оружие)", category: "prime" },
  { name: "Plastids (ресурс)", category: "resource" },
  { name: "Argon Crystal (ресурс)", category: "resource" },
  { name: "Draco (прокачка)", category: "mission" },
  { name: "Sanctuary Onslaught (прокачка)", category: "mission" },
  { name: "Kuva Bramma (оружие)", category: "prime" },
];


const searchInput = document.getElementById("search");
const resultsList = document.getElementById("results");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  resultsList.innerHTML = "";

  if (value.length === 0) {
    resultsList.classList.remove("active");
    document.querySelector(".search-wrapper").classList.remove("open");
    return;
  }

  const filtered = items.filter(item =>
    item.name.toLowerCase().includes(value)
  );

  resultsList.classList.add("active");
  document.querySelector(".search-wrapper").classList.add("open");

  if (filtered.length === 0) {
    const li = document.createElement("li");
    li.textContent = "Ничего не найдено";
    resultsList.appendChild(li);
  } else {
    filtered.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item.name;
      li.addEventListener("click", () => {
        localStorage.setItem("selectedItem", JSON.stringify(item));
        window.location.href = "pages/item.html";
      });
      resultsList.appendChild(li);
    });
  }
});
