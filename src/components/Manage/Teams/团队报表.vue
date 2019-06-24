<template>
<div class="item" :class="{last:index==len-1}">
    <div class="team-item" @click="$router.push({path:'/teamDetail',query:{id:res.id}})">
        <div class="block1">
            <div><span>会员账号：</span><span>{{res.nickname}}</span></div>
            <div><span>团队盈亏：</span><span>{{res.profit}}</span></div>
        </div>
        <div class="block2">
            <div><span>注册时间：</span><span>{{$root.ConversionTimeL(res.time)}}</span></div>
            <div><span>团队投注：</span><span>{{res.bets}}</span></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    props:['res','last','index','len'],
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
.last{
    border-bottom:none!important;
}
.item{
    border-bottom:1px solid #d2d2d2;
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

