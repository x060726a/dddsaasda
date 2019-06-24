<template>
<div class="main">
    <div class="title">代理详情</div>
    <div class="block"><span>注册人数：</span><span>{{res.reg_num}}人</span></div>
    <div class="block"><span>登录人数：</span><span>{{res.login_num}}人</span></div>
    <div class="block"><span>团队人数：</span><span>{{res.team_num}}人</span></div>
    <div class="block"><span>首存人数：</span><span>{{res.first_deposit_num}}人</span></div>
    <div class="block"><span>首存总额：</span><span>{{res.first_deposit_amount}}元</span></div>
    <div class="block"><span>入款总额：</span><span>{{res.deposit}}元</span></div>
    <div class="block"><span>出款总额：</span><span>{{res.withdrawal}}元</span></div>
    <div class="block"><span>投注总额：</span><span>{{res.bets}}元</span></div>
    <div class="block"><span>团队返水：</span><span>{{res.fandian}}元</span></div>
    <div class="block"><span>优惠活动：</span><span>{{res.promotion}}元</span></div>
    <div class="block"><span>团队盈亏：</span><span>{{res.profit}}元</span></div>
</div>
</template>
<script>
export default {
    props:['res'],
}
</script>
<style lang="scss" scoped>
.main{
    .time-label{
        padding-bottom:16px;
        padding-left:20px;
        font-size: 22px;
        color: #999999;
        line-height: 30px;
    }
    .title,.block{
        padding-left:45px;
        text-align: left;
        height: 80px;
        line-height: 80px;
        background: #fff;
        font-size: 28px;
        color: #333333;
        position: relative;
        border-bottom: 1px solid #D2D2D2;
    }
    .title::before{
        content:'';
        display: block;
        position: absolute;
        top: 22px;
        left: 20px;
        width:6px;
        height: 36px;
        background: $theme-color;
    }
    .block:last-child{
        border-bottom:none;
    }
    .block{
        padding-left:30px;
        span{
            em{
                display: inline-block;
                width:51px;
            }
        }
        span:first-child{
            font-size: 26px;
            color: #333333;
        }
        span:last-child{
            font-size: 26px;
            color: #666666;
        }
    }
}
</style>
