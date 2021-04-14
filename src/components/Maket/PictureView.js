import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Image } from 'antd';

import { getImgMaket } from '../../api/dataService1c';
import CircularProgress from '@material-ui/core/CircularProgress';

import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({

}));

const PictureView = (props) => {

  const [imgData, seIimgData] = React.useState(null);

  
  React.useEffect(() => {

    props.hendlerStateFile(props.fileName, 'opens', true);

    getImgMaket(props.macetCode, props.fileName)
      .then(response => response.json())
      .then((json) => {

        props.hendlerStateFile(props.fileName, 'opens', false);
        seIimgData(json.file);

      })
      .catch((err) => {

        props.hendlerStateFile(props.fileName, 'opens', false);

        seIimgData(null);


      });

  }, []);



//  console.log('imgData', imgData);

  const classes = useStyles();

  return (
    <div style={{ backgroundSize: 'cover%' }}>

      {imgData && <IconButton aria-label="close" color="primary" onClick={() => { props.handleClose() }} />}
      {imgData && <img src={`data:image/jpeg;base64,${imgData.imgBase64}`} style={{ backgroundSize: 'cover', height: 639, width: 'auto' }} />}

    </div>
  );
}

export default PictureView