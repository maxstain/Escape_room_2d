var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
const canvWidth = canvas.width;
const canvHeight = canvas.height;
var x = canvWidth / 2;
var y = canvHeight / 2;
var dx = 2;
var dy = 2;
var audio = new Audio();
var cabinetImg = new Image();
var floorImg = new Image();
var tableImg = new Image();
var doorImg = new Image();
var InvCaseImg = new Image();
var KeyImg = new Image();
var PlayerImg = new Image();
var player = {
    x: this.x,
    y: this.y,
    w: 20,
    h: 20,
    image: null,
    inventory: [],
};
var cabinet = {
    x: canvWidth / 2 - 20,
    y: 0,
    w: 60,
    h: 40,
    inventory: [{
            name: "Whiskey",
            link: "../assets/ER_Whiskey.png",
        },
        {
            name: "Key",
            link: "../assets/ER_Key.png",
        },
        {
            name: "Knife",
            link: "../assets/ER_Knife.png",
        }
    ],
    image: "../assets/ER_Cabinet.png",
}

var table = {
    x: 0,
    y: canvHeight / 2 - 20,
    w: 40,
    h: 60,
    image: "../assets/ER_Table.png",
}

var door = {
    x: canvWidth - 10,
    y: canvHeight / 2 - 20,
    w: 10,
    h: 60,
    image: "../assets/ER_Door.png",
}

let msg = "Search the place for clues to find the key to open the door";
let code = Math.floor(Math.random() * 99999) + 1;

console.log("Player: ", player.inventory);
console.log("Cabinet: ", cabinet.inventory);

function start() {
    create();
    draw(player.x, player.y);
    drawInv(player.inventory);
    setTimeout(() => {
        start();
    }, 10);
}

function drawInv(inv) {
    let x = 0;
    let y = 20;
    const pad = 40;
    ctx.fillStyle = "white";
    ctx.font = "15px";
    ctx.fillText("Inventory:", 5, 15, 120);
    if (inv.length <= 0) {
        ctx.fillText("Empty", 5, 30, 120);
    } else {
        inv.forEach(elem => {
            InvCaseImg.src = "";
            InvCaseImg.src = elem.link;
            ctx.drawImage(InvCaseImg, x, y, pad, pad);
            ctx.fillText(elem.name, x, y + pad + 10);
            x += pad;
        });
    }
}

function clear() {
    floorImg.src = "../assets/ER_Floor.png";
    ctx.drawImage(floorImg, 0, 0, canvWidth, canvHeight);
}

function create() {
    ctx.fillStyle = 'White';
    ctx.font = "bold";
    ctx.fillText("Cabinet", cabinet.x + 10, cabinet.h + 10);
    cabinetImg.src = cabinet.image;
    ctx.drawImage(cabinetImg, cabinet.x, cabinet.y, cabinet.w, cabinet.h);
    tableImg.src = table.image;
    ctx.drawImage(tableImg, table.x, table.y, table.w, table.h);
    ctx.fillText("Table", 5, canvHeight / 2 - 25);
    doorImg.src = door.image;
    ctx.drawImage(doorImg, door.x, door.y, door.w, door.h);
    ctx.fillText("Door", canvWidth - 30, canvHeight / 2 - 25);
    ctx.fillText(msg, 10, canvHeight - 10);
}

function draw(x, y) {
    clear();
    create();
    PlayerImg.src = "../assets/player.png";
    ctx.drawImage(PlayerImg, x, y);
    ctx.fillStyle = 'white';
    ctx.fillRect(x + 15, y, 5, 5);
    ctx.strokeRect(x + 15, y, 5, 5);
    ctx.fillRect(x + 40, y, 5, 5);
    ctx.strokeRect(x + 40, y, 5, 5);
}

document.addEventListener('keydown', movePlayer);

function movePlayer(e) {
    var direction;
    var key = e.key;
    switch (key) {
        case "ArrowUp": {
            if (player.y != 0) {
                player.y -= dy;
                direction = "up";
            }
            break;
        }
        case "ArrowLeft": {
            if (player.x != 0) {
                player.x -= dx;
                direction = "left";
            }
            break;
        }
        case "ArrowDown": {
            if (player.y != canvHeight - 20) {
                player.y += dy;
                direction = "down";
            }
            break;
        }
        case "ArrowRight": {
            if (player.x != canvWidth - 20) {
                player.x += dx;
                direction = "right";
            }
            break;
        }
    }
    console.log('Going', direction);

    if ((player.x == cabinet.x) && (player.y == cabinet.y) && (cabinet.inventory.find(elem => elem.name == "Key"))) {
        ans = prompt("what's the secret code ?")
        if (ans == code) {
            audio.src = "../sounds/drawer.wav";
            audio.play();
            for (let i = 0; i < cabinet.inventory.length; i++) {
                player.inventory.push(cabinet.inventory[i]);
            }
            cabinet.inventory.splice(0, cabinet.inventory.length);
            msg = "You have picked up a key";
        } else {
            audio.src = "../sounds/door-locked.wav";
            audio.play();
            msg = "Wrong answer, try again"
        }
        console.log("Cabinet: ");
        console.log(cabinet.inventory);
        console.log("Player: ");
        console.log(player.inventory);
    }
    if (player.x == table.x && player.y == table.y) {
        audio.src = "../sounds/paper-turn-over.wav";
        audio.play();
        alert(`The code is ${code}`);
        msg = "you have found a clue";
    }
    for (let i = 131; i < 191; i++) {
        if ((player.x + player.w == door.x + door.w) && (player.y == door.y)) {
            if (player.inventory.find(elem => elem.name == "Key")) {
                audio.src = "../sounds/door_unlock.wav";
                audio.play();
                alert("You have escaped successfully");
                document.location.href = "../finish.html";
                break;
            } else {
                audio.src = "../sounds/door-locked.wav";
                audio.play();
                alert("Door is locked");
                break;
            }
        }
    }
}

/* document.addEventListener("click", (e) => {
    var mouseX = e.clientX;
    var mouseY = e.clientY;
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
}); */

start();