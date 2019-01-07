import React from 'react';
import style from './Cell.scss';

class Cell extends React.Component {

    render(){
        const { cell, row, col, board, onCellClick} = this.props;
        let cellBtn;

        if(cell.isRevealed){
            cellBtn = <button style={style.cellRevealed}> {cell.value} </button>;
        }
        else{
            cellBtn = <button onClick={()=>{onCellClick(row,col, board)}}
                              style={style.cellNotRevealed} />;
        }

        return cellBtn;
    }
}

export default Cell;