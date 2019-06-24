<template>
<div class="main">
    <group class="xy-cell"><x-input v-model="usernum" @on-change="change" placeholder="请输入账户名"></x-input></group>
</div>
</template>
<script>
export default {
    data(){
        return{
            usernum:''
        }
    },
    methods:{
        change(){
            this.$emit('childValue', this.usernum)
            this.$emit('childType', '账户')
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    .xy-cell{
        .weui-cell{
            border-right:none;
            border-left:none;
            border-radius: 0;
        }
    }
}
</style>
