<template>
    <section class="documentary">
        <TrayHeader :title="title" :icon="true"></TrayHeader>
        <div class="scroX">
            <scroller lock-x ref="scroller" height="100%"
                      use-pulldown
                      use-pullup
                      :pulldown-config="$root.pullDownObj"
                      :pullup-config="$root.pullUpObj"
                      @on-pulldown-loading="get_Info(false)"
                      @on-pullup-loading='get_Info(true)'>
                <div>
                    <nav class="common-w">
                        <!--大神推荐-->
                        <h3 class="commTitle clearfix">
                            <i></i>
                            <strong>大神推荐</strong>
                            <em>五星推荐 大神带飞</em>
                        </h3>
                        <ol class="celebrity clearfix">
                            <li v-for="(res, key) in recommends" :key="key">
                                <!--<i class="num">1</i>-->
                                <a @click="$router.push({path: '/information', query: {uid: Number(res.id)}})">
                                    <img :src="res.avatar" />
                                    <p>{{res.nickname}}</p>
                                </a>
                            </li>
                        </ol>
                    </nav>
                    <ol class="details">
                        <li class="common-w" v-for="(res, key) in list" :key="key">
                            <div class="title-U clearfix">
                                <a @click="$router.push({path: '/information', query: {uid: Number(res.uid)}})">
                                    <img :src="res.avatar" />
                                    <div>
                                        <p>{{res.nickname}}</p>
                                        <strong>近{{res.bet_num}}中{{res.win_num}}</strong>
                                        <strong>命中{{res.probably}}%</strong>
                                    </div>
                                </a>
                                <strong class="title-T">截止：{{res.time}}</strong>
                            </div>
                            <p class="slogan">{{res.announce}}</p>
                            <div class="detalsList clearfix" @click="$router.push({path: '/unDetails', query: {id: Number(res.id), uid: Number(res.uid)}})">
                                <div class="list-left">
                                <span>
                                    <em>类型</em><em>自购金额</em><em>单倍金额</em>
                                </span>
                                    <span>
                                    <em class="bold">{{res.lottery_title}}</em><em>￥{{res.coin}}</em><em>￥{{res.minimum_coin}}</em>
                                </span>
                                </div>
                                <div class="list-right">
                                    <a @click="$router.push({path: '/unDetails', query: {id: Number(res.id), uid: Number(res.uid)}})">跟单</a>
                                </div>
                            </div>
                        </li>
                    </ol>
                </div>
                <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
            </scroller>
        </div>
    </section>
</template>

<script>
    import {formatDate} from '@/assets/js/util'
    const TrayHeader = import('..//Index/module/header')
    export default {
        components: {
            TrayHeader () {
                  return {
                      component: TrayHeader
                  }
            }
        },
        data () {
            return {
                title: '跟单',
                recommends: null, // 大神推荐
                list: null, // 跟单列表
                offset: 0, // 每页数据
                isNoMoreData: false // 没有更多数据
            }
        },
        methods: {
            get_Info (bool) {
                this.$vux.loading.show({text: '加载中'})
                this.$get('follBet', { offset: bool ? this.offset : 0 }).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    if (bool) { // 上拉加载
                        this.list = this.list.concat(res.data.list)
                        if (res.data.list.length < 20) this.isNoMoreData = true, this.$refs.scroller.disablePullup() // 暂无更多数据
                        this.$nextTick(()=> this.$refs.scroller.donePullup())
                    } else {
                        this.recommends = res.data.recommends || this.recommends ,this.list = res.data.list
                        this.$nextTick(()=>{ this.$refs.scroller.donePulldown() })
                    }
                    this.list.forEach(res => {
                        let time = new Date(res.freezed_at * 1000)
                        res.time = formatDate(time, 'MM-dd hh:mm')
                    })
                    this.offset = res.data.offset
                    this.$nextTick(() => setTimeout(() => { this.$refs.scroller.reset() }))
                })
            }
        },
        created () {
            this.get_Info(false)
        }
    }
</script>

<style lang="scss" scoped>
    .documentary{
        height:100%; background: #f3f3f3;
        .scroX {
            height: calc(100% - 90px);
        }
        .commTitle {
            height: 80px; line-height: 80px; padding: 0 20px; box-shadow: 1px 1px #d2d2d2;
            i {
                float: left; width: 35px; height: 44px; margin-top: 18px; background: url("~@/assets/image/documentary/groom.png") no-repeat; background-size: cover;
            }
            strong {
                float: left; margin: 0 17px 0 14.6px; color: #333; font-size: 28px; font-weight: 700;
            }
            em {
                float: left; color: #999; font-size: 22px;
            }
        }
        .common-w {
            background: white;
        }
        .celebrity {
            padding: 16px 30px 24px;
            li {
                position: relative; float: left; width: 100px; margin: 14px 96px 0 0;
                .num {
                    position: absolute; right:0px; z-index: 99; width: 28px; height: 28px; background: $theme-color; border-radius: 50%; color: white; font-size: 24px; text-align: center; line-height: 28px;
                }
                a {
                    display: block; opacity: 0; animation: wobblea .3s ease-in-out 0.1s forwards;
                    @keyframes wobblea {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                    img {
                        display: block; width: 100px; height: 100px; margin-bottom: 4px;
                    }
                    p {
                        color: #333; font-size: 26px; line-height: 37px; text-align: center;
                        overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                    }
                }
            }
            li:last-child, li:nth-child(4) {
                margin: 14px 0 0 0;
            }
        }
        .details {
            margin-top: 20px;
            li {
                padding: 21px 20px 20px 20px; margin-bottom: 20px;
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
                        float: right; margin-top: 8px; color: #999; font-size: 22px; line-height: 30px;
                    }
                }
                .slogan {
                    margin: 13px 0 14px; color: #333; font-size: 26px; line-height: 37px;
                }
                .detalsList {
                    border: 1px solid #d2d2d2;
                    .list-left {
                        float: left; width: 75%; border-right: 1px solid #d2d2d2;
                        span {
                            display: flex; height: 63px; line-height: 63px; color: #999; font-size: 28px;
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
                    .list-right {
                        float: right; width: 25%;
                        a {
                            display: block; width: 146px; height: 60px; margin: 33px auto 0; font-size: 30px; line-height: 60px; text-align: center; background: #d9342f; border-radius: 5px;
                        }
                    }
                }
            }
        }
    }
</style>
