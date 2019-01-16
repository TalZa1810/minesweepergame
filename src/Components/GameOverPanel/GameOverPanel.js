import React from 'react';
import style from './GameOverPanel.scss'
import { displayMessage } from '../../Utils/BoardUtils'

export const GameOverPanel = props=>{
   return <div className={style.panel}><span>{displayMessage(props.gameStatus)}</span></div>
};
