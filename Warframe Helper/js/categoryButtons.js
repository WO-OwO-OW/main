document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".filter-button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-filter");
      window.location.href = `pages/category.html?category=${category}`;
    });
  });
});
