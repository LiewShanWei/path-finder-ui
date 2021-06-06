import { useState } from 'react';
import Table from './components/Table/Table';
import TableSetting from './components/Table/TableSetting';

function App() {
  const [rowCount,setRowCount] = useState(50);
  const [colCount,setColCount] = useState(50);
  const [cellType, setCellType] = useState("RADIO_START");

  function onRowCountChangeHandler(rowCount){
    setRowCount(rowCount);
  }

  function onColCountChangeHandler(colCount){
    setColCount(colCount);
  }

  function onCellTypeSelectedHandler(cellType){
    setCellType(cellType);
  }

  return (
    <>
      <TableSetting 
        rowCount={rowCount} 
        colCount={colCount} 
        onRowCountChange={onRowCountChangeHandler} 
        onColCountChange={onColCountChangeHandler} 
        onCellTypeSelected={onCellTypeSelectedHandler}>
      </TableSetting>
      <Table 
        rowCount={rowCount} 
        colCount={colCount}
        cellType={cellType}>
      </Table>
    </>
  );
}

export default App;
