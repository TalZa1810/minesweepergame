import React from 'react';
import style from './GameOverPanel.scss'
import { displayMessage } from '../../Utils/BoardUtils'

export const GameOverPanel = props=>{
   return <div className={style.game}><span>{displayMessage(props.gameStatus)}</span></div>
};
