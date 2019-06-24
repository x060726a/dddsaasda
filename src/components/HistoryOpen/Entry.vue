<template>
<div class="main">
    <header class="headTop">
        <span @touchstart.stop="showpanel()">全部彩种<i class="i_more" ref="i_more"></i></span>
        <!-- <i class="icon-left" @touchstart.stop="$router.push('/')"></i> -->
    </header>
    <div class="popup-lottery-mask" v-show="showpanelTitle" @click="showpanel">
        <div class="popup-lottery-panel" ref="panel">
            <div :class="{active:$route.query.name==ele.title}" @click="$router.push({path:'/historyOpenDetail',query:{id:ele.type,name:ele.title,isFromList:true}})" v-for="ele in BonusList">{{ele.title}}</div>
        </div>
    </div>
    <div class="content" ref="content">
        <div class="xs-container">
            <div class="xs-content">
                <div v-if="res.length>0" v-for="ele in res" @click="$router.push({path:'/historyOpenDetail',query:{id:ele.type,name:ele.title,isFromList:true}})"><components :isDetail="false" class="border" :res="ele" :is="lotteryName(ele.title)"/></div>
            </div>
        </div>
    </div>
</div>
</template>
<script>

export default {
    data(){
        return{
            num:0,
            res:[],
            xscroll:'',
            showpanelTitle:false,
            BonusList:[],
        }
    },
    computed:{
        add(){
            var ten = 10
            return this.num + 10
        }
    },
    created(){
        var that = this
        that.$nextTick(()=>{
            that.xscroll = new XScroll({
                renderTo:that.$refs.content,
                lockX:true,
                lockY:false,
                scrollbarY:false,
                scrollbarX:false,
                preventDefault:false,
            });
        })
        that.getNewBonus();
    },
    methods:{
        getNewBonus(){
            this.$vux.loading.show({text: '加载中'})
            this.$get('LotteryNewBonus',{}).then(res=>{
                if(res.code==0){
                    this.res = res.data
                    this.BonusList = res.data
                    setTimeout(()=>{
                        this.$nextTick(()=>{
                            this.xscroll.render();
                            this.xscroll.resetSize({top:0});
                        })
                    },500)
                }
            })
        },
        addnum(){
            this.num = this.num + 1
        },
        showpanel(){
            if(this.showpanelTitle){
                this.$refs.panel.className = 'popup-lottery-panel hide'
                this.$refs.i_more.style.cssText = 'transform: rotate(0)'
                setTimeout(()=>{
                    this.showpanelTitle = false
                },500)
            }else{
                this.showpanelTitle = true
                setTimeout(()=>{
                    this.$refs.panel.className = 'popup-lottery-panel show'
                    this.$refs.i_more.style.cssText = 'transform: rotate(180deg)'
                },20)
            }
        },
        lotteryName(name){
            let obj = {
                'LSPK10':['北京PK10','极速赛车','分分PK10','幸运飞艇'],
                'LSSSC':['重庆时时彩','分分彩','三分彩'],
                'LSLHC':['香港六合彩','极速六合彩'],
                'LSLUCKY':['幸运28'],
                'LSHLTB':['欢乐骰宝'],
                'LSBRNN':['百人牛牛']
            },typeName;
            for(var key in obj){
                if(obj[key].indexOf(name)>-1){
                    typeName = key
                }
            }
            return typeName;
        }
    },
    components:{
        LSPK10(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_PK10')
            }
        },
        LSSSC(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_时时彩')
            }
        },
        LSLHC(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_六合彩')
            }
        },
        LSLUCKY(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_幸运彩票')
            }
        },
        LSHLTB(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_欢乐骰宝')
            }
        },
        LSBRNN(){
            return {
                component: import('@/components/HistoryOpen/Module/历史_百人牛牛')
            }
        },
    }
}
</script>
<style lang="scss" scoped>
.main{
    height: 100%; background: $bg-color;
    .headTop {
        position: relative; z-index: 2; width: 100%; background: #D9342F; color: #fff; font-size: 36px; text-align: center;
        span {
            position: relative; display: inline-block; height: 88px; line-height: 88px; padding-right: 60px;
            .i_more {
                position: absolute; top: 32px; right: 0; width: 40px; height: 23px; background: url("~@/assets/image/system/cp-icon-down.png") no-repeat center; background-size: cover;
                transition: all .3s ease-in-out;
            }
        }
        .icon-left {
            position: absolute; top: 22px; left: 20px; width: 26px; height: 44px; background: url("~@/assets/image/system/headback.png") no-repeat center; background-size: cover;
        }
    }
}
.content{
    height: calc(100% - 88px);
}
.border{
    margin-bottom:20px;
    border-bottom:none!important;
}
.popup-lottery-mask{
    background: rgba(0,0,0,.5);
    position: absolute;
    z-index: 1;
    top:88px;
    left: 0;
    width:100%;
    height: calc(100% - 88px);
    .popup-lottery-panel{
        padding:30px 45px;
        overflow: hidden;
        background: #fff;
        transition: all .5s;
        transform: translateY(calc(-100% - 100px));
        >div{
            width:200px;
            height: 80px;
            line-height: 80px;
            float: left;
            font-size: 30px;
            color:#333;
            text-align: center;
            border:1px solid #d2d2d2;
            margin-right:30px;
            margin-bottom:30px;
            border-radius: 5px;
        }
        >div.active{
            border:1px solid $theme-color;
            color:$theme-color;
        }
        >div:nth-child(3n){
            margin-right:0;
        }
    }
    .show{
        transform: translateY(0);
    }
}
</style>
