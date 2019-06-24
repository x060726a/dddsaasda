<template>
<div class="main">
    <!--<div class="other-header">-->
        <!--<i class="back" @click="routerGoBack"></i>-->
        <!--<div class="title"><span><em>{{$route.query.name}}</em><i @click="showpanel"  :class="{'cp-icon-up':showpanelTitle==true,'cp-icon-down':showpanelTitle==false}"></i></span></div>-->
    <!--</div>-->
    <header class="headTop">
        <span @touchstart.stop="showpanel()">{{$route.query.name}}<i class="i_more" ref="i_more"></i></span>
        <i class="icon-left" @touchstart.stop="routerGoBack()"></i>
    </header>
    <div class="popup-lottery-mask" v-show="showpanelTitle" @click="showpanel">
        <div class="popup-lottery-panel" ref="panel">
            <div :class="{active:$route.query.name==ele.title}" @click="$router.push({path:'/historyOpenDetail',query:{id:ele.id,name:ele.title,isFromList:true}})" v-for="ele in BonusList">{{ele.title}}</div>
        </div>
    </div>
    <!-- <tab class="my-tab" :line-width="3" active-color="#D9342F" custom-bar-width="70px">
        <tab-item selected @on-item-click="onItemClick">历史开奖</tab-item>
        <tab-item @on-item-click="onItemClick">开奖走势</tab-item>
    </tab> -->
    <div class="zs-tab">
        <span @click="onItemClick(0)" :class="{active:active==0}">历史开奖</span>
        <span @click="onItemClick(1)" :class="{active:active==1}">开奖走势</span>
        <div :class="{next:active==1}"></div>
    </div>
    <div class="tools-bar">
        <span></span>
        <span>时间:</span>
        <span @click="popupVisible1=true">{{s_dateTime1[0]+s_dateTime1[1]+s_dateTime1[2]}}</span>
        <span>至</span>
        <span @click="popupVisible2=true">{{s_dateTime2[0]+s_dateTime2[1]+s_dateTime2[2]}}</span>
    </div>
    <!-- content -->
    <div class="zs-title" :class="lotteryName()" v-if="active==1 && !isNoneData">
        <div>期号</div>
        <div :class="{'lohu':lotteryName()=='ZSPK10'||lotteryName()=='ZSSSC'}">
            <div v-for="(ele,idx,key) in titlebar" @click="ctitleBarActive(idx)" :class="{active:titleBarActive==idx}"><span>{{ele}}</span></div>
        </div>
    </div>
    <div class="content" :class="{zsconent:active==1}">
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
                <div v-for="ele in res" v-if="res.length>0">
                    <components v-if="active==0" :isDetail="true" :res="ele" :is="lotteryName()"/>
                    <components v-if="active==1" :res="ele" :idx="titleBarActive" :is="lotteryName()"/>
                </div>
                 <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
                <div v-if="isNoneData" class="noData margin0">
                    <i class="nodataIcon"></i>
                    <p>暂无数据</p>
                </div>
            </div>
        </scroller>
    </div>
    <!-- content -->

    <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="confirm1">确定</span></div>
        <picker :data='data1' v-model='data1Value' ref="my_picker"></picker>
    </popup>
    <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="confirm2">确定</span></div>
        <picker :data='data1' v-model='data2Value' ref="my_picker"></picker>
    </popup>
