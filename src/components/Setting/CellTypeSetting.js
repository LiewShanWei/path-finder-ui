import React , { useState, useEffect } from 'react';
import Card from '../UI/Card';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const CellTypeSetting = (props) => {
    const [currentSelectedCellType, setCurrentSelectedCellType] = useState(props.currentSelectedCellType);

    useEffect(() => {
        props.onSelectCellType(currentSelectedCellType);
    }, [currentSelectedCellType])

    const onSelectCellTypeHandler = (event) => {
        setCurrentSelectedCellType( event.target.value);
    };
    
    return (
        <Card>
             <FormControl component="fieldset">
                <FormLabel component="legend">Select a Cell Type</FormLabel>
                <RadioGroup aria-label="celltype" name="celltype" value={currentSelectedCellType} onChange={onSelectCellTypeHandler}>
                    <FormControlLabel value="start" control={<Radio />} label="Start" />
                    <FormControlLabel value="end" control={<Radio />} label="End" />
                    <FormControlLabel value="wall" control={<Radio />} label="Wall" />
                    <FormControlLabel value="clear" control={<Radio />} label="Clear" />
                </RadioGroup>
            </FormControl>
        </Card>
    );
};

export default CellTypeSetting;