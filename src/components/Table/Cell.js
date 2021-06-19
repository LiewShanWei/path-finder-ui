import React, { useState } from 'react';
import styles from './Cell.module.css';

const Cell = (props) => {
    const [isWall, setIsWall]= useState(false);
    const [isVisited, setIsVisited] = useState(false);

    const generateCellClass = () => {
        console.log("Cell.generateCellClass");
        if(!isVisited && isInVisitedArray()){
            setIsVisited(true);
            props.updateCellVisited(props.id);
            return `${styles.cell} ${styles.visited}`;
        }

        if(props.id === props.startCell)
            return `${styles.cell} ${styles.start}`;    
        else if (props.id === props.endCell)
            return `${styles.cell} ${styles.end}`;    
        else if (isWall)
            return `${styles.cell} ${styles.wall}`;
        else
            return `${styles.cell}`;
    }

    const isInVisitedArray = () => {
        const isIn =  props.visitedCells.find((element) => { return element === props.id;}) !== undefined;
        console.log("Cells.isIn: " + props.id + " " + isIn);
        return isIn;
    }

    // let isStartCellClass = `${props.startCell === props.id ? styles.start : '' }`;
    // let isEndCellClass = `${props.endCell === props.id ? styles.end : '' }`;
    // let isNeitherCellType = `${!isStartCellClass && !isEndCellClass ? styles.cell : '' }`
    // let isWallCellType = `${isWall ? styles.wall : ''}`;
    // let combinedCellClass = `${isStartCellClass} ${isEndCellClass} ${isWallCellType} ${isNeitherCellType}`;
    
    const onCellClickHandler = (event) => {
        console.log("Cell.onCellClickHandler: " + event.target.id);
        console.log(props.selectedCellType);
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
            className={generateCellClass()}
            onClick={onCellClickHandler}
        >
            {props.cellCount}
        </td>
    );
};

export default Cell;