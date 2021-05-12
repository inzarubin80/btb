import React from 'react';
import { Steps, Button, message } from 'antd';
import './MaketProject.css';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import classes from '*.module.css';

const { Step } = Steps;




const steps = [
    {
        title: 'Выбор вида продукции',
        content: 'First-content',
    },
    {
        title: 'Выбор макета основания',
        content: 'Second-content',
    },
    {
        title: 'Заполненние параметров макета',
        content: 'Last-content',
    },
];

const MaketProject = () => {

    const [current, setCurrent] = React.useState(0);


    const useStyles = makeStyles((theme) => ({

        title: {
         textAlign:'center'
          
        }

    }),
);


    const next = () => {
        setCurrent((pref) => {
            if (pref == 2)
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

                <Grid item xs={12} >
                    <h4 className={classes.title}>Создание нового макета</h4>
                </Grid>

                <Grid item xs={6} >

                    <Steps direction="vertical" current={current}>
                        {steps.map(item => (
                            <Step key={item.title} title={item.title} />
                        ))}
                    </Steps>


                    <div className="steps-action">


                        <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                            Предыдущий
                        </Button>

                        <Button type="primary" onClick={() => next()}>
                            Следующий
                        </Button>


                    </div>

                </Grid>

                <Grid item xs={6} >

                    <div className="steps-content">{steps[current].content}</div>

                </Grid>

            </Grid>
        </>
    );


}

export default MaketProject;