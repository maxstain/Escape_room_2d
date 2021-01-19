var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
const canvWidth = canvas.width;
const canvHeight = canvas.height;
var x = canvWidth / 2;
var y = canvHeight / 2;
var dx = 2;
var dy = 2;
var player = {
    x: this.x,
    y: this.y,
    inventory: [],
};
var cabinet = {
    x: canvWidth / 2 - 20,
    y: 0,
    w: 60,
    h: 40,
    inventory: ["wiskey", "key", "knife"],
}

console.log(player.inventory);

function start() {
    create();
    draw(player.x, player.y);
    setTimeout(() => {
        start();
    }, 10);
}

function clear() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvWidth, canvHeight);
    ctx.strokeRect(0, 0, canvWidth, canvHeight);
}

function create() {
    ctx.fillStyle = 'red';
    ctx.fillRect(cabinet.x, cabinet.y, cabinet.w, cabinet.h);
    ctx.strokeRect(cabinet.x, cabinet.y, cabinet.w, cabinet.h);
    ctx.fillStyle = 'green';
    ctx.fillRect(0, canvHeight / 2 - 20, 40, 60);
    ctx.strokeRect(0, canvHeight / 2 - 20, 40, 60);
    ctx.fillStyle = 'brown';
    ctx.fillRect(canvWidth - 10, canvHeight / 2 - 20, 10, 60);
    ctx.strokeRect(canvWidth - 10, canvHeight / 2 - 20, 10, 60);
}

function draw(x, y) {
    clear();
    create();
    ctx.fillStyle = 'blue';
    ctx.fillRect(x, y, 20, 20);
    ctx.strokeRect(x, y, 20, 20);
}

document.addEventListener('keydown', movePlayer);

function movePlayer(e) {
    var key = e.key;
    switch (key) {
        case "ArrowUp": {
            if (player.y != 0) {
                player.y -= dy;
            }
            break;
        }
        case "ArrowLeft": {
            if (player.x != 0) {
                player.x -= dx;
            }
            break;
        }
        case "ArrowDown": {
            if (player.y != canvHeight - 20) {
                player.y += dy;
            }
            break;
        }
        case "ArrowRight": {
            if (player.x != canvWidth - 20) {
                player.x += dx;
            }
            break;
        }
    }
    if ((player.x == cabinet.x) && (player.y == cabinet.y) && (cabinet.inventory.find(elem => elem == "key"))) {
        for (let i = 0; i < cabinet.inventory.length; i++) {
            player.inventory.push(cabinet.inventory[i]);
        }
        cabinet.inventory.splice(0, cabinet.inventory.length);
        console.log(cabinet.inventory);
        console.log(player.inventory);
        alert("You have picked up a key");
    }
    for (let i = 131; i < 191; i++) {
        if ((player.x + 20 == canvWidth) && (player.y == canvHeight - i)) {
            if (player.inventory.find(elem => elem == "key")) {
                alert("You have escaped successfully");
                document.location.href = "../finish.html";
            } else {
                alert("Door is locked");
            }
        }
    }
}

document.addEventListener("click", (e) => {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    console.log(player.x + 20);
    console.log(canvWidth);
    for (let i = 131; i < 191; i++) {
        if ((mouseX == canvWidth - 2) && (mouseY == canvHeight - i)) {
            if (player.inventory.find(elem => elem == "key")) {
                alert("You have escaped successfully");
                document.location.href = "../finish.html";
            } else {
                alert("Door is locked");
            }
        }
    }
});

start();