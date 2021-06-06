import Cell from './Cell';
import { useState } from 'react';

function Table(props){
    const [startCell, setStartCell] = useState();
    const [endCell, setEndCell] = useState();

    function GenerateRows(){
        let rows = []; // Holds row elements
        for (var r = 0; r< props.rowCount; r++){
            let cells = [] // Holds cell elements
            for (var c=0; c<props.colCount;c++){
                cells.push(GenerateDefaultCell(r,c,props.cellType))
            }
            rows.push(GenerateDefaultRow(r,cells))
        }

        return rows;
    }

    function GenerateDefaultRow(rowIndex, cell){
        let rowId = `row-${rowIndex+1}`
        return (
            <tr 
                key={rowId} 
                id={rowId}
            >
                {cell}
            </tr>
        );
    };

    function setCellTypeStartHandler(id){
        setStartCell(id);
        console.log("Current start cell:" + id);
    }

    function setCellTypeEndHandler(id){
        setEndCell(id);
        console.log("Current end cell:" + id);
    }

    function GenerateDefaultCell(rowIndex,colIndex,cellType){
        let cellId = `cell-${rowIndex+1}-${colIndex+1}`
        return (
            <Cell 
                key={cellId} 
                id={cellId} 
                cellType={cellType}
                onSetCellTypeStartHandler={setCellTypeStartHandler}
                onSetCellTypeEndHandler={setCellTypeEndHandler}
            >
            </Cell>
        );
    }

    return (
        <table>
            <tbody>
                {GenerateRows()}
            </tbody>
        </table>
    );
};

export default Table;