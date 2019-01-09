import React from 'react';
import './Cell.scss';
import { flagSign } from '../../Constants';


class Cell extends React.Component {

    render(){
        const { cell, row, col , onCellClick} = this.props;
        let cellBtn;

        if(cell.isRevealed && !cell.isFlag){
            cellBtn = <button className="cellRevealed" > {cell.value} </button>;
        }
        else{
            if(cell.isFlag){
                cellBtn = <button className="cellFlaged" > {flagSign} </button>;
            }
            else{
                cellBtn = <button className="cellNotRevealed"
                                  onContextMenu={e =>onCellClick(e,row, col )}
                                  onClick={e =>{onCellClick(e, row,col)}}
                />;
            }
        }

        return cellBtn;
    }
}

export default Cell;