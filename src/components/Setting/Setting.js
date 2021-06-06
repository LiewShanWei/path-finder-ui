import { useState } from 'react'
import styles from './Setting.module.css';

import CellTypeSetting from './CellTypeSetting'
import TableStructureSetting from './TableStructureSetting';
import AlgorithmSetting from './AlgorithmSetting';

function TableSetting(props){
    function onRowCountChangeHandler(event){
        props.onRowCountChange(event.target.value);
    };

    function onColCountChangeHandler(event){
        props.onColCountChange(event.target.value);
    };

    function onCellTypeSettingChangeHandler(event){
        props.onCellTypeSettingChange(event.target.value);
    }

    function onAlgorithmSelectionHandler(event){
        props.onAlgorithmSelection(event.target.value);
    }

    return (
        <>
            <CellTypeSetting 
                onCellTypeSettingChange={onCellTypeSettingChangeHandler}>
            </CellTypeSetting>
            <TableStructureSetting 
                rowCount={props.rowCount} 
                colCount={props.colCount} 
                onRowCountChange={onRowCountChangeHandler} 
                onColCountChange={onColCountChangeHandler}>
            </TableStructureSetting>
            <AlgorithmSetting
                onAlgorithmSelection={onAlgorithmSelectionHandler}>
            </AlgorithmSetting>
        </>
    );
};

export default TableSetting;