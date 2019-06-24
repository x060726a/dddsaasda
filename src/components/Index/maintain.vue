<template>
    <section class="maintain">
        <strong class="icon"></strong>
        <p class="info">系统维护升级中</p>
    </section>
</template>

<script>
    export default {
        name: "maintain"
    }
</script>

<style scoped lang="scss">
    .maintain {
        height: 100%; padding-top: 326px;
        .icon {
            display: block; width: 352px; height: 304px; margin: 0 auto 28px; background: url("~@/assets/image/index/maintain.png") no-repeat center; background-size: cover;
        }
        .info {
            color: #666; font-size: 36px; text-align: center;
        }
    }
</style>
