<template>
    <section class="betRecord">
        <TrayHeader :title="title" />
        <div class="betRecord-tab"  ref="scroll">
            <div class="xs-container">
                <div class="xs-content">
                    <div class="tab">
                        <span @click="onItemClick(0)" :class="{active:active==0}">全部</span>
                        <span @click="onItemClick(1)" :class="{active:active==1}">中奖</span>
                        <span @click="onItemClick(2)" :class="{active:active==2}">未中奖</span>
                        <span @click="onItemClick(3)" :class="{active:active==3}">跟单</span>
                        <span @click="onItemClick(4)" :class="{active:active==4}">追号</span>
                        <div :style="'left:'+active*21.333+'vw'"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="tools-bar">
            <span></span>
            <span>时间:</span>
            <span @click="popupVisible1=true">{{s_dateTime1[0]+s_dateTime1[1]+s_dateTime1[2]}}</span>
            <span>至</span>
            <span @click="popupVisible2=true">{{s_dateTime2[0]+s_dateTime2[1]+s_dateTime2[2]}}</span>
            <span @click="toggleTjsx" style="color:#3f8feb">{{s_dateTime3[0]}}</span>
        </div>
        <div class="content">
            <scroller
                height="100%"
                lock-x
                :scrollbar-y='false'
                :use-pulldown='true'
                :use-pullup="true"
                :pulldown-config="$root.pullDownObj"
                :pullup-config="$root.pullUpObj"
                @on-pulldown-loading='refresh'
                @on-pullup-loading='infinite'
                ref="my_scroller">
                <div class="my-scroll">
                    <section class="list-con comm-W" :class="{'mohu':isSendingHttp}" v-for="(ele,key,index) in betDatas">
                        <div class="time-str">{{ele.name}}</div>
                        <router-link v-for="(ele1,key1,index1) in ele.list" :key="key1" :to="{path:'/orderDetails',query:{id:ele1.id,betType:ele1.bet_type}}" class="clearfix" :class="{last:key1==ele.list.length-1}">
                            <img :src="ele1.icon"/>
                            <div class="game">
                                <div class="game-con">
                                    <p>{{ele1.lottery_name}}</p>
                                    <p>投注金额<em>：</em>{{ele1.coin}}</p>
                                    <p>投注方式<em>：</em>{{betType[ele1.bet_type*1-1]}}</p>
                                </div>
                                <!-- 注单状态 0:未开奖 1:中奖了 2:未中奖 3:和局 9:撤单  -->
                                <strong class="r rd" v-if="ele1.status==1">+{{ele1.result_coin}}</strong>
                                <strong class="r bl" v-if="ele1.status==2">-{{ele1.result_coin}}</strong>
                                <strong class="r rd" v-if="ele1.status==3">+0.00</strong>
                                <strong class="r bl" v-if="ele1.status==9">-0.00</strong>
                                <strong class="r bl" v-if="ele1.status==0">-{{ele1.result_coin}}</strong>
                                <span class="zt" v-if="ele1.status==1">中奖了</span>
                                <span class="zt" v-if="ele1.status==2">未中奖</span>
                                <span class="zt" v-if="ele1.status==3">和局</span>
                                <span class="zt" v-if="ele1.status==9">撤单</span>
                                <span class="zt" v-if="ele1.status==0">未开奖</span>
                            </div>
                        </router-link>
                    </section>
                    <div v-if="isNoMoreData" :class="{'mohu':isSendingHttp}" class="no-more-data">没有更多数据了</div>
                    <div v-if="isNoneData" class="noData margin0" :class="{'mohu':isSendingHttp}">
                        <i class="nodataIcon"></i>
                        <p>暂无数据</p>
                    </div>
                </div>
            </scroller>
            <div class='my-spinner' v-show="isSendingHttp"><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
        </div>
        <div class="total">金额<em>：</em><countup :start-val="0" :end-val="total*1" :duration="1" :decimals="2"/>元</div>
        <!--弹窗-->
        <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel">
            <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="confirm1">确定</span></div>
            <picker :data='data1' v-model='data1Value' ref="my_picker"></picker>
        </popup>
        <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel">
            <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="confirm2">确定</span></div>
            <picker :data='data1' v-model='data2Value' ref="my_picker"></picker>
        </popup>
        <popup v-model="popupVisible3" position="bottom" class="bankcard-pancel">
            <div class="popup-head"><span @click="popupVisible3=false">取消</span><span @click="confirm3">确定</span></div>
            <picker :data='data2' :fixed-columns="1" :columns="columns" v-model='data3Value' ref="my_picker"></picker>
        </popup>
        <!--暂无数据-->
    </section>
</template>

