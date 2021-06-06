import { useState } from 'react';
import Table from './components/Table/Table';
import TableSetting from './components/Setting/Setting';

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

  function onCellTypeSettingChangeHandler(cellType){
    setCellType(cellType);
  }

  return (
    <>
      <TableSetting 
        rowCount={rowCount} 
        colCount={colCount} 
        onRowCountChange={onRowCountChangeHandler} 
        onColCountChange={onColCountChangeHandler} 
        onCellTypeSettingChange={onCellTypeSettingChangeHandler}>
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
