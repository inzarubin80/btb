import React from 'react';
import { Steps, Button, message } from 'antd';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { MaketProjectContext } from '../../context/ProjectMaket/MaketProjectContext';
import NumberFormat from 'react-number-format';
import PropTypes from 'prop-types';
import AttachedFiles from '../AttachedFiles/AttachedFiles'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import HTMLEditor from '../Maket/HTMLEditor'
import { withRouter } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Autocomplete from '@material-ui/lab/Autocomplete';



const { Step } = Steps;
const useStyles = makeStyles((theme) => ({

    title: {

        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 10

    },

    stepsContent: {

        //  minHeight: '200px',
        marginTop: 20,
        // marginRight: 20,
        textAlign: 'center',
        // backgroundColor: '#fafafa',
        border: '1px dashed #e9e9e9',
        borderRadius: '2px',
        verticalAlign: 'center'
    },


    stepsAktion: {

        marginTop: 20,
        //marginLeft: 20,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        justifyContent: 'center',
    },

    buttonsAction: {
        marginTop: 10,
        textAlign: 'center',
        justifyContent: 'center',

    },

    buttonPrev: {
        margin: 5,
        width: 120
    },

    buttonNext: {

        margin: 5,
        width: 120
    },

    selectProd: {
        marginTop: 5,
        width: 200,

    },

    select: {
        width: 240
    },

    inputString: {
        width: '100%',
        marginTop: 10,

    },

    inputNumber: {
        marginTop: 10,
    },

    inputSelect: {
        marginTop: 10,

    },

    messageBox: {
        'position': 'absolute',
        'top': '0',
        'bottom': '0',
        'left': '0',
        'right': '0',
        'width': '50%',
        'height': '30%',
        'margin': 'auto',
    },


}),
);


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            //  thousandSeparator
            isNumericString
        // prefix="$"
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};


