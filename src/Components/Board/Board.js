import React from 'react';
import style from './Board.scss';
import { Cell } from "../Cell/Cell";
import PropTypes from 'prop-types';
import { cellStatus ,mineSign , gameStatus } from '../../Utils/Constants';
import { cloneDeep } from 'lodash';
import {  createBoard } from '../../Utils/BoardUtils'

class Board extends React.Component {

    constructor(props){
        super(props);
        this.revealedCounter = 0;
        this.isGameDone = false;
        this.state = { board: [] , size: 0};
        this.onCellClick = this.onCellClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot){
        this.renderingNewBoardChecking(prevProps);
    }

    renderingNewBoardChecking(prevProps){
        const heightChange= prevProps.height !== this.props.height;
        const widthChange = prevProps.width !== this.props.width;
        const gameRestarted = prevProps.gameStatus === gameStatus.inProgress && this.props.gameStatus === gameStatus.start;
        const playerWon = prevProps.gameStatus === gameStatus.win &&  this.props.gameStatus === gameStatus.start;
        const playerLost = prevProps.gameStatus === gameStatus.lose &&  this.props.gameStatus === gameStatus.start;

        if( heightChange || widthChange || gameRestarted || playerWon || playerLost){
            this.createNewBoard();
        }
    }

    componentDidMount() {
        this.createNewBoard();
    }

    createNewBoard(){
        const {height, width, minesNum} = this.props;
        const board = createBoard(height, width, minesNum);
        this.revealedCounter = 0;
        this.isGameDone = false;
        this.setState({board});
    }

    checkWinning(){
        const rowNum= this.props.height;
        const colNum = this.props.width;
        const boardSize= rowNum * colNum;
        const minesNum = this.props.minesNum;
        const isWinner = boardSize - minesNum === this.revealedCounter;
        if(isWinner){
            this.props.changeGameStatus(gameStatus.win);
            this.isGameDone = true;
        }
    }

    onCellClick(e, rowInd, colInd){
        this.props.changeGameStatus(gameStatus.inProgress);
        const board = cloneDeep(this.state.board);
        e.preventDefault();

        if(e.type === 'contextmenu'){
            this.flagCell(rowInd, colInd, board);
        }
        else{
            this.revealCell(rowInd, colInd, board);
        }

        this.setState({board});
    }

    flagCell(rowInd, colInd, board){
        const cell = board[rowInd][colInd];
        if(cell.status === cellStatus.notRevealed){
            cell.status = cellStatus.flagged;
        }
        else{
            cell.status = cellStatus.notRevealed;
        }
    }

    revealCell(rowInd, colInd, board){
        if(rowInd === -1 || colInd === -1 || rowInd === board.length || colInd === board[0].length){
            return;
        }

        const cell = board[rowInd][colInd];

        if(cell.status !== cellStatus.notRevealed ){
            return;
        }

        cell.status = cellStatus.revealed;
        this.revealedCounter++;

        if (cell.value === mineSign) {
            this.props.changeGameStatus(gameStatus.lose);
            this.isGameDone = true;
            return;
        }

        if(!cell.value){
            this.revealCell(rowInd - 1, colInd - 1, board);
            this.revealCell(rowInd - 1, colInd, board);
            this.revealCell(rowInd - 1, colInd + 1, board);
            this.revealCell(rowInd + 1, colInd, board);
            this.revealCell(rowInd, colInd - 1, board);
            this.revealCell(rowInd, colInd + 1, board);
            this.revealCell(rowInd + 1, colInd - 1, board);
            this.revealCell(rowInd + 1, colInd + 1, board);
        }

        this.checkWinning();
    }

    render(){
        const { board }= this.state;


        return <div>
            {board.map((row, rowInd) =>
                <div className={style.row} key={rowInd}>
                    {row.map((cell, colInd) => <Cell key={colInd} cell={cell} row={rowInd} col={colInd}
                                                     onCellClick={this.onCellClick}
                                                     isGameDone={this.isGameDone}
                    />)}
                </div>)}
               </div>
    }
}

Board.propTypes = {
    board: PropTypes.array
};

export default Board;