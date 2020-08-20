import { ctx, cw, ch } from './main';
import headIMGLeftSrc from '../src/snake-img/head-left.png';
import headIMGRightSrc from '../src/snake-img/head-right.png';
import headIMGUpSrc from '../src/snake-img/head-up.png';
import headIMGDownSrc from '../src/snake-img/head-down.png';
import tailIMGSrc from '../src/snake-img/tail.png';

const headIMGLeft = new Image();
headIMGLeft.src = headIMGLeftSrc;
const headIMGRight = new Image();
headIMGRight.src = headIMGRightSrc;
const headIMGUp = new Image();
headIMGUp.src = headIMGUpSrc;
const headIMGDown = new Image();
headIMGDown.src = headIMGDownSrc;
const tailIMG = new Image();
tailIMG.src = tailIMGSrc;

const imgSize = 1.2;

class Snake {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 3;
    this.cell = 20;
    this.direction = null;
    this.prevDirection = null;
    this.tailLength = 0;
    this.tail = [];
  }

  draw() {
    for (let i = 0; i < this.tail.length-1; i++) {
      ctx.drawImage(tailIMG, this.tail[i].x , this.tail[i].y, this.cell * imgSize, this.cell * imgSize);
    }

    if (this.direction === 'LEFT') {
      ctx.drawImage(headIMGLeft, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, this.cell*imgSize, this.cell*imgSize);
    } else if (this.direction === 'RIGHT') {
      ctx.drawImage(headIMGRight, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, this.cell*imgSize, this.cell*imgSize);
    } else if (this.direction === 'UP') {
      ctx.drawImage(headIMGUp, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, this.cell*imgSize, this.cell*imgSize);
    } else if (this.direction === 'DOWN') {
      ctx.drawImage(headIMGDown, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, this.cell*imgSize, this.cell*imgSize);
    } else {
      ctx.drawImage(headIMGRight, this.tail[this.tail.length-1].x, this.tail[this.tail.length-1].y, this.cell*imgSize, this.cell*imgSize);
    }
  }
  setDirection(direction) {
    this.direction = direction;
  }

  setprevDirection(prevDirection) {
    this.prevDirection = prevDirection;
  }

  // funkcja wydłużająca węża w związku z brakiem jedzenia
  expandSnake() {
    this.tailLength++;
  }

  move() {
    if (!this.direction) return;

    if (this.direction === 'LEFT') {
      this.x -= this.speed;
    } else if (this.direction === 'RIGHT') {
      this.x += this.speed;
    } else if (this.direction === 'UP') {
      this.y -= this.speed;
    } else if (this.direction === 'DOWN') {
      this.y += this.speed;
    }
  }
  
  onHit(wallsRectObject, wallsCircleObject) {
    
    
    let w = wallsCircleObject.wallsCircle.concat(wallsRectObject.wallsRect);

    //check if hit sth
    if (this.x < 0 || this.y < 0 || this.x + this.cell > cw || this.y + this.cell > ch)
    {
      return true;
    }
    
    //minimalna liczba czesci weza przy ktorej moze sie ugryzc
    let minPartsNumber = Math.ceil((3*this.cell)/this.speed);
    for (let i=0; i<this.tailLength - minPartsNumber; i++) {

      //wyklucza kolizje z dolna czescia glowy weza
      if(this.prevDirection === 'UP' && (this.direction === 'LEFT' || this.direction === 'RIGHT')) {
        //lewy gorny rog
        if (this.x > this.tail[i].x && 
          this.x < this.tail[i].x + this.cell && 
          this.y > this.tail[i].y && 
          this.y < this.tail[i].y + this.cell) {
            return true;
        }
        //prawy gorny rog
        if (this.x + this.cell > this.tail[i].x &&
          this.x + this.cell < this.tail[i].x + this.cell && 
          this.y > this.tail[i].y && 
          this.y < this.tail[i].y + this.cell) {
            return true;
        }
      }

      //wyklucza kolizje z gorna czescia glowy weza
      if(this.prevDirection === 'DOWN' && (this.direction === 'LEFT' || this.direction === 'RIGHT')) {
        //lewy dolny rog
        if (this.x > this.tail[i].x && 
        this.x < this.tail[i].x + this.cell && 
        this.y + this.cell > this.tail[i].y && 
        this.y + this.cell < this.tail[i].y + this.cell) {
          return true;
        }
        //prawy dolny rog
        if (this.x + this.cell > this.tail[i].x && 
          this.x + this.cell < this.tail[i].x + this.cell && 
          this.y + this.cell > this.tail[i].y && 
          this.y +this.cell < this.tail[i].y + this.cell) {
            return true;
        } 
      }  

      //wyklucza kolizje z lewa czescia glowy weza
      if(this.prevDirection === 'RIGHT' && (this.direction === 'UP' || this.direction === 'DOWN')) {
        //prawy gorny rog
        if (this.x + this.cell > this.tail[i].x &&
          this.x + this.cell < this.tail[i].x + this.cell && 
          this.y > this.tail[i].y && 
          this.y < this.tail[i].y + this.cell) {
            return true;
        }
        //prawy dolny rog
        if (this.x + this.cell > this.tail[i].x && 
          this.x + this.cell < this.tail[i].x + this.cell && 
          this.y + this.cell > this.tail[i].y && 
          this.y +this.cell < this.tail[i].y + this.cell) {
            return true;
        }
      }

      //wyklucza kolizje z prawa czescia glowy weza
      if(this.prevDirection === 'LEFT' && (this.direction === 'UP' || this.direction === 'DOWN')) {
         //lewy gorny rog
         if (this.x > this.tail[i].x && 
          this.x < this.tail[i].x + this.cell && 
          this.y > this.tail[i].y && 
          this.y < this.tail[i].y + this.cell) {
            return true;
        }
        //lewy dolny rog
        if (this.x > this.tail[i].x && 
          this.x < this.tail[i].x + this.cell && 
          this.y + this.cell > this.tail[i].y && 
          this.y + this.cell < this.tail[i].y + this.cell) {
            return true;
        }
      }
    } 

    // //sciany
    for (let i=0; i<w.length; i++) {
      if (w[i].type === 'rect'){
        //lewy gorny rog
      if (this.x > w[i].x &&
        this.x < w[i].x + w[i].length && 
        this.y > w[i].y && 
        this.y < w[i].y + w[i].height) {
          return true;
      }
      //prawy gorny rog
      else if (this.x + this.cell > w[i].x &&
        this.x + this.cell < w[i].x + w[i].length && 
        this.y > w[i].y && 
        this.y < w[i].y + w[i].height) {
          return true;
      }
      //lewy dolny rog
      else if (this.x > w[i].x && 
        this.x < w[i].x + w[i].length && 
        this.y + this.cell > w[i].y && 
        this.y + this.cell < w[i].y + w[i].height) {
          return true;
      }
      //prawy dolny rog
      else if (this.x + this.cell > w[i].x && 
        this.x + this.cell < w[i].x + w[i].length && 
        this.y + this.cell > w[i].y &&
        this.y +this.cell < w[i].y + w[i].height) {
          return true;
      }
    } else {
      let cicrleEquationResult;

      //lewy gorny rog
      cicrleEquationResult = (this.x - w[i].x)**2 + (this.y - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

      //prawy gorny rog
      cicrleEquationResult = (this.x + this.cell - w[i].x)**2 + (this.y - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }
      
      //lewy dolny rog
      cicrleEquationResult = (this.x - w[i].x)**2 + (this.y + this.cell - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

      //prawy gorny rog
      cicrleEquationResult = (this.x + this.cell - w[i].x)**2 + (this.y + this.cell - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

      //srodek gora
      cicrleEquationResult = (this.x + this.cell/2 - w[i].x)**2 + (this.y - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

      //srodek dol
      cicrleEquationResult = (this.x + this.cell/2 - w[i].x)**2 + (this.y +this.cell - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

      //srodek prawy
      cicrleEquationResult = (this.x + this.cell - w[i].x)**2 + (this.y + this.cell/2 - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

      //srodek lewy
      cicrleEquationResult = (this.x - w[i].x)**2 + (this.y + this.cell/2 - w[i].y)**2;
      if (cicrleEquationResult <= w[i].radius**2) {
        return true;
      }

    }      
    } 
    
    return false;
  }

  tailMove() {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.tailLength] = { x: this.x, y: this.y};
  }
}

export default Snake;
