<template>
<div class="wenlu-content">
    <div class="wenlu-button-tab">
        <x-icon class="close" @click="$emit('isClose','1')" type="ios-close-empty" size="35"></x-icon>
        <span @click="buttonTab(0)" :class="{active:buttonTabActive==0}">大小问路</span>
        <span @click="buttonTab(1)" :class="{active:buttonTabActive==1}">单双问路</span>
    </div>
    <div class="charts-list">
        <div class="weblu-tab-wrap" v-if="subTab[title].length>0">
            <div id="weblu-tab-scroll" ref="scroll">
                <div class="xs-container">
                    <div class="xs-content" ref="xsContent" :style="'width:'+subTab[title].length*18.667+'vw'">
                        <span class="span" :class="{activeS:active==idx}" @click="onItemclick(idx)" v-for="(ele,idx) in subTab[title]">{{ele}}</span>
                        <div class="active" :style="'left:'+active*18.667+'vw'"></div>
                    </div>
                </div>
            </div>
            <div class="icon-jiantou"><x-icon class="wenllu-icon-down" type="ios-arrow-down" :class="{showDown:isSubTab}" @click="isSubTab=!isSubTab" size="30"></x-icon></div>
            <div class="wenlu-list-item" v-if="isSubTab">
                <span :class="{active:active==idx}" v-for="(ele,idx) in subTab[title]" @click="onItemclick1(idx)">{{ele}}</span>
            </div>
        </div>
        <div class="pad20"></div>
        <div class="list-warp">
            <div v-for="(ele,key,idx) in luzhuArr" class="list">
                <p>{{ele}}</p>
                <div class="item-wrap">
                    <div class="spinner-wrap" v-show="!zsData"><spinner type="ios" size="40px"></spinner></div>
                    <CHARTS v-if="zsData" :chartsData="zsData[key]" :name="ele" :ds="buttonTabActive"/>
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
            xscroll:'',
            buttonTabActive:0,
            active:0,
            isSubTab:false,
            subTab:{
                '重庆时时彩':['猜总和','第一球','第二球','第三球','第四球','第五球'],
                '分分彩':['猜总和','第一球','第二球','第三球','第四球','第五球'],
                '三分彩':['猜总和','第一球','第二球','第三球','第四球','第五球'],
                '北京PK10':['冠军','亚军','季军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
                '极速赛车':['冠军','亚军','季军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
                '分分PK10':['冠军','亚军','季军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
                '幸运飞艇':['冠军','亚军','季军','第三名','第四名','第五名','第六名','第七名','第八名','第九名','第十名'],
                '幸运28':[],
                '加拿大28':[],
                '香港六合彩':['正码总和','正1特','正2特','正3特','正4特','正5特','正6特','特码'],
                '极速六合彩':['正码总和','正1特','正2特','正3特','正4特','正5特','正6特','特码'],
                '欢乐骰宝':['猜总和','第一骰','第二骰','第三骰'],
                '百人牛牛':['猜总和','第一张','第二张','第三张','第四张','第五张'],
            },
            luzhuArr:{
                'bigRoad':'大路',
                'smallRoad':'小路',
                'dyzRoad':'大眼仔',
                'zlRoad':'螳螂路',
                'zhupanRoad':'珠盘路',
            },
            spinnerType:['android','ios','bubbles','circles','crescent','dots','lines','ripple','spiral'],
            zsData:null
        }
    },
    props:['lotteryid','lotteryData','isActive','title'],
    mounted(){
        var that = this
        this.$nextTick(()=>{
            if(that.$refs.scroll){
                that.xscroll = new XScroll({
                    renderTo:that.$refs.scroll,
                    lockX:false,
                    lockY:true,
                    scrollbarY:false,
                    scrollbarX:false,
                    preventDefault:false
                });
                that.xscroll.render();
            }
        })
    },
    created(){
        this.getCharst()
    },
    methods:{
        onItemclick1(index){
            this.active = index
            this.zsData = null
            this.isSubTab = false
            this.xscroll.scrollLeft((index*70)-150,500)
            this.getCharst()
        },
        onItemclick(index){
            this.active = index
            this.zsData = null
            this.isSubTab = false
            this.getCharst()
        },
        buttonTab(index){
            this.buttonTabActive = index
            this.zsData = null
            this.getCharst()
        },
        getCharst(){
            var that = this
            that.$get('askRoad',{
                lottery_id:that.lotteryid,
                ask_type:that.buttonTabActive,
                pos_key:that.active
            }).then(res=>{
                if(res.code==0){
                    this.zsData = res.data
                }
            })
        }
    },
    components:{
        CHARTS(){
            return{
                component:import('@/components/public/charts.vue')
            }
        }
    },
    destroyed(){
        this.zsData = null
    }
}
</script>
<style lang="scss" scoped>
.pad20{
    height: 20px;
    background: #f7f7f7;
}
.wenlu-content{
    height: 100%;
    padding-top:20px;
    .wenlu-button-tab{
        display: flex;
        height: 80px;
        line-height: 80px;
        font-size: 34px;
        color:$theme-color;
        justify-content: center;
        align-items: center;
        margin-bottom:20px;
        position: relative;
        span{
            width:250px;
            text-align: center;
            border:1px solid $theme-color;
        }
        span:nth-child(2){
            border-right:none;
            border-radius: 12px 0 0 12px;
        }
        span:nth-child(3){
            border-radius: 0 12px 12px 0;
        }
        >span.active{
            background: $theme-color;
            color:#fff;
        }
        .close{
            position: absolute;
            top: -18px;
            right:8px;
            fill: #999;
        }
    }
    .charts-list{
        padding-bottom:20px;
        height: calc(100% - 100px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        .list-warp{
            .list{
                padding-left:45px;
                position: relative;
                margin-top:20px;
                p{
                    font-size: 28px;
                    color:#000;
                    height: 30px;
                    line-height: 30px;
                    margin-bottom:20px;
                }
                .item-wrap{
                    min-height: 290px;
                    position: relative;
                    .spinner-wrap{
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        margin-top:-40px;
                        margin-left:-40px;
                        width:80px;
                        height: 80px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                }
            }
            .list::before{
                display: block;
                content:'';
                height: 351px;
                width:5px;
                position: absolute;
                left: 20px;
                top:0px;
            }
            >div:nth-child(1):before{
                background: #fbd302;
            }
            >div:nth-child(2):before{
                background: #fb6d05;
            }
            >div:nth-child(3):before{
                background: #00a29c;
            }
            >div:nth-child(4):before{
                background: #9966cc;
            }
            >div:nth-child(5):before{
                background: #b60b9b;
            }
        }
        .weblu-tab-wrap::before{
            content:'';
            display: block;
            height: 1px;
            width: 100%;
            background: #d2d2d2;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 2;
        }
        .weblu-tab-wrap{
            height: 80px;
            position: relative;
            z-index: 2;
            #weblu-tab-scroll{
                overflow: hidden;
                position: absolute;
                top: 0;
                left: 0;
                padding-left:20px;
                width:calc(85% + 20px);
                background: #fff;
            }
            .xs-content{
                overflow: hidden;
                position: relative;
                span{
                    display: block;
                    float: left;
                    width:140px;
                    height: 80px;
                    line-height: 80px;
                    font-size: 32px;
                    text-align: center;
                    color:#999;
                }
                >span.activeS{
                    color:$theme-color;
                }
                .active{
                    position: absolute;
                    bottom:0px;
                    background: $theme-color;
                    width:140px;
                    height: 5px;
                }
            }
            .icon-jiantou{
                position: absolute;
                top: 0;
                right: 0;
                height: 80px;
                width: 92px;
                background: #fff;
            }
            .wenllu-icon-down{
                position: absolute;
                right: 10px;
                top: 10px;
                fill: #999;
                transition: all .3s ease;
            }
            .showDown{
                transform: rotate(180deg);
            }
            @keyframes mymove1
            {
                from {transform:translateY(-100%);}
                to {transform:translateY(0);}
            }
            .wenlu-list-item{
                width:100%;
                padding:20px;
                background: #f5f5f5;
                position: absolute;
                top: 100px;
                z-index: -1;
                animation: mymove1 .3s ease;
                >span{
                    display: block;
                    margin-right:24px;
                    margin-bottom:20px;
                    width:159px;
                    height: 74px;
                    line-height: 72px;
                    text-align: center;
                    border:#999 1px solid;
                    font-size: 32px;
                    color:#999;
                    float: left;
                    border-radius: 6px;
                }
                >span.active{
                    border:$theme-color 1px solid;
                    color:#fff;
                    line-height: 72px;
                    background: $theme-color;
                }
                >span:nth-child(4n){
                    margin-right:0
                }
            }
        }
    }
}
</style>
