import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Table = (props) => {
    const [cellsHtml, setCellsHtml] = useState();
    const [cells,setCells] = useState([]);
    const [walls,setWalls] = useState([]);
    const [startCell,setStartCell] = useState();
    const [endCell, setEndCell] = useState();
    const [animationQueue, setAnimationQueue] = useState([]);
    const [visitedCells , setVisitedCells] = useState([]);
    const [startVisualization, setStartVisualization] = useState(props.startVisualization);

    const rowCount = 50;
    const colCount = 100;

    console.log(props.currentSelectedCellType);

    // useEffect(() => {
    //     let cellArray = [];
    //     let rowsHtml = [];
    //     for( var r = 0; r<rowCount;r++){
    //         let currentRowArray = [];
    //         let cellsHtml = [];
    //         for( var c = 0; c<colCount; c++){
    //             let cellId = `cell-${r}-${c}`
    //             cellsHtml.push(generateDefaultCell(cellId));
    //             currentRowArray.push(cellId);
    //         }
    //         rowsHtml.push(generateDefaultRow(r,cellsHtml))
    //         cellArray.push(currentRowArray);
    //     }

    //     setCells(cellArray);
    //     setCellsHtml(rowsHtml);
    // }, [])

    useEffect(() => {
        let cellArray = [];
        for( var r = 0; r<rowCount; r++){
            let currentRowArray = [];
            for(var c=0;c<colCount;c++){
                let cellId = `cell-${r}-${c}`;
                currentRowArray.push(cellId);
            }
            cellArray.push(currentRowArray);
        }

        setCells(cellArray);
    }, [])

    const generateTableCells = () => {
        let cellArray = [];
        let rowsHtml = [];
        for( var r = 0; r<rowCount;r++){
            let currentRowArray = [];
            let cellsHtml = [];
            for( var c = 0; c<colCount; c++){
                let cellId = `cell-${r}-${c}`
                cellsHtml.push(generateDefaultCell(cellId));
                currentRowArray.push(cellId);
            }
            rowsHtml.push(generateDefaultRow(r,cellsHtml))
            cellArray.push(currentRowArray);
        }

        //setCells(cellArray);
        //setCellsHtml(rowsHtml);
        return rowsHtml;
    };

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

    const generateDefaultCell = (cellId) => {
        return (
            <Cell 
                key={cellId} 
                id={cellId} 
                startCell={startCell}
                endCell={endCell}
                selectedCellType = {props.currentSelectedCellType}
                onCellClick={onCellClickHandler}
            >
            </Cell>
        );
    }

    const onCellClickHandler = (cellId) => {
        const cellType = props.currentSelectedCellType;
        console.log("About to change to cell: " + cellType);
        if(cellType === 'start'){
            if(cellId === endCell)
                setEndCell();
            setStartCell(cellId);
            removeWallInArray(cellId);

        } else if (cellType === 'end'){
            if(cellId === startCell)
                setStartCell();
            setEndCell(cellId);
            removeWallInArray(cellId);
        } else if (cellType === 'wall'){
            if(cellId === startCell)
                setStartCell();
            if(cellId === endCell)
                setEndCell();
            addWallToArray(cellId);
        } else if (cellType === 'clear'){
            if(cellId === startCell)
                setStartCell();
            if(cellId === endCell)
                setEndCell();
            removeWallInArray(cellId);
        }
    }

    const isInWallArray = (cellId) => {
        if(walls !== undefined && walls.length > 0)
            return walls.find((element) => { return element === cellId;}) === undefined;
        return false;
    };

    const removeWallInArray = (cellId) => {
        if(isInWallArray(cellId)){
            setWalls(previousState => {
                previousState.filter((cellToRemove) => cellToRemove !== cellId)
            });
        };
    };

    const addWallToArray = (cellId) => {
        if(isInWallArray(cellId)){
            setWalls(previousState => (
                [...previousState, cellId]
            ));
        };
    };

    const addToAnimationQueue = (cellId) => {
        setAnimationQueue(previousState => (
            [...previousState,cellId]
        ));
    };

    const removeFromAnimationQueue = (cellId) => {
        setAnimationQueue(previousState => {
            previousState.slice(1);
        })
    }

    const addToVisitedCells = (cellId) => {
        setVisitedCells(previousState => (
            [...previousState, cellId]
        ))
    }



    useEffect(() => {
        function printCellsHelper(){
            console.log("cells");
            console.log(cells);
            console.log("startCell");
            console.log(startCell);
            console.log("endCell");
            console.log(endCell);
            console.log("walls");
            console.log(walls);
            console.log("animationQueue");
            console.log(animationQueue);
            console.log("visitedCells");
            console.log(visitedCells);
        }

        if(props.startVisualization){
            addToVisitedCells(startCell);
            printCellsHelper();
        }
    }, [props.startVisualization])

    

    return (
        <table>
            <tbody>
                {generateTableCells()}
            </tbody>
        </table>
    );
};

export default Table;