/**
 * Enemies the player must avoid
 */
var Enemy = function (x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.width = 90;
    this.height = 63;
    this.move = function (dt) {
        var randomPosition = [-101, -202, -303, -404, -505];
        this.x += this.speed * dt;
        if (this.x > 808) {
            this.x = randomPosition[Math.floor(Math.random() * randomPosition.length)];
        }
    };
    /**
     * Update the enemy's position, required method for game
     * Parameter: dt, a time delta between ticks
     */
    Enemy.prototype.update = function (dt) {
        this.move(dt);
    };
};
/*
 * Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
 * Player class
 * @constructor
 */
var Player = function () {
    this.x = ctx.canvas.width / 2;
    this.y = ctx.canvas.height - 182;
    this.speed = 83;
    this.width = 90;
    this.height = 63;
    this.hasJewel = false;
    this.hasKey = false;
    this.sprite = 'images/char-horn-girl.png';
    this.up = function () {
        if (this.y >= this.speed - 10) {
            this.y -= this.speed;
        }
    };
    this.down = function () {
        if (this.y < (ctx.canvas.height - 200)) {
            this.y = this.y + this.speed;
        }
    };
    this.right = function () {
        if (this.x < ctx.canvas.width - (this.speed + 18)) {
            this.x = this.x + (this.speed + 18);
        }
    };
    this.left = function () {
        if (this.x >= this.speed) {
            this.x = this.x - (this.speed + 18);
        }
    };
};
/*
 * Draw the player on the screen, required method for game
 */
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*
 * Define how player moves when arrow keys are pressed
 */
$(document).keydown(function (event) {
    var code = event.charCode || event.keyCode;
    if (code === 38) {
        player.up();
    }
    if (code === 40) {
        player.down();
    }
    if (code === 39) {
        player.right();
    }
    if (code === 37) {
        player.left();
    }
    event.preventDefault();
    return false;
});
/*
 * Define movements when keys are pressed
 */
var Exit = function (x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/keyhole.png';
    this.width = 80;
    this.height = 75;
};
/*
 * Exits that the player will have to pass through to gain points
 */
Exit.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};
/*
 * Points the player will collect
 */
var Points = function (x, y) {
    this.x = ctx.canvas.width - 200;
    this.y = ctx.canvas.height - 543;
};
/*
 * draw the points on the screen
 */
Points.prototype.render = function () {
    ctx.font = '30px Arial';
    ctx.fillText('Points: ' + points, this.x, this.y);
};
/*
 * redraw the points when the player gains more points
 */
Points.prototype.updated = function () {
    ctx.clearRect(500, 0, 808, 70);
    this.render();
};
/*
 * Key the player needs to collect in order to go through the exits
 */
var Key = function () {
    var keyX = [0, 101, 202, 303, 404, 505, 606, 707];
    var keyY = [73, 156, 239, 320];
    this.x = keyX[Math.floor(Math.random() * keyX.length)];
    this.y = keyY[Math.floor(Math.random() * keyY.length)];
    this.speed = 400;
    this.height = 63;
    this.width = 90;
    this.sprite = 'images/Key.png';
    this.move = function () {
        this.y += this.speed;
    };
};
/*
 * draw the key on the screen
 */
Key.prototype.render = function () {
    if (player.hasKey === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
};
/*
 * Jewel that the player can collect to gain more points
 */
var Jewel = function (sprite, points) {
    var jewelX = [0, 101, 202, 303, 404, 505, 606, 707];
    var jewelY = [93, 177, 259, 342];
    this.x = jewelX[Math.floor(Math.random() * jewelX.length)];
    this.y = jewelY[Math.floor(Math.random() * jewelY.length)];
    this.sprite = sprite;
    this.points = points;
    this.speed = 400;
    this.imageHeight = 120;
    this.imageWidth = 99;
    this.height = 63;
    this.width = 90;
    this.move = function () {
        this.y += this.speed;
    };
};
/*
 * draw the jewel on the screen
 */
Jewel.prototype.render = function () {
    if (player.hasJewel === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.imageWidth, this.imageHeight);
    }
};
/*
 * Player's lives
 */
var Life = function () {
    this.sprite = 'images/Heart.png';
    this.height = 60;
    this.width = 40;
    this.number = 3;
};
/*
 * draws the hearts for each life
 */
