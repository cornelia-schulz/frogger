/**
 * Enemies the player must avoid
  */
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.move = function(dt) {
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
    Enemy.prototype.update = function(dt) {
        this.move(dt);
    };
};
/*
* Draw the enemy on the screen, required method for game
 */
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/**
 * Player class
 * @param x - player's horizontal position
 * @param y - player's vertical position
 * @param speed - player's speed
 * @constructor
 */
var Player = function(x, y, speed) {
    Enemy.call(this, x, y, speed);
    this.sprite = 'images/char-horn-girl.png';
    this.up = function() {
        if (this.y >= this.speed - 10) {
            this.y -= this.speed;
        }
    };
    this.down = function() {
        if (this.y < (ctx.canvas.height - 200)) {
            this.y = this.y + this.speed;
        }
    };
    this.right = function() {
        if (this.x < ctx.canvas.width - (this.speed + 18)) {
            this.x = this.x + (this.speed + 18);
        }
    };
    this.left = function() {
        if (this.x >= this.speed) {
            this.x = this.x - (this.speed + 18);
        }
    };
};
/*
 * Draw the player on the screen, required method for game
 */
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
/*
* Define how player moves when arrow keys are pressed
 */
$(document).keydown(function(event) {
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
var Exit = function(x, y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/keyhole.png';
    this.width = 80;
    this.height = 75;
};
/*
* Exits that the player will have to pass through to gain points
 */
Exit.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};
/*
* Points the player will collect
 */
var Points = function(x, y) {
    this.x = x;
    this.y = y;
};
/*
* draw the points on the screen
 */
Points.prototype.render = function() {
    ctx.font = '30px Arial';
    ctx.fillText('Points: ' + points, this.x, this.y);
};
/*
* redraw the points when the player gains more points
 */
Points.prototype.updated = function() {
    ctx.clearRect(500, 0, 808, 70);
    this.render();
};
/*
* Key the player needs to collect in order to go through the exits
 */
var Key = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 400;
    this.height = 155;
    this.width = 101;
    this.sprite = 'images/Key.png';
    this.move = function() {
        this.y += this.speed;
    };
};
/*
* draw the key on the screen
 */
Key.prototype.render = function() {
    if (hasKey === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
};
/*
* Jewel that the player can collect to gain more points
 */
var Jewel = function(x, y, sprite, points) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.points = points;
    this.speed = 400;
    this.height = 120;
    this.width = 101;
    this.move = function() {
        this.y += this.speed;
    };
};
/*
* draw the jewel on the screen
 */
Jewel.prototype.render = function() {
    if (hasJewel === false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
};
/*
* Player's lives
 */
var Life = function() {
    this.sprite = 'images/Heart.png';
    this.height = 60;
    this.width = 40;
    this.number = 3;
};
/*
* draws the hearts for each life
 */
Life.prototype.render = function() {
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
Life.prototype.loseLife = function() {
    if (this.number > 0) this.number--;
    ctx.clearRect(0, 0, 150, 50);
    this.render();
};




var allEnemies = [];
var createEnemies = function() {
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
var player = new Player(404, 406, 83);
var exit1 = new Exit(211, 55);
var exit2 = new Exit(515, 55);
lives = new Life();
var keyX = [0, 101, 202, 303, 404, 505, 606, 707];
var keyY = [83, 166, 249, 330];
var key = new Key((keyX[Math.floor(Math.random() * keyX.length)]), (keyY[Math.floor(Math.random() * keyY.length)]));
var pointsDisplay = new Points(600, 45);
var points = 0;
var jewelX = [0, 101, 202, 303, 404, 505, 606, 707];
var jewelY = [95, 178, 261, 342];
var jewelList = [];
jewelList.push(new Jewel((jewelX[Math.floor(Math.random() * jewelX.length)]), (jewelY[Math.floor(Math.random() * jewelY.length)]), 'images/Gem-Blue.png', 15));
jewelList.push(new Jewel((jewelX[Math.floor(Math.random() * jewelX.length)]), (jewelY[Math.floor(Math.random() * jewelY.length)]), 'images/Gem-Green.png', 30));
jewelList.push(new Jewel((jewelX[Math.floor(Math.random() * jewelX.length)]), (jewelY[Math.floor(Math.random() * jewelY.length)]), 'images/Gem-Orange.png', 45));
/*
* mixes up jewels in the array, so a random one gets picked each time
 */
function shuffleJewels(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array[0];
}
var jewel = shuffleJewels(jewelList);


/*
* resets the positions of the player, enemies, key and jewels
 */
var resetPositions = function() {
    player.x = 404;
    player.y = 406;
    player.speed = 83;
    allEnemies = [];
    createEnemies();
    key = new Key((keyX[Math.floor(Math.random() * keyX.length)]), (keyY[Math.floor(Math.random() * keyY.length)]));
    jewel = shuffleJewels(jewelList);
    if (jewel.y > 342) {
        jewel.y -= 400;
    }
};

/*
* checks for collisions and resets the positions of
* player/enemies/key/jewel if a collision occurs
 */
var checkCollisions = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if (player.x <= (allEnemies[i].x + 90) && allEnemies[i].x <= (player.x + 90) && player.y <= (allEnemies[i].y + 63) && allEnemies[i].y <= (player.y + 63)) {
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
var dontWalkOnWater = function() {
    if ((player.y < 60 && player.x < 202) || (player.y < 60 && player.x > 250 && player.x < 505) || (player.y < 60 && player.x > 556)) {
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
var hasKey = false;
var collectKey = function() {
    if (player.x <= (key.x + 90) && key.x <= (player.x + 90) && player.y <= (key.y + 63) && key.y <= (player.y + 63)) {
        hasKey = true;
        key.speed = 400;
        key.move();
        points += 10;
        pointsDisplay.updated();
    }
};
/*
* player collects jewel and gets points
 */
var hasJewel = false;
var collectJewel = function() {
    if (player.x <= (jewel.x + 90) && jewel.x <= (player.x + 90) && player.y <= (jewel.y + 50) && jewel.y <= (player.y + 50)) {
        hasJewel = true;
        jewel.move();
        points += jewel.points;
        pointsDisplay.updated();
    }
};
/*
* player has collected the key and proceeds through the exit
 */
var completeTask = function() {
    if (hasKey) {
        if ((player.y < 60 && player.x >= 202 && player.x < 300) || (player.y < 60 && player.x >= 505 && player.x < 556)) {
            resetPositions();
            hasKey = false;
            hasJewel = false;
            key.speed = 0;
            points += 100;
            pointsDisplay.updated();
        }
    }
};
/*
* player lost all of his/her lives
 */
var gameOver = function() {
    document.getElementById('light-end').style.display = 'block';
    document.getElementById('fade-end').style.display = 'block';
};
/*
* prepares a new game
 */
var newGame = function() {
    document.getElementById('light-end').style.display = 'none';
    document.getElementById('fade-end').style.display = 'none';
    resetPositions();
    lives.number = 3;
    points = 0;
    pointsDisplay.updated();
    hasJewel = false;
};

$('.button').click(function() {
    newGame();
});