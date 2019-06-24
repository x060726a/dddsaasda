<template>
<div class="main">
    <TrayHeader :title="title"/>
    <div class="content">
        <div class="betRecord-tab"  ref="scroll">
            <div class="xs-container">
                <div class="xs-content">
                    <div class="tab">
                        <span @click="onItemClick(0)" :class="{active:active==0}">全部</span>
                        <span @click="onItemClick(1)" :class="{active:active==1}">充值</span>
                        <span @click="onItemClick(2)" :class="{active:active==2}">提现</span>
                        <span @click="onItemClick(3)" :class="{active:active==3}">投注</span>
                        <span @click="onItemClick(4)" :class="{active:active==4}">返水</span>
                        <span @click="onItemClick(5)" :class="{active:active==5}">返利</span>
                        <div :style="'left:'+active*21.333+'vw'"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="result-tab">
            <div class="tools-bar">
                <span></span>
                <span>时间:</span>
                <span @click="popupVisible1=true" style="color:#3F8FEB">{{s_dateTime1[0]+s_dateTime1[1]+s_dateTime1[2]}}</span>
                <span>至</span>
                <span @click="popupVisible2=true" style="color:#3F8FEB">{{s_dateTime2[0]+s_dateTime2[1]+s_dateTime2[2]}}</span>
            </div>
            <div class="list-group">
                <scroller
                    height="100%"
                    lock-x
                    :scrollbar-y='false'
                    :use-pulldown='true'
                    :use-pullup='true'
                    :pulldown-config="$root.pullDownObj"
                    :pullup-config="$root.pullUpObj"
                    @on-pulldown-loading='refresh'
                    @on-pullup-loading='infinite'
                    ref="my_scroller">
                    <div class="my-scroller" :class="{'mohu':isSendingHttp}">
                        <div  v-for="ele in res">
                            <div class="time-str">{{ele.name}}</div>
                            <div class="item clearfix" v-for="(ele1,key1,index1) in ele.list" @click="$router.push({path:'/account',query:{id:ele1.id}})" :class="{last:key1==ele.list.length-1}">
                                <img :src="ele1.icon"/>
                                <div class="game">
                                    <div class="game-con">
                                        <p>{{ele1.title}}</p>
                                        <p>金额<em>：</em>{{ele1.coin}}</p>
                                        <p>{{$root.ConversionTimeYR(ele1.created_at)+' '+$root.ConversionTimeHour(ele1.created_at)}}</p>
                                    </div>
                                    <!-- 1-充值 2-提现 3-投注 4-返水 5-返利 -->
                                    <!-- 注单状态status 0:未开奖 1:中奖了 2:未中奖 3:和局 9:撤单  -->
                                    <strong class="r rd" v-if="ele1.type==1">+{{ele1.result_coin}}</strong>
                                    <strong class="r bl" v-if="ele1.type==2">-{{ele1.result_coin}}</strong>
                                    <strong class="r" :class="{rd:ele1.status==1||ele1.status==3,bl:ele1.status==0||ele1.status==2||ele1.status==9}" v-if="ele1.type==3">
                                        <em v-if="ele1.status==0||ele1.status==2||ele1.status==9">-{{ele1.result_coin}}</em>
                                        <em v-if="ele1.status==1||ele1.status==3">+{{ele1.result_coin}}</em>
                                    </strong>
                                    <strong class="r rd" v-if="ele1.type==4">+{{ele1.result_coin}}</strong>
                                    <strong class="r rd" v-if="ele1.type==5">+{{ele1.result_coin}}</strong>
                                    <span class="zt" v-if="ele1.type!=3">{{ele1.content}}</span>
                                    <span class="zt" v-if="ele1.type==3&&ele1.status==0">未开奖</span>
                                    <span class="zt" v-if="ele1.type==3&&ele1.status==1">中奖了</span>
                                    <span class="zt" v-if="ele1.type==3&&ele1.status==2">未中奖</span>
                                    <span class="zt" v-if="ele1.type==3&&ele1.status==3">和局</span>
                                    <span class="zt" v-if="ele1.type==3&&ele1.status==9">撤单</span>
                                </div>
                            </div>
                        </div>
                        <div v-if="isNoMoreData" :class="{'mohu':isSendingHttp}" class="no-more-data">没有更多数据了</div>
                        <div v-if="isNoneData" class="noData margin0">
                            <i class="nodataIcon"></i>
                            <p>暂无数据</p>
                        </div>
                    </div>
                </scroller>
                <div class='my-spinner' v-show="isSendingHttp"><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
            </div>
        </div>
        <div class="total">金额<em>：</em><countup :start-val="0" :end-val="total*1" :duration="1" :decimals="2"/>元</div>
        <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel">
            <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="confirm1">确定</span></div>
            <picker :data='data1' v-model='data1Value' ref="my_picker"></picker>
        </popup>
        <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel">
            <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="confirm2">确定</span></div>
            <picker :data='data1' v-model='data2Value' ref="my_picker"></picker>
        </popup>
    </div>
