<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab borderOne">
      <div class="tab-item"><router-link to="goods">商品</router-link></div>
      <div class="tab-item"><router-link to="ratings">评论</router-link></div>
      <div class="tab-item"><router-link to="seller">商家</router-link></div>
    </div>
    <keep-alive><router-view :seller="seller" ></router-view></keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
  /* eslint-disable */
    import header from './components/header/header.vue';
    import {urlParse} from './common/js/util';
    export default {
        data() {
            return {
                seller: {
                  id: (() => {
                    let queryParam = urlParse();
                    return queryParam.id;
                  })()
                }
            }
        },
        created() {
                this.$http.get('http://localhost:3000/seller?id=' + this.seller.id).then((res) => {
                    if(res){
                        this.seller = Object.assign({},this.seller,res.data);
                    }
                });
        },
        components: {
          'v-header': header
        }
    };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./common/less/index";
#app{
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7,17,27,0.1));
    .tab-item {
      flex : 1;
      text-align: center;
      &>a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
        &.active{
          color: rgb(240,20,20);
        }
      }
    }
  }
}

</style>
