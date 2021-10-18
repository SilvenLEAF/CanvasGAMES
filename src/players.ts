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
    console.log('DRAWN')
  }

}