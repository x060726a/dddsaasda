<template>
    <section>
        <div class="HomeMain">
            <p class="notice clearfix">
                <i></i>
                <marquee :interval="interval">
                    <marquee-item v-for="(item, key) in notice" :key="key" class="align-middle">
                        <router-link to="/message">{{item.title}}：{{item.content}}</router-link>
                    </marquee-item>
                </marquee>
            </p>
            <ol class="listMenu clearfix">
                <li @touchstart.stop="$emit('sign')">
                    <a>
                        <i></i>
                        <p>每日签到</p>
                    </a>
                </li>
                <li>
                    <router-link to="/message">
                        <i></i>
                        <p>消息中心</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/usertask">
                        <i></i>
                        <p>有奖任务</p>
                    </router-link>
                </li>
                <li>
                    <router-link to="/betRecord">
                        <i></i>
                        <p>投注记录</p>
                    </router-link>
                </li>
            </ol>
            <div class="mask"></div>
            <!--热门彩种-->
            <h3 class="commTitle clearfix">
                <i></i>
                <strong>热门彩种</strong>
                <em>平台极力推荐</em>
            </h3>
            <ul class="gameList clearfix">
                <li v-for="(item, key) in lotterList" :key="key" :class="{'lisTwo' : (key + 1 == lotterList.length - 1 && lotterList.length % 2 == 0) || (key == lotterList.length - 1 && lotterList.length % 2 != 0)}">
                    <a class="clearfix" @click="$router.push({path: item.name, query: {id: Number(item.id)}})">
                        <img :src="lotteryImg[key]" :alt="item.title" />
                        <div>
                            <h3>{{item.title}}</h3>
                            <CountDowm @reStart="reStart" :id="item.id" :index="key" :lotteryObj="item"/>
                        </div>
                    </a>
                </li>
                <li ref="lis" v-if="lotterList.length % 2 != 0">
                    <a>
                        <img src="@/assets/image/index/more.png" alt="诚信28" />
                        <div>
                            <h3>更多</h3>
                            <span class="sm">敬请期待</span>
                        </div>
                    </a>
                </li>
            </ul>
            <div class="mask"></div>
            <!--实时数据-->
            <h3 class="commTitle titleData clearfix">
                <i></i>
                <strong>实时数据</strong>
                <em>可靠大平台 用户赚钱率高达99%</em>
            </h3>
            <ol class="dataList clearfix">
                <li>
                    <p><i></i><span>注册用户</span></p>
                    <strong><countup :start-val="0" :end-val="realTimeData.reg_user_num" :duration="2"></countup></strong>
                </li>
                <li>
                    <p><i class="icon"></i><span class="sp">已赚金额</span></p>
                    <strong><countup :start-val="0" :end-val="Number(realTimeData.earned_amount)" :duration="2"></countup></strong>
                </li>
            </ol>
            <div class="mask"></div>
            <!--用户动态-->
            <h3 class="commTitle userDy clearfix">
                <i></i>
                <strong>用户动态</strong>
                <em>新老玩家动态</em>
            </h3>
            <div class="userData clearfix">
                <section>
                    <span class="icon">
                        <i></i><i></i><i></i><i></i><i></i>
                    </span>
                    <seamless :data="userDynamics" :class-option="classOption" class="seamlessWarp">
                        <p v-for="(item, key) in userDynamics" :key="key" class="p-list">
                            <em class="f">{{item.nickname}}</em>
                            <strong class="f">{{item.text}}<i class="money">{{item.coin}}</i>元</strong>
                            <span class="r">{{item.time}}</span>
                        </p>
                    </seamless>
                </section>
            </div>
        </div>
    </section>
</template>

