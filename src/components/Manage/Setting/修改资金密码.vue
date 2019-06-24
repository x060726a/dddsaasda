<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">修改资金密码</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="pad"></div>
    <P>建议勿与银行卡密码相同</P>
    <div class="input-group">
        <!-- <group class="xy-cell setting b-3-m">
            <x-input title="旧密码" keyboard="number" v-model="passwordold" type="password" placeholder="请填写旧密码"></x-input>
            <div @click="showKeypo(1)" class="mask"><i v-show="step==1&&passwordold!=''" @click="passwordold=''"></i></div>
        </group>
        <group class="xy-cell setting b-3-m">
            <x-input title="新密码" keyboard="number" v-model="password1" type="password" placeholder="请输入新的密码"></x-input>
            <div @click="showKeypo(2)" class="mask"><i v-show="step==2&&password1!=''" @click="password1=''"></i></div>
        </group>
        <group class="xy-cell setting b-4-m border-b-none">
            <x-input title="确认密码" keyboard="number" v-model="password2" type="password" placeholder="请再次输入密码"></x-input>
            <div @click="showKeypo(3)" class="mask"><i v-show="step==3&&password2!=''" @click="password2=''"></i></div>
        </group> -->
        <div class="input-item">
            <div class="item-label">旧密码</div>
            <div class="mask">
                <span class="none" @click="showKeypo(1)" v-show="passwordold==''">请填写旧密码</span>
                <ul v-show="passwordold!=''" @click="showKeypo(1)">
                    <li v-for="ele in 6" v-show="passwordold.toString().length>=ele"></li>
                </ul>
                <i v-show="step==1&&passwordold!=''" @click="passwordold='',$emit('keypoShow',false)"></i>
            </div>
        </div>
        <div class="input-item">
            <div class="item-label">新密码</div>
            <div class="mask">
                <span class="none" @click="showKeypo(2)" v-show="password1==''">请输入新的密码</span>
                <ul v-show="password1!=''" @click="showKeypo(2)">
                    <li v-for="ele in 6" v-show="password1.toString().length>=ele"></li>
                </ul>
                <i v-show="step==2&&password1!=''" @click="password1='',$emit('keypoShow',false)"></i>
            </div>
        </div>
        <div class="input-item">
            <div class="item-label">确认密码</div>
            <div class="mask">
                <span class="none" @click="showKeypo(3)" v-show="password2==''">请再次输入密码</span>
                <ul v-show="password2!=''" @click="showKeypo(3)">
                    <li v-for="ele in 6" v-show="password2.toString().length>=ele"></li>
                </ul>
                <i v-show="step==3&&password2!=''" @click="password2='',$emit('keypoShow',false)"></i>
            </div>
        </div>
    </div>
    <h1>密码必须6个字符，并且都是数字</h1>
    <h2>忘记旧密码请<em @click="OpenKefu">联系客服</em></h2>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            timer:'',
            step:'',
            show:false,
            passwordold:'',
            password1:'',
            password2:''
        }
    },
    watch:{
        step(val,oval){
            this.$emit('keypoShow',false)
        },
        res(val,oval){
            console.log(val);
            if(this.step==1){
                this.passwordold = val*1
            }
            if(this.step==2){
                this.password1 = val*1
            }
            if(this.step==3){
                this.password2 = val*1
            }
        }
    },
    props:['res'],
    created(){
        this.get_setting();
    },
    methods:{
        async comfirm(){
            if(this.passwordold==''&&this.password1==''&&this.password2==''){
                this.$emit('close',false)
                this.$emit('keypoShow',false)
            }else{
                if(this.passwordold==''){
                    this.$vux.toast.text('请填写旧密码','bottom')
                    return
                }
                if(this.password1==''||this.password2==''){
                    this.$vux.toast.text('请填写新密码','bottom')
                    return
                }
                if(this.password1!=this.password2){
                    this.$vux.toast.text('两次密码输入不一致','bottom')
                    return
                }
                if(typeof this.passwordold!='number'||typeof this.password1!='number'||typeof this.password2!='number'){
                    this.$vux.toast.text('资金密码必须为数字','bottom')
                    return
                }
                var obj = {
                    old_coin_password:this.passwordold,
                    new_coin_password:this.password1,
                    confirm_coin_password:this.password2,
                }
                this.$vux.loading.show({
                    text: '修改中',
                })
                let res = await this.$root.upuserData(obj)
                if(res.code==0){
                    this.$vux.toast.text(res.msg_zh,'bottom')
                    this.close();
                }
                this.$vux.loading.hide();
            }
        },
        close(){
            this.passwordold = '',
            this.password1 = '',
            this.password2 = ''
            this.$emit('close',false)
            this.$emit('keypoShow',false)
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
        showKeypo(index){
            var that = this
            this.step = index
            if(index==1&&this.passwordold!=''){
                this.passwordold = ''
                this.$emit('reset','')
            }
            if(index==2&&this.password1!=''){
                this.password1 = ''
                this.$emit('reset','')
            }
            if(index==3&&this.password2!=''){
                this.password2 = ''
                this.$emit('reset','')
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                that.$emit('keypoShow',true)
            },200)
        }
    },
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
.pancel-main{
    height: 100%;
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
        padding-left:20px;
        line-height: 42px;
        margin-top:13px;
    }
    >h2{
        font-size: 30px;
        color: #000000;
        line-height: 42px;
        padding-left:20px;
        >em{
            color:#3484F5;
        }
    }
    .input-group{
        padding-left:20px;
        background: #fff;
        border-top:1px solid #d2d2d2;
        border-bottom:1px solid #d2d2d2;
        >div:last-child{
            border-bottom:none;
        }
        .input-item{
            height: 90px;
            line-height: 90px;
            border-bottom:1px solid #d2d2d2;
            display: flex;
            .item-label{
                font-size: 30px;
                color: #333333;
                width: 170px;
                text-align: left;
            }
            .mask{
                flex: auto;
                position: relative;
                i{
                    position: absolute;
                    top: 0;
                    right: 0;
                    height: 90px;
                    width: 90px;
                    background: url('~@/assets/image/system/close_light@2x.png') center center no-repeat;
                    background-size: 30px 30px;
                }
                .none{
                    display: block;
                    font-size: 30px;
                    color: #999999;
                }
                ul{
                    overflow: hidden;
                    height: 89px;
                    display: flex;
                    justify-items: center;
                    align-items: center;
                    li{
                        width:16px;
                        height: 16px;
                        background: #333;
                        border-radius: 50%;
                        margin-right:6px;
                    }
                }
            }
        }
    }
    .xy-cell{
        position: relative;
        .mask{
            position: absolute;
            top: 0;
            left: 120px;
            width: calc(100% - 120px);
            height: 80px;
            display: block;
            z-index: 2;
            font-size: 30px;
            background: rgba(0,0,0,0);
            i{
                position: absolute;
                top: 0;
                right: 0;
                height: 80px;
                width: 80px;
                background: url('~@/assets/image/system/close_light@2x.png') center center no-repeat;
                background-size: 30px 30px;
            }
        }
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
