<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">修改微信号</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="pad"></div>
    <div class="pancel-content">
        <group class="xy-cell nobold"><x-input v-model="wechat" ref="input" :is-type="isWechat" @on-change="change" placeholder="请输入微信号"></x-input></group>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            wechat:'',
            isWechat:function(value){
                var reg = /^[0-9a-zA-Z]+$/
                return{
                    valid:reg.test(value)
                }
            },
            timer:''
        }
    },
    created(){
        this.wechat = this.$store.state.userinfo.wechat
    },
    methods:{
        change(){
            console.log(123);
            clearTimeout(this.timer)
            if(this.$refs.input.valid){
                this.$emit('childValue', this.wechat)
                this.$emit('childType', '微信')
            }
            var temp="" 
            for(var i=0;i<this.wechat.length;i++){
                temp += this.wechat.charAt(i).replace(/[\u4e00-\u9fa5]/g,'')
            }
            this.timer = setTimeout(()=>{
                this.wechat = temp
            },100)
        },
        async comfirm(){
            var step_wechat = this.$store.state.userinfo.wechat
            if(this.wechat!=step_wechat && this.wechat!=''){
                this.$vux.loading.show({
                    text: '修改中',
                })
                var obj = {
                    wechat:this.wechat
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
            this.wechat = this.$store.state.userinfo.wechat
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
