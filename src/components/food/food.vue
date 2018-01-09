<template>
    <div v-show="showFlag" class="food">

    </div>
</template>

<script type="text/ecmascript-6">
    /* eslint-disable */
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false
        }
    }
};
</script>


<style lang="less" rel="stylesheet/less" scoped>
    .food{
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30;
        width: 100%;
        background: #fff;
    }
</style>
