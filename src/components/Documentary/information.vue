<template>
    <section class="information">
        <TrayHeader :title="title" />
        <div class="userInfo clearfix"  >
            <a>
                <img :src="info.avatar" alt="易趣彩票" />
                <div>
                    <p>{{info.nickname}}&nbsp;&nbsp;
                        <span :class="{'l1' : info.level == '普通会员', 'l2' : info.level == '白银会员', 'l3' : info.level == '黄金会员', 'l4' : info.level == '铂金会员', 'l5' : info.level == '钻石会员', 'l6' : info.level == '至尊会员'}"></span>
                    </p>
                    <strong>粉丝 {{info.fans_num}}   |  关注  {{info.follows_num}}</strong>
                </div>
            </a>
            <strong v-if="!is_followed" class="title-T" @touchstart.stop="follow()">关注</strong>
            <strong v-else class="title-T" @touchstart.stop="followDel()">已关注</strong>
        </div>
        <section class="probability comm-W">
            <strong>
                <em>近10期命中</em><span>{{info.bet_num}}中{{info.win_num}}</span>
            </strong>
            <strong>
                <em>10期奖金</em><span>{{info.bonus}}</span>
            </strong>
            <strong>
                <em>10期胜率</em>
                <span>{{info.probably}}%</span>
            </strong>
            <i></i><i></i>
        </section>
        <div class="scroX" v-if="list.length > 0">
            <scroller lock-x ref="scroller" height="100%"
                      use-pulldown
                      use-pullup
                      :pulldown-config="$root.pullDownObj"
                      :pullup-config="$root.pullUpObj"
                      @on-pulldown-loading="get_Info(false)"
                      @on-pullup-loading='get_Info(true)'>
                <div>
                    <section v-for="(res, key) in list" :key="key" class="betList comm-W">
                        <p class="slogan">{{res.announce}}</p>
                        <div v-if="res.status == 0" class="detalsList clearfix" @click="$router.push({path: '/unDetails', query: {id: Number(res.id), uid: Number(res.uid)}})">
                            <div class="list-left">
                                <span>
                                    <em>类型</em><em>自购金额</em><em>单倍金额</em>
                                </span>
                                <span :class="{'spRd': Number(res.status != 2)}">
                                    <em class="bold">{{res.lottery_title}}</em><em>￥{{res.coin}}</em><em>￥{{res.minimum_coin}}</em>
                                </span>
                            </div>
                            <div class="list-right">
                                <a @click="$router.push({path: '/unDetails', query: {id: Number(res.id), uid: Number(res.uid)}})">跟单</a>
                            </div>
                        </div>
                        <div v-else class="detalsList clearfix" @click="$router.push({path: '/unDetails', query: {id: Number(res.id), uid: Number(res.uid)}})">
                            <div class="list-con">
                            <span>
                                <em>类型</em><em>自购金额</em><em>单倍金额</em><em>奖金</em>
                            </span>
                            <span :class="{'spRd': Number(res.status != 2)}">
                                <em class="bold">{{res.lottery_title}}</em><em>￥{{res.coin}}</em><em>￥{{res.minimum_coin}}</em><em>￥{{res.bonus}}</em>
                            </span>
                            </div>
                        </div>
                        <p class="times clearfix">
                            <span class="time-f">截止：{{res.time}}</span>
                            <span class="time-r">开奖：{{res.newTime}}</span>
                        </p>
                    </section>
                </div>
                <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
            </scroller>
        </div>
        <!--暂无数据-->
        <div v-else class="noData">
            <i class="nodataIcon"></i>
            <p>暂无数据</p>
        </div>
    </section>
</template>

