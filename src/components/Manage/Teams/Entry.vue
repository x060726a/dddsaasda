<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>团队管理</span></div>
        <span class="search" v-if="active==0||active==1" @click="toggleSearch"><img src="@/assets/image/system/search@2x.png"></span>
    </div>
    <div class="search-mask" v-if="rearchShow">
        <div class="search-item" ref="searchItem">
            <div><input type="text" ref="searchInput" v-model="text" placeholder="搜索会员昵称"><i v-if="text!=''" @click="text=''" class="clear-text"></i></div>
            <div @click="closeSearch" v-if="text==''">取消</div>
            <div v-if="text!=''" @click="searchSubmit">搜索</div>
        </div>
        <div class="close-search-mask" @click="closeSearch"></div>
    </div>
    <tab class="my-tab" :line-width="2" active-color="#D9342F" custom-bar-width="80px">
        <tab-item selected @on-item-click="onItemClick">会员报表</tab-item>
        <tab-item @on-item-click="onItemClick">团队报表</tab-item>
        <tab-item @on-item-click="onItemClick">自身统计</tab-item>
        <tab-item @on-item-click="onItemClick">代理报表</tab-item>
    </tab>
    <div class="content">
        <div class="tools-bar">
            <span></span>
            <span>时间:</span>
            <span @click="popupVisible1=true" style="color:#3F8FEB">{{s_dateTime1[0]+s_dateTime1[1]+s_dateTime1[2]}}</span>
            <span>至</span>
            <span @click="popupVisible2=true" style="color:#3F8FEB">{{s_dateTime2[0]+s_dateTime2[1]+s_dateTime2[2]}}</span>
            <span v-show="active!=2" @click="popupVisible3=true" style="color:#3F8FEB">{{data3Value[0]}}</span>
        </div>
        <div class="team-scroll">
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
                    <div class="scroll-wrap" :class="{'mohu':isSendingHttp}" v-if="active==0">
                        <div v-for="(ele,key,idx) in res" v-if="res&&res.length>0">
                            <div class="time-str" v-if="filter!=2">{{ele.name}}</div>
                            <MEMBERTABLE :res="ele" :type="filter"></MEMBERTABLE>
                        </div>
                        <div class="ts-label" v-if="!isNoneData">团队报表数据更新时间为每日凌晨2点</div>
                    </div>
                    <div class="scroll-wrap" :class="{'mohu':isSendingHttp}" v-if="active==1">
                        <div v-for="(ele,key,idx) in res" v-if="res">
                            <TEAMTABLE :res="ele" :index="key" :len="res.length"></TEAMTABLE>
                        </div>
                        <div></div>
                        <div class="ts-label" v-if="!isNoneData">团队报表数据更新时间为每日凌晨2点</div>
                    </div>
                    <div class="scroll-wrap" :class="{'mohu':isSendingHttp}" v-if="active==2">
                        <USERTABLE :res="res"></USERTABLE>
                    </div>
                    <div class="scroll-wrap" :class="{'mohu':isSendingHttp}" v-if="active==3">
                        <PROXYTABLE :res="res"></PROXYTABLE>
                    </div>
                    <div v-if="(active==0||active==1)&&isNoneData" class="noData margin0">
                        <i class="nodataIcon"></i>
                        <p>暂无数据</p>
                    </div>
                </div>
            </scroller>
            <div class='my-spinner' v-show="isSendingHttp"><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
        </div>
        <div class="total" v-if="res">金额：<countup :start-val="0" :end-val="total*1" :duration="1" :decimals="2"/>元</div>
    </div>
    <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="confirm1">确定</span></div>
        <picker :data='data1' v-model='data1Value'></picker>
    </popup>
    <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="confirm2">确定</span></div>
        <picker :data='data1' v-model='data2Value'></picker>
    </popup>
    <popup v-model="popupVisible3" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible3=false">取消</span><span @click="confirm3">确定</span></div>
        <picker :data='data3' :fixed-columns="1" :columns="3" v-model='data3Value' ref="my_picker"></picker>
    </popup>
