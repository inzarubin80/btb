import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


import { useDispatch, useSelector } from 'react-redux';
import { sendConfirmationСode, login, сlearError, cancelConformation } from '../../redux/user/userActions';


import { Alert, AlertTitle } from '@material-ui/lab';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';


import {
  useHistory,
  useLocation
} from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),

}

);

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    //border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  buttonConfirmation: {
    marginTop: theme.spacing(1),

  },

  buttonConfirmationGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },

    alert: {
      maxWidth: '12%'
    }

  }


}));


const LoginPage = () => {


  const dispatch = useDispatch();
  const err = useSelector(state => state.user.err);
  const confirmationСodeSent = useSelector(state => state.user.confirmationСodeSent);
  const confirmationСodeRequested = useSelector(state => state.user.confirmationСodeRequested);
  const loggingIn = useSelector(state => state.user.loggingIn);



  const [confirmationСode, setConfirmationСode] = React.useState('');


  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/makets" } };

  const sb = () => {
    history.replace(from);
  }


  const formik = useFormik({
    initialValues: {
      email: localStorage.getItem('userID') || '',

    },
    validationSchema: validationSchema,
    onSubmit: (values) => {


      console.log('openConformationCode');
      dispatch(sendConfirmationСode(values.email))



    },
  });

  const classes = useStyles();


  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={confirmationСodeSent}
        onClose={() => { }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={confirmationСodeSent}>
          <div className={classes.paperModal}>

            <TextField
              fullWidth
              id="confirmationСode"
              name="confirmationСode"
              label="Код подтверждения"
              value={confirmationСode}
              onChange={(event) => {

                setConfirmationСode(event.target.value);
                dispatch(сlearError());

              }}


            />

            {err && confirmationСodeSent && <Alert severity="error" className={classes.alert}>
              <AlertTitle>  {err}</AlertTitle>
            </Alert>}



            <div className={classes.buttonConfirmationGroup}>

              <Button disabled={loggingIn} className={classes.buttonConfirmation} color="primary" variant="contained" type="submit" onClick={() => dispatch(login(confirmationСode, sb))}>
                Подтвердить
              </Button>

              <Button disabled={loggingIn} variant="contained" color="secondary" onClick={() => { setConfirmationСode(''); dispatch(cancelConformation()) }}>
                Отмена
              </Button>
            </div>

          </div>
        </Fade>
      </Modal>


      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>

          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5">
            НПО СЛАВА
        </Typography>

          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Button color="primary" variant="contained" fullWidth type="submit" disabled={confirmationСodeRequested}>
              Войти
            </Button>


            {err && !confirmationСodeSent && <Alert severity="error">
              <AlertTitle>  {err}</AlertTitle>
            </Alert>}

          </form>
        </div>
      </Container>
    </div>
  );
};


export default LoginPage

