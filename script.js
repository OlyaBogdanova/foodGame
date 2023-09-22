const screens = document.querySelectorAll(".screen");
const choose_food_btns = document.querySelectorAll(".choose-food-btn");
const start_btn = document.getElementById("start-btn");
const game_container = document.getElementById("game-container");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const message = document.getElementById("message");
let seconds = 0;
let score = 0;
let selected_food = {};

start_btn.addEventListener("click", () => screens[0].classList.add("up"));

choose_food_btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const img = btn.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selected_food = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createfood, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createfood() {
  const food = document.createElement("div");
  food.classList.add("food");
  const { x, y } = getRandomLocation();
  food.style.top = `${y}px`;
  food.style.left = `${x}px`;
  food.innerHTML = `<img src="${selected_food.src}" alt="${
    selected_food.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;

  food.addEventListener("click", catchfood);

  game_container.appendChild(food);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function catchfood() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  addfoods();
}

function addfoods() {
  setTimeout(createfood, 1000);
  setTimeout(createfood, 1500);
}

function increaseScore() {
  score++;
  if (score === 11) {
    message.classList.add("visible");
    setTimeout(() => {
      message.classList.remove("visible");
    }, 5000);
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
