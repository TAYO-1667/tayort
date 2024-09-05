let score = 0;
let highScore = localStorage.getItem('highScore') || 0;
let ballInterval;
let ballMovementInterval;
let gameStarted = false;
let ballCount = 0;

const scoreDisplay = document.getElementById('score');
const highScoreDisplay = document.getElementById('high-score');
const gameScreen = document.getElementById('game-screen');
const startButton = document.getElementById('start-game');
const restartButton = document.getElementById('restart-button');
const gameEndPopup = document.getElementById('game-end-popup');
const finalScoreDisplay = document.getElementById('final-score');
const difficultySelect = document.getElementById('difficulty');

function startGame() {
    if (gameStarted) return;

    gameStarted = true;
    ballCount = 0;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    highScoreDisplay.textContent = `High Score: ${highScore}`;
    gameEndPopup.classList.remove('visible'); // Hide the popup when the game starts

    const difficulty = difficultySelect.value;

    let createInterval = 1500;
    let moveInterval = 3000;
    let ballSize = 60; // default ball size

    // Adjust difficulty settings
    if (difficulty === 'easy') {
        createInterval = 1200;
        moveInterval = 2500;
        ballSize = 50;
    } else if (difficulty === 'medium') {
        createInterval = 1000;
        moveInterval = 2000;
    } else if (difficulty === 'hard') {
        createInterval = 800;
        moveInterval = 1800;
    } else if (difficulty === 'intense') {
        createInterval = 600;
        moveInterval = 1500;
    }

    // Ball creation interval
    ballInterval = setInterval(() => {
        if (ballCount < 12) {
            createBall(ballSize);
        } else {
            endGame(); // End the game if there are 12 balls on screen
        }
    }, createInterval);

    // Ball movement interval
    ballMovementInterval = setInterval(() => {
        moveBalls();
    }, moveInterval);

    gameScreen.addEventListener('click', handleScreenClick);
}

function endGame() {
    clearInterval(ballInterval);
    clearInterval(ballMovementInterval);
    gameStarted = false;
    gameScreen.removeEventListener('click', handleScreenClick);
    document.querySelectorAll('.target').forEach(ball => ball.remove());
    updateHighScore();
    finalScoreDisplay.textContent = `Final Score: ${score}`;
    gameEndPopup.classList.add('visible'); // Show the popup when the game ends
}

function createBall(ballSize) {
    if (document.querySelectorAll('.target').length >= 12) {
        endGame(); // End the game if there are 12 balls on screen
        return;
    }

    const ball = document.createElement('div');
    ball.className = 'target';
    ball.style.width = `${ballSize}px`;
    ball.style.height = `${ballSize}px`;
    ball.style.backgroundColor = '#9c27b0';
    ball.style.position = 'absolute';
    ball.style.left = `${Math.random() * (gameScreen.clientWidth - ballSize)}px`;
    ball.style.top = `${Math.random() * (gameScreen.clientHeight - ballSize)}px`;
    ball.style.borderRadius = '50%';
    ball.style.cursor = 'pointer';

    ball.addEventListener('click', () => {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        ball.remove();
        ballCount--;
    });

    gameScreen.appendChild(ball);
    ballCount++;
}

function moveBalls() {
    document.querySelectorAll('.target').forEach(ball => {
        const left = parseFloat(ball.style.left);
        const top = parseFloat(ball.style.top);

        ball.style.left = `${left + (Math.random() - 0.5) * 10}px`;
        ball.style.top = `${top + (Math.random() - 0.5) * 10}px`;

        if (parseFloat(ball.style.left) < 0 || parseFloat(ball.style.top) < 0 ||
            parseFloat(ball.style.left) > gameScreen.clientWidth - parseFloat(ball.style.width) ||
            parseFloat(ball.style.top) > gameScreen.clientHeight - parseFloat(ball.style.height)) {
            ball.remove();
            ballCount--;
        }
    });
}

function handleScreenClick(event) {
    if (event.target.classList.contains('target')) {
        score += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        event.target.remove();
        ballCount--;
    } else {
        endGame(); // End the game if the screen is clicked instead of a ball
    }
}

function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highScoreDisplay.textContent = `High Score: ${highScore}`;
    }
}

// Start button event listener
startButton.addEventListener('click', startGame);

// Restart button event listener
restartButton.addEventListener('click', () => {
    endGame();
    startGame();
});
