import { createRef, useRef} from 'react';
import styles from './Cell.module.css';
import Cell from './Cell'

const TestTable = () => {
        const cellRef = useRef(new Array(25).map(() => createRef()));
        //Generates table html 
        const generateTableCells = () => {
            let rowsHtml = [];
            let cellCount = 0;
            for( var r = 0; r<5;r++){
                let cellsHtml = [];
                for( var c = 0; c<5; c++){
                    let cellId = `${r}-${c}`
                    
                    cellsHtml.push(generateDefaultCell(cellId, cellCount));
                    cellCount ++;
                }
                rowsHtml.push(generateDefaultRow(r,cellsHtml))
            }
            return rowsHtml;
        };

        const onClickHandler = () => {
            console.log("Table hello");
        }
        //Generates <tr> html
        const generateDefaultRow = (rowIndex, cell) => {
            let rowId = `row-${rowIndex}`
            return (
                <tr 
                    key={rowId} 
                    id={rowId}
                >
                    {cell}
                </tr>
            );
        };
    
        //Generates <Cell> html
        const generateDefaultCell = (cellId, cellCount) => {
            return (
                <Cell
                    className={styles.cell}
                    key={cellId}
                    id={cellId}
                    ref={(el) => cellRef.current[cellCount] = el}
                    onCellClick = {onClickHandler}
                    cellCount={cellCount}
                >
                </Cell>
            );
        }
    
    return (
        <table>
            <tbody>
                {generateTableCells()}
            </tbody>
        </table>
    )
}

export default TestTable;