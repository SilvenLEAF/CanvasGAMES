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


function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  player.draw();
  projectiles.forEach(p => {
    p.update();
  })
  enemies.forEach(e => {
    e.update();
  })
}
animate();
enemiesAppear();