import React, { useState, useEffect, useRef , createRef} from 'react';
import Cell from './Cell';
import styles from './Cell.module.css';

const Table = (props) => {
    const [cells,setCells] = useState([]);
    const [walls,setWalls] = useState([]);
    const [startCell,setStartCell] = useState();
    const [endCell, setEndCell] = useState();
    //const [animationQueue, setAnimationQueue] = useState([]);
    const [visitedCells , setVisitedCells] = useState([]);
    // let visitedCells = [];

    const rowCount = 10;
    const colCount = 10;
    const totalCellCount = rowCount * colCount;
    const cellRefs = useRef(new Array(totalCellCount).map(() => createRef()));
    
    //todo list
    // Bring <Cell> to <td> for simplicity 
    // Can start cell / end cell be stateless?

    //Generates the cell array 
    useEffect(() => {
        console.log("Table.useEffect(), [] running");
        let cellArray = [];
        for( var r = 0; r<rowCount; r++){
            let currentRowArray = [];
            for(var c=0;c<colCount;c++){
                let cellId = `${r}-${c}`;
                let cellCount = getCellIndex(r,c);
                currentRowArray.push(cellId,cellCount);
            }
            cellArray.push(currentRowArray);
        }

        setCells(cellArray);
    }, [])

    //Generates table html 
    const generateTableCells = () => {
        console.log("Table.generateTableCells() running");
        // let cellCount = 0;
        //let cellArray = [];
        let rowsHtml = [];
        for( var r = 0; r<rowCount;r++){
            //let currentRowArray = [];
            let cellsHtml = [];
            for( var c = 0; c<colCount; c++){
                let cellId = `${r}-${c}`
                cellsHtml.push(generateDefaultCell(cellId));
                //currentRowArray.push(cellId);
                // cellCount++;
            }
            rowsHtml.push(generateDefaultRow(r,cellsHtml))
            //cellArray.push(currentRowArray);
        }
        return rowsHtml;
    };

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
    const generateDefaultCell = (cellId) => {
        return (
            <td 
                // ref={(el) => cellRefs.current[cellCount] = el}
                key={cellId} 
                id={cellId} 
                className={generateCellClass(cellId)}
                onClick={onCellClickHandler}
            >
                {cellId}
            </td>
            // <Cell
            //     key={cellId}
            //     id={cellId}
            //     startCell={startCell}
            //     endCell={endCell}
            //     selectedCellType = {props.currentSelectedCellType}
            //     onCellClick={onCellClickHandler}
            //     cellCount={cellCount}
            //     visitedCells={visitedCells}
            // >

            // </Cell>
        );
    }
    const generateCellClass = (cellId) => {
        console.log("Generating cell class: " + cellId);
        if(isCellAlreadyVisited(cellId))
            return `${styles.cell} ${styles.visited}`;

        if(cellId === startCell)
            return `${styles.cell} ${styles.start}`;    
        else if (cellId === endCell)
            return `${styles.cell} ${styles.end}`;    
        else if (isInWallArray(cellId))
            return `${styles.cell} ${styles.wall}`;
        else
            return `${styles.cell}`;
    }

    //Handler for start/end/wall/clear cell clicks
    const onCellClickHandler = (event) => {
        console.log("Table.onCellClickHandler() running");
        const cellId = event.target.id;
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

    //Helper function for modifying wall array state
    const isInWallArray = (cellId) => {
        if(walls !== undefined && walls.length > 0){
            return walls.find((element) => { return element === cellId;}) !== undefined;
        }
            
        return false;
    };
    const removeWallInArray = (cellId) => {
        if(isInWallArray(cellId)){
            setWalls(previousState => {
                return previousState.filter((cellToRemove) => cellToRemove !== cellId);
            });
        };
    };
    const addWallToArray = (cellId) => {
        if(!isInWallArray(cellId)){
            setWalls(previousState => (
                [...previousState, cellId]
            ));
        };
    };

    //Helper function for modifying animation queue state
    // const addToAnimationQueue = (cellId) => {
    //     setAnimationQueue(previousState => (
    //         [...previousState,cellId]
    //     ));
    // };
    // const removeFirstFromAnimationQueue = () => {
    //     setAnimationQueue(previousState => {
    //         previousState.slice(1);
    //     })
    // }
    // const isInAnimationQueue = (element) => {
    //     if(animationQueue !== undefined && animationQueue.length > 0){
    //         return animationQueue.find((curr) => { return curr === element;}) !== undefined;
    //     }
            
    //     return false;
    // }

    //Helper function for modifing visited cells state
    const addToVisitedCells = (cellId) => {
        if(!isCellAlreadyVisited(cellId)){
            setVisitedCells(previousState => (
                [...previousState, cellId]
            ));
            // visitedCells.push(cellId);
        };
    };
    // const isInVisitedCells = (cellId) => {
    //     if(visitedCells !== undefined && visitedCells.length > 0){
    //         return visitedCells.find((element) => { return element === cellId;}) !== undefined;
    //     }
            
    //     return false;
    // }
    const isCellAlreadyVisited = (cellId) => {
        if(visitedCells !== undefined && visitedCells.length > 0){
            console.log(visitedCells);
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

    //Helper function to get current cell count
    const getCellIndex = (rowIndex, colIndex) => {
        console.log("Get cell index: " + rowIndex + " " + colIndex);
        const rowPos = parseInt(rowIndex);
        const cellPos = (rowPos*colCount) + parseInt(colIndex);
        return cellPos;
    };

    //Effect function to start visualization whenever the prop value changes
    useEffect(() => {
        if(props.startVisualization){
            if(!startCell || !endCell){
                console.log("Missing start/endcells");
                //todo: Insert modal informing about missing start/end cell
                return;
            }
            
            addToVisitedCells(startCell);
            // visitedCells.push(startCell);
            let neighbourQueue = [];
            neighbourQueue.push(startCell);

            while(neighbourQueue.length > 0){
                console.log("Queue has items");
                var cellIdParent = neighbourQueue.pop();
                var rowPos = cellIdParent.split("-")[0];
                var colPos = cellIdParent.split("-")[1];

                var rowAbove = parseInt(rowPos)-1;
                var colLeft = parseInt(colPos)-1;
                var rowBelow = parseInt(rowPos)+1;
                var colRight = parseInt(colPos)+1;

                var childTopId = rowAbove + "-" + colPos;
                var childLeftId = rowPos + "-" + colLeft
                var childRightId = rowPos + "-" + colRight;
                var childBottomId = rowBelow + "-" + colPos;

                if(isCellInBoard(rowAbove,colPos) && !isCellAlreadyVisited(childTopId) && !isInWallArray(childTopId)){
                    // const cellIndex = getCellIndex(rowAbove,colPos);
                    // var element = cellRefs.current[cellIndex];
                    neighbourQueue.push(childTopId);
                    //addToAnimationQueue(childTopId);
                    // visitedCells.push(childTopId);
                    addToVisitedCells(childTopId);

                    if(childTopId === endCell)
                        return;
                }
                if(isCellInBoard(rowBelow,colPos) && !isCellAlreadyVisited(childBottomId) && !isInWallArray(childBottomId)){
                    // const cellIndex = getCellIndex(rowBelow,colPos);
                    // var element = cellRefs.current[cellIndex];
                    neighbourQueue.push(childBottomId);
                    // addToAnimationQueue(childBottomId);
                    // visitedCells.push(childBottomId);
                    addToVisitedCells(childBottomId);

                    if(childBottomId === endCell)
                        return;
                }
                if(isCellInBoard(rowPos,colLeft) && !isCellAlreadyVisited(childLeftId) && !isInWallArray(childLeftId)){
                    // const cellIndex = getCellIndex(rowPos,colLeft);
                    // var element = cellRefs.current[cellIndex];
                    neighbourQueue.push(childLeftId);
                    // addToAnimationQueue(childLeftId);
                    // visitedCells.push(childLeftId);
                    addToVisitedCells(childLeftId);

                    if(childLeftId === endCell)
                        return;
                }
                if(isCellInBoard(rowPos,colRight) && !isCellAlreadyVisited(childRightId) && !isInWallArray(childRightId)){
                    // const cellIndex = getCellIndex(rowPos,colRight);
                    // var element = cellRefs.current[cellIndex];
                    neighbourQueue.push(childRightId);
                    // addToAnimationQueue(childRightId);
                    // visitedCells.push(childRightId);
                    addToVisitedCells(childRightId);

                    if(childRightId === endCell)
                        return;
                }
            }
        }
    }, [props.startVisualization]);

    // useEffect(() => {
    //     while(animationQueue.length > 0 ){
    //         var element = animationQueue.pop();
    //         element.s
    //     }
    // }, [animationQueue])

    const isCellInBoard = (rowPos, colPos) => {
        //console.log("Is this cell in board: " + rowPos + " " + colPos);
        const validRow = rowPos >=0 && rowPos < rowCount;
        const validCol = colPos >=0 && colPos < colCount;
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
        // console.log("animationQueue");
        // console.log(animationQueue);
        console.log("visitedCells");
        console.log(visitedCells);
        console.log("cellRefs");
        console.log(cellRefs);
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