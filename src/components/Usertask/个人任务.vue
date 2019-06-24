<template>
<div class="result">
    <transition :name="$store.state.taskTransitionName" tag="div">
        <!-- <ITEM v-for="(item,key,index) in list" :item="item" :index="key" :key="key"/> -->
        <div class="content" v-show="show">
            <h1><i></i><span>活动规则说明</span></h1>
            <div class="text">
                <h1>完成以下任意任务即可参加与平台常规任务和每日签到活动：</h1>
                <p>1.当天累计充值达<em>{{res.user_deposit_coin_limit}}</em>元，当前累计充值<em>{{res.user_deposit_coin}}</em>元，还差<em>{{res.user_deposit_need*1}}</em>元</p>
                <p>2.当天累计投注达<em>{{res.user_bets_coin_limit}}</em>元，当前累计投注<em>{{res.user_bets_coin}}</em>元，还差<em>{{res.user_bets_need*1}}</em>元</p>
            </div>
        </div>
    </transition>
</div>
</template>
<script>
const item = import('@/components/Usertask/item')
export default {
    data(){
        return{
            show:false,
        }
    },
    props:['res'],
    created(){
        var that = this
        setTimeout(()=>{
            that.show = true
        },20)
    },
    components:{
        ITEM(){
            return {
                component:item,
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.content{
    position: relative;
    background: #fff;
    >h1{
        height: 80px;
        line-height: 80px;
        padding-left:30px;
        font-size: 28px;
        color:#000;
        border-bottom:1px solid #d2d2d2;
        i,span{
            display: inline-block;
            vertical-align: middle;
        }
        i{
            width:33px;
            height: 33px;
            background: url('~@/assets/image/system/icon-help-info_fill@2x.png') no-repeat;
            background-size: 100% 100%;
            margin-right:20px;
        }
    }
    .text{
        padding:30px;
        >h1{
            font-size: 28px;
            color:#333;
        }
        >p{
            margin-top:20px;
            font-size: 26px;
            color:#666;
            line-height: 40px;
            >em{
                color:$theme-color;
            }
        }
        >p:nth-child(3){
            margin-top:0;
        }
    }
}
</style>
