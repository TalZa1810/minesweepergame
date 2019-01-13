import React from 'react';
//import style from './GameOverPanel.scss'
import { displayMessage } from '../../Utils/BoardUtils'

export const GameOverPanel = props=>{
    //TODO: fix styling
    const styleDiv = {width: '500px',height: '500px', position: 'absolute'};
    return <div style={styleDiv}><span>{displayMessage(props.gameStatus)}</span></div>
};
