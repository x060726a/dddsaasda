<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$router.push({path:'/manage'})"></i>
        <div class="title"><span>线上充值</span></div>
        <span class="right" @click="OpenKefu">联系客服</span>
    </div>
    <div class="content">
        <div class="cz-title">
            <span><i><img :src="info[0].icon"></i></span>
            <span>{{info[0].third_name}}</span>
        </div>
        <div class="qrcode">
            <div class="jr"><span>金额:</span><span>{{$route.query.money}}</span></div>
            <div class="qrcode-img" :class="{
                'zfb':info[0].online_type==1,
                'wx':info[0].online_type==2,
                'qq':info[0].online_type==3
                }"><img :src="$route.query.res"></div>
            <div class="btn">
                <div @click="$router.push({path:'/lransactionlog'})">我已完成支付</div>
                <div @click="qidongApp">启动{{payName[info[0].online_type-1]}}</div>
            </div>
            <h1 class="mgt52">如果不能启动{{payName[info[0].online_type-1]}}APP，请按下面步骤</h1>
            <h2>1：请先截屏保存二维码到手机</h2>
            <h2 class="mgb25">2：打开{{payName[info[0].online_type-1]}}，扫一扫本地图片</h2>
            <h1>付款即时到账，未到账请联系我们</h1>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            firmUrl:'',
            info:JSON.parse(this.$route.query.data),
            payName:['支付宝','微信','QQ钱包','银联']
        }
    },
    created(){
        console.log(this.$route.query.res);
        console.log(this.info);
    },
    methods:{
        OpenKefu(){
            if(this.firmUrl==''){
                this.$vux.toast.text('请稍等','bottom')
            }else{
                window.location.href = this.firmUrl
            }
        },
        //启动APP
        qidongApp(){
            var that = this
            if(that.info[0].online_type==1){
                window.location.href = 'alipays://'
            }
            if(that.info[0].online_type==2){
                window.location.href = 'weixin://'
            }
            if(that.info[0].online_type==3){
                window.location.href = 'mqqwpa://'
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    height: 100%;
    background: $bg-color;
    .content{
        height: calc(100% - 100px);
    }
    .cz-title{
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        margin-bottom:20px;
        span:first-child{
            width:80px;
            height: 80px;
            margin-right:20px;
            display: flex;
            justify-content: center;
            align-items: center;
            i{
                display: block;
                font-size: 0;
                img{
                    width:100%;
                }
            }
        }
        span:last-child{
            // width:105px;
            text-align: center;
            height: 80px;
            line-height: 80px;
            font-size: 28px;
            color: #333333;
        }
    }
    .qrcode{
        height: calc(100% - 110px);
        background: #fff;
        h1{
            font-size: 32px;
            color: #3F8FEB;
            text-align: center;
        }
        h2{
            font-size: 28px;
            color: #333333;
            text-align: center;
        }
        .mgt52{
            margin-top:52px;
            margin-bottom:6px;
        }
        .mgb25{
            margin-bottom:25px;
        }
        .jr{
            padding-top:54px;
            line-height: 70px;
            overflow: hidden;
            font-size: 30px;
            color: #333333;
            text-align: center;
            vertical-align: middle;
            >span{
                display: inline-block;
                vertical-align: middle;
                height: 70px;
            }
            >span:first-child{
                line-height: 75px;
            }
            >span:last-child{
                font-size: 50px;
                color: #D0021B;
            }
        }
        .zfb{
            background: #00A0E9;
        }
        .wx{
            background: #00B30E;
        }
        .qq{
            background: #FFF3BA;
        }
        .qrcode-img{
            width: 340px;
            height: 340px;
            padding:30px;
            font-size: 0;
            margin:0 auto 60px auto;
            // background: #FFF3BA ;
            img{
                width:100%;
                height: 100%;
            }
        }
        .btn{
            display: flex;
            justify-content: center;
            >div{
                width:330px;
                height: 100px;
                line-height: 100px;
                font-size: 34px;
                color: #FFFFFF;
                background: $theme-color;
                margin-right:30px;
                text-align: center;
                border-radius: 6px;
            }
            >div:last-child{
                margin-right:0;
            }
        }
    }
}
</style>
