/* eslint-disable */
<template>
    <div class="header">
        <div class="cont-wrap">
            <div class="avatar">
                <img :src="seller.avatar" width="64" height="64" alt="">
            </div>
            <div class="cont">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description}}{{seller.deliveryTime}}
                </div>
                <div v-if="seller.supports" class="support">
                    <span class="icon" :class="classMap[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
            <div v-if="seller.supports" class="sup-count" @click="showCover">
                <span class="count">{{seller.supports.length}}</span>
                <i class="icon-keyboard_arrow_right"></i>
            </div>
        </div>
        <div class="bullet-wrap" @click="showCover">
            <span class="bullet-title"></span><span class="bullet-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
            <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade">
            <div v-show="coverShow" class="cover">
                <div class="cover-wrap clearfix">
                    <div class="cover-main">
                        <h1 class="name">{{seller.name}}</h1>
                        <div  class="star-wrap">
                            <star :size="48" :score="seller.score"></star>
                        </div>
                        <v-title title="优惠信息"></v-title>
                        <ul class="supports" v-if="seller.supports">
                            <li class="support-item" v-for="i in seller.supports">
                                <span class="icon" :class="classMap[i.type]"></span>
                                <span class="text">{{i.description}}</span>
                            </li>
                        </ul>
                        <v-title title="商家公告"></v-title>
                        <div class="bulletin">
                            <p class="content">{{seller.bulletin}}</p>
                        </div>
                    </div>
                </div>
                <div class="cover-close">
                    <i class="icon-close" @click="hideCover"></i>
                </div>
            </div>
        </transition>

    </div>
</template>

<script type="text/ecmascript-6">
    import star from '../star/star.vue';
    import title from '../title/title.vue';
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        created() {
            /* eslint-disable */
            this.classMap = ['decrease','discount','special','invoice','guarantee']
        },
        data() {
            return {
                coverShow : false
            }
        },
        methods : {
            showCover() {
                this.coverShow = true;
            },
            hideCover() {
                this.coverShow = false;
            }
        },
        components: {
            star,
            'v-title': title
        }
    };
</script>


<style lang="less" rel="stylesheet/less">
    @import "../../common/less/mixin";
    .header{
        position: relative;
        color: #fff;
        background: rgba(7,17,27,0.5);
        overflow: hidden;
        .cont-wrap{
            position: relative;
            padding: 24px 12px;
            font-size: 0;
            .avatar{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .cont{
                display: inline-block;
                margin-left: 16px;
                font-size: 14px;
                .title{
                    margin: 2px 0 8px 0;
                    .brand{
                        display: inline-block;
                        vertical-align: top;
                        width: 30px;
                        height: 18px;
                        .bgImage('brand');
                        background-size: 30px 18px;
                        background-repeat: no-repeat;
                    }
                    .name{
                        margin-left: 6px;
                        font-size: 16px;
                        line-height: 18px;
                        font-weight: bold;
                    }

                }
                .description{
                    margin-bottom: 10px;
                    line-height: 12px;
                    font-size: 12px;
                }
                .support{
                    .icon{
                        display: inline-block;
                        vertical-align: top;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 12px 12px;
                        &.decrease{
                            .bgImage('decrease_1')
                        }
                        &.discount{
                            .bgImage('discount_1')
                        }
                        &.guarantee{
                            .bgImage('guarantee_1')
                        }
                        &.invoice{
                            .bgImage('invoice_1')
                        }
                        &.special{
                            .bgImage('special_1')
                        }
                    }
                    .text{
                        vertical-align: top;
                        line-height: 12px;
                        font-size: 10px;
                    }
                }
            }
            .sup-count{
                position: absolute;
                right: 12px;
                bottom: 18px;
                padding: 0 8px;
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                background: rgba(0,0,0,0.2);
                text-align: center;
                .count{
                    font-size: 10px;
                    vertical-align: top;
                }
                .icon-keyboard_arrow_right{
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                }

            }
        }
        .bullet-wrap{
            position: relative;
            height: 28px;
            line-height: 28px;
            padding: 0 22px 0 12px;
            background: rgba(7,17,27,0.2);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            .bullet-title{
                display: inline-block;
                vertical-align: top;
                margin-top: 8px;
                width: 22px;
                height: 12px;
                .bgImage('bulletin');
                background-size: 22px 12px;
                background-repeat: no-repeat;
            }
            .bullet-text{
                vertical-align: top;
                margin: 0 4px;
                font-size: 10px;
            }
            .icon-keyboard_arrow_right{
                position: absolute;
                font-size: 10px;
                right: 12px;
                top: 8px;
            }
        }
        .background{
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            filter: blur(10px);
        }
        .cover{
            position: fixed;
            top: 0;
            left: 0;
            z-index: 100;
            width: 100%;
            height: 100%;
            overflow: auto;
            opacity: 1;
            background: rgba(7,17,27,0.8);
            transition: all 0.5s;
            -webkit-backdrop-filter: blur(10px);
            &.fade-enter,&.fade-leave-to{
                opacity: 0;
                background: rgba(7,17,27,0);
            }
            &.fade-enter-to,&.fade-leave{
                opacity: 1;
                background: rgba(7,17,27,0.8);
            }
            .cover-wrap{
                width: 100%;
                min-height: 100%;
                .cover-main{
                    margin-top: 64px;
                    padding-bottom: 64px;
                    .name{
                        line-height: 16px;
                        text-align: center;
                    }
                    .star-wrap{
                        margin-top: 18px;
                        padding: 2px 0;
                        text-align: center;
                    }
                    .supports{
                        width: 80%;
                        margin: 0 auto;
                        .support-item{
                            padding: 0 12px;
                            margin-bottom: 12px;
                            font-size: 0;
                            &:last-child{
                                margin-bottom: 0;
                            }
                            .icon{
                                display: inline-block;
                                width: 16px;
                                height: 16px;
                                vertical-align: top;
                                margin-right: 6px;
                                background-size: 16px 16px;
                                background-repeat: no-repeat;
                                &.decrease{
                                    .bgImage('decrease_2')
                                }
                                &.discount{
                                    .bgImage('discount_2')
                                }
                                &.guarantee{
                                    .bgImage('guarantee_2')
                                }
                                &.invoice{
                                    .bgImage('invoice_2')
                                }
                                &.special{
                                    .bgImage('special_2')
                                }
                            }
                            .text{
                                line-height: 16px;
                                font-size: 12px;
                            }
                        }
                    }
                    .bulletin{
                        width: 80%;
                        margin: 0 auto;
                        .content{
                            padding: 0 12px;
                            line-height: 24px;
                            font-size: 12px;
                        }
                    }
                }
            }
            .cover-close{
                position: relative;
                width: 32px;
                height: 32px;
                margin: -64px auto;
                clear: both;
                font-size: 32px;
            }
        }
    }
</style>
