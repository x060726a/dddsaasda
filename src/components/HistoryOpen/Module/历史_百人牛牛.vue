<template>
<div class="item">
        <div class="left-img"><img :src="res.icon" v-if="!isDetail"></div>
    <div class="ball" :class="{detail:isDetail}">
        <div class="issue-time">
            <span class="name" v-if="!isDetail">{{res.title}}</span>
            <span class="issue">第{{res.qihao}}期</span>
            <span class="time" v-if="isDetail">{{res.time}}</span>
            <span class="btn" v-if="!isDetail">历史开奖 <i><x-icon type="ios-arrow-right" size="15"></x-icon></i></span>
        </div>
        <div class="ball-item-wrap">
            <div class="ball-item" v-for="(ele,key) in res.info.split(',')" :key="key"><span :class="'poker'+ele"></span></div>
            <div class="total-item"><span :class="{rd: res.win == '红方胜', bd: res.win == '蓝方胜'}">{{res.win}}</span>，{{calcNiu(res.info.split(','))}}</div>
        </div>
    </div>
</div>
</template>
<script>
import {calFormat} from  '@/assets/js/util.js'
export default {
    props:['isDetail','res'],
    methods:{
        // 牛牛算法
        calcNiu (val) {
            let arr = []
            val.some(res => {
                arr.push(res.split('_')[0])
            })
            return calFormat(arr)
        }
        // getNiuniu(arr){
        //     var newArr = [],reg = ['J','Q','K','10'],zh_Arr = ['牛','一','二','三','四','五','六','七','八','九']
        //     newArr.push( reg.indexOf( arr[0].substring(0,arr[0].indexOf('_')) )>-1?0: arr[0].substring(0,arr[0].indexOf('_'))*1 )
        //     newArr.push( reg.indexOf( arr[1].substring(0,arr[1].indexOf('_')) )>-1?0: arr[1].substring(0,arr[1].indexOf('_'))*1 )
        //     newArr.push( reg.indexOf( arr[2].substring(0,arr[2].indexOf('_')) )>-1?0: arr[2].substring(0,arr[2].indexOf('_'))*1 )
        //     newArr.push( reg.indexOf( arr[3].substring(0,arr[3].indexOf('_')) )>-1?0: arr[3].substring(0,arr[3].indexOf('_'))*1 )
        //     newArr.push( reg.indexOf( arr[4].substring(0,arr[4].indexOf('_')) )>-1?0: arr[4].substring(0,arr[4].indexOf('_'))*1 )
        //     var numreg= ['0,1,2','0,1,3','0,1,4','0,2,3','0,2,4','0,3,4','1,2,3','1,2,4','2,3,4'],he = newArr[0]+newArr[1]+newArr[2]+newArr[3]+newArr[4],index=false;
        //     numreg.forEach((ele,idx)=>{
        //         if( (newArr[ele.split(',')[0]]+newArr[ele.split(',')[1]]+newArr[ele.split(',')[2]])%10==0 ){
        //             index = idx
        //         }
        //     })
        //     if(index!=false){
        //         return "牛"+zh_Arr[he%10]
        //     }else{
        //         return "没牛"
        //     }
        // },
    }
}
</script>
<style lang="scss" scoped>
.item{
    padding:24px 30px 24px 35px;
    display: flex;
    background: #fff;
    border-bottom:1px solid #d2d2d2;
    .left-img{
        display: flex;
        align-items: center;
        >img{
            flex: 1;
            width:90px;
            height: 90px;
            margin-right:30px;
        }
    }
    .detail{
        width:100%!important;
    }
    .ball{
        width:calc(100% - 120px);
        .issue-time{
            height: 30px;
            line-height: 30px;
            margin-bottom:20px;
            overflow: hidden;
            .name,.issue{
                float: left;
            }
            .time,.btn{
                float: right;
                font-size: 22px;
                color:#999;
            }
            .name{
                font-size: 30px;
                color:#333;
                margin-right:20px;
            }
            .issue{
                font-size: 24px;
                color:#666;
                margin-right:20px;
            }
            .btn{
                >i{
                    margin-top:3px;
                    display: flex;
                    float: right;
                    width: 30px;
                    height: 30px;
                    justify-content: center;
                    align-items: center;
                    >svg{
                        fill: #999;
                    }
                }
            }
        }
        .ball-item-wrap{
            overflow: hidden;
            .ball-item{
                float: left;
                width:58px;
                height: 72px;
                margin-right:6px;
                background-size: 100% 100%;
                font-size: 0;
                >span{
                    display: block;
                    width:100%;
                    height: 100%;
                }
            }
            .total-item{
                float: left;
                height: 72px;
                line-height: 118px;
                font-size: 24px;
                color:#333;
                padding-left:10px;
                .rd { color: #d9342f; }
                .bd { color: #3f8fe8; }
            }
        }
    }
}
</style>

