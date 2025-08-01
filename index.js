let slideIndex = 0;
// showSlides();
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) { 
    // console.log("hello maiya ")// Adjust threshold as needed
      navbar.classList.add("scrolled");
  } else {
      navbar.classList.remove("scrolled");
  }
});

