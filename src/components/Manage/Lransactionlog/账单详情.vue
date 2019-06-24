<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title">账单详情</div>
    </div>
    <div class="content">
        <div class="pad50"></div>
        <div class="img"><img :src="res&&res.icon"></div>
        <h2>{{res.title}}</h2>
        <!-- type 1-充值 2-提现 3-投注 4-返水 5-返利 -->
        <h1 v-if="res.type==1||res.type==4||res.type==5">+{{res.coin}}</h1>
        <h1 v-if="res.type==3">
            <!-- 注单状态status 0:未开奖 1:中奖了 2:未中奖 3:和局 9:撤单  -->
            <p v-if="res.status==0||res.status==2||res.status==9">-{{res.coin}}</p>
            <p v-if="res.status==1||res.status==3">+{{res.coin}}</p>
        </h1>
        <h1 v-if="res.type==2">-{{res.coin}}</h1>
        <div class="pad53"></div>
        <!-- 充值,提现 -->
        <div class="text" v-if="res&&(res.type==1||res.type==2)"><span>当前状态</span><span>{{res.status=='处理中'?'等待银行处理':res.status}}</span></div>
        <div class="text" v-if="res&&(res.type==1||res.type==2)"><span>交易时间</span><span>{{$root.ConversionTimeL(res.created_at)}}</span></div>
        <div class="text" v-if="res&&(res.type==1||res.type==2)"><span>交易备注</span><span>{{res.remark==''?'无':res.remark}}</span></div>
        <div class="text" v-if="res&&(res.type==1||res.type==2)"><span>交易订单</span><span>{{res.order_id}}</span><a class="copydom" @click="copyLink" data-clipboard-action="copy"></a></div>
        <!-- 提现 -->
        <!-- <div class="text" v-if="res&&res.type==2"><span>当前状态</span><span>{{res.status}}</span></div>
        <div class="text" v-if="res&&res.type==2"><span>交易时间</span><span>{{$root.ConversionTimeL(res.created_at)}}</span></div>
        <div class="text" v-if="res&&res.type==2"><span>交易备注</span><span>{{res.remark==''?'无':res.remark}}</span></div>
        <div class="text" v-if="res&&res.type==2"><span>交易订单</span><span>{{res.order_id}}</span></div> -->
        <!-- 投注 -->
        <div class="text" v-if="res&&res.type==3&&res.status!=9"><span>当前状态</span><span>{{jieguo[res.status]}}</span></div>
        <div class="text" v-if="res&&res.type==3"><span>投注方式</span><span>{{betType[res.bet_type*1-1]}}</span></div>
        <div class="text" v-if="res&&res.type==3"><span>开奖结果</span><span>{{status[res.status]}}</span></div>
        <div class="text" v-if="res&&res.type==3"><span>投注详情</span><span class="btn" @click="$router.push({path:'/orderDetails',query:{id:res.type_refer,betType:res.bet_type}})">查看</span></div>
        <div class="text" v-if="res&&res.bet_type==2"><span>金额详情</span><span>{{res.commission}}</span></div>
        <div class="text" v-if="res&&res.type==3"><span>交易时间</span><span>{{$root.ConversionTimeL(res.created_at)}}</span></div>
        <div class="text" v-if="res&&res.type==3"><span>交易订单</span><span>{{res.order_id}}</span></div>
        <!-- 返水 -->
        <div class="text" v-if="res&&res.type==4"><span>当前状态</span><span>{{res.status}}</span></div>
        <div class="text" v-if="res&&res.type==4"><span>返水时间</span><span>{{res.title}}</span></div>
        <div class="text" v-if="res&&res.type==4"><span>返水订单</span><span>{{res.order_id}}</span></div>
        <!-- 返利 -->
        <div class="text" v-if="res&&res.type==5"><span>当前状态</span><span>{{res.status}}</span></div>
        <div class="text" v-if="res&&res.type==5"><span>活动名称</span><span>{{res.title}}</span></div>
        <div class="text" v-if="res&&res.type==5"><span>活动详情</span><span class="btn" @click="$router.push({path:'/usertask'})">查看</span></div>
        <div class="text" v-if="res&&res.type==5"><span>返利时间</span><span>已存入账户余额</span></div>
        <div class="text" v-if="res&&res.type==5"><span>交易订单</span><span>{{res.order_id}}</span></div>
        <div class="pad7"></div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            res:'',
            betType:['普通投注','跟单','追号','跟投','发单投注'],
            status:{
                '0':'未开奖',
                '1':'已中奖',
                '2':'未中奖',
                '3':'和局',
                '9':'已撤单',
            },
            jieguo:{
                '0':'已投注',
                '1':'已存入账户余额',
                '2':'已扣除投注金额',
                '3':'平局',
            }
        }
    },
    created(){
        console.log(this.$route.query);
        this.getDetail();
    },
    methods:{
        getDetail(){
            var that = this
            that.$get('recordDetails',{id:that.$route.query.id}).then(res=>{
                // console.log(res);
                if(res.code==0){
                    that.res = res.data
                }
            })
        },
        copyLink(){
            var that = this
            var clipboard = new ClipboardJS('.copydom',{
                text:function(){
                    return that.res.order_id
                }
            });
            clipboard.on('success',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
            clipboard.on('error',()=>{
                this.$vux.toast.text('复制成功','bottom')
            })
        }
    }
}
</script>
<style lang="scss" scoped>
.main{
    height: 100%;
    background: #f3f3f3;
    .content{
        background: #fff;
        .pad50{
            height: 50px;
        }
        .pad53{
            height: 53px;
        }
        .pad7{
            height: 7px;
        }
        .img{
            height: 100px;
            text-align: center;
            font-size: 0;
            margin-bottom:20px;
            img{
                height: 100%;
            }
        }
        h2{
            font-size: 34px;
            color: #333333;
            line-height: 48px;
            text-align: center;
            margin-bottom:14px;
        }
        h1{
            width:670px;
            margin: auto;
            font-size: 56px;
            color: #333333;
            text-align: center;
            padding-bottom:82px;
            border-bottom: 1px solid #D2D2D2;
        }
        .text{
            overflow: hidden;
            padding-left:40px;
            margin-bottom:26px;
            span{
                float: left;
            }
            a{
                float: left;
                display: block;
                height: 40px;
                width:28px;
                background: url('~@/assets/image/system/copy_icon@2x.png') center center no-repeat;
                background-size: 100%;
                margin-left:18px;
            }
            span.btn{
                color:#3F8FEB!important;
            }
            span:first-child{
                font-size: 28px;
                color: #999999;
                line-height: 40px;
                padding-right:36px;
            }
            span:nth-child(2){
                font-size: 28px;
                color: #333333;
                line-height: 40px;
            }
        }
    }
}
</style>
