import React from 'react';
import PropTypes from 'prop-types';
import Cell2 from "../Cell/Cell2";
import {createBoard} from "../../Utils/BoardUtils";
import style from './Board.scss';


const BoardContext = React.createContext({});

export const BoardProvider = BoardContext.Provider;
export const BoardConsumer = BoardContext.Consumer;

class Board2 extends React.Component {

    constructor(props) {
        super(props);

        this.revealCell = () => {
            let { revealedCounter } = this.state;
            this.setState(({ revealedCounter: revealedCounter + 1 }));
        };

        this.state = {
            board: props.board,
            revealedCounter: 0,
            revealCell: this.revealCell,
        };
    }

    renderRow(row , rowInd){
        return (<div className={style.row} key={rowInd}>
            {row.map((cell, colInd) => <Cell2 key={colInd} value={cell.value}/>)}
        </div>)
    }

    render() {
        const { board } = this.state;

        return <BoardProvider value={this.state}>
            <div>
                {board.map((row, rowInd) => this.renderRow(row, rowInd))}
            </div>
        </BoardProvider>
    }
}

Board2.propTypes = {
    board: PropTypes.array
};

export const BoardProxy = ({ settings }) => (
    <Board2 board={createBoard(settings)}/>
);