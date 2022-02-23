const $start = document.querySelector('#button-start');
$start.onclick = startGame;

const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'white'];
const firstHalf = colors.slice(); // returns a copy of the array, not the array ifself
const secondHalf = colors.slice();
const randomBoard = shuffle(firstHalf).concat(shuffle(secondHalf));
const COMBINATIONS = colors.length;

let clicks = 0;
let selections = [];
let rightGuesses = 0;
let tries = 0;

async function startGame() {
    $start.disabled = true;
    startChronometer();
    document.querySelector('#board').onclick = handleClick;
    await wait(2500);    
    handleGuesses(selections);
    handleRound();    
};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startChronometer() {
    const startTime = Date.now();
    setInterval(function() {
        let actualTime = Date.now();
        let timeMs = actualTime - startTime;
        document.querySelector('#time').innerText = `${(timeMs / 1000).toFixed(2)} secs`; // prints 2 decimals
    }, 10);
}

function stopChronometer() {
    for (let i = 1; i < 99999; i++) {
        window.clearInterval(i);
    }
}

function wait(delay) {
    return new Promise(resolve => {
        setTimeout(resolve, delay);
    });
}

async function handleRound() {
    selections = [];
    clicks = 0;
    await wait(2500);
    handleGuesses(selections);
    if (rightGuesses < COMBINATIONS) {
        handleRound();
    }
    if (rightGuesses === COMBINATIONS) {
        stopChronometer();
        document.querySelector('#instructions').innerText = 'Congratulations! You won the game! Press F5 to start again.';
    }    
}

function handleGuesses(clickedCells) {
    if (clickedCells[0] === clickedCells[1]) {
        document.querySelectorAll('.'+clickedCells[0]).forEach(cell => {
            cell.classList.remove(clickedCells[0]);
            cell.classList.add('black');
        });
        rightGuesses++;       
    } else {
        document.querySelector('.'+clickedCells[0]).classList.remove(clickedCells[0]);
        document.querySelector('.'+clickedCells[1]).classList.remove(clickedCells[1]);
    }
    tries++;
    document.querySelector('#tries').innerText = String(tries);
}

const handleClick = (event) => {
    clicks++;
    if (clicks <= 2) {
        if (!event.target.classList.contains('black')) {
            event.target.classList.toggle(randomBoard[Number(event.target.innerText)-1]); // Discovers the colors assigned for randomBoard when the user clicks on them
            selections.push(randomBoard[Number(event.target.innerText)-1]);
        }
    }
}
