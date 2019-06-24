<template>
    <section style="height: 100%; padding-top: 5px;position: relative;">
        <div class="main" id="main" ref="main">
            <div class="xs-container">
                <div class="xs-content" id="scroll-h" ref="xsContent">
                    <!-- myself-bet -->
                    <div class="chat-bet" :class="{
                        'fadeInLeftMsg':item.event=='welcome'||item.data.userInfo.uid*1!=userinfo.id*1,
                        'fadeInRightMsg':item.event=='bet'&&item.data.userInfo.uid*1==userinfo.id*1,
                        'myself-bet':item.event=='bet'&&item.data.userInfo.uid*1==userinfo.id*1
                        }" :id="'sc_'+key" v-for="(item,key,index) in betObj">
                        <div v-if="item.event=='welcome'" class="welcome">
                            <span>欢迎<em>{{item.nickname}}</em>，进入房间</span>
                        </div>
                        <div class="time" v-if="item.event=='bet'">{{item.data.successTime}}</div>
                        <div v-if="item.event=='bet'">
                            <div class="block">
                                <div class="avatar"><img :src="item.data.userInfo.avatar"></div>
                                <div class="username">{{item.data.userInfo.nickName}}</div>
                                <div class="level">
                                    <span :class="{'l1' : item.data.userInfo.level == '普通会员', 'l2' : item.data.userInfo.level == '白银会员', 'l3' : item.data.userInfo.level == '黄金会员', 'l4' : item.data.userInfo.level == '铂金会员', 'l5' : item.data.userInfo.level == '钻石会员', 'l6' : item.data.userInfo.level == '至尊会员'}"></span>
                                </div>
                            </div>
                            <div class="bet-data">
                                <div class="jiantou"><i></i></div>
                                <div class="data-panel">
                                    <h1>期号：{{item.data.qihao}}期</h1>
                                    <div class="bet-label"><span>投注类型</span><span>投注金额</span></div>
                                    <div class="bet-line" v-for="(res, idx2) in item.data.betBean">
                                        <span>{{res.title}}</span>
                                        <span v-if="res.betNum">{{res.coin.replace(/\b(0+)/gi,"") * Number(res.betNum)}}元</span>
                                        <span v-else>{{res.coin.replace(/\b(0+)/gi,"")}}元</span>
                                    </div>
                                    <div class="bet-total">共{{item.data.totalNums}}注，{{item.data.totalCoin}}元</div>
                                    <div class="bet-btn" @touchstart.prevent="gentou(item)">跟投</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 有新消息提示的按钮 -->
        <div class="newMessageBtn" ref="newMessageBtn" @click="roomScroll" v-show="isnewMessage"><span v-show="totalNewM!=0"><em>{{totalNewM}}</em></span></div>
        <!--跟投-->
        <section class="throw" v-if="throwShow && throwObj">
            <div class="throw-con">
                <header class="throw-header clearfix">
                    <div class="throw-info f">
                        <img :src="avatar" alt="易趣彩票" class="avatar f" />
                        <span class="nickName f">{{nickname}}</span>
                        <span class="f" :class="{'l1' : throwObj.userInfo.level == '普通会员', 'l2' : throwObj.userInfo.level == '白银会员', 'l3' : throwObj.userInfo.level == '黄金会员', 'l4' : throwObj.userInfo.level == '铂金会员', 'l5' : throwObj.userInfo.level == '钻石会员', 'l6' : throwObj.userInfo.level == '至尊会员'}"></span>
                    </div>
                    <i class="icon-x r" @touchstart.stop="throwShow = false"></i>
                </header>
                <strong class="periods">{{throwObj.qihao}}期投注记录</strong>
                <div class="throw-bet">
                    <p class="throw-type">
                        <em><i class="icon-t">投注类型</i></em><em><i class="icon-m">投注金额</i></em>
                    </p>
                    <div class="bet-list">
                        <div class="throw-list">
                            <p v-for="(res, key) in throwObj.betBean" :key="key" :class="{'lis': key % 2 != 0 }">
                                <span class="list-sp">{{key + 1}}.&nbsp;{{res.title}}</span>
                                <span class="list-sp">
                                <em>金额:</em>
                                <input type="number" v-model="res.coin" onkeypress='return( /[\d]/.test(String.fromCharCode(event.keyCode)))' @input="inpMoney()" oninput="if(value.length>6)value=value.slice(0,6)" />
                            </span>
                            </p>
                        </div>
                    </div>
                    <p class="throw-amount">共<i class="rd">{{throwObj.totalNums}}</i>注，合计<i class="rd">{{throwObj.totalCoin}}</i>元</p>
                    <button class="throw-btn" @touchstart.prevent="betting()">确认跟投</button>
                </div>
            </div>
        </section>
        <div class="right-bar">
            <div :class="bottom?'hide':''"><i class="wl-btn" @touchstart.prevent="popupVisible=!popupVisible"></i><span>问路</span></div>
            <div :class="bottom?'hide':''"><i class="zh-btn" @touchstart.prevent="popupVisible1=!popupVisible1"></i><span>追号</span></div>
            <div :class="bottom?'hide':''"><i class="mp-btn" @touchstart.prevent="mipai = !mipai, $emit('miniCard', mipai)"></i><span>咪牌</span></div>
            <div :class="bottom?'hide':''"><i class="gz-btn" @touchstart.prevent="$router.push({path:'/follow'})"></i><span>关注</span></div>
            <!--<div :class="bottom?'hide':''"><i class="gd-btn" @click="$router.push({path:'/documentary'})"></i><span>跟单</span></div>-->
            <div @touchstart.prevent="bottom=!bottom"><i :class="{'menus-btn-hide':!bottom,'menus-btn-show':bottom}"></i><span v-show="!bottom">收起</span><span v-show="bottom">展开</span></div>
        </div>
        <div v-transfer-dom>
            <popup style="background:#fff" v-model="popupVisible" position="bottom" height="79%">
                <WENLU v-if="popupVisible&&lotteryData" :title="title" :lotteryid="$route.query.id*1" :lotteryData="lotteryData" @isClose="popupVisible=false"/>
            </popup>
        </div>
        <div v-transfer-dom>
            <ZHUIHAO v-if="popupVisible1" @closeDalog="popupVisible1=!popupVisible1"/>
        </div>
        <!--余额不足弹窗-->
        <div v-transfer-dom>
            <confirm v-model="noMoney" title="温馨提示" @on-confirm="$router.push('/recharge')">您的余额不足，请充值！</confirm>
        </div>
        <!--开奖-->
        <div class="lotteryMask" v-if="isWin">
            <div class="lotteryBox">
                <span></span>
                <p class="winCoin">中奖<em>{{winCoin}}</em>元</p>
                <i class="iconX" @touchstart.prevent="isWin = false"></i>
            </div>
        </div>
    </section>
