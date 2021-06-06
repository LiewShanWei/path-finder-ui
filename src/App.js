import { useState } from 'react';
import Table from './components/Table/Table';
import TableSetting from './components/Setting/Setting';

function App() {
  const [rowCount,setRowCount] = useState(50);
  const [colCount,setColCount] = useState(50);
  const [cellType, setCellType] = useState("RADIO_START");
  const [algorithmSelected, setAlgorithmSelected] = useState();

  function onRowCountChangeHandler(rowCount){
    setRowCount(rowCount);
  }

  function onColCountChangeHandler(colCount){
    setColCount(colCount);
  }

  function onCellTypeSettingChangeHandler(cellType){
    setCellType(cellType);
  }

  function onAlgorithmSelectionHandler(algorithm){
    setAlgorithmSelected(algorithm);
  }

  function StartVisualization(){
    if(algorithmSelected === "BFS"){
      // Run BFS
      alert("Running bfs");
      BFS();
    }
  }

  function BFS(){

  }

  return (
    <>
      <TableSetting 
        rowCount={rowCount} 
        colCount={colCount} 
        onRowCountChange={onRowCountChangeHandler} 
        onColCountChange={onColCountChangeHandler} 
        onCellTypeSettingChange={onCellTypeSettingChangeHandler}
        onAlgorithmSelection={onAlgorithmSelectionHandler}>
      </TableSetting>
      <button type="button" onClick={StartVisualization}>Start Visualization!</button>
      <Table 
        rowCount={rowCount} 
        colCount={colCount}
        cellType={cellType}>
      </Table>
    </>
  );
}

export default App;