Life.prototype.render = function () {
    var heartPosition = 0;
    for (var i = 0; i < this.number; i++) {
        ctx.drawImage(Resources.get(this.sprite), heartPosition, 0, this.width, this.height);
        heartPosition += 40;
    }
    if (this.number === 0) {
        //gameOver();
        console.log('Game over');
    }
};
/*
 * redraw the player's lives when the player looses a life
 */
Life.prototype.loseLife = function () {
    if (this.number > 0) this.number--;
    ctx.clearRect(0, 0, 150, 50);
    this.render();
};


var allEnemies = [];
var createEnemies = function () {
    var enemyHeights = [60, 145, 230, 315];
    for (var i = 0; i < 7; i++) {
        var enemyHeight = enemyHeights[Math.floor(Math.random() * enemyHeights.length)];
        var enemySpeed = (Math.floor(Math.random() * 100) + 1);
        var enemyPosition = Math.floor(Math.random() * 3);
        allEnemies.push(new Enemy(enemyPosition, enemyHeight, enemySpeed));
    }
    return allEnemies;
};
createEnemies();
$(document).ready(function () {
    window.player = new Player();
    window.exit1 = new Exit(211, 55);
    window.exit2 = new Exit(515, 55);
    window.lives = new Life();
    window.key = new Key();
    window.pointsDisplay = new Points();
    window.points = 0;
    window.jewelList = [];
    window.jewelList.push(new Jewel('images/Gem-Blue.png', 15));
    window.jewelList.push(new Jewel('images/Gem-Green.png', 30));
    window.jewelList.push(new Jewel('images/Gem-Orange.png', 45));
    window.jewel = jewelList[Math.floor(Math.random() * jewelList.length)];
});
/*
 * resets the positions of the player, enemies, key and jewels
 */
var resetPositions = function () {
    player = new Player();
    allEnemies = [];
    createEnemies();
    key = new Key();
    jewel = jewelList[Math.floor(Math.random() * jewelList.length)];
    if (jewel.y > 342) {
        jewel.y -= 400;
    }
};
/*
 * checks for collisions and resets the positions of
 * player/enemies/key/jewel if a collision occurs
 */
var checkCollisions = function () {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x <= (allEnemies[i].x + allEnemies[i].width) && allEnemies[i].x <= (player.x + player.width) && player.y <= (allEnemies[i].y + allEnemies[i].height) && allEnemies[i].y <= (player.y + player.height)) {
            if (lives.number > 0) {
                lives.loseLife();
                resetPositions();
            } else {
                gameOver();
            }
        }
    }
};
/*
 * checks if the player is walking on water
 */
var dontWalkOnWater = function () {
    if (player.y < 60 && ( player.x < 202 || (player.x > 250 && player.x < 505) || player.x > 556)) {
        if (lives.number > 0) {
            lives.loseLife();
            resetPositions();
        } else {
            gameOver();
        }
    }
};
/*
 * player collects key, gets points and is able to walk through the exits
 */
var collectKey = function () {
    if (player.x <= (key.x + key.width) && key.x <= (player.x + player.width) && player.y <= (key.y + key.height) && key.y <= (player.y + player.height)) {
        player.hasKey = true;
        key.speed = 400;
        key.move();
        points += 10;
        pointsDisplay.updated();
    }
};
/*
 * player collects jewel and gets points
 */

var collectJewel = function () {
    if (player.x <= (jewel.x + jewel.width) && jewel.x <= (player.x + player.width) && player.y <= (jewel.y + jewel.height) && jewel.y <= (player.y + player.height)) {
        player.hasJewel = true;
        jewel.move();
        points += jewel.points;
        pointsDisplay.updated();
    }
};
/*
 * player has collected the key and proceeds through the exit
 */
var completeTask = function () {
    if (player.hasKey) {
        if ((player.y < 60 && player.x >= 202 && player.x < 300) || (player.y < 60 && player.x >= 505 && player.x < 556)) {
            resetPositions();
            player.hasKey = false;
            player.hasJewel = false;
            key.speed = 0;
            points += 100;
            pointsDisplay.updated();
        }
    }
};
/*
 * player lost all of his/her lives
 */
var gameOver = function () {
    document.getElementById('light-end').style.display = 'block';
    document.getElementById('fade-end').style.display = 'block';
};
/*
 * prepares a new game
 */
var newGame = function () {
    document.getElementById('light-end').style.display = 'none';
    document.getElementById('fade-end').style.display = 'none';
    resetPositions();
    lives.number = 3;
    points = 0;
    pointsDisplay.updated();
    player.hasJewel = false;
};

$('.button').click(function () {
    newGame();
});