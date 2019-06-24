<template>
<div class="item-main">
    <div>{{res.qihao}}</div>
    <div>
        <div class="ball">
            <span><i>{{res.data.split(',')[0]}}</i></span>
            <span class="jiahao"></span>
            <span><i>{{res.data.split(',')[1]}}</i></span>
            <span class="jiahao"></span>
            <span><i>{{res.data.split(',')[2]}}</i></span>
            <span>=</span>
            <span><i class="teball">{{getBall()}}</i></span>
        </div>
        <div>
            <span>{{getBall()<=13?( getBall()<=4?'极小':'小' ):( getBall()>=23?'极大':'大' )}},{{getBall()%2==0?'双':'单'}}</span>
        </div>
        <div>
            <span
                v-if="getColor()!='和'"
                :class="{
                    hong:getColor()=='红',
                    lan:getColor()=='蓝',
                    lv:getColor()=='绿'
                }"
            >{{getColor()}}波</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            bonus:[],
            ballColor:{
                '绿':[1,4,7,10,16,19,22,25],
                '蓝':[2,5,8,11,17,20,23,26],
                '红':[3,6,9,12,15,18,21,24]
            }
        }
    },
    props:['res'],
    methods:{
        getColor(){
            var ball = this.res.data.split(',')[0]*1+this.res.data.split(',')[1]*1+this.res.data.split(',')[2]*1,color;
            if(ball == 13 || ball == 14 || ball == 27) return '和';
            for(var key in this.ballColor){
                if(this.ballColor[key].indexOf(ball)>-1){
                    color = key
                }
            }
            return color;
        },
        getBall(){
            return this.res.data.split(',')[0]*1+this.res.data.split(',')[1]*1+this.res.data.split(',')[2]*1
        }
    }
}
</script>
<style lang="scss" scoped>
.item-main{
    border-bottom:1px solid #d2d2d2;
    background: #fff;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color:#666;
    >div{
        float: left;
        color: #3f8feb;
        font-size: 24px;
        height: 80px;
    }
    >div:first-child{
        width:180px;
        overflow: hidden;
        font-size: 22px;
    }
    >div:last-child{
        display: flex;
        width:calc(100% - 180px);
        >div{
            flex: 1;
        }
        >div:nth-child(1){
            flex: 4;
        }
        >div>span.hong{
            color:$theme-color;
        }
        >div>span.lan{
            color:#3F8FEB;
        }
        >div>span.lv{
            color:#05ad5c
        }
        >div.ball{
            display: flex;
            >span{
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 22px;
                i{
                    display: block;
                    width:42px;
                    height: 42px;
                    line-height: 40px;
                    border:1px solid #3F8FEB;
                    color:#3F8FEB;
                    border-radius: 50%;
                }
                i.teball{
                    background: $theme-color;
                    border:1px solid $theme-color;
                    color:#fff;
                }
            }
            >span.jiahao{
                margin-right:13px;
                background: url('~@/assets/image/system/icon-add@2x.png') center no-repeat;
                background-size: 20px 20px;
            }
        }
    }
}
</style>
