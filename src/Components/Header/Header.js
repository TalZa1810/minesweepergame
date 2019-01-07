import React, { Component } from 'react';

class Header extends Component {

    render() {
        const gameActive = this.props.gameActive;
        const Header = gameActive && "Game On";
        return <div>{Header}</div>;
    }
}

export default Header;