<script>
    import { Marquee, MarqueeItem, Countup } from 'vux'
    import seamless from 'vue-seamless-scroll'
    export default {
        name: "HomeMain",
        components: {
            Marquee,
            MarqueeItem,
            Countup,
            seamless,
            CountDowm(){
                return{
                    component:import('@/components/public/t_CountDown.vue')
                }
            }
        },
        computed: {
            classOption: function () {
                return {
                    step: 0.3,
                    limitMoveNum: this.userDynamics.length,
                    direction: 1
                }
            },
        },
        props: {
            serverTime: Number, // 服务器时间
            notice: Array, // 公告
            lotterList: Array, // 彩种信息
            realTimeData: Object, // 实时数据
            userDynamics: Array // 用户动态
        },
        data () {
            return {
                popupVisible:false,
                lotteryImg: [],
                interval: 2000, // 公告滚动时长
                gameIndex: 0 // 彩种数量
            }
        },
        watch:{
            'serverTime'(val,oval){
                this.lotterList.forEach(ele => {
                    ele['server_time'] = this.serverTime
                });
            }
        },
        methods: {
            // moreGame () {
                // if (this.gameIndex === 7) {
                //     this.gameIndex = this.lotterList.length
                // } else {
                //     this.gameIndex = 7
                // }
                // this.gameIndex = this.lotterList.length, this.$refs.lis.style.display = 'none'
                // this.$emit('resetHeight')
            // },
            // 游戏时间获取
            // getGameTime(obj){
            //     this.$get('lotteryTime',{id:obj.id}).then(res=>{
            //         if(res.code==0){
            //             res.data.lottery['server_time'] = res.data.server_time
            //             this.$set(this.lotterList,obj.index,res.data.lottery)
            //         }
            //     })
            // },
            reStart(value){
                //this.getGameTime(value)
            }
        },
        created(){
            this.lotterList.forEach(ele => {
                ele['server_time'] = this.serverTime
                this.lotteryImg.push(ele.icon)
            })
        }
    }
</script>

