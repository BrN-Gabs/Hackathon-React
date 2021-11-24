import axios from 'axios'

const api = axios.create({
    baseURL: 'http://react.professorburnes.com.br'
})

export default api