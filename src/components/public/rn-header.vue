<template>
    <div class="rn-header">
        <h1>
            <i class="icon-left" @click="get_Back()"></i>{{title}}
            <i class="icon-right" v-if="iconRight"></i>
        </h1>
    </div>
</template>

<script>
    export default {
        props: {
            title: String, // 标题
            iconRight: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            get_Back () {
                if (this.$route.path == '/login') {
                    this.$router.push('/')
                } else {
                    window.history.go(-1)
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .rn-header {
        height: 88px; line-height: 88px; background: $theme-color; color: #fff; font-size: 36px; text-align: center;
        .icon-left {
            position: absolute; top: 0; left: 0; width: 78px; height: 88px; background: url("~@/assets/image/system/headback.png") no-repeat center; background-size: 26px 44px;
        }
        .icon-right {
            position: absolute; top: 22px; right: 20px; width: 41px; height: 44px; background: url("~@/assets/image/documentary/rule.png") no-repeat center; background-size: cover;
        }
    }
</style>
