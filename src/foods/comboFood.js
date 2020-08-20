import AbstractFood from './abstractFood';
import comboFoodImgSrc from '../../src/foods/img/greenApple.png';

const comboFoodImg = new Image();
comboFoodImg.src = comboFoodImgSrc;

//Combo jedzenie - po zjedzeniu 3 z rzędu mnożnik punktów rośnie 2x na 10 sekund

class ComboFood extends AbstractFood{
    constructor (x, y, size, snake, foodManager){
        super(x, y, size, snake, foodManager);

        this.img = comboFoodImg;
        this.name = 'Combo Food';
    }
    

    async eatFood() {
        if (this.foodManager.recentlyEaten.every(food => food.name ==='Combo Food'))
            this.doubleMultiplier();
    }
}

export default ComboFood;