<template>
<div class="pancel-main">
    <div class="other-header">
        <i class="back" @click="close"></i>
        <div class="title">修改电子邮箱</div>
        <span class="right-btn" @click="comfirm">确认</span>
    </div>
    <div class="pad"></div>
    <div class="pancel-content">
        <group class="xy-cell nobold"><x-input v-model="email" ref="input" type="text" :is-type="isEmail" @on-change="change" placeholder="请输入电子邮箱"></x-input></group>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            email:'',
            isEmail:function(value){
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                return{
                    valid:reg.test(value)
                }
            },
            timer:''
        }
    },
    created(){
        this.email = this.$store.state.userinfo.email
    },
    methods:{
        change(){
            var valid = this.$refs.input.valid
            if(valid){
                this.$emit('childValue', this.email)
                this.$emit('childType', '邮箱')
            }
            var temp = ''
            for(var i=0;i<this.email.length;i++){
                temp += this.email.charAt(i).replace(/[\u4e00-\u9fa5]/g,'')
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
                this.email = temp
            },100)
        },
        async comfirm(){
            var step_email = this.$store.state.userinfo.email
            var reg = new RegExp(/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/)
            if(this.email==''){
                this.$emit('close',false)
                return;
            }
            if(!reg.test(this.email)){
                this.$vux.toast.text('请输入正确的邮箱地址','bottom')
                return
            }
            if(this.email!=step_email){
                this.$vux.loading.show({
                    text: '修改中',
                })
                var obj = {
                    email:this.email
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
            this.email = this.$store.state.userinfo.email
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
