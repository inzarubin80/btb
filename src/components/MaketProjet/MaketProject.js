import React from 'react';
import { Steps, Button, message } from 'antd';
//import './MaketProject.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
//import classes from '*.module.css';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import { MaketProjectContext } from '../../context/ProjectMaket/MaketProjectContext';

const { Step } = Steps;


const useStyles = makeStyles((theme) => ({

    title: {

        textAlign: 'center',
        justifyContent: 'center',
        marginTop:10

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

    }


}),
);



const steps = [
    
    {
        title: 'Выбор калибра',
        content: 'First-content',
        id: 'productSelection'
    },

    {
        title: 'Выбор типа оболочки',
        content: 'Second-content',
        id: 'productSelection'
    },

    {
        title: 'Выбор цвета оболочки',
        content: 'Last-content',
        id: 'productSelection'
    },
];

const MaketProject = () => {

    const [current, setCurrent] = React.useState(0);

    const classes = useStyles();


    const { message,  projects, projectsRequest,  getProjects} = React.useContext(MaketProjectContext);


    React.useEffect(() => {
        getProjects()
      }, []);

      
    const next = () => {
        setCurrent((pref) => {
            if (pref == steps.length - 1)
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


    function handleChange(value) {
        console.log(`selected ${value}`);
    }


    console.log("projects", projects);

    return (
        <>

            <Grid container spacing={0}>

                <Grid item xs={12} className={classes.title}>

                    <InputLabel htmlFor="grouped-native-select">Выберите вид продукции</InputLabel>
                    <Select defaultValue="" id="grouped-native-select">
                         {projects.map((project)=>( <option value={project.id}>{project.name}</option>))}
                    </Select>

                </Grid>

                <Grid item xs={4}>

                    <div className={classes.stepsAktion}>


                        <Steps direction="vertical" current={current}>
                            {steps.map(item => (
                                <Step key={item.title} title={item.title} />
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

                    </div>

                </Grid>

            </Grid>
        </>
    );


}

export default MaketProject;