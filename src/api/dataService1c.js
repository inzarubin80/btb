import { API_URL, username, password } from '../Constants'
import { encode } from 'base-64'
import { logOut } from '../redux/user/userActions'


export const getToken = () => {
    return 'Basic ' + encode(username + ":" + password);
}

export const getMakets = (status) => {
    const config = getConfig()
    return fetch(`${API_URL}/?typerequest=getMakets&status=${status}`, config);
}

export const getMaket = (id) => {
    const config = getConfig()
    return fetch(`${API_URL}/?typerequest=getMaket&id=${id}`, config);
}

export const сonfirmationMaket = (id) => {
    const config = getConfig();
    return fetch(`${API_URL}/?typerequest=confirmationMaket&id=${id}`, config);
}

export const revisionMaket = (id) => {
    const config = getConfig();
    return fetch(`${API_URL}/?typerequest=revisionMaket&id=${id}`, config);
}


export const getImgMaket = (id, fileName) => {
    const config = getConfig()
    return fetch(`${API_URL}/?typerequest=getImgMaket&id=${id}&fileName=${fileName}`, config);
}

export const getFileTask = (id, uidTask, uidFile) => {
    const config = getConfig()
    return fetch(`${API_URL}/?typerequest=getFileTask&id=${id}&uidTask=${uidTask}&uidFile=${uidFile}`, config);
}

export const saveFileСonfirmation = (id, fileName, shortfileName, fileBase64) => {
    let config = getConfig({ fileBase64: fileBase64 })
    return fetch(`${API_URL}/?typerequest=saveFileСonfirmation&id=${id}&fileName=${fileName}&shortfileName=${shortfileName}`, config);
}

export const saveTask = (id, uid, number, taskText, taskFiles) => {
    let config = getConfig({ taskText, uid, number, taskFiles })
    return fetch(`${API_URL}/?typerequest=saveTask&id=${id}`, config);
}

export const removeTask = (id, uid) => {
    let config = getConfig({ uid })
    return fetch(`${API_URL}/?typerequest=removeTask&id=${id}`, config);
}

export const sendConformationCode = (userID, requestKey) => {
    let config = getConfig({ userID, requestKey })
    return fetch(`${API_URL}/?typerequest=sendConformationCode`, config);
}

export const getAccessKey = (userID, requestKey, confirmationСode) => {
    let config = getConfig({ userID, requestKey, confirmationСode })
    return fetch(`${API_URL}/?typerequest=getAccessKey`, config);
}

const getConfig = (body = {}) => {

    body.key = localStorage.getItem('key');
    let config = {
        method: 'post',
        headers: new Headers({
            'Authorization': getToken(),
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(body)
    }


    return config
}


export const executorRequests = (functionRequest, responseHandlingFunction, exceptionHandlingFunction, dispatch) => {
    functionRequest().catch()
        .then(response => {
            if (response.status == 200) {
                return response.json();
            }
            else {
                return response.status;
            }
        }
        ).then((dataResponse) => {

            if (Number.isInteger(dataResponse)) {
                if (dataResponse == 401) {
                    dispatch(logOut())
                } else {
                    exceptionHandlingFunction("Что то пошло нет так...")
                }
            } else {
                responseHandlingFunction(dataResponse)
            }

        })
        .catch((e) => {

            if (e.message == 'Failed to fetch') {
                exceptionHandlingFunction("Проблема соединения")
            } else {
                exceptionHandlingFunction("Что то пошло нет так...")
            }


        })

}