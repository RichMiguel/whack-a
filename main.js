const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start-button');
const restartButton = document.querySelector('#restart-button');
const livesStat = document.querySelector('.live');

const startMenu = document.querySelector('.start-menu');
const restartMenu = document.querySelector('.restart-menu');
const gameMenu = document.querySelector('.game-menu');

const hitSound = new Audio('snd/Bonk Sound Effect 2.mp3');

let lastHole;
let timeUp = false;
let score = 0;
let lives = 3;
let min = 800;
let max = 1800;

document.addEventListener('mousemove', function(event) {
    const cursorMarker = document.getElementById('cursor-marker');
    cursorMarker.style.left = event.pageX + 'px';
    cursorMarker.style.top = event.pageY + 'px';
});


function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        console.log('Ah nah thats the same one bud');
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(min, max);
    const hole = randomHole(holes);
    hole.classList.add('up');
    setTimeout(() => {
        if (hole.classList.contains('up')) {
            hole.classList.remove('up');
            // lives--;
            // livesStat.textContent = lives;
            // if (lives <= 0) {
            //     timeUp = true;
            //     document.querySelector('.final-score').textContent = score;
            //     showRestartMenu();
            //     return;
            // }
        }
        if (!timeUp) peep();
    }, time);
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);

function startGame() {
    startMenu.classList.remove('d-flex');
    startMenu.classList.add('d-none');
    gameMenu.classList.remove('d-none');
    timeUp = false;
    score = 0;
    lives = 3;
    scoreBoard.textContent = score;
    livesStat.textContent = lives
    setTimeout(peep, 500);
}

function restartGame() {
    restartMenu.classList.remove('d-flex');
    restartMenu.classList.add('d-none');
    gameMenu.classList.remove('d-none');
    timeUp = false;
    score = 0;
    lives = 3;
    scoreBoard.textContent = score;
    livesStat.textContent = lives
    setTimeout(peep, 500);
}

function showRestartMenu() {
    gameMenu.classList.add('d-none');
    restartMenu.classList.remove('d-none');
    restartMenu.classList.add('d-flex');   
}

function bonk(e) {
    if (!e.isTrusted) return; // cheater!
    showHitEffect(this.parentNode);
    score += 200;
    this.parentNode.classList.remove('up');
    scoreBoard.textContent = score;
    hitSound.currentTime = 0.5; // Reset waktu suara ke awal
    hitSound.play();
}

function showHitEffect(hole) {
    const hitEffect = hole.querySelector('.hit-effect');
    hitEffect.classList.add('show');

    // Hilangkan efek setelah beberapa saat
    setTimeout(() => {
        hitEffect.classList.remove('show');
    }, 400); // Sesuaikan dengan durasi transisi CSS
}

moles.forEach(mole => mole.addEventListener('click', bonk));