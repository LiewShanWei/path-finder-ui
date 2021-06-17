import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Table = (props) => {
    const [cells,setCells] = useState([]);
    const [walls,setWalls] = useState([]);
    const [startCell,setStartCell] = useState();
    const [endCell, setEndCell] = useState();
    const [animationQueue, setAnimationQueue] = useState([]);
    const [visitedCells , setVisitedCells] = useState([]);

    const rowCount = 10;
    const colCount = 10;

    useEffect(() => {
        let cellArray = [];
        for( var r = 0; r<rowCount; r++){
            let currentRowArray = [];
            for(var c=0;c<colCount;c++){
                let cellId = `${r}-${c}`;
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
                let cellId = `${r}-${c}`
                cellsHtml.push(generateDefaultCell(cellId));
                currentRowArray.push(cellId);
            }
            rowsHtml.push(generateDefaultRow(r,cellsHtml))
            cellArray.push(currentRowArray);
        }

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

    const removeFirstFromAnimationQueue = (cellId) => {
        setAnimationQueue(previousState => {
            previousState.slice(1);
        })
    }

    const addToVisitedCells = (cellId) => {
        setVisitedCells(previousState => (
            [...previousState, cellId]
        ))
    }

    const isCellAlreadyVisited = (visitedCells, cellId) => {
        if(visitedCells !== undefined && visitedCells.length > 0){
            const isFound = visitedCells.find((element) => { return element === cellId;}) 
            if(isFound){
                console.log("Already visited: " + cellId);
                return true;
            } else{
                console.log("Not visited: " + cellId);
                return false;
            }
        }

        console.log("Not visited: " + cellId);
        return false;
    }


    useEffect(() => {
        if(props.startVisualization){
            if(!startCell || !endCell){
                console.log("Missing start/endcells");
                //todo: Insert modal informing about missing start/end cell
                return;
            }
            //printCellsHelper();

            let visitedCells = [];
            visitedCells.push(startCell);
            let animationQueue = [];
            animationQueue.push(startCell);

            while(animationQueue.length > 0){
                var cellIdParent = animationQueue.pop();
                console.log("Parent: " + cellIdParent);
                var rowPos = cellIdParent.split("-")[0];
                var colPos = cellIdParent.split("-")[1];

                var childTopId = parseInt(rowPos-1) + "-" + parseInt(colPos);
                var childLeftId = parseInt(rowPos) + "-" + parseInt(colPos-1);
                var childRightId = parseInt(rowPos) + "-" + (parseInt(colPos)+1);
                var childBottomId = (parseInt(rowPos)+1) + "-" + parseInt(colPos);

                if(isCellInBoard(rowPos-1,colPos) && !isCellAlreadyVisited(visitedCells,childTopId)){
                    visitedCells.push(childTopId);
                    animationQueue.push(childTopId);
                    console.log("Pushed top child to queue: " + childTopId);
                }
                if(isCellInBoard(parseInt(rowPos)+1,colPos) && !isCellAlreadyVisited(visitedCells,childBottomId)){
                    visitedCells.push(childBottomId);
                    animationQueue.push(childBottomId);
                    console.log("Pushed bottom child to queue: " + childBottomId);
                }
                if(isCellInBoard(rowPos,colPos-1) && !isCellAlreadyVisited(visitedCells,childLeftId)){
                    visitedCells.push(childLeftId);
                    animationQueue.push(childLeftId);
                    console.log("Pushed left child to queue: " + childLeftId);
                }
                if(isCellInBoard(rowPos,parseInt(colPos)+1) && !isCellAlreadyVisited(visitedCells,childRightId)){
                    visitedCells.push(childRightId);
                    animationQueue.push(childRightId);
                    console.log("Pushed right child to queue: " + childRightId);
                }
            }
        }
    }, [props.startVisualization]);

    const isCellInBoard = (rowPos, colPos) => {
        const validRow = rowPos >=0 && rowPos < rowCount;
        const validCol = colPos >=0 && colPos < colCount;
        //console.log("Cell in board: " + rowPos + " " + colPos);
        //console.log(validRow && validCol);
        return validRow && validCol;
    }

    const printCellsHelper = () => {
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

    return (
        <table>
            <tbody>
                {generateTableCells()}
            </tbody>
        </table>
    );
};

export default Table;