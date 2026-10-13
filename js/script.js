const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const scoreEl = document.querySelector(".score");

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake = [];
snake[0] = {
  x: Math.floor(columns / 2) * scale,
  y: Math.floor(rows / 2) * scale,
};

let food = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};

let score = 0;
let d = "right";
let playGame = setInterval(draw, 100);

document.addEventListener("keydown", direction);

function direction(event) {
  const key = event.keyCode;

  if (key == 37 && d != "right") {
    d = "left";
  } else if (key == 38 && d != "down") {
    d = "up";
  } else if (key == 39 && d != "left") {
    d = "right";
  } else if (key == 40 && d != "up") {
    d = "down";
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "#4caf50" : "#fff";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  // draw food
  ctx.fillStyle = "#ff5252";
  ctx.fillRect(food.x, food.y, scale, scale);

  // old head position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  // move in current direction
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snakeX += scale;
  if (d == "down") snakeY += scale;

  // wrap around edges
  if (snakeX >= canvas.width) {
    snakeX = 0;
  }
  if (snakeY >= canvas.height) {
    snakeY = 0;
  }
  if (snakeX < 0) {
    snakeX = canvas.width - scale;
  }
  if (snakeY < 0) {
    snakeY = canvas.height - scale;
  }

  // eat food
  if (snakeX == food.x && snakeY == food.y) {
    score++;
    scoreEl.textContent = "Score: " + score;
    food = {
      x: Math.floor(Math.random() * columns) * scale,
      y: Math.floor(Math.random() * rows) * scale,
    };
  } else {
    snake.pop();
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  // game over if snake hits itself
  if (eatSelf(newHead, snake)) {
    clearInterval(playGame);
    ctx.fillStyle = "#fff";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 2 - 80, canvas.height / 2);
    return;
  }

  snake.unshift(newHead);
}

function eatSelf(head, array) {
  for (let i = 0; i < array.length; i++) {
    if (head.x == array[i].x && head.y == array[i].y) {
      return true;
    }
  }
  return false;
}
