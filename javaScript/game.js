const player = document.querySelector(".player");
const arrow = document.querySelector(".arrow");
const gameContainer = document.querySelector(".game-container");
const scoreElement = document.querySelector("#score");

let arrowX = 850;
let arrowY = 100;
let govidanY = 0;
let score = 0;
let arrowPassedPlayer = false;
let collisionDetected = false;

setInterval(movearrow, 19);

function movearrow()
{
    if (collisionDetected) {
        return;
    }

    arrowX -= 10;
    arrow.style.left = arrowX + "px";

    const a = arrow.getBoundingClientRect();
    const p = player.getBoundingClientRect();

    if (p.left < a.right &&
        p.right > a.left &&
        a.top < p.bottom &&
        a.bottom > p.top)
    {
        collisionDetected = true;
        score++;
        scoreElement.textContent = score;
        console.log("Collision");
        return;
    }

    const playerLeft = player.offsetLeft;
    const arrowLeft = arrowX;
    const arrowRight = arrowLeft + arrow.offsetWidth;

    if (!arrowPassedPlayer && arrowRight <= playerLeft)
    {
        score++;
        scoreElement.textContent = score;
        arrowPassedPlayer = true;
    }

    if (arrowX < 0)
    {
        arrowX = 850;
        arrowY = Math.random() * 200;
        arrowPassedPlayer = false;
    }

    arrow.style.left = arrowX + "px";
    arrow.style.top = arrowY + "px";
}

document.addEventListener("keydown", (event) => {
    console.log(event.key);

    if (event.key === "ArrowDown") {
        govidanY += 10;
    }

    if (event.key === "ArrowUp") {
        govidanY -= 10;
    }

    const maxTop = gameContainer.clientHeight - player.offsetHeight;
    govidanY = Math.max(0, Math.min(govidanY, maxTop));
    player.style.top = govidanY + "px";
});