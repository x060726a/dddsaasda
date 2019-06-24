<template>
<div class="item" :class="{pb1:type==2}">
    <div class="team-item" v-if="type!=2" v-for="ele in res.list" @click="$router.push({path:'/userDetail',query:{id:ele.id}})">
        <div class="block1">
            <div><span>会员账号：</span><span>{{ele.nickname}}</span></div>
            <div><span>会员盈亏：</span><span>{{ele.profit}}</span></div>
        </div>
        <div class="block2">
            <div><span>注册时间：</span><span>{{$root.ConversionTimeL(ele.time)}}</span></div>
            <div><span>账号余额：</span><span>{{ele.coin}}</span></div>
        </div>
    </div>
    <div class="team-item" v-if="type==2" @click="$router.push({path:'/userDetail',query:{id:ele.id}})">
        <div class="block1">
            <div><span>会员账号：</span><span>{{res.nickname}}</span></div>
            <div><span>会员盈亏：</span><span>{{res.total_profit}}</span></div>
        </div>
        <div class="block2">
            <div><span>注册时间：</span><span>{{$root.ConversionTimeL(res.time)}}</span></div>
            <div><span>账号余额：</span><span>{{res.coin}}</span></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['res','type'],
}
</script>
<style lang="scss" scoped>
.time-label{
    height: 70px;
    padding-top:24px;
    padding-left:20px;
    font-size: 22px;
    color: #999999;
    line-height: 30px;
}
.pb1{
    margin-bottom:0!important;
    border-bottom:1px solid #d2d2d2;
}
.item{
    margin-bottom:23px;
    >div{
        border-bottom:1px solid #d2d2d2;
    }
    >div:last-child{
        border-bottom:none;
    }
}
.team-item{
    background: #fff;
    padding:35px 0 35px 20px;
    .block1{
        display: flex;
        padding-bottom:30px;
        >div:first-child{
            overflow: hidden;
            flex: 1;
            span{
                float: left;
                line-height: 42px;
            }
            >span:first-child{
                font-size: 24px;
                color: #999999;
            }
            >span:last-child{
                font-size: 30px;
                color: #333333;
            }
        }
        >div:last-child{
            flex: 1;
            span{
                float: left;
                line-height: 42px;
            }
            >span:first-child{
                font-size: 24px;
                color: #999999;
            }
            >span:last-child{
                font-size: 30px;
                color: #D9342F;
            }
        }
    }
    .block2{
        display: flex;
        >div:first-child{
            overflow: hidden;
            flex: 1;
            span{
                float: left;
                line-height: 42px;
                font-size: 24px;
                color: #999999;
            }
        }
        >div:last-child{
            flex: 1;
            span{
                float: left;
                line-height: 42px;
            }
            >span:first-child{
                font-size: 24px;
                color: #999999;
            }
            >span:last-child{
                font-size: 30px;
                color: #333;
            }
        }
    }
}
.boder1{
    border-bottom: 1px solid #D2D2D2;
}
</style>

