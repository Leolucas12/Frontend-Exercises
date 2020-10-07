const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

//size of the tiles:
const tile = 32;

//snake array
let snake = [];;
//snake model
snake[0] = {
    x: 4 * tile,
    y: 4 * tile,
};

var d;

//creating the food:
let food = {
    x: Math.floor(Math.random()*18+1) * tile,
    y: Math.floor(Math.random()*18+1) * tile,
};

//creating the score variable
let score = 0;

//keyboard event listener
document.addEventListener('keydown', direction);

//function to check the direction
function direction(evt) {
    if(evt.keyCode == 37 && d!= "RIGHT") {
        d = "LEFT";
    } else if(evt.keyCode == 38 && d!= "DOWN") {
        d = "UP"
    } else if(evt.keyCode == 39 && d!= "LEFT") {
        d = "RIGHT"        
    } else if(evt.keyCode == 40 && d!= "UP") {
        d = "DOWN"
    }
}

//check collision of the snake with itself
function collision(head, body) {
    for(let i = 0; i < body.length; i++) {
        if(head.x == body[i].x && head.y == body[i].y) {
            return true;
        }
    }

    return false;
}

//function that draws on screen
function draw() {
    ctx.clearRect(0,0,640,640);

    ctx.fillStyle = 'grey';
    ctx.fillRect(0,0,640,640);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = 'green';
        ctx.fillRect(snake[i].x, snake[i].y, tile, tile);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, tile, tile);

    //getting the position of the snake (first tile)
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    //check the direction
    if(d == "LEFT") snakeX -= tile;
    if(d == "UP") snakeY -= tile;
    if(d == "RIGHT") snakeX += tile;
    if(d == "DOWN") snakeY += tile;

    //check collision with the food
    if(snakeX == food.x && snakeY == food.y) {
        score++;
        food.x = Math.floor(Math.random()*18+1) * tile;
        food.y = Math.floor(Math.random()*18+1) * tile;
    } else {
        //removing the last tile of the snake and putting it in the first tile
        snake.pop();
    }

    //add new tile
    let newTile = {
        x: snakeX,
        y: snakeY,
    };

    //check collision with the snake and walls
    if(snakeX < tile || snakeX > 18 * tile || snakeY < tile || snakeY > 18 * tile
        || collision(newTile, snake)) {
        clearInterval(game);
    }

    //unshift mehod puts the newHead in the first position of the Array snake[]
    snake.unshift(newTile);

    //writing the score on the screen
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(score, tile/2, tile);
}

let game = setInterval(draw, 150);
