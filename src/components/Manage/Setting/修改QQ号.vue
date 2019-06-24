<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">修改QQ号</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="pad"></div>
    <div class="pancel-content">
         <group class="xy-cell nobold"><x-input v-model="qq" keyboard="number" type="number" placeholder="请输入QQ号" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))'></x-input></group>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            qq:''
        }
    },
    created(){
        this.qq = this.$store.state.userinfo.qq
    },
    methods:{
        async comfirm(){
            var step_qq = this.$store.state.userinfo.qq
            if(this.qq!=step_qq && this.qq!=''){
                this.$vux.loading.show({
                    text: '修改中',
                })
                var obj = {
                    qq:this.qq
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
            this.qq = this.$store.state.userinfo.qq
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
.pancel-main{
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
}
</style>
