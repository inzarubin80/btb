import { API_URL, username, password } from '../Constants'
import { encode } from 'base-64'
import { logOut } from '../redux/user/userActions'
import axios from 'axios'

const auth = {auth: {username, password}} 

export const getToken = () => {
    return 'Basic ' + encode(username + ":" + password);
}

export const getMakets = (status) => {
    let body = getBody()
    return axios.post(`${API_URL}/?typerequest=getMakets&status=${status}`,  body,  auth);
}

export const getMaket = (id) => {
    let body = getBody()
    return axios.post(`${API_URL}/?typerequest=getMaket&id=${id}`,  body,  auth);
}

export const getListReports = (id) => {
    let body = getBody()
    return axios.post(`${API_URL}/?typerequest=getListReports`,  body,  auth);
}

export const setMaketStatus = (id, uidState) => {
    let body = getBody({ uidState });
    return axios.post(`${API_URL}/?typerequest=setMaketStatus&id=${id}`,  body,  auth);
}

export const getImgMaket = (id, fileName) => {
    let body = getBody()
    return axios.post(`${API_URL}/?typerequest=getImgMaket&id=${id}&fileName=${fileName}`,  body,  auth);
}

export const getFileTask = (id, uidTask, uidFile) => {
    let body = getBody()
    return axios.post(`${API_URL}/?typerequest=getFileTask&id=${id}&uidTask=${uidTask}&uidFile=${uidFile}`,  body,  auth);
}

export const saveFileСonfirmation = (id, fileName, shortfileName, fileBase64) => {
    let body = getBody({ fileBase64: fileBase64 })
    return axios.post(`${API_URL}/?typerequest=saveFileСonfirmation&id=${id}&fileName=${fileName}&shortfileName=${shortfileName}`,  body,  auth);
}

export const saveTask = (id, uid, number, taskText, taskFiles) => {


    console.log("taskFiles", taskFiles);

    let body = getBody({ taskText, uid, number, taskFiles })
    return axios.post(`${API_URL}/?typerequest=saveTask&id=${id}`,  body,  auth);
}

export const removeTask = (id, uid) => {
    let body = getBody({ uid })
    return axios.post(`${API_URL}/?typerequest=removeTask&id=${id}`,  body,  auth);
}


export const getReportHTML = (id) => {
    let body = getBody({ id: id })
    return axios.post(`${API_URL}/?typerequest=getReportHTML`,  body,  auth);
}

export const getProjectsMakets = () => {

    let body = getBody({})
    return axios.post(`${API_URL}/?typerequest=getProjectsMakets`,  body,  auth);

}

export const getProjectApi = (id, maketId) => {
    let body = getBody({ id, maketId })
    return axios.post(`${API_URL}/?typerequest=getProject`,  body,  auth);
}


export const nextStepProject = (idProject, currentStage, objectImage, progress, objectsRecipients) => {


    let objectImageR;

    if (objectImage.hasOwnProperty('files')) {
        objectImageR = { ...objectImage, files: objectImage.files.map(file => file.uid) };
    }
    else {
        objectImageR = objectImage;
    }

    let body = getBody({ idProject, currentStage, objectImage: objectImageR, progress, objectsRecipients })
    return axios.post(`${API_URL}/?typerequest=nextStepProject`,  body,  auth);

}

export const sendConformationCode = (userID, requestKey) => {
    let body = getBody({ userID, requestKey })
    return axios.post(`${API_URL}/?typerequest=sendConformationCode`,  body,  auth);
}

export const getAccessKey = (userID, requestKey, confirmationСode) => {
    let body = getBody({ userID, requestKey, confirmationСode })
    return axios.post(`${API_URL}/?typerequest=getAccessKey`,  body,  auth);
}

const getBody = (body = {}) => {
    body.key = localStorage.getItem('key');
    body.messageRecipientKey = localStorage.getItem('messageRecipientKey');
    return body
}

export const executorRequests = (functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch) => {
    functionRequest()
        .then(response => responseHandlingFunction(response.data))
        .catch((error) => {
             if (!error.response) {
                exceptionHandlingFunction("Проблема соединения")
            }  else if (error.request.status == 401) {
                   dispatch(logOut());
            }  else {
                exceptionHandlingFunction(error.response.data)
            }

        })

}

