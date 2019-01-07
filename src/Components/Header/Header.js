import React, { Component } from 'react';

class Header extends Component {

    render() {
        const gameActive = this.props.gameActive;
        let HeaderMsg;
        gameActive? HeaderMsg = "Game On" :  HeaderMsg = "Game Over";
        return <div>{HeaderMsg}</div>;
    }
}

export default Header;
