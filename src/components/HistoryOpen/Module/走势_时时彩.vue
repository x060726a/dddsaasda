<template>
<div class="item-main">
    <div>{{res.qihao}}</div>
    <!-- 号码 -->
    <div v-if="newActive==0">
        <div class="ball-item" v-for="(ele,idx) in res.data.split(',')"><span>{{ele}}</span></div>
    </div>
    <!-- 号码 -->

    <!-- 大小 -->
    <div v-if="newActive==1">
        <div class="ball-item" v-for="(ele,idx) in res.data.split(',')"><span :class="{hui:ele*1<=4,hong:ele*1>=5}">{{ele*1<=4?'小':'大'}}</span></div>
    </div>
    <!-- 大小 -->

    <!-- 单双 -->
    <div v-if="newActive==2">
        <div class="ball-item" v-for="(ele,idx) in res.data.split(',')"><span :class="{hui:ele*1%2!=0,hong:ele*1%2==0}">{{ele*1%2!=0?'单':'双'}}</span></div>
    </div>
    <!-- 单双 -->

    <!-- 冠军龙虎 -->
    <div v-if="newActive==3" class="gjlh">
        <div class="ball">
            <span>{{res.data.split(',')[0]*1+res.data.split(',')[1]*1+res.data.split(',')[2]*1+res.data.split(',')[3]*1+res.data.split(',')[4]*1}}</span>
        </div>
        <div>
            <span :class="{hei:getBall()<=22,hong:getBall()>=23}">{{getBall()<=22?'小':'大'}}</span>
        </div>
        <div>
            <span :class="{hei:getBall()%2!=0,hong:getBall()%2==0}">{{getBall()%2!=0?'单':'双'}}</span>
        </div>
        <div><span>{{(res.data.split(',')[0]*1>res.data.split(',')[4]*1)?'龙':'虎'}}</span></div>
        <div>
            <span :class="{hong:getQiansan()=='顺子'||getQiansan()=='对子'}">{{getQiansan()}}</span>
        </div>
        <div>
            <span :class="{hong:getZhongsan()=='顺子'||getZhongsan()=='对子'}">{{getZhongsan()}}</span>
        </div>
        <div>
            <span :class="{hong:getHousan()=='顺子'||getHousan()=='对子'}">{{getHousan()}}</span>
        </div>
    </div>
    <!-- 冠军龙虎 -->
</div>
</template>
<script>
export default {
    data(){
        return{
            bonus:[],
        }
    },
    created(){
        var reg = '012345678901'
    },
    props:['res','idx'],
    computed:{
        newActive(){
            var num = 0;
            return this.idx + num
        }
    },
    methods:{
        //总和
        getBall(){
            return this.res.data.split(',')[0]*1+this.res.data.split(',')[1]*1+this.res.data.split(',')[2]*1+this.res.data.split(',')[3]*1+this.res.data.split(',')[4]*1
        },
        //前三
        getQiansan(){
            return this.centerChange(0,1,2)
        },
        //中三
        getZhongsan(){
            return this.centerChange(1,2,3)
        },
        //后三
        getHousan(){
            return this.centerChange(2,3,4)
        },
        centerChange(o,n,e){
            var that = this,reg = '012345678901',a = that.res.data.split(',')[o]*1,b = that.res.data.split(',')[n]*1,c = that.res.data.split(',')[e]*1,
                Arr = [that.res.data.split(',')[o],that.res.data.split(',')[n],that.res.data.split(',')[e]].sort(),
                Arr1 = [that.res.data.split(',')[o],that.res.data.split(',')[n]],
                Arr2 = 0;
            //豹子
            if(a*1==b*1&&b*1==c*1){
                return '豹子'
            }else{
                Arr2++
            }
            //顺子
            if(reg.indexOf(Arr.join(' '))>-1){
                return '顺子'
            }else{
                Arr2++
            }
            //对子
            if(a*1==b*1||b*1==c*1||a*1==c*1){
                return '对子'
            }else{
                Arr2++
            }
            //半顺
            if(reg.indexOf(Arr.join(''))==-1&&reg.indexOf(Arr1.join(''))>-1){
                return '半顺'
            }else{
                Arr2++
            }
            //杂六
            if(Arr2==4){
                return '杂六'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
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
        width:180px;
        overflow: hidden;
        font-size: 22px;
        // border-right:1px solid #d2d2d2;
    }
    >div:last-child{
        display: flex;
        width:calc(100% - 181px);
        >div{
            flex: 1;
        }
        .ball-item{
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            >span{
                width:42px;
                height: 42px;
                line-height: 42px;
                border-radius: 50%;
                text-align: center;
                display: block;
                font-size: 22px;
                background: #d9342f;
                color:#fff;
            }
            >span.hui{
                background: $bg-color;
                color:#333;
            }
        }
    }
    >div.gjlh{
        >div{
            span.hei{
                color:#333;
            }
            span.hong{
                color:$theme-color;
            }
        }
        >div:nth-child(1){
            color:#3f8feb;
        }
    }
}
</style>
