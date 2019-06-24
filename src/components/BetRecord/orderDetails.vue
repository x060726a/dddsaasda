<template>
    <section class="orderDetails">
        <TrayHeader :title="title" />
        <div class="scroX">
            <scroller lock-x ref="scroller" height="100%" >
                <div>
                    <section class="listInfo">
                        <div class="comm-W">
                            <h3><i></i>方案信息</h3>
                            <ol class="list-ol">
                                <li>
                                    <strong>彩种类型：</strong><span>{{res.lottery_name}}</span>
                                </li>
                                <li v-if="res.bet_type==2">
                                    <strong>发<em></em>起<em></em>人：</strong><span>{{res.initiate_nickname}}</span>
                                    <router-link class="btn" :to="{path:'/unDetails',query:{id:res.bet_type_refer}}">发单详情</router-link>
                                </li>
                                <li>
                                    <strong v-if="res.bet_type == 5">自购金额：</strong>
                                    <strong v-else>订单金额：</strong>
                                    <span class="rd">{{res.coin}}元</span>
                                </li>
                                <li v-if="res.bet_type == 5">
                                    <strong>起跟金额：</strong>
                                    <span class="rd">{{res.minimum_coin}}</span>
                                </li>
                                <li v-if="res.bet_type == 5">
                                    <strong>跟单信息：</strong>
                                    <span class="rd">共{{res.initiate_coins}}元</span>
                                    <span class="btn" @touchstart="goList">跟单列表</span>
                                </li>
                                <li v-if="res.bet_type == 2 || res.bet_type == 5">
                                    <strong>佣&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</strong><span class="rd">{{res.commission}}</span>
                                </li>
                                <li>
                                    <strong>订单状态：</strong><span class="rd">{{orderStatus[res.status]}}</span>
                                </li>
                                <li>
                                    <strong>奖&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金：</strong><span class="rd">{{res.bonus}}元</span>
                                </li>
                                <li>
                                    <strong>投注信息：</strong>
                                    <span v-if="res.bet_type!=2">{{res.bet}}</span>
                                    <span v-if="res.bet_type==2 && res.public==0">{{res.bet_method}}</span>
                                    <span v-if="res.bet_type==2 && res.public==1">{{res.bet}}</span>
                                    <span v-if="res.bet_type==2 && res.public==2 && (res.status==1||res.status==2||res.status==3)">{{res.bet}}</span>
                                    <span v-if="res.bet_type==2 && res.public==2 && (res.status==0||res.status==9)">{{res.bet_method}}</span>
                                </li>
                                <li>
                                    <strong>下单时间：</strong><span>{{res.created_at}}</span>
                                </li>
                                <li v-if="res.bet_type == 5">
                                    <strong>截止时间：</strong><span>{{res.freezed_at}}</span>
                                </li>
                                <li>
                                    <strong>订单编号：</strong><a data-clipboard-action="copy" class="icon-copy">{{res.order_id}}</a>
                                </li>
                                <li v-if="res.bet_type == 5">
                                    <strong>方案宣言：</strong><span>{{res.announce}}</span>
                                </li>
                                <li v-if="res.bet_type==2 || res.bet_type == 5">
                                    <strong>保密等级：</strong>
                                    <span v-if="res.public==0">保密</span>
                                    <span v-if="res.public==1">公开</span>
                                    <span v-if="res.public==2">开奖后公开</span>
                                </li>
                            </ol>
                        </div>
                        <!--投注详情-->
                        <div class="comm-W">
                            <h3><i></i>投注详情</h3>
                            <div v-if="res.bet_type != 2">
                                <div class="betDetails">
                                    <div class="details-box">
                                        <span>
                                            <em>彩种类型</em><em>期号</em><em>投注内容</em><em>彩果</em>
                                        </span>
                                        <span>
                                            <em>{{res.lottery_name}}</em><em>第{{res.qihao}}期</em>
                                            <em>{{res.bet}}</em>
                                            <em class="red">{{orderStatus[res.status]}}</em>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!--跟单详情--开奖后公开-->
                            <div v-if="res.bet_type == 2 && res.public == 2 && (res.status == 1 || res.status == 2 || res.status == 3)">
                                <div class="betDetails">
                                    <div class="details-box">
                                        <span>
                                            <em>彩种类型</em><em>期号</em><em>投注内容</em><em>彩果</em>
                                        </span>
                                        <span>
                                            <em>{{res.lottery_name}}</em><em>第{{res.qihao}}期</em>
                                            <em>{{res.bet}}</em>
                                            <em class="red">{{orderStatus[res.status]}}</em>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!--跟单详情---公开-->
                            <div v-if="res.bet_type == 2 && res.public == 1">
                                <div class="betDetails">
                                    <div class="details-box">
                                        <span>
                                            <em>彩种类型</em><em>期号</em><em>投注内容</em><em>彩果</em>
                                        </span>
                                        <span>
                                            <em>{{res.lottery_name}}</em><em>第{{res.qihao}}期</em>
                                            <em>{{res.bet}}</em>
                                            <em class="red">{{orderStatus[res.status]}}</em>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <!--跟单详情---保密-->
                            <p class="tips" v-if="res.bet_type == 2 && res.public == 0">
                                <span>投注信息已保密</span>
                            </p>
                            <!--未开奖跟单详情-->
                            <p class="tips" v-if="res.bet_type == 2 && res.status == 0 && res.public == 2">
                                <span>开奖后可查看投注信息</span>
                            </p>
                        </div>
                        <h1 class="wxts">温馨提示：中奖后奖金自动打入您的账户</h1>
                    </section>
                </div>
            </scroller>
        </div>
        <!--开奖投注-->
        <button v-if="isLottery" @click="$router.push({path: routerName[res.lottery_name], query: {id: res.type}})" class="betting">{{res.lottery_name}}投注</button>
    </section>
