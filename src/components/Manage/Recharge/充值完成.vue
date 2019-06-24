<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$router.push({path:'/manage'})"></i>
        <div class="title"><span>充值</span></div>
        <span class="right" @click="OpenKefu">联系客服</span>
    </div>
    <div class="content">
        <div class="top">
            <div class="done">
                <h1>付款成功，已提交信息</h1>
                <p>{{res.sys_bank.third_name}}支付</p>
                <p>{{res.coin}}元</p>
                <i></i>
            </div>
            <div class="undone">
                <h1>预计{{$root.ConversionTimeHour(res.accounting_time)}}前到账</h1>
                <p>以实际到账为准</p>
                <i></i>
            </div>
        </div>
        <div class="btn" @click="$router.push({path:'/manage'})">完成</div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            firmUrl:'',
            res:JSON.parse(this.$route.query.data)
        }
    },
    created(){
        this.get_setting()
    },
    methods:{
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
    }
}
</script>
<style lang="scss" scoped>
.main{
    height: 100%;
    background: $bg-color;
    .content{
        height: calc(100% - 88px);
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
        .top{
            background: #fff;
            padding-top:43px;
            padding-bottom:36px;
            margin-bottom:60px;
            .done{
                padding-left:150px;
                padding-bottom:60px;
                position: relative;
                h1{
                    font-size: 30px;
                    color: #0AAD19;
                    line-height: 42px;
                    font-weight: bold;
                    padding-bottom:4px;
                }
                p{
                    font-size: 24px;
                    color: #666666;
                    line-height: 33px;
                    padding-bottom:3px;
                }
                i{
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 60px;
                    width:60px;
                    height: 60px;
                    background: url('~@/assets/image/system/roundcheckfill_copy@2x.png') no-repeat;
                    background-size: 100% 100%;
                }
                i::after{
                    content:'';
                    display: block;
                    position: absolute;
                    bottom:-57px;
                    left: 50%;
                    margin-left:-4px; 
                    width:8px;
                    height: 57px;
                    background: #0AAD19;
                }
            }
            .undone{
                padding-left:150px;
                position: relative;
                h1{
                    font-size: 30px;
                    color: #333333;
                    line-height: 42px;
                    padding-bottom:3px;
                }
                p{
                    font-size: 24px;
                    color: #666666;
                    line-height: 33px;
                    padding-bottom:3px;
                }
                i{
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 60px;
                    width:60px;
                    height: 60px;
                    background: url('~@/assets/image/system/rechargefill@2x.png') no-repeat;
                    background-size: 100% 100%;
                }
                i::before{
                    content:'';
                    display: block;
                    position: absolute;
                    top:-60px;
                    left: 50%;
                    margin-left:-4px; 
                    width:8px;
                    height: 60px;
                    background: #d2d2d2;
                }
            }
        }
        .btn{
            background: $theme-color;
            border-radius: 6px;
            width:650px;
            height: 100px;
            line-height: 100px;
            text-align: center;
            margin: auto;
            font-size: 34px;
            color:#fff;
        }
    }
}
</style>
