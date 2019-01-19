import React from 'react';
import { displayMessage } from '../../Utils/BoardUtils'

export const GameOverPanel = props=>{
   return <span>{displayMessage(props.gameStatus)}</span>
};