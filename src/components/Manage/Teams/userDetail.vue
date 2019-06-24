<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>会员报表详情</span></div>
        <span class="reset" @click="resetHttp">重置</span>
    </div>
    <div class="content">
        <div class="tools-bar">
            <span></span>
            <span>时间:</span>
            <span @click="popupVisible1=true">{{s_dateTime1[0]+s_dateTime1[1]+s_dateTime1[2]}}</span>
            <span>至</span>
            <span @click="popupVisible2=true">{{s_dateTime2[0]+s_dateTime2[1]+s_dateTime2[2]}}</span>
        </div>
        <div class="res-table" ref="Scroll">
            <div class="xs-container" :class="{'mohu':isSendingHttp}">
                <div class="xs-content">
                    <div class="title">会员详情</div>
                    <div class="block"><span>账<em></em>号：</span><span>{{res.nickname}}</span></div>
                    <div class="block"><span>直属人数：</span><span>{{res.directly_num}}</span></div>
                    <div class="block"><span>团队人数：</span><span>{{res.team_num}}</span></div>
                    <div class="block"><span>自身充值：</span><span>{{res.deposit}}</span></div>
                    <div class="block"><span>会员投注：</span><span>{{res.bets}}</span></div>
                    <div class="block"><span>团队投注：</span><span>{{res.team_bets}}</span></div>
                    <div class="block"><span>返点比率：</span><span>{{res.fandian}}</span></div>
                    <div class="block"><span>团队返点：</span><span>{{res.team_fandian}}</span></div>
                    <div class="block"><span>自身返点：</span><span>{{res.fandian_rate}}</span></div>
                    <div class="block no-b-b"><span>优惠活动：</span><span>{{res.promotion}}</span></div>
                </div>
            </div>
            <div class='my-spinner' v-show="isSendingHttp"><div class='rect1'></div><div class='rect2'></div><div class='rect3'></div><div class='rect4'></div><div class='rect5'></div></div>
        </div>
        <div class="total">盈亏:{{res.profit}}元</div>
    </div>
    <popup v-model="popupVisible1" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible1=false">取消</span><span @click="confirm1">确定</span></div>
        <picker :data='data1' v-model='data1Value'></picker>
    </popup>
    <popup v-model="popupVisible2" position="bottom" class="bankcard-pancel">
        <div class="popup-head"><span @click="popupVisible2=false">取消</span><span @click="confirm2">确定</span></div>
        <picker :data='data1' v-model='data2Value'></picker>
    </popup>
</div>
</template>
<script>
export default {
    data(){
        return{
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
            res:''
        }
    },
    mounted(){
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
    },
    created(){
        this.isSendingHttp = true
        this.timeInt();
        this.getUserDetail();
        this.$store.commit('lastRouteName','')
    },
    methods:{
        //重置
        resetHttp(){
            this.s_dateTime1 = [],
            this.s_dateTime2 = [],
            this.data1Value = [''],
            this.data2Value = [''],
            this.isSendingHttp = true
            this.timeInt();
            this.getUserDetail()
        },
        getUserDetail(){
            var that = this;
            that.$get('memberView',{
                date_start:that.timeStart(),
                date_end:that.timeEnd(),
                uid:that.$route.query.id
            }).then(res=>{
                console.log(res);
                if(res.code==0){
                    that.res = res.data
                    this.isSendingHttp = false
                }
            })
        },
        confirm1(){
            this.s_dateTime1 = this.data1Value
            this.popupVisible1 = false
            this.isSendingHttp = true
            this.getUserDetail()
        },
        confirm2(){
            this.s_dateTime2 = this.data2Value
            this.popupVisible2 = false
            this.isSendingHttp = true
            this.getUserDetail()
        },
        timeInt(){
            let y=new Date().getFullYear(),m=(new Date().getMonth()+1),d=new Date().getDate(),lastDObj = new Date( Date.parse(new Date()) );
            this.s_dateTime1.push(lastDObj.getFullYear()+'年')
            this.s_dateTime1.push((lastDObj.getMonth()+1)+'月')
            this.s_dateTime1.push(lastDObj.getDate()+'日')

            this.s_dateTime2.push(y+'年')
            this.s_dateTime2.push(m+'月')
            this.s_dateTime2.push(d+'日')
            this.timeStart();
            this.timeEnd();
        },
        timeStart(){
            var len1 = this.s_dateTime1[0].indexOf('年'),len2 = this.s_dateTime1[1].indexOf('月'),len3 = this.s_dateTime1[2].indexOf('日');
            var str = this.s_dateTime1[0]+','+this.s_dateTime1[1]+','+this.s_dateTime1[2];
            this.data1Value = str.split(',');
            return this.s_dateTime1[0].substring(0,len1,1)+'-'+this.s_dateTime1[1].substring(0,len2,1)+'-'+this.s_dateTime1[2].substring(0,len3,1)
        },
        timeEnd(){
            var len1 = this.s_dateTime2[0].indexOf('年'),len2 = this.s_dateTime2[1].indexOf('月'),len3 = this.s_dateTime2[2].indexOf('日');
            var str = this.s_dateTime2[0]+','+this.s_dateTime2[1]+','+this.s_dateTime2[2];
            this.data2Value = str.split(',');
            return this.s_dateTime2[0].substring(0,len1,1)+'-'+this.s_dateTime2[1].substring(0,len2,1)+'-'+this.s_dateTime2[2].substring(0,len3,1)
        },
    }
}
</script>
<style lang="scss" scoped>
.mohu{
    filter: blur(5px);
}
.no-b-b{
    border-bottom:none!important;
}
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
.main{
    height: 100%;
    .reset{
        width:100px;
        height: 100px;
        line-height: 100px;
        position: absolute;
        display: block;
        top: 0;
        right:0px;
        font-size: 30px;
        color: #FFFFFF;
        text-align: center;
    }
    .content{
        height: calc(100% - 100px);
        background: #f7f7f7;
        .total{
            height: 98px;
            line-height: 98px;
            text-align: center;
            font-size: 34px;
            color: #FFFFFF;
            background: $theme-color;
        }
        .tools-bar{
            padding:33px 20px 33px 20px;
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
                margin-top:2px;
                width:36px;
                height: 33px;
                background: url('~@/assets/image/system/shijianshaixuanqi@2x.png') center center no-repeat;
                background-size: 100% 100%;
            }
            span:nth-child(3),span:nth-child(5){
                color:#0064be;
            }
        }
        .res-table{
            height: calc(100% - 199px);
            .time-label{
                padding-bottom:16px;
                padding-left:20px;
                font-size: 22px;
                color: #999999;
                line-height: 30px;
            }
            .title,.block{
                padding-left:45px;
                text-align: left;
                height: 80px;
                line-height: 80px;
                background: #fff;
                font-size: 28px;
                color: #333333;
                position: relative;
                border-bottom: 1px solid #D2D2D2;
            }
            .title::before{
                content:'';
                display: block;
                position: absolute;
                top: 22px;
                left: 20px;
                width:6px;
                height: 36px;
                background: $theme-color;
            }
            .block{
                padding-left:30px;
                span{
                    em{
                        display: inline-block;
                        width:51px;
                    }
                }
                span:first-child{
                    font-size: 26px;
                    color: #333333;
                }
                span:last-child{
                    font-size: 26px;
                    color: #666666;
                }
            }
        }
    }
}
</style>
