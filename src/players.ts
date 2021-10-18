const canvas = document.querySelector('#gameGround') as HTMLCanvasElement;
const c = canvas.getContext('2d')!;


export class Player {

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
  ) { }

  draw() {

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

}

export class Enemy {

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
    public velocity: { x: number, y: number },
  ) { }

  draw() {

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}

export class Projectile {

  constructor(
    public x: number,
    public y: number,
    public radius: number,
    public color: string,
    public velocity: { x: number, y: number },
  ) { }

  draw() {

    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  update() {
    this.draw();
    this.x = this.x + this.velocity.x;
    this.y = this.y + this.velocity.y;
  }
}