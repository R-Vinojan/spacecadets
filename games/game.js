

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width= 400;
canvas.height = 500;

let rocket = { x: 180, y: 450, width: 40, height: 40 };
let star = { x: Math.random() * 360, y: 0, size: 20, speed: 2 };
let score = 0;

// Movement
document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft' && rocket.x > 0) rocket.x -= 20;
  if (e.key === 'ArrowRight' && rocket.x < canvas.width - rocket.width) rocket.x += 20;
});

function drawRocket() {
  ctx.fillStyle = 'white';
  ctx.fillRect(rocket.x, rocket.y, rocket.width, rocket.height);
}

function drawStar() {
  ctx.fillStyle = 'yellow';
  ctx.beginPath();
  ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
  ctx.fill();
}

function checkCollision() {
  if (
    star.y + star.size > rocket.y &&
    star.x > rocket.x &&
    star.x < rocket.x + rocket.width
  ) {
    score++;
    document.getElementById('score').innerText = "Score: " + score;
    star.y = 0;
    star.x = Math.random() * 360;
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawRocket();
  drawStar();
  checkCollision();

  star.y += star.speed;
  if (star.y > canvas.height) {
    star.y = 0;
    star.x = Math.random() * 360;
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
