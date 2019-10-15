import axios from 'axios';

export function addUser(request) {
    console.log('request',request);
    return axios.post('/users/salaries', request);
}


export function deleteAll() {
    return axios.delete('/users/salaries');
}


export const updateUser = (user) => {
    return axios.put('/users/salaries', user).then(value => value.data);
};

export const getUsers = () => {
    return axios.get('/users/salaries').then(value => value.data);
};