import Card from '../UI/Card'

function TableStructureSetting(props){
    var maxRow = 50;
    var maxCol = 50;

    function rowCountChangeHandler(event){
        props.onRowCountChange(event.target.value);
    };

    function colCountChangeHandler(event){
        props.onColCountChange(event.target.value);
    };

    return (
        <Card>
            <div>
                <label>Number of Rows</label>
                <input
                    type='number'
                    value={props.rowCount} 
                    min="1" 
                    max={maxRow}
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
                    max={maxCol}
                    step="1" 
                    onChange={colCountChangeHandler} 
                />
            </div>
        </Card>
    );
};

export default TableStructureSetting