<style lang="scss" scoped>
    .HomeMain {
        position: relative; background: white;
        .mask {
            height: 20px; background: #f3f3f3;
        }
        .notice {
            height: 33px; line-height: 33px; padding: 0 40px 0 20px;
            i {
                float: left; width: 36px; height: 33px; margin-right: 13px; background: url("~@/assets/image/index/notice.png") no-repeat center; background-size: cover;
            }
            a {
                display: block; color: #999999; font-size: 22px; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
            }
            .vux-marquee {
                float: left;  width: 640px; text-align: left;
                li {
                    overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                }
            }
        }
        .listMenu {
            padding:  0 60px; margin: 23px 0 15px;
            li {
                float: left; width: 113px; margin-right: 59px; color: #666; font-size: 24px; text-align: center;
                a {
                    overflow: hidden; display: block; color: #666;
                    i {
                        display: inline-block; width: 90px; height: 90px;
                        transform: translateY(-90px); animation: wobble .2s ease-in-out 0.3s forwards;
                        @keyframes wobble {
                            from {
                                transform: translateY(-90px);
                            }
                            to {
                                transform: translateY(0px);
                            }
                        }
                    }
                    p {
                        line-height: 33px; margin-top: 5px;
                        transform: translateY(33px); animation: wobblep .2s ease-in-out 0.3s forwards;
                        @keyframes wobblep {
                            from {
                                transform: translateY(33px);
                            }
                            to {
                                transform: translateY(0px);
                            }
                        }
                    }
                }
            }
            li:first-child {
                i {
                    background: url("~@/assets/image/index/signIn.png"); background-size: cover;
                }
            }
            li:nth-child(2) {
                i {
                    background: url("~@/assets/image/index/noticeCenter.png"); background-size: cover;
                }
            }
            li:nth-child(3) {
                i {
                    background: url("~@/assets/image/index/task.png"); background-size: cover;
                }
            }
            li:last-child {
                margin: 0;
                i {
                    background: url("~@/assets/image/index/betRecord.png"); background-size: cover;
                }
            }
        }
        .commTitle {
            height: 80px; line-height: 80px; padding: 0 20px; box-shadow: 1px 1px #d2d2d2;
            i {
                float: left; width: 31px; height: 36px; margin-top: 22px; background: url("~@/assets/image/index/hot.png") no-repeat; background-size: cover;
            }
            strong {
                float: left; margin: 0 17px 0 14.6px; color: #333; font-size: 28px; font-weight: 700;
            }
            em {
                float: left; color: #999; font-size: 22px;
            }
        }
        .titleData {
            i {
                width: 36px; height: 34px; background: url("~@/assets/image/index/shuju.png") no-repeat; background-size: cover;
            }
        }
        .userDy {
            i {
                width: 36px; height: 33px; background: url("~@/assets/image/index/notice.png") no-repeat; background-size: cover;
            }
        }
        .gameList {
            li {
                float: left; width: 50%; padding: 30px 0 30px 40px;  box-shadow: 1px 0 0 0 #d2d2d2; border-bottom: 1px solid #d2d2d2;
                a {
                    display: block;
                    img {
                        float: left; width: 100px; height: 100px; margin-right: 29px; opacity: 0;
                        animation: wobblea .3s ease-in-out 0.1s forwards;
                        @keyframes wobblea {
                            from {
                                opacity: 0;
                            }
                            to {
                                opacity: 1;
                            }
                        }
                    }
                    >div {
                        position: relative; float: left; height: 90px; padding-top: 13px;
                        h3 {
                            height: 40px; margin-bottom: 5px; color: #333; font-size: 28px; line-height: 40px;
                        }
                        .sm {
                            display: block; color: #666; font-size: 24px;
                        }
                        >.time-wrap {
                            color: $theme-color; font-size: 22px; line-height: 30px;
                        }
                    }
                }
            }
            li:last-child, .lisTwo { border-bottom: none; }
        }
        .dataList {
            padding: 0 20px; margin: 20px 0;
            li {
                float: left; width: 350px; height: 140px; padding: 27px 0; color: white; text-align: center; background: url("~@/assets/image/index/bg.jpg") no-repeat center; background-size: cover;
                p {
                    width: 150px;  height: 37px; margin: 0 auto; line-height: 37px; font-size: 26px;
                    i {
                        float: left; width: 32px; height: 37px;  background: url("~@/assets/image/index/haoyouicon.png") no-repeat left center; background-size: 100% auto;
                    }
                    .icon {
                        height: 34px; background: url("~@/assets/image/index/yuanbao.png") no-repeat left center; background-size: 100% auto;
                    }
                    span {
                        float: right; margin-top: 1px;
                    }
                    .sp {
                        margin: 0;
                    }
                }
                strong {
                    display: block; width: 270px; line-height: 42px; margin: 7px auto; font-size: 36px; letter-spacing: 2px; text-align: center; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                }
            }
            li:last-child {
                float: right; background: url("~@/assets/image/index/bg1.jpg") no-repeat center; background-size: cover;
            }
        }
        .userData {
            padding: 30px; pointer-events: none;
            section {
                padding: 21px 29px 25px 29px; background: #f7f7f7;
                .seamlessWarp {
                    overflow: hidden; height: 273px;
                }
                .icon {
                    float: left; width: 2px; height: 252px; background: $theme-color; margin: 7px 22px 0 0;
                    i {
                        display: block; width: 12px; height: 12px; margin: 0 0 48px -6px; background: $theme-color; border-radius: 100%;
                    }
                }
                .p-list {
                    height: 33px; line-height: 33px; margin-bottom: 27px; color: #666; font-size: 24px;
                    .f { float: left; }
                    .r { float: right; color: #999; }
                    em { width: 145px; color: #3F8FEB; overflow:hidden; text-overflow:ellipsis; white-space: nowrap; }
                    strong {
                        width: 280px; margin: 0 0 0 22px; overflow:hidden; text-overflow:ellipsis; white-space: nowrap;
                        .money {
                            color: $theme-color; padding: 0 5px;
                        }
                    }
                }
            }
        }
    }
</style>
