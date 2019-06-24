<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$router.push({path:'/manage'})"></i>
        <div class="title"><span>提现</span></div>
    </div>
    <div class="content">
        <div class="top">
            <div class="block">
                <div><i class="icon-username"></i><div>用户名：{{userinfo.nickname}}</div></div>
                <div><div>账户余额：{{userinfo.coin*1+userinfo.fcoin*1}}元</div><i class="icon-money"></i></div>
            </div>
            <div class="animate-wrap">
                <div class="bankcard">
                    <h1 v-if="banklist.length>0">{{banklist[0].bank_name}}</h1>
                    <h2 v-if="banklist.length>0"><span>{{tihuanFirst(banklist[0].bank_account)}}</span><i></i><span>****</span><i></i><span>****</span><i></i><span>****</span><i></i>{{tihuanLast(banklist[0].bank_account)}}</h2>
                    <p v-if="banklist.length>0">限额：单笔最低100元，最高100000000元</p>
                    <span v-if="banklist.length==0">请先绑定银行卡</span>
                </div>
            </div>
        </div>
        <div class="center">
            <div class="label">提现金额（最低100元）</div>
            <div class="input-item"><span>￥</span><input type="number" v-model="money" placeholder="请输入提现金额"></div>
            <div class="block">
                <span v-if="money*1<userinfo.coin*1">可提现金额:{{userinfo.coin*1}}元</span>
                <span v-if="money*1>userinfo.coin*1" class="red">金额已超过可提现余额</span>
                <span @click="money=userinfo.coin*1">全部提现</span>
            </div>
        </div>
        <div class="btn" @click="getWithdrawal">立即提交</div>
        <PAWDALOG v-if="isShowP" :money="money" @done="getPas" @close="closeZJP"/>
    </div>
