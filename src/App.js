import { useState } from 'react';
import Table from './components/Table/Table';
import TableSetting from './components/Table/TableSetting';

function App() {
  const [rowCount,setRowCount] = useState(50);
  const [colCount,setColCount] = useState(50);

  function onRowCountChangeHandler(rowCount){
    setRowCount(rowCount);
  }

  function onColCountChangeHandler(colCount){
    setColCount(colCount);
  }

  return (
    <>
      <TableSetting rowCount={rowCount} colCount={colCount} onRowCountChange={onRowCountChangeHandler} onColCountChange={onColCountChangeHandler}></TableSetting>
      <Table rowCount={rowCount} colCount={colCount}></Table>
    </>
  );
}

export default App;
