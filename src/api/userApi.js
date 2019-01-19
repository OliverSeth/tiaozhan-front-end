const BASE_URL = 'http://106.12.123.92:8081/api/v1/users'

export default {
    login:{
        url:BASE_URL+'/login',
        method:'put'
    },
    logout:{
        url:BASE_URL+'/do-user',
        method:'put'
    }
}