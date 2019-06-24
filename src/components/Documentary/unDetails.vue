<template>
    <section class="unDetails">
        <TrayHeader :title="title" />
        <div class="scroX">
            <scroller lock-x ref="scroller" height="100%" >
                <div>
                    <section class="userInfo comm-W">
                        <div class="title-U clearfix">
                            <a @click="$router.push({path: '/information', query: {uid: Number(data.uid)}})">
                                <img :src="data.avatar" alt="易趣彩票" />
                                <div>
                                    <p>{{data.nickname}}</p>
                                    <strong>近{{data.bet_num}}中{{data.win_num}}</strong>
                                    <strong>命中{{data.probably}}%</strong>
                                </div>
                            </a>
                            <strong v-if="!is_followed" class="title-T" @touchstart.stop="follow">关注</strong>
                            <strong v-else class="title-T" @touchstart.stop="followDel">已关注</strong>
                        </div>
                        <p class="slogan">{{data.announce}}</p>
                        <div class="detalsList">
                            <span>
                                <em>类型</em><em>自购金额</em><em>单倍金额</em><em>跟单人数</em>
                            </span>
                            <span>
                                <em class="bold">{{data.lottery_title}}</em><em>￥{{data.coin}}</em><em>￥{{data.minimum_coin}}</em><em>{{data.initiate_nums}}人</em>
                            </span>
                        </div>
                    </section>
                    <!--跟单详情-->
                    <section class="listInfo">
                        <!--方案信息-->
                        <div class="comm-W">
                            <h3><i></i>方案信息</h3>
                            <ol class="list-ol">
                                <li>
                                    <strong>彩种类型：</strong><span>{{data.lottery_title}}</span>
                                </li>
                                <li>
                                    <strong>投注期号：</strong><span>第{{data.qihao}}期</span>
                                </li>
                                <li>
                                    <strong>投注方式：</strong><span>{{data.bet_method}}</span>
                                </li>
                                <li>
                                    <strong>自购金额：</strong><span>{{data.coin}}元</span>
                                </li>
                                <li>
                                    <strong>起跟金额：</strong><span>{{data.minimum_coin}}元</span>
                                </li>
                                <li>
                                    <strong>跟单信息：</strong><span>共{{data.initiate_coins}}元</span>
                                    <a @touchstart="goList">跟单列表</a>
                                </li>
                                <li>
                                    <strong>佣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</strong><span>{{data.comm_coin}}</span>
                                </li>
                                <li>
                                    <strong>状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：</strong>
                                    <span v-if="data.status == 0">招募中</span>
                                    <span v-if="data.status == 1">中奖</span>
                                    <span v-if="data.status == 2">未中奖</span>
                                    <span v-if="data.status == 3">平局</span>
                                    <span v-if="data.status == 9">招募截止</span>
                                </li>
                                <li>
                                    <strong>订单编号：</strong><span>{{data.order_id}}</span>
                                </li>
                                <li>
                                    <strong>下单时间：</strong><span>{{data.created_at}}</span>
                                </li>
                                <li>
                                    <strong>截止时间：</strong><span>{{data.freezed_at}}</span>
                                </li>
                                <li>
                                    <strong>方案宣言：</strong><span>{{data.announce}}</span>
                                </li>
                            </ol>
                        </div>
                        <!--投注详情-->
                        <div class="comm-W">
                            <h3><i></i>投注详情</h3>
                            <!--开奖跟单详情-->
                            <div class="betDetails" v-if="(data.status != 0 && data.public == 2) || data.public == 1">
                                <div class="details-box">
                                    <span>
                                        <em>彩种类型</em><em>期号</em><em>投注内容</em><em>彩果</em>
                                    </span>
                                    <span>
                                        <em>{{data.lottery_title}}</em><em>第{{data.qihao}}期</em><em>{{data.bet}}</em>
                                        <em v-if="data.status == 0" class="red">招募中</em>
                                        <em v-if="data.status == 1" class="red">中奖</em>
                                        <em v-if="data.status == 2" class="red">未中奖</em>
                                        <em v-if="data.status == 3" class="red">+0.00</em>
                                        <em v-if="data.status == 9" class="red">招募截止</em>
                                    </span>
                                </div>
                            </div>
                            <!--未开奖跟单详情-->
                            <p class="tips" v-if="data.status == 0 && data.public == 2">
                                <span>开奖后可查看投注信息</span>
                            </p>
                            <!--保密-->
                            <p class="tips" v-if="data.public == 0">
                                <span>投注信息已保密</span>
                            </p>
                        </div>
                    </section>
                </div>
            </scroller>
        </div>
        <!--开奖投注-->
        <div v-if="data.status == 0" class="pay clearfix">
            <div class="pay-left">
                <span class="f">投</span>
                <p class="f">
                    <i class="icon f" @click="subNum()">-</i>
                    <!--<input type="text" class="f rd" v-model="multiple" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' maxlength="3" />-->
                    <input type="number" class="f" v-model="multiple" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' oninput="if(value.length>6)value=value.slice(0,6)" />
                    <i class="icon f" @click="multiple++">+</i>
                </p>
                <span class="f">倍</span>
                <strong class="f rd">{{money}}元</strong>
            </div>
            <button class="pay-right" @click="follBet()">付款</button>
        </div>
        <p v-else>
            <router-link :to="lottery_name" class="betting">{{data.lottery_title}}投注</router-link>
        </p>
        <!--余额不足弹窗-->
        <div v-transfer-dom>
            <confirm v-model="noMoney" title="温馨提示" @on-confirm="$router.push('/recharge')">您的余额不足，请充值！</confirm>
        </div>
    </section>
