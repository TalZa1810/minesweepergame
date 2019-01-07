import React from 'react';
import './Cell.scss';

class Cell extends React.Component {

    render(){
        const { cell, row, col, board, onCellClick} = this.props;
        let cellBtn;

        if(cell.isRevealed){
            cellBtn = <button className="cellRevealed" > {cell.value} </button>;
        }
        else{
            cellBtn = <button className="cellNotRevealed" onClick={()=>{onCellClick(row,col, board)}}/>;
        }

        return cellBtn;
    }
}

export default Cell;