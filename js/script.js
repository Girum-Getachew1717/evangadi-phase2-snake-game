//include the 2d library
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

console.log(ctx);

//lets divide our canvas into 20 by 20 small square
const scale = 20;
const rows = canvas.height / scale; //25
const columns = canvas.width / scale; //25

//just to give us a start we can initiate the initial head of snake at (0,0) coordinate
//notice that the first element of our snake contains an obejct identifying the x and y coordinate of the initial piece of the snake
//snake
let snake = [];

snake[0] = {
  x: Math.floor(Math.random() * columns) * scale,
  y: Math.floor(Math.random() * rows) * scale,
};
console.log(snake);

let food = {
    x: Math.floor(Math.random() * columns) * scale,
    y: Math.floor(Math.random() * rows) * scale,
};

// ctx.fillStyle = "#fff";
// ctx.strokeStyle = "red";
// ctx.fillRect(snake[0].x, snake[0].y, scale, scale);
// ctx.fillRect(100, 100, 40, 20);

// now we need an array to save the bodies of our snake
let score = 0;

//call our draw function every 100 ms
let playGame = setInterval(draw, 100);


//lets initially make thte snake move right
let d = "right";

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "red";
    ctx.fillRect(snake[i].x, snake[i].y, scale, scale);
    ctx.strokeRect(snake[i].x, snake[i].y, scale, scale);
  }

  //old position
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;

  //which direction
  if (d == "left") snakeX -= scale;
  if (d == "up") snakeY -= scale;
  if (d == "right") snake += scale;
  if (d == "down") snake += scale;

  if (snakeX > canvas.width){
    snakeX = 0;
  }
  if (snakeY > canvas.height){
    snakeY = 0;
  }
  if (snakeX < 0){
    snakeX = canvas.width;
  }
  if (snakeY < 0){
    snakeY = canvas.height;
  }

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  snake.pop();
  snake.unshift(newHead);

  // console.log(snake);
}
