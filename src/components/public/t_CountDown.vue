<template>
    <div class="time-wrap">
        <div :class="stylename" v-show="!isCloseGame&&!isOpening&&lotteryObj!=''&&!isClose&&stylename!=''">
            <span>{{Countdown.sy_h<10?'0'+Countdown.sy_h:Countdown.sy_h}}</span>
            <em>:</em>
            <span>{{Countdown.sy_m<10?'0'+Countdown.sy_m:Countdown.sy_m}}</span>
            <em>:</em>
            <span>{{Countdown.sy_s<10?'0'+Countdown.sy_s:Countdown.sy_s}}</span>
        </div>
        <div style="color:#d9342f" v-show="!isCloseGame&&!isOpening&&lotteryObj!=''&&!isClose&&stylename==''">{{Countdown.sy_h<10?'0'+Countdown.sy_h:Countdown.sy_h}}:{{Countdown.sy_m<10?'0'+Countdown.sy_m:Countdown.sy_m}}:{{Countdown.sy_s<10?'0'+Countdown.sy_s:Countdown.sy_s}}</div>
        <div :class="{textCenter:stylename}" style="color:#d9342f" v-show="isOpening&&!isClose">开奖中</div>
        <div :class="{textCenter:stylename}" style="color:#d9342f" v-show="isCloseGame&&!isOpening&&!isClose">已封盘</div>
        <div :class="{textCenter:stylename}" style="color:#d9342f" v-show="isClose">已关闭</div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            timer:'',
            isOpening:false,
            isCloseGame:false,
            isClose:false,
            Countdown:{
                sy_h:0,
                sy_m:0,
                sy_s:0
            },
        }
    },
    watch:{
        lotteryObj(val,oval){
            this.$set(this.Countdown,'sy_h',0)
            this.$set(this.Countdown,'sy_m',0)
            this.$set(this.Countdown,'sy_s',0)
            clearTimeout(this.timer)
            this.init();
        },
        deep:true
    },
    props:{
        index:{
            default:''
        },
        lotteryObj:{
            default:''
        },
        stylename:{
            type:String,
            default:''
        },
        id:{
            type:Number,
            default:0
        }
    },
    created(){
        this.init();
    },
    methods:{
        init(){
            var time,that = this;
            this.isOpening=false
            this.isCloseGame=false
            this.$emit('isOpening',false)
            this.$emit('isCloseGame',false)
            if(this.lotteryObj.deadline*1<0||!this.lotteryObj.deadline){
                this.isClose = true
                this.$emit('isClose',this.index)
                return false
            }
            if(this.lotteryObj.server_time>this.lotteryObj.ftime){
                this.isCloseGame = true,
                this.$emit('isCloseGame',true)
                this.goNextTime()
            }else{
                this.isOpening = false;
                this.$emit('isOpening',false)
                this.fp_Countdown()
            }
        },
        //封盘倒计时
        fp_Countdown(){
            var deviceTime = new Date()*1//设备时间
            this.timeCountDeviceTime(this.lotteryObj.ftime*1000,deviceTime,this.lotteryObj.server_time*1000,this.goNextTime,false);
        },
        //封盘截止剩余时间--距离下期开奖时间
        goNextTime(){
            var deviceTime = new Date()*1//设备时间
            this.timeCountDeviceTime(this.lotteryObj.deadline*1000,deviceTime,this.lotteryObj.ftime*1000,this.fp_Countdown,true);
        },
        timeCountDeviceTime(endTime, deviceTime, serverTime, next, isGetNext){
            let that = this,sy_h,sy_m,sy_s,sy_time = endTime - Date.parse(new Date()) - serverTime + deviceTime,newStepTime,sy_xsd;
            if(sy_time<0){
                if(isGetNext){
                    that.$emit('reStart',{index:that.index,id:that.id})
                }else{
                    that.isCloseGame = true;
                    that.$emit('isCloseGame',true)
                    clearTimeout(this.timer)
                    next();
                    return;
                }
            }
            newStepTime = sy_time/1000;// 转化成秒
            sy_xsd = newStepTime.toString().split('.')[1]*1
            sy_h = parseInt(newStepTime/3600)||0 //剩余小时
            sy_m = parseInt(newStepTime/60)%60||0// 剩余分
            sy_s = parseInt(newStepTime%60)||0// 剩余秒
            that.$set(that.Countdown,'sy_h',sy_h)
            that.$set(that.Countdown,'sy_m',sy_m)
            that.$set(that.Countdown,'sy_s',sy_s)
            if(that.isCloseGame&&that.Countdown.sy_s<3&&isGetNext){
                that.isOpening = true;
                that.$emit('isOpening',true)
            }
            this.timer = setTimeout(()=>{
                that.timeCountDeviceTime(endTime,deviceTime,serverTime,next,isGetNext)
            },1000)
        },
    },
    destroyed(){
        clearTimeout(this.timer)
    }
}
</script>
<style lang="scss" scoped>
.time-wrap{
    height: 40px;
    padding-top:10px;
}
.detailTime{
    line-height: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    >span{
        width:40px;
        text-align: center;
        background: #000;
        color:#fff;
        border-radius: 10px;
    }
    >em{
        width: 20px;
        text-align: center;
    }
}
.textCenter{
    text-align: center;
}
</style>
