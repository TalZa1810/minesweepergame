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
            minesNum: 5,
            gameStatus: gameStatus.inProgress
        };
        this.updateGameStatus = this.updateGameStatus.bind(this);
    }

    updateGameStatus(status){
        this.setState({gameStatus: status});
    }

    render() {
        const { height, width, minesNum } = this.state;
        return (
            <div style={style.game} className="game">
            <Header gameStatus={this.state.gameStatus}/>
            <Board changeGameStatus={this.updateGameStatus}
                   height={height}
                   width={width}
                   minesNum={minesNum}
                   gameStatus={this.state.gameStatus}
            />
        </div>
    );
    }
}

export default Game;
