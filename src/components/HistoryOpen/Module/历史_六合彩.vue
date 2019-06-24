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
            <div class="ball-item" :class="{
                'hong':color['红'].indexOf(res.data.split(',')[0]*1)>-1,
                'lan':color['蓝'].indexOf(res.data.split(',')[0]*1)>-1,
                'lv':color['绿'].indexOf(res.data.split(',')[0]*1)>-1,
            }">{{res.data.split(',')[0]}}</div>
            <div class="ball-item" :class="{
                'hong':color['红'].indexOf(res.data.split(',')[1]*1)>-1,
                'lan':color['蓝'].indexOf(res.data.split(',')[1]*1)>-1,
                'lv':color['绿'].indexOf(res.data.split(',')[1]*1)>-1,
            }">{{res.data.split(',')[1]}}</div>
            <div class="ball-item" :class="{
                'hong':color['红'].indexOf(res.data.split(',')[2]*1)>-1,
                'lan':color['蓝'].indexOf(res.data.split(',')[2]*1)>-1,
                'lv':color['绿'].indexOf(res.data.split(',')[2]*1)>-1,
            }">{{res.data.split(',')[2]}}</div>
            <div class="ball-item" :class="{
                'hong':color['红'].indexOf(res.data.split(',')[3]*1)>-1,
                'lan':color['蓝'].indexOf(res.data.split(',')[3]*1)>-1,
                'lv':color['绿'].indexOf(res.data.split(',')[3]*1)>-1,
            }">{{res.data.split(',')[3]}}</div>
            <div class="ball-item" :class="{
                'hong':color['红'].indexOf(res.data.split(',')[4]*1)>-1,
                'lan':color['蓝'].indexOf(res.data.split(',')[4]*1)>-1,
                'lv':color['绿'].indexOf(res.data.split(',')[4]*1)>-1,
            }">{{res.data.split(',')[4]}}</div>
            <div class="ball-item" :class="{
                'hong':color['红'].indexOf(res.data.split(',')[5]*1)>-1,
                'lan':color['蓝'].indexOf(res.data.split(',')[5]*1)>-1,
                'lv':color['绿'].indexOf(res.data.split(',')[5]*1)>-1,
            }">{{res.data.split(',')[5]}}</div>
            <div class="jiahao"></div>
            <div class="ball-item" :class="{
                'tehong':color['红'].indexOf(res.data.split(',')[6]*1)>-1,
                'telan':color['蓝'].indexOf(res.data.split(',')[6]*1)>-1,
                'telv':color['绿'].indexOf(res.data.split(',')[6]*1)>-1,
            }">{{res.data.split(',')[6]}}</div>
        </div>
        <div class="shengxiao">
            <div>{{res.info.split(',')[0]}}</div>
            <div>{{res.info.split(',')[1]}}</div>
            <div>{{res.info.split(',')[2]}}</div>
            <div>{{res.info.split(',')[3]}}</div>
            <div>{{res.info.split(',')[4]}}</div>
            <div>{{res.info.split(',')[5]}}</div>
            <div></div>
            <div>{{res.info.split(',')[6]}}</div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            color:{
                '红': [1, 2, 7, 8, 12, 13, 18, 19, 23, 24, 29, 30, 34, 35, 40, 45, 46],
                '绿': [5, 6, 11, 16, 17, 21, 22, 27, 28, 32, 33, 38, 39, 43, 44, 49],
                '蓝': [3, 4, 9, 10, 14, 15, 20, 25, 26, 31, 36, 37, 41, 42, 47, 48]
            }
        }
    },
    props:['isDetail','res'],
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
                width:40px;
                height: 40px;
                line-height: 38px;
                border-radius: 50%;
                font-size: 22px;
                color:#fff;
                text-align: center;
                margin-right:13px;
            }
            .jiahao{
                float: left;
                width:40px;
                height: 40px;
                margin-right:13px;
                background: url("~@/assets/image/system/icon-add@2x.png") center no-repeat;
                background-size: 70% 70%;
            }
            .hong{
                border:1px solid #d9342f;
                color:#d9342f;
            }
            .lan{
                border:1px solid #3f8feb;
                color:#3f8feb;
            }
            .lv{
                border:1px solid #05ad5c;
                color:#05ad5c;
            }
            .tehong{
                background: #d9342f;
            }
            .telan{
                background: #3f8feb;
            }
            .telv{
                background: #05ad5c;
            }
        }
        .shengxiao{
            overflow: hidden;
            >div{
                float: left;
                font-size: 22px;
                color:#333;
                width:40px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                margin-right:13px;
                margin-top:6px;
            }
        }
    }
}
</style>

