import { useState } from 'react';
import styles from './Cell.module.css';

function Cell(){
    const [isWall, setIsWall] = useState(false);

    function onCellClickHandler(){
        setIsWall(true);
    };

    return (
        <td 
            onClick={onCellClickHandler} 
            className={ 
                (!isWall && styles.cell) || 
                (isWall && styles.wall) 
            }
        >

        </td>
    );
};

export default Cell;