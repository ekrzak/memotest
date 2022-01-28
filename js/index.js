document.querySelector('#button-start').onclick = startGame;

const colors = ['red', 'blue', 'yellow', 'green', 'purple', 'white'];

function startGame() {
    let tries = 0;
    const randomBoard = shuffle(colors).concat(shuffle(colors));
    startChronometer();
    turnUser(randomBoard);
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

function turnUser(board) {
    document.querySelectorAll('.cell').forEach(function(element) {
        element.onclick = function(event) {
            event.target.classList.toggle(board[Number(event.target.innerText)-1]); // Discovers the colors assigned for randomBoard when the user clicks on them
            console.log(board[Number(event.target.innerText)-1]);
        };
    });
}
