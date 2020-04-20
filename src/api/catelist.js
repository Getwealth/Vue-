import instance from './axios';
function gsomeQuery(obj) {
    return instance.get('api/catelist',{
        params:obj
    });
}
function getAll() {
    return instance.get('category')
}
export {gsomeQuery,getAll}
