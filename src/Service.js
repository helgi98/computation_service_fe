import axios from 'axios';
import * as Constants from "./Constants";
import $ from 'jquery';

const USERNAME = "username";
const PASSWORD = "password";
const USER = "user";

const TOKEN = "token";


export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function isAuthenticated() {
    return localStorage.getItem(TOKEN) != "null" && localStorage.getItem(TOKEN) != "undefined"
        && localStorage.getItem(TOKEN) != null && localStorage.getItem(TOKEN) != "";
}

export function getUser() {
    return JSON.parse(localStorage.getItem(USER));
}

export function saveUser(user) {
    localStorage.setItem(USER, JSON.stringify(user));
}

export function isAdmin() {
    try {
        return getUser().roles.find(r => r.toLowerCase() === "admin") != null;
    } catch (ex) {
        return false;
    }
}

function clearUserData() {
    localStorage.removeItem(USERNAME);
    localStorage.removeItem(PASSWORD);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER)
}

function checkToken(token, callback) {
    axios.get(Constants.BASE_URL + Constants.USER_INFO_URL, {headers: {Authorization: token}}).then(({data}) => {
        saveUser(data);

        callback();
    }).catch(err => {
        console.log(err);
        clearUserData();

        callback(err);
    });
}

/**
 * @param user user data
 * @param callback function that will be called when request is finished.
 * takes error as first argument, and server response as second
 */
export function signUp(user, callback) {
    axios.post(Constants.BASE_URL + Constants.SIGN_UP_URL, user).then(resp => {
        callback();
    }).catch(err => {
        console.log(err);
        callback(err)
    });
}

export function attemptLogin(creds, callback) {
    clearUserData();

    localStorage.setItem(USERNAME, creds.username);
    localStorage.setItem(PASSWORD, creds.password);

    login(callback);
}

/**
 * @param callback callback function that will be called when request is finished.
 * Takes an error object as the first argument
 */
export function login(callback) {
    let creds = {
        username: localStorage.getItem(USERNAME),
        password: localStorage.getItem(PASSWORD)
    };

    axios.post(Constants.BASE_URL + Constants.LOGIN_URL, creds).then(({data}) => {
        let token = data;
        localStorage.setItem(TOKEN, token);

        checkToken(token, callback);
    }).catch(err => {
        console.log(err);
        clearUserData();

        callback(err);
    });
}

export function addTask(textData, files, callback) {
    let fd = new FormData();
    fd.append("file", files[0]);
    fd.append("taskName", textData.taskName);
    fd.append("taskType", textData.taskType);

    axios.post(Constants.BASE_URL + "tasks", fd, {headers: {Authorization: getToken()}}).then(({data}) => {
        callback(null, data);
    }).catch(err => {
        if (err.message.endsWith("401")) {
            login(lerr => {
                if (lerr) {
                    callback(lerr);
                } else {
                    addTask(textData, files, callback);
                }
            })
        } else {
            callback(err);
        }
    })
}

export function loadTasks(callback) {
    axios.get(Constants.BASE_URL + "tasks", {headers: {Authorization: getToken()}}).then(({data}) => {
        callback(null, data);
    }).catch(err => {
        console.log(err);

        if (err.message.endsWith("401")) {
            login(lerr => {
                if (lerr) {
                    callback(lerr);
                } else {
                    loadTasks(callback);
                }
            })
        } else {
            callback(err);
        }
    })
}

export function getTaskStatus(taskId, callback) {
    axios.get(Constants.BASE_URL + "tasks/" + taskId + "/status", {headers: {Authorization: getToken()}}).then(({data}) => {
        callback(null, {status: Object.keys(data)[0], progress: data[Object.keys(data)[0]]});
    }).catch(err => {
        console.log(err);

        if (err.message.endsWith("401")) {
            login(lerr => {
                if (lerr) {
                    callback(lerr);
                } else {
                    getTaskStatus(taskId, callback);
                }
            })
        } else {
            callback(err);
        }
    })
}

export function killTask(taskId, callback) {
    axios.post(Constants.BASE_URL + "tasks/" + taskId + "/kill", {}, {headers: {Authorization: getToken()}}).then(({data}) => {
        callback(null, data);
    }).catch(({err}) => {
        console.log(err);

        if (err.message.endsWith("401")) {
            login(lerr => {
                if (lerr) {
                    callback(lerr);
                } else {
                    killTask(taskId, callback);
                }
            })
        } else {
            callback(err);
        }
    })
}

export function runTask(taskId, callback) {
    axios.post(Constants.BASE_URL + "tasks/" + taskId + "/run", {}, {headers: {Authorization: getToken()}}).then(({data}) => {
        callback(null, data);
    }).catch(({err}) => {
        console.log(err);

        if (err.message.endsWith("401")) {
            login(lerr => {
                if (lerr) {
                    callback(lerr);
                } else {
                    killTask(taskId, callback);
                }
            })
        } else {
            callback(err);
        }
    })
}

export function downloadTaskOutput(taskId) {
    window.open(Constants.BASE_URL + "tasks/" + taskId + "/result?access_token=" + encodeURIComponent(getToken()));
}


export function logout() {
    clearUserData();
}