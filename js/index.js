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
    const currentTime = Date.now();
    
    //document.querySelector('#time').innerText = `${}`;
}

function turnUser(board) {
    document.querySelectorAll('.cell').forEach(function(element) {
        element.onclick = function(event) {
            event.target.classList.toggle(board[Number(event.target.innerText)-1]); // Discovers the colors assigned for randomBoard when the user clicks on them
            console.log(board[Number(event.target.innerText)-1]);
        };
    });
}
