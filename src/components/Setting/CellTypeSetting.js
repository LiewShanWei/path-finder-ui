
import Card from '../UI/Card';

function CellTypeSetting(props){
    function onCellTypeSettingChangeHandler(event){
        props.onCellTypeSettingChange(event.target.value);
    }

    return (
        <Card>
            <input 
                type="radio"
                value="RADIO_START" 
                name="table-setting-radio"
                defaultChecked
                onChange={onCellTypeSettingChangeHandler}/> Start
            <input 
                type="radio"
                value="RADIO_END" 
                name="table-setting-radio"
                onChange={onCellTypeSettingChangeHandler}/> End
            <input 
                type="radio"
                value="RADIO_WALL" 
                name="table-setting-radio"
                onChange={onCellTypeSettingChangeHandler}/> Wall
        </Card>
    );
}

export default CellTypeSetting