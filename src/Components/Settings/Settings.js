import React, { Component } from 'react';
import GameContext, {  GameConsumer } from '../Game/Game2';


class Settings extends Component {

    constructor(){
        super();
        this.state = {height: 5, width: 4,  minesNum: 4 };
    }

    handleSubmit(e, context){
        e.preventDefault();
        let height = parseInt(this.height.value, 10);
        let width = parseInt(this.width.value, 10);
        let minesNum = parseInt(this.minesNum.value, 10);

        if( height && width && minesNum){
            let gameSettings = { height, width , minesNum } ;
            this.setState( gameSettings , ()=>{
                context.changeGameSettings(gameSettings);
                //context.changeGameStatus(gameStatus.start);
            });
        }
    };

    render(){
        return (
            <GameConsumer>
                {context => {
                    return <div>
                        <h1>Minesweeper</h1>
                        <form onSubmit={(e)=>this.handleSubmit(e, context)}>
                            <label>Height:</label>
                            <input type='number'
                                   defaultValue={5} ref={ el => this.height = el }
                                   min="5" max="10" />
                            <label>Width:</label>
                            <input type='number'
                                   defaultValue={4} ref={ el => this.width = el }
                                   min="4" max="10" />
                            <label>Mines:</label>
                            <input type='number'
                                   defaultValue={4} ref={ el => this.minesNum = el }
                                   min="4" max="10"  />
                            <button /*className={style.newGame}*/> New Game </button>
                        </form>
                    </div>

                }}

            </GameConsumer>
        )
    }
}

Settings.contextType = GameContext;

export default Settings;