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





document.querySelectorAll('.nearby-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById('mapModal').style.display = 'flex';
  });
});

document.getElementById('closeMapBtn').addEventListener('click', () => {
  document.getElementById('mapModal').style.display = 'none';
});
