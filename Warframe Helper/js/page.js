const data = JSON.parse(localStorage.getItem("selectedItem"));
const content = document.getElementById("content");

if (!data) {
  content.innerHTML = "<p>Ничего не выбрано.</p>";
} else {
  const simplifyName = (name) =>
    name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "_")
      .toLowerCase();

  const imgFileName = simplifyName(data.name) + ".png";
  const imgSrc = `../img/${imgFileName}`;

  // Ищем описание из базы
  const itemFromDB = items.find(item => item.name === data.name);
  const description = itemFromDB?.description || "Описание отсутствует.";

  content.innerHTML = `
    <h1>${data.name}</h1>
    <img 
      src="${imgSrc}" 
      alt="${data.name}" 
      style="max-width: 100%; border-radius: 10px; margin: 20px 0;" 
      onerror="this.onerror=null; this.src='https://via.placeholder.com/600x300?text=Нет+изображения'" 
    />
    <p class="category">Категория: <strong>${data.category}</strong></p>
    <p>${description}</p>
  `;
}
