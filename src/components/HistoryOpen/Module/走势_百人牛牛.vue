<template>
<div class="item-main" v-if="res.info">
    <div>{{res.qihao}}</div>
    <div>
        <div :class="{'lan':res.win=='蓝方胜','hong':res.win=='红方胜'}">{{res.win}}</div>
        <div>{{calcNiu(res.info.split(','))}}</div>
        <div>
            <span v-if="niuLH(res.info.split(','))=='龙'" class="long">{{niuLH(res.info.split(','))}}</span>
            <span v-if="niuLH(res.info.split(','))=='虎'" class="hu">{{niuLH(res.info.split(','))}}</span>
        </div>
    </div>
</div>
</template>
<script>
import {calFormat} from  '@/assets/js/util.js'
export default {
    data(){
        return{
            bonus:[]
        }
    },
    props:['res'],
    methods:{
        // 牛牛算法
        calcNiu (val) {
            let arr = []
            val.some(res => {
                arr.push(res.split('_')[0])
            })
            return calFormat(arr)
        },
        //
        niuLH (val) {
            let num1 = val[0].split('_')[0], num2 = val[4].split('_')[0], flower1 = val[0].split('_')[1],  flower2 = val[4].split('_')[1], value = ''
            switch (num1) {
                case 'J':
                    num1 = 11
                    break;
                case 'Q':
                    num1 = 12
                    break;
                case 'K':
                    num1 = 13
                    break;
            }
            switch (num2) {
                case 'J':
                    num2 = 11
                    break;
                case 'Q':
                    num2 = 12
                    break;
                case 'K':
                    num2 = 13
                    break;
            }
            if (Number(num1) > Number(num2) || (Number(num1) == Number(num2) && Number(flower1) < Number(flower2))) {
                return '龙'
            } else {
                return '虎'
            }
        },
        //龙湖和 大龙  小虎
        getLhh(arr){
            console.log(arr)
            var strF = arr[0].substring(0,arr[0].indexOf('_')),strL = arr[4].substring(0,arr[4].indexOf('_')),stepF,stepL;
            switch (strF) {
                case 'J':
                    stepF = 11
                    break;
                case 'Q':
                    stepF = 12
                    break;
                case 'K':
                    stepF = 13
                    break;
                default:
                    stepF = strF*1
                    break;
            }
            switch (strL) {
                case 'J':
                    stepL = 11
                    break;
                case 'Q':
                    stepL = 12
                    break;
                case 'K':
                    stepL = 13
                    break;
                default:
                    stepL = strL*1
                    break;
            }
            if(stepF>stepL){
                return '龙'
            }
            if(stepF<stepL){
                return '虎'
            }
            if(stepF==stepL){
                return '和'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.lan{
    color:#3f8feb;
}
.hong{
    color:#d9342f;
}
.item-main{
    border-bottom:1px solid #d2d2d2;
    background: #fff;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color:#666;
    >div{
        float: left;
        color: #3f8feb;
        font-size: 24px;
        height: 80px;
    }
    >div:first-child{
        width:300px;
        overflow: hidden;
        font-size: 22px;
        // border-right:1px solid #d2d2d2;
    }
    >div:last-child{
        display: flex;
        width:calc(100% - 300px);
        >div{
            flex: 1;
        }
        >div:nth-child(3){
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                display: block;
                width: 42px;
                height: 42px;
                line-height: 42px;
                color: #fff;
                border-radius: 5px;
            }
            span.long{
                background: $theme-color;
            }
            span.hu{
                background: $bg-color;
                color:#333;
            }
            span.he{
                background: #05ad5c;
                color:#fff;
            }
        }
    }
}
</style>
