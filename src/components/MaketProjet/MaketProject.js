import React from 'react';
import { Steps, Button, message } from 'antd';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { MaketProjectContext } from '../../context/ProjectMaket/MaketProjectContext';


import AttachedFiles from '../AttachedFiles/AttachedFiles'

import TextField from '@material-ui/core/TextField';

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
        backgroundColor: '#fafafa',
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
        width: '80%'



    },

    fild: {
        margin: 10
    }


}),
);


const MaketProject = () => {

    const [current, setCurrent] = React.useState(0);
    const classes = useStyles();
    const { message,
        projects,
        projectsRequest,
        getProjects,
        setProjectId,
        projectId,
        stagesProject,
        filds,
        changeProjectField,
        objectImage,
        nextStage,
        currentStage,
        addProjectFile,
        removeProjectFile

    } = React.useContext(MaketProjectContext);

    console.log("objectImage", objectImage);

    const HendleChangeFild = (fildId, e) => {
        changeProjectField(fildId, e.target.value)
    }




    React.useEffect(() => {
        getProjects()
    }, []);


    const next = () => {
        if (stagesProject.length - 1 > currentStage && !projectsRequest) {
            nextStage(true);
        }
    };

    const prev = () => {
        if (currentStage > 0 && !projectsRequest) {
            nextStage(false);
        }
    };


    return (
        <>

            <Grid container spacing={0}>

                <Grid item xs={12} className={classes.title}>

                    <InputLabel htmlFor="grouped-native-select">Вид продукции</InputLabel>
                    <Select native id="grouped-native-select" value={projectId} onChange={(event) => setProjectId(event.target.value)} className={classes.selectProd}>

                        <option aria-label="None" value="" />

                        {projects.map((project) => (<option key={project.id} value={project.id}>{project.name}</option>))}
                    </Select>

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

                    <div className={classes.stepsContent}>

                        {filds.map((fild) => {
                            if (fild.type == 'inputSelect') {
                                return (<div key={fild.id}><InputLabel id={fild.id} className={classes.fild} >{fild.name}</InputLabel>
                                    <Select

                                        labelId={fild.id}
                                        id={fild.id + 'select'}
                                        value={objectImage[fild.id]}
                                        onChange={(e) => { HendleChangeFild(fild.id, e) }}
                                        className={classes.fild}
                                    >

                                        {fild.selectValue.map((fildValue) =>

                                            (<MenuItem key={fildValue.value} value={fildValue.value}>{fildValue.representation}</MenuItem>))}

                                    </Select>
                                </div>)
                            } else if (fild.type == 'inputString') {
                                return (<div key={fild.id}>

                                    <TextField
                                        id={fild.id}
                                        label={fild.name}
                                        multiline
                                        value={objectImage[fild.id]}
                                        rows={2}
                                        className={classes.inputString}
                                        defaultValue="Default Value"
                                        onChange={(e) => { HendleChangeFild(fild.id, e) }}

                                    />

                                </div>)
                            } else if (fild.type == 'inputFiles') {
                                return (<div key={fild.id}>

                                    <AttachedFiles files={objectImage[fild.id]} removeFile={removeProjectFile} addFile={addProjectFile} />

                                </div>)
                            }


                            else {
                                return (<h5>не известный вид поля...!!!</h5>)
                            }

                        })}



                    </div>


                    <div className={classes.buttonsAction}>
                        <Button className={classes.buttonPrev} onClick={() => prev()}>
                            Предыдущий
                           </Button>

                        <Button type="primary" className={classes.buttonNext} onClick={() => next()}>
                            Следующий
                        </Button>
                    </div>



                </Grid>

                <Grid item xs={1} />



            </Grid>
        </>
    );


}

export default MaketProject;