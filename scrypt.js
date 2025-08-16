const canvas = document.getElementById('space');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let centerX = canvas.width / 2;
let centerY = canvas.height / 2;

let angle = 0;
const particles = [];

for (let i = 0; i < 300; i++) {
  particles.push({
    radius: Math.random() * 150 + 50,
    size: Math.random() * 2 + 1,
    speed: Math.random() * 0.02 + 0.005,
    color: `rgba(255, ${Math.floor(Math.random()*200)}, 0, 0.7)`
  });
}

function drawBlackHole() {
  ctx.beginPath();
  ctx.arc(centerX, centerY, 40, 0, Math.PI * 2);
  ctx.fillStyle = 'black';
  ctx.shadowColor = 'white';
  ctx.shadowBlur = 30;
  ctx.fill();
}

function drawAccretionDisk() {
  particles.forEach(p => {
    const x = centerX + Math.cos(angle * p.speed) * p.radius;
    const y = centerY + Math.sin(angle * p.speed) * p.radius;

    ctx.beginPath();
    ctx.arc(x, y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    });
  angle += 0.5;
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawAccretionDisk();
  drawBlackHole();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  centerX = canvas.width / 2;
  centerY = canvas.height / 2;
});