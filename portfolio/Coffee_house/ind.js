window.onload = function () {
  const images = ["img/1_poz.png", "img/2_poz.png", "img/3_poz.jpg"];
  let index = 0;
  let showingBg1 = true;

  const bg1 = document.getElementById("bg1");
  const bg2 = document.getElementById("bg2");

  bg1.style.backgroundImage = `url('${images[index]}')`;
  showSection('home');

  setInterval(() => {
    index = (index + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = images[index];

    nextImage.onload = () => {
      if (showingBg1) {
        bg2.style.backgroundImage = `url('${nextImage.src}')`;
        bg2.style.opacity = 1;
        bg1.style.opacity = 0;
      } else {
        bg1.style.backgroundImage = `url('${nextImage.src}')`;
        bg1.style.opacity = 1;
        bg2.style.opacity = 0;
      }
      showingBg1 = !showingBg1;
    };
  }, 4000);
};


  /*ПЕРЕКЛЮЧЕНИЕ МЕЖДУ РАЗДЕЛАМИ*/
function showSection(id) {
  document.querySelectorAll('.content-section').forEach(sec => 
    sec.classList.remove('active')
  );
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}





 

// Модальное окно для заказа
const modalOverlay = document.getElementById("modalOverlay");   
const closeModalBtn = document.getElementById("closeModalBtn");
const orderForm = document.getElementById("orderForm");
document.getElementById("orderButton").addEventListener("click", () => {
  modalOverlay.style.display = "flex";
});

closeModalBtn.addEventListener("click", () => {
  modalOverlay.style.display = "none";
});

orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  modalOverlay.style.display = "none";
  alert("Заявка отправлена ✅");
  orderForm.reset();
});




/* Добавление обработчика событий для кнопок "Найти рядом" */
document.querySelectorAll('.nearby-btn').forEach(btn => {   
  btn.addEventListener('click', () => {
    document.getElementById('mapModal').style.display = 'flex';
  });
});

document.getElementById('closeMapBtn').addEventListener('click', () => {
  document.getElementById('mapModal').style.display = 'none';
});









  const modal = document.getElementById("imageModal");     // Модальное окно для изображений
  const modalImg = document.getElementById("modalImage");
  const close = document.querySelector(".close");

  // Найти все изображения внутри .gallery и навесить обработчик
  document.querySelectorAll(".gallery img").forEach(img => {
    img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src;
      modalImg.alt = img.alt;
    });
  });

  // Закрыть по крестику
  close.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Закрыть по клику вне изображения
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });






  const burgerBtn = document.getElementById('burgerBtn');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const sidebarLinks = sidebar.querySelectorAll('li');

  

  burgerBtn.addEventListener('click', openSidebar);
  overlay.addEventListener('click', closeSidebar);

  // Навешиваем слушатели на каждую ссылку в сайдбаре
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeSidebar();
    });
  });










function openSidebar() {
  sidebar.classList.add('open');
  overlay.style.display = 'block';
  burgerBtn.style.display = 'none';
}

function closeSidebar() {
  sidebar.classList.remove('open');
  overlay.style.display = 'none';
  burgerBtn.style.display = 'block';
}
