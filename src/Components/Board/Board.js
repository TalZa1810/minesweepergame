import React from 'react';
import style from './Board.scss';
import { Cell } from "../Cell/Cell";
import PropTypes from 'prop-types';
import { mineSign, gameStatus } from '../../Utils/Constants';
import  _ from 'lodash';
import * as BoardUtils from '../../Utils/BoardUtils'

class Board extends React.Component {

    constructor(props){
        super(props);
        this.revealedCounter = 0;
        this.state = { board: [] };
        this.onCellClick = this.onCellClick.bind(this);
    }

    componentDidUpdate(){
        debugger;
        this.checkWinning();
    }

    componentDidMount() {
        const height = this.props.height;
        const width = this.props.width;
        const minesNum = this.props.minesNum;
        const board = BoardUtils.createBoard(height, width, minesNum);
        this.setState({board});
    }

    checkWinning(){
        debugger;
        const rowNum= this.props.height;
        const colNum = this.props.width;
        const boardSize= rowNum * colNum;
        const minesNum = this.props.minesNum;
        const isWinner = boardSize - minesNum === this.revealedCounter;
        if(isWinner){
            this.gameStatus = gameStatus.win;
            this.props.changeGameStatus(gameStatus.win);
        }
    }

    onCellClick(e, rowInd, colInd){
        const board = _.clone(this.state.board);

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

    revealCell(rowInd, colInd, board){

        if(rowInd === -1 || colInd === -1 || rowInd === board.length || colInd === board[0].length){
            return;
        }

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
            this.revealCell(rowInd - 1, colInd - 1, board);
            this.revealCell(rowInd - 1, colInd, board);
            this.revealCell(rowInd - 1, colInd + 1, board);
            this.revealCell(rowInd + 1, colInd, board);
            this.revealCell(rowInd, colInd - 1, board);
            this.revealCell(rowInd, colInd + 1, board);
            this.revealCell(rowInd + 1, colInd - 1, board);
            this.revealCell(rowInd + 1, colInd + 1, board);
        }

        //TODO: check winning
    }

    render(){
        const board = this.state.board;

        return (<div style={style.board} id="board">
            {
                board.map((row, rowInd) =>{
                    return <div className={style.row} key={rowInd}>
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