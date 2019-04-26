import React from 'react';
import PropTypes from 'prop-types';
import Cell2 from "../Cell/Cell2";


const BoardContext = React.createContext({});

export const BoardProvider = BoardContext.Provider;
export const BoardConsumer = BoardContext.Consumer;

class Board2 extends React.Component {

    constructor() {
        super();

        this.revealCell = () => {
            let { revealedCounter } = this.state;
            this.setState(({ revealedCounter: revealedCounter + 1 }));
        };

        this.state = {
            board: [ [0,0,0] , [0,0,0] , [0,0,0]] ,
            revealedCounter: 0,
            revealCell: this.revealCell,
        };
    }

    componentDidUpdate(prevProps, prevState){
        console.log(`prevState: ${JSON.stringify(prevProps)}`);
        console.log(`prevState: ${JSON.stringify(prevState)}`);
    }

    render(){

        const { board }= this.state;

        return <div>
            <BoardProvider value={this.state.revealCell}>
                {board.map((row, rowInd) =>
                    <div key={rowInd}>
                        {row.map((cell, colInd) => <Cell2 key={colInd} cell={cell}/>)}
                    </div>)
                }
            </BoardProvider>
        </div>
    }
}

Board2.propTypes = {
    board: PropTypes.array
};

export default Board2;
