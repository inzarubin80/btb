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
import { login} from '../../redux/user/userActions';

import { getToken} from '../../api/dataService1c';

import { Alert, AlertTitle }  from '@material-ui/lab';




import {
  BrowserRouter as Router,
  useHistory,
  useLocation
} from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

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
  }));


const LoginPage = () => {


  const dispatch = useDispatch();
  const err = useSelector(state => state.user.err);


  
  let history = useHistory();
  let location = useLocation();
  
  let { from } = location.state || { from: { pathname: "/makets" } };

  const sb = () => {
    history.replace(from);
  }


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {

      dispatch(login(getToken(values.email, values.password), sb))

      },
  });

  const classes = useStyles();




  /*
  if (isLoggedIn) {
    history.replace(from);
  }
*/



  return (
  
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
        <TextField
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit">
          Войти
        </Button>

        {err&&<Alert severity="error">
         <AlertTitle>  {err}</AlertTitle>
        </Alert>}

      </form>
      </div>
    </Container>

  );
};


export default LoginPage

