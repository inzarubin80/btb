import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { executorRequests, getMaket, getImgMaket, saveFileСonfirmation, revisionMaket, сonfirmationMaket, saveTask, getFileTask } from '../../api/dataService1c';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { Descriptions } from 'antd';
import FilesTable from './FilesTable'
import ColorsTable from './ColorsTable'
import ParameterTable from './ParameterTable'
import TasksTable from './TasksTable'
import FormTask from './FormTask'
import Button from '@material-ui/core/Button';
import { green, blue, pink } from '@material-ui/core/colors';
import { approval } from './constants'
import 'antd/dist/antd.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
    withRouter
} from "react-router-dom";
import DoneIcon from '@material-ui/icons/Done';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import MuiAlert from '@material-ui/lab/Alert';
import Modal from '@material-ui/core/Modal';
import { useDispatch } from 'react-redux';
import { MaketCardContext } from '../../context/MaketCard/MaketCardContext';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 120
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        //fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },

    table: {
        minWidth: 10,
    },

    wrapperApproval: {
        margin: theme.spacing(1),
        position: 'relative',
        float: 'right'
    },
    buttonApproval: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
    },

    messageBox: {
        //margin: theme.spacing(2),
        position: 'absolute',
        top: '50%',
        left: '43%'

    },

    imageBox: {
        //margin: theme.spacing(2),
        //position: 'absolute',
        //marginTop:80000

    },

    margin: {
        marginTop: theme.spacing(1),
    },

    offset: theme.mixins.toolbar,

    wrapperReject: {
        margin: theme.spacing(1),
        position: 'relative',
        float: 'left'
    },

    buttonReject: {
        backgroundColor: blue,
        '&:hover': {
            backgroundColor: pink,
        },
    },

}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value != index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


const MaketCard = (props) => {

    const classes = useStyles();
    const [stateLoadingButton, setStateLoadingButton] = React.useState({ loading: [] });

    const [imgData, seIimgData] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([]);

    const { maket, switchTab, indexСurrentTab, taskEditingOpens, idTaskChange, taskChangeFiles, openChangeTask, editorState, openCard } = React.useContext(MaketCardContext);

    const dispatch = useDispatch();

    const theme = useTheme();


    const handleChange = (event, newValue) => {
        switchTab(newValue);
    };


    const hendlerStateLoadingButton = (buttonId, add) => {
        setStateLoadingButton((prevState) => {
            let state = { ...prevState };
            if (add) {
                state.loading = [...state.loading, buttonId]
            } else {
                state.loading = state.loading.filter((buttonIdInState) => { return (buttonIdInState != buttonId) })
            }

            return state;
        })
    }

    const handleChangeIndex = (index) => {
        switchTab(index);
    };

    React.useEffect(() => {
        openCard(props.match.params.id, dispatch)
    }, [props.match.params.id, dispatch]);


    return (
        <div style={{ textAlign: 'center', maxWidth: '50%', margin: 'auto', marginTop: 30 }}>

        </div>
    );
}

export default withRouter(MaketCard)