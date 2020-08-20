import { ctx, cw, ch } from './main';

class Wall {

  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.length = 100;
    this.height = 40;
    this.radius = this.height/2;
    this.time = null;
    this.upperRow = ch/3;
    this.bottomRow = 2*ch/3;
    this.wallsRect = [];
    this.type = 'rect';
  }

  // rysowanie prostokątów
  drawRect() {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.length, this.height);
  }

  // dodawanie prostokątnych ścian do tablicy
  addWallsRect() {
    this.wallsRect.push(new Wall(5*cw/12, this.upperRow));
    this.wallsRect.push(new Wall((9.5*cw / 12)+3*this.radius, this.upperRow));
    this.wallsRect.push(new Wall(2.5*cw/12, this.bottomRow));
    this.wallsRect.push(new Wall((2.5*cw/12)+this.length+6*this.radius, this.bottomRow));

    return this.wallsRect;
  }

  addWallsRect_level2() {
    this.upperRow = ch/5;
    this.wallsRect.push(new Wall(1.5*cw/12+(3*this.radius), this.upperRow));
    this.wallsRect.push(new Wall(7*cw/12, this.upperRow));
    this.wallsRect.push(new Wall((7*cw/12)+this.length+6*this.radius, this.upperRow));
    this.wallsRect.push(new Wall(1.5*cw/12, this.upperRow+(ch/5)));
    this.wallsRect.push(new Wall(1.5*cw/12+this.length+(3*this.radius), this.upperRow+(ch/5)));
    this.wallsRect.push(new Wall(7*cw/12+(7*this.radius), this.upperRow+ch/5));
    this.wallsRect.push(new Wall(cw/12-this.radius, this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(cw/12+this.length+(2*this.radius), this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(5.5*cw/12, this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(5.5*cw/12+this.length+(2*this.radius), this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(5.5*cw/12+2*this.length+(8*this.radius), this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(6*cw/12+(3*this.radius), this.upperRow+(3*ch/5)));
    this.wallsRect.push(new Wall(6*cw/12+(11*this.radius), this.upperRow+(3*ch/5)));

    return this.wallsRect;
  }

  addWallsRect_level3() {
    this.upperRow = ch/5;
    this.wallsRect.push(new Wall(cw/12, this.upperRow));
    this.wallsRect.push(new Wall((cw/12)+11*this.radius, this.upperRow));
    this.wallsRect.push(new Wall(7.5*cw/12, this.upperRow));
    this.wallsRect.push(new Wall((1.5*cw/12)+3*this.radius, this.upperRow+ch/5));
    this.wallsRect.push(new Wall(0.5*cw/12, this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall((0.5*cw/12)+11*this.radius, this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(8*cw/12, this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(8*cw/12+this.length+(3*this.radius), this.upperRow+(2*ch/5)));
    this.wallsRect.push(new Wall(3.5*cw/12+(3*this.radius), this.upperRow+(3*ch/5)));
    this.wallsRect.push(new Wall(3.5*cw/12+(11*this.radius), this.upperRow+(3*ch/5)));

    return this.wallsRect;
  }



  // rysowanie ścian
  drawWalls(){
  let i=0;
  
  for (i; i<this.wallsRect.length; i++){
    if (this.wallsRect[i].type === 'rect'){
        ctx.beginPath();
        this.wallsRect[i].drawRect();
        ctx.closePath();
    } 
  }

  i=0;
  }

  // rysowanie tekstu
  drawText() {
    ctx.font = '300px bold serif';
    ctx.fillText('S', cw /12, ch/2.5);
    ctx.fillText('N', 5*cw /12, ch/2.5);
    ctx.fillText('A', 9*cw /12, ch/2.5);
    ctx.fillText('K', 3*cw /12, 2.2*ch/2.5);
    ctx.fillText('E', 7*cw /12, 2.2*ch/2.5);
  }

  // zmiana ścian na tekst
  async wallsChange() {
    console.log('dziala');
    await sleep(10000);
    console.log('po 10s');
}

}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default Wall;
