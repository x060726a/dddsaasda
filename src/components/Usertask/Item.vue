<template>
<div class="item">
    <div class="icon icon-done" v-if="item.status==2"></div>
    <div class="icon icon-cz" v-else :class="{'icon-bet':item.lottery_id}"></div>
    <div class="text">
        <div class="top"><span>{{item.title}}</span><span><em>{{item.coin}}</em>/{{item.target_coin}}{{taskActive==1?'元':''}}</span></div>
        <div class="bot">
            <p>{{item.reward}}元</p>
            <div @click="toggleText"><span>查看详情</span><i :class="{'icon-shang':active}"></i></div>
        </div>
        <div class="result-text" ref="restext">
            <div class="pad20"></div>
            <div v-html="item.rules"></div>
        </div>
        <div class="goRoute" v-if="item.status==0&&taskActive==1" @click="goRouter">去完成</div>
        <div class="goRoute" v-if="item.status==1&&taskActive==1" @click="doneTask(item.id)">领取</div>
        <div class="goRoute" v-if="item.status==2&&taskActive==1" :class="{done:item.status==2}">已领取</div>

        <div class="goRoute" v-if="item.coin<item.target_coin&&taskActive==2" @click="goRouter">去完成</div>
        <div class="goRoute" v-if="item.coin>=item.target_coin&&item.status==1&&taskActive==2" @click="doneTask(item.id)">领取</div>
        <div class="goRoute" v-if="item.coin>=item.target_coin&&taskActive==2&&item.status==2" :class="{done:item.status==2}">已领取</div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            active:false,
            isAnimate:false,
            lottery:{
                '10':'ssc_cq',
                '11':'ssc_fenfen',
                '12':'ssc_sanfen',
                '20':'pk10_bj',
                '21':'pk10_jisu',
                '22':'pk10_fenfen',
                '23':'xyft',
                '30':'28_lucky',
                '70':'6_hk',
                '71':'6_jisu',
                '40':'shaibao',
                '50':'niuniu',
            }
        }
    },
    watch:{
        '$store.state.taskDownShowActive'(val,oval){
            if(val!=this.index&&this.active){
                this.$refs.restext.style = "height:0;position:relative;opacity:0;"
                setTimeout(()=>{
                    this.$refs.restext.style = "position:absolute;opacity:0;"
                    this.isAnimate = false;
                },500)
                this.active = !this.active;
            }
        }
    },
    props:['item','index','type','taskActive'],
    methods:{
        goRouter(){
            var that = this
            if(that.item.lottery_id){
                this.$router.push({path:that.lottery[that.item.lottery_id],query:{id:that.item.lottery_id}})
            }else{
                this.$router.push({path:'/recharge'})
            }
        },
        doneTask(id){
            var that = this
            if(that.item.coin>=that.item.target_coin||that.item.status==1){
                that.$post('getTask',{id:id}).then(res=>{
                    console.log(res); 
                    if(res.code==0){
                        that.$vux.toast.text(res.msg_zh,'bottom')
                        this.$set(this.item,'status',2)
                        this.$emit('status',res.data)
                    }
                })
            }else{
                that.$vux.toast.text('暂时未达成要求','bottom')
            }
        },
        toggleText(){
            this.$store.commit('taskDownShowActive',this.index)
            var height = this.$refs.restext.clientHeight
            if(this.isAnimate) return;
            this.isAnimate = true;
            if(!this.active){
                this.$refs.restext.style = "height:0;"
                setTimeout(()=>{
                    this.$refs.restext.style = "position:relative;opacity:1;height:"+height+"px;"
                },20)
                setTimeout(()=>{
                    this.isAnimate = false;
                },500)
            }else{
                this.$refs.restext.style = "height:0;position:relative;opacity:0;"
                setTimeout(()=>{
                    this.$refs.restext.style = "position:absolute;opacity:0;"
                    this.isAnimate = false;
                },500)
            }
            this.active = !this.active;
        }
    }
}
</script>
<style lang="scss" scoped>
.item{
    overflow: hidden;
    padding-bottom:19px;
    border-bottom:#d2d2d2 1px solid;
    position: relative;
    background: #fff;
    .goRoute{
        position: absolute;
        top: 80px;
        right: 30px;
        width:140px;
        height: 60px;
        line-height: 60px;
        background: #d9342f;
        color:#fff;
        font-size: 30px;
        border-radius: 6px;
        text-align: center;
    }
    .done{
        background: #999;
    }
    .icon{
        margin:30px;
        float: left;
        width: 100px;
        height: 100px;
    }
    .icon-cz{
        background: url('~@/assets/image/system/icon-edit1@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .icon-done{
        background: url('~@/assets/image/system/icon-edit4@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .icon-bet{
        background: url('~@/assets/image/system/icon-edit2@2x.png') no-repeat;
        background-size: 100% 100%;
    }
    .text{
        padding-top:20px;
        float: left;
        width:calc(100% - 160px);
        .top{
            line-height: 35px;
            margin-bottom:20px;
            span:first-child{
                font-size: 30px;
                color:#333;
            }
            span:last-child{
                font-size: 24px;
                float: right;
                color:#999;
                padding-right:50px;
                em{
                    color:#d9342f;
                }
            }
        }
        .bot{
            p{
                font-size: 28px;
                color:#d9342f;
                line-height: 35px;
                margin-bottom:20px;
            }
            >div{
                line-height: 30px;
                height: 30px;
                span{
                    font-size: 26px;
                    color:#999;
                    float: left;
                }
                i{
                    display: block;
                    float: left;
                    width:40px;
                    height: 30px;
                    background: url('~@/assets/image/system/icon-unfold@2x.png') center center no-repeat;
                    background-size: 40px 20px;
                    margin-left:10px;
                    transform: rotate(0deg);
                }
                i.icon-shang{
                    transform: rotate(180deg);
                }
            }
        }
        .result-text{
            padding-right:20px;
            font-size: 26px;
            color:#999;
            position: absolute;
            opacity: 0;
            transition: all .5s;
            .pad20{
                height: 20px;
            }
        }
    }
}
</style>
