import axios from 'axios'

const address = 'http://localhost:3001/persons/'

const getData = () => axios.get(address).then(res => res.data)

const postData = data => axios.post(address, data).then(res => res)

const delData = id => axios.delete(`${address}${id}`).then((res,req)=> res)

const changeData = (id, data) => axios.put(`${address}${id}`, data).then(res => res)

export { getData, postData, delData, changeData }