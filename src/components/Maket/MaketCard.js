import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { getMaket } from '../../api/dataService1c';
import { Descriptions } from 'antd';
import 'antd/dist/antd.css';

import {
  withRouter
} from "react-router-dom";


const useStyles = makeStyles({
  root: {
    minWidth: 120
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const MaketCard = (props) => {

  const classes = useStyles();
  const [maket, setMaket] = React.useState({});;

  //console.log("props MaketFullCard", props.match.params.id);

  React.useEffect(() => {

    getMaket(props.match.params.id)
      .then(response => response.json())
      .then((json) => {

        setMaket(json);
        console.log(json);

      })
      .catch((err) => {

        setMaket({});

      });

  }, []);

  console.log(maket);


  return (
    <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Макет №{maket.code}
          </Typography>

          <Descriptions layout="vertical" bordered >

            <Descriptions.Item label="Продукт">{maket.product}</Descriptions.Item>
            <Descriptions.Item label="Конечный потребитель">{maket.finalBuyer}</Descriptions.Item>


            <Descriptions.Item label="Основная информация" style={{ textAlign: 'left' }}>
              Вид оболочки: {maket.Shell}
              <br />
            Цветность: {maket.chromaticity}
              <br />
            Калибр/Ширина: {maket.caliber}
              <br />
            Тип печати: {maket.typPrinting}
              <br />
            </Descriptions.Item>

          </Descriptions>


        </CardContent>
      </Card>
    </div>
  );
}

export default withRouter(MaketCard)