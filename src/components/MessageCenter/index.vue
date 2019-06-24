<template>
    <section class="message">
        <TrayHeader :title="title" />
        <nav class="cate_menu comm-W">
            <span v-for="(res, key) in messageData" :key="key" :class="{selected: checked === key }" @click="motion(key)">{{res}}</span>
            <i ref="i_motion"></i>
        </nav>
        <div v-if="list.length > 0" class="scroX">
            <scroller lock-x ref="scroller" height="100%"
                      use-pulldown
                      use-pullup
                      :pulldown-config="$root.pullDownObj"
                      :pullup-config="$root.pullUpObj"
                      @on-pulldown-loading="get_Info(false)"
                      @on-pullup-loading='get_Info(true)'>
                <div>
                    <NewList class="comm-W" :checked="checked" :list="list" />
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
    const NewList = import('./module/messageList')
    import { Divider } from 'vux'
    export default {
        name: "index",
        components: {
            Divider,
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            },
            NewList () {
                return {
                    component: NewList
                }
            }
        },
        data () {
            return {
                title: '消息中心',
                messageData: ['平台公告', '站内消息'],
                list: [],
                checked: 0,
                offset: 0, // 每页数据
                isNoMoreData: false // 没有更多数据
            }
        },
        methods: {
            get_Info (bool) {
                this.$get('Notice', { type: this.checked + 1, offset: bool ? this.offset : 0 }).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    if (bool) { // 上拉加载
                        this.list = this.list.concat(res.data.list)
                        if (res.data.list.length < 20) this.isNoMoreData = true, this.$refs.scroller.disablePullup() // 暂无更多数据
                        this.$nextTick(()=> {this.$refs.scroller.donePullup()})
                    } else {
                        this.list = res.data.list
                        if (this.$refs.scroller) this.$refs.scroller.donePulldown()
                    }
                    this.list.forEach(res => {
                        let time = new Date(res.updated_at * 1000)
                        res.time = formatDate(time, 'yy-MM-dd')
                    })
                    this.offset = res.data.offset
                    if (this.$refs.scroller) this.$refs.scroller.reset()
                })
            },
            // 类型选择
            motion (key) {
                this.checked = key, this.list = []
                this.get_Info(false)
                if (key === 0) {
                    this.$refs.i_motion.style.left = '16%'
                } else {
                    this.$refs.i_motion.style.left = '66%'
                }
            },
            resetState () {
                this.$nextTick(() => setTimeout(() => { this.$refs.scroller.reset() }, 50))
            }
        },
        created () {
            this.get_Info(false)
        }
    }
</script>

<style scoped lang="scss">
    .message {
        height: 100%; background: #f3f3f3;
        .scroX {
            height: calc(100% - 208px);
        }
        .comm-W { background: white; }
        .cate_menu {
            position: relative; display: flex; height: 100px; margin-bottom: 20px; color: #999; font-size: 30px; line-height: 100px;
            span {
                flex: 1; text-align: center;
            }
            span.selected { color: $theme-color; }
            i {
                position: absolute; left: 16%; bottom: 0; width: 140px; height: 4px; background: $theme-color;
                transition: all .3s ease-in-out;
            }
        }
    }
</style>