</template>

<script>
    import { Confirm } from 'vux'
    import {formatDate} from '@/assets/js/util'
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "unDetails",
        components: {
            Confirm,
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '跟单详情',
                initiate_id: '', // 跟单ID
                uid: '', // 用户ID
                data: {},
                lottery_name: '',
                is_followed: false,
                noMoney: false, // 账户余额不足提示
                isLottery: false, // 是否开奖
                multiple: 1, // 投注倍数
                money: 0 // 金额
            }
        },
        watch: {
            multiple (val) {
                this.money = val * parseFloat(this.data.minimum_coin)
            },
            deep: true
        },
        methods: {
            get_Info () {
                this.$vux.loading.show({text: '加载中'})
                this.$get('follBetDetils', {initiate_id: this.initiate_id}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.data = res.data
                    this.is_followed = this.data.is_followed
                    this.lottery_name = res.data.lottery_name
                    this.uid = res.data.uid
                    this.money = parseFloat(res.data.minimum_coin)
                    let freezed_at = new Date(this.data.freezed_at * 1000)
                    let created_at = new Date(this.data.created_at * 1000)
                    this.data.freezed_at = formatDate(freezed_at, 'yyyy-MM-dd hh:mm:ss')
                    this.data.created_at = formatDate(created_at, 'yyyy-MM-dd hh:mm:ss')
                    this.$nextTick(() => setTimeout(() => { this.$refs.scroller.reset() }, 50))
                })
            },
            // 跟单列表
            goList () {
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
                } else {
                    this.$router.push({path: '/documentaryList', query: {id: this.initiate_id}})
                }
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
            // 跟单投注
            follBet () {
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
                if (this.multiple < 1) return this.$vux.toast.text(`起跟金额不得低于${this.data.minimum_coin}元`, 'middle')
                this.$vux.loading.show()
                this.$post('follBets', {id: this.initiate_id, nums: this.multiple}).then(res => {
                    this.$vux.loading.hide()
                    if (res.code !== 0 && res.msg_zh == '账户余额不足') return this.noMoney = true
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    sessionStorage.setItem('orderInfo', JSON.stringify(res.data))
                    this.$router.push('/payDetails')
                })
            },
            subNum () {
                this.multiple--
                if (this.multiple < 1) this.multiple = 1
            }
        },
        created () {
            this.initiate_id = this.$route.query.id
            this.get_Info()
        }
    }
</script>

