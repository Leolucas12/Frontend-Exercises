const cnv = document.querySelector('canvas')
const ctx = cnv.getContext('2d')
const tileSize = 32;
window.addEventListener('keydown', controllerHandler)
window.addEventListener('keyup', controllerHandler)

var controller = {
    left:false,
    right:false,
    up:false,
    down: false,
}

var walls = []
    
function controllerHandler(event) {

    var key_state = (event.type == "keydown")?true:false;

    switch(event.keyCode) {

    case 37: controller.left = key_state; break; // left key
    case 38: controller.up = key_state; break; // up key
    case 39: controller.right = key_state; break; // right key
    case 40: controller.down = key_state; break;

    }

}

const player = {
    x: 34,
    y: 34,
    width: tileSize - 2,
    height: tileSize - 2,
    speed: 3,
}

function rectangleCollision(p, w) {
}

const map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
];

for (var row in map) {
    for (var column in map) {
        var tile = map[row][column];
        if (tile === 1) {
            var wall = {
                x: column * tileSize,
                y: row * tileSize,
                width: tileSize,
                height: tileSize,
            }
        walls.push(wall)
        }
    }
}

update = () => {
    if (controller.down) player.y += player.speed;
    if (controller.up) player.y -= player.speed;
    if (controller.right) player.x += player.speed;
    if (controller.left) player.x -= player.speed;

    for (var i in walls) {
        var wall = walls[i];
        rectangleCollision(player, wall);
    }
}

render = () => {
    ctx.clearRect(0,0,cnv.width,cnv.height)
    for (var row in map) {
        for (var column in map) {
            var tile = map[row][column];
            if (tile === 1) {
                var x = column * tileSize;
                var y = row * tileSize;
                ctx.fillStyle = 'black'
                ctx.save()
                ctx.fillRect(x, y, tileSize, tileSize)
            }
        }
    }

    ctx.restore()
    ctx.fillStyle = 'red';
    ctx.fillRect(player.x, player.y, player.width, player.height)
}

loop = () => {
    update();
    render();
}

const frameRate = 60;
setInterval(loop, 1000 / frameRate);
