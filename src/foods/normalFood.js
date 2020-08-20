import AbstractFood from './abstractFood';
import normalFoodImgSrc from '../../src/foods/img/redApple.png';

const normalFoodImg = new Image();
normalFoodImg.src = normalFoodImgSrc;

// Normalne jedzenie - dodaje 1 do długości węża

class NormalFood extends AbstractFood{
    constructor (x, y, size, snake, foodManager){
        super(x, y, size, snake, foodManager);
        this.img = normalFoodImg;
        this.name = 'Normal Food';
    }

    eatFood() {}
    
}

export default NormalFood;