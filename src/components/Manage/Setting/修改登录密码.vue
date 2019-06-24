<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">修改登录密码</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="pad"></div>
    <div class="pancel-content">
        <div class="pad"></div>
        <P>设置密码后可以通过账户/手机号+密码登录账户</P>
        <div class="input-group">
            <div class="input-wrap">
                <div class="label">旧密码</div>
                <input type="password" maxlength="16" oninput="if(value.length>11)value=value.slice(0,16)" placeholder="请填写旧密码" @blur="blur1" @focus="focus1" ref="passwordold" v-model="passwordold">
                <i class="close" v-show="close1" @click="closeBtn1"></i>
                <i class="warning" v-show="reg1"></i>
            </div>
            <div class="input-wrap">
                <div class="label">新密码</div>
                <input type="password" maxlength="16" oninput="if(value.length>16)value=value.slice(0,16)" placeholder="请输入新的密码" @blur="blur2" @focus="focus2" ref="password1" v-model="password1">
                <i class="close" v-show="close2" @click="closeBtn2"></i>
                <i class="warning" v-show="reg2"></i>
            </div>
            <div class="input-wrap">
                <div class="label">确认密码</div>
                <input type="password" maxlength="16" oninput="if(value.length>16)value=value.slice(0,16)" placeholder="请再次输入密码" @blur="blur3" @focus="focus3" ref="password2" v-model="password2">
                <i class="close" v-show="close3" @click="closeBtn3"></i>
                <i class="warning" v-show="reg3"></i>
            </div>
        </div>
        <h1>请输入6-16位密码</h1>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            passwordold:'',
            password1:'',
            password2:'',
            reg1:false,
            reg2:false,
            reg3:false,
            close1:false,
            close2:false,
            close3:false,
            timer:''
        }
    },
    watch:{
        passwordold(val,oval){
            if(val!=''){
                this.close1 = true
            }
        },
        password1(val,oval){
            if(val!=''){
                this.close2 = true
            }
        },
        password2(val,oval){
            if(val!=''){
                this.close3 = true
            }
        },
    },
    methods:{
        //失去焦点
        blur1(){
            var that = this;
            setTimeout(()=>{
                that.close1 = false
                that.reg1 = that.jiaoyan(that.passwordold);
            },100)
        },
        blur2(){
            var that = this;
            setTimeout(()=>{
                that.close2 = false
                that.reg2 = that.jiaoyan(that.password1);
            },100)
        },
        blur3(){
            var that = this;
            setTimeout(()=>{
                that.close3 = false
                that.reg3 = that.jiaoyan(that.password2);
            },100)
        },
        //获取焦点
        focus1(){
            if(this.passwordold!=''){
                this.close1 = true
            }
            this.reg1 = false
        },
        focus2(){
            if(this.passwor1!=''&&this.passwor1!=undefined){
                console.log(this.passwor1)
                this.close2 = true
            }
            this.reg2 = false
        },
        focus3(){
            if(this.passwor2!=''&&this.passwor2!=undefined){
                this.close3 = true
            }
            this.reg3 = false
        },
        //清除
        closeBtn1(){
            this.passwordold = ''
        },
        closeBtn2(){
            this.password1 = ''
        },
        closeBtn3(){
            this.password2 = ''
        },
        jiaoyan(str){
            var reg = new RegExp(/^[A-Za-z0-9~'`!@#￥$%^&*()-+_=:]{6,16}$/);
            var reg_S = ''
            if(str.length<6&&str!=''){
                reg_S = true
            }else{
                if(!reg.test(str)){
                    reg_S = true
                }else{
                    reg_S = false
                }
            }
            return reg_S
        },
        async comfirm(){
            if(this.passwordold==''&&this.password1==''&&this.password2==''){
                this.reg1 = false
                this.reg2 = false
                this.reg3 = false
                this.$emit('close',false)
            }else{
                var reg = new RegExp(/^[A-Za-z0-9~'`!@#￥$%^&*()-+_=:]{6,16}$/);
                if(this.passwordold==''){
                    this.$vux.toast.text('请填写旧密码','bottom')
                    return
                }else{
                    if(!reg.test(this.passwordold)){
                        this.$vux.toast.text('旧密码不正确','bottom')
                        return
                    }
                }
                if(this.password1==''||this.password2==''){
                    this.$vux.toast.text('请填写新密码','bottom')
                    return
                }else{
                    if(!reg.test(this.password1)){
                        this.$vux.toast.text('第一次输入的密码不合法','bottom')
                        return
                    }
                    if(!reg.test(this.password2)){
                        this.$vux.toast.text('第二次输入的密码不合法','bottom')
                        return
                    }
                    if(this.password1!=this.password2){
                        this.$vux.toast.text('两次密码输入不一致','bottom')
                        return
                    }
                }
                this.$vux.loading.show({
                    text: '修改中',
                })
                var obj = {
                    old_password:this.passwordold,
                    new_password:this.password1,
                    confirm_password:this.password2,
                }
                let res = await this.$root.upuserData(obj)
                if(res.code==0){
                    this.$vux.toast.text(res.msg_zh,'bottom')
                    this.$emit('close',false)
                    this.close();
                }
                this.$vux.loading.hide();
            }
        },
        close(){
            this.passwordold = ''
            this.password1 = ''
            this.password2 = ''
            this.reg1 = false
            this.reg2 = false
            this.reg3 = false
            this.close1 = false
            this.close2 = false
            this.close3 = false
            this.$emit('close',false)
        }
    }
}
</script>
<style lang="scss" scoped>
.right-btn{
    display: block;
    position: absolute;
    top: 0;
    right: 20px;
    width:70px;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    color: #FFFFFF;
    text-align: center;
}
.pancel-content{
    height: calc(100% - 88px);
    background: $bg-color;
    .pad{
        width:100%;
        height: 30px;
    }
    >P{
        font-size: 26px;
        color: #999999;
        line-height: 37px;
        padding-left:20px;
        margin-bottom:14px;
    }
    >h1{
        font-size: 30px;
        color: #333333;
        display: block;
        padding-left:20px;
        margin-top:13px;
    }
    >h2{
        font-size: 30px;
        color: #000000;
        line-height: 42px;
        padding-left:20px;
        color:#3484F5;
        text-align: left;
    }
    .input-group{
        padding-left:20px;
        background: #fff;
        border-top:1px solid #d2d2d2;
        border-bottom:1px solid #d2d2d2;
        .input-wrap{
            height: 90px;
            border-bottom:1px solid #d2d2d2;
            position: relative;
            overflow: hidden;
            >div{
                float: left;
                height: 89px;
                font-size: 28px;
                line-height: 89px;
                color: #333333;
            }
            >div{
                width:125px;
                text-align: left;
                margin-right:52px;
            }
            >input{
                height: 50px;
                line-height: 50px;
                float: left;
                width:calc(100% - 180px);
                color:#72849E;
                font-weight: bold;
                font-size: 28px;
                margin-top:20px;
            }
            .close,.warning{
                display: block;
                position: absolute;
                right:20px;
                height: 90px;
                width: 50px;
            }
            .close{
                background: url('~@/assets/image/system/close_light@2x.png') center center no-repeat;
                background-size: 30px 30px;
            }
            .warning{
                background: url('~@/assets/image/system/wring.png') center center no-repeat;
                background-size: 25px 25px;
            }
        }
        >div:last-child{
            border-bottom:none;
        }
    }
    .xy-cell{
        .weui-cell{
            border-right:none;
            border-left:none;
            border-top:none;
            border-radius: 0;
            padding-left:0;
        }
    }
    .border-b-none{
        .weui-cell{
            border-bottom:none;
        }
    }
}
</style>