<script>
    import {formatDate} from '@/assets/js/util'
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "information",
        components: {
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '个人信息',
                uid: '', // 与用户ID
                info: '', // 会员信息
                list: [],// 跟单列表
                offset: 0, // 每页数据
                is_followed: false,
                isNoMoreData: false // 没有更多数据
            }
        },
        methods: {
            get_Info(bool) {
                this.$vux.loading.show({text: '加载中'})
                this.$get('folluserBet', {uid: this.uid, offset: bool ? this.offset : 0}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    if (bool && res.data.offset == 0) { // 上拉加载
                        this.list = this.list
                        if (res.data.list.length < 20) this.isNoMoreData = true, this.$refs.scroller.disablePullup() // 暂无更多数据
                        this.$nextTick(()=> {this.$refs.scroller.donePullup()})
                    } else {
                        this.list = res.data.list, this.info = res.data.info
                        if (this.$refs.scroller) this.$refs.scroller.donePulldown()
                    }
                    this.list.forEach(res => {
                        let time = new Date(res.freezed_at * 1000)
                        let newTime = new Date(res.open_time * 1000)
                        res.time = formatDate(time, 'MM-dd hh:mm')
                        res.newTime = formatDate(newTime, 'MM-dd hh:mm')
                    })
                    this.is_followed = res.data.info.is_followed
                    this.offset = res.data.offset
                    if (this.$refs.scroller) this.$refs.scroller.reset()
                })
            },
            // 关注、取消关注
            follow () {
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
                this.$post('follUser', { to_uid: this.uid }).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.is_followed = res.data.is_followed
                    this.$vux.toast.text('关注成功', 'middle')
                })
            },
            followDel () {
                this.$post('cancelFollows', { to_uid: this.uid }).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.is_followed = res.data.is_followed
                    this.$vux.toast.text('取消成功', 'middle')
                })
            },
        },
        created () {
            this.uid = this.$route.query.uid
            this.get_Info(false)
        }
    }
</script>

<style scoped lang="scss">
    .information {
        height: 100%; background: #f3f3f3;
        .scroX {
            height: calc(100% - 338px);
        }
        .comm-W { background: white; }
        .comm-W { background: white; }
        .userInfo {
            padding: 9px 30px 29px 20px; color: white; font-size: 26px; background: #d9342f;
            a {
                float: left;
                img {
                    float: left; width: 100px; height: 100px; margin-right: 20px;
                }
                div {
                    float: left;
                    p {
                        font-size: 30px; line-height: 42px; margin: 6px 0 9px;
                        span {
                            float: right; width: 126px; height: 30px; margin-top: 5px;
                        }
                        @for $i from 1 through 6 {
                            span.l#{$i} {
                                background: url('/static/images/levelbadge/l#{$i}.png')no-repeat center; background-size: cover;
                            }
                        }
                    }
                    strong {
                        float: left; line-height: 37px; font-size: 26px;
                    }
                }
            }
            .title-T {
                float: right; width: 109px; height: 50px; margin-top: 25px; text-align: center; line-height: 48px; border: 2px solid #fff; border-radius: 6px;
            }
        }
        .probability {
            position: relative; display: flex; height: 100px; margin-bottom: 20px;
            strong {
                flex: 1; padding-top: 12px; color: #999; font-size: 24px; text-align: center;
                span {
                    display: block; color: #d9342f; font-size: 32px;
                }
            }
            i {
                position: absolute; left: 33.333%; top: 30px; width: 1px; height: 40px; background: #d2d2d2;
            }
            i:last-child {
                left: 66.666%;
            }
        }
        .betList {
            padding: 26px 20px 16px; margin-bottom: 20px;
            .slogan {
                color: #333; font-size: 26px; line-height: 37px;
            }
            .detalsList {
                margin: 15px 0 6px; border: 1px solid #d2d2d2;
                .list-left, .list-con {
                    float: left; width: 75%; border-right: 1px solid #d2d2d2;
                    span {
                        display: flex; height: 65px; line-height: 65px; color: #999; font-size: 28px;
                        em {
                            flex: 1; text-align: center;
                        }
                    }
                    span:last-child {
                        color: #333; font-weight: bold; border-top: 1px solid #d2d2d2;
                        .bold {
                            color: #333; font-weight: normal;
                        }
                    }
                    span.spRd { color: #d9342f; }
                }
                .list-right {
                    float: right; width: 25%;
                    a {
                        display: block; width: 146px; height: 60px; margin: 33px auto 0; font-size: 30px; line-height: 60px; text-align: center; background: #d9342f; border-radius: 5px;
                    }
                }
                .list-con {
                    width: 100%; border: none;
                }
            }
            .times {
                color: #999; font-size: 22px; line-height: 30px;
                .time-f { float: left; }
                .time-r { float: right; }
            }
        }
    }
</style>
