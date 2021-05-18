import React from 'react';
import { Steps, Button, message } from 'antd';
//import './MaketProject.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
//import classes from '*.module.css';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { MaketProjectContext } from '../../context/ProjectMaket/MaketProjectContext';

const { Step } = Steps;


const useStyles = makeStyles((theme) => ({

    title: {

        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 10

    },

    stepsContent: {

        minHeight: '200px',
        marginTop: 20,
        marginRight: 20,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        border: '1px dashed #e9e9e9',
        borderRadius: '2px',
        verticalAlign: 'center'
    },


    stepsAktion: {

        marginTop: 20,
        marginLeft: 20,
        textAlign: 'center',
        backgroundColor: '#fafafa',
        justifyContent: 'left',
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

        width: 200,

    },

    select: {
        width: 240
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
        objectImage } = React.useContext(MaketProjectContext);

    console.log("objectImage", objectImage);

    const HendleChangeFild = (fildId, e) => {
        changeProjectField(fildId, e.target.value)
    }


    React.useEffect(() => {
        getProjects()
    }, []);


    const next = () => {
        setCurrent((pref) => {
            if (pref == stagesProject.length - 1)
                return pref
            else
                return current + 1
        }
        );
    };

    const prev = () => {
        setCurrent((pref) => {
            if (pref == 0)
                return 0
            else
                return current - 1
        }
        );
    };


    return (
        <>

            <Grid container spacing={0}>

                <Grid item xs={12} className={classes.title}>

                    <InputLabel htmlFor="grouped-native-select">Выберите вид продукции</InputLabel>
                    <Select native id="grouped-native-select" value={projectId} onChange={(event) => setProjectId(event.target.value)} className={classes.select}>

                        <option aria-label="None" value="" />

                        {projects.map((project) => (<option key={project.id} value={project.id}>{project.name}</option>))}
                    </Select>

                </Grid>

                <Grid item xs={4}>

                    <div className={classes.stepsAktion}>


                        <Steps direction="vertical" current={current}>
                            {stagesProject.map(item => (
                                <Step key={item.id} title={item.name} />
                            ))}
                        </Steps>

                        <Button className={classes.buttonPrev} onClick={() => prev()}>
                            Предыдущий
                           </Button>

                        <Button type="primary" className={classes.buttonNext} onClick={() => next()}>
                            Следующий
                        </Button>

                    </div>

                </Grid>

                <Grid item xs={8} >

                    <div className={classes.stepsContent}>


                        {filds.map((fild) => {

                            if (fild.type == 'select') {
                                return (<div key={fild.id}><InputLabel id={fild.id}>{fild.name}</InputLabel>
                                    <Select

                                        labelId={fild.id}
                                        id={fild.id + 'select'}
                                        value={objectImage[fild.id]}
                                        onChange={(e) => { HendleChangeFild(fild.id, e) }}
                                        className={classes.select}
                                    >

                                        {fild.selectValue.map((fildValue) =>

                                            (<MenuItem key={fildValue.value} value={fildValue.value}>{fildValue.representation}</MenuItem>))}



                                    </Select></div>)
                            } else {
                                return (<h5>хз что это!!!</h5>)
                            }

                        })}

                    </div>

                </Grid>

            </Grid>
        </>
    );


}

export default MaketProject;