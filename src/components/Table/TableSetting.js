import { useState } from 'react'
import styles from './TableSetting.module.css';
import Card from '../UI/Card';

function TableSetting(props){
    const [enteredRowCount,setEnteredRowCount] = useState(props.rowCount);
    const [enteredColCount,setEnteredColCount] = useState(props.colCount);

    function rowCountChangeHandler(event){
        setEnteredRowCount(event.target.value);
        props.onRowCountChange(enteredRowCount);
    };

    function colCountChangeHandler(event){
        setEnteredColCount(event.target.value);
        props.onColCountChange(enteredColCount);
    };

    return (
        <>
            <Card>
                <input 
                    type="radio"
                    value="RADIO_START" 
                    name="table-setting-radio"/> Start
                <input 
                    type="radio"
                    value="RADIO_END" 
                    name="table-setting-radio"/> End
                <input 
                    type="radio"
                    value="RADIO_WALL" 
                    name="table-setting-radio"/> Wall
            </Card>
            <Card>
                <div>
                    <label>Number of Rows</label>
                    <input
                        type='number' 
                        value={enteredRowCount}
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
                        value={enteredColCount}
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