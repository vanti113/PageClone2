const section = document.querySelectorAll("section");

const height = [253, 908, 1775, 2540, 3120, 3402, 3686, 3990, 4440];

function showContent(value) {
  for (let i = 0; i < height.length; i++) {
    if (value >= height[i]) {
      section[i + 1].style.opacity = 1;
    } else {
      section[i + 1].style.opacity = 0;
    }
  }
}
const handler = () => {
  const scrl = window.scrollY;
  showContent(scrl);
};

const prepareOpacity = () => {
  section.forEach((obj) => {
    if (obj.className != "part1") {
      obj.style.opacity = 0;
    }
  });
};

function init() {
  prepareOpacity();
  window.addEventListener("scroll", handler);
}

init();
