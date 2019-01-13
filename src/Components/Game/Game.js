import React, { Component } from 'react';
import Board from '../Board/Board';
import style from './Game.scss';
import Header from '../Header/Header';
import { gameStatus } from '../../Utils/Constants';
import { GameOverPanel }   from '../GameOverPanel/GameOverPanel';

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

    updateGameStatus(gameStatus){
        this.setState({gameStatus});
    }

    render() {
        const isClickable = this.state.gameStatus === gameStatus.inProgress;
        const { height, width, minesNum } = this.state;

        //TODO: fix styling
        const styleDiv = [style.game, {position:'relative'}];
        return (
            <div style={styleDiv} className="game">
            <Header gameStatus={this.state.gameStatus}/>
            {isClickable? null : <GameOverPanel gameStatus={this.state.gameStatus} /> }
            <Board changeGameStatus={this.updateGameStatus}
                   height={height}
                   width={width}
                   minesNum={minesNum}
            />
        </div>
    );
   }
}

export default Game;
