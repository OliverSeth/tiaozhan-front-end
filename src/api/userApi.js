const BASE_URL = 'http://106.12.123.92:8081/api/v1';

export default {
    login:{
        url:BASE_URL+'/users/login',
        method:'put'
    },
    register:{
        url:BASE_URL+'/users/register',
        method:'post'
    },
    logout:{
        url:BASE_URL+'/users/do-user',
        method:'put'
    },
    addMachine:{
        url:BASE_URL+'/devices/do-admin',
        method:'post'
    },
    getMachines:{
        url:BASE_URL+'/devices/do-user',
        method:'get'
    },
    // removeMachine:{
    //     url:BASE_URL+'/devices/'+'/do-admin',
    //     method:'delete'
    // }
    // addModels:{
    //     url:
    // }
    getPhotos:{
        url:BASE_URL+'/pictures',
        method:'get'
    },
    uploadPhoto: {
        url:BASE_URL+'/pictures/upload/do-admin',
        method:'post'
    },
}
