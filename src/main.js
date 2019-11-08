import Snake from './snake';
import Wall from './wall';

export const canvas = document.querySelector('canvas');
export const ctx = canvas.getContext('2d');
export const cw = canvas.width / 20;
export const ch = canvas.height / 20;

const snake = new Snake(50, 50);
const wall = new Wall(cw / 2, ch / 2);

const gameLoop = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height); //tło
  snake.move();
  snake.tailMove();
  snake.onHit();
  snake.draw();
  wall.draw();

  requestAnimationFrame(gameLoop); // ta linijka musi być zawsze na końcu funkcji
};

document.addEventListener('keypress', ({ keyCode }) => {
  console.log(keyCode);

  if (keyCode === 65 || (keyCode == 97 && snake.direction != 'RIGHT')) snake.setDirection('LEFT');
  if (keyCode === 68 || (keyCode == 100 && snake.direction != 'LEFT')) snake.setDirection('RIGHT');
  if (keyCode === 87 || (keyCode == 119 && snake.direction != 'DOWN')) snake.setDirection('UP');
  if (keyCode === 83 || (keyCode == 115 && snake.direction != 'UP')) snake.setDirection('DOWN');
  //Klawisz "K" do wydłużania węża
  if (keyCode === 107) snake.expandSnake();
});

requestAnimationFrame(gameLoop);