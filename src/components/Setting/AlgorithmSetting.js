import Card from '../UI/Card';

function AlgorithmSetting(props){
    function onAlgorithmSelectionHandler(event){
        props.onAlgorithmSelection(event.target.value);
    };
    
    return(
        <Card>
            <label>Select a visualization algorithm: </label>
            <select 
                onChange={onAlgorithmSelectionHandler}>
                <option value="BFS">Breadth First Search</option>
                <option value="DFS">Depth First Search</option>
            </select>
        </Card>
    );
};

export default AlgorithmSetting;