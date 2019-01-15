import {gameStatus, mineSign} from "./Constants";

let minesIndArr = [];

export function createBoard(height, width, minesNum ){
    const board= [];

    for(let rowInd= 0; rowInd < height; rowInd++){
        const row = [];
        for ( let colInd= 0; colInd < width; colInd++){
            row.push({isRevealed:false ,value: 0, isFlag: false});
        }
        board.push(row);
    }

    placeMines(minesNum, board);
    placeNumbers(board);
    return board;

}

function placeMines(minesNum, board){
    minesIndArr = [];
    const height = board.length;
    const width = board[0].length;

    for(let i = 0; i < minesNum; i++) {
        const rowInd = getRandomMineIndex(height);
        const colInd = getRandomMineIndex(width);

        if (!minesIndArr.some(mine => mine.rowInd === rowInd && mine.colInd === colInd)){
            minesIndArr.push({rowInd, colInd});
            board[rowInd][colInd].value = mineSign;
        }
        else{
            i--;
        }
    }
}

function placeNumbers(board){
    minesIndArr.forEach(mine => {
        placeVerticalNumbers(mine.rowInd, mine.colInd, board);
        placeHorizontalNumbers(mine.rowInd, mine.colInd, board);
        placeRightSlantNumbers(mine.rowInd, mine.colInd, board);
        placeLeftSlantNumbers(mine.rowInd, mine.colInd, board);
    });
}

function placeVerticalNumbers(row, col, board){
    debugger;
    const firstRow = row === 0;
    const lastRow = row === board.length - 1;

    if(!firstRow && board[row - 1][col].value !== mineSign ){
        board[row - 1][col].value++;
    }

    if(!lastRow && board[row + 1][col].value !== mineSign ){
        board[row + 1][col].value++;
    }
}

function placeHorizontalNumbers(row, col, board){
    const firstCol = col === 0;
    const lastCol = col === board[0].length - 1;

    if(!firstCol && board[row][col - 1].value !== mineSign){
        board[row][col - 1].value++;
    }
    if(!lastCol &&  board[row][col + 1].value !== mineSign){
        board[row][col + 1].value++;
    }
}

function placeRightSlantNumbers(row, col, board){
    const firstCol = col === 0;
    const firstRow = row === 0;
    const lastCol = col === board[0].length - 1;
    const lastRow = row === board.length - 1;

    if(!firstRow && !firstCol &&  board[row - 1][col - 1].value !==  mineSign){
        board[row - 1][col - 1].value++;
    }
    if(!lastRow && !lastCol && board[row + 1][col + 1].value !== mineSign){
        board[row + 1][col + 1].value++;
    }
}

function placeLeftSlantNumbers(row, col, board){
    const firstCol = col === 0;
    const firstRow = row === 0;
    const lastCol = col === board[0].length - 1;
    const lastRow = row === board.length - 1;

    if(!firstRow && !lastCol && board[row - 1][col + 1].value !== mineSign ){
        board[row - 1][col + 1].value++;
    }
    if(!lastRow && !firstCol && board[row + 1][col - 1].value !== mineSign ){
        board[row + 1][col - 1].value++;
    }
}

function getRandomMineIndex(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


export function displayMessage (status){
    let message;

    switch (status) {
        case gameStatus.lose:
            message = "You Lost";
            break;
        case gameStatus.win:
            message = "You Win";
            break;
        default:
            message = ""
    }

    return message;
}