import React, { Component } from 'react';
import Board from '../Board/Board';
import style from './Game.scss';
import Header from '../Header/Header';

class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            height: 5,
            width: 4,
            minesNum: 1,
            gameActive: true
        };
        this.updateGameStatus = this.updateGameStatus.bind(this);
    }

    updateGameStatus(){
        const gameActive = false;
        this.setState({gameActive});
    }

    render() {
        const { height, width, minesNum } = this.state;
        return (
            <div style={style.game} className="game">
            <Header gameActive={this.state.gameActive}/>
            {this.state.gameActive &&
            <Board changeGameStatus={this.updateGameStatus} height={height} width={width} minesNum={minesNum} />}
        </div>
    );
    }
}

export default Game;
