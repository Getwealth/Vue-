<template>
  <div id="app">
    <div class="loading" v-show="ifShow">
      <div class="loading-box">
        <van-loading type="spinner" color="#1989fa" />
      </div>
    </div>
    <router-view/>
  </div>
</template>
<script>
  import store from './store/index'
  import {mapState} from 'vuex';
  export default {
    name:'app',
    store,
    computed:mapState({
      ifShow:state=>state.isShow
    })
  }
</script>
<style>
  .loading{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(230,160,160,0.3);
    z-index: 999;
  }
  .loading-box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
</style>
