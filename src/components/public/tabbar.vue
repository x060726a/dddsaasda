<template>
    <div class="footer" id="cus_footer">
        <router-link class="home" to="/main">
            <span></span>
            <span>首页</span>
        </router-link>
        <router-link to="/documentary" class="order">
            <span></span>
            <span>跟单</span>
        </router-link>
        <router-link class="lottery" to="/historyOpen">
            <span></span>
            <span>开奖</span>
        </router-link>
        <a class="manage" @click="goRouter" :class="{active:routerStatus.title=='Manage'}">
            <span></span>
            <span>我的</span>
        </a>
    </div>
</template>
<script>
import { mapGetters } from 'Vuex'
export default {
    computed:{
        ...mapGetters(['routerStatus'])
    },
    methods:{
        goRouter(){
            if (!this.$cookie.get('webToken')) {
                let _this = this
                return this.$vux.confirm.show({
                    title: '温馨提示',
                    content:'您还未登录，请先登录！',
                    confirmText:'确认',
                    showCancelButton:false,
                    onConfirm () {
                        _this.$router.push({path:'/login'})
                    }
                })
            }else{
                this.$router.push({path:'/manage'})
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .footer{
        width:100%;
        height: 100px;
        position: fixed;
        bottom:0;
        left: 0;
        display: flex;
        border-top:#D2D2D2 1px solid;
        background: #fff;
        >a{
            flex: 1;
            >span:first-child{
                display: block;
                margin: 10px auto 8px auto;
                img{
                    width:100%;
                }
            }
            >span:last-child{
                display: block;
                font-size: 20px;
                line-height: 28px;
                color:#999;
                text-align: center;
            }
        }
        >a.home{
            >span:first-child{
                width: 50px; height: 47px;
                background: url('~@/assets/image/system/home@2x.png') no-repeat;
                background-size: cover;
            }
        }
        >a.order{
            >span:first-child{
                width: 49px; height: 50px;
                background: url('~@/assets/image/system/sponsor@2x.png') no-repeat;
                background-size: cover;
            }
        }
        >a.lottery{
            >span:first-child{
                width: 45px; height: 50px;
                background: url('~@/assets/image/system/countdown@2x.png') no-repeat;
                background-size: cover;
            }
        }
        >a.manage{
            >span:first-child{
                width: 45px; height: 50px;
                background: url('~@/assets/image/system/people@2x.png') no-repeat;
                background-size: cover;
            }
        }
        >a.home.active{
            >span:first-child{
                background: url('~@/assets/image/system/home@2xactive.png') no-repeat;
                background-size: 100% 100%;
            }
            >span:last-child{
                color:$theme-color;
            }
        }
        >a.order.active{
            >span:first-child{
                background: url('~@/assets/image/system/sponsor@2xactive.png') no-repeat;
                background-size: 100% 100%;
            }
            >span:last-child{
                color:$theme-color;
            }
        }
        >a.lottery.active{
            >span:first-child{
                background: url('~@/assets/image/system/countdown@2xactive.png') no-repeat;
                background-size: 100% 100%;
            }
            >span:last-child{
                color:$theme-color;
            }
        }
        >a.manage.active{
            >span:first-child{
                background: url('~@/assets/image/system/people@2xactive.png') no-repeat;
                background-size: 100% 100%;
            }
            >span:last-child{
                color:$theme-color;
            }
        }
    }
</style>
