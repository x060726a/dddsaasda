<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$router.push({path:'/manage'})"></i>
        <div class="title"><span>线下充值</span></div>
    </div>
    <div class="content">
        <div class="top">
            <!-- <div id="qrcode"></div> -->
            <div class="unbank" v-if="res.sys_bank.online_type==13"><img src="@/assets/image/system/yinlian@2x.png"></div>
            <div class="qrcode" @click="showImg" v-else><img :src="res.sys_bank.payee_qrcode" alt=""></div>
            <!-- 银联 -->
            <h1 v-if="res.sys_bank.online_type==13">银行卡转账</h1>
            <h2 v-if="res.sys_bank.online_type==13">银行名称：{{res.sys_bank.payee_bank}}</h2>
            <h2 v-if="res.sys_bank.online_type==13">账号姓名：{{res.sys_bank.payee_name}}<a @click="copyXM" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <h2 v-if="res.sys_bank.online_type==13" class="mgb67">银行卡号：{{res.sys_bank.payee_account}}<a @click="copyKH" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <!-- 银联 -->

            <!-- 微信 -->
            <h1 v-if="res.sys_bank.online_type==3">微信扫描支付支付</h1>
            <h2 v-if="res.sys_bank.online_type==3">微信账号：{{res.sys_bank.payee_account}}<a @click="copyAccount" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <h2 v-if="res.sys_bank.online_type==3" class="mgb67">开户名称：{{res.sys_bank.payee_name}}<a @click="copyName" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <!-- 微信 -->

            <!-- QQ -->
            <h1 v-if="res.sys_bank.online_type==2">QQ钱包扫描支付</h1>
            <h2 v-if="res.sys_bank.online_type==2">QQ号：{{res.sys_bank.payee_account}}<a @click="copyAccount" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <h2 v-if="res.sys_bank.online_type==2" class="mgb67">QQ名称：{{res.sys_bank.payee_name}}<a @click="copyName" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <!-- QQ -->

            <!-- 支付宝 -->
            <h1 v-if="res.sys_bank.online_type==1">支付宝扫码支付</h1>
            <h2 v-if="res.sys_bank.online_type==1">支付宝账号：{{res.sys_bank.payee_account}}<a @click="copyAccount" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <h2 v-if="res.sys_bank.online_type==1" class="mgb67">支付宝名称：{{res.sys_bank.payee_name}}<a @click="copyName" data-clipboard-action="copy" class="icon-copy"></a></h2>
            <!-- 支付宝 -->
            <div class="block" style="border-top: 1px solid #D2D2D2;"><span>充值金额：</span><span>{{res.coin}}元</span></div>
            <div class="block"><span>附<i></i>加<i></i>码：</span><span>{{res.order_id}}</span><a @click="copyCode" data-clipboard-action="copy" class="copyspan"></a></div>
        </div>
        <div class="btn-group"><div @click="$router.push({path:'/recharge-done',query:{data:$route.query.data}})">我已完成支付</div></div>
        <div class="text">
            <p>温馨提示</p>
            <p v-if="res.sys_bank.online_type!=13">1.点击图片放大后并截图</p>
            <p v-if="res.sys_bank.online_type==1">2.打开支付宝扫一扫，点击右上角相册，从相册中选择保存的二维码</p>
            <p v-if="res.sys_bank.online_type==2">2.打开QQ扫一扫，点击右上角相册，从相册中选择保存的二维码</p>
            <p v-if="res.sys_bank.online_type==3">2.打开微信钱包扫一扫，点击右上角相册，从相册中选择保存的二维码</p>
            <p v-if="res.sys_bank.online_type!=13">{{(res.sys_bank.online_type!=1||res.sys_bank.online_type!=2||res.sys_bank.online_type!=3)?'3':'2'}}.输入正确的金额，完成支付后联系在线客服上分</p>
            <p v-if="res.sys_bank.online_type==13">1.点击复制按钮复制附加码</p>
            <p v-if="res.sys_bank.online_type==13">2.输入正确的金额，完成支付后联系在线客服</p>
            <p v-if="res.sys_bank.online_type==13">3.把复制好的附加码发送给客服核对成功后上分</p>
        </div>
    </div>
    <div v-transfer-dom>
        <previewer :list="imgList" ref="previewer"></previewer>
    </div>
