<template>
<div class="item">
    <div class="left-img"><img :src="res.icon" v-if="!isDetail"></div>
    <div class="ball" :class="{detail:isDetail}">
        <div class="issue-time">
            <span class="name" v-if="!isDetail">{{res.title}}</span>
            <span class="issue">第{{res.qihao}}期</span>
            <span class="time" v-if="isDetail">{{res.time}}</span>
            <span class="btn" v-if="!isDetail">历史开奖 <i><x-icon type="ios-arrow-right" size="15"></x-icon></i></span>
        </div>
        <div class="ball-item-wrap">
            <div class="ball-item"><img :src="'/static/images/lotteryIcon/dice'+res.data.split(',')[0]+'@2x.png'"></div>
            <div class="ball-item"><img :src="'/static/images/lotteryIcon/dice'+res.data.split(',')[1]+'@2x.png'"></div>
            <div class="ball-item"><img :src="'/static/images/lotteryIcon/dice'+res.data.split(',')[2]+'@2x.png'"></div>
            <div class="text">总和:{{getBall()}},{{getBall()>=11?'大':'小'}},{{getBall()%2!=0?'单':'双'}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['isDetail','res'],
    methods:{
        getBall(){
            return this.res.data.split(',')[0]*1+this.res.data.split(',')[1]*1+this.res.data.split(',')[2]*1
        }
    }
}
</script>
<style lang="scss" scoped>
.item{
    padding:24px 30px 24px 35px;
    display: flex;
    background: #fff;
    border-bottom:1px solid #d2d2d2;
    .left-img{
        display: flex;
        align-items: center;
        >img{
            flex: 1;
            width:90px;
            height: 90px;
            margin-right:30px;
        }
    }
    .detail{
        width:100%!important;
    }
    .ball{
        width:calc(100% - 120px);
        .issue-time{
            height: 30px;
            line-height: 30px;
            margin-bottom:20px;
            overflow: hidden;
            .name,.issue{
                float: left;
            }
            .time,.btn{
                float: right;
                font-size: 22px;
                color:#999;
            }
            .name{
                font-size: 30px;
                color:#333;
                margin-right:20px;
            }
            .issue{
                font-size: 24px;
                color:#666;
                margin-right:20px;
            }
            .btn{
                >i{
                     margin-top:3px;
                    display: flex;
                    float: right;
                    width: 30px;
                    height: 30px;
                    justify-content: center;
                    align-items: center;
                    >svg{
                        fill: #999;
                    }
                }
            }
        }
        .ball-item-wrap{
            overflow: hidden;
            .ball-item{
                float: left;
                width:50px;
                height: 50px;
                margin-right:24px;
                background-size: 100% 100%;
                display: flex;
                justify-content: center;
                align-content: center;
                img{
                    width:100%;
                    height: 100%;
                }
            }
            >div:nth-child(3){
                margin-right:20px;
            }
            .text{
                float: left;
                font-size: 24px;
                color:#333;
                line-height: 50px;
            }
        }
    }
}
</style>

