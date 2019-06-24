<template>
<div class="item-main">
    <div>{{res.qihao}}</div>
    <!-- 号码 -->
    <div v-if="newActive==0">
        <div v-for="(ele,idx) in res.data.split(',')" v-if="idx<=5" class="ball-sx">
            <span><em :class="{hong:ballcolor['红'].indexOf(ele*1)>-1,lan:ballcolor['蓝'].indexOf(ele*1)>-1,lv:ballcolor['绿'].indexOf(ele*1)>-1}">{{ele}}</em></span>
            <span>{{res.info.split(',')[idx]}}</span>
        </div>
        <div class="ball-sx jiahao">
            <span><i></i></span>
            <span></span>
        </div>
        <div class="ball-sx">
            <span><em :class="{
                tehong:ballcolor['红'].indexOf(res.data.split(',')[6]*1)>-1,
                telan:ballcolor['蓝'].indexOf(res.data.split(',')[6]*1)>-1,
                telv:ballcolor['绿'].indexOf(res.data.split(',')[6]*1)>-1
                }">{{res.data.split(',')[6]}}</em></span>
            <span>{{res.info.split(',')[6]}}</span>
        </div>
    </div>
    <!-- 号码 -->

    <!-- 总和 -->
    <div v-if="newActive==1">
        <div style="color:#3f8feb">{{getTotalBall()}}</div>
        <div class="dx"><span :class="{active:getTotalBall()%2==0}">{{getTotalBall()%2!=0?'单':'双'}}</span></div>
        <div class="dx"><span :class="{active:getTotalBall()>=175}">{{getTotalBall()>=175?'大':'小'}}</span></div>
        <div v-if="ballcolor['红'].indexOf(res.data.split(',')[6]*1)>-1" class="hong">红波</div>
        <div v-if="ballcolor['蓝'].indexOf(res.data.split(',')[6]*1)>-1" class="lan">蓝波</div>
        <div v-if="ballcolor['绿'].indexOf(res.data.split(',')[6]*1)>-1" class="lv">绿波</div>
    </div>
    <!-- 总和 -->

    <!-- 色波 -->
    <div v-if="newActive==2">
        <div style="color:#3f8feb">{{res.data.split(',')[6]}}</div>
        <div class="dx"><span :class="{active:res.data.split(',')[6]%2==0}">{{res.data.split(',')[6]%2!=0?'单':'双'}}</span></div>
        <div class="dx"><span :class="{active:res.data.split(',')[6]>=25}">{{res.data.split(',')[6]>=25?'大':'小'}}</span></div>
        <div>{{res.info.split(',')[6]}}</div>
        <div v-if="ballcolor['红'].indexOf(res.data.split(',')[6]*1)>-1" class="hong">红波</div>
        <div v-if="ballcolor['蓝'].indexOf(res.data.split(',')[6]*1)>-1" class="lan">蓝波</div>
        <div v-if="ballcolor['绿'].indexOf(res.data.split(',')[6]*1)>-1" class="lv">绿波</div>
    </div>
    <!-- 色波 -->
</div>
</template>
<script>
export default {
    data(){
        return{
            bonus:[],
            ballcolor:{
                '红':[1,2,7,8,12,13,18,19,23,24,29,30,34,35,40,45,46],
                '蓝':[3,4,9,10,14,15,20,25,26,31,36,37,41,42,47,48],
                '绿':[5,6,11,16,17,21,22,27,28,32,33,38,39,43,44,49]
            }
        }
    },
    created(){

    },
    props:['res','idx'],
    computed:{
        newActive(){
            var num = 0;
            return this.idx + num
        }
    },
    methods:{
        getTotalBall(){
            var num = 0;
            this.res.data.split(',').forEach(ele => {
                num = num + ele*1
            });
            return num
        }
    }
}
</script>
<style lang="scss" scoped>
.item-main{
    border-bottom:1px solid #d2d2d2;
    background: #fff;
    height: 100px;
    line-height: 100px;
    text-align: center;
    color:#666;
    >div{
        float: left;
        color: #3f8feb;
        font-size: 24px;
        height: 100px;
    }
    >div:first-child{
        width:200px;
        overflow: hidden;
        font-size: 22px;
        // border-right:1px solid #d2d2d2;
    }
    >div:last-child{
        display: flex;
        width:calc(100% - 200px);
        padding-right: 30px;
        padding-left: 30px;
        >div{
            flex: 1;
        }
        >div.ball-sx{
            span{
                display: block;
            }
            span:first-child{
                padding-top:10px;
                height: 60px;
                em{
                    display: block;
                    width:42px;
                    height: 42px;
                    line-height: 40px;
                    margin: auto;
                    border-radius: 50%;
                }
                .hong{
                    border: $theme-color 1px solid;
                    color:$theme-color;
                }
                .lan{
                    border: 1px solid #3f8feb;
                    color:#3f8feb;
                }
                .lv{
                    border: 1px solid #05ad5c;
                    color:#05ad5c;
                }
                .tehong{
                    line-height: 42px;
                    background: $theme-color;
                    color:#fff;
                }
                .telan{
                    line-height: 42px;
                    background: #3f8feb;
                    color: #fff;
                }
                .telv{
                    line-height: 42px;
                    background:#05ad5c;
                    color: #fff;
                }
            }
            span:last-child{
                height: 40px;
                line-height: 40px;
            }
        }
        >div.jiahao{
            flex: 0.5;
            i{
                display: block;
                width:40px;
                height: 40px;
                margin: auto;
                background: url("~@/assets/image/system/icon-add@2x.png") center no-repeat;
                background-size: 70% 70%;
            }
        }
        >div.dx{
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                width:42px;
                height: 42px;
                font-size: 22px;
                line-height: 42px;
                color:#333;
                border-radius: 50%;
            }
            .active{
                background: $theme-color;
                color:#fff
            }
        }
        >div.hong{
            color:$theme-color;
        }
        >div.lan{
            color:#3f8feb;
        }
        >div.lv{
            color:#05ad5c;
        }
    }
}
</style>
