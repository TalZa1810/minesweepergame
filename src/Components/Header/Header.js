import React, { Component } from 'react';
import {gameStatus} from "../../Constants";

class Header extends Component {

    render() {
        return <div>{this.displayGameStatus()}</div>;
    }

    displayGameStatus(){
        let headerMsg;

        switch (this.props.gameStatus) {
            case gameStatus.inProgress:
                headerMsg = "Game On";
                break;
            case gameStatus.lose:
                headerMsg = "You Lose";
                break;
            case gameStatus.win:
                headerMsg = "Game Win";
                break;
            default:
                headerMsg = "Game On";
        }

        return headerMsg;
    }

}

export default Header;
