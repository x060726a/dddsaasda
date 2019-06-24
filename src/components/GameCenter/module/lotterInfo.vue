<template>
    <section class="lotteryInfo">
        <div class="lotter_T clearfix">
            <div class="periods f">
                <p>第<strong class="rd">{{lotteryObj.qihao}}</strong>期截止</p>
                <CountDowm :stylename="'detailTime'" @reStart="reStart" @isCloseGame="isCloseGame" :lotteryObj="lotteryObj"/>
            </div>
            <div class="balance f">
                <p>余额</p>
                <strong class="rd">{{coin}}元</strong>
            </div>
        </div>
        <!--取消投注-->
        <div v-transfer-dom>
            <x-dialog v-model="$store.state.isShowBetListDalog" :hide-on-blur="true" :dialog-style="{'max-width': '80%', width: '100%',background:'none','z-index':4999}">
                <div class="cedan">
                    <div class="title" @touchstart.prevent="cancelBet('all')">取消本期所有投注<span @touchstart.prevent="closeDilog"><x-icon type="ios-close-empty" size="40"></x-icon></span></div>
                    <div class="cedan-content" ref="Scroll" v-if="betList.length>4">
                        <div class="xs-container">
                            <div class="xs-content">
                                <div class="cs-dalog-item" :class="{'cs-dalog-active': idx % 2 != 0}" v-for="(ele,idx) in betList">
                                    <span @touchstart.prevent="cancelBet(ele.id)"></span>
                                    <span>{{idx+1}}.{{ele.group_name}} {{ele.bet}}</span>
                                    <span>{{ele.coin}}元</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-else class="cs-dalog-item" :class="{'cs-dalog-active': idx % 2 != 0}" v-for="(ele,idx) in betList">
                        <span @touchstart.prevent="cancelBet(ele.id)"></span>
                        <span>{{idx+1}}.{{ele.group_name}} {{ele.bet}}</span>
                        <span>{{ele.coin}}元</span>
                    </div>
                </div>
            </x-dialog>
        </div>
    </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { TransferDomDirective as TransferDom } from 'vux'
import { XDialog } from 'vux'
const countdown = import('@/components/public/t_CountDown')
export default {
    name: "lotterInfo",
    data(){
        return{
            isShowDalog:false,
            isOpening:false,
            timer:'',
            Countdown:{
                sy_h:0,
                sy_m:0,
                sy_s:0
            },
            betOrderItem:[]
        }
    },
    watch:{
        '$store.state.isShowBetListDalog'(val,oval){
            if(val&&this.$store.state.betList.length>4){
                this.$nextTick(()=>{
                    this.xscroll = new XScroll({
                        renderTo:this.$refs.Scroll,
                        lockX:true,
                        lockY:false,
                        scrollbarY:false,
                        scrollbarX:false,
                    });
                    this.xscroll.render();
                })
            }
        },
        '$store.state.betOrderNum'(val,oval){
            //this.getBetOrder();
        },
        title(val,oval){
            console.log(val);
        },
        deep:true
    },
    props: {
        title:'',
        coin: '', // 用户余额
        lotteryObj: ''
    },
    computed:{
        ...mapGetters(['betList'])
    },
    mounted(){
        var that = this
        if(this.$store.state.isShowBetListDalog&&this.$store.state.betList.length>4){
            this.$nextTick(()=>{
                that.xscroll = new XScroll({
                    renderTo:that.$refs.Scroll,
                    lockX:true,
                    lockY:false,
                    scrollbarY:false,
                    scrollbarX:false,
                });
            })
        }
    },
    // updated(){
    //     console.log(this.$store.state.isShowBetListDalog,this.$store.state.betList.length>4);
    // },
    created(){
        //this.getBetOrder();
    },
    methods:{
        closeDilog(){
            event.stopPropagation();
            this.$store.commit('isShowBetListDalog',false)
        },
        // 封盘之后清除本期下注
        isCloseGame(value){
            if(value){
                this.$store.commit('isShowBetListDalog',false);
                this.$store.commit('setBetList',[]), localStorage.removeItem('betList')
            }
            this.$store.commit('isCloseGame',value)
        },
        reStart(){
            this.$emit('childValue','准备获取下一期')
        },
        //获取投注订单
        getBetOrder(){
            var that = this,y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate()
            that.$get('trans',{
                offset:0,
                type:0,
                lottery_id:that.$route.query.id,
                start_date:y+'-'+m+'-'+d,
                end_date:y+'-'+m+'-'+d,
            }).then(res=>{
                if(res.code==0){
                    res.data.list.forEach(ele => {
                        if(ele.qihao*1 == that.lotteryObj.qihao*1){
                            that.betOrderItem.push(ele)
                        }
                    });
                }
            })
        },
        //撤单
        cancelBet(id){
            var that = this,str
            if(id=='all'){
                var arr = []
                this.$store.state.betList.forEach(ele=>{
                    arr.push(ele.id)
                })
                str = arr.join(',')
            }else{
                str = id
            }
            this.$vux.confirm.show({
                title:'温馨提示',
                content:id=='all'?'确认取消所有投注？':'确认取消本期投注？',
                onConfirm:()=>{
                    that.$post('cancelBet',{
                        bet_ids:str,
                        game_id:that.$route.query.id,
                        qihao:that.lotteryObj.qihao
                    }).then(res=>{
                        if(res.code==0){
                            this.$emit('submit', res.data.coin)
                            if(id=='all'){
                                that.$store.commit('setBetList',[])
                            }else{
                                that.$store.commit('delBetList',str)
                                if(this.$refs.Scroll){
                                    this.xscroll.resetSize();
                                }
                            }
                        }
                    })
                }
            })
        }
    },
    components:{
        XDialog,
        CountDowm(){
            return{
                component:countdown
            }
        }
    }
}
</script>