const MaketProject = (props) => {

    const classes = useStyles();
    const { message,
        projects,
        projectsRequest,
        getProjects,
        getProject,
        projectId,
        stagesProject,
        filds,
        changeProjectField,
        objectImage,
        nextStage,
        currentStage,
        addProjectFile,
        stageRequest,
        removeProjectFile,



    } = React.useContext(MaketProjectContext);




    const HendleChangeFild = (fildId, value) => {
        changeProjectField(fildId.trim(), value)
    }

    const fildIsVisible = (fild) => {


        if (!fild.visibilityСonditions.length) {
            return true;
        }

        for (let i = 0; i < fild.visibilityСonditions.length; i++) {
            if (objectImage[fild.visibilityСonditions[i].idFieldParent] == fild.visibilityСonditions[i].valueParent) {
                return true;
            }
        }
        return false;
    }

    React.useEffect(() => {
        if (props.match.params.id == 'new') {
            getProjects()
        } else {
            getProject("", props.match.params.id)

        }

    }, [props.match.params]);


    const next = () => {
        if (stagesProject.length - 1 >= currentStage && !stageRequest) {
            nextStage(true, props.history);
        }
    };

    const prev = () => {
        if (currentStage > 0 && !stageRequest) {
            nextStage(false, props.history);
        }
    };


    return (
        <>

            <Grid container spacing={0}>

                <Grid item xs={12} >
                    <Modal
                        open={message ? true : false}
                        onClose={() => { }}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >

                        <div className={classes.messageBox}>
                            {message && <Alert onClose={() => { message.clearMessage(message.uid) }} severity={message.type}>{message.str}</Alert>}
                        </div>
                    </Modal>
                </Grid>

                <Grid item xs={12} className={classes.title}>


                    {projects && <div>
                        <InputLabel htmlFor="grouped-native-select">Вид продукции</InputLabel>
                        <Select native id="grouped-native-select" value={projectId} onChange={(event) => getProject(event.target.value, props.match.params.id)} className={classes.selectProd}>

                            <option aria-label="None" value="" />

                            {projects.map((project) => (<option key={project.id} value={project.id}>{project.name}</option>))}
                        </Select>
                    </div>}
                </Grid>

                <Grid item xs={3} />
                <Grid item xs={6}>
                    <div className={classes.stepsAktion}>
                        <Steps current={currentStage}>
                            {stagesProject.map(item => (
                                <Step key={item.id} title={item.name} />
                            ))}
                        </Steps>
                    </div>
                </Grid>

                <Grid item xs={3} />
                <Grid item xs={1} />
                <Grid item xs={10} >


                    <div className={classes.buttonsAction}>

                        {stageRequest && <CircularProgress />}

                        {!stageRequest &&
                            <div>
                                <Button className={classes.buttonPrev} onClick={() => prev()}>
                                    Предыдущий
                            </Button>

                                <Button type="primary" className={classes.buttonNext} onClick={() => next()}>
                                    {stagesProject.length - 1 == currentStage ? 'Записать' : 'Следующий'}
                                </Button>
                            </div>
                        }

                    </div>

                    <div className={classes.stepsContent}>

                        {filds.map((fild) => {


                            if (!fildIsVisible(fild)) {
                                return (<div key={fild.id} />)

                            } else if (fild.type == 'inputSelect') {
                                return (<div key={fild.id} className={classes.inputSelect}><InputLabel id={fild.id} className={classes.fild} >{fild.name}</InputLabel>
                                    <Select
                                        autoWidth={true}

                                        labelId={fild.id}
                                        id={fild.id + 'select'}
                                        value={objectImage[fild.id]}
                                        onChange={(e) => { HendleChangeFild(fild.id, e.target.value) }}

                                    >

                                        {fild.selectValue.map((fildValue) =>

                                            (<MenuItem key={fildValue.value} value={fildValue.value}>{fildValue.representation}</MenuItem>))}

                                    </Select>
                                </div>)
                            } else if (fild.type == 'inputNumber') {
                                return (<div key={fild.id}>

                                    <TextField
                                        id={fild.id}
                                        label={fild.name}
                                        value={objectImage[fild.id]}
                                        rows={1}
                                        className={classes.inputNumber}
                                        name="numberformat"
                                        onChange={(e) => { HendleChangeFild(fild.id, e.target.value) }}
                                        InputProps={{
                                            inputComponent: NumberFormatCustom,
                                        }}

                                    />

                                </div>)
                            } else if (fild.type == 'inputString') {
                                return (<div key={fild.id}>

                                    <TextField
                                        id={fild.id}
                                        label={fild.name}
                                        multiline
                                        value={objectImage[fild.id]}
                                        rows={fild.rows}
                                        className={classes.inputString}
                                        //  defaultValue="Default Value"
                                        onChange={(e) => { HendleChangeFild(fild.id, e.target.value) }}

                                    />

                                </div>)

                            } else if (fild.type == 'inputStringEndSelect') {
                                return (<div key={fild.id}>


                                    <Autocomplete
                                        id={fild.id}
                                       // value={objectImage[fild.id]}
                                        freeSolo
                                       //onChange={(e) => { HendleChangeFild(fild.id, e.target.value) }}
                                       //onChange={(e) => { HendleChangeFild(fild.id, e.target.value) }}
                                       
                                        
                                       options={fild.selectValue.map((option) => option.value)}
                                        renderInput={(params) => (
                                            <TextField {...params} label={fild.name} margin="normal" variant="outlined" />
                                        )}
                                    />



                                </div>)

                            } else if (fild.type == 'inputBoolean') {
                                return (<div key={fild.id}>

                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={objectImage[fild.id]}
                                                onChange={(e) => HendleChangeFild(fild.id, e.target.checked)}
                                                name={fild.name}
                                                color="primary"
                                            />
                                        }
                                        label={fild.name}
                                    />

                                </div>)
                            } else if (fild.type == 'inputFiles') {
                                return (<div key={fild.id}>

                                    <AttachedFiles files={objectImage[fild.id]} removeFile={removeProjectFile} addFile={addProjectFile} />

                                </div>)
                            } else if (fild.type == 'htmlText') {
                                return (<div key={fild.id}>
                                    <FormControlLabel
                                        labelPlacement='top'
                                        control={
                                            <HTMLEditor editorState={objectImage[fild.id]} setEditorState={(newState) => { HendleChangeFild(fild.id, newState) }} />
                                        }
                                        label={fild.name}
                                    />

                                </div>)
                            }

                            else {
                                return (<h5>не известный вид поля...!!!</h5>)
                            }

                        })}



                    </div>






                </Grid>

                <Grid item xs={1} />



            </Grid>
        </>
    );


}


export default withRouter(MaketProject)