<template>
    <section class="betsHead">
        <header class="headTop">
            <span @touchstart="openGame()">{{title}}<i class="i_more" ref="i_more"></i></span>
            <i class="icon-left" @click="$router.push('/')"></i>
            <i class="icon-right" @touchstart.prevent="popupShow = !popupShow, popupShow ? get_setting() : ''"></i>
        </header>
        <div class="popupNav-cover" v-if="popupShow" @click.stop="popupShow = !popupShow">
            <ol class="popupNav-inner" @click.stop="">
                <li><router-link :to="{path:'/betRecord',query:{name:title,id:$route.query.id}}"><i class="inner1"></i>投注记录</router-link></li>
                <li><router-link :to="{path:'/historyOpenDetail',query:{id:$route.query.id,name:title,isFromList:false}}"><i class="inner2"></i>开奖走势</router-link></li>
                <li><router-link to="/Rules"><i class="inner3"></i>玩法规则</router-link></li>
                <li><a :href="firmUrl" target="_blank"><i class="inner4"></i>联系客服</a></li>
            </ol>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'betsHead',
        props: {
            title: String, // 标题
        },
        data () {
            return {
                popupShow: false,
                gameShow: false,
                firmUrl: ''
            }
        },
        methods: {
            openGame () {
                this.gameShow = !this.gameShow
                if (this.gameShow) this.$refs.i_more.style.cssText = 'transform: rotate(180deg)'
                if (!this.gameShow) this.$refs.i_more.style.cssText = 'transform: rotate(0)'
                this.$emit('gameOpen')
            },
            // 在线客服链接
            get_setting () {
                this.$get('setting', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.firmUrl = res.data.online_service.value
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .betsHead {
        position: absolute; top: 0; width: 100%; z-index: 300;
        .headTop {
            position: absolute; top: 0; width: 100%; background: #D9342F; color: #fff; font-size: 36px; text-align: center;
            span {
                position: relative; display: inline-block; height: 88px; line-height: 88px; padding-right: 60px;
                .i_more {
                    position: absolute; top: 32px; right: 0; width: 40px; height: 23px; background: url("~@/assets/image/system/cp-icon-down.png") no-repeat center; background-size: cover;
                    transition: all .3s ease-in-out;
                }
            }
            .icon-left {
                position: absolute; top: 0; left: 0; width: 78px; height: 88px; background: url("~@/assets/image/system/headback.png") no-repeat center; background-size: 26px 44px;
            }
            .icon-right {
                position: absolute; top: 0px; right: 20px; width: 40px; height: 88px; background: url("~@/assets/image/play/icon-more@2x.png") no-repeat center; background-size: 40px 10px;
            }
        }
        .popupNav-cover {
            position: fixed; width: 100%; height: 100%; top: 87px; background: rgba(0,0,0,.35);
            .popupNav-inner {
                position: absolute; top: 20px; right: 20px; width: 240px; background: white; border-radius: 6px;
            }
            .popupNav-inner:before {
                content: ''; position: absolute; top: -14px; right: 14px; width: 0; height: 0;
                border-style: solid;
                border-width: 0 14px 14px 14px;
                border-color: transparent transparent white transparent;
            }
            .popupNav-inner li a {
                display: block; padding-left: 35px; color: #333; font-size: 28px; line-height: 80px; border-bottom: 1px solid #d2d2d2;
                i {
                    float: left; width: 34px; height: 36px; margin: 20px 20px 0 0; background: url("~@/assets/image/play/inner1.png") no-repeat center; background-size: cover;
                }
                .inner2 {
                    width: 35px; height: 35px; margin-right: 19px; background: url("~@/assets/image/play/inner2.png") no-repeat center; background-size: cover;
                }
                .inner3 {
                    width: 33px; height: 36px; margin-right: 21px; background: url("~@/assets/image/play/inner3.png") no-repeat center; background-size: cover;
                }
                .inner4 {
                    width: 31px; height: 34px; margin-right: 23px; background: url("~@/assets/image/play/inner4.png") no-repeat center; background-size: cover;
                }
            }
        }
    }
</style>
