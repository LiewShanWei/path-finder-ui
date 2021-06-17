import React from 'react';
import { useState } from 'react';
import Table from './components/Table/Table';
import CellTypeSetting from './components/Setting/CellTypeSetting';
import StartSetting from './components/Setting/StartSetting';

function App() {
  const [currentSelectedCellType, setCurrentSelectedCellType] = useState('start');
  const [isVisualizing,setIsVisualizing] = useState(false);

  const onSelectCellTypeHandler = (newCellType) => {
    setCurrentSelectedCellType(newCellType);
    console.log("New cell type: " + currentSelectedCellType);
  }

  const startVisualizing = () => {
    setIsVisualizing(true);
  }

  return (
    <React.Fragment>
      <CellTypeSetting currentSelectedCellType={currentSelectedCellType} onSelectCellType={onSelectCellTypeHandler} />
      <StartSetting startVisualization={startVisualizing}/>
      <Table currentSelectedCellType={currentSelectedCellType} startVisualization={isVisualizing} />
    </React.Fragment>
  );
}

export default App;
