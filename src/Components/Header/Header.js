import React from 'react';
import style from './Header.scss';

//TODO: pure component and logic
export const Header = ({ onChange }) => {

    let heightInput;
    let widthInput;
    let minesNumInput;

    const onSubmit = e => {
        let height, width, minesNum;
        e.preventDefault();
        height = parseInt(heightInput.value, 10);
        width = parseInt(widthInput.value, 10);
        minesNum = parseInt(minesNumInput.value, 10);
        onChange(height, width, minesNum);
    };

    return <div>
            <p> Minesweeper</p>
            <form onSubmit={ onSubmit }>
            <input type='number' placeholder='Height'
                   min="5" max="10"
                   ref={ el => heightInput = el } />
            <input type='number' placeholder='Width'
                   min="4" max="10"
                   ref={ el => widthInput = el } />
            <input type='number' placeholder='Mines'
                   min="4" max="10"
                   ref={ el => minesNumInput = el } />
            <button className="newGame" style={style.newGame}> New Game </button>
         </form>
    </div>
};

export default Header;

