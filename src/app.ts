import { Player, Projectile } from "./players";

const canvas = document.querySelector('#gameGround') as HTMLCanvasElement;
const c = canvas.getContext('2d')!;
canvas.width = innerWidth;
canvas.height = innerHeight;


// __________Game Zone
const player = new Player(innerWidth/2, innerHeight/2, 30, '#500');
player.draw()


const projectiles: Projectile[] = []
addEventListener('click', (e) => {
  const angle = Math.atan2(e.clientY - canvas.height / 2, e.clientX - canvas.width / 2)
  const velocity = {
    x: Math.cos(angle),
    y: Math.sin(angle),
  }
  projectiles.push(new Projectile(canvas.width / 2, canvas.height / 2, 5, '#0f0', velocity))
})



function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);
  
  player.draw();
  projectiles.forEach(p => {
    p.update();
  })
}
animate();