import { Player } from "./players";

const canvas = document.querySelector('#gameGround') as HTMLCanvasElement;
canvas.width = innerWidth;
canvas.height = innerHeight;


// __________Game Zone
const player = new Player(innerWidth/2, innerHeight/2, 30, '#500');
player.draw()