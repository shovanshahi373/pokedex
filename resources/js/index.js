document.addEventListener("DOMContentLoaded", indexFunc);
let pokemon = document.querySelector(".pokemon");
let image = document.querySelector(".image");
let search = document.querySelector(".pop-the-search");
let restrict = document.querySelector(".restrict");

function indexFunc() {
  pokemon.style.cssText = 'display:"block";opacity:1';
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
