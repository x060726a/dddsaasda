<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>设置资金密码</span></div>
    </div>
    <div class="content">
        <p @click="popupVisible=false" ref="text">请先设置提现密码，建议勿与银行卡密码相同</p>
        <div class="item-group" @click="popupVisible=true">
            <span :class="{'done':password.length>=1}"><i></i></span>
            <span :class="{'done':password.length>=2}"><i></i></span>
            <span :class="{'done':password.length>=3}"><i></i></span>
            <span :class="{'done':password.length>=4}"><i></i></span>
            <span :class="{'done':password.length>=5}"><i></i></span>
            <span :class="{'done':password.length>=6}"><i></i></span>
        </div>
    </div>
    <popup v-model="popupVisible" position="bottom" :show-mask="false" class="pasword-pancel">
        <div class="keypo" @click="getDome">
            <div class="row"><span>1</span><span>2</span><span>3</span></div>
            <div class="row"><span>4</span><span>5</span><span>6</span></div>
            <div class="row"><span>7</span><span>8</span><span>9</span></div>
            <div class="row"><span></span><span>0</span><span>删除</span></div>
        </div>
    </popup>
</div>
</template>
<script>
import { Popup } from 'vux'
export default {
    data(){
        return{
            popupVisible:false,
            password:'',
            password_One:''
        }
    },
    created(){
        var that = this
        setTimeout(()=>{
            that.popupVisible = true
        },200)
    },
    methods:{
        getDome(){
            var  that = this
            if(event.target.textContent=='') return;
            if(event.target.textContent=='删除'){
                //删除
                if(that.password.length>0){
                    that.password = that.password.substring(0,that.password.length-1,1)
                }
            }else{
                //添加
                if(that.password.length<=6){
                    that.password = that.password +''+event.target.textContent
                    if(that.password_One!=''){
                        if(that.password.length==6){
                            if(that.password!=that.password_One){
                                that.$vux.toast.text('两次密码不一致','bottom')
                                that.$refs.text.textContent = '请先设置提现密码，建议勿与银行卡密码相同'
                                that.password = ''
                                that.password_One = ''
                            }else{
                                //设置资金密码
                                that.setConinPasw()
                            }
                        }
                        return
                    }
                    if(that.password.length==6){
                        that.$vux.loading.show({
                            text: '正在设置',
                        })
                        setTimeout(()=>{
                            that.$vux.loading.hide();
                            that.$refs.text.textContent = '请再次输入提现密码'
                            that.password_One = that.password
                            that.password = ''
                        },500)
                    }
                }
            }
        },
        setConinPasw(){
            var that = this,obj = {
                coin_password:that.password,
                confirm_coin_password:that.password_One
            },
            userinfo = JSON.parse(localStorage.getItem('userinfo'))
            that.$post('setConinPasw',obj).then(res=>{
                that.$vux.toast.text(res.msg_zh,'bottom')
                if(res.code==0){
                    userinfo.isset_coin_pwd = true
                    that.$store.commit('userinfo',userinfo)
                    setTimeout(()=>{
                        that.$router.push({path:'/bankcard'})
                    },500)
                }
            })
        }
    },
    components:{
        Popup
    }
}
</script>
<style lang="scss" scoped>
.content{
    p{
        padding-top:93px;
        font-size: 28px;
        color: #666666;
        text-align: center;
        margin-bottom:33px;
    }
    .item-group{
        display: flex;
        border: 1px solid #D2D2D2;
        width:480px;
        margin: auto;
        span{
            flex: 1;
            border-right:1px solid #D2D2D2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        span.done{
            i{
                width:30px;
                height: 30px;
                background: #000;
                border-radius: 50%;
            }
        }
        span:last-child{
            border-right:none;
            width:78px;
            height: 78px;
        }
    }
}
.pasword-pancel{
    height: 480px!important;
    box-shadow: 0px -10px 40px #b7b7b78f;
    background: #fff;
    .keypo{
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
</style>
