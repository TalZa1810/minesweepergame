import React from 'react';
import './Cell.scss';
import { flagSign } from '../../Utils/Constants';


export const Cell = props =>{

    const { cell, row, col , onCellClick } = props;
    let cellBtn;

    if(cell.isRevealed && !cell.isFlag){
        cellBtn = <button className="cellRevealed">
            {cell.value}
        </button>;
    }
    else{
        if(cell.isFlag){
            cellBtn = <button className="cellFlagged"

            > {flagSign} </button>;
        }
        else{
            cellBtn = <button className="cellNotRevealed"
                              onContextMenu={e =>onCellClick(e,row, col )}
                              onClick={e =>{onCellClick(e, row,col)}}
            />;
        }
    }

    return cellBtn;
};
