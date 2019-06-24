<template>
<div class="main">
    <h1>*中文名只能修改一次</h1>
    <group class="xy-cell"><x-input v-model="realname" @on-change="change" is-type="china-name" placeholder="请输入中文名"></x-input></group>
</div>
</template>
<script>
export default {
    data(){
        return{
            realname:''
        }
    },
    methods:{
        change(){
            this.$emit('childValue', this.realname)
            this.$emit('childType', '持卡人中文名')
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    h1{
        font-size: 24px;
        padding-top:25px;
        padding-bottom:10px;
        padding-left:30px;
        color:#999;
    }
    .xy-cell{
        margin-top:-25px;
        .weui-cell{
            border-right:none;
            border-left:none;
            border-radius: 0;
        }
    }
}
</style>
