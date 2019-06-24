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
            <div class="ball-item" v-for="ele in res.data.split(',')" :class="'ball'+ele">{{ele}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['isDetail','res']
}
</script>
<style lang="scss" scoped>
.item{
    padding:24px 30px 24px 35px;
    display: flex;
    background: #fff;
    border-bottom:1px solid #d2d2d2;
    img{
        flex: 1;
        width:90px;
        height: 90px;
        margin-right:30px;
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
                    margin-top:2px;
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
                width:40px;
                height: 40px;
                line-height: 40px;
                border-radius: 5px;
                background: #d9342f;
                font-size: 22px;
                color:#fff;
                text-align: center;
                margin-right:4px;
            }
            .ball1{
                background: #d9342f;
            }
            .ball2{
                background: #fb6d05;
            }
            .ball3{
                background: #e9c402;
            }
            .ball4{
                background: #05ad5c;
            }
            .ball5{
                background: #3f8feb;
            }
            .ball6{
                background: #9966cc;
            }
            .ball7{
                background: #0064be;
            }
            .ball8{
                background: #b60b9b;
            }
            .ball9{
                background: #039393;
            }
            .ball10{
                background: #9d0202;
            }
        }
    }
}
</style>

