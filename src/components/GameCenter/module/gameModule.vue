<template>
    <section class="gameModule">
        <lotterHeader :title="title" @gameOpen="gameOpen" />
        <!--开奖信息-->
        <lotterInfo @submit="submit" :title="title" :coin="coin" :lotteryObj="lotteryObj" v-on:childValue="childValue" v-if="lotteryObj" />
        <!--开奖号码-->
        <lotterCode :openCode="openCode" :gameId="gameId" :lotteryObj="lotteryObj" :mipai="mipai" v-if="lotteryObj" />
        <!--下注区域-->
        <bets @submit="submit" @betCount="betCount" @close="isShow = false" v-if="isShow && lotteryData"
              :uid="uid"
              :initiate="initiate"
              :gameCode="gameCode"
              :betData="lotteryData"
              :gameid="gameId"
              :ftime="ftime"
              :qihao="qihao"
              :lotteryNum="lotteryNum"
              :coin="coin"
              :level="level"
              :isBet="isBet"
              :avatar="avatar"
              :nickname="nickname"/>
        <!--聊天室-->
        <div class="chatArea" :class="{'chatNiu' : gameId == 50, 'chatLiuhe' : gameId == 70 || gameId == 71}">
            <ChatRoom @submit="submit" @betCount="betCount" @miniCard="miniCard" v-if="nickname"
                :gameId="gameId"
                :coin="coin"
                :uid="uid"
                :level="level"
                :avatar="avatar"
                :nickname="nickname"
                :lotteryData="lotteryData"
                :title="title" />
        </div>
        <!--游戏列表-->
        <div class="gameList" v-if="gameShow" @click.stop="gameShow = !gameShow">
            <div class="list-con" ref="listCon">
                <strong v-for="(res, key) in lotterList" :key="key" @click="$router.push({path: res.name, query: {id: Number(res.id)}})" :class="{'active' : gameId == res.id}">{{res.title}}</strong>
            </div>
        </div>
        <!--追号投注-->
        <div class="betNumber clearfix">
            <button class="f" @click="isShow = true, isBet = true">投注</button>
            <button class="f" @click="isShow = true, isBet = false">追号</button>
            <input type="text" class="r" disabled />
        </div>
        <!--停售彩种-->
        <alertPopup v-if="closeGame" />
    </section>
</template>