<style scoped lang="scss">
.lotteryInfo {
    position: relative;
    .lotter_T {
        display: flex; color: #000; font-size: 26px; border-bottom: 1px solid #d2d2d2;
        .f {
            flex: 1; padding: 20px 0;
            p {
                height: 26px; line-height: 26px; text-align: center;
            }
            .rd { color: $theme-color; }
        }
        .periods {
            border-right: 1px solid #d2d2d2;
            .fb{
                margin-top:12px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                color:$theme-color;
            }
            .time {
                margin-top: 12px; text-align: center;
                height: 40px;
                span {
                    display: inline-block; width: 40px; height: 40px; color: white; font-size: 24px; text-align: center; line-height: 40px; border-radius: 6px; background: #424242;
                }
                i {
                    margin: 0 8px;
                }
            }
        }
        .balance {
            strong {
                display: block; margin-top: 20px; text-align: center; line-height: 26px;
            }
        }
    }
    .lotterNmu {
        height: 70px; padding: 0 20px; color: #000; font-size: 22px; line-height: 70px;
        .f { float: left; }
        .issue {
            margin-right: 16px;
            i { color: #3f8feb; }
        }
        .more {
            float: right; width: 34px; height: 19px; margin-top: 25px;  background: url('~@/assets/image/system/icon-unfold@2x.png') center center no-repeat;
            background-size: cover;
        }
        .balls {
            height: 70px;
            .sum {
                float: left; line-height: 70px; margin-left: 51px;
            }
        }
        p.cqssc {
            span {
                float: left; width: 40px; height: 40px; margin: 15px 12px 0 0; color: white; text-align: center; line-height: 40px; background: $theme-color; border-radius: 50%;
            }
        }
    }
}
.cedan{
    border-radius: 6px;
    overflow: hidden;
    .cedan-content{
        height: 320px;
        background: #fff;
        .xs-container{
            height: 100%;
        }
    }
    .title{
        height: 80px;
        line-height: 80px;
        background: $theme-color;
        font-size: 30px;
        color:#fff;
        position: relative;
        >span{
            position: absolute;
            width:80px;
            height: 80px;
            display: block;
            top: 0;
            right: 0;
            >svg{
                fill: #fff;
            }
        }
    }
    .cs-dalog-item{
        height: 80px;
        line-height: 80px;
        background: #fff;
        padding: 0 50px;
        >span{
            float: left;
            font-size: 26px;
            color:#333
        }
        >span:first-child{
            width:35px; height: 35px; margin-top: 23px;
            background:url('~@/assets/image/system/icon-delete.png') no-repeat;
            background-size: 100%;
        }
        >span:nth-child(2){
            width: calc(100% - 220px);
            text-align: left;
            padding-left:20px;
        }
        >span:last-child {
            float: right;
        }
    }
    .cs-dalog-active {
        background: #fbf6e9;
    }
}
</style>
