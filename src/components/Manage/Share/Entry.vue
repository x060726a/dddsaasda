<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>分享好友</span></div>
    </div>
    <div class="content">
        <div class="qrcode">
            <h1>推荐朋友扫码下面二维码</h1>
            <p>注册成为下线</p>
            <div class="qrcodeImg" id="qrcodeImg" ref="qrcodeImg"></div>
        </div>
        <a class="btn copydom" @click="shareLink" data-clipboard-action="copy">复制链接去分享</a>
    </div>
</div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
    data(){
        return{
            isLoadImg:false,
            userinfo:JSON.parse(localStorage.getItem('userinfo')),
            host:window.location.host+'/register?'
        }
    },
    mounted(){
        var that = this
        this.qrcode();
    },
    created(){
        this.host += 'pUID='+this.userinfo.id
    },
    methods:{
        //二维码
        qrcode() {
            console.log(this.$refs);
            var that = this
            let qrcode = new QRCode('qrcodeImg', {
                width: 140,  
                height: 140,
                text: that.host, // 二维码地址
                colorDark : "#000",
                colorLight : "#fff",
                className:'dsdas'
            })
        },
        shareLink(){
            var that = this
            var clipboard = new ClipboardJS('.copydom',{
                text:function(){
                    return that.host
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
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
        .qrcode{
            background: #fff;
            padding-top:72px;
            padding-bottom:80px;
            h1{
                font-size: 36px;
                color: #D9342F;
                line-height: 50px;
                text-align: center;
                margin-bottom:5px;
            }
            p{
                font-size: 30px;
                color: #333333;
                line-height: 42px;
                text-align: center;
                margin-bottom:24px;
            }
            .qrcodeImg{
                width:340px;
                height: 340px;
                margin: auto;
                // padding:30px;
                background: #FFF3BA;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                >img{
                    width:100%!important;
                    height: 100%!important;
                }
            }
        }
        .btn{
            display: block;
            margin:60px auto;
            width:650px;
            height: 100px;
            line-height: 100px;
            font-size: 34px;
            color: #FFFFFF;
            text-align: center;
            background: $theme-color;
            border-radius: 6px;
        }
    }
}
</style>
