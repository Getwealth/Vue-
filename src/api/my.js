import instance from './axios';
function register(data) {
    return instance.post('api/users',data)
}
function changeValue(data) {
    return instance.get('api/users/12',{
        params:data
    })
}
function login(data) {
    return instance.post('api/login',data)
}
function userInfoGet() {
    return instance.get('api/login/12')
}
function listGet() {
    return instance.get('api/ordersType')
}
export {register,changeValue,login,userInfoGet,listGet}