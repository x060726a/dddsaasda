<template>
<div class="recharge-content">
    <TrayHeader :title="title" />
    <div class="content">
        <div class="block2">
            <tab class="my-tab" :line-width="2" active-color="#D9342F" custom-bar-width="70px">
                <tab-item selected @on-item-click="onItemClick">线上充值</tab-item>
                <tab-item @on-item-click="onItemClick">线下充值</tab-item>
            </tab>
            <transition name="left" tag="div">
                <div class="list" v-if="rechargeActive==0">
                    <div class="item" v-for="ele in res['online']" @click="goPayment(0,ele)"><img :src="ele.icon"><span>{{ele.name}}</span><i></i></div>
                </div>
            </transition>
            <transition name="right" tag="div">
                <div class="list" v-if="rechargeActive==1">
                    <div class="item" v-for="ele in res['underline']" @click="goPayment(1,ele)"><img :src="ele.icon"><span>{{ele.name}}</span><i></i></div>
                </div>
            </transition>
        </div>
    </div>
</div>
</template>
<script>
const TrayHeader = import('../../public/rn-header')
export default {
    components: {
        TrayHeader () {
            return {
                component: TrayHeader
            }
        }
    },
    data(){
        return{
            title: '充值',
            moneyNum:0,
            money:null,
            rechargeActive:-1,
            payType:0,
            res:[]
        }
    },
    watch:{
        moneyNum(val,oval){
            if(val!=0){
                this.money = val*10
            }
        }
    },
    created(){
        var that = this
        setTimeout(()=>{
            that.rechargeActive = 0
        },10)
        this.paymentType();
    },
    methods:{
        onItemClick(index){
            this.rechargeActive = index
        },
        change(value){
            if(typeof value=='string'){
                this.moneyNum = 0;
            }
            this.money = value*1
        },
        paymentType(){
            var that = this
            that.$get('payments',{}).then(res=>{
                if(res.code==0){
                    that.res = res.data
                }
            })
        },
        goPayment(index,obj){
            var that = this
            console.log(obj);
            that.$router.push({path:'/rechargeNext',query:{type:index,list:JSON.stringify(obj.list)}})
        }
    },
}
</script>
<style lang="scss" scoped>
.recharge-content{
    height: 100%;
    background: #f3f3f3;
    .content{
        height: calc(100% - 88px);
        .block1{
            background: #fff;
            padding: 23px 30px 41px 30px;
            font-size: 28px;
            color:#999;
            line-height: 25px;
            margin-bottom:24px;
            .group-btn{
                margin-top:40px;
                overflow: hidden;
                div{
                    border: 1px solid #D2D2D2;
                    border-radius: 6px;
                    float: left;
                    width:217px;
                    height: 80px;
                    line-height: 76px;
                    text-align: center;
                    font-size: 30px;
                    margin-right:19px;
                    margin-bottom:18px;
                }
                div.active{
                    background: #D9342F;
                    border: 1px solid #D9342F;
                    color:#fff;
                }
                div:nth-child(3n){
                    margin-right:0;
                }
                div:nth-child(4),div:nth-child(5),div:nth-child(6){
                    margin-bottom:0;
                }
            }
        }
        .block2{
            margin-bottom:60px;
            height: 100%;
            .my-tab{
                padding-top:100px;
                .vux-tab-container{
                    height: 100px;
                }
                .vux-tab-item{
                    height: 100px;
                    line-height: 100px;
                    font-size: 30px;
                }
            }
            .list{
                height: calc(100% - 118px);
                background: #f3f3f3;
                margin-top:20px;
                border-top:1px solid #d2d2d2;
                overflow-y: auto;
                -webkit-overflow-scrolling: touch;
                .item{
                    background: #fff;
                    padding-left:30px;
                    padding-right:30px;
                    height: 120px;
                    line-height: 120px;
                    font-size: 0;
                    position: relative;
                    border-bottom: 1px solid #D2D2D2;
                    img{
                        width:60px;
                        height: 60px;
                        margin-right:30px;
                        margin-top:30px;
                        float: left;
                    }
                    img.yinlian{
                        width:66px;
                        height: 41px;
                        margin-right:34px;
                        margin-top:40px;
                    }
                    span{
                        float: left;
                        font-size: 28px;
                        color: #333333;
                        letter-spacing: 0;
                    }
                    i{
                        display: block;
                        float: right;
                        width: 18px;
                        height: 32px;
                        background: url('~@/assets/image/system/back_light@3x.png') no-repeat;
                        background-size: 100%;
                        margin-top:40px;
                    }
                }
            }
        }
        .xy-btn{
            margin: auto;
            border-radius: 6px;
            width:650px;
            height: 110px;
            line-height: 110px;
            text-align: center;
            color:#fff;
            background: #D9342F;
            font-size: 34px;
        }
    }
}
.left-enter-active, .left-leave-active {
    opacity: 1;
    transition: all .5s;
    position: absolute;
    width:100%;
}
.left-enter, .left-leave-to{
    opacity: 0;
    transform: translateX(-100%);
}
.right-enter-active, .right-leave-active {
    opacity: 1;
    transition: all .5s;
    position: absolute;
    width:100%;
}
.right-enter, .right-leave-to{
    opacity: 0;
    transform: translateX(100%);
}
</style>

