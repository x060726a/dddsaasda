<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>填写验证码</span></div>
    </div>
    <div class="content">
        <div class="text">和对方数据库</div>
        <div class="input-group">
            <group class="xy-cell bankcard-cell border-b">
                <x-input title="姓名" ref="input01" :required="true" placeholder="请输入姓名" is-type="china-name"></x-input>
            </group>
        </div>
    </div>
</div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.border-b{
    border-bottom:1px solid #d2d2d2;
}
.main{
    height: 100%;
    background: #f7f7f7;
    .content{
        .text{
            padding-left:20px;
            padding-top:33px;
            padding-bottom:15px;
            line-height: 37px;
            font-size: 26px;
            color:#999;
        }
    }
}
</style>