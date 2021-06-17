import { useState } from 'react';
import styles from './Cell.module.css';

const Cell = (props) => {
    const [isWall, setIsWall]= useState(false);

    let isStartCellClass = `${props.startCell === props.id ? styles.start : '' }`;
    let isEndCellClass = `${props.endCell === props.id ? styles.end : '' }`;
    let isNeitherCellType = `${!isStartCellClass && !isEndCellClass ? styles.cell : '' }`
    let isWallCellType = `${isWall ? styles.wall : ''}`;
    let combinedCellClass = `${isStartCellClass} ${isEndCellClass} ${isWallCellType} ${isNeitherCellType}`;
    
    const onCellClickHandler = (event) => {
        console.log('Cell onclick: ' + props.selectedCellType);
        if(props.selectedCellType === 'start' || props.selectedCellType === 'end'){
            setIsWall(false);
            props.onCellClick(event.target.id);
        } else if (props.selectedCellType === 'wall'){
            setIsWall(true);
            props.onCellClick(event.target.id);
        } else if(props.selectedCellType === 'clear'){
            setIsWall(false);
            props.onCellClick(event.target.id);
        }
    };

    return (
        <td 
            id={props.id}
            className={combinedCellClass}
            onClick={onCellClickHandler}
        >
        </td>
    );
};

export default Cell;