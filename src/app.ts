import { getRandom, randomBool } from "./helpers";
import { Enemy, Player, Projectile } from "./players";

const canvas = document.querySelector('#gameGround') as HTMLCanvasElement;
const c = canvas.getContext('2d')!;
canvas.width = innerWidth;
canvas.height = innerHeight;


// __________Game Zone
const player = new Player(innerWidth / 2, innerHeight / 2, 30, '#aa0');


const projectiles: Projectile[] = [];
const enemies: Enemy[] = [];
addEventListener('click', (e) => {
  // to get distance between two points always "Destination" - "Current Location"
  const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2)
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  }
  projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, '#f00', velocity))
})


function enemiesAppear() {
  setInterval(() => {
    const radius = getRandom(30, 10);
    let x: number, y: number;

    if (randomBool()) {

      x = randomBool() ? 0 - radius : canvas.width + radius;
      y = getRandom(canvas.height);

    } else {

      x = getRandom(canvas.width);
      y = randomBool() ? 0 - radius : canvas.height + radius;

    }
    const cols = ['#500', '#050', '#005']
    const color = cols[getRandom(cols.length)];
    const angle = Math.atan2(canvas.height / 2 - y, canvas.width / 2 - x);
    const velocity = {
      x: Math.cos(angle),
      y: Math.sin(angle),
    }
    enemies.push(new Enemy(x, y, radius, color, velocity))


  }, 2000)
}

let animationId: number;
function animate() {
  animationId = requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  projectiles.forEach((p, pIndex) => {
    p.update();

    // remove if gone out of game zone
    if (p.x + p.radius < 0 || p.x - p.radius > canvas.width || p.y + p.radius < 0 || p.y - p.radius > canvas.height) {
      setTimeout(() => {
        projectiles.slice(pIndex, 1);
      }, 0);
    }
  })
  enemies.forEach((e, eIndex) => {
    e.update();

    // game over
    const dist = Math.hypot(player.x - e.x, player.y - e.y);
    if (dist - player.radius - e.radius < 1) {
      cancelAnimationFrame(animationId)
    }

    // for each enemy, check if hit byt any projectile
    projectiles.forEach((p, pIndex) => {
      const dist = Math.hypot(p.x - e.x, p.y - e.y);

      // shooting off the enemy
      if (dist - p.radius - e.radius < 1) {
        setTimeout(() => {
          enemies.splice(eIndex, 1);
          projectiles.splice(pIndex, 1);
        }, 0);
      }

    })
  })
}
animate();
enemiesAppear();