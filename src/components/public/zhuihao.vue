<template>
<div class="zhuihao-mask">
    <div class="zhuihao-content">
        <div class="title"><span>追号详情</span><span @click="closeDalog"><x-icon type="ios-close-empty" size="40"></x-icon></span></div>
        <div class="content">
            <div ref="Scroll" class="Scroll">
                <div class="xs-container">
                    <div class="xs-content">
                        <div class="list" v-for="(ele,idx) in res.list">
                            <div class="title">
                                <span class="text">
                                    <em>{{ele.title}}</em>
                                </span>
                                <span class="btn" @touchstart="cancelOrider(idx)">撤单</span>
                            </div>
                            <div class="table">
                                <div class="thead"><span>期号</span><span>投注金额</span><span>状态</span></div>
                                <div class="tbody" v-for="ele1 in ele.list"><span>{{ele1.qihao}}</span><span>￥{{ele1.coin}}</span><span>{{ele1.status}}</span></div>
                            </div>
                        </div>
                        <div v-if="res.list.length==0" class="noData margin0">
                            <i class="nodataIcon"></i>
                            <p>暂无数据</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            res:{
                list:[]
            },
            xscroll:'',//0:未开奖 1:中奖 2:未中奖 3:平局 9:撤单
            reg:{
                0:'未开奖',
                1:'中奖',
                2:'未中奖',
                3:'平局',
                9:'撤单',
            }
        }
    },
    created(){
        var that = this
        that.getZhuihao();
        this.$nextTick(()=>{
            that.xscroll = new XScroll({
                renderTo:that.$refs.Scroll,
                lockX:true,
                lockY:false,
                scrollbarY:false,
                scrollbarX:false,
            });
            that.xscroll.render();
        })
    },
    methods:{
        closeDalog(){
            this.$emit('closeDalog',false)
        },
        getZhuihao(){
            var that = this,d = new Date()
            that.$get('myTraceBets',{
                gameid:that.$route.query.id,
            }).then(res=>{
                if(res.code==0){
                    that.res = res.data
                    setTimeout(()=>{
                        that.xscroll.resetSize({top:0});
                    },500)
                }
            })
        },
        //撤单
        cancelOrider(idx){
            console.log(1)
            var that = this
            this.$vux.confirm.show({
                title:'温馨提示',
                content:'确认撤单吗？',
                onConfirm:()=>{
                    var arr = []
                    console.log(that.res);
                    that.res.list[idx].list.forEach(ele => {
                        arr.push(ele.id)
                    });
                    that.$post('cancelBet',{
                        bet_ids:arr.join(','),
                        game_id:that.$route.query.id,
                        qihao:that.$store.state.qihao
                    }).then(res=>{
                        if(res.code==0){
                            that.$vux.loading.show({
                                text: '加载中',
                            })
                            that.getDetails()
                            that.res.list.splice(idx,1)
                            that.$vux.toast.text('撤单成功','bottom')
                            setTimeout(()=>{
                                that.xscroll.resetSize({top:0});
                            },500)
                        }
                    })
                }
            })
        },
        // 获取彩种详情
        getDetails () {
            var that = this
            this.$get('gameDetails', {lottery_id: this.$route.query.id}).then(res => {
                that.$vux.loading.hide();
                if(res.code==0){
                    this.$store.commit('setBetList',res.data.betsList)
                }
            })
        },
    }
}
</script>
<style lang="scss" scoped>
.margin0{
    position: absolute;
    top:50%;
    left: 50%;
    margin-left:-190px;
    margin-top:-131px;
    .nodataIcon{
        margin:0;
    }
}
@keyframes mymove1
{
    0% {
        transform:translateY(-300px);
        opacity: .5;
    }
    100% {
        transform:translateY(0);
        opacity: 1;
    }
}
.zhuihao-mask{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .zhuihao-content{
        animation: mymove1 .5s ease;
        width:80%;
        height: 900px;
        background: #fff;
        border-radius: 10px;
        overflow: hidden;
        >.title{
            height: 80px;
            line-height: 80px;
            background: $theme-color;
            position: relative;
            >span{
                display: block;
            }
            >span:first-child{
                width:100%;
                font-size: 30px;
                color: #fff;
                text-align: center;
            }
            >span:last-child{
                position: absolute;
                top: 0;
                right: 5px;
                height: 80px;
                overflow: hidden;
                font-size: 0;
                width:12%;
                display: flex;
                justify-content: center;
                align-items: center;
                >svg{
                    fill: #fff;
                }
            }
        }
        .content{
            height: calc(100% - 80px);
        }
    }
}
.Scroll{
    height: 100%;
    width: 100%;
    .xs-container{
        width: 100%;
        height: 100%;
        .xs-content{
            min-height: 100%;
            .noMoreData{
                position: absolute;
                top: 50%;
                width:100%;
                margin-top:-30px;
                color:#999;
                font-size: 40px;
                text-align: center;
            }
            >div.list:last-child{
                padding-bottom:35px;
            }
            >div.list{
                margin-left:25px;
                margin-right:25px;
                padding-top:40px;
                position: relative;
                .title{
                    height: 60px;
                    line-height: 60px;
                    font-size: 27px;
                    position: relative;
                    padding-left:25px;
                    margin-bottom:20px;
                    .text{
                        display: block;
                        >em{
                            font-size: 28px;
                        }
                        >em:first-child{
                            color:#333;
                        }
                        >em:last-child{
                            color:#999;
                        }
                    }
                    .btn{
                        position: absolute;
                        top: 0;
                        right:0;
                        display: block;
                        height: 60px;
                        line-height: 58px;
                        text-align: center;
                        color:$theme-color;
                        font-size: 30px;
                        border:$theme-color 1px solid;
                        width:126px;
                        border-radius: 6px;
                    }
                }
                .title:before{
                    position: absolute;
                    top: 50%;
                    margin-top:-18px;
                    left: 0;
                    content:'';
                    display: block;
                    height: 36px;
                    width:6px;
                    background: $theme-color;
                }
                .table{
                    border:#d2d2d2 1px solid;
                    >div:last-child{
                        border:none;
                    }
                    .thead{
                        height: 60px;
                        line-height: 60px;
                        font-size: 28px;
                        color:#999;
                        display: flex;
                        border-bottom:1px solid #d2d2d2;
                        >span{
                            font-size: 28px;
                            text-align: center;
                        }
                        >span:nth-child(1),>span:nth-child(2),>span:nth-child(3){
                            flex: 1;
                        }
                    }
                    .tbody{
                        display: flex;
                        height: 60px;
                        line-height: 60px;
                        border-bottom:1px solid #d2d2d2;
                        >span{
                            font-size: 26px;
                            text-align: center;
                        }
                        >span:nth-child(2){
                            flex: 1;
                            color:$theme-color;
                        }
                        >span:nth-child(1),>span:nth-child(3){
                            flex: 1;
                        }
                    }
                }
            }
        }
    }
}
</style>
