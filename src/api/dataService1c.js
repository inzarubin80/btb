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