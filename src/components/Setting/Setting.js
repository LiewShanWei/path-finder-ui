import { useState } from 'react'
import styles from './Setting.module.css';

import CellTypeSetting from './CellTypeSetting'
import TableStructureSetting from './TableStructureSetting';
import AlgorithmSetting from './AlgorithmSetting';

function TableSetting(props){
    function onRowCountChangeHandler(rowCount){
        props.onRowCountChange(rowCount);
    };

    function onColCountChangeHandler(colCount){
        props.onColCountChange(colCount);
    };

    function onCellTypeSettingChangeHandler(cellType){
        props.onCellTypeSettingChange(cellType);
    }

    function onAlgorithmSelectionHandler(algorithm){
        props.onAlgorithmSelection(algorithm);
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