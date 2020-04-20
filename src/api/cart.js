import instance from './axios';
function queryCart() {
    return instance.get('api/cart')
}
function insertCgoods(data) {
    return instance.post('api/cart',data)
}
function goodsMinus(data) {
    return instance.put('api/cart/12',data)
}
function stateChange(data) {
    return instance.post('api/cartOne',data)
}
function allStatechange(data) {
    return instance.put('api/cartOne/1',data)
}
function oneAdd(data) {
    return instance.get('api/cartOne/1/edit',{
        params:data
    })
}
function oneDel(id) {
    return instance.delete('api/cartOne/'+id);
}
export {queryCart,insertCgoods,goodsMinus,stateChange,allStatechange,oneAdd,oneDel}