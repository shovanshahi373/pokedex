document.addEventListener("DOMContentLoaded", launch);
let upper = document.querySelector(".poke.upper");
let lower = document.querySelector(".poke.lower");

function launch() {
  upper.style.transform = "translateY(-" + 60 + "vh)";
  lower.style.transform = "translateY(" + 60 + "vh)";
  setTimeout(() => {
    upper.style.opacity = 0;
    upper.style.display = "none";
    lower.style.opacity = 0;
    lower.style.display = "none";
  }, 3000);
}
