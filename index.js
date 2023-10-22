var blocksize = 20;
var cols = 40;
var rows = 40;
var board;
var context;

var i;
var foodX;
var foodY;
var foodX2;
var foodY2;

var highscore = 0;

var snakeBody = [];

var snakeX = 20 * blocksize;
var snakeY = 20 * blocksize;

var velocityX = 0;
var velocityY = 0;

var points = 0;

var CurrentDirection;





window.onload = function(){

    board = document.getElementById("board");
    board.width = cols*blocksize;
    board.height = rows*blocksize;
    context = board.getContext("2d");
    SpawnFood();

    document.addEventListener("keyup", keystrokes);
    setInterval(update, 1000/10);
}



function update(){

    if (CurrentDirection == "UP"){
        velocityY = -1;
        velocityX = 0;
    }
    else if (CurrentDirection == "DOWN"){
        velocityY = 1;
        velocityX = 0;
    }
    else if (CurrentDirection == "RIGHT"){
        velocityY = 0;
        velocityX = 1;
    }
    else if (CurrentDirection == "LEFT"){
        velocityY = 0;
        velocityX = -1;
    }

    //board
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    //food
    context.fillStyle = "green";
    context.fillRect(foodX, foodY, blocksize/2, blocksize/2);

    //food
    context.fillStyle = "green";
    context.fillRect(foodX2, foodY2, blocksize/2, blocksize/2);

    if (foodX == snakeX && foodY == snakeY){
        snakeBody.push([foodX, foodY]);
        document.getElementById("gameover").innerHTML = "";
        points++;
        document.getElementById("points").innerHTML = points;
        document.getElementById("highscore").innerHTML = `Highscore: ${highscore}`;
        SpawnFood();
    }

    for (i = snakeBody.length-1; i > 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }


    if (snakeBody.length){
        snakeBody[0] = [snakeX, snakeY];
    }

    //snake
    context.fillStyle = "red";
    snakeX += velocityX * blocksize;
    snakeY += velocityY * blocksize;
    context.fillRect(snakeX, snakeY, blocksize/2, blocksize/2);

    for (i = 0; i < snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blocksize/2,blocksize/2);
    }

    for (i = 0; i < snakeBody.length; i++){
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]){
            snakeBody = [];
            if (points > highscore){
                highscore = points;
                document.getElementById("highscore").innerHTML = "New highscore!", highscore;
            }
            points = 0;
            document.getElementById("gameover").innerHTML = "Game Over! Ur score has been reset.";
            snakeX = 20 * blocksize;
            snakeY = 20 * blocksize;
        }
    }

    if (snakeX < 0 || snakeX > cols*blocksize - 1 || snakeY < 0 || snakeY > rows*blocksize - 1){
        snakeBody = [];
        if (points > highscore){
            highscore = points;
            document.getElementById("highscore").innerHTML = "New highscore!", highscore;
        }
        points = 0;
        document.getElementById("gameover").innerHTML = "Game Over! Ur score has been reset.";
        snakeX = 20 * blocksize;
        snakeY = 20 * blocksize;
    }

}

function keystrokes(e){

    if (e.code == "ArrowUp" && velocityY != 1){
    CurrentDirection = "UP";
    }
    else if (e.code == "ArrowDown" && velocityY != -1){
    CurrentDirection = "DOWN";
    }
    else if (e.code == "ArrowRight" && velocityX != -1){
    CurrentDirection = "RIGHT";
    }
    else if (e.code == "ArrowLeft" && velocityX != 1){
    CurrentDirection = "LEFT";
    }
}


function SpawnFood(){
    foodX = Math.floor(Math.random() * cols) * blocksize;
    foodY = Math.floor(Math.random() * rows) * blocksize;
}