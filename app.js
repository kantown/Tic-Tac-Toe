const PLAYERO = 'fa-circle-o';
const PLAYERX = 'fa-times';

const fields = document.querySelectorAll('.game_item');
const announcement = document.querySelector('.info');
const button = document.querySelector('.reset');

let round = 1;
let isGameActive = true;

let board = ['','','','','','','','',''];

const winningSetup = [
    ['0','1','2'],
    ['0','3','6'],
    ['0','4','8'],
    ['6','7','8'],
    ['6','4','2'],
    ['2','5','8'],
    ['3','4','5'],
    ['1','4','7']
]


let currentPlayer = '';

const resetGame = () => {
    board = ['','','','','','','','',''];
    round = 1;
    result = '';
    announcement.innerText = '';
    fields.forEach(field => {
        field.classList.remove(PLAYERO, PLAYERX);
    });
    isGameActive = true;
}

const ev = (event) => {
    console.log(board);
    currentPlayer = round % 2 ? PLAYERO : PLAYERX; 
    let {box} = event.target.dataset;

    if(isGameActive){
        if(board[box] !== "") return;
        event.target.classList.add(currentPlayer);
        board[box] = currentPlayer;
        gameResult();
    }
}

const gameResult = () => {
    if(checkWinner() !== ''){
        announcement.innerText = `The winner is ${checkWinner()}`;
        isGameActive = false;
    } else if (round === 9){
        announcement.innerText = `DRAW!`;
        isGameActive = false;
    }
    console.log(round);
    round++;
}

let result = '';

const checkWinner = () => {
    winningSetup.forEach(setup => {
        let field1 = board[setup[0]];
        let field2 = board[setup[1]];
        let field3 = board[setup[2]];
        console.group("check")
        console.log(field1);
        console.log(field2);
        console.log(field3);
        console.groupEnd();
        if(field1 === PLAYERX && field1 === field2 && field2 === field3){
            result = 'X';
        }
        else if(field1 === PLAYERO && field1 === field2 && field2 === field3) {
            result = 'O';
        }
    })
    return result;
}

button.addEventListener('click', resetGame);
fields.forEach(field => field.addEventListener('click', ev));
