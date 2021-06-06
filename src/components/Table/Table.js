import Cell from './Cell';

function Table(props){
    const rowCount = props.rowCount;
    const colCount = props.colCount;

    function GenerateRowsAndCells(){
        let rows = [];
        for (var r = 0; r< rowCount; r++){
            let rowId = `row-${r+1}`
            let cell = []
            for (var c=0; c<colCount;c++){
                let cellId = `cell-${r+1}-${c+1}`
                cell.push(<Cell key={cellId}></Cell>)
            }
            rows.push(<tr key={rowId}>{cell}</tr>)
        }

        return rows;
    }

    return (
        <table>
            <tbody>
                {GenerateRowsAndCells()}
            </tbody>
        </table>
    );
};

export default Table;