<template>
    <section class="index">
        <!--标题-->
        <HomeHeader :title="title" :down="true" />
        <div class="scroX" v-if="data">
            <scroller lock-x ref="scroller" height="100%">
                <div>
                    <!--轮播-->
                    <HomeBanner :banner="banner" />
                    <keep-alive>
                        <!--主体-->
                        <HomeMain
                                @resetHeight="resetHeight"
                                @sign="sign"
                                :serverTime="serverTime"
                                :notice="notice"
                                :lotterList="lotterList"
                                :realTimeData="realTimeData"
                                :userDynamics="userDynamics"
                        />
                    </keep-alive>
                </div>
            </scroller>
        </div>
        <!--签到弹窗-->
        <div class="signMask" v-if="signShow">
            <section class="signBox">
                <h3 class="signTitle">活动规则说明<i class="iconX" @click="signShow = false"></i></h3>
                <p class="signTips">完成以下任意任务即可参与平台常规任务和每日签到活动</p>
                <ol class="signList">
                    <li><em></em>当天内累计充值达<i class="rd">{{signObj.user_deposit_coin_limit}}</i>元,当前累计充值<i class="rd">{{signObj.user_deposit_coin}}</i>元,还差<i class="rd">{{signObj.user_deposit_need}}</i>元</li>
                    <li><em></em>当天内累计投注达<i class="rd">{{signObj.user_bets_coin_limit}}</i>元,当前累计投注<i class="rd">{{signObj.user_bets_coin || 0}}</i>元,还差<i class="rd">{{signObj.user_bets_need}}</i>元</li>
                </ol>
            </section>
        </div>

    </section>
</template>
<script>
    import {formatDate} from '@/assets/js/util'
    export default {
        components: {
            HomeHeader () {
                return {
                    component: import('./module/header')
                }
            },
            HomeBanner () {
                return {
                    component: import('./module/HomeBanner')
                }
            },
            HomeMain () {
                return {
                    component: import('./module/HomeMain')
                }
            }
        },
        data () {
            return {
                title: '易趣彩票',
                data: null,
                signShow: false, // 签到弹窗
                signObj: null,
                serverTime: 0, // 服务器时间
                banner: [], // 轮播图
                lotterList: [], // 彩种信息
                notice: [], // 公告
                realTimeData: {}, // 实时数据
                userDynamics: [], // 用户动态
                setintvalTimer:''
            }
        },
        methods: {
            // 获取首页数据
            getInfo () {
                this.$vux.loading.show({text: '加载中'})
                this.$get('honeData', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.data = res.data
                    this.serverTime = res.data.server_time
                    this.banner = res.data.banner
                    this.lotterList = res.data.lottery
                    this.notice = res.data.notice
                    this.realTimeData = res.data.real_time_data
                    this.userDynamics = res.data.user_dynamics
                    this.userDynamics.forEach(res => {
                        let time = new Date(res.created_at * 1000)
                        res.time = formatDate(time, 'MM-dd hh:mm')
                    })
                    localStorage.setItem('lotterList', JSON.stringify(this.lotterList))
                    this.$nextTick(() => setTimeout(() => { this.$refs.scroller.reset() }, 50))
                })
            },
            resetHeight () {
                this.$nextTick(() => setTimeout(() => {this.$refs.scroller.reset()}, 50))
            },
            // 游戏时间获取
            getGameTime(){
                this.$get('lotteryTime',{}).then(res=>{
                    if(res.code==0){
                        this.lotterList = res.data.lottery
                        this.serverTime = res.data.server_time
                    }
                })
            },
            // 签到
            sign () {
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
                }
                this.$vux.loading.show()
                this.$get('userSign', {}).then(res => {
                    this.$vux.loading.hide()
                    if (res.code == 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    if (res.code == 20001) this.signShow = true, this.signObj = JSON.parse(res.msg)
                })
            }
        },
        created () {
            this.getInfo()
            this.setintvalTimer = setInterval(()=>{ this.getGameTime() }, 12000)
        },
        destroyed(){
            clearInterval(this.setintvalTimer)
        }
    }
</script>

<style lang="scss" scoped>
    .index {
        height: 100%; background: #f3f3f3;
        .scroX {
            height: calc(100% - 90px);
        }
        .signMask {
            position: absolute; top: 0; left: 0; z-index: 99; width: 100%; height: 100%; background: rgba(0,0,0,.4);
            .signBox {
                position: absolute; top: 50%; left: 50%; width: 86%; margin-left: -43%; border-radius: 6px; background: white; color: #999; font-size: 28px; transform: translateY(-50%);
                .signTitle {
                    height: 80px; line-height: 80px; color: white; font-size: 30px; text-align: center; background: #d9342f;
                    border-top-left-radius: 6px; border-top-right-radius: 6px;
                    .iconX {
                        position: absolute; top: 27px; right: 24px; width: 26px; height: 26px; background: url("~@/assets/image/play/icon-close.png") no-repeat center; background-size: cover;
                    }
                }
                .signTips {
                    margin: 30px 0 24px; padding: 0 30px; color: #000; text-align: justify; line-height: 35px;
                }
                .signList {
                    padding: 0 30px 45px;
                    li {
                        text-align: justify; line-height: 35px;
                        .rd { color: #d9342f; }
                        em {
                            float: left; height: 35px; width: 6px; margin-right: 20px; background: #d9342f;
                        }
                    }
                    li:first-child {
                        padding-bottom: 19px; margin-bottom: 20px; border-bottom: 1px solid #d2d2d2;
                    }
                }
            }
        }
    }
</style>
