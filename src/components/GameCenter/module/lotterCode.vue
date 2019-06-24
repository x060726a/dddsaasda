<template>
    <section class="lotterCode">
        <!--赛车-->
        <section class="carGame" :class="{'bjCar' : gameId == 20, 'ffCar' : gameId == 22}" v-if="gameId == 20 || gameId == 21 || gameId == 22 || gameId == 23">
            <div class="commList" @touchstart.stop="open_Code()">
                <strong class="f">第<i class="ld">{{newCode.qihao}}</i>期</strong>
                <p class="f carCode">
                    <span :class="{['f carNum' + carCode[key]] : true}" v-for="(res, key) in newCode.data" :key="key">{{carCode[key]}}</span>
                </p>
                <i class="i_more" ref="i_more"></i>
            </div>
            <ol class="comm-history" v-if="showList">
                <li class="commList" v-for="(item, key) in openCode" :key="key">
                    <div class="listCon clearfix">
                        <strong class="f">第<i class="ld">{{item.qihao}}</i>期</strong>
                        <p class="f carCode">
                            <span :class="{['f carNum' + res] : true}" v-for="(res, key) in item.data.split(',')" :key="key">{{res}}</span>
                        </p>
                    </div>
                </li>
            </ol>
        </section>
        <!--时时彩-->
        <section class="ssc" :class="{'cqssc' : gameId == 10}" v-if="gameId == 10 || gameId == 11 || gameId == 12">
            <div class="commList"  @touchstart.stop="open_Code()">
                <strong class="f">第<i class="ld">{{newCode.qihao}}</i>期</strong>
                <p class="sscCode f">
                    <span class="sscNum f" v-for="(res, key) in newCode.data" :key="key">
                        <em class="playNum">
                            <i>{{res}}</i>
                            <i v-for="item in 20">{{Math.floor(Math.random()*10)}}</i>
                        </em>
                    </span>
                </p>
                <i class="i_more" ref="i_more"></i>
                <strong v-if="!random" class="sumX r">总和：? ? ?</strong>
                <strong v-else class="sumX r">总和: {{getBall(newCode.data)}},{{getBall(newCode.data) >= 23 ? '大' : '小'}},{{getBall(newCode.data) % 2 != 0 ? '单' : '双'}}</strong>
            </div>
            <ol class="comm-history" v-if="showList">
                <li class="commList" v-for="(item, key) in openCode" :key="key">
                    <div class="listCon clearfix">
                        <strong class="f">第<i class="ld">{{item.qihao}}</i>期</strong>
                        <p class="sscCode f">
                            <span class="sscNum f" v-for="(res, key) in item.data.split(',')" :key="key">{{res}}</span>
                        </p>
                        <strong class="sumX sumRig r">总和: {{getBall(item.data.split(','))}},{{getBall(item.data.split(',')) >= 23 ? '大' : '小'}},{{getBall(item.data.split(',')) % 2 != 0 ? '单' : '双'}}</strong>
                    </div>
                </li>
            </ol>
        </section>
        <!--骰宝-->
        <section class="shaibao" v-if="gameId == 40">
            <div class="commList"  @touchstart.stop="open_Code()">
                <strong class="f shaibaoQi">第<i class="ld">{{newCode.qihao}}</i>期</strong>
                <p class="saiCode f">
                    <span :class="{['shaiNum' + carCode[key]] : true}" v-for="(res, key) in newCode.data" :key="key"></span>
                </p>
                <i class="i_more" ref="i_more"></i>
                <strong v-if="!random" class="sumX r">总和：? ? ?</strong>
                <strong v-else class="sumX r">总和: {{getBall(newCode.data)}},{{getBall(newCode.data) >= 11 ? '大' : '小'}},{{getBall(newCode.data) % 2 != 0 ? '单' : '双'}}</strong>
            </div>
            <ol class="comm-history" v-if="showList">
                <li class="commList" v-for="(item, key) in openCode" :key="key">
                    <div class="listCon clearfix">
                        <strong class="f shaibaoQi">第<i class="ld">{{item.qihao}}</i>期</strong>
                        <p class="saiCode f">
                            <span :class="{['shaiNum' + res] : true}" v-for="(res, key) in item.data.split(',')" :key="key"></span>
                        </p>
                        <strong class="sumX sumRig r">总和: {{getBall(item.data.split(','))}},{{getBall(item.data.split(',')) >= 11 ? '大' : '小'}},{{getBall(item.data.split(',')) % 2 != 0 ? '单' : '双'}}</strong>
                    </div>
                </li>
            </ol>
        </section>
        <!--幸运28-->
        <section class="xy28" v-if="gameId == 30 || gameId == 31">
            <div class="commList"  @touchstart.stop="open_Code()">
                <strong class="f">第<i class="ld">{{newCode.qihao}}</i>期</strong>
                <p class="xyCode f">
                    <span class="f" v-for="(res, key) in newCode.data" :key="key">
                        <em class="playNum">
                            <i>{{res}}</i>
                            <i v-for="item in 20">{{Math.floor(Math.random() * 21)}}</i>
                        </em>
                    </span>
                    <span class="f spRd">
                        <em class="playNum">
                            <i>{{getBall(newCode.data)}}</i>
                            <i v-for="item in 20">{{Math.floor(Math.random() * 21)}}</i>
                        </em>
                    </span>
                    <em class="symbol symbolOne">+</em><em class="symbol symbolTwo">+</em><em class="symbol symbolThree">=</em>
                </p>
                <i class="i_more" ref="i_more"></i>
                <strong v-if="!random" class="sumXy r">( ? ? )</strong>
                <strong v-else class="sumXy r">( {{getBall(newCode.data) >= 14 ? '大' : '小'}},{{getBall(newCode.data) % 2 != 0 ? '单' : '双'}} )</strong>
            </div>
            <ol class="comm-history" v-if="showList">
                <li class="commList" v-for="(item, key) in openCode" :key="key">
                    <div class="listCon clearfix">
                        <strong class="f">第<i class="ld">{{item.qihao}}</i>期</strong>
                        <p class="xyCode f">
                            <span class="f" v-for="(res, key) in item.data.split(',')" :key="key">{{res}}</span>
                            <span class="f spRd">{{getBall(item.data.split(','))}}</span>
                            <em class="symbol symbolOne">+</em><em class="symbol symbolTwo">+</em><em class="symbol symbolThree">=</em>
                        </p>
                        <strong class="sumXy sumRig r">( {{getBall(item.data.split(',')) >= 14 ? '大' : '小'}},{{getBall(item.data.split(',')) % 2 != 0 ? '单' : '双'}} )</strong>
                    </div>
                </li>
            </ol>
        </section>
        <!--六合彩-->
        <section class="hkc" :class="{'jisuc': gameId == 71}" v-if="gameId == 70 || gameId == 71">
            <div class="commList"  @touchstart.stop="open_Code()">
                <strong class="f">第<i class="ld">{{newCode.qihao}}</i>期</strong>
                <div class="f codeCon">
                    <p class="hkCode f">
                    <span v-for="(res, key) in newCode.data" :key="key" :class="{['f liuBox' + res]: true, ['lastBox' + res]: key == 6}">
                        <em class="playNum">
                            <i>{{res}}</i>
                            <i v-for="item in 20">{{Math.floor(Math.random() * 21)}}</i>
                        </em>
                    </span>
                    </p>
                    <p class="zodiac f">
                        <span class="f" v-for="(res, key) in newCode.info" :key="key">{{res}}</span>
                    </p>
                    <em class="symbolJ">+</em>
                </div>
                <i class="i_more" ref="i_more"></i>
            </div>
            <ol class="comm-history" v-if="showList">
                <li class="commList" v-for="(item, key) in openCode" :key="key" v-if="key < 7">
                    <div class="listCon clearfix">
                        <strong class="f">第<i class="ld">{{item.qihao}}</i>期</strong>
                        <div class="f codeCon">
                            <p class="hkCode f">
                                <span v-for="(res, key) in item.data.split(',')" :key="key" :class="{['f liuBox' + res]: true, ['lastBox' + res]: key == 6}">{{res}}</span>
                            </p>
                            <p class="zodiac f">
                                <span class="f" v-for="(res, key) in item.info.split(',')" :key="key">{{res}}</span>
                            </p>
                            <em class="symbolJ">+</em>
                        </div>
                    </div>
                </li>
            </ol>
        </section>
        <!--牛牛-->
        <section class="niuGanme" v-if="gameId == 50">
            <div class="niuniu clearfix" @touchstart.stop="open_Code()">
                <p class="qihao">第{{newCode.qihao}}期截止</p>
                <span class="vs">VS</span>
                <div class="lan-f f">
                    <i class="win-l" v-if="newCode.win == '蓝方胜'"></i>
                    <div class="niu-code clearfix">
                        <p v-if="poker">
                            <i class="poker pokerDef" v-for="res in 5"></i>
                        </p>
                        <p v-else>
                            <i v-for="(res, key) in newCode.data" :class="{['poker poker' + res] : true}" v-if="key < 5"></i>
                        </p>
                        <i v-if="!poker" class="code-num">{{niuNum}}</i>
                    </div>
                </div>
                <div class="rd-f f">
                    <i class="win-r" v-if="newCode.win == '红方胜'"></i>
                    <div class="niu-code clearfix">
                        <p v-if="poker">
                            <i class="poker pokerDef" v-for="res in 5"></i>
                        </p>
                        <p v-else>
                            <i v-for="(res, key) in newCode.data" :class="{['poker poker' + res] : true}" v-if="key > 4"></i>
                        </p>
                        <i v-if="!poker" class="code-num">{{niuNumR}}</i>
                    </div>
                </div>
                <i class="i_more" ref="i_more"></i>
                <div v-if="!poker" class="mask" :class="{rgbaR: newCode.win == '蓝方胜', rgbaL: newCode.win == '红方胜'}"></div>
            </div>
            <ol class="niu-history hid" ref="niuList" v-if="showList">
                <li v-for="(res, key) in openCode" :key="key" v-if="key < 6">
                    <div class="niuList clearfix">
                        <strong class="f">第<i class="ld">{{res.qihao}}</i>期</strong>
                        <p class="list clearfix">
                            <i v-for="item in res.info.split(',')" :class="{['poker poker' + item] : true}"></i>
                        </p>
                        <strong class="f r">
                            <i :class="{ld: res.win == '蓝方胜', rd: res.win == '红方胜'}">{{res.win}}</i>,
                            {{res.niuNum}}
                        </strong>
                    </div>
                </li>
            </ol>
        </section>
        <!--咪牌-->
        <ol class="mipai clearfix" v-if="mipai && newCode">
            <li>
                <p>第<em class="rd">{{lotteryObj.qihao}}</em>期截止</p>
                <div class="time">
                    <CountDowm :stylename="'detailTime'" :lotteryObj="lotteryObj" @isOpening="openGame"/>
                </div>
                <strong class="refresh" @click="setCanvas">刷新</strong>
            </li>
            <li>
                <p>第<em class="rd">{{newCode.qihao}}</em>期开奖结果</p>
                <div class="scratch">
                    <div class="scratchMask" ref="scratchMask">
                        <div v-if="newCode.data">
                            <p :class="{['code' + gameId] : true}" >
                                <span :class="{['shaiNum' + res] : gameId == 40, ['carNum' + res]: gameId == 20 || gameId == 21 || gameId == 22 || gameId == 23}" v-for="(res, key) in newCode.data" :key="key" v-if="gameId != 50">{{res}}</span>
                                <span :class="{['poker poker' + res] : true}" v-for="(res, key) in newCode.info" :key="key" v-if="gameId == 50 && key < 5"></span>
                                <span v-if="gameId == 30 || gameId == 31">{{getBall(newCode.data)}}</span>
                            </p>
                            <i v-if="gameId == 50" class="code-num" :class="{'niu-lan' : newCode.win == '蓝方胜'}">
                                <em v-if="newCode.win == '蓝方胜'">{{niuNum}}</em>
                                <em v-else>{{niuNumR}}</em>
                                {{newCode.win}}
                            </i>
                            <p class="zodiac" v-if="gameId == 70 || gameId == 71">
                                <span class="f" v-for="(res, key) in newCode.info" :key="key">{{res}}</span>
                                <em class="symbolJ">+</em>
                            </p>
                            <p class="symbol" v-if="gameId == 30 || gameId == 31">
                                <em class="symbolOne">+</em><em class="symbolTwo">+</em><em class="symbolThree">=</em>
                            </p>
                        </div>
                    </div>
                </div>
            </li>
        </ol>
        <canvas class="canvas" ref="canvas" v-if="mipai"></canvas>
        <!--取消投注-->
        <div class="cedan-btn" v-if="betList.length>0" @click.stop="$store.commit('isShowBetListDalog',true)">
            <span>本期已下{{betList.length}}注</span><span>取消本期已下注</span>
        </div>
    </section>
