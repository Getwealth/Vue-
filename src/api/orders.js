import instance from './axios';
function carateOrders() {
    return instance.post('api/orders')
}
function queryOrders(data) {
    return instance.get('api/orders/'+data);
}
function updateOrders(onum,data) {
    return instance.put('api/orders/'+onum,data)
}
function stateOnefind(state,obj) {
    return instance.get('api/ordersType/'+state,{
        params:obj
    })
}
export {carateOrders,queryOrders,updateOrders,stateOnefind}