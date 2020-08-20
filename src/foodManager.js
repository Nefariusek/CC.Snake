import { cw, ch } from './main';
import NormalFood from './foods/normalFood';
import ComboFood from './foods/comboFood';
import SuperFood from './foods/superFood';
import WeakeningFood from './foods/weakeningFood';
import SplitFood from './foods/splitFood';

//klasa zarządzająca jedzeniem

class FoodManager {
    constructor(foodSize, snake, wallsRect, wallsCircle) {
        this.foodOnMap = [];
        this.recentlyEaten = [new NormalFood(0, 0, 0), new NormalFood(0, 0, 0), new NormalFood(0, 0, 0)];
        this.maxFoodCount = 3;
        this.foodSize = foodSize;
        this.multiplier = 1;
        this.snake = snake;
        this.wallsRect = wallsRect;
        this.wallsCircle = wallsCircle;
        this.refreshFood();
    }

    //sprawdza czy głowa dotarła do jedzenia
    headEat() {
        this.foodOnMap = this.foodOnMap.filter(food => {
            if ((food.x + 6 <= this.snake.x + this.snake.cell && food.x + food.size - 6 >= this.snake.x) &&
                (food.y + 6 <= this.snake.y + this.snake.cell && food.y + food.size - 6 >= this.snake.y)) {

                this.recentlyEaten.shift();
                this.recentlyEaten.push(food);

                food.eat(this.multiplier);

                return false;
            }
            return true;
        });
    }

    //umiejscawia jedzenie na planszy
    placeApple() {
        let nextX;
        let nextY;

        do {
            nextX = Math.floor(Math.random() * (cw - this.foodSize));
            nextY = Math.floor(Math.random() * (ch - this.foodSize));
        } while (
            (this.wallsRect.some(wall => nextX + this.foodSize + 5 > wall.x && nextX < wall.x + wall.length + 5 && nextY + this.foodSize + 5 > wall.y && nextY < wall.y + wall.height + 5)) ||
            (this.wallsCircle.some(wall => nextX + this.foodSize  + 5 > wall.x - wall.radius && nextX < wall.x + wall.radius + 5 && nextY + this.foodSize + 5 > wall.y - wall.radius && nextY < wall.y + wall.radius + 5)))

        let foodType = Math.floor(Math.random() * 100);

        if (foodType < 42) {
            this.foodOnMap.push(new NormalFood(nextX, nextY, this.foodSize, this.snake, this));
        } else if (foodType < 84) {
            this.foodOnMap.push(new ComboFood(nextX, nextY, this.foodSize, this.snake, this));
        } else if (foodType < 94) {
            this.foodOnMap.push(new WeakeningFood(nextX, nextY, this.foodSize, this.snake, this));
        } else if (foodType < 97) {
            this.foodOnMap.push(new SuperFood(nextX, nextY, this.foodSize, this.snake, this));
        } else {
            this.foodOnMap.push(new SplitFood(nextX, nextY, this.foodSize, this.snake, this));
        }
    }

    //sprawdza czy na planszy brakuje jedzenia
    foodGenerator() {
        if (this.foodOnMap.length < this.maxFoodCount)
            this.placeApple();
    }

    //rysuje jedzenie na planszy
    drawFood() {
        this.foodOnMap.forEach(food => {
            food.draw();
        });
    }

    //usuwa najstarsze jedzenie na planszy w przedziale 5-10 sekund
    async refreshFood() {
        this.foodOnMap.splice(0, 1);
        let timeout = Math.floor(Math.random() * 10000);
        await sleep(7500 + timeout);
        this.refreshFood();
    }

    //funkcje wymagające odświeżania co klatkę
    manageFood() {
        this.headEat();
        this.foodGenerator();
        this.drawFood();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default FoodManager;
