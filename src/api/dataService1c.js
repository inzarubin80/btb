import { API_URL } from '../Constants'
import { encode } from 'base-64'

export const getToken = (username, password) => {
    return 'Basic ' + encode(username + ":" + password);
}

export const executeAuthenticationService = (token) => {
    return fetch(`${API_URL}/?typerequest=authenticate`,
        {
            method: 'get',
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json',
            })
        })
        ;
}

export const getMakets = (status) => {
    const config = getConfig('get')
    return fetch(`${API_URL}/?typerequest=getMakets&status=${status}`, config);
}

export const getMaket = (id) => {
    const config = getConfig('get')
    return fetch(`${API_URL}/?typerequest=getMaket&id=${id}`, config);
}

export const сonfirmationMaket = (id) => {
    const config = getConfig('post');
    config.body = JSON.stringify({});
    return fetch(`${API_URL}/?typerequest=confirmationMaket&id=${id}`, config);
}



export const getImgMaket = (id, fileName) => {
    const config = getConfig('get')
    return fetch(`${API_URL}/?typerequest=getImgMaket&id=${id}&fileName=${fileName}`, config);
}

export const saveFileСonfirmation = (id, fileName,  shortfileName, fileBase64) => {
   let config = getConfig('post')
    config.body = JSON.stringify({fileBase64:fileBase64});
    return fetch(`${API_URL}/?typerequest=saveFileСonfirmation&id=${id}&fileName=${fileName}&shortfileName=${shortfileName}`, config);
}

export const saveTask = (id, uid,  number, taskText) => {
    let config = getConfig('post')
    config.body = JSON.stringify({taskText:taskText, uid:uid, number:number});
    return fetch(`${API_URL}/?typerequest=saveTask&id=${id}`, config);
 }
 

const getConfig = (method) => {
    
    let token = localStorage.getItem('token') || null
    let config = {}
    if (!token) {
        throw "No token saved!"
    } else {
        config = {
            method: method,
            headers: new Headers({
                'Authorization': token,
                'Content-Type': 'application/json'
            })

        }
    }
    return config
}