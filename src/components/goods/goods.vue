<template>
  <div>
    <div class="goods">
      <div class="menu-wrap" ref="menuWrap">
        <ul>
          <li v-for="(i,index) in goods" class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index)">
                    <span class="text borderOne">
                        <span v-show="i.type>0" class="icon" :class="classMap[i.type]"></span>{{i.name}}
                    </span>
          </li>
        </ul>
      </div>
      <div class="foods-wrap" ref="foodsWrap">
        <ul>
          <li v-for="i in goods" class="foods-list foods-list-hock">
            <h1 class="title">{{ i.name}}</h1>
            <ul>
              <li v-for="j in i.foods" class="food-item borderOne" @click="selectFood(j,$event)">
                <div class="icon"><img :src="j.icon" alt="" width="57" height="57"></div>
                <div class="content">
                  <h2 class="name">{{j.name}}</h2>
                  <p class="desc">{{j.description}}</p>
                  <div class="extra">
                    <span class="count">月销售{{j.sellCount}}份</span><span>好评率{{j.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{j.price}}</span><span class="old" v-show="j.oldPrice">￥{{j.oldPrice}}</span>
                  </div>
                  <div class="carControl-wrap">
                    <carControl :food="j"></carControl>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shopCar ref="shopCar" :select-foods ='selectFoods' :deliveryPrice="seller.deliveryPrice" :min-price="seller.minPrice"></shopCar>
    </div>
    <food :food="selectedFood" ref="food"></food>
  </div>

</template>

<script type="text/ecmascript-6">
    /* eslint-disable */

    import BScroll from 'better-scroll';
    import shopCar from '../shopcar/shopcar.vue'
    import carControl from '../carControl/carControl.vue'
    import food from '../food/food.vue'
    import Vue from 'vue'
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [],
                scrollY: 0,
                selectedFood: {}
            }
        },
        computed: {
            currentIndex() {
                for(let i=0;i<this.listHeight.length;i++){
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i+1];
                    if(!height2 || this.scrollY >= height1 && this.scrollY < height2) {
                        return i;
                    }
                }
                return 1;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {
                        if(food.count){
                            foods.push(food);
                        }
                    })
                });
                return foods;
            }
        },
        created() {
            this.$http.get('http://localhost:3000/goods').then((res) => {
                if(res){
                    this.goods = res.data;
                    this.$nextTick(()=>{
                        this.initScroll();
                        this.calculateHeight();
                    });
                }
            });
            this.classMap = ['decrease','discount','special','invoice','guarantee'];
        },
        methods: {
            initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrap, {
                    click: true
                });
                this.foodScroll = new BScroll(this.$refs.foodsWrap,{
                    probeType: 3,
                    click: true
                });
                this.foodScroll.on('scroll',(pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });

            },
            calculateHeight() {
                let foodList = this.$refs.foodsWrap.getElementsByClassName('foods-list-hock');
                let height = 0;
                this.listHeight.push(height);
                for(let i=0;i<foodList.length;i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            },
            selectMenu(index) {
                let foodList = this.$refs.foodsWrap.getElementsByClassName('foods-list-hock');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el,300);
            },
            addCar(target) {
                this.$refs.shopCar.drop(target);
            },
          selectFood(j,event) {
              this.selectedFood = j;
              this.$refs.food.show();
          }
        },
        components: {
            shopCar,
            carControl,
            food
        }
    };
</script>


<style lang="less" rel="stylesheet/less" scoped>
    @import "../../common/less/mixin";
    .goods{
        display: flex;
        position: absolute;
        top: 180px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
        .menu-wrap{
            flex: 0 0 80px;
            width: 80px;
            background: #f3f5f7;
            .menu-item{
                display: table;
                width: 56px;
                height: 54px;
                line-height: 14px;
                padding: 0 12px;
                &.current{
                    position: relative;
                    z-index: 10;
                    margin-top: -1px;
                    background-color: rgba(0,0,0,0.5);
                    font-weight: 700;
                    .text{
                        border: none;
                    }
                }
                .icon{
                    display: inline-block;
                    vertical-align: top;
                    width: 12px;
                    height: 12px;
                    margin-right: 4px;
                    background-size: 12px 12px;
                    &.decrease{
                        .bgImage('decrease_3')
                    }
                    &.discount{
                        .bgImage('discount_3')
                    }
                    &.guarantee{
                        .bgImage('guarantee_3')
                    }
                    &.invoice{
                        .bgImage('invoice_3')
                    }
                    &.special{
                        .bgImage('special_3')
                    }
                }
                .text{
                    display: table-cell;
                    width: 56px;
                    vertical-align: middle;
                    .border-1px(rgba(7,17,27,0.1));
                    font-size: 12px;
                }
            }
        }
        .foods-wrap{
            flex: 1;
            .title{
                padding-left: 14px;
                height: 26px;
                line-height: 26px;
                border-left: 2px solid #d9dde1;
                font-size: 12px;
                color: rgb(147,153,159);
                background-color: #f3f5f7;
            }
            .food-item{
                display: flex;
                margin: 18px;
                padding-bottom: 18px;
                .border-1px(rgba(7,17,27,0.1));
                &:last-child{
                    .border-none();
                    margin-bottom: 0;
                }
                .icon{
                    flex: 0 0 57px;
                    margin-right: 10px;
                }
                .content{
                    flex: 1;
                    .name{
                        margin: 2px 0 8px 0;
                        height: 14px;
                        line-height: 14px;
                        font-size: 14px;
                        color: rgb(7,17,27);
                    }
                    .desc,.extra{
                        line-height: 10px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                    }
                    .desc{
                        margin-bottom: 8px;
                        line-height: 12px;
                    }
                    .extra{
                        .count{
                            margin-right: 12px;
                        }
                    }
                    .price{
                        font-weight: 700;
                        line-height: 24px;
                        .now{
                            margin-right: 8px;
                            font-size: 14px;
                            color: rgb(240,20,20);
                        }
                        .old{
                         text-decoration: line-through;
                            font-size: 10px;
                            color: rgb(147,153,159);
                        }
                    }
                    .carControl-wrap{
                        position: absolute;
                        right: 0;
                        bottom: 12px;

                    }
                }
            }
        }
    }
</style>
