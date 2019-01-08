import React, { Component } from 'react';
import Board from '../Board/Board';
import style from './Game.scss';
import Header from '../Header/Header';
import { gameStatus } from '../../Constants';

class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            height: 5,
            width: 4,
            minesNum: 11,
            gameStatus: gameStatus.inProgress
        };
        this.updateGameStatus = this.updateGameStatus.bind(this);
    }

    updateGameStatus(status){
        const gameStatus = status;
        this.setState({gameStatus});
    }

    render() {
        const { height, width, minesNum } = this.state;
        return (
            <div style={style.game} className="game">
            <Header gameStatus={this.state.gameStatus}/>
            {this.state.gameStatus === gameStatus.inProgress ?
            <Board changeGameStatus={this.updateGameStatus} height={height} width={width} minesNum={minesNum} /> : null
            }
        </div>
    );
    }
}

export default Game;