</div>
</template>
<script>
import {formatDate} from '@/assets/js/util'
export default {
    data(){
        return{
            today:new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate(),
            showpanelTitle:false,
            BonusList:[],
            res:[],
            offset:0,
            active:0,
            isNoMoreData:false,//上拉加载是否没有更多数据了
            isNoneData:false,//没有数据
            isUsePullUp:false,//是否使用上拉加载
            titlebar:[],
            titleBarActive:0,
            //时间组件
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
        '$route.query.name'(val,oval){
            this.isNoMoreData = false;
            this.isNoneData = false;
            this.titleBarActive = 0;
            this.isLhc();
            var s_Fun = async ()=>{
                var res = await this.isLhc();
                this.$refs.my_scroller.reset({top:0})
                this.showpanel()
                this.getSomeLotteryBonus(false)
                this.getZSLotteryTab()
            }
            s_Fun()
        }
    },
    async created(){
        var res = await this.isLhc();
        this.getSomeLotteryBonus(false)
    },
    methods:{
        //顶部下拉选项
        showpanel(){
            if(this.showpanelTitle){
                this.$refs.panel.className = 'popup-lottery-panel hide'
                this.$refs.i_more.style.cssText = 'transform: rotate(0)'
                setTimeout(()=>{
                    this.showpanelTitle = false
                },500)
            }else{
                this.showpanelTitle = true
                setTimeout(()=>{
                    this.$refs.panel.className = 'popup-lottery-panel show'
                    this.$refs.i_more.style.cssText = 'transform: rotate(180deg)'
                },20)
            }
        },
        //返回
        routerGoBack(){
            if(this.$route.query.isFromList){
                this.$router.push({path:'/historyOpen'})
            }else{
                this.$router.go(-1)
            }
        },
        //tab选项卡
        onItemClick(index){
            this.active = index
            this.$refs.my_scroller.reset({top:0})
            this.getZSLotteryTab()
        },
        //根据彩种更换类名
        ctitleBarActive(index){
            var name = this.lotteryName(this.$route)
            if(name=='ZSPK10'||name=='ZSSSC'||name=='ZSLHC'){
                this.titleBarActive = index
            }
        },
        //设置彩种类名名称
        getZSLotteryTab(){
            var obj = {
                'ZSPK10':['号码','大小','单双','冠军/龙虎'],
                'ZSSSC':['号码','大小','单双','冠军/龙虎'],
                'ZSLHC':['号码','总和','特码'],
                'ZSLUCKY':['号码','大小/单双','色波'],
                'ZSHLTB':['大小','单双','豹子'],
                'ZSBRNN':['胜负','牛牛','龙虎']
            }
            this.titlebar = obj[this.lotteryName(this.$route)]      
        },
        //下拉刷新
        refresh(){
            this.getSomeLotteryBonus(false)
        },
        //上拉加载
        infinite(){
            this.getSomeLotteryBonus(true)
        },
        //获取更多开奖结果
        getSomeLotteryBonus(bool){
            if (new Date(this.timeStart()).getTime() > new Date(this.timeEnd()).getTime()) return this.$vux.loading.hide(), this.$vux.toast.text('起始时间不能大于结束时间', 'middle')
            this.$get('someLotteryBonus',{
                offset:bool?this.offset:0,
                id:this.$route.query.id,
                start_date:this.timeStart(),
                end_date:this.timeEnd()
            }).then(res=>{
                this.$vux.loading.hide();
                if(res.code==0){
                    this.BonusList = res.data.lottery
                    if(res.data.list.length < 20) this.isNoMoreData = true, this.$refs.my_scroller.disablePullup()
                    if(bool){
                        //上拉
                        this.res = this.res.concat(res.data.list)
                        this.$refs.my_scroller.donePullup()
                        // this.$refs.my_scroller.reset({top:0})
                    }else{
                        //下拉
                        this.isNoMoreData = false
                        this.res = res.data.list
                        if(res.data.list.length==0){
                            this.isNoneData = true
                        } else {
                            this.isNoneData = false
                        }
                        this.$nextTick(()=>{
                            this.$refs.my_scroller.enablePullup()
                            this.$refs.my_scroller.reset({top:0})
                            this.$refs.my_scroller.donePulldown()
                        })
                    }
                    this.res.forEach(res => {
                        let time = new Date(res.opened_at * 1000)
                        res.time = formatDate(time, 'MM-dd hh:mm')
                    })
                    this.offset = res.data.offset
                }
            })
        },
        //确认按钮
        confirm1(){
            var stepArr;
            this.$vux.loading.show({text: '加载中'})
            this.popupVisible1 = false
            stepArr = JSON.stringify(this.data1Value)
            this.s_dateTime1 = JSON.parse(stepArr)
            this.getNumber();
            this.refresh();
        },
        //确认按钮
        confirm2(){
            var stepArr;
            this.popupVisible2 = false
            stepArr = JSON.stringify(this.data2Value)
            this.s_dateTime2 = JSON.parse(stepArr)
            this.getNumber();
            this.refresh();
        },
        //每个彩种开奖走势tab选项
        lotteryName(){
            var that = this
            let obj1 = {
                'LSPK10':['北京PK10','极速赛车','分分PK10','幸运飞艇'],
                'LSSSC':['重庆时时彩','分分彩','三分彩'],
                'LSLHC':['香港六合彩','极速六合彩'],
                'LSLUCKY':['幸运28'],
                'LSHLTB':['欢乐骰宝'],
                'LSBRNN':['百人牛牛']
            },obj2 = {
                'ZSPK10':['北京PK10','极速赛车','分分PK10','幸运飞艇'],
                'ZSSSC':['重庆时时彩','分分彩','三分彩'],
                'ZSLHC':['香港六合彩','极速六合彩'],
                'ZSLUCKY':['幸运28'],
                'ZSHLTB':['欢乐骰宝'],
                'ZSBRNN':['百人牛牛']
            },stepObj,typeName;
            if(this.active==0){
                stepObj = obj1
            }else{
                stepObj = obj2
            }
            for(var key in stepObj){
                if(stepObj[key].indexOf(that.$route.query.name)>-1){
                    typeName = key
                }
            }
            return typeName;
        },
        //判断是否是6合彩
        isLhc(){
            var that = this
            this.s_dateTime1 = []
            this.s_dateTime2 = []
            return new Promise(resolve=>{
                if(that.$route.query.name=='香港六合彩'){
                    //六合彩提交时间
                    let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastMObj = new Date( Date.parse(new Date()) - 30*86400000 );
                    this.s_dateTime1.push(lastMObj.getFullYear()+'年')
                    this.s_dateTime1.push((lastMObj.getMonth()+1)+'月')
                    this.s_dateTime1.push(lastMObj.getDate()+'日')

                    this.s_dateTime2.push(y+'年')
                    this.s_dateTime2.push(m+'月')
                    this.s_dateTime2.push(d+'日')
                }else{
                    let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastDObj = new Date( Date.parse(new Date()) - (86400 * 1000) );
                    this.s_dateTime1.push(y+'年')
                    this.s_dateTime1.push(m+'月')
                    this.s_dateTime1.push(d+'日')

                    this.s_dateTime2.push(y+'年')
                    this.s_dateTime2.push(m+'月')
                    this.s_dateTime2.push(d+'日')
                }
                resolve(true);
            })
        },
        //split zh
        getNumber(){
            var len1 = this.s_dateTime1[0].indexOf('年'),len2 = this.s_dateTime1[1].indexOf('月'),len3 = this.s_dateTime1[2].indexOf('日'),
                len4 = this.s_dateTime2[0].indexOf('年'),len5 = this.s_dateTime2[1].indexOf('月'),len6 = this.s_dateTime2[2].indexOf('日');
            return this.s_dateTime1[0].substring(0,len1,1)+'-'+this.s_dateTime1[1].substring(0,len2,1)+'-'+this.s_dateTime1[2].substring(0,len3,1)+','+this.s_dateTime2[0].substring(0,len4,1)+'-'+this.s_dateTime2[1].substring(0,len5,1)+'-'+this.s_dateTime2[2].substring(0,len6,1)
        },
        //设置时间方法
        timeStart(){
            var len1 = this.s_dateTime1[0].indexOf('年'),len2 = this.s_dateTime1[1].indexOf('月'),len3 = this.s_dateTime1[2].indexOf('日');
            var str = this.s_dateTime1[0]+','+this.s_dateTime1[1]+','+this.s_dateTime1[2];
            this.data1Value = str.split(',');
            return this.s_dateTime1[0].substring(0,len1,1)+'-'+this.$root.buling(this.s_dateTime1[1].substring(0,len2,1))+'-'+this.s_dateTime1[2].substring(0,len3,1)
        },
        //设置时间方法
        timeEnd(){
            var len1 = this.s_dateTime2[0].indexOf('年'),len2 = this.s_dateTime2[1].indexOf('月'),len3 = this.s_dateTime2[2].indexOf('日');
            var str = this.s_dateTime2[0]+','+this.s_dateTime2[1]+','+this.s_dateTime2[2];
            this.data2Value = str.split(',');
            return this.s_dateTime2[0].substring(0,len1,1)+'-'+this.$root.buling(this.s_dateTime2[1].substring(0,len2,1))+'-'+this.s_dateTime2[2].substring(0,len3,1)
        },
        //获取开奖结果
        getNewBonus(){
            var that = this
            that.$get('LotteryNewBonus',{}).then(res=>{
                if(res.code==0){
                    that.BonusList = res.data
                }
            })
        },
    },
    components:{
        LSPK10(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_PK10')
            }
        },
        LSSSC(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_时时彩')
            }
        },
        LSLHC(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_六合彩')
            }
        },
        LSLUCKY(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_幸运彩票')
            }
        },
        LSHLTB(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_欢乐骰宝')
            }
        },
        LSBRNN(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_百人牛牛')
            }
        },
        ZSPK10(){
            return {
                component: import('@/components/HistoryOpen/Module/走势_PK10')
            }
        },
        ZSSSC(){
            return {
                component: import('@/components/HistoryOpen/Module/走势_时时彩')
            }
        },
        ZSLHC(){
            return {
                component: import('@/components/HistoryOpen/Module/走势_六合彩')
            }
        },
        ZSLUCKY(){
            return {
                component: import('@/components/HistoryOpen/Module/走势_幸运彩票')
            }
        },
        ZSHLTB(){
            return {
                component: import('@/components/HistoryOpen/Module/走势_欢乐骰宝')
            }
        },
        ZSBRNN(){
            return {
                component: import('@/components/HistoryOpen/Module/走势_百人牛牛')
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.zs-tab{
    height: 100px;
    display: flex;
    position: relative;
    background: #fff;
    >span{
        flex: 1;
        font-size: 30px;
        color: #999;
        text-align: center;
        line-height: 100px;
    }
    >span.active{
        color:$theme-color;
    }
    >div{
        position: absolute;
        bottom:0;
        left: calc(25% - (140px / 2));
        width: 140px;
        height: 5px;
        background: $theme-color;
        transition: all .5s ease;
    }
    >div.next{
        left: calc(75% - (140px / 2));
    }
}
.main{
    height: 100%; background: $bg-color;
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
    .headTop {
        position: relative; z-index: 2; width: 100%; background: #D9342F; color: #fff; font-size: 36px; text-align: center;
        span {
            position: relative; display: inline-block; height: 88px; line-height: 88px; padding-right: 60px;
            .i_more {
                position: absolute; top: 32px; right: 0; width: 40px; height: 23px; background: url("~@/assets/image/system/cp-icon-down.png") no-repeat center; background-size: cover;
                transition: all .3s ease-in-out;
            }
        }
        .icon-left {
            position: absolute; top: 0; left: 0; width: 78px; height: 88px; background: url("~@/assets/image/system/headback.png") no-repeat center; background-size: 26px 44px;
        }
    }
    .popup-lottery-mask{
        background: rgba(0,0,0,.5);
        position: absolute;
        z-index: 1;
        top: 88px;
        left: 0;
        width:100%;
        height: calc(100% - 88px);
        .popup-lottery-panel{
            padding:30px 45px;
            overflow: hidden;
            background: #fff;
            transition: all .5s;
            transform: translateY(calc(-100% - 100px));
            >div{
                width:200px;
                height: 80px;
                line-height: 80px;
                float: left;
                font-size: 30px;
                color:#333;
                text-align: center;
                border:1px solid #d2d2d2;
                margin-right:30px;
                margin-bottom:30px;
                border-radius: 5px;
            }
            >div.active{
                border:1px solid $theme-color;
                color:$theme-color;
            }
            >div:nth-child(3n){
                margin-right:0;
            }
        }
        .show{
            transform: translateY(0);
        }
        .hide{
            transform: translateY(calc(-100% - 100px));
        }
    }
    .tools-bar{
        padding:23px 20px 20px 20px;
        height: 80px;
        overflow: hidden;
        background: $bg-color;
        span{
            display: block;
            float: left;
            font-size: 24px;
            color:#333;
            margin-right:10px;
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
    }
    .zs-title{
        background: #fff;
        overflow: hidden;
        height: 80px;
        line-height: 80px;
        text-align: center;
        color:#666;
        border-bottom:1px solid #d2d2d2;
        >div{
            float: left;
            font-size: 24px;
            height: 80px;
        }
        >div:first-child{
            width:300px;
            overflow: hidden;
        }
        >div:last-child{
            display: flex;
            width:calc(100% - 300px);
            >div{
                flex: 1;
            }

        }
    }
    .content{
        height: calc(100% - 268px);
        .my-scroll{
            min-height: 1066px;
            .pad20{
                height: 20px;
            }
            .is-none-data{
                color:#333;
                font-size: 32px;
                text-align: center;
            }
        }
    }
    .zsconent{
        height: calc(100% - 348px);
        .my-scroll{
            min-height: 1066px;
        }
    }
    .ZSLUCKY{
        >div:first-child{
            width:180px; color: #3f8feb;
        }
        >div:last-child{
            width:calc(100% - 180px);
            >div:nth-child(1){
                flex: 4;
            }
        }
    }
    .ZSPK10,.ZSSSC,.ZSLHC{
        >div:first-child{
            width:180px; color: #3f8feb;
        }
        >div.luhu{
            >div:last-child{
                flex: 1.2
            }
        }
        >div:last-child{
            width:calc(100% - 180px);
            >div.active{
                span{
                    display: inline-block;
                    width: 140px;
                    height: 50px;
                    line-height: 50px;
                    color:#fff;
                    border-radius: 50px;
                    background: #ffa128;
                }
            }
        }
    }
    .ZSSSC{
        >div:first-child{
            width:180px;
            // border-right: #d2d2d2 1px solid;
        }
        >div:last-child{
            width:calc(100% - 181px);
        }
    }
    .ZSPK10{
        >div:first-child{
            width:180px;
            // border-right: #d2d2d2 1px solid;
        }
    }
    .ZSLHC{
        >div:first-child{
            width:200px;
            // border-right: #d2d2d2 1px solid;
        }
        >div:last-child{
            width:calc(100% - 200px);
        }
    }
    .ZSBRNN,.ZSHLTB{
        >div:first-child{
            width: 300px; color: #3f8feb;
            // border-right: #d2d2d2 1px solid;
        }
        >div:last-child{
            width:calc(100% - 300px);
        }
    }
}
</style>
