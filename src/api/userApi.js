    const BASE_URL = 'http://10.199.172.62:8081/api/v1';

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
        url:BASE_URL+'/users/logout/do-user',
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
        url:BASE_URL+'/pictures/do-user',
        method:'get'
    },
    uploadPhoto: {
        url:BASE_URL+'/pictures/upload/do-admin',
        method:'post'
    },
    savePicture: {
        url:BASE_URL+'/pictures/do-admin',
        method:'post',
    },
    saveModel:{
        url:BASE_URL+'/models/do-admin',
        method:'post',
    },
}
