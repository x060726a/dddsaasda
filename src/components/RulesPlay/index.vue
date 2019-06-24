<template>
    <section class="RulesPlay">
        <TrayHeader :title="title" />
        <div class="scroX">
            <scroller lock-x ref="scroller" height="100%">
                <div>
                    <ol class="list">
                        <li v-for="(item, key) in this.lotterList" :key="key" @click="$router.push({path: 'ruleDetails', query: {id: Number(item.id), title: item.title}})">
                            {{item.title}}
                            <i class="icon"></i>
                        </li>
                    </ol>
                </div>
            </scroller>
        </div>
    </section>
</template>

<script>
    const TrayHeader = import('../public/rn-header')
    export default {
        name: "RulesPlay",
        components: {
            TrayHeader () {
                return {
                    component: TrayHeader
                }
            }
        },
        data () {
            return {
                title: '玩法规则',
                lotterList: '', // 游戏列表
                gameId: '' // 游戏ID
            }
        },
        methods: {
            // 获取游戏列表
            get_gameList () {
                let lotterList = JSON.parse(localStorage.getItem('lotterList'))
                if (lotterList) return this.lotterList = lotterList
                this.$get('gameTime', {}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.lotterList = res.data.lottery
                    this.gameId = res.data.id
                    localStorage.setItem('lotterList', JSON.stringify(this.lotterList))
                })
            }
        },
        created () {
            this.get_gameList()
        }
    }
</script>

<style scoped lang="scss">
    .RulesPlay{
        position: relative; height: 100%; background: #f3f3f3;
        .scroX {
            height: calc(100% - 90px);
        }
        ol {
            background: white;
            li {
                height: 100px; color: #333; font-size: 30px; padding: 0 30px; line-height: 100px; box-shadow: 0 1px #d2d2d2;
                .icon {
                    float: right; width: 34px; height: 19px; margin-top: 40px; background: url("~@/assets/image/system/icon-unfold@2x.png") no-repeat center;
                    transform: rotate(-90deg); background-size: cover;
                }
            }
        }
    }
</style>
