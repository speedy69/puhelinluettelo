import axios from 'axios'

const address = 'https://sleepy-citadel-32763.herokuapp.com/api/persons/'

const getData = () => axios.get(address).then(res => res.data)

const postData = data => axios.post(address, data).then(res => res)

const delData = id => axios.delete(`${address}${id}`).then((res,req)=> res)

const changeData = data => axios.put(address, data).then(res => res)

export { getData, postData, delData, changeData }