</template>

<script>
    import {formatDate} from '@/assets/js/util'
    export default {
        name: "orderDetails",
        components: {
            TrayHeader () {
                return {
                    component: import('../public/rn-header')
                }
            }
        },
        data () {
            return {
                title: '订单详情',
                isLottery: true,
                res:'',
                orderStatus:{
                    '0':'未开奖',
                    '1':'中奖',
                    '2':'未中奖',
                    '3':'平局',
                    '9':'撤单',
                },
                routerName:{
                    '重庆时时彩':'/ssc_cq',
                    '分分彩':'/ssc_fenfen',
                    '三分彩':'/ssc_sanfen',
                    '北京PK10':'/pk10_bj',
                    '极速赛车':'/pk10_jisu',
                    '分分PK10':'/pk10_fenfen',
                    '幸运飞艇':'/xyft',
                    '幸运28':'/28_lucky',
                    '加拿大28':'/28_canada',
                    '欢乐骰宝':'/shaibao',
                    '百人牛牛':'/niuniu',
                    '香港六合彩':'/6_hk',
                    '极速六合彩':'/6_jisu'
                }
            }
        },
        created(){
            var that = this
            this.getTransView();
        },
        mounted () {
            this.$nextTick(() => setTimeout(() => {
                this.$refs.scroller.reset()
            }, 100))
        },
        methods:{
            //获取订单详情
            getTransView(){
                var that = this
                this.$get('transView',{bet_id:this.$route.query.id}).then(res=>{
                    if(res.code==0) {
                        this.res = res.data, this.initiate_id = res.data.id
                        let time = new Date(res.data.created_at * 1000)
                        let times = new Date(res.data.freezed_at * 1000)
                        this.res.created_at = formatDate(time, 'yyyy-MM-dd hh:mm:ss')
                        this.res.freezed_at = formatDate(times, 'yyyy-MM-dd hh:mm:ss')
                        console.log();
                        var clipboard = new ClipboardJS('.icon-copy',{
                            text:function(){
                                return that.res.order_id
                            }
                        });
                        clipboard.on('success',()=>{
                            this.$vux.confirm.show({
                                title:'温馨提示',
                                content:'复制成功',
                            })
                        })
                        clipboard.on('error',()=>{
                            this.$vux.confirm.show({
                                title:'温馨提示',
                                content:'复制成功',
                            })
                        })
                    }
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
            }
        }
    }
</script>

<style scoped lang="scss">
    .orderDetails {
        height: 100%; background: #f3f3f3; padding-bottom: 98px;
        .scroX {
            height: calc(100% - 88px);
        }
        .comm-W { background: white; }
        .listInfo {
            margin-bottom: 20px; color: #333;
            .wxts{
                font-size: 20px;
                color: #999999;
                margin-top:15px;
                margin-left:19px;
                padding-bottom:27px;
            }
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
                    .rd { color: $theme-color; }
                    strong, span {
                        float: left; transform: translateX(-15px); -webkit-animation: wobble .3s ease-in-out .1s forwards; opacity: 0; text-align: left;
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
                    strong em{
                        display: inline-block;
                        width:12.5px;
                    }
                    a{
                        color: #666!important; font-size: 26px;
                    }
                    span.btn,a.btn {
                        float: right; width: 142px; height: 50px; margin-top: 15px; line-height: 50px; text-align: center; background: #d9342f; border-radius: 6px;color: #fff!important;
                    }
                }
            }
            .betDetails {
                padding: 20px; border-top: 1px solid #d2d2d2;
                .details-box {
                    border: 1px solid #d2d2d2;
                    span:first-child{
                        background: #F3F3F3;
                    }
                    span {
                        display: flex; width: 100%; height: 80px; line-height: 80px; color: #333; font-size: 28px;
                        em {
                            flex: 1; text-align: center;
                        }
                        em:nth-child(2){
                            flex: 1.2
                        }
                        em:nth-child(3){
                            flex: 1.2;
                            overflow: hidden;
                            text-overflow:ellipsis;
                            white-space: nowrap;
                        }
                        em:last-child{
                            flex: 0.6
                        }
                    }
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
    }
</style>