</template>
<script>
    const FastClick = require('fastclick')
    import md5 from 'js-md5'
    import { Confirm } from 'vux'
    import { mapGetters,mapState } from 'Vuex'
    import {formatDate} from '@/assets/js/util'
    import { Promise } from 'q';
    export default {
        data(){
            return{
                scrollH:0,
                isLook:false,//是否锁屏
                isnewMessage:false,//是否提示有新消息
                totalNewM:0,//统计一共有多少条新消息
                bottom:false,
                popupVisible:false,
                popupVisible1:false,
                num:0,
                noMoney: false, // 余额不足弹窗
                isWin: false, // 中奖弹窗
                winCoin: '', // 中将金额
                mipai: false, // 咪牌
                firstClick: true, // 防止用户投注重复点击
                isReconnet:false,
                betObj:[], // 投注彩种信息
                throwObj: null, // 跟投数据
                throwShow: false, // 跟投弹窗
                host:'',
                codeList: {}
            }
        },
        props: {
            gameId: Number,
            coin: '', // 余额
            uid: Number, // 用户id
            nickname: String, // 用户昵称
            level: String, // 会员等级
            avatar: String, // 会员头像
            title: String, // 会员头像
            lotteryData:{
                default:{}
            }
                ['message']
        },
        computed:{
            ...mapGetters(['userinfo']),
            ...mapState(['websock'])
        },
        mounted(){
            this.$nextTick(()=>{
                FastClick.attach(this.$refs.newMessageBtn)
                this.xscroll = new XScroll({
                    renderTo:this.$refs.main,
                    lockX:true,
                    lockY:false,
                    scrollbarY:false,
                    scrollbarX:false
                })
                this.xscroll.render();
                this.xscroll.on('scroll',(p)=>{
                    if(p.scrollTop+this.$refs.main.clientHeight>=this.scrollH||p.scrollTop+this.$refs.main.clientHeight+2>=this.scrollH){
                        this.isLook = false
                        this.isnewMessage = false
                    }else{
                        this.isLook = true
                    }
                })
            })
        },
        methods:{
            // 初始化socket
            initWebSocket () {
                return new Promise(resolve=>{
                    if(this.websock==''){
                        let key = '^cp@#$cp8888&swoole$'
                        this.$store.commit('websock',new ReconnectingWebSocket(this.host+'?nickname=' + this.nickname + '&token=' + md5(md5(this.nickname) + key)))
                        this.websock.addEventListener('open',this.websocketopen)
                    }else{
                        this.websocketsend(JSON.stringify({
                            "event":"welcome",
                            "nickname":this.userinfo.nickname
                        }))
                    }
                    this.websock.onmessage = this.websocketonmessage;
                    this.websock.onclose = this.websocketclose;
                    this.websock.onerror = this.websocketonerror
                    resolve(true)
                })
            },
            // 数据接收
            websocketonmessage(e){
                if(this.isReconnet){
                    this.$vux.loading.hide();
                    this.isReconnet = false
                    if(this.$route.meta.type=='bet'){
                        this.$vux.toast.text('连接成功','bottom')
                    }
                }
                let jsonObj = JSON.parse(e.data)
                if (jsonObj.event == 'opencode') { // 开奖号码
                    let str = `code${jsonObj.data.type}`
                    this.codeList[str] = jsonObj.data
                    this.$store.commit('updateLotteryCode', this.codeList)
                }
                if (jsonObj.event == "bet") { // 投注信息
                    let time = new Date(jsonObj.data.successTime * 1000), userInfo = jsonObj.data.userInfo
                    jsonObj.data.successTime = formatDate(time, 'yyyy-MM-dd hh:mm:ss')
                    jsonObj.data.userInfo = JSON.parse(userInfo)
                }
                if (jsonObj.event == 'bonus') { // 中奖提示
                    jsonObj.data.some((res, i) => {
                        if (this.uid == res.uid) this.winCoin = res.bonus, this.isWin = true,this.$emit('submit', res.coin, 'true')
                    })
                }
                if((jsonObj.event=="bet" && Number(jsonObj.data.gameid) == this.gameId) || jsonObj.event=="welcome") this.Conversion(jsonObj)
            },
            // 数据发送
            websocketsend(agentData){
                this.websock.send(agentData);
            },
            // 关闭
            websocketclose(e){
                if(this.$route.meta.type=='bet'){
                    this.$vux.loading.show({
                        text: '正在重新连接聊天室',
                    })
                }
                this.isReconnet = true
                this.websock.refresh()
            },
            // 连接失败重新连接
            websocketonerror () {
                this.websock.refresh()
            },
            websocketopen(){
                this.websocketsend(JSON.stringify({
                    "event":"welcome",
                    "nickname":this.userinfo.nickname
                }))
            },
            //操作聊天室的message数组
            pushMessage (obj) {
                this.betObj.push(obj)
                if(this.betObj.length>100){
                    this.betObj.shift();
                }
                this.$store.commit('cedanObj',obj)
                return new Promise(resolve=>{
                    resolve(this.betObj);
                })
            },
            //等待push到message数组完成后的操作
            async Conversion (obj) {
                let res = await this.pushMessage(obj);
                if(!this.$refs.xsContent) return;
                this.scrollH = this.$refs.xsContent.clientHeight
                this.xscroll.render();
                if(!this.isLook){
                    this.isnewMessage = false
                    this.roomScroll();
                }else{
                    if(this.totalNewM>=99){
                        this.totalNewM = 99;
                    }else{
                        this.totalNewM += 1;
                    }
                    this.isnewMessage = true
                }
            },
            // 跟投金额重新计算
            inpMoney () {
                // console.log(this.throwObj)
                let amount = 0
                this.throwObj.betBean.some(res => {
                    if (res.betNum) {
                        amount += isNaN(Number(res.coin)) ? 0 : Number(res.coin) * Number(res.betNum)
                    } else {
                        amount += isNaN(Number(res.coin)) ? 0 : Number(res.coin)
                    }
                })
                this.throwObj.totalCoin = amount.toString()
            },
            gentou (obj) {
                if (this.$store.state.isCloseGame) return this.$vux.toast.text('本期已封盘，不能跟投！', 'middle')
                this.throwObj = JSON.parse(JSON.stringify(obj.data)), this.throwShow = true
            },
            // 跟投
            betting () {
                // return console.log(this.throwObj)
                if (!this.firstClick) return false
                this.firstClick = false // 防止重复点击
                let isBet = true // 是否满足投注条件
                delete this.throwObj.successTime
                this.throwObj.userInfo = JSON.stringify({nickName: this.nickname,level: this.level,avatar: this.avatar,uid: this.uid})
                if (Number(this.throwObj.totalCoin) > Number(this.coin)) return this.noMoney = true, this.firstClick = true
                this.throwObj.betBean.some(res => {
                    if (!Number(res.coin) || Number(res.coin) < 1) return this.$vux.toast.text('金额有误，单注最低投注1元！', 'middle'), isBet = false, this.firstClick = true
                })
                if (isBet) {
                    this.$vux.loading.show()
                    this.$post('bets', this.throwObj).then(res => {
                        this.$vux.loading.hide(), this.firstClick = true
                        let msg = res.msg || res.msg_zh
                        if (res.code !== 0) return this.$vux.toast.text(msg, 'middle')
                        this.throwShow = false
                        this.$vux.toast.text('跟单成功!', 'middle')
                        this.$emit('submit', res.data.coin), this.$emit('betCount', res.data.betsListCount)
                        this.$store.commit('setBetList',res.data.betsList)
                    })
                }
            },
            // 配置scroll
            roomScroll () {
                this.isnewMessage = false
                this.totalNewM = 0
                this.$nextTick(()=>{
                    if(document.getElementById('main')&&document.getElementById('scroll-h')){
                        let main  = document.getElementById('main').clientHeight,height = document.getElementById('scroll-h').clientHeight;
                        if(height-main>0){
                            this.xscroll.scrollTop(height-main,500)
                        }
                    }
                })
            },
            //获取ws地址
            getWs(){
                var that = this
                return new Promise(resolve=>{
                    that.$http.get('/static/js/host.json').then(res=>{
                        that.host = res.data.HOST
                        resolve(true)
                    })
                })
            }
        },
        async created(){
            var res = await this.getWs();
            this.initWebSocket()
        },
        components:{
            Confirm,
            WENLU(){
                return{
                    component:import('@/components/public/wenlu.vue')
                }
            },
            ZHUIHAO(){
                return{
                    component:import('@/components/public/zhuihao.vue')
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .newMessageBtn{
        position: absolute;
        width: 45px;
        height: 45px;
        bottom:10px;
        left: 20px;
        z-index: 9;
        border:#d2d2d2 1px solid;
        border-radius: 50%;
        >span{
            position: absolute;
            display: flex;
            justify-content: center;
            justify-items: center;
            top: -20px;
            left: 0px;
            width: 43px;
            em{
                padding:2px 4px;
                border-radius: 5px;
                background: #0f92e4;
                color: #fff;
                font-size: 18px;
            }
        }
    }
    .newMessageBtn::before{
        display: block;
        content: "";
        position: absolute;
        top: 20px;
        left: 5.5px;
        height: 2.5px;
        width: 17.5px;
        background: #d2d2d2;
        transform: rotate(45deg);
    }
    .newMessageBtn::after{
        display: block;
        content: "";
        position: absolute;
        top: 20.5px;
        right: 5.5px;
        height: 2.5px;
        width: 17.5px;
        background: #d2d2d2;
        transform: rotate(-45deg);
    }
    .hide{
        bottom:50px!important;
        opacity: 0!important;
    }
    .btn-hide{
        >i:last-child{
            display: none;
        }
    }
    .right-bar{
        position: absolute;
        z-index: 10;
        width: 60px;
        right: 18px;
        bottom: 50px;
        >div{
            margin-bottom: 10px;
            transition: all .2s ease;
            position: relative;
            >i{
                display: block;
                width:50px;
                height: 50px;
                margin: auto;
            }
            >span{
                margin-top: 7px;
                display: block;
                font-size: 24px;
                text-align: center;
                color:#666;
            }
        }
        .hide{
            z-index: -1;
            transform: translateY(100px);
        }
    }
    .wl-btn{
        background: url('~@/assets/image/system/wenlu@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .zh-btn{
        background: url('~@/assets/image/system/wdzh@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .mp-btn{
        background: url('~@/assets/image/system/mipai@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .gz-btn{
        background: url('~@/assets/image/system/gzn.png') no-repeat;
        background-size: 100% 100%;
    }
    .gd-btn{
        background: url('~@/assets/image/system/gd.png') no-repeat;
        background-size: 100% 100%;
    }
    .menus-btn-hide{
        background: url('~@/assets/image/system/icon-delete@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .menus-btn-show{
        background: url('~@/assets/image/system/btnshow@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .fadeInLeftMsg{
        animation:fadeInLeftMsg forwards .5s;
    }
    .fadeInRightMsg{
        animation:fadeInRightMsg forwards .5s;
    }
    @keyframes fadeInLeftMsg{
        from{
            transform: translateX(-100%);
        }
        to  {
            transform: translateX(0);
        }
    }
    @keyframes fadeInRightMsg{
        from{
            transform: translateX(100%);
        }
        to  {
            transform: translateX(0);
        }
    }
    .welcome{
        display: flex;
        justify-content: center;
        >span{
            line-height: 30px;
            padding:10px 25px;
            background: #e1e1e1;
            font-size: 24px;
            border-radius: 30px;
            >em{
                color:#2aa7f6;
            }
        }
    }
    .main{
        background: #fff;
        height: 100%;
        width: 100%;
        position: relative;
        .chat-bet,.myself-bet{
            padding-bottom:30px;
            padding-left:20px;
            .block{
                overflow: hidden;
                >div{
                    float: left;
                    line-height: 55px;
                    font-size: 0;
                }
                >div.avatar{
                    width:55px;
                    height: 55px;
                    /*margin: 0 8px;*/
                    img{
                        width:100%;
                    }
                }
                >div.level{
                    width:126px;
                    height: 30px;
                    margin: 12px 0 0;
                    img{
                        width:100%;
                    }
                    @for $i from 1 through 6 {
                        span.l#{$i} {
                            display: block; width: 126px; height: 30px; background: url('/static/images/levelbadge/l#{$i}.png')no-repeat center; background-size: cover;
                        }
                    }
                }
                >div.username{
                    margin: 0 8px; color:#666; font-size: 22px;
                }
            }
            .bet-data{
                width:598px;
                padding-left:80px;
                position: relative;
                margin-top:10px;
                margin-bottom:20px;
                .jiantou{
                    position: absolute;
                    top: 0px;
                    left: 30px;
                    height: 50px;
                    width:50px;
                    z-index: 1;
                    display: block;
                    overflow: hidden;
                }
                i{
                    position: absolute;
                    top: -25px;
                    left: 42px;
                    display: block;
                    height: 50px;
                    width:50px;
                    transform: rotate(45deg);
                    background: #fff;
                    box-shadow: -2px 2px 8px #b9b9b9
                }
                .data-panel{
                    background: linear-gradient(145deg,#ffffff, #f7f7f7);
                    box-shadow: 0px 5px 15px #b9b9b9;
                    border-radius: 0 8px 8px 8px;
                    position: relative;
                    h1{
                        padding-left:20px;
                        padding-top:20px;
                        margin-bottom:20px;
                        text-align: left;
                        font-size: 24px;
                        color:#666;
                    }
                    .bet-label{
                        display: flex;
                        margin:0 20px 20px 20px;
                        padding-bottom:20px;
                        border-bottom:1px solid #d2d2d2;
                        span{
                            text-align: left;
                            font-size: 24px;
                            color:#333;
                        }
                        span:first-child{
                            flex: .75;
                        }
                        span:last-child{
                            flex: .25; text-align: right;
                        }
                    }
                    .bet-line{
                        display: flex;
                        padding-left:20px;
                        padding-right:20px;
                        span{
                            font-size: 24px;
                            color:$theme-color;
                            line-height: 30px;
                            margin-bottom:20px;
                        }
                        span:first-child{
                            flex: .75;  overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                        }
                        span:last-child{
                            flex: .25; text-align: right;
                        }
                    }
                    .bet-total{
                        font-size: 24px;
                        color:#000;
                        padding-left:20px;
                        padding-bottom:20px;
                    }
                    .bet-btn{
                        position: absolute;
                        bottom:20px;
                        right:20px;
                        font-size: 24px;
                        width:90px;
                        height: 40px;
                        line-height: 36px;
                        text-align: center;
                        color:$theme-color;
                        border:1px solid $theme-color;
                        border-radius: 6px;
                    }
                }
            }
            .time{
                width:750px;
                font-size: 22px;
                color:#999;
                text-align: center;
            }
        }
        .myself-bet{
            overflow: hidden;
            width:100%;
            .block{
                overflow: hidden;
                width:100%;
                >div{
                    float: right;
                    line-height: 55px;
                    font-size: 0;
                }
                >div.avatar{
                    width:55px;
                    height: 55px;
                    margin-right:22px;
                    img{
                        width:100%;
                    }
                }
                >div.level{
                    width:126px;
                    height: 30px;
                    margin:12px 0 0 0;
                    @for $i from 1 through 6 {
                        span.l#{$i} {
                            display: block; width: 126px; height: 30px; background: url('/static/images/levelbadge/l#{$i}.png')no-repeat center; background-size: cover;
                        }
                    }
                }
                >div.username{
                    color:#666;
                    font-size: 22px;
                    margin: 0 8px;
                }
            }
            .bet-data{
                width:518px;
                padding-left:0;
                margin-left:120px;
                .jiantou{
                    left:100%;
                    transform: rotate(-90deg);
                }
                i{
                    background: #fbf7ee;
                }
                .data-panel{
                    border-radius: 8px 0 8px 8px;
                    background: linear-gradient(-145deg,#fbf7ee, #fbf6e9);
                }
            }
        }
    }
    .throw {
        position: fixed; top: 0; z-index: 99; width: 100%; height: 100%; background: rgba(0,0,0,.4);
        .throw-con {
            position: absolute; top: 50%; left: 50%; width: 90%; padding-bottom: 35px; background: white; border-radius: 6px; transform: translate(-50%, -50%);
            .f { float: left; }
            .r { float: right; }
            .throw-header {
                padding: 22px 30px 0;
                .avatar {
                    width: 55px; height: 55px;
                }
                .level {
                    width:126px; height: 30px; margin: 11px 8px 0;
                }
                .nickName {
                    margin: 0 8px; color: #666; font-size: 22px; line-height: 55px;
                }
                @for $i from 1 through 6 {
                    span.l#{$i} {
                        width: 130px; height: 30px; margin: 11px 0;  background: url('/static/images/levelbadge/l#{$i}.png')no-repeat center; background-size: 100% 100%;
                    }
                }
                .icon-x {
                    width: 26px; height: 26px; background: url("~@/assets/image/play/icon-close2.png") no-repeat center; background-size: cover;
                }
            }
            .periods {
                display: block; margin: 10px 0 20px; color: #000; font-size: 30px; line-height: 30px; text-align: center;
            }
            .throw-bet {
                padding: 0 35px;
                .throw-type {
                    display: flex; color: white; font-size: 28px; background: $theme-color; border-top-left-radius: 6px; border-top-right-radius: 6px;
                    em {
                        flex: 1; text-align: center; line-height: 80px;
                        i {
                            display: inline-block; padding-left: 46px;
                        }
                        .icon-t {
                            background: url("~@/assets/image/play/icon-edit-round.png") no-repeat left center; background-size: 38px 38px;
                        }
                        .icon-m {
                            background: url("~@/assets/image/play/icon-recharge.png") no-repeat left center; background-size: 38px 38px;
                        }
                    }
                }
                .bet-list {
                    border-radius: 6px; border: 1px solid #d2d2d2; border-top: none;
                    .throw-list {
                        overflow: auto; max-height: 240px;
                        p {
                            display: flex; height: 80px; color: #333; font-size: 26px; line-height: 80px;
                            .list-sp {
                                flex: 1; padding-left: 12%; text-align: left;
                                overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                                input {
                                    display: inline-block; width: 115px; height: 50px; line-height: 50px; color: $theme-color; line-height: 40px; text-align: center; border: 1px solid #d2d2d2; border-radius: 6px;
                                }
                            }
                        }
                        .lis { background: #fbf6e9; }
                    }
                }
            }
            .throw-amount {
                margin: 20px 0 30px; color: #000; font-size: 28px; line-height: 28px; text-align: center;
                .rd { color: $theme-color }
            }
            .throw-btn {
                display: block; width: 100%; height: 80px; color: #fff; font-size: 34px; line-height: 80px; text-align: center; border-radius: 6px; background: #d9342f;
            }
        }
    }
    .lotteryMask {
        position: fixed; top: 0;left: 0;z-index: 399;width: 100%;height: 100%; background: rgba(0,0,0,.5);
        .lotteryBox {
            width: 80%; max-width: 80%; margin: 45% auto;
            span {
                display: block; width: 500px; height: 330px; margin: 0 auto 0; background: url("~@/assets/image/system/winningPrize.png") no-repeat center; background-size: 100% 100%;
            }
            .winCoin {
                color: #fbd459; font-size: 30px; text-align: center;
                em {
                    padding: 0 5px; font-size: 32px;
                }
            }
            .iconX {
                display: block; width: 48px; height: 48px; margin: 30px auto 0; background: url("~@/assets/image/system/lotteryX.png") no-repeat center; background-size: cover;
            }
        }
    }
</style>
