var AOSElements;
var AOSWindowHeight;
var AOSOffset = 150;

function initAOS() {
  AOSElements = document.querySelectorAll(".e-animated");
  AOSWindowHeight = window.innerHeight - AOSOffset;
}

function checkPosition() {
  for (var i = 0; i < AOSElements.length; i++) {
    var element = AOSElements[i];
    var positionFromTop = AOSElements[i].getBoundingClientRect().top;

    if (positionFromTop - AOSWindowHeight <= 0) {
      element.classList.add("e-fade-in");
    } else {
      element.classList.remove("e-fade-in");
    }
  }
}

window.addEventListener("scroll", checkPosition);
window.addEventListener("resize", initAOS);