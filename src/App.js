import React from 'react';
import { useState } from 'react';
import Table from './components/Table/Table';
import CellTypeSetting from './components/Setting/CellTypeSetting';

function App() {
  const [currentSelectedCellType, setCurrentSelectedCellType] = useState('start');

  const onSelectCellTypeHandler = (newCellType) => {
    setCurrentSelectedCellType(newCellType);
    console.log('New Cell Type: ' + newCellType);
}

  return (
    <React.Fragment>
      <CellTypeSetting currentSelectedCellType={currentSelectedCellType} onSelectCellType={onSelectCellTypeHandler} />
      <Table currentSelectedCellType={currentSelectedCellType} />
    </React.Fragment>
  );
}

export default App;
