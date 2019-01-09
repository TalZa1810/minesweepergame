import React from 'react';
import style from './Board.scss';
import Cell from "../Cell/Cell";
import PropTypes from 'prop-types';
import { mineSign, gameStatus } from '../../Constants';

class Board extends React.Component {

    constructor(props){
        super(props);
        this.revealedCounter = 0;
        this.minesIndArr= [];
        this.flagsCounter = 0;
        this.state = { board: [] };
        this.onCellClick = this.onCellClick.bind(this);
    }

    componentDidUpdate(){
        const rowNum= this.props.height;
        const colNum = this.props.width;
        const boardSize= rowNum * colNum;
        const minesNum = this.props.minesNum;
        const isWinner = boardSize - minesNum === this.revealedCounter;
        if(isWinner){
            this.props.changeGameStatus(gameStatus.win);
        }
    }

    componentDidMount() {
        this.createBoard();
    }

    getRandomMineIndex(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    createBoard(){
        const height = this.props.height;
        const width = this.props.width;
        const minesNum = this.props.minesNum;
        const board= [];

        for(let rowInd= 0; rowInd < height; rowInd++){
            const row = [];
            for ( let colInd= 0; colInd < width; colInd++){
                row.push({isRevealed:false ,value: 0, isFlag: false});
            }
            board.push(row);
        }

        this.placeMines(minesNum, board);
        this.placeNumbers(board);
        this.setState({board});
    }

    placeMines(minesNum, board){
        const height = board.length;
        const width = board[0].length;

        for(let i = 0; i < minesNum; i++){
            const rowInd = this.getRandomMineIndex(height);
            const colInd = this.getRandomMineIndex(width);
            if (!this.minesIndArr.includes({rowInd, colInd})){
                this.minesIndArr.push({rowInd, colInd});
                board[rowInd][colInd].value = mineSign;
            }
            else{
                i--;
            }
        }
    }

    placeNumbers(board){
        this.minesIndArr.forEach(mine =>{
            this.placeVerticalNumbers(mine.rowInd, mine.colInd, board);
            this.placeHorizontalNumbers(mine.rowInd, mine.colInd, board);
            this.placeRightSlantNumbers(mine.rowInd, mine.colInd, board);
            this.placeLeftSlantNumbers(mine.rowInd, mine.colInd, board);
        });
    }

    placeVerticalNumbers(row, col, board){
        const firstRow = row === 0;
        const lastRow = row === board.length - 1;

        if(!firstRow && board[row - 1][col].value !== mineSign ){
            board[row - 1][col].value++;
        }

        if(!lastRow && board[row + 1][col].value !== mineSign ){
            board[row + 1][col].value++;
        }
    }

    placeHorizontalNumbers(row, col, board){
        const firstCol = col === 0;
        const lastCol = col === board[0].length - 1;

        if(!firstCol && board[row][col - 1].value !== mineSign){
            board[row][col - 1].value++;
        }
        if(!lastCol &&  board[row][col + 1].value !== mineSign){
            board[row][col + 1].value++;
        }
    }

    placeRightSlantNumbers(row, col, board){
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

    placeLeftSlantNumbers(row, col, board){
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

    onCellClick(e, rowInd, colInd){
        const board = this.state.board;
        if(e.type === 'contextmenu'){
           e.preventDefault();
           const cell = board[rowInd][colInd];
           cell.isFlag = true;
        }
        else{
            this.revealCell(rowInd, colInd, board);
        }

        this.setState({board});
    }

    revealNextCell(rowInd, colInd, board) {

        if(rowInd === -1 || colInd === -1 || rowInd === board.length || colInd === board[0].length){
            return;
        }

        const cell = board[rowInd][colInd];

        if (cell.isRevealed){
            return;
        }

        if (cell.value) {
            cell.isRevealed = true;
            this.revealedCounter++;
            return;
        }

        //a cell with zero mines surrounding
        this.revealCell(rowInd, colInd, board);
    }

    revealCell(rowInd, colInd, board){
        const cell = board[rowInd][colInd];

        if (cell.isRevealed) {
            return;
        }

        cell.isRevealed = true;
        this.revealedCounter++;

        if (cell.value === mineSign) {
            this.props.changeGameStatus(gameStatus.lose);
            return;
        }

        if(!cell.value){
            this.revealNextCell(rowInd - 1, colInd - 1, board);
            this.revealNextCell(rowInd - 1, colInd, board);
            this.revealNextCell(rowInd - 1, colInd + 1, board);
            this.revealNextCell(rowInd + 1, colInd, board);
            this.revealNextCell(rowInd, colInd - 1, board);
            this.revealNextCell(rowInd, colInd + 1, board);
            this.revealNextCell(rowInd + 1, colInd - 1, board);
            this.revealNextCell(rowInd + 1, colInd + 1, board);
        }
    }

    // addFlag(e,rowInd, colInd ) {
    //     if (e.type === 'contextmenu') {
    //         e.preventDefault();
    //         const board = this.state.board;
    //         const cell = board[rowInd][colInd];
    //         cell.isFlag = true;
    //         // e.target.innerText = flagSign;
    //         // e.target.className = "cellRevealed";
    //         // this.flagsCounter++;
    //     }
    // }

    render(){
        const board = this.state.board;
        return (<div style={style.board}>
            {
                board.map((row, rowInd) =>{
                    return <div style={style.row} key={rowInd}>
                        {row.map((cell, colInd) =>{
                            return <Cell
                                key={colInd}
                                cell={cell}
                                row={rowInd}
                                col={colInd}
                                onCellClick={this.onCellClick}
                            />
                        })}
                    </div>
                })
            }
        </div>)
    }
}

Board.propTypes = {
    board: PropTypes.array
};

export default Board;