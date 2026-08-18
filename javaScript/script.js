const player=document.getElementById("gameBox");
const obstacle=document.getElementById("obstacleBox");

const startBtn=document.getElementById("startBtn");
const resetBtn=document.getElementById("resetBtn");

const scoreEl=document.getElementById("score");
const statusEl=document.getElementById("status");

const GAME_WIDTH=800;
const GAME_HEIGHT=500;
const SIZE=80;

let playerY=200;

let obstacleX=720;
let obstacleY=200;

let score=0;

let running=false;

let obstacleTimer=null;

const PLAYER_SPEED=25;
const OBSTACLE_SPEED=8;

const OBSTACLE_SPEED2=30;
const OBSTACLE_SPEED3=50;
const OBSTACLE_SPEED4=100;

function speedup(){
    if(score>10){
        obstacleX-=OBSTACLE_SPEED2;
    }
    else{
        obstacleX-=OBSTACLE_SPEED;
    }
    if(score>20){
        obstacleX-=OBSTACLE_SPEED3;

    }
    if(score>25){
        obstacleX-=OBSTACLE_SPEED4;
    }
}

function updatePlayer(){

    player.style.top=playerY+"px";

}

function updateObstacle(){

    obstacle.style.left=obstacleX+"px";
    obstacle.style.top=obstacleY+"px";

}

function moveUp(){

    if(!running) return;

    playerY-=PLAYER_SPEED;

    if(playerY<0)
        playerY=0;

    updatePlayer();

}

function moveDown(){

    if(!running) return;

    playerY+=PLAYER_SPEED;

    if(playerY>GAME_HEIGHT-SIZE)
        playerY=GAME_HEIGHT-SIZE;

    updatePlayer();

}

function moveObstacle(){

    obstacleX-=OBSTACLE_SPEED;

    if(obstacleX<-SIZE){
        obstacleX=GAME_WIDTH;

        obstacleY=Math.floor(Math.random()*(GAME_HEIGHT-SIZE));

        score++;

        scoreEl.innerHTML=score;

    }

    updateObstacle();
    checkCollision();

}

function checkCollision(){

    let playerRect=player.getBoundingClientRect();
    let obstacleRect=obstacle.getBoundingClientRect();

    if(

        playerRect.left<obstacleRect.right &&
        playerRect.right>obstacleRect.left &&
        playerRect.top<obstacleRect.bottom &&
        playerRect.bottom>obstacleRect.top

    ){

        endGame();

    }

}

function startGame(){

    if(running) return;

    running=true;

    statusEl.innerHTML="Avoid the Obstacle!";
    statusEl.style.background="yellow";
    statusEl.style.color="black";

    obstacleTimer=setInterval(moveObstacle,30);

}

function endGame(){

    running=false;
    clearInterval(obstacleTimer);
    statusEl.innerHTML="Game Over!";
    statusEl.style.background="red";
    statusEl.style.color="white";

}

function resetGame(){

    clearInterval(obstacleTimer);
    running=false;
    score=0;
    playerY=200;
    obstacleX=720;
    obstacleY=200;
    scoreEl.innerHTML=score;

    updatePlayer();

    updateObstacle();

    statusEl.innerHTML="Press Start to Play";
    statusEl.style.background="green";
    statusEl.style.color="white";

}

startBtn.onclick=startGame;

resetBtn.onclick=resetGame;

document.addEventListener("keydown",function(e){

    if(e.key==="ArrowUp"){

        e.preventDefault();

        moveUp();

    }

    if(e.key==="ArrowDown"){

        e.preventDefault();

        moveDown();

    }

});

resetGame();
    