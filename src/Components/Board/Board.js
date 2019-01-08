import React from 'react';
import style from './Board.scss';
import Cell from "../Cell/Cell";
import PropTypes from 'prop-types';
import { mineSign , gameStatus } from '../../Constants';

class Board extends React.Component {

    constructor(props){
        super(props);
        const boardInfo = this.createBoard();
        this.state =  boardInfo  ;
        this.onCellClick = this.onCellClick.bind(this);
    }

    getRandomMineIndex(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    createBoard(){
        const height = this.props.height;
        const width = this.props.width;
        const minesNum = this.props.minesNum;
        const minesIndArr = [];
        const board= [];

        for(let rowInd= 0; rowInd < height; rowInd++){
            const row = [];
            for ( let colInd= 0; colInd < width; colInd++){
                row.push({isRevealed:false ,value: 0, isFlag: false});
            }
            board.push(row);
        }

        this.placeMines(minesNum, minesIndArr, board);
        this.placeNumbers(board, minesIndArr);
        return ({board, minesIndArr})
    }

    placeMines(minesNum , minesIndArr, board){
        const height = board.length;
        const width = board[0].length;

        for(let i = 0; i < minesNum; i++){
            const rowInd = this.getRandomMineIndex(height);
            const colInd = this.getRandomMineIndex(width);
            if (!minesIndArr.includes({rowInd, colInd})){
                minesIndArr.push({rowInd, colInd});
                board[rowInd][colInd].value = mineSign;
            }
            else{
                i--;
            }
        }
    }

    placeNumbers(board, minesIndArr){
        minesIndArr.forEach(mine =>{
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

    onCellClick(rowInd, colInd, board){
        this.revealCell(rowInd, colInd, board);
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
                                board={board}
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
    board: PropTypes.array,
    minesIndArr: PropTypes.array
};

export default Board;