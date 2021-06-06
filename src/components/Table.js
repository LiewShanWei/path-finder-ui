import Cell from './Cell';

function Table(props){
    const rowCount = props.rowCount;
    const colCount = props.colCount;

    function GenerateRowsAndCells(){
        let rows = [];
        for (var r = 0; r< rowCount; r++){
          let cell = []
          for (var c=0; c<colCount;c++){
            let cellID = `cell${r+1}-${c+1}`
            cell.push(<Cell key={cellID}></Cell>)
          }
          rows.push(<tr>{cell}</tr>)
        }

        return rows;
    }

    return (
        <table>
            {GenerateRowsAndCells()}
        </table>
    );
};

export default Table;