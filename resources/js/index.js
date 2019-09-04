document.addEventListener("DOMContentLoaded", launch);
let loader = document.querySelector(".loader");
let pokemon = document.querySelector(".pokemon");
let upper = document.querySelector(".poke.upper");
let lower = document.querySelector(".poke.lower");
let image = document.querySelector(".image");
let search = document.querySelector(".pop-the-search");
console.log(loader);

function launch() {
  pokemon.style.cssText = 'display:"block";opacity:1';
  upper.style.transform = "translateY(-" + 60 + "vh)";
  lower.style.transform = "translateY(" + 60 + "vh)";
}

search.addEventListener("mouseenter", function(e) {
  image.style.animationPlayState = "running";
  this.style.transform = "translateX(" + 0 + "%)";
});

search.addEventListener("mouseleave", function(e) {
  image.style.animationPlayState = "paused";
  this.style.transform = "translateX(" + 78 + "%)";
});
