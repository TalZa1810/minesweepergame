import React , { Component } from 'react';
import { BoardConsumer } from '../Board/Board2';
import { GameConsumer } from '../Game/Game2';
import {cellStatus, flagSign, mineSign, gameStatus} from '../../Utils/Constants';
import styles from './Cell.scss';
import classNames from 'classnames';


class Cell2 extends Component{

    constructor(props){
        super(props);
        this.state= { status: cellStatus.notRevealed, value: props.value, sign: ''};
    }

    onCellClick(e, p , gameContext){
        e.preventDefault();

        let { status , value } = this.state;
        if( status === cellStatus.notRevealed){
            if( e.type === 'contextmenu' ){
                status = cellStatus.flagged;
            }
            else{
                status = cellStatus.revealed;
                p();
                if( value ===  mineSign ){
                    gameContext.updateGameStatus(gameStatus.lose);
                }
            }

            this.setState({ status });
        }
    }

    componentDidUpdate(prevProps, prevState){
        let sign = '';
        if( prevState.status !== this.state.status){
            if( this.state.status === cellStatus.flagged ){
                sign = flagSign;
            }
            if(this.state.status === cellStatus.revealed ){
                sign = this.state.value;
            }
            this.setState({ sign });
        }
    }

    render(){

        const buttonStyle = classNames({
            [styles.cellFlagged]: this.state.status ===  cellStatus.flagged,
            [styles.cellRevealed]:this.state.status ===  cellStatus.revealed,
            [styles.cellNotRevealed]: this.state.status ===  cellStatus.notRevealed,
        });

        return(<GameConsumer>
            {
                gameContext => {
                    const disabled = gameContext.gameStatus === gameStatus.lose ||
                        gameContext.gameStatus === gameStatus.win;

                    return <BoardConsumer>
                        { boardContext => {
                            const p = boardContext.revealCell;
                            return <button
                                className={buttonStyle}
                                disabled={disabled}
                                onClick={e => this.onCellClick(e,p, gameContext)}
                                onContextMenu={(e) => this.onCellClick(e)}
                            >
                                {this.state.sign}
                            </button>
                        }}
                    </BoardConsumer>
                }
            }
            </GameConsumer>);
    }
}

export default Cell2;

