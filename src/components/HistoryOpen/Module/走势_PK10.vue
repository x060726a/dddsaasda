<template>
<div class="item-main">
    <div>{{res.qihao}}</div>
    <!-- 号码 -->
    <div v-if="newActive==0">
        <div class="ball-item" v-for="(ele,idx) in res.data.split(',')"><span :class="'ball'+ele*1">{{ele}}</span></div>
    </div>
    <!-- 号码 -->

    <!-- 大小 -->
    <div v-if="newActive==1">
        <div class="ball-item" v-for="(ele,idx) in res.data.split(',')"><span :class="{hui:ele*1<=5,hong:ele*1>=6}">{{ele*1<=5?'小':'大'}}</span></div>
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
            <span>{{res.data.split(',')[0]}}</span>
        </div>
        <div>
            <span :class="{hei:res.data.split(',')[0]*1<=5,hong:res.data.split(',')[0]*1>=6}">{{res.data.split(',')[0]*1<=5?'小':'大'}}</span>
        </div>
        <div>
            <span :class="{hei:res.data.split(',')[0]*1%2!=0,hong:res.data.split(',')[0]*1%2==0}">{{res.data.split(',')[0]*1%2!=0?'单':'双'}}</span>
        </div>
        <div>
            <div><span :class="{long:res.data.split(',')[0]*1>res.data.split(',')[9]*1}">{{(res.data.split(',')[0]*1>res.data.split(',')[9]*1)?'龙':'虎'}}</span></div>
            <div><span :class="{long:res.data.split(',')[1]*1>res.data.split(',')[8]*1}">{{(res.data.split(',')[0]*1>res.data.split(',')[9]*1)?'龙':'虎'}}</span></div>
            <div><span :class="{long:res.data.split(',')[2]*1>res.data.split(',')[7]*1}">{{(res.data.split(',')[2]*1>res.data.split(',')[7]*1)?'龙':'虎'}}</span></div>
            <div><span :class="{long:res.data.split(',')[3]*1>res.data.split(',')[6]*1}">{{(res.data.split(',')[3]*1>res.data.split(',')[6]*1)?'龙':'虎'}}</span></div>
            <div><span :class="{long:res.data.split(',')[4]*1>res.data.split(',')[5]*1}">{{(res.data.split(',')[4]*1>res.data.split(',')[5]*1)?'龙':'虎'}}</span></div>
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
    props:['res','idx'],
    computed:{
        newActive(){
            var num = 0;
            return this.idx + num
        }
    },
    methods:{

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
        width: 180px;
        overflow: hidden;
        font-size: 22px;
        // border-right:1px solid #d2d2d2;
    }
    >div:last-child{
        display: flex;
        width:calc(100% - 180px);
        padding-right: 30px;
        padding-left:30px;
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
                border-radius: 5px;
                text-align: center;
                display: block;
                font-size: 22px;
                color:#fff;
            }
            >span.ball1{
                background: #d9342f;
            }
            >span.ball2{
                background: #fb6d05;
            }
            >span.ball3{
                background: #e9c402;
            }
            >span.ball4{
                background: #05ad5c;
            }
            >span.ball5{
                background: #3f8feb;
            }
            >span.ball6{
                background: #9966cc;
            }
            >span.ball7{
                background: #0064be;
            }
            >span.ball8{
                background: #b60b9b;
            }
            >span.ball9{
                background: #039393;
            }
            >span.ball10{
                background: #9d0202;
            }
            >span.hong{
                background: #d9342f;
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
        >div:nth-child(4){
            display: flex; flex: 4;
            >div{
                margin: 19px 6px 0 0;
                >span{
                    display: block;
                    width:42px;
                    height: 42px;
                    line-height: 42px;
                    border-radius: 5px;
                    text-align: center;
                    background: $bg-color;
                    color:#333;
                }
                >span.long{
                    background: $theme-color;
                    color:#fff;
                }
            }
            >div:nth-child(1) { padding-left: 45px; }
        }
    }
}
</style>
