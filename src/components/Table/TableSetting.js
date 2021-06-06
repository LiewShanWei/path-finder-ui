import { useState } from 'react'
import styles from './TableSetting.module.css';
import Card from '../UI/Card';

function TableSetting(props){
    function rowCountChangeHandler(event){
        props.onRowCountChange(event.target.value);
    };

    function colCountChangeHandler(event){
        props.onColCountChange(event.target.value);
    };

    function onCellTypeChangeHandler(event){
        props.onCellTypeSelected(event.target.value);
    }

    return (
        <>
            <Card>
                <input 
                    type="radio"
                    value="RADIO_START" 
                    name="table-setting-radio"
                    defaultChecked
                    onChange={onCellTypeChangeHandler}/> Start
                <input 
                    type="radio"
                    value="RADIO_END" 
                    name="table-setting-radio"
                    onChange={onCellTypeChangeHandler}/> End
                <input 
                    type="radio"
                    value="RADIO_WALL" 
                    name="table-setting-radio"
                    onChange={onCellTypeChangeHandler}/> Wall
            </Card>
            <Card>
                <div>
                    <label>Number of Rows</label>
                    <input
                        type='number'
                        value={props.rowCount} 
                        min="1" 
                        max="50"
                        step="1" 
                        onChange={rowCountChangeHandler} 
                    />
                </div>
                <div>
                    <label>Number of Columns</label>
                    <input
                        type='number' 
                        value={props.colCount} 
                        min="1" 
                        max="50"
                        step="1" 
                        onChange={colCountChangeHandler} 
                    />
                </div>
            </Card>
        </>
    );
};

export default TableSetting;