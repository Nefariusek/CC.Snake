import Wall from '../wall';
import { ctx, cw, ch} from '../main';

//klasa do ścian okrągłych
class WallCircle extends Wall {

    constructor(x, y) {
        super (x, y);
        this.length = length;
        this.radius = this.height/2;
        this.upperRowCircle = this.upperRow+this.radius;
        this.bottomRowCircle = this.bottomRow+this.radius;
        this.wallsCircle = [];
        this.type = 'circl';
      }
      // rysowanie ścian okrągłych
      drawCirc(){
        ctx.fillStyle = 'black';
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
        ctx.fill();
      }
      // dodawanie okrągłych ścian do tablicy
      addWallsCircle() {
        this.wallsCircle.push(new WallCircle(cw/12, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw / 12)+4*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw/12)+8*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw/12)+8*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((5*cw/12)+this.length+3*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle(9.5*cw / 12, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((2.5*cw/12)+this.length+3*this.radius, this.bottomRowCircle));
        this.wallsCircle.push(new WallCircle(8.5*cw/12, this.bottomRowCircle));
    
        return this.wallsCircle;
      }

      addWallsCircle_level2() {
        this.upperRow = ch/5;
        this.upperRowCircle = this.upperRow+this.radius;
        this.wallsCircle.push(new WallCircle((1.5*cw/12), this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((1.5*cw/12)+11*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((1.5*cw/12)+15*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((7*cw/12)+8*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((7*cw/12), this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((7*cw/12)+4*this.radius, this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((7*cw/12)+15*this.radius, this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((5.5*cw/12)+15*this.radius, this.upperRowCircle+2*ch/5));
        this.wallsCircle.push(new WallCircle(1.5*cw/12, this.upperRowCircle+3*ch/5));
        this.wallsCircle.push(new WallCircle((1.5*cw / 12)+4*this.radius, this.upperRowCircle+3*ch/5));
        this.wallsCircle.push(new WallCircle((1.5*cw/12)+8*this.radius, this.upperRowCircle+3*ch/5));
        this.wallsCircle.push(new WallCircle((6*cw/12), this.upperRowCircle+(3*ch/5)));
        this.wallsCircle.push(new WallCircle((6*cw/12)+2*this.length+19*this.radius, this.upperRowCircle+(3*ch/5)));
        return this.wallsCircle;
      }

      addWallsCircle_level3() {
        this.upperRow = ch/5;
        this.upperRowCircle = this.upperRow+this.radius;
        this.wallsCircle.push(new WallCircle((cw/12)+(8*this.radius), this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((cw/12)+(19*this.radius), this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((7.5*cw / 12)+8*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((7.5*cw / 12)+12*this.radius, this.upperRowCircle));
        this.wallsCircle.push(new WallCircle((1.5*cw/12), this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((1.5*cw/12)+this.length+11*this.radius, this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((8*cw/12), this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((8*cw/12)+4*this.radius, this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((8*cw/12)+8*this.radius, this.upperRowCircle+ch/5));
        this.wallsCircle.push(new WallCircle((0.5*cw/12)+(8*this.radius), this.upperRowCircle+(2*ch/5)));
        this.wallsCircle.push(new WallCircle((0.5*cw/12)+(19*this.radius), this.upperRowCircle+(2*ch/5)));
        this.wallsCircle.push(new WallCircle((3.5*cw/12), this.upperRowCircle+(3*ch/5)));
        this.wallsCircle.push(new WallCircle((3.5*cw/12)+2*this.length+19*this.radius, this.upperRowCircle+(3*ch/5)));
    
        return this.wallsCircle;
      }
        
      // rysowanie okrągłych ścian
      drawWalls(){
      let i=0;
      
      for (i; i<this.wallsCircle.length; i++){
        if (this.wallsCircle[i].type === 'circl'){
            ctx.beginPath();
            this.wallsCircle[i].drawCirc();
            ctx.closePath();
        } 
      }
      i=0;
      }
    
    }

export default WallCircle;