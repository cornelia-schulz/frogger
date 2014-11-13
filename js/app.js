// Enemies the player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.move = function(dt) {
        var randomPosition = [-10, -9, -8, -7, -6, -5, -4, -3, -2, -1, 0];
        this.x += this.speed*dt;
        if(this.x > 808) {
            this.x = randomPosition[Math.floor(Math.random()*randomPosition.length)];
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.move(dt);
    };
    // Multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function(x, y, speed) {
    Enemy.call(this, x,y,speed);
    this.sprite = 'images/char-horn-girl.png';
    this.up = function () {
        if (this.y >= this.speed-10) {
            this.y = this.y - this.speed;
        }
    };
    this.down = function () {
        if (this.y < (ctx.canvas.height - 200)) {
            this.y = this.y + this.speed;
        }
    };
    this.right = function () {
        if (this.x < ctx.canvas.width - (this.speed+18)) {
            this.x = this.x + (this.speed+18);
        }
    };
    this.left = function () {
        if (this.x >= this.speed) {
            this.x = this.x - (this.speed+18);
        }
    };
};
Player.prototype.update = function(dt) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function() {
    var keyPressed = String.fromCharCode(event.keyCode);
    if(event.keyCode === 38) {
        this.up();
    }
    if(event.keyCode === 40) {
        this.down();
    }
    if(event.keyCode === 39) {
        this.right();
    }
    if(event.keyCode === 37) {
        this.left();
    }
};

var Exit = function(x, y) {
    this.x = x;
    this.y=y;
    this.sprite = 'images/keyhole.png';
    this.width = 80;
    this.height = 75;
};

Exit.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
};

var Points = function(x,y) {
    this.x=x;
    this.y=y;
};

Points.prototype.render = function() {
    ctx.font = "30px Arial";
    ctx.fillText("Points: " + points, this.x, this.y);
};

Points.prototype.updated = function() {
    ctx.clearRect(500,0,808,70);
    this.render();
};

var Key = function(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 400;
    this.height = 155;
    this.width = 101;
    this.sprite = 'images/Key.png'
    this.move = function() {
        this.y += this.speed;
    }
};

Key.prototype.render = function() {
    if(hasKey===false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
};

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
    }
};

Jewel.prototype.render = function() {
    if(hasJewel===false) {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y, this.width, this.height);
    }
};

var Life = function() {
    this.sprite = 'images/Heart.png';
    this.height = 60;
    this.width = 40;
    this.number = 3;
};

//draws the hearts for each life.
Life.prototype.render = function() {
    var heartPosition = 0;
    for(var i = 0; i < this.number; i++) {
        ctx.drawImage(Resources.get(this.sprite), heartPosition, 0, this.width, this.height);
        heartPosition +=40;
    }
    if(this.number == 0) {
        //gameOver();
        console.log('Game over')
    }
};

Life.prototype.loseLife = function () {
    if(this.number > 0) this.number--;
    ctx.clearRect(0,0,150,50);
    this.render();
};



// Instantiating objects.
var allEnemies = [];
var createEnemies = function() {
    var enemyHeights = [60, 145, 230, 315];
    for(var i=0; i<7; i++) {
        var enemyHeight = enemyHeights[Math.floor(Math.random()*enemyHeights.length)];
        var enemySpeed = (Math.floor(Math.random()*100)+1);
        var enemyPosition = Math.floor(Math.random()*3);
        allEnemies.push(new Enemy(enemyPosition, enemyHeight, enemySpeed));
    }
    return allEnemies;
};
createEnemies();