</template>

<script>
    import {mapState} from 'vuex'
    import {calFormat} from  '@/assets/js/util.js'
    export default {
        name: "ceshi",
        components: {
            CountDowm(){
                return{
                    component: import('@/components/public/t_CountDown')
                }
            }
        },
        computed: {
            ...mapState(['lotterCode','betList', 'isCloseGame']),
            code () {
                let code = `code${this.gameId}`
                return this.lotterCode[code]
            }
        },
        props: {
            mipai: Boolean, // 咪牌
            gameId: Number, // 彩种ID
            openCode: '', // 开奖号码
            lotteryObj: ''
        },
        data () {
            return {
                newCode: '', // 最新一期开奖号码
                random: false, // 随机号码结束
                poker: true, // 翻牌
                showList: false, // 历史列表
                timer: null, // 定时器
                carCode: [], // 赛车游戏随机号码
                niuNum: '', // 蓝方牛数
                niuNumR: '', // 红方牛数
                scratch: true, // 开奖中禁止刮奖
                cxt: '已有结果请刮图层',
                liuheColor:{ // 六合彩号码颜色
                    'liuheH': [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
                    'liuheLv': [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49],
                    'liuheL': [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
                }
            }
        },
        watch: {
            // 监听开奖号码
            code (val) {
                if (val) {
                    if (this.mipai) {
                        setTimeout(() => {
                            this.cxt = '已有结果请刮图层', this.scratch = true, this.setCanvas()
                        }, 500)
                    }
                    this.calcNiu(JSON.parse(JSON.stringify(val)))
                    this.carNum()
                }
            },
            mipai (val) {
                if (val) this.$nextTick(() => this.setCanvas())
            },
            openCode (val) {
                if (val && this.gameId == 50) {
                    val.some(item => {
                        let arr = []
                        item.info.split(',').forEach(res => {
                            arr.push(res.split('_')[0])
                        })
                        item.niuNum = calFormat(arr)
                    })
                }
            }
        },
        methods : {
            // 开奖状态
            openGame (val) {
                if (val && this.isCloseGame) return this.scratch = false, this.cxt = '开奖中', this.setCanvas()
            },
            // 展开历史开奖
            open_Code () {
                this.showList = !this.showList
                if (this.showList) this.$refs.i_more.style.cssText = 'transform: rotate(180deg)'
                if (!this.showList) this.$refs.i_more.style.cssText = 'transform: rotate(0)'
            },
            // 牛牛算法、当期最新号码
            calcNiu (val) {
                this.newCode = val, this.newCode.data = val.data.split(',')
                if (val.info) this.newCode.info = val.info.split(',')
                let code1 = [], code2 = [], arr = this.newCode.data
                if (this.gameId == 50) {
                    arr.forEach((res, i) => {
                        if (i < 5) {
                            code1.push(res.split('_')[0])
                        } else {
                            code2.push(res.split('_')[0])
                        }
                    })
                    this.niuNum = calFormat(code1), this.niuNumR = calFormat(code2)
                    this.openCode.some(item => {
                        let arr = []
                        item.info.split(',').forEach(res => {
                            arr.push(res.split('_')[0])
                        })
                        item.niuNum = calFormat(arr)
                    })
                }
            },
            // 赛车游戏随机号码特效
            carNum () {
                if (this.gameId == 20 || this.gameId == 21 || this.gameId == 22 || this.gameId == 23 || this.gameId == 40) {
                    let i = 0, k = 0, x = 0 // k 随机次数：赛车游戏1~10，骰宝1~6，x：循环次数：赛车游戏10次，骰宝3次
                    this.gameId == 40 ? k = 6 : k = 10, this.gameId == 40 ? x = 3 : x = 10
                    clearInterval(this.timer)
                    this.timer = setInterval(() => {
                        i++;
                        for (let j = 0; j < x; j++) {
                            this.$set(this.carCode, j, Math.ceil(Math.random() * k))
                        }
                        if (i >= 20) {
                            clearInterval(this.timer)
                            for (let j = 0; j < x; j++) {
                                this.$set(this.carCode, j, this.newCode.data[j])
                            }
                            this.random = true
                        }
                    }, 100)
                }
            },
            // 大小单双
            getBall (res) {
                let sum = 0
                res.some(item => { sum += Number(item) })
                return sum
            },
            // 咪牌
            setCanvas () {
                let canvas = this.$refs.canvas, context = canvas.getContext("2d"), scratchMask = this.$refs.scratchMask
                let width = scratchMask.offsetWidth, height = scratchMask.offsetHeight
                // 设置宽、高并填充背景颜色
                canvas.width = width, canvas.height = height, context.fillStyle="#e7e7e7", context.fillRect(0, 0, width, height);
                // 设置字体
                context.fillStyle = "#fc7f05", context.font = 'normal 16px PingFang SC', context.textAlign = 'center', context.textBaseline = 'middle'
                context.fillText(this.cxt, width / 2, height / 2)
                // 刮奖
                if (!this.scratch) return false
                context.globalCompositeOperation = 'destination-out'
                canvas.addEventListener('touchmove', function(event) {
                    event.preventDefault(); //先去除默认的响应行为
                    let touch = event.touches[0]; //获取触摸的第一个点
                    context.beginPath(); //开始路径的绘制
                    context.arc(touch.pageX - canvas.offsetLeft, touch.pageY - canvas.offsetTop, 10, 0, Math.PI * 2); //在所触摸处绘制圆形，半径为20像素
                    context.closePath(); //结束路径绘制
                    context.fillStyle = "#e7e7e7"; //随意设置一种绘制颜色
                    context.fill(); //填充该颜色
                    let imgData = context.getImageData(0, 0, width, height); //获取画布中的所有像素
                    let data = imgData.data; //得到像素的字节数据
                    let length = data.length; //获取该数据的长度
                    let transparent = 0; //设置一个变量来记录已经变为透明的像素点的数量
                    for (let i = 0; i < length; i += 4) { //循环遍历每一个像素
                        let alpha = data[i + 3]; //获取每个像素的透明度数值
                        if (alpha < 10) //当透明度小于10时，认为它已经被擦除，transparent数值加1
                            transparent++;
                    }
                    let percentage = transparent / (length / 4); //计算透明像素在所有像素点中所占比例
                    if (percentage > 0.8) { //当比例大于90%时，显示刮奖结束字样
                        // alert("刮奖结束！");
                        context.clearRect(0,0,width,height);
                    }
                });
            }
        },
        mounted () {
            this.$nextTick(() => {
                if (this.gameId == 50) setTimeout(() => {this.poker = false}, 1950)  // 牛牛翻牌
                if (this.gameId == 10 || this.gameId == 11 || this.gameId == 12 || this.gameId == 30 || this.gameId == 31 || this.gameId == 70 || this.gameId == 71) setTimeout(() => {this.random = true}, 2950)
                this.carNum()
            })
        },
        created () {
            this.calcNiu(JSON.parse(JSON.stringify(this.openCode[0])))
        },
        destroyed () {
            clearInterval(this.timer)
        }
    }
</script>

<style scoped lang="scss">
    .lotterCode {
        position: relative; z-index: 99; padding-bottom: 20px; background: #f3f3f3;
        .canvas {
            position: fixed; top: 168px; right: 30px; z-index: 100; font-size: 26px;
        }
        /*咪牌*/
        .mipai {
            position: absolute; top: -125px; width: 100%; z-index: 99; padding: 16px 10px; background: #d9342f;
            li {
                float: left; background: #f5e073; padding: 20px 0; border-radius: 6px;
                p {
                    height: 26px; color: #333; font-size: 26px; line-height: 26px; text-align: center;
                    .rd { color: #d9342f; font-size: 26px; }
                }
                .refresh {
                    display: block; width: 180px; height: 50px; margin: 20px auto 0; border: 1px solid #d9342f; color: #d9342f; line-height: 48px; font-size: 28px; background: #f5e073; border-radius: 30px; text-align: center;
                }
                .time {
                    height: 40px; margin: 20px auto; font-size: 24px; line-height: 40px;
                    .time-wrap { padding: 0; text-align: center; }
                }
                .scratch {
                    width: 420px; height: 110px; line-height: 110px; margin: 20px auto 0; padding: 10px; background: white;
                    .scratchMask {
                        position: relative; height: 90px;
                        .symbol {
                            position: absolute; width: 100%; height: 100%; top: 0; left: 0;
                            em {
                                position: absolute; top: 24px; width: 40px; height: 40px; font-size: 40px; color: #8c8c8c; line-height: 40px;
                            }
                            .symbolOne { left: 87px; }
                            .symbolTwo { left: 176px; }
                            .symbolThree { left: 268px; }
                        }
                        .zodiac {
                            position: absolute; top: 0; left: 0;
                            span {
                                float: left; color: #333; width: 45px; height: 45px; text-align: center; line-height: 45px; margin: 50px 10px 0 0;
                            }
                            span:nth-child(6) { margin-right: 35px; }
                            span:nth-child(7) { margin-right: 0; }
                            .symbolJ {
                                position: absolute; top: 0; right: 40px; width: 45px; height: 45px; font-size: 40px; color: #8c8c8c; line-height: 45px;
                            }
                        }
                        .code-num {
                            position: absolute; top: 45%; left: 50%; margin-left: -102px; color: #d9342f;
                            width: 204px; height: 51px; font-size: 24px; text-align: center; line-height: 37px; background: url("/static/images/poker/win.png") no-repeat; background-size: cover;
                            em { color: #d9342f; }
                        }
                        .niu-lan { color:  #3f7feb;}
                        p {
                            height: 90px; text-align: center; line-height: 90px; line-height: 90px;
                            span {
                                display: inline-block; width: 40px; height: 40px; color: white; font-size: 24px; line-height: 40px; text-align: center;
                            }
                        }
                        .code10, .code11, .code12 {
                            span {
                                margin-right: 12px; background: #d9342f; border-radius: 50%;
                            }
                            span:last-child { margin: 0 }
                        }
                        .code20, .code21, .code22, .code23 {
                            @for $i from 1 to length($bgcolorList) + 1 {
                                .carNum#{$i} {
                                    width: 36px; height: 36px; line-height: 36px; margin-right: 4px; background-color: nth($bgcolorList,$i); border-radius: 6px;
                                }
                            }
                            span:last-child { margin: 0; }
                        }
                        .code30, .code31 {
                            span {
                                margin-right: 50px; color: #3f8feb; border: 1px solid #3f8feb; background: white; border-radius: 50%; line-height: 40px;
                            }
                            span:last-child {
                                margin: 0; border: none; color: white; background: #d9342f;
                            }
                        }
                        .code40 {
                            span {
                                width: 50px; height: 50px; line-height: 50px; margin-right: 24px; color: rgba(255, 255, 255, 0);
                            }
                            span:last-child { margin: 0; }
                            .shaiNum1 { background: url("/static/images/lotteryIcon/dice1@2x.png") no-repeat center; background-size: cover; }
                            .shaiNum2 { background: url("/static/images/lotteryIcon/dice2@2x.png") no-repeat center; background-size: cover; }
                            .shaiNum3 { background: url("/static/images/lotteryIcon/dice3@2x.png") no-repeat center; background-size: cover; }
                            .shaiNum4 { background: url("/static/images/lotteryIcon/dice4@2x.png") no-repeat center; background-size: cover; }
                            .shaiNum5 { background: url("/static/images/lotteryIcon/dice5@2x.png") no-repeat center; background-size: 100% 100%; }
                            .shaiNum6 { background: url("/static/images/lotteryIcon/dice6@2x.png") no-repeat center; background-size: cover; }
                        }
                        .code50 {
                            .poker {
                                display: inline-block; width: 50px; height: 60px; margin: 15px 10px 0 0;
                            }
                            .poker:last-child { margin-right: 0; }
                        }
                        .code70, .code71 {
                            span {
                                float: left; margin: 5px 10px 0 0; width: 45px; height: 45px; line-height: 38px; border: 1px solid; border-radius: 50%;
                            }
                            span:nth-child(1), span:nth-child(3) { border-color: $theme-color; color: $theme-color; }
                            span:nth-child(2), span:nth-child(4), span:nth-child(6) { border-color: #3f8feb; color: #3f8feb; }
                            span:nth-child(5) { border-color: #05ad5c; color: #05ad5c; }
                            span:nth-child(6) { margin-right: 35px; }
                            span:last-child { border: none; color: white; background: #05ad5c; margin-right: 0; }
                        }
                    }
                }
            }
            li:first-child {
                width: 290px; border-top-right-radius: 20px; border-bottom-right-radius: 20px;
            }
            li:last-child {
                width: 440px; border-top-left-radius: 20px; border-bottom-left-radius: 20px;
            }
        }
        /*所有*/
        .carGame, .shaibao, .ssc, .xy28, .hkc {
            background: white;
            .commList {
                height: 70px; line-height: 70px; padding: 0 20px; font-size: 24px;
                .f {
                    float: left;
                    .ld { color: #3f8feb; }
                }
                .r { float: right; }
                .i_more {
                    float: right; width: 34px; height: 19px; margin-top: 27px; background: url("~@/assets/image/system/icon-unfold@2x.png") no-repeat center; background-size: cover;
                    transition: all .3s ease-in-out;
                }
            }
            .comm-history {
                position: absolute; z-index: 10; top: 90px; width: 100%; background: white;
                li .listCon { border-bottom: 1px solid #d2d2d2; }
                li.commList:last-child {
                    padding: 0;
                    .listCon { padding: 0 20px; }
                }
            }
        }
        /*赛车*/
        .carGame {
            .commList .carCode {
                margin: 15px 0 0 30px;
                span {
                    float: left; width: 40px; height: 40px; margin-right: 4px; color: white; text-align: center; line-height: 42px; border-radius: 6px;
                }
                @for $i from 1 to length($bgcolorList) + 1 {
                    .carNum#{$i} {
                        background-color: nth($bgcolorList,$i);
                    }
                }
            }
        }
        .bjCar .commList .carCode { margin: 15px 0 0 45px; }
        .ffCar .commList { padding: 0 10px; }
        .ffCar .comm-history li.commList:last-child {
            .listCon { padding: 0 10px; }
        }
        /*时时彩*/
        .ssc, .xy28, .hkc {
            .commList {
                .sscCode, .xyCode, .hkCode {
                    position: relative; margin: 15px 0 0 30px;
                    span, .spRd {
                        overflow: hidden; width: 40px; height: 40px; margin-right: 12px; color: white; line-height: 42px; text-align: center; background: #d9342f; border-radius: 50%;
                        .playNum {
                            display: block; animation: wobbleNum 3s ease .1s forwards;
                            @keyframes wobbleNum {
                                from {
                                    transform: translateY(-800px);
                                } to {
                                      transform: translateY(0);
                                  }
                            }
                            i { display: block; height: 40px; }
                        }
                    }
                    span:last-child { margin: 0; }
                }
                .sumRig { margin-right: 34px; }
                .sumX {
                    width: 175px; text-align: left;
                }
            }
        }
        /*骰宝*/
        .shaibao {
            .commList {
                position: relative;
                .shaibaoQi {
                    width: 180px; text-align: left;
                }
                .saiCode {
                    margin: 10px 0 0 60px;
                    span {
                        float: left; width: 50px; height: 50px; margin-right: 24px;
                    }
                    span:last-child { margin: 0; }
                    .shaiNum1 { background: url("/static/images/lotteryIcon/dice1@2x.png") no-repeat center; background-size: cover; }
                    .shaiNum2 { background: url("/static/images/lotteryIcon/dice2@2x.png") no-repeat center; background-size: cover; }
                    .shaiNum3 { background: url("/static/images/lotteryIcon/dice3@2x.png") no-repeat center; background-size: cover; }
                    .shaiNum4 { background: url("/static/images/lotteryIcon/dice4@2x.png") no-repeat center; background-size: cover; }
                    .shaiNum5 { background: url("/static/images/lotteryIcon/dice5@2x.png") no-repeat center; background-size: 100% 100%; }
                    .shaiNum6 { background: url("/static/images/lotteryIcon/dice6@2x.png") no-repeat center; background-size: cover; }
                }
                .sumRig { margin-right: 34px; }
                .sumX {
                    width: 180px; text-align: left;
                }
            }
        }
        /*幸运28*/
        .xy28 .commList, .hkc .commList {
            .xyCode {  margin: 15px 0 0 40px; }
            .xyCode, .hkCode {
                span {
                    margin-right: 60px; color: #3f8feb; border: 1px solid #3f8feb; background: white; line-height: 38px;
                }
                span.spRd { margin: 0; border: none; }
                .symbol {
                    position: absolute; top: 3px; font-size: 40px; color: #8c8c8c; line-height: 30px;
                }
                .symbolOne { left: 55px; }
                .symbolTwo { left: 155px; }
                .symbolThree { left: 253px; }
            }
            .sumXy {
                width: 110px; text-align: left;
            }
        }
        .xy28 .comm-history ol>li>p { position: relative; }
        /*六合彩*/
        .hkc .commList {
            height: 110px; line-height: 110px;
            .codeCon {
                position: relative; width: 470px; padding: 10px 0 0 30px;
            }
            .hkCode, .zodiac{
                margin: 0;
                span { margin-right: 13px; width: 45px; height: 45px; line-height: 43px; }
                .liuBox5, .liuBox6, .liuBox11, .liuBox16, .liuBox17, .liuBox21, .liuBox22, .liuBox27, .liuBox28, .liuBox32, .liuBox33, .liuBox38, .liuBox39, .liuBox43, .liuBox44, .liuBox49 {
                    color: #05ad5c; border-color: #05ad5c;
                }
                .liuBox3, .liuBox4, .liuBox9, .liuBox10, .liuBox14, .liuBox15, .liuBox20, .liuBox25, .liuBox26, .liuBox31, .liuBox36, .liuBox37, .liuBox41, .liuBox42, .liuBox47, .liuBox48 {
                    color: #3F8FEB; border-color: #3f8feb;
                }
                .liuBox1, .liuBox2, .liuBox7, .liuBox8, .liuBox12, .liuBox13, .liuBox18, .liuBox19, .liuBox23, .liuBox24, .liuBox29, .liuBox30, .liuBox34, .liuBox35, .liuBox40, .liuBox45, .liuBox46 {
                    color: #D9342F; border-color: #d9342f;
                }
                .lastBox5, .lastBox6, .lastBox11, .lastBox16, .lastBox17, .lastBox21, .lastBox22, .lastBox27, .lastBox28, .lastBox32, .lastBox33, .lastBox38, .lastBox39, .lastBox43, .lastBox44, .lastBox49 {
                    background: #05ad5c;
                }
                .lastBox3, .lastBox4, .lastBox9, .lastBox10, .lastBox14, .lastBox15, .lastBox20, .lastBox25, .lastBox26, .lastBox31, .lastBox36, .lastBox37, .lastBox41, .lastBox42, .lastBox47, .lastBox48 {
                    background: #3F8FEB;
                }
                .lastBox1, .lastBox2, .lastBox7, .lastBox8, .lastBox12, .lastBox13, .lastBox18, .lastBox19, .lastBox23, .lastBox24, .lastBox29, .lastBox30, .lastBox34, .lastBox35, .lastBox40, .lastBox45, .lastBox46 {
                    background: #D9342F;
                }
                span:nth-child(6) { margin-right: 60px; }
                span:nth-child(7) { border: none; color: white; margin: 0;}
            }
            .zodiac {
                span { color: #333 !important; text-align: center }
                span:nth-child(7) { background: white;}
            }
            .symbolJ {
                position: absolute; top: 10px; right: 58px; font-size: 40px; color: #8c8c8c; line-height: 40px;
            }
            .i_more { margin-top: 40px; }
        }
        .hkc .comm-history { top: 130px; }
        /*牛牛*/
        .niuGanme {
            .niuniu {
                position: relative; color: $theme-color; font-size: 22px;
                .qihao {
                    position: absolute; top: 5px; width: 100%; left: 0; z-index: 10; color: white; text-align: center;
                }
                .i_more {
                    position: absolute; bottom: 30px; right: 10px; width: 40px; height: 23px; background: url("~@/assets/image/system/cp-icon-up.png") no-repeat center; background-size: cover;
                    transition: all .3s ease-in-out;
                }
                .vs {
                    position: absolute; top: 50%; left: 50%; z-index: 99; width: 100px; margin-left: -50px; text-align: center; color: #fbbf3e; font-size: 28px; font-weight: bold;
                    animation: wobbleVs 1.2s ease-in-out .1s forwards;
                    @keyframes wobbleVs {
                        25% {
                            transform: scale(2.5, 2.5);
                        }
                        50% {
                            transform: scale(1, 1);
                        }
                        75% {
                            transform: scale(1.5, 1.5);
                        }
                        100% {
                            transform: scale(1, 1);
                        }
                    }
                }
                .f {
                    position: relative; float: left; width: 50%; height: 180px;
                    .win-l {
                        float: left; width: 79px; height: 70px; background: url("/static/images/poker/win-l.png") no-repeat; background-size: cover;
                    }
                    .win-r {
                        float: right; width: 70px; height: 79px; background: url("/static/images/poker/win-r.png") no-repeat; background-size: cover;
                    }
                    .niu-code {
                        p {
                            position: absolute; float: left; top: 43px; left: 50%; margin-left: -138px;
                            .poker {
                                float: left; width: 96px; height: 120px; margin-left: -51px; animation: wobblep 1s ease-in-out 2s forwards;
                                @keyframes wobblep {
                                    25% {
                                        transform: rotateY(90deg);
                                    }
                                    50% {
                                        transform: rotateY(0);
                                    }
                                    75% {
                                        transform: rotateY(-90deg);
                                    }
                                    100% {
                                        transform: rotateY(0);
                                    }
                                }
                            }
                            .pokerDef {
                                background: url("/static/images/poker/poker_default.png") no-repeat center; background-size: cover;
                            }
                            .poker:first-child { margin: 0 }
                        }
                        .code-num {
                            position: absolute; left: 50%;
                            top: 125px; width: 204px; height: 51px; margin-left: -102px; text-align: center; line-height: 37px; background: url("/static/images/poker/win.png") no-repeat; background-size: cover;
                        }
                    }
                }
                .lan-f { background: #121561; }
                .rd-f { background: #910602; }
                .mask {
                    position: absolute; top: 0; width: 50%; height: 100%; background-color: rgba(0,0,0,.2);
                }
                .rgbaR { left: 50%; }
                .rgbaL { left: 0; }
            }
            .niu-history {
                position: absolute; top: 200px; width: 100%; transition: all .3s ease-in-out;
                li {
                    padding: 0 20px;
                    .niuList {
                        position: relative; height: 120px; padding: 0 10px; border-bottom: 1px solid #d2d2d2; line-height: 120px; color: #000; font-size: 24px; background: white;
                        .f {
                            float: left;
                            .ld { color: #3f8fe8; }
                            .rd { color: $theme-color; }
                        }
                        .r {
                            float: right;
                        }
                        .list {
                            position: absolute; top: 50%; left: 50%; transform: translate(-40%, -55%);
                            .poker {
                                float: left; width: 58px; height: 72px; margin: 24px 10px 0 0;
                            }
                            /*.poker:first-child { margin: 0; }*/
                        }
                    }
                }
                li:last-child {
                    padding: 0;
                    .niuList { padding: 0 30px; }
                }
            }
        }
        /*重置公用样式*/
        .cqssc {
            .commList { padding: 0 10px; }
            .comm-history li.commList:last-child {
                .listCon { padding: 0 10px; }
            }
        }
    }
    .cedan-btn{
        position: absolute;
        z-index: 2;
        bottom:-70px;
        width: 100%;
        height: 70px;
        line-height: 70px;
        display: flex;
        background: #d2d2d2;
        >span{
            flex: 1;
            font-size: 26px;
            text-align: center;
            border-right:#999 1px solid;
        }
        >span:last-child{
            border-right:none;
        }
    }
</style>
