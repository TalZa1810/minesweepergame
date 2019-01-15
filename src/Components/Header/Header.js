import React from 'react';
import style from './Header.scss';
import { gameStatus } from '../../Utils/Constants';

export const Header = props => {

    let height;
    let width;
    let minesNum;

    let {onChangeSettings, changeGameStatus} = props;

    const handleSubmit = e =>{
        e.preventDefault();
        height = parseInt(height.value, 10);
        width = parseInt(width.value, 10);
        minesNum = parseInt(minesNum.value, 10);

        if(height && width && minesNum){
            changeGameStatus(gameStatus.start);
            onChangeSettings(height, width, minesNum);
        }
    };

     return <div>
            <p>Minesweeper</p>
            <form onSubmit={handleSubmit}>
                <label>Height:</label>
                <input type='number'
                       defaultValue={5} ref={el => height = el }
                       min="5" max="10" />
                <label>Width:</label>
                <input type='number'
                       defaultValue={4} ref={el => width = el }
                       min="4" max="10" />
                <label>Mines:</label>
                <input type='number'
                       defaultValue={4} ref={el => minesNum = el }
                       min="4" max="10"  />
                <button className="newGame" style={style.newGame}> New Game </button>
            </form>
        </div>
};

export default Header;

