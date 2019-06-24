<template>
<div class="item-main">
    <div>{{res.qihao}}</div>
    <div>
        <div
            :class="{hong:(res.data.split(',')[0]*1+res.data.split(',')[1]*1+res.data.split(',')[2]*1)>9}"
        >{{(res.data.split(',')[0]*1+res.data.split(',')[1]*1+res.data.split(',')[2]*1)<=9?'小':'大'}}</div>
        <div>
            <span
                :class="{active:(res.data.split(',')[0]*1+res.data.split(',')[1]*1+res.data.split(',')[2]*1)%2==0}"
            >{{(res.data.split(',')[0]*1+res.data.split(',')[1]*1+res.data.split(',')[2]*1)%2==0?'双':'单'}}</span>
        </div>
        <div>
            <span v-if="res.data.split(',')[0]*1==res.data.split(',')[1]*1&&res.data.split(',')[1]*1==res.data.split(',')[2]*1" class="active">{{res.data.split(',')[0]}}</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            bonus:[]
        }
    },
    props:['res'],
    methods:{

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
        width:300px;
        overflow: hidden;
        font-size: 22px;
        // border-right:1px solid #d2d2d2;
    }
    >div:last-child{
        display: flex;
        width:calc(100% - 300px);
        >div{
            flex: 1;
        }
        >div.hong{
            color:$theme-color;
        }
        >div{
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                display: block;
                width: 42px;
                height: 42px;
                line-height: 42px;
                background: $bg-color;
                color: #333;
                border-radius: 5px;
            }
            span.active{
                background: $theme-color;
                color:#fff;
            }
            // span.long{
            //     background: $theme-color;
            // }
            // span.hu{
            //     background: $bg-color;
            //     color:#333;
            // }
            // span.he{
            //     background: #05ad5c;
            //     color:#fff;
            // }
        }
    }
}
</style>