</div>
</template>
<script>
import { Previewer } from 'vux'
export default {
    data(){
        return{
            res:JSON.parse(this.$route.query.data),
            imgList:[{
                src:JSON.parse(this.$route.query.data).sys_bank.payee_qrcode,
            }]
        }
    },
    created(){
        var newObj = JSON.parse(this.$route.query.data);
        console.log(newObj);
    },
    methods:{
        showImg(){
            this.$refs.previewer.show(0)
        },
        //复制按钮
        copyXM(){
            var that = this
            var clipboard = new ClipboardJS('.icon-copy',{
                text:function(){
                    return that.res.sys_bank.payee_name
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
            clipboard.on('error',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
        },
        copyKH(){
            var that = this
            var clipboard = new ClipboardJS('.icon-copy',{
                text:function(){
                    return that.res.sys_bank.payee_account
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
            clipboard.on('error',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
        },
        //复制按钮
        copyAccount(){
            var that = this
            var clipboard = new ClipboardJS('.icon-copy',{
                text:function(){
                    return that.res.sys_bank.payee_account
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
            clipboard.on('error',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
        },
        //复制按钮
        copyName(){
            var that = this
            var clipboard = new ClipboardJS('.icon-copy',{
                text:function(){
                    return that.res.sys_bank.payee_name
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
            clipboard.on('error',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
        },
        //复制按钮
        copyCode(){
            var that = this
            var clipboard = new ClipboardJS('.copyspan',{
                text:function(){
                    return that.res.order_id
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
            clipboard.on('error',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
        }
    },
    components:{Previewer}
}
</script>
<style lang="scss" scoped>
.mgb67{
    margin-bottom:67px!important;
}
.main{
    height: 100%;
    .content{
        height: calc(100% - 88px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        background: #f3f3f3;
        .top{
            background: #fff;
            padding-top:41px;
            margin-bottom:60px;
            .qrcode{
                width:260px;
                height: 260px;
                padding:20px;
                margin:0 auto 31px auto;
                background: #FFF3BA;
                img{
                    width:100%;
                }
            }
            .unbank{
                width:220px;
                height: 137px;
                margin: auto;
                margin-bottom:30px;
                img{
                    width:100%;
                }
            }
            h1{
                font-size: 34px;
                color: #333333;
                text-align: center;
                line-height: 48px;
                margin-bottom:46px;
            }
            h2{
                padding-left:180px;
                font-size: 28px;
                color: #333333;
                text-align: left;
                line-height: 40px;
                margin-bottom:16px;
                >a{
                    display: inline-block;
                    height: 40px;
                    width:28px;
                    background: url('~@/assets/image/system/copy_icon@2x.png') center center no-repeat;
                    background-size: 100%;
                    vertical-align: middle;
                    margin-left:18px;
                }
            }
            .block{
                padding-left:50px;
                overflow: hidden;
                padding-top:23px;
                padding-bottom:23px;
                border-bottom: 1px solid #D2D2D2;
                span{
                    font-size: 32px;
                    color: #333333;
                    line-height: 45px;
                    display: block;
                    float: left;
                    i{
                        display: inline-block;
                        width:16px;
                    }
                }
                span:nth-child(2){
                    color: #D9342F;
                }
                a{
                    display: block;
                    float: left;
                    height: 45px;
                    width:28px;
                    background: url('~@/assets/image/system/copy_icon@2x.png') center center no-repeat;
                    background-size: 100%;
                    margin-left:18px;
                }
            }
        }
        .btn-group{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom:55px;
            >div,a{
                display: block;
                width:460px;
                height: 100px;
                line-height: 100px;
                text-align: center;
                background: #D9342F;
                color:#fff;
                font-size: 34px;
                border-radius: 6px;
            }
            >a{
                margin-right:30px;
            }
        }
        .text{
            padding-left:20px;
            padding-right:20px;
            p{
                line-height: 33px;
                font-size: 24px;
                margin-bottom:15px;
                color: #666666;
            }
        }
    }
}
</style>