var player = new Player(404, 406, 83);
var exits = [];
var exit1 = new Exit(211,55);
var exit2 = new Exit(515, 55);
lives = new Life();
var keyX = [0, 101, 202, 303, 404, 505, 606, 707];
var keyY = [83, 166, 249, 330];
var key = new Key((keyX[Math.floor(Math.random()*keyX.length)]), (keyY[Math.floor(Math.random()*keyY.length)]));
var pointsDisplay = new Points(600, 45);
var points = 0;
var jewelX = [0, 101, 202, 303, 404, 505, 606, 707];
var jewelY = [95, 178, 261, 342];
var jewelList = [];
jewelList.push(new Jewel((jewelX[Math.floor(Math.random()*jewelX.length)]), (jewelY[Math.floor(Math.random()*jewelY.length)]), 'images/Gem-Blue.png', 15));
jewelList.push(new Jewel((jewelX[Math.floor(Math.random()*jewelX.length)]), (jewelY[Math.floor(Math.random()*jewelY.length)]), 'images/Gem-Green.png', 30));
jewelList.push(new Jewel((jewelX[Math.floor(Math.random()*jewelX.length)]), (jewelY[Math.floor(Math.random()*jewelY.length)]), 'images/Gem-Orange.png', 45));
var jewel = shuffleJewels(jewelList);



//mixes up jewels in the array, so a random one gets picked each time
function shuffleJewels(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }
        return array[0];
    }

//resets all positions
var resetPositions = function() {
    player.x = 404;
    player.y = 406;
    player.speed = 83;
    allEnemies = [];
    createEnemies();
    key = new Key((keyX[Math.floor(Math.random()*keyX.length)]), (keyY[Math.floor(Math.random()*keyY.length)]));
    jewel = shuffleJewels(jewelList);
    if(jewel.y > 342) {
        jewel.y -= 400;
    }
};

//Checking for collisions and resetting positions of player
// and enemies if collision occurs.
var checkCollisions = function() {
    for(var i= 0; i<allEnemies.length; i++) {
        if(player.x <= (allEnemies[i].x+90) && allEnemies[i].x <= (player.x+90) && player.y <= (allEnemies[i].y+63) && allEnemies[i].y <= (player.y+63)) {
            if(lives.number > 0) {
                lives.loseLife();
                resetPositions();
            }
            else {
                console.log('You did not survive');
                gameOver();
            }
        }
    }
};

//Checking that player isn't going swimming
var dontWalkOnWater = function() {
    if((player.y < 60 && player.x < 202) || (player.y < 60 && player.x > 250 && player.x < 505) || (player.y < 60 && player.x > 556)) {
        if(lives.number > 0) {
            lives.loseLife();
            resetPositions();
        }
        else {
            console.log('You did not survive');
            gameOver();
        }
    }
};

//Player collects key and gets points
var hasKey = false;
var collectKey = function() {
    if(player.x <= (key.x+90) && key.x <= (player.x+90) && player.y <= (key.y+63) && key.y <= (player.y+63)) {
        hasKey = true;
        key.speed = 400;
        key.move();
        points += 10;
        pointsDisplay.updated();
    }
};

//Player collects jewels and gets points
var hasJewel = false;
var collectJewel = function() {
    if (player.x <= (jewel.x + 90) && jewel.x <= (player.x + 90) && player.y <= (jewel.y + 63) && jewel.y <= (player.y + 63)) {
        hasJewel = true;
        jewel.move();
        points += jewel.points;
        pointsDisplay.updated();
    }
};


//Player has key and goes through door at the top of the canvas
var completeTask = function(){
    if(hasKey) {
        if((player.y < 60 && player.x >= 202 && player.x < 300) || (player.y < 60 && player.x >= 505 && player.x < 556)) {
            resetPositions();
            hasKey = false;
            hasJewel = false;
            key.speed = 0;
            points += 100;
            pointsDisplay.updated();
        }
    }
};

//Game is over
var gameOver = function() {
    document.getElementById('light-end').style.display='block';
    document.getElementById('fade-end').style.display='block';
};

//Sets up a new game
var newGame = function() {
    document.getElementById('light-end').style.display='none';
    document.getElementById('fade-end').style.display='none';
    resetPositions();
    lives.number = 3;
    points = 0;
    pointsDisplay.updated();
    hasJewel=false;
};

$(".button").click(function() {
    newGame();
});

// This listens for key presses and sends the keys to the
// Player.handleInput() method.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

