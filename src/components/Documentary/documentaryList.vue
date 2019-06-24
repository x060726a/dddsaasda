<template>
    <section class="documentaryList">
        <TrayHeader :title="title" />
        <div class="scroX" v-if="list.length > 0">
            <scroller height="100%" lock-x ref="scroller"
                      use-pulldown
                      use-pullup
                      :pulldown-config="$root.pullDownObj"
                      :pullup-config="$root.pullUpObj"
                      @on-pulldown-loading="get_Info(false)"
                      @on-pullup-loading='get_Info(true)'>
                <div>
                    <ol class="list-box">
                        <li class="title">
                            <span>跟单用户</span><span>倍数</span><span>金额</span><span>时间</span>
                        </li>
                        <li v-for="(res, key) in list" :key="key">
                            <span>{{res.nickname}}</span><span>{{res.nums}}</span><span class="rd">{{res.coin}}</span><span>{{res.time}}</span>
                        </li>
                    </ol>
                </div>
                <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
            </scroller>
        </div>
        <!--暂无数据-->
        <div v-else class="noData">
            <i class="nodataIcon"></i>
            <p>暂无数据</p>
        </div>
        <p class="betting">总计金额：<countup :start-val="0" :end-val="amount" :duration="2"></countup></p>
    </section>
</template>

<script>
    import {formatDate} from '@/assets/js/util'
    import { Countup } from 'vux'
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "documentaryList",
        components: {
            Countup,
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '跟单列表',
                list: [], // 跟单列表
                amount: 0, // 总计金额
                initiate_id: 0, // 跟单ID
                offset: 0, // 每页数据
                isNoMoreData: false // 没有更多数据
            }
        },
        methods: {
            get_Info (bool) {
                this.$vux.loading.show({text: '加载中'})
                this.$get('follBetList', {initiate_id: this.initiate_id, offset: bool ? this.offset : 0}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    if (bool) { // 上拉加载
                        this.list = this.list.concat(res.data.list)
                        if (res.data.list.length < 20) this.isNoMoreData = true, this.$refs.scroller.disablePullup() // 暂无更多数据
                        this.$nextTick(()=> this.$refs.scroller.donePullup())
                    } else {
                        this.list = res.data.list, this.amount = parseFloat(res.data.initiate_amount)
                        if (this.$refs.scroller) this.$refs.scroller.donePulldown()
                    }
                    this.list.forEach(res => { // 时间格式化
                        let time = new Date(res.created_at * 1000)
                        res.time = formatDate(time, 'MM-dd hh:mm')
                    })
                    this.offset = res.data.offset
                    if (this.$refs.scroller) this.$refs.scroller.reset()
                })
            }
        },
        created () {
            this.initiate_id = this.$route.query.id
            this.get_Info(false)
        }
    }
</script>

<style scoped lang="scss">
    .documentaryList {
        height: 100%; padding-bottom: 98px; background: #f3f3f3;
        .scroX {
            height: calc(100% - 88px);
        }
        .list-box {
            li {
                display: flex; height: 80px; color: #666; font-size: 24px; line-height: 80px; border-bottom: 1px solid #d2d2d2; background: white;
                span {
                    flex: 1; text-align: center;
                }
                .rd {
                    color: #d9342f;
                }
            }
            li:last-child { border: none; }
            .title {
                color: #333; font-size: 28px;
            }
        }
        .betting {
            position: fixed; left: 0; bottom: 0; width: 100%; height: 98px; color: white; font-size: 34px; text-align: center; line-height: 98px; background: #d9342f;
        }
    }
</style>
