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
            minesNum: 4,
            gameStatus: gameStatus.start
        };

        this.updateGameStatus = this.updateGameStatus.bind(this);
        this.changeGameSettings = this.changeGameSettings.bind(this);
    }

    updateGameStatus(gameStatus){
        this.setState({gameStatus});
    }

    changeGameSettings( height = 5, width = 4, minesNum= 4){
        this.setState({height, width, minesNum})
    }

    render() {
        const isClickable = this.state.gameStatus === gameStatus.start ||
                            this.state.gameStatus === gameStatus.inProgress;

        const { height, width, minesNum } = this.state;

        return (
            <div className={style.game}>
            <Header onChangeSettings={this.changeGameSettings}
                    changeGameStatus={this.updateGameStatus}
            />
            {isClickable? null : <GameOverPanel gameStatus={this.state.gameStatus} /> }
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
