document.addEventListener("DOMContentLoaded", launch);
let pokemon = document.querySelector(".pokemon");
let upper = document.querySelector(".poke.upper");
let lower = document.querySelector(".poke.lower");
let image = document.querySelector(".image");
let search = document.querySelector(".pop-the-search");
let restrict = document.querySelector(".restrict");

function launch() {
  pokemon.style.cssText = 'display:"block";opacity:1';
  upper.style.transform = "translateY(-" + 60 + "vh)";
  lower.style.transform = "translateY(" + 60 + "vh)";
  setTimeout(() => {
    upper.style.opacity = 0;
    upper.style.display = "none";
    lower.style.opacity = 0;
    lower.style.display = "none";
  }, 3000);
}

search.addEventListener("mouseenter", function(e) {
  image.style.animationPlayState = "running";
  this.style.transform = "translateX(" + 0 + "%)";
});

search.addEventListener("mouseleave", function(e) {
  image.style.animationPlayState = "paused";
  this.style.transform = "translateX(" + 78 + "%)";
});

restrict.addEventListener("mouseenter", function(e) {
  this.style.transform = "translateX(" + 0 + "%)";
});

restrict.addEventListener("mouseleave", function(e) {
  this.style.transform = "translateX(" + 78 + "%)";
});
