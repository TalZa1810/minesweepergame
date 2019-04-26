import React , { Component } from 'react';
import { cellStatus } from '../../Utils/Constants';
import BoardContext, { BoardConsumer } from '../Board/Board2';


class Cell2 extends Component{

    constructor(props){
        super(props);
        this.state= { status: cellStatus.notRevealed, value: props.value }
    }

    revealCurrentCell(){

    }

    render(){
        return(<BoardConsumer>
            { revealCell => {
                return <button onClick={revealCell}/>
            } }
        </BoardConsumer>)
    }
}

Cell2.contextType = BoardContext;

export default Cell2;

/*


    let cellBtn;



    if(cell.status === cellStatus.flagged){
        cellBtn = <button className={style.cellFlagged}

                          onContextMenu={e => onCellClick(e, row, col)}> {flagSign} </button>;
    }
    else{
        if(cell.status === cellStatus.revealed){
            cellBtn = <button
                              className={style.cellRevealed}>{cell.value} </button>;
        }
        else{
            cellBtn = <button className={style.cellNotRevealed}
                              onClick={e =>{onCellClick(e, row,col)}}
                              onContextMenu={e => onCellClick(e, row, col)}

            />;
        }
    }

    return cellBtn;

*/

