<template>
<div class="main-item" :class="{'last-main-item':last}">
    <div class="gz-left" @touchstart="goInfo"><img :src="item.avatar"></div>
    <div class="gz-right">
        <h1 @click="goInfo">{{item.nickname}}</h1>
        <p @click="goInfo">关注{{item.follows_num}} | 粉丝{{item.fans_num}}</p>
        <div class="gz-btn" :class="{active:item.is_follows}" v-if="(name == 1 && item.initiate != 0) || (this.name == 0)">
            <spinner v-show="sendIng" type="spiral" size="16px" color="#d9342f"></spinner>
            <span v-show="item.is_follows&&!sendIng" @click="cancelFollows(item.uid||item.to_uid)">已关注</span>
            <span v-show="!item.is_follows&&!sendIng" @click="getFollow(item.uid)">关注</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            sendIng:false
        }
    },
    watch:{
        item(val,oval){
            this.sendIng = false
        }
    },
    props:['item','index','name','last'],
    methods:{
        //取关
        cancelFollows(id){
            var that = this
            if(this.sendIng) return;
            this.sendIng = true
            that.$post('cancelFollows',{to_uid:id}).then(res=>{
                if(res.code==0){
                    that.$vux.toast.text('取关成功','bottom');
                    if(that.name==1){
                        this.item.is_follows = false
                    }
                    if(that.name==0){
                        this.$emit('deletsomeOne',this.index)
                    }
                }
                that.sendIng = false
            })
        },
        //关注
        getFollow(id){
            var that = this
            if(this.sendIng) return;
            this.sendIng = true
            that.$post('follUser',{to_uid:id}).then(res=>{
                if(res.code==0){
                    this.item.is_follows = true
                    that.$vux.toast.text('关注成功','bottom');
                }
                that.sendIng = false
            })
        },
        goInfo () {
            if (this.name == 1 && this.item.initiate == 0) return false
            this.$router.push({path: '/information', query: { uid: Number(this.item.to_uid) || Number(this.item.uid) }})
        }
    }
}
</script>
<style lang="scss" scoped>
.last-main-item::before{
    display: none!important;
}
.main-item::before{
    content:'';
    height: 1px;
    width:616px;
    display: block;
    position: absolute;
    bottom:0;
    right:0;
    border-bottom: 1px solid #D2D2D2;
}
.main-item{
    padding:30px 0 28px 20px;
    overflow: hidden;
    position: relative;
    background: #fff;
    .gz-left{
        width:100px;
        height: 100px;
        background: $bg-color;
        overflow: hidden;
        border-radius: 50%;
        margin-right:15px;
        float: left;
        img{
            width:100%;
        }
    }
    // .last{
    //     border-bottom: none!important;
    // }
    .gz-right{
        float: left;
        width:calc(100% - 115px);
        h1{
            font-size: 28px;
            color: #333333;
            line-height: 40px;
            margin-top:14px;
            margin-bottom:3px;
        }
        p{
            font-size: 24px;
            line-height: 33px;
            color: #999999;
        }
        p.sub{
            margin-top:4px;
            em{
                color:$theme-color;
                padding-left:5px;
                padding-right:5px;
            }
        }
        .gz-btn{
            width:109px;
            position: absolute;
            top: 50%;
            right: 30px;
            margin-top:-25px;
            background: $theme-color;
            height: 50px;
            font-size: 26px;
            line-height: 48px;
            color:#fff;
            text-align: center;
            border-radius: 6px;
            background: $theme-color;
            .vux-spinner{
                stroke: $theme-color;
                fill: $theme-color;
            }
        }
        .active{
            border:1px solid $theme-color;
            line-height: 46px;
            background: #fff;
            color:$theme-color;
        }
    }
}
</style>
