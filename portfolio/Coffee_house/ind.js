 const images = ["img1.jpg", "img2.jpg", "img3.jpg"];
  let index = 0;
  setInterval(() => {
    index = (index + 1) % images.length;
    document.getElementById("slider").src = images[index];
  }, 4000); // смена каждые 4 секунды