<template>
<div class="content" ref="content">
    <div class="xs-container">
        <div class="xs-content">
            <div class="content">
                <div class="other-header">
                    <div class="avatar" @click="infoDetails()"><img :src="userinfo.avatar"></div>
                    <div class="name" @touchstart="infoDetails()">{{userinfo.nickname}}</div>
                    <div class="level" :class="'level-'+badgeLevel[userinfo.level]"></div>
                    <div class="btn" @click="goSetting">设置</div>
                </div>
                <div class="user-balance">
                    <div class="balance">
                        <div class="balance-title">账户余额(元)</div>
                        <div class="balance-number"><countup v-if="userinfo" :start-val="0" :end-val="userinfo.coin*1" :duration="1" :decimals="2"></countup></div>
                        <div class="balance-number1"><span>可提现：<countup v-if="userinfo" :start-val="0" :end-val="userinfo.coin*1" :duration="1" :decimals="2"></countup></span><span>中奖金额：<countup v-if="userinfo" :start-val="0" :end-val="userinfo.total_bonus*1" :duration="1" :decimals="2"></countup></span></div>
                        <div class="router-btn">
                            <span class="icon1"></span>
                            <span @click="$router.push({path:'/share'})">推荐赚现金</span>
                            <span class="icon2"></span>
                        </div>
                    </div>
                </div>
                <div class="bank-list">
                    <div @click="$router.push({path:'/recharge'})">
                        <span class="chongzhi"></span>
                        <span>充值</span>
                    </div>
                    <div @click="goWithdraw">
                        <span class="tixian"></span>
                        <span>提现</span>
                    </div>
                    <div @click="$router.push({path:'/bankcard'})">
                        <span class="yhk"></span>
                        <span>银行卡</span>
                    </div>
                    <div @click="$router.push({path:'/lransactionlog'})">
                        <span class="jylog"></span>
                        <span :class="{badge:userinfo.new_trans_record*1>0}">交易记录</span>
                    </div>
                </div>
                <div class="pad25"></div>
                <div class="menu-list">
                    <div class="step-items">
                        <div class="item" @click="$router.push({path:'/follow'})"><span class="icon-wdgz"></span><span>我的关注</span><span></span></div>
                        <div class="item" @click="$router.push({path:'/betRecord'})"><span class="icon-tzjl"></span><span>投注记录</span><span></span></div>
                    </div>
                    <div class="step-items">
                        <div class="item" @click="$router.push({path:'/teams'})"><span class="icon-tdgl"></span><span>团队管理</span><span></span></div>
                        <div class="item" @click="$router.push({path:'/share'})"><span class="icon-fxhy"></span><span>分享好友</span><span></span></div>
                    </div>
                    <div class="step-items">
                        <div class="item" @click="$router.push({path:'/usertask'})"><span class="icon-yjrw"></span><span>有奖任务</span><span></span></div>
                        <div class="item" @click="$router.push({path:'/activity'})"><span class="icon-yhhd"></span><span>优惠活动</span><span></span></div>
                        <div class="item" @click="$router.push({path:'/message'})"><span class="icon-xxzx"></span><span>消息中心</span><span></span></div>
                        <div class="item" @click="OpenKefu"><span class="icon-lxkf"></span><span>联系客服</span><span></span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <alertPopup :gameClose="false" @isClose="isBank = false" v-if="isBank" />