<style scoped lang="scss">
    .unDetails {
        height: 100%; background: #f3f3f3; padding-bottom: 98px;
        .scroX {
            height: calc(100% - 88px);
        }
        .comm-W { background: white; }
        .userInfo {
            padding: 18px 20px 20px; margin-bottom: 20px;
            .title-U {
                a {
                    float: left;
                    img {
                        float: left; width: 80px; height: 80px; margin-right: 10px;
                    }
                    div {
                        float: left; color: #333;
                        p {
                            font-size: 26px; line-height: 37px; margin: 4px 0 3px 0;
                        }
                        strong {
                            float: left; height: 33px; margin-right: 10px; line-height: 33px; padding: 0 8px; border: 1px solid #d44743; border-radius: 5px; line-height: 30px; color: #d44743; font-size: 22px; text-align: center;
                        }
                        strong:last-child {
                            color: #3F8FEB; border-color: #3F8FEB;
                        }
                    }
                }
                .title-T {
                    float: right; margin: 16px 10px 0 0; width: 109px; height: 50px; color: white; font-size: 26px; line-height: 50px; text-align: center; background: #d9342f; border-radius: 6px;
                }
            }
            .slogan {
                margin: 13px 0 14px; color: #333; font-size: 26px; line-height: 37px;
            }
            .detalsList {
                border: 1px solid #d2d2d2;
                span {
                    display: flex; width: 100%; height: 63px; line-height: 63px; color: #999; font-size: 28px;
                    em {
                        flex: 1; text-align: center;
                    }
                }
                span:last-child {
                    color: #d9342f; font-weight: bold; border-top: 1px solid #d2d2d2;
                    .bold {
                        color: #333; font-weight: normal;
                    }
                }
            }
        }
        .listInfo {
            margin-bottom: 20px; color: #333;
            h3 {
                height: 80px; padding-left: 20px; line-height: 80px; font-size: 28px;
                i {
                    float: left; width: 6px; height: 36px; margin: 22px 20px 0 0; background: #d9342f;
                }
            }
            .list-ol {
                margin-bottom: 20px;
                li {
                    height: 80px; padding: 0 20px 0 30px; line-height: 80px; color: #666; font-size: 26px; border-top: 1px solid #d2d2d2; overflow: hidden;
                    strong {
                        width: 140px; color: #333;
                    }
                    strong, span {
                        float: left; transform: translateX(-15px); animation: wobble .3s ease-in-out .1s forwards; opacity: 0; text-align: left;
                        @keyframes wobble {
                            from {
                                transform:translateX(-15px);
                                opacity: 0;
                            }
                            to {
                                transform:translateX(0px);
                                opacity: 1;
                            }
                        }
                    }
                    a {
                        float: right; width: 142px; height: 50px; margin-top: 15px; line-height: 50px; text-align: center; background: #d9342f; border-radius: 6px;
                    }
                }
            }
            .betDetails {
                padding: 20px 18px; border-top: 1px solid #d2d2d2;
                .details-box {
                    border: 1px solid #d2d2d2;
                    span {
                        display: block; width: 100%; height: 80px; line-height: 80px; color: #333; font-size: 28px;
                        em {
                            float: left; width: 23.33%; text-align: center; overflow: hidden; text-overflow:ellipsis; white-space: nowrap;
                        }
                        em:nth-child(2) { width: 30%; }
                    }
                    span:first-child { background: #F3F3F3; }
                    span:last-child {
                        color: #666; font-size: 24px; border-top: 1px solid #d2d2d2;
                        .red {
                            color: #D44743;
                        }
                    }
                }
            }
            .tips {
                height: 140px; color: #999; font-size: 24px; text-align: center; line-height: 140px; border-top: 1px solid #d2d2d2;
            }
        }
        .betting {
            position: fixed; left: 0; bottom: 0; width: 100%; height: 98px; color: white; font-size: 34px; text-align: center; line-height: 98px; background: #d9342f;
        }
        .pay {
            position: fixed; left: 0; bottom: 0; width: 100%; height: 98px; line-height: 98px; background: white;
            .pay-left {
                float: left; width: 65%; height: 98px; padding-left: 18px; color: #333; font-size: 28px; border-top: 1px solid #d2d2d2; box-sizing: border-box;
                .f {
                    float: left;
                }
                .rd {
                    color: #D44743; font-size: 30px;
                }
                p {
                    margin: 19px 8px 0; border: 1px solid #d2d2d2; border-radius: 6px;
                    .icon {
                        width: 60px; height: 58px; line-height: 58px; color: #999; font-size: 42px; text-align: center;
                    }
                    input {
                        width: 110px; height: 58px; color: #d9342f; line-height: 58px; text-align: center; border-left: 1px solid #d2d2d2;  border-right: 1px solid #d2d2d2; border-radius: 0;
                    }
                }
                strong {
                    margin-left: 7px;
                }
            }
            .pay-right {
                float: right; width: 35%; height: 98px; color: white; font-size: 34px; line-height: 98px; text-align: center; background: #d9342f;
            }
        }
    }
</style>
