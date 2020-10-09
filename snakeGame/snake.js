const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const gameOver = document.getElementById("gameOver");
gameOver.style.display = "none";
const scoreLabel = document.getElementById("scoreLabel");
const maxScoreLabel = document.getElementById("maxScoreLabel");
const restart = document.getElementById('restart')

//size of the tiles:
const tile = 32;

//snake array
let snake = [];;
//snake model
snake[0] = {
    x: 9 * tile,
    y: 9 * tile,
};

//creating the food:
let food = {
    x: Math.floor(Math.random()*18+1) * tile,
    y: Math.floor(Math.random()*18+1) * tile,
};

//creating the score variable
let score = 0;
let maxScore = 0 || localStorage.getItem("score");

//keyboard event listener
document.addEventListener('keydown', direction);

var directonPressed;
//function to check the direction
function direction(evt) {
    if(evt.keyCode == 37 && directonPressed!= "RIGHT") {
        directonPressed = "LEFT";
    } else if(evt.keyCode == 38 && directonPressed!= "DOWN") {
        directonPressed = "UP"
    } else if(evt.keyCode == 39 && directonPressed!= "LEFT") {
        directonPressed = "RIGHT"        
    } else if(evt.keyCode == 40 && directonPressed!= "UP") {
        directonPressed = "DOWN"
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

function showMenu() {
    gameOver.style.display = "flex";
}

//function that draws on screen
function draw() {
    ctx.clearRect(0,0,640,640);

    ctx.fillStyle = '#c4edde';
    ctx.fillRect(0,0,640,640);

    ctx.fillStyle = '#384259';
    ctx.fillRect(0,0,640,tile);
    ctx.fillRect(0,0,tile,640);
    ctx.fillRect(608,0,tile,608);
    ctx.fillRect(0,608,640,tile);

    for(let i = 0; i < snake.length; i++) {
        ctx.fillStyle = '#384259';
        ctx.fillRect(snake[i].x, snake[i].y, tile, tile);
    }

    ctx.fillStyle = '#f73859';
    ctx.fillRect(food.x, food.y, tile, tile);

    //getting the position of the snake (first tile)
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    //check the direction
    if(directonPressed == "LEFT") snakeX -= tile;
    if(directonPressed == "UP") snakeY -= tile;
    if(directonPressed == "RIGHT") snakeX += tile;
    if(directonPressed == "DOWN") snakeY += tile;

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
        
        if (score > maxScore) localStorage.setItem("score", score)
        scoreLabel.innerHTML = `Score: ${score}`;
        maxScoreLabel.innerHTML = `High Score: ${maxScore}`;
        showMenu();
    }

    //unshift mehod puts the newHead in the first position of the Array snake[]
    snake.unshift(newTile);

    //writing the score on the screen
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(score, tile/2, tile);
}

let game = setInterval(draw, 150)