</div>
</template>
<script>
import { mapState } from 'Vuex'
import { Countup } from 'vux'
export default {
    data(){
        return{
            isBank: false, // 绑定银行卡弹窗
            firmUrl:'',
            banklist:[],
            badgeLevel:{
                '普通会员':'l1',
                '黄金会员':'l2',
                '白金会员':'l3',
                '铂金会员':'l4',
                '钻石会员':'l5',
                '至尊会员':'l6',
            }
        }
    },
    components:{
        Countup,
        alertPopup () {
            return {
                component: import('@/components/public/popup')
            }
        }
    },
    computed:{
        ...mapState(['userinfo'])
    },
    mounted(){
        var that = this
        that.$nextTick(()=>{
            that.xscroll = new XScroll({
                renderTo:that.$refs.content,
                lockX:true,
                lockY:false,
                scrollbarY:false,
                scrollbarX:false,
                preventDefault:false,
            });
            that.xscroll.render();
        })
    },
    async created(){
        let res = await this.$root.getuserInfo();
        this.get_setting();
        this.$store.commit('lastRouteName','manage')
    },
    methods:{
        goWithdraw() {
            if (this.userinfo.is_bind_bank) return this.$router.push({path:'/withdraw'})
            this.isBank = true
            // let _this = this
            // this.$vux.confirm.show({
            //     title:'温馨提示',
            //     content:'请先绑定银行卡',
            //     onConfirm:()=>{
            //         _this.$router.push({path:'/band-bankcard'})
            //     }
            // })
            // var that = this
            // var res = await this.getBanklist();
            // if(res){
            //     this.$router.push({path:'/withdraw'})
            // }else{
            //     this.$vux.confirm.show({
            //         title:'温馨提示',
            //         content:'请先绑定银行卡',
            //         onConfirm:()=>{
            //             that.$router.push({path:'/band-bankcard'})
            //         }
            //     })
            // }
        },
        // getBanklist(){
        //     var that = this
        //     return new Promise(resolve=>{
        //         that.$get('bankcard',{}).then(res=>{
        //             if(res.code==0){
        //                 that.banklist = res.data
        //                 if(res.data.length>0){
        //                     resolve(true)
        //                 }else{
        //                     resolve(false)
        //                 }
        //             }else{
        //                 resolve(false)
        //             }
        //         },err=>{
        //             resolve(false)
        //         })
        //     })
        // },
        goSetting(){
            this.$router.push({path:'/setting'})
        },
        get_setting () {
            this.$get('setting', {}).then(res => {
                if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                this.firmUrl = res.data.online_service.value
            })
        },
        OpenKefu(){
            if(this.firmUrl==''){
                this.$vux.toast.text('请稍等','bottom')
            }else{
                window.location.href = this.firmUrl
            }
        },
        infoDetails () {
            if (this.userinfo.initiate == 1) return this.$router.push({path: '/information', query: {uid: Number(this.userinfo.id)}})
        }
    }
}
</script>
<style lang="scss" scoped>
.pad25{
    height: 25px;
    background: #fff;
}
.content{
    height: 100%;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    background: #f3f3f3;
}
.other-header{
    padding:14px 20px 20px 20px;
    overflow: hidden;
    background: #fff;
    .avatar{
        width:64px;
        height: 64px;
        /*margin-right:20px;*/
        border-radius: 50%;
        overflow: hidden;
        float: left;
        font-size: 0;
        img{
            width:100%;
        }
    }
    .name{
        float: left;
        padding-left: 20px;
        margin-right:20px;
        line-height: 64px;
        font-weight: bold;
        font-size: 30px;
        color:#333;
    }
    .level{
        // padding-right:36px;
        height: 33px;
        line-height: 33px;
        font-size: 0;
        overflow: hidden;
        float: left;
        width:145px;
        // background: linear-gradient(left,#7D8095,#3C3E4F);
        // border-radius: 16px;
        position: relative;
        margin-top:17px;
        img{
            width:100%;
            height: 100%;
        }
        // img,span{
        //     float: left;
        // }
        // img{
        //     width:32px;
        //     height: 32px;
        //     margin-right:10px;
        // }
        // span{
        //     font-size: 20px;
        //     color:#fff;
        //     line-height: 31px;
        // }
    }
    // .level::after{
    //     content: "";
    //     display: block;
    //     position: absolute;
    //     right:10px;
    //     top:5px;
    //     height: 20px;
    //     width:10px;
    //     background: url('~@/assets/image/system/back_light@2x.png') no-repeat;
    //     background-size: 100% 100%;
    // }
    .btn{
        font-size: 30px;
        line-height: 64px;
        float: right;
        margin-right:5px;
        color:#333;
    }
}
.user-balance{
    padding:0px 40px;
    background: #fff;
    height: 303px;
    position: relative;
    overflow: hidden;
    .balance{
        background: #D9342F;
        width:calc(100% - 80px);
        height: 258px;
        border-radius: 12px;
        position: absolute;
        left: 40px;
        overflow: hidden;
        animation:mymove ease .5s forwards;
        box-shadow:0px 5px 20px #ea9794;
        .balance-title{
            padding-top:25px;
            padding-left:30px;
            font-size: 22px;
            line-height: 30px;
            color:#fff;
        }
        .balance-number{
            color:#fff;
            padding-top:12px;
            padding-left:30px;
            font-size: 60px;
            line-height: 70px;
        }
        .balance-number1{
            overflow: hidden;
            color:#fff;
            font-size: 28px;
            line-height: 40px;
            padding-left:30px;
            padding-right:30px;
            padding-top:37px;
            span:first-child{
                float: left;
            }
            span:last-child{
                float: right;
            }
        }
        .router-btn{
            width:224px;
            height: 48px;
            position: absolute;
            top: 78px;
            right:0;
            background: rgba(255,255,255,.2);
            border-radius: 30px 0 0 30px;
            span{
                float: left;
            }
            span:nth-child(1){
                width: 25px;
                height: 25px;
                display: block;
                background: url('~@/assets/image/system/zan@2x.png') no-repeat;
                background-size: 100% 100%;
                margin-top:12px;
                margin-left:20px;
                margin-right:10px;
            }
            span:nth-child(2){
                font-size: 24px;
                color:#fff;
                line-height: 48px;
                display:block;
                margin-right:15px;
            }
            span:nth-child(3){
                width: 13px;
                height: 23px;
                display: block;
                background: url('~@/assets/image/system/back_light@2x.png') no-repeat;
                background-size: 100% 100%;
                margin-top:14px;
            }
        }
    }
    .balance:before{
        content:'';
        display: block;
        position: absolute;
        top: -135px;
        left: -20px;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background: rgba(255,255,255,.1);
    }
    .balance:after{
        content:'';
        display: block;
        position: absolute;
        bottom: -135px;
        right: -20px;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        background: rgba(255,255,255,.1);
    }
    @keyframes mymove
    {
        0% {transform:translateY(-250px);}
        100% {transform:translateY(20px);}
    }
}
.bank-list{
    display: flex;
    background: #fff;
    overflow: hidden;
    padding-top:20px;
    >div:last-child{
        span:first-child{
            width: 40px;
        }
    }
    >div{
        flex: 1;
        position: relative;
        span.chongzhi{
            background: url('~@/assets/image/system/recharge.png') no-repeat;
            background-size: 100% 100%;
        }
        span.tixian{
            background: url('~@/assets/image/system/withdraw.png') no-repeat;
            background-size: 100% 100%;
        }
        span.yhk{
            background: url('~@/assets/image/system/icon_test@2x.png') no-repeat;
            background-size: 100% 100%;
        }
        span.jylog{
            background: url('~@/assets/image/system/recording.png') no-repeat;
            background-size: 100% 100%;
        }
        span.yhhd{
            background: url('~@/assets/image/system/yhhd.png') no-repeat;
            background-size: 100% 100%;
        }
        span:first-child{
            font-size: 0;
            width:52px;
            height: 43px;
            margin: 0px auto 19px auto;
            transform:translateY(-65px);
            animation:.3s mymove1 ease .3s forwards;
        }
        span:last-child{
            font-size: 24px;
            color:#333;
            position: relative;
            transform:translateY(38px);
            animation:.3s mymove2 ease .3s forwards;
        }
        span{
            display: block;
            text-align: center;
        }
        span.badge:after{
            content:'';
            display: block;
            position: absolute;
            top: 5px;
            right: 28px;
            height: 10px;
            width: 10px;
            border-radius: 50%;
            background: #EF2823;
        }
        @keyframes mymove1
        {
            from {transform:translateY(-65px);}
            to {transform:translateY(0px);}
        }
        @keyframes mymove2
        {
            from {transform:translateY(38px);}
            to {transform:translateY(0px);}
        }
    }
    >div:nth-child(2){
        span:first-child{
            img{
                margin-top:-8px;
            }
        }
    }
}
.menu-list{
    padding-top:21px;
    .step-items{
        padding-left:40px;
        border-top:#D2D2D2  1px solid;
        border-bottom:#D2D2D2  1px solid;
        background: #fff;
        box-sizing: border-box;
        margin-bottom:21px;
        .item{
            height: 80px;
            line-height: 80px;
            border-bottom:#D2D2D2 1px solid;
            overflow: hidden;
            @keyframes mymove3
            {
                from {
                    transform:translateX(15px);
                    opacity: 0;
                }
                to {
                    transform:translateX(0px);
                    opacity: 1;
                }
            }
            span{
                line-height: 80px;
                font-size: 28px;
                color:#333;
            }
            span:nth-child(1){
                float: left;
                margin-right:13px;
                width:50px;
                height: 50px;
                margin-top:13px;
                transform:translateX(15px);
                opacity: 0;
                animation:.3s mymove3 ease .3s forwards;
            }
            span:nth-child(2){
                float: left;
                transform:translateX(15px);
                opacity: 0;
                animation:.3s mymove3 ease .3s forwards;
            }
            span:nth-child(3){
                display: block;
                margin-right:32px;
                float: right;
                width: 18px;
                height: 32px;
                background: url('~@/assets/image/system/back_light@3x.png') no-repeat;
                background-size: 100%;
                margin-top:24px;
            }
            span.icon-wdgz{
                background: url('~@/assets/image/system/friendfamous@2x.png') center center no-repeat;
                background-size: 48px 48px;
            }
            span.icon-tzjl{
                background: url('~@/assets/image/system/calendar@2x.png') center center no-repeat;
                background-size: 40px 45px;
            }
            span.icon-tdgl{
                background: url('~@/assets/image/system/list@2x.png') center center no-repeat;
                background-size: 45px 45px;
            }
            span.icon-fxhy{
                background: url('~@/assets/image/system/friendadd@2x.png') center center no-repeat;
                background-size: 45px 45px;;
            }
            span.icon-yjrw{
                background: url('~@/assets/image/system/present@2x.png') center center no-repeat;
                background-size: 42px 45px;
            }
            span.icon-yhhd{
                background: url('~@/assets/image/system/yhhd.png') center center no-repeat;
                background-size: 42px 45px;
            }
            span.icon-xxzx{
                background: url('~@/assets/image/system/notice_copy@2x.png') center center no-repeat;
                background-size: 44px 45px;
            }
            span.icon-lxkf{
                background: url('~@/assets/image/system/service_copy@2x.png') center center no-repeat;
                background-size: 45px 45px;
            }
        }
        .item:last-child{
            border-bottom:none;
        }
    }
}
</style>
