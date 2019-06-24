<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">选择默认头像</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="avatar-main">
        <div class="item" :class="{active:active==1}" @click="setting(1)"><span v-show="active==1"></span></div>
        <div class="item" :class="{active:active==2}" @click="setting(2)"><span v-show="active==2"></span></div>
        <div class="item" :class="{active:active==3}" @click="setting(3)"><span v-show="active==3"></span></div>
        <div class="item" :class="{active:active==4}" @click="setting(4)"><span v-show="active==4"></span></div>
        <div class="item" :class="{active:active==5}" @click="setting(5)"><span v-show="active==5"></span></div>
        <div class="item" :class="{active:active==6}" @click="setting(6)"><span v-show="active==6"></span></div>
        <div class="item" :class="{active:active==7}" @click="setting(7)"><span v-show="active==7"></span></div>
        <div class="item" :class="{active:active==8}" @click="setting(8)"><span v-show="active==8"></span></div>
        <div class="item" :class="{active:active==9}" @click="setting(9)"><span v-show="active==9"></span></div>
    </div>
</div>
</template>
<script>
import { mapState } from 'Vuex'
export default {
    data(){
        return{
            active:0,
        }
    },
    computed:{
        ...mapState(['userinfo'])
    },
    created(){
        console.log(this.active);
        var str = this.$store.state.userinfo.avatar
        this.active = str.substring(str.indexOf('avatar/')+7,str.length).substring(0,1)
    },
    methods:{
        setting(index){
            this.active = index
        },
        async comfirm(){
            var str = this.$store.state.userinfo.avatar
            var imgnum = str.substring(str.indexOf('avatar/')+7,str.length).substring(0,1)
            if(this.active*1!==imgnum*1){
                this.$vux.loading.show({
                    text: '修改中',
                })
                var obj = {
                    avatar:this.active
                }
                let res = await this.$root.upuserData(obj)
                if(res.code==0){
                    this.$store.commit('userinfo',res.data)
                    this.$vux.toast.text(res.msg_zh,'bottom')
                    this.$emit('close',false)
                }
                this.$vux.loading.hide();
            }else{
                this.$emit('close',false)
            }
        },
        close(){
            var str = this.$store.state.userinfo.avatar
            this.active = str.substring(str.indexOf('avatar/')+7,str.length).substring(0,1)
            this.$emit('close',false)
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
.avatar-main{
    padding:40px 60px 0 60px;
    overflow: hidden;
    background: #f7f7f7;
    height: calc(100% - 100px);
    .item{
        width:170px;
        height: 170px;
        font-size: 0;
        float: left;
        margin-right:60px;
        margin-bottom:50px;
        position: relative;
        span{
            display: block;
            position: absolute;
            bottom:0;
            right:0;
            width:44px;
            height: 44px;
            background: url("~@/assets/image/system/xuanze@2x.png") no-repeat;
            background-size: 100% 100%;
        }
        img{
            width: 100%;
        }
    }
    .active::before{
        content:'';
        display: block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 50%;
        background: rgba(255,255,255,.4);
    }
    .item:nth-child(1){
        background: url("~@/assets/image/system/avatar/avatar_1@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(2){
        background: url("~@/assets/image/system/avatar/avatar_2@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(3){
        background: url("~@/assets/image/system/avatar/avatar_3@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(4){
        background: url("~@/assets/image/system/avatar/avatar_4@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(5){
        background: url("~@/assets/image/system/avatar/avatar_5@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(6){
        background: url("~@/assets/image/system/avatar/avatar_6@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(7){
        background: url("~@/assets/image/system/avatar/avatar_7@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(8){
        background: url("~@/assets/image/system/avatar/avatar_8@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(9){
        background: url("~@/assets/image/system/avatar/avatar_9@2x.png") no-repeat;
        background-size: 100% 100%;
    }
    .item:nth-child(3n){
        margin-right:0;
    }
}
</style>