</div>
</template>
<script>
import { mapState } from 'Vuex'
export default {
    data(){
        return{
            banklist:[],
            money:0,
            isShowP:false,
            pas:'',
            coinPwd: null, // 是否设置资金密码
        }
    },
    computed:{
        ...mapState(['userinfo'])
    },
    async created(){
        let res = await this.$root.getuserInfo(), _this = this
        this.coinPwd = res.data.isset_coin_pwd
        if(!this.coinPwd){
            this.$vux.confirm.show({
                title:'温馨提示',
                content:'请先设置资金密码',
                onConfirm () {
                    _this.$router.push({path:'/setmoneypaw'})
                }
            })
        }
        this.getBanklist();
    },
    methods:{
        getBanklist(){
            this.$get('bankcard',{}).then(res=>{
                if(res.code==0){
                    this.banklist = res.data
                }
            })
        },
        getPas(value){
            this.pas = value
            this.sendWhttp();
        },
        getWithdrawal(){
            if(!this.coinPwd){
                let _this = this
                return this.$vux.confirm.show({
                    title:'温馨提示',
                    content:'请先设置资金密码',
                    onConfirm () {
                        _this.$router.push({path:'/setmoneypaw'})
                    }
                })
            }
            if(this.money*1>this.userinfo.coin*1){
                this.$vux.confirm.show({
                    title:'温馨提示',
                    content:'已超过可提现金额',
                    showCancelButton:false,
                })
                return;
            }
            if(this.banklist.length==0){
                this.$vux.confirm.show({
                    title:'温馨提示',
                    content:'请先绑定银行卡',
                    onConfirm:()=>{
                        this.$router.push({path:'/band-bankcard'})
                    }
                })
                return;
            }
            if(this.money*1<100){
                this.$vux.toast.text('提现不能低于100元','bottom')
                return;
            }
            this.isShowP = !this.isShowP
        },
        sendWhttp(){
            var that = this
            that.$vux.loading.show({
                text: '请稍候',
            })
            if(this.banklist[0].bank_id){
                that.$post('withdrawal',{
                    coin:that.money,
                    bank_id:that.banklist[0].bank_id,
                    coin_password:that.pas
                }).then(res=>{
                    console.log(res);
                    that.isShowP = !that.isShowP
                    if(res.code==0){
                        setTimeout(()=>{
                            that.$vux.loading.hide();
                            that.$store.commit('changeCoin',res.data.user_coin)
                            that.$router.push({path:'/withdraw-done',query:{data:JSON.stringify(res.data),bankname:that.banklist[0].bank_name}})
                        },500)
                    }else{
                        that.$vux.loading.hide();
                    }
                })
            }
        },
        //关闭输入密码
        closeZJP(value){
            this.isShowP = value
        },
        tihuanFirst(str){
            return str.split('*')[0]
        },
        tihuanLast(str){
            return str.split('*')[str.split('*').length-1]
        }
    },
    components:{
        PAWDALOG(){
            return{
                component:import ('@/components/public/paswDalog.vue')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.icon-money{
    background: url('~@/assets/image/system/yue@2x.png') no-repeat!important;
    background-size: 100% 100%!important;
}
.icon-username{
    background: url('~@/assets/image/system/bi_user@2x.png') no-repeat!important;
    background-size: 100% 100%!important;
}
.main{
    position: relative;
    height: 100%;
    background: $bg-color;
}
.content{
    height: calc(100% - 100px);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .top{
        padding-top:26px;
        background: #fff;
        margin-bottom:20px;
        .block{
            display: flex;
            padding-bottom:20px;
            >div{
                flex: auto;
                i{
                    display: block;
                    float: left;
                    width:32px;
                    height: 32px;
                    background: $theme-color;
                    margin-right:10px;
                    margin-top:2px;
                }
                div{
                    float: left;
                    font-size: 28px;
                    color: #999999;
                    letter-spacing: 0;
                    line-height: 40px;
                    height: 40px;
                }
            }
            >div:first-child{
                padding-left:20px;
            }
            >div:last-child{
                padding-right:20px;
                i,div{
                    float: right;
                }
            }
        }
        .animate-wrap{
            width:100%;
            height: 405px;
            overflow: hidden;
            @keyframes mymove
            {
                0% {transform:translateY(-364px);}
                100% {transform:translateY(0px);}
            }
            .bankcard{
                width:670px;
                height: 364px;
                margin: auto;
                border-radius: 25px;
                overflow: hidden;
                background: url('~@/assets/image/system/card_@2x.png') no-repeat;
                background-size: 100% 100%;
                box-shadow: 0px 8px 20px #f87b7f;
                animation:mymove ease .5s forwards;
                >span{
                    font-size: 32px;
                    color:#fff;
                    display: block;
                    width:230px;
                    height: 50px;
                    line-height: 50px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-top:-25px;
                    margin-left:-115px;
                }
                h1,h2{
                    margin-top:50px;
                    margin-left:30px;
                    font-size: 38px;
                    color: #FFFFFF;
                    line-height: 38px;
                }
                h2{
                    margin-top:40px;
                    height: 38px;
                    overflow: hidden;
                    i{
                        display: inline-block;
                        width:17px;
                        height: 30px;
                        vertical-align: middle;
                    }
                    span{
                        display: inline-block;
                        vertical-align: middle;
                        margin-top:4px;
                    }
                }
                p{
                    position: absolute;
                    left: 0px;
                    bottom:13px;
                    font-size: 26px;
                    color: #FFFFFF;
                    margin-top:148px;
                    margin-left:30px;
                }
            }
        }
    }
    .center{
        background: #fff;
        .label{
            font-size: 28px;
            color: #666666;
            line-height: 40px;
            padding-top:13px;
            padding-left:20px;
        }
        .input-item{
            margin-top:19px;
            margin-left:20px;
            height: 95px;
            overflow: hidden;
            span{
                font-size: 68px;
                color: #333333;
                line-height: 95px;
                display: block;
                float: left;
                width:70px;
                height: 95px;
            }
            input{
                float: left;
                height: 90px;
                line-height: 90px;
                font-size: 68px;
                color: #333333;
                width:calc(100% - 70px);
            }
            input::-webkit-input-placeholder{
                font-weight: 500;
                font-size: 34px;
            }
        }
        .block{
            margin-left:20px;
            margin-right:10px;
            padding-top:12px;
            padding-bottom:15px;
            overflow: hidden;
            border-top: 1px solid #D2D2D2;
            span{
                display: block;
                font-size: 26px;
            }
            span.red{
                color:#EF2823!important;
            }
            span:first-child{
                color: #999999;
                line-height: 37px;
                float: left;
            }
            span:last-child{
                float: right;
                color:#3F8FEB;
                margin-right:10px;
            }
        }
    }
    .btn{
        width:650px;
        height: 100px;
        line-height: 100px;
        border-radius: 6px;
        font-size: 34px;
        margin: 60px auto 0 auto;
        color: #FFFFFF;
        text-align: center;
        background: $theme-color;
    }
}
</style>
