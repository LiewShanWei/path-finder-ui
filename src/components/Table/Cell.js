import { useState } from 'react';
import styles from './Cell.module.css';

function Cell(props){
    const [isStart, setIsStart] = useState(false);
    const [isEnd, setIsEnd] = useState(false);
    const [isWall, setIsWall] = useState(false);

    function onCellClickHandler(){
        const cellType = props.cellType;
        if(cellType == "RADIO_START"){
            setIsStart(true);
            setIsEnd(false);
            setIsWall(false);
        } else if (cellType == "RADIO_END"){
            setIsStart(false);
            setIsEnd(true);
            setIsWall(false);
        } else if (cellType == "RADIO_WALL"){
            setIsStart(false);
            setIsEnd(false);
            setIsWall(!isWall);
        }
    };

    return (
        <td 
            id={props.id}
            onClick={onCellClickHandler} 
            className={ 
                (!isStart && !isEnd && !isWall && styles.cell) ||
                (isStart && styles.start)  ||
                (isEnd && styles.end)  ||
                (isWall && styles.wall) 
            }
        >
        </td>
    );
};

export default Cell;