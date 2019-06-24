<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">修改昵称</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="pad"></div>
    <div class="user-inp">
        <input v-model="nickname" onkeyup="this.value=this.value.replace(/\s+/g,'')" />
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            nickname:''
        }
    },
    created(){
        this.nickname = this.$store.state.userinfo.nickname
    },
    methods:{
        async comfirm(){
            var step_nickname = this.$store.state.userinfo.nickname
            if(this.nickname!=step_nickname && this.nickname!=''){
                this.$vux.loading.show({
                    text: '修改中',
                })
                var obj = {
                    nickname:this.nickname
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
            this.nickname = this.$store.state.userinfo.nickname
            this.$emit('close',false)
        }
    }
}
</script>
<style lang="scss" scoped>
.pancel-main{
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
    .pad{
        width:100%;
        height: 30px;
    }
    .xy-cell{
        margin-top:-30px;
        .weui-cell{
            border-right:none;
            border-left:none;
            border-radius: 0;
        }
    }
    .user-inp input{
        display: block; width: 100%; height: 84px; border-top: 1px solid #d2d2d2; border-bottom: 1px solid #d2d2d2; padding: 2.667vw 4vw; box-sizing: border-box; font-size: 28px;
    }
}
</style>
