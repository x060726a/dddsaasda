<template>
<div class="main">
    <div class="top" @click="close"></div>
    <div class="content">
        <div class="close-bar">请输入资金密码<i @click="close"></i></div>
        <div class="text"><em>￥</em><span>{{(money*1).toFixed(2)}}</span></div>
        <div class="mima">
            <span v-for="ele in 6" :class="{active:pas.length>=ele}"></span>
        </div>
        <div class="btn" @click="OpenKefu">忘记密码?</div>
        <div class="keypo" @click="getDome">
            <div class="row"><span>1</span><span>2</span><span>3</span></div>
            <div class="row"><span>4</span><span>5</span><span>6</span></div>
            <div class="row"><span>7</span><span>8</span><span>9</span></div>
            <div class="row"><span></span><span>0</span><span>删除</span></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            pas:'',
            firmUrl:'',
        }
    },
    props:['money'],
    created(){
        this.get_setting()
    },
    methods:{

        close(){
            this.$emit('close',false)
        },
        getDome(){
            var  that = this
            if(event.target.textContent=='删除'){
                that.deletePas();
                return;
            }
            if(event.target.textContent=='') return;
            if(that.pas.length>=6) return;
            that.pas += event.target.textContent
            if(that.pas.length==6){
                this.$emit('done',that.pas)
            }
        },
        deletePas(){
            var that = this
            if(that.pas.length>0){
                that.pas = that.pas.substring(0,that.pas.length-1,1)
            }
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
    }
}
</script>
<style lang="scss" scoped>
.main{
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    z-index: 2;
    background: rgba(0,0,0,.4);
    height: 100%;
    .top{
        height: 30%;
    }
    .content{
        width: 100%;
        height: 933px;
        background: #fff;
        animation:mymove ease .5s forwards;
        position: absolute;
        bottom: 0;
        .close-bar{
            height: 80px;
            line-height: 80px;
            font-size: 34px;
            color: #030303;
            text-align: center;
            border-bottom:1px solid #d2d2d2;
            position: relative;
            >i{
                position: absolute;
                top: 0;
                right: 0;
                height: 80px;
                width: 80px;
                background: url('~@/assets/image/system/zj-close@2x.png') center center no-repeat;
                background-size: 30px 30px;
            }
        }
        .text{
            height: 73px;
            line-height: 73px;
            text-align: center;
            margin-top:44px;
            margin-bottom:43px;
            >em{
                font-size: 30px;
                height: 40px;
                line-height: 55px;
                vertical-align: middle;
                display: inline-block;
            }
            >span{
                font-size: 52px;
                vertical-align: middle;
                display: inline-block;
                font-weight: 500;
            }
        }
        .mima{
            width:90%;
            height: 100px;
            margin: auto;
            border:1px solid #d2d2d2;
            border-right:none;
            display: flex;
            position: relative;
            z-index: 1;
            >span{
                flex: 1;
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
            }
            >span::after{
                content:'';
                display: block;
                position: absolute;
                width: 1px;
                height: 99px;
                top: 0;
                right: 0;
                background: #d2d2d2;
            }
            >span.active:before{
                content:'';
                display: block;
                width: 40px;
                height: 40px;
                background: #000;
                border-radius: 50%;
            }
        }
        .btn{
            font-size: 28px;
            color: #3F8FEB;
            margin-top:23px;
            height: 40px;
            line-height: 40px;
            text-align: center;
        }
        .jp{
            position: absolute;
            top: 200px;
            left: 20px;
            z-index: -1;
            opacity: 0;
        }
        .keypo{
            position: absolute;
            bottom:0;
            width: 100%;
            border-top:1px solid #d2d2d2;
            box-shadow: 0px 0px 20px #b7b7b78f;
            .row{
                display: flex;
                border-bottom:1px solid #D2D2D2;
                height: 120px;
                span{
                    flex: 1;
                    height: 120px;
                    text-align: center;
                    line-height: 120px;
                    font-size: 38px;
                    border-right:1px solid #D2D2D2;
                }
                span:last-child{
                    border-right:none;
                }
            }
            .row:last-child{
                border-bottom:none;
            }
        }
    }
}
@keyframes mymove
{
    0% {transform:translateY(100%);}
    100% {transform:translateY(0);}
}
</style>