<script>
import { mapState } from 'vuex'
    export default {
        name: "gameModule",
        components: {
            lotterHeader(){
                return {
                    component: import('./lotterHeader')
                }
            },
            lotterInfo(){
                return {
                    component: import('./lotterInfo')
                }
            },
            lotterCode () {
                return {
                    component: import('./lotterCode')
                }
            },
            bets () {
                return {
                    component: import('./Bets')
                }
            },
            ChatRoom () {
                return{
                    component: import('./ChatRoom')
                }
            },
            alertPopup () {
                return {
                    component: import('@/components/public/popup')
                }
            }
        },
        data () {
            return {
                uid: 0, // 用户id
                lotteryObj: '', // 游戏详情
                userInfo: null, // 用户信息
                initiate: 0, // 用户是否有权限发布跟单（0：无，1：有）
                lotterList: null, // 游戏列表
                openCode: [], // 开奖号码
                betsListCount: 0, // 投注记录
                gameShow: false, // 游戏列表显示、隐藏
                coin: '', // 余额
                title: '', // 标题
                nickname: '', // 用户昵称
                level: '', // 会员等级
                avatar: '', // 用户头像地址
                lotteryData: null, // 彩种赔率信息
                lotteryNum: 0, // 彩种每日期数
                gameCode: '', // 游戏编码
                gameId: 0, // 彩种Id
                ftime: 0, // 投注截止时间
                qihao: 0, // 投注期号
                isShow: false, // 是否显示投注列表
                isBet: true, // 投注true，追号false
                mipai: false, // 咪牌
                closeGame: false // 改彩种是否停售
            }
        },
        methods: {
            // 获取游戏列表
            get_gameList () {
                let lotteryList = JSON.parse(localStorage.getItem('lotterList'))
                if (lotteryList) return this.lotterList = lotteryList
                this.$get('gameTime', {}).then(res => {
                    if (res.code !== 0) return
                    this.lotterList = res.data.lottery
                    this.gameId = res.data.id
                    localStorage.setItem('lotterList', JSON.stringify(this.lotterList))
                })
            },
            // 获取彩种赔率信息、用户信息
            get_lotteryInfo () {
                this.$vux.loading.show({text: '加载中'})
                let lotteryData = JSON.parse(sessionStorage.getItem(`lotteryData${this.gameId}`))
                if (lotteryData) return this.lotteryData = lotteryData
                this.$get('gameInfo', {gameid: this.gameId}).then(res => {
                    if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                    this.lotteryData = res.data
                    sessionStorage.setItem(`lotteryData${this.gameId}`, JSON.stringify(res.data))
                })
            },
            // 获取彩种详情
            getDetails (val) {
                this.$get('gameDetails', {lottery_id: this.gameId}).then(res => {
                    if (res.code == 30001) return this.closeGame = true
                    if (res.code !== 0) return
                    let data = res.data
                    this.ftime = data.ftime, this.qihao = data.qihao, this.lotteryNum = data.num, this.openCode = data.openCode, this.lotteryObj = data, this.betsListCount = data.betsListCount
                    this.uid = data.UserInfo.id, this.initiate = data.UserInfo.initiate, this.level = data.UserInfo.level, this.coin = data.UserInfo.coin, this.avatar = data.UserInfo.avatar, this.nickname = data.UserInfo.nickname
                    this.$store.commit('userinfo',data.UserInfo), this.$store.commit('qihao',res.data.qihao)
                    if (data.betsListCount > 0) this.$nextTick(() => setTimeout(()=> {this.getRecord()}, 200))
                    if (data.betsListCount == 0) this.$store.commit('setBetList',[])
                })
            },
            // 获取投注记录
            getRecord () {
                let betList = JSON.parse(localStorage.getItem('betList')) || []
                if (this.betsListCount == betList.length && betList.length > 0) return this.$store.commit('setBetList', betList), console.log(this.betsListCount)
                this.$post('betRecord', { gameid: this.gameId }).then(res => {
                    //先判断有没有封盘 封盘就清空投注列表
                    if(this.isCloseGame){
                        this.$store.commit('setBetList',[])
                    }else{
                        this.$store.commit('setBetList',res.data.betsList)
                        localStorage.setItem('betList', JSON.stringify(res.data.betsList))
                    }
                })
            },
            // 游戏列表
            gameOpen () {
                this.gameShow = !this.gameShow
                this.$nextTick(() => setTimeout(() => {
                    if(this.$refs.listCon) this.$refs.listCon.style.top = '11.733vw'
                }))
            },
            // 更新余额
            submit (coin, bool) {
                this.coin = coin
                if (!bool) this.isShow = false
            },
            betCount (num) {
                this.betsListCount = num
                setTimeout(()=> {this.getRecord()}, 100)
            },
            // 咪牌
            miniCard (val) {
                this.getDetails()
                this.mipai = val
            },
            childValue(childValue){
                this.getDetails();
            }
        },
        mounted () {
            this.gameCode = this.$route.meta.name
            this.title = this.$route.name
        },
        created () {
            this.gameId = Number(this.$route.query.id) || Number(this.$route.meta.id)
            this.get_gameList()
            if (this.gameId) this.get_lotteryInfo(), this.getDetails()
            sessionStorage.removeItem('betObj')
        },
        computed:{
            ...mapState(['isCloseGame'])
        }
    }
</script>

<style scoped lang="scss">
    .gameModule {
        position: relative; height: 100%; padding-top: 88px;
        .betNumber {
            position: absolute; bottom: 0; left: 0; width: 100%; padding: 15px 20px; border-top: 1px solid #d2d2d2; background: white;
            .f {
                float: left; width: 100px; height: 68px; margin-right: 15px; color: white; font-size: 26px; line-height: 68px; text-align: center; border-radius: 6px; background: $theme-color;
            }
            .f:nth-child(2) {
                background: #fd9c02; margin: 0;
            }
            .r {
                float: right; width: 476px; height: 68px; padding: 0 15px; line-height: 68px; color: #000; font-size: 26px; border: 1px solid #d2d2d2; border-radius: 6px;
            }
        }
        .chatArea{
            height: calc(100% - 305px);
            overflow: hidden;
        }
        .chatNiu {
            height: calc(100% - 415px);
        }
        .chatLiuhe {
            height: calc(100% - 345px);
        }
        .gameList {
            position: absolute; top: 0; z-index: 100; width: 100%; height: 100%; background: rgba(0,0,0,.35);
            .list-con {
                position: absolute; top: -1000px; width: 100%; padding: 30px 0 0 45px; color: #333; font-size: 30px; background: white;
                transition: all .3s ease-in-out;
                strong {
                    float: left; width: 200px; height: 80px; margin: 0 30px 30px 0; border: 1px solid #d2d2d2; border-radius: 6px; line-height: 78px; text-align: center;
                }
                strong.active {
                    color: #d9342f; border: 1px solid #d9342f;
                }
            }
        }
    }
</style>