<script>
import { Countup } from 'vux'
export default {
    components: {
        Countup,
        TrayHeader () {
            return {
                component: import('../public/rn-header')
            }
        }
    },
    data () {
        return {
            active:0,
            offset:0,
            total:0,
            xscroll:'',
            isSendingHttp:false,//是否正在发送HTTP请求
            isNoMoreData:false,
            isNoneData:false,
            ispullDown:false,
            title: '投注记录',
            popupTime: false,
            yearsValue:[],
            navTtitle: ['全部', '中奖', '未中奖', '跟单', '追号'],
            betType:['普通投注','跟单投注','追号投注','跟投投注','发单投注'],
            betDatas: [],
            lotteryList:[],
            popupVisible1:false,
            popupVisible2:false,
            popupVisible3:false,
            s_dateTime1:[],
            s_dateTime2:[],
            s_dateTime3:[],
            data1Value:[''],
            data2Value:[''],
            data3Value:[''],
            data1:[
                ['2019年','2018年','2017年','2016年'],
                ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                ['1日','2日','3日','4日','5日','6日','7日','8日','9日','10日','11日','12日','13日','14日','15日','16日','17日','18日','19日','20日','21日','22日','23日','24日','25日','26日','27日','28日','29日','30日','31日']
            ],
            data2:[],
            columns:3
        }
    },
    watch:{
        'active'(val,oval){
            if(this.isSendingHttp) return
            this.isSendingHttp = true
            this.isNoneData = false
            this.total = 0
            this.getTrans(false);
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
        if(JSON.stringify(this.$route.query)==='{}'){
            this.s_dateTime3 = ['全部彩种']
        }else{
            this.s_dateTime3[0] = this.$route.query.name
        }
        this.getTrans(false)
    },
    methods:{
        onItemClick(index){
            if(index==0||index==1){
                this.xscroll.scrollLeft(0,500)
            }
            if(index==3||index==4){
                this.xscroll.scrollLeft(50,500)
            }
            this.$refs.my_scroller.reset({top:0})
            this.$refs.my_scroller.enablePullup()
            this.isNoMoreData = false
            this.active = index
        },
        //确认按钮
        confirm1(){
            var that = this,stepArr;
            this.popupVisible1 = false
            stepArr = JSON.stringify(this.data1Value)
            this.s_dateTime1 = JSON.parse(stepArr)
            this.isSendingHttp = true
            this.isNoneData = false
            this.refresh();
        },
        //确认按钮
        confirm2(){
            var that = this,stepArr;
            this.popupVisible2 = false
            stepArr = JSON.stringify(this.data2Value)
            this.s_dateTime2 = JSON.parse(stepArr)
            this.isSendingHttp = true
            this.isNoneData = false
            this.refresh();
        },
        async confirm3(){
            var that = this
            this.popupVisible3 = false
            this.s_dateTime3[0] = this.data3Value[0]
            this.isSendingHttp = true
            this.isNoneData = false
            if(this.data3Value[0]=='香港六合彩'){
                var res = await this.isLhc();
                this.refresh();
            }else{
                var res = await this.timeInt();
                this.refresh();
            }
        },
        //点击条件筛选
        async toggleTjsx(){
            if(this.data2.length==0){
                this.$vux.loading.show({
                    text: '加载中',
                })
                var res = await this.getTransLotteries()
                this.$vux.loading.hide()
                if(res){
                    this.popupVisible3 = true
                }else{
                    this.$vux.toast.text('条件未能初始化','bottom')
                }
                this.$vux.loading.hide()
            }else{
                this.popupVisible3 = !this.popupVisible3
            }
        },
        refresh(){
            this.isNoneData = false
            this.getTrans(false)
        },
        infinite(){
            this.getTrans(true)
        },
        //查询投注记录
        getTrans(bool){
            var that = this
            that.$get('trans',{
                offset:bool?that.offset:0,
                type:that.active,
                start_date:that.timeStart(),
                end_date:that.timeEnd(),
                lottery_id:that.getLotteryId()
            }).then(res=>{
                if(res.code == 0){
                    if(bool){
                        that.total = (res.data.total*1||0) + that.total*1
                        if(res.data.list.length!=0&&that.betDatas[that.betDatas.length-1].name===res.data.list[0].name){
                            that.betDatas[that.betDatas.length-1].list = that.betDatas[that.betDatas.length-1].list.concat(res.data.list[0].list)
                        }else{
                            that.betDatas = that.betDatas.concat(res.data.list)
                        }
                        if(res.data.list.length==0){
                            that.isNoMoreData = true
                            that.$refs.my_scroller.disablePullup()
                        }
                        that.$refs.my_scroller.donePullup()
                    }else{
                        that.total = res.data.total*1
                        that.betDatas = res.data.list
                        if(res.data.offset<20){
                            that.$refs.my_scroller.disablePullup()
                        }else{
                            that.$refs.my_scroller.enablePullup()
                        }
                        if(res.data.list.length==0){
                            that.isNoneData = true
                        }
                        that.$nextTick(()=>{
                            that.$refs.my_scroller&&that.$refs.my_scroller.donePulldown()
                            that.$refs.my_scroller&&that.$refs.my_scroller.reset({top:0})
                        })
                    }
                    that.offset = res.data.offset
                }
                that.isSendingHttp = false
            })
        },
        //获取后台返回的彩种列表
        getTransLotteries(){
            var that = this
            return new Promise(resolve=>{
                that.$get('transLotteries',{}).then(res=>{
                    if(res.code==0){
                        that.lotteryList = res.data
                        that.data2.push('全部彩种')
                        res.data.forEach(ele => {
                            that.data2.push(ele.title)
                        });
                        that.columns = that.data2.length
                        resolve(true)
                    }else{
                        resolve(false)
                    }
                })
            })
        },
        //获取彩种ID
        getLotteryId(){
            var id,that = this;
            if(that.s_dateTime3.length==0||that.s_dateTime3[0]=='全部彩种'){
                return 0
            }else{
                if(that.lotteryList.length==0){
                    return this.$route.query.id
                }else{
                    that.lotteryList.forEach(ele=>{
                        if(that.s_dateTime3[0] == ele.title){
                            id = ele.id
                        }
                    })
                    return id
                }
            }
        },
        timeInt(){
            return new Promise(resolve=>{
                this.s_dateTime1 = [];
                this.s_dateTime2 = [];
                let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastDObj = new Date( Date.parse(new Date()) );
                this.s_dateTime1.push(lastDObj.getFullYear()+'年')
                this.s_dateTime1.push((lastDObj.getMonth()+1)+'月')
                this.s_dateTime1.push(lastDObj.getDate()+'日')

                this.s_dateTime2.push(y+'年')
                this.s_dateTime2.push(m+'月')
                this.s_dateTime2.push(d+'日')

                resolve(true)
            })
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
        isLhc(){
            var that = this
            this.s_dateTime1 = []
            this.s_dateTime2 = []
            return new Promise(resolve=>{
                //六合彩提交时间
                let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastMObj = new Date( Date.parse(new Date()) - 30*86400000 );
                this.s_dateTime1.push(lastMObj.getFullYear()+'年')
                this.s_dateTime1.push((lastMObj.getMonth()+1)+'月')
                this.s_dateTime1.push(lastMObj.getDate()+'日')

                this.s_dateTime2.push(y+'年')
                this.s_dateTime2.push(m+'月')
                this.s_dateTime2.push(d+'日')
                resolve(true);
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.mohu{
    filter: blur(5px);
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
.content{
    height: calc(100% - 376px);
    background: #f7f7f7;
    position: relative;
    .my-scroll{
        min-height: 958px;
        position: relative;
        background: #f7f7f7;
    }
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
        font-weight: normal;
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
        color:#3f8feb;
    }
    span:last-child{
        float: right;
        margin-right:0;
    }
    span:last-child::before{
        content:'';
        display: block;
        position: absolute;
        left: -35px;
        top: 8px;
        width:25px;
        height: 25px;
        background: url('~@/assets/image/system/order1@2x.png') no-repeat;
        background-size: 100% 100%;
    }
}
.no-more-data{
    margin-top:-18px;
}
    .betRecord {
        height: 100%; background: #f3f3f3;
        .comm-W { background: white; }
        .betRecord-tab{
            height: 100px;
            background: #fff;
            .xs-content{
                width: 831px;
            }
            .tab{
                width: 800px;
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
        .nav {
           width: 862px; padding: 0 31px;
            a {
                float: left; width: 140px; height: 100px;  margin-right: 20px; line-height: 100px; color: #999; font-size: 30px; text-align: center;
            }
            a.selected {
                color: $theme-color; border-bottom: 4px solid #d9342f;
            }
            a:last-child {
                margin: 0;
            }
        }
        .time {
            position: relative; padding: 23px 20px 20px 20px;
            .dataTime {
                float: left; color: #333; font-size: 28px; line-height: 40px;
            }
            .icon {
                position: relative; float: left; width: 0; height: 0; margin: 14px 0 0 5px; border-style: solid; border-width: 12px 12px 0 12px;
                border-color: #010101 transparent transparent transparent;
            }
            .icon:before {
                position: absolute; top: -12px; left: -10px; content: ''; border-style: solid; border-width: 10px 10px 0 10px;
                border-color: #f3f3f3 transparent transparent transparent;
            }
        }
        .betList li {
            .list-t {
                color: #999; padding-left: 20px; font-size: 22px; line-height: 64px;
            }
        }
        .list-con {
            // min-height: 958px;
            .time-str{
                height: 50px;
                line-height: 40px;
                background: #f7f7f7;
                font-size: 22px;
                color: #999999;
                padding-left: 20px;
                padding-bottom:15px;
            }
            a {
                padding-left: 20px;
                display: block;
            }
            a.last{
                margin-bottom:23px;
                .game{
                    border-bottom: none;
                }
            }
            img {
                float: left; width: 80px; height: 80px; margin-top: 30px; margin-left:20px;
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
                        // color: #999;
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
                        float: left; line-height: 30px;
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
    }
</style>
