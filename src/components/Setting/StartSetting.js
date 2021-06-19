import Button from '@material-ui/core/Button';
import Card from '../UI/Card';

const StartSetting = (props) => {
    const onStartVisualizationHandler = () => {
        props.startVisualization();
    };

    return (
        <Card>
            <Button variant='contained' color='primary' onClick={onStartVisualizationHandler}>Start Visualization!</Button>
        </Card>
    );
};

export default StartSetting;