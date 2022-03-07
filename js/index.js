const $start = document.querySelector('#button-start');
$start.onclick = startGame;

const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'white'];
const firstHalf = colors.slice(); // returns a copy of the array, not the array ifself
const secondHalf = colors.slice();
const randomBoard = shuffle(firstHalf).concat(shuffle(secondHalf));
const COMBINATIONS = colors.length;

let $firstSelection = null;
let rightGuesses = 0;
let tries = 0;

function startGame() {
    $start.disabled = true;
    startChronometer();
    document.querySelector('#board').onclick = handleClick;
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

function handleEndGame() {
    if (rightGuesses < COMBINATIONS) {
        return;
    }
    if (rightGuesses === COMBINATIONS) {
        setTimeout(function() {
            stopChronometer();
            document.querySelector('#instructions').innerText = 'Congratulations! 🎉🎊 You won the game! Press F5 to start again.';
        }, 500);
    }    
}

function showCell(cell) {
    if (!cell.classList.contains('disabled')) {
        cell.classList.add(randomBoard[Number(cell.innerText)-1]);
    }
}

function hideCell(cell) {
    if (!cell.classList.contains('disabled')) {
        setTimeout(function() {
            cell.classList.remove(randomBoard[Number(cell.innerText)-1]);
        }, 500);
    }
}

function removeCell(cell) {
    setTimeout(function() {
        cell.classList.add('disabled');
    }, 500);
}

function areEquals(firstCell, secondCell) {
    const isTheSameColor = randomBoard[Number(firstCell.innerText)-1] === randomBoard[Number(secondCell.innerText)-1];
    return isTheSameColor;
}

const handleClick = (event) => {
    const $currentSelection = event.target;
    showCell($currentSelection);
    
    if ($firstSelection === null) {
        $firstSelection = $currentSelection;
    } else {
        if ($firstSelection === $currentSelection) {
            return;
        }

    
        if (!$currentSelection.classList.contains('disabled') && !$firstSelection.classList.contains('disabled')) {
            tries++;
            document.querySelector('#tries').innerText = String(tries);

            if (areEquals($firstSelection, $currentSelection)) {
                removeCell($firstSelection);
                removeCell($currentSelection);
                rightGuesses++;
                handleEndGame();
            } else {
                hideCell($firstSelection);
                hideCell($currentSelection);
            }
        }
        
        $firstSelection = null;
    }
}
