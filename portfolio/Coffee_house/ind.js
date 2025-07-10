 const images = ["1_poz.png", "2_poz.png", "3_poz.jpg"];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("slider").src = images[index];
  }, 4000); // смена каждые 4 секунды