</div>
</template>
<script>
import { Countup } from 'vux'
export default {
    components:{
        Countup,
        TrayHeader () {
            return {
                component: import('../../public/rn-header')
            }
        }
    },
    data(){
        return{
            title: '交易记录',
            xscroll:'',
            active:0,
            isSendingHttp:false,//是否正在发送HTTP请求
            isNoMoreData:false,
            isNoneData:false,
            res:[],
            total:0,
            popupVisible1:false,
            popupVisible2:false,
            s_dateTime1:[],
            s_dateTime2:[],
            data1Value:[''],
            data2Value:[''],
            data1:[
                ['2019年','2018年','2017年','2016年'],
                ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']
            ],
        }
    },
    watch:{
        'active'(val,oval){
            if(this.isSendingHttp) return
            this.isSendingHttp = true;
            this.isNoneData = false
            this.total = 0
            this.getLog(false);
        }
    },
    mounted(){
        var that = this
        this.$nextTick(()=>{
            if(that.$refs.scroll){
                that.xscroll = new XScroll({
                    renderTo:that.$refs.scroll,
                    lockX:false,
                    lockY:true,
                    scrollbarY:false,
                    scrollbarX:false,
                    preventDefault:false
                });
                that.xscroll.render();
            }
        })
    },
    created(){
        this.timeInt();
        this.getLog(false);
    },
    methods:{
        onItemClick(index){
            this.active = index;
            if(index==0||index==1||index==2){
                this.xscroll.scrollLeft(0,500)
            }
            this.$refs.my_scroller.reset({top:0})
            this.$refs.my_scroller.enablePullup()
            this.isNoMoreData = false
            if(event.target.offsetLeft>window.outerWidth/2){
                this.xscroll.scrollLeft(event.target.offsetLeft/2-15,500)
            }
        },
        refresh(){
            var that = this
            this.isNoneData = false
            this.getLog(false);
        },
        infinite(){
            var that = this;
            this.getLog(true);
        },
        //确认按钮
        confirm1(){
            var that = this,stepArr;
            this.popupVisible1 = false
            stepArr = JSON.stringify(this.data1Value)
            this.s_dateTime1 = JSON.parse(stepArr)
            this.isSendingHttp = true;
            this.refresh();
        },
        //确认按钮
        confirm2(){
            var that = this,stepArr;
            this.popupVisible2 = false
            stepArr = JSON.stringify(this.data2Value)
            this.s_dateTime2 = JSON.parse(stepArr)
            this.isSendingHttp = true;
            this.refresh();
        },
        timeInt(){
            let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastDObj = new Date( Date.parse(new Date()) );
            this.s_dateTime1.push(lastDObj.getFullYear()+'年')
            this.s_dateTime1.push((lastDObj.getMonth()+1)+'月')
            this.s_dateTime1.push(lastDObj.getDate()+'日')

            this.s_dateTime2.push(y+'年')
            this.s_dateTime2.push(m+'月')
            this.s_dateTime2.push(d+'日')
        },
        timeStart(){
            var len1 = this.s_dateTime1[0].indexOf('年'),len2 = this.s_dateTime1[1].indexOf('月'),len3 = this.s_dateTime1[2].indexOf('日');
            var str = this.s_dateTime1[0]+','+this.s_dateTime1[1]+','+this.s_dateTime1[2];
            this.data1Value = str.split(',');
            return this.s_dateTime1[0].substring(0,len1,1)+'-'+this.$root.buling(this.s_dateTime1[1].substring(0,len2,1))+'-'+this.$root.buling(this.s_dateTime1[2].substring(0,len3,1))
        },
        timeEnd(){
            var len1 = this.s_dateTime2[0].indexOf('年'),len2 = this.s_dateTime2[1].indexOf('月'),len3 = this.s_dateTime2[2].indexOf('日');
            var str = this.s_dateTime2[0]+','+this.s_dateTime2[1]+','+this.s_dateTime2[2];
            this.data2Value = str.split(',');
            return this.s_dateTime2[0].substring(0,len1,1)+'-'+this.$root.buling(this.s_dateTime2[1].substring(0,len2,1))+'-'+this.$root.buling(this.s_dateTime2[2].substring(0,len3,1))
        },
        getLog(bool){
            var that = this;
            that.$get('transRecord',{
                offset:bool?that.offset:0,
                type:that.active,
                start_date:that.timeStart(),
                end_date:that.timeEnd(),
            }).then(res=>{
                if(res.code == 0){
                    if(bool){
                        that.total = that.total*1 + res.data.total*1||0
                        if(res.data.list.length!=0&&that.res[that.res.length-1].name===res.data.list[0].name){
                            that.res[that.res.length-1].list = that.res[that.res.length-1].list.concat(res.data.list[0].list)
                        }else{
                            that.res = that.res.concat(res.data.list)
                        }
                        if(res.data.list.length==0){
                            that.isNoMoreData = true
                            that.$refs.my_scroller.disablePullup()
                        }
                        that.$refs.my_scroller&&that.$refs.my_scroller.donePullup()
                    }else{
                        that.res = res.data.list
                        that.total = res.data.total*1
                        if(res.data.offset==0){
                            that.isNoneData = true
                        }
                        if(res.data.offset<20){
                            that.$refs.my_scroller.disablePullup()
                        }else{
                            that.$refs.my_scroller.enablePullup()
                        }
                        that.$nextTick(()=>{
                            that.$refs.my_scroller&&that.$refs.my_scroller.donePulldown()
                            that.$refs.my_scroller&&that.$refs.my_scroller.reset({top:0})
                        })
                    }
                    that.offset = res.data.offset
                }
                that.isSendingHttp = false;
            })
        }
    },
}
</script>
<style lang="scss" scoped>
.no-more-data{
    margin-top:-15px;
}
.mohu{
    filter: blur(5px);
}
.total{
    height: 88px;
    line-height: 88px;
    font-size: 32px;
    color:#fff;
    text-align: center;
    background: $theme-color;
    >em{
        display: inline-block;
        width:25px;
        text-align: center;
    }
}
.tools-bar{
    padding:33px 20px 27px 20px;
    height: 100px;
    line-height: 41px;
    overflow: hidden;
    background: $bg-color;
    span{
        display: block;
        float: left;
        font-size: 24px;
        color:#333;
        margin-right:10px;
        position: relative;
    }
    span:nth-child(1){
        width:36px;
        height: 33px;
        background: url('~@/assets/image/system/shijianshaixuanqi@2x.png') center center no-repeat;
        background-size: 100% 100%;
    }
    span:nth-child(3),span:nth-child(5){
        color:#0064be;
    }
}
.margin0{
    position: absolute;
    top:50%;
    left: 50%;
    margin-left:-190px;
    margin-top:-131px;
    .nodataIcon{
        margin:0;
    }
}
.main{
    position: relative; height: 100%;
    .content{
        height: calc(100% - 88px);
        .betRecord-tab{
            height: 100px;
            background: #fff;
            .xs-content{
                width: 991px;
            }
            .tab{
                width: 960px;
                height: 100px;
                position: relative;
                margin-left:31px;
                >div{
                    position: absolute;
                    bottom:0;
                    height: 4px;
                    width: 160px;
                    background: $theme-color;
                    transition: left .3s ease;
                }
                >span{
                    height: 100px;
                    line-height: 100px;
                    text-align: center;
                    width: 160px;
                    display: block;
                    float: left;
                    font-size: 30px;
                    color: #999999;
                }
                >span.active{
                    color:$theme-color;
                }
            }
        }
        .my-tab{
            padding-top:100px;
            .vux-tab-container{
                height: 100px;
            }
            .vux-tab-item{
                height: 100px;
                line-height: 100px;
                font-size: 30px;
            }
        }
        .result-tab{
            height: calc(100% - 188px);
            overflow-y: scroll;
            -webkit-overflow-scrolling: touch;
            .list-group{
                height: calc(100% - 100px);
                background: #f7f7f7;
                position: relative;
                .my-spinner{
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width:100px;
                    height: 150px;
                    margin-left:-50px;
                    margin-top:-75px;
                    background: none;
                }
                .my-scroller{
                    min-height: 958px;
                }
                .time-str{
                    height: 50px;
                    line-height: 40px;
                    background: #f7f7f7;
                    font-size: 22px;
                    color: #999999;
                    padding-left: 20px;
                    padding-bottom:15px;
                }
                .item:last-child{
                    margin-bottom:23px;
                    .game{
                        border-bottom:none;
                    }
                }
                .item{
                    padding-left: 2.667vw;
                    display: block;
                    background: #fff;
                    .time-str{
                        height: 69px;
                        line-height: 79px;
                        background: #f7f7f7;
                        font-size: 22px;
                        color: #999999;
                        padding-left: 20px;
                    }
                    >div {
                        padding-left: 20px;
                        display: block;
                    }
                    >div.last{
                        .game{
                            border-bottom: none;
                        }
                    }
                    img {
                        float: left; width: 80px; height: 80px; margin-top: 35px; margin-left: 20px;
                    }
                    .game {
                        float: right; width: 82%; padding: 15px 0 16px 0; color: #333; font-size: 24px; border-bottom: 1px solid #d2d2d2; position: relative;
                        .game-con {
                            float: left;
                            p {
                                line-height: 33px;
                                em {
                                    width:18px;
                                    text-align: center;
                                    font-size: 22px;
                                    height: 28px;
                                    line-height: 28px;
                                    text-align: center;
                                    display: inline-block;
                                    vertical-align: middle;
                                    margin-top:-5px;
                                }
                            }
                            P:nth-child(3){
                                color: #999;
                                line-height: 33px;
                                height: 33px;
                                margin-top:6px;
                            }
                            p:nth-child(2){
                                font-size: 24px;
                                color: #333333;
                            }
                            p:first-child {
                                font-size: 28px; line-height: 40px; margin-bottom: 5px; margin-top: 2px;
                            }
                        }
                        span.zt{
                            position: absolute;
                            top: 73px;
                            right:27px;
                            font-size: 24px;
                            color: #999999;
                        }
                        strong.r {
                            position: absolute;
                            top: 31px;
                            right:27px;
                            font-size: 34px;
                            line-height: 40px;
                            font-weight: 700;
                            em {
                                display: inline-block;
                                font-weight: 700;
                                // float: left; line-height: 30px;
                            }
                        }
                        strong.bl {
                            color: #3F8FEB;
                        }
                        strong.rd {
                            color: #D44743;
                        }
                    }
                }
                .item:last-child{
                    border-bottom:none;
                }
            }
        }
    }
}
</style>
