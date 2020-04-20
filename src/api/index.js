import instance from './axios';
function querygoods() {
   return  instance.get('api/index')
}
function queryOneGoods(gid) {
    return instance.get('goods/'+gid)
}
function historyStore(gid) {
    return instance.post('api/goodshistory',gid)
}
export {querygoods,queryOneGoods,historyStore}