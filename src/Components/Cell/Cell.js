import React from 'react';
import style from './Cell.scss';
import { cellStatus, flagSign } from '../../Utils/Constants';


export const Cell = props =>{

    const { cell, row, col , onCellClick} = props;
    let cellBtn;

    if(cell.status === cellStatus.flagged){
        cellBtn = <button className={style.cellFlagged}
                          disabled={props.isGameDone}
                          onContextMenu={e => onCellClick(e, row, col)}> {flagSign} </button>;
    }
    else{
        if(cell.status === cellStatus.revealed){
            cellBtn = <button disabled={props.isGameDone}
                              className={style.cellRevealed}>{cell.value} </button>;
        }
        else{
            cellBtn = <button className={style.cellNotRevealed}
                              onClick={e =>{onCellClick(e, row,col)}}
                              onContextMenu={e => onCellClick(e, row, col)}
                              disabled={props.isGameDone}
                       />;
        }
    }

    return cellBtn;
};