</div>
</template>
<script>
const MemberTable = import('@/components/Manage/Teams/会员报表')
const TeamTable = import('@/components/Manage/Teams/团队报表')
const ProxyTable = import('@/components/Manage/Teams/代理报表')
const userTable = import('@/components/Manage/Teams/自身统计')
import { Countup } from 'vux'
import { mapState } from 'Vuex';
export default {
    data(){
        return{
            text:'',
            active:0,
            total:0,
            focusInput:false,
            isSendingHttp:false,//是否正在发送HTTP请求
            rearchShow:false,
            isNoMoreData:false,//上拉加载是否没有更多数据了
            isNoneData:false,//没有数据

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
            popupVisible3:false,
            data3Value:[''],
            data3:['最后离线','最新注册','盈亏最多'],

            res:[],
            bet_time:0,
            filter:0,
            offset:0,
            profit:0
        }
    },
    watch:{
        async active(val,oval){
            var that = this
            var res = await this.timeInt()
            this.res = []
            this.offset = 0
            this.isSendingHttp = true
            this.isNoneData = false
            this.filter = 0
            this.total = 0
            this.$refs.my_scroller.reset({top:0});
            this.switchConfirm(false);
        }
    },
    computed:{
        ...mapState(['isSearch','routerStatus','lastRouteName']),
        guol:function(){
            var id = this.id
            if(id!=''){
                return this.res.filter(function(value){
                    return value.id==id
                })
            }else{
                return this.res
            }
        }
    },
    mounted(){
        var that = this
    },
    activated(){
        var that = this
        if(this.isSearch&&this.lastRouteName=='manage'){
            this.timeInt();
            this.res = []
            this.offset = 0
            this.isSendingHttp = true
            this.isNoneData = false
            this.filter = 0
            this.total = 0
            this.memberReport(false,{
                date_start:that.timeStart(),
                date_end:that.timeEnd(),
                filter:that.filter,
                offset:that.offset,
                username:that.text
            });
        }
    },
    created(){
        var that = this
        this.timeInt();
        this.isSendingHttp = false
        this.memberReport(false,{
            date_start:that.timeStart(),
            date_end:that.timeEnd(),
            filter:that.filter,
            offset:that.offset,
            username:that.text
        });
    },
    methods:{
        closeSearch(){
            var that = this
            that.rearchShow = false
            that.focusInput = false
            that.text = ''
        },
        searchSubmit(){
            var that = this
            event.preventDefault();
            that.isSendingHttp = true
            that.isNoneData = false
            that.offset = 0
            that.$store.commit('isSearch',true)
            if(this.active==0){
                that.memberReport(false,{
                    date_start:that.timeStart(),
                    date_end:that.timeEnd(),
                    filter:that.filter,
                    offset:that.offset||0,
                    nickname:that.text
                })
            }
            if(this.active==1){
                that.TeamTable(false,{
                    date_start:that.timeStart(),
                    date_end:that.timeEnd(),
                    filter:that.filter,
                    offset:that.offset||0,
                    nickname:that.text
                })
            }
        },
        //搜索弹层
        toggleSearch(){
            var that = this;
            this.rearchShow = !this.rearchShow
            this.text = ''
            this.focusInput = false
            if(!this.rearchShow) return
            setTimeout(()=>{
                that.$nextTick(()=>{
                    that.$refs.searchItem.className = 'search-item downAnimate'
                })
            },100)
        },
        //tab选项卡
        onItemClick(index){
            this.active = index
        },
        //确认按钮
        confirm1(){
            var that = this
            this.popupVisible1 = false
            this.s_dateTime1 = this.data1Value
            this.isSendingHttp = true
            this.isNoneData = false
            this.refresh();
        },
        //确认按钮
        confirm2(){
            var that = this
            this.popupVisible2 = false
            this.s_dateTime2 = this.data2Value
            this.isSendingHttp = true
            this.isNoneData = false
            this.refresh();
        },
        //确认按钮
        confirm3(){
            var that = this
            this.popupVisible3 = false
            this.filter = this.data3.indexOf(this.data3Value[0])
            this.isSendingHttp = true
            this.isNoneData = false
            this.refresh();
        },
        //刷新
        refresh(){
            var that = this
            that.offset = 0
            that.isNoneData = false
            that.$refs.my_scroller.enablePullup();
            that.switchConfirm(false);
        },
        //上拉加载更多
        infinite(){
            this.switchConfirm(true);
        },
        //交换机
        switchConfirm(bool){
            var that = this
            switch (that.active) {
                case 0:
                    this.data3 = ['最后离线','最新注册','盈亏最多']
                    that.memberReport(bool,{
                        date_start:that.timeStart(),
                        date_end:that.timeEnd(),
                        filter:that.filter,
                        offset:that.offset,
                        username:that.text
                    })
                    break;
                case 1:
                    this.data3 = ['全部','在线','离线']
                    that.TeamTable(bool,{
                        date_start:that.timeStart(),
                        date_end:that.timeEnd(),
                        filter:that.filter,
                        offset:bool?that.offset:0,
                        username:that.text
                    })
                    break;
                case 2:
                    that.selfTotal({
                        date_start:that.timeStart(),
                        date_end:that.timeEnd(),
                    })
                    break;
                case 3:
                    this.data3 = ['代理+直属','代理+团队']
                    that.getTeams({
                        date_start:that.timeStart(),
                        date_end:that.timeEnd(),
                        filter:that.filter
                    });
                    break;
            }
        },
        //会员报表
        memberReport(bool,obj){
            var that = this
            that.$get('memberReport',obj).then(res=>{
                that.isSendingHttp = false
                if(res.code==0){
                    if(JSON.stringify(res.data)=='{}'){
                        that.isNoneData = true
                    }
                    if(res.data.offset%20<20){
                        that.$refs.my_scroller&&that.$refs.my_scroller.disablePullup();
                    }
                    if(bool){
                        //上拉加载
                        that.total = res.data.total*1||0 + that.total*1
                        that.res = that.res.concat(res.data.list)
                        that.$refs.my_scroller&&that.$refs.my_scroller.donePullup()
                    }else{
                        //下拉刷新
                        that.total = res.data.total*1
                        that.res = res.data.list
                        that.$refs.my_scroller&&that.$refs.my_scroller.donePulldown();
                        that.$refs.my_scroller&&that.$refs.my_scroller.reset();
                    }
                    if(res.data.list.length==0&&res.data.offset==0){
                        //内容为空
                        that.isNoneData = true
                    }
                    that.offset = res.data.offset
                }
                that.rearchShow = false
            })
        },
        //团队报表
        TeamTable(bool,obj){
            var that = this
            that.$get('teamTable',obj).then(res=>{
                if(res.code==0){
                    if(JSON.stringify(res.data)=='{}'){
                        that.isNoneData = true
                    }
                    if(res.data.offset%20<20){
                        that.$refs.my_scroller.disablePullup();
                    }
                    if(bool){
                        //上拉加载
                        that.total = res.data.total*1||0 + that.total*1
                        that.res = that.res.concat(res.data.list)
                        that.$refs.my_scroller.donePullup()
                    }else{
                        //下拉刷新
                        that.total = res.data.total*1
                        that.res = res.data.list
                        that.$refs.my_scroller.donePulldown();
                        that.$refs.my_scroller.reset();
                    }
                    that.offset = res.data.offset
                    that.profit = res.data.profit
                }
                that.isSendingHttp = false
            })
        },
        //自身统计
        selfTotal(obj){
            var that = this
            that.$get('selfStat',obj).then(res=>{
                that.isSendingHttp = false
                if(res.code==0){
                    that.$refs.my_scroller.donePulldown();
                    that.$refs.my_scroller.reset();
                    that.$refs.my_scroller.disablePullup();
                    that.res = res.data
                    that.total = res.data.total
                }
            })
        },
        //代理报表
        getTeams(obj){
            var that = this
            that.$get('proxyReport',obj).then(res=>{
                that.isSendingHttp = false
                if(res.code==0){
                    that.$refs.my_scroller.donePulldown();
                    that.$refs.my_scroller.reset();
                    that.$refs.my_scroller.disablePullup();
                    that.res = res.data
                    that.total = res.data.total
                }
            })
        },
        timeInt(){
            return new Promise(resolve=>{
                this.s_dateTime1 = []
                let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastDObj = new Date( Date.parse(new Date()) );
                this.s_dateTime1.push(lastDObj.getFullYear()+'年')
                this.s_dateTime1.push((lastDObj.getMonth()+1)+'月')
                this.s_dateTime1.push('1日')
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
    },
    components:{
        Countup,
        MEMBERTABLE(){
            return {
                component:MemberTable,
            }
        },
        PROXYTABLE(){
            return {
                component:ProxyTable,
            }
        },
        USERTABLE(){
            return {
                component:userTable,
            }
        },
        TEAMTABLE(){
            return{
                component:TeamTable
            }
        }
    },
    filters:{
        changeX:function(value){
            if(value==8){
                return true
            }
        }
    },
    deactivated(){
        this.rearchShow = false;
    }
}
</script>
<style lang="scss" scoped>
.mohu{
    filter: blur(5px);
}
.ts-label{
    margin: 23px 0 14px 20px;
    font-size: 26px;
    color: #999999;
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
.my-scroll{
    position: relative;
}
.main{
    height: 100%;
    background: $bg-color;
    position: relative;
    .data-none{
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top:-70px;
        margin-left:-100px;
        width:200px;
        height: 40px;
        line-height: 40px;
        font-size: 32px;
    }
    .search{
        width:44px;
        height: 44px;
        position: absolute;
        display: block;
        top: 50%;
        right:20px;
        margin-top:-22px;
        font-size: 0;
        img{
            width:100%;
        }
    }
    .close-search-mask{
        height: calc(100% - 188px);
    }
    .search-mask{
        position: absolute;
        top: 88px;
        left: 0;
        z-index: 1;
        width:100%;
        height: calc(100% - 88px);
        background: rgba(0,0,0,.4);
        overflow: hidden;
        .search-item{
            height: 108px;
            background: #fff;
            padding:20px 0 20px 20px;
            overflow: hidden;
            transition: all .2s;
            transform: translateY(-108px);
            >div{
                float: left;
            }
            >div:first-child{
                width:646px;
                height: 68px;
                background: #F7F7F7;
                border-radius: 34px;
                padding:14px 0 14px 30px;
                position: relative;
                .clear-text{
                    position: absolute;
                    top: 0;
                    right: 20px;
                    width: 68px;
                    height: 68px;
                    display: block;
                    background: url('~@/assets/image/system/close_light@2x.png') center center no-repeat;
                    background-size: 30px 30px;
                }
                input{
                    background: none;
                    float: left;
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    font-size: 28px;
                    width:calc(100% - 40px);
                }
                input::-webkit-input-placeholder{
                    font-size: 28px;
                    color: #D2D2D2;
                }
            }
            >div:last-child{
                line-height: 68px;
                font-size: 28px;
                color: #333333;
                margin-left:10px;
            }
        }
        .downAnimate{
            transform: translateY(0px);
        }

    }
    .content{
        height: calc(100% - 200px);
        .total{
            height: 98px;
            line-height: 98px;
            text-align: center;
            font-size: 34px;
            color: #FFFFFF;
            background: $theme-color;
        }
        .team-scroll{
            height: calc(100% - 186px);
            position: relative;
            .my-spinner{
                position: absolute;
                top: 50%;
                left: 50%;
                width:100px;
                height: 150px;
                margin-left:-50px;
                margin-top:-120px;
                background: none;
            }
        }
        .scroll-wrap{
            min-height: 953px;
            .time-str{
                height: 30px;
                line-height: 30px;
                background: #f7f7f7;
                font-size: 24px;
                color: #999999;
                padding-left: 20px;
                margin-bottom:15px;
            }
        }
        .tools-bar{
            padding:33px 20px 27px 20px;
            height: 100px;
            line-height: 42px;
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
    }
}
</style>
