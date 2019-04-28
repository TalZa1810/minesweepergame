import React, { Component } from 'react';
import { gameStatus } from '../../Utils/Constants';
import Settings from '../Settings/Settings';
import { BoardProxy } from "../Board/Board2";

const GameContext = React.createContext({});

export const GameProvider = GameContext.Provider;
export const GameConsumer = GameContext.Consumer;


class Game2 extends Component{

    constructor() {
        super();

        this.changeGameSettings = gameSettings => {
            this.setState(({ gameSettings }));
        };

        this.updateGameStatus = gameStatus =>{
            this.setState(({ gameStatus }));
        };

        this.state = {
            game: 'minesweeper',
            gameStatus: gameStatus.start,
            gameSettings: null,
            changeGameSettings: this.changeGameSettings,
            updateGameStatus: this.updateGameStatus,
        };
    }

    render(){
        return (<GameProvider value={this.state}>
            <Settings/>
            {this.state.gameSettings && <BoardProxy settings={this.state.gameSettings}/>}
        </GameProvider>);
    }
}

export default Game2;

