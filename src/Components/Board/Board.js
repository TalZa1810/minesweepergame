import React from 'react';
import style from './Board.scss';
import Cell from "../Cell/Cell";
import PropTypes from 'prop-types';
import { mineSign } from '../../Constants';

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state =  this.createBoard();
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
            let row = [];
            for ( let colInd= 0; colInd < width; colInd++){
                row.push({isRevealed:false ,value: 0});
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
        const cell = board[rowInd][colInd];
        cell.isRevealed = true;
        this.setState({board});
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