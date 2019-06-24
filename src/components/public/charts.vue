<template>
<div ref="J_Scroll" class="J_Scroll">
    <div class="xs-container">
        <div class="xs-content" ref="xsContent" :style="'width:'+(chartsData.length)*6.667+2+'vw'">
            <div class="tr" v-for="(ele,key,idx) in chartsData">
                <div class="td" v-for="(value,key,index) in ele">
                    <span v-if="name!='螳螂路'&&['大路','小路'].indexOf(name)>-1" class="nollow" :class="value[0]">{{value[0]=='red'?(ds==0?'大':'双'):(value[0]=='blue'?(ds==0?'小':'单'):'')}}</span>
                    <span v-if="name!='螳螂路'&&['大眼仔','珠盘路'].indexOf(name)>-1" class="hollow" :class="value[0]">{{value[0]=='red'?(ds==0?'大':'双'):(value[0]=='blue'?(ds==0?'小':'单'):'')}}</span>
                    <span v-if="name=='螳螂路'"><i :class="value[0]"></i></span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            ctx:'',
        }
    },
    props:['chartsData','name','ds'],
    created(){
        var that = this
        if(this.chartsData.length<15){
            var num = 15 - this.chartsData.length
            for(var i = 0;i<num;i++){
                this.chartsData.push([[],[],[],[],[],[]])
            }
        }
    },
    mounted(){
        var that = this
        this.$nextTick(()=>{
            var xscroll = new XScroll({
                renderTo:that.$refs.J_Scroll,
                lockX:false,
                lockY:true,
                scrollbarY:false,
                scrollbarX:false,
                preventDefault:false,
                preventTouchMove:false
            });
            xscroll.render();
            xscroll.on('scroll',this._onScroll)
        })
    }
}
</script>
<style lang="less" scoped>
@import '~vux/src/styles/1px.less';
</style>

<style lang="scss" scoped>
.tr:before{
    content:'';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-left:#d2d2d2 1px solid;
    border-bottom:#d2d2d2 1px solid;
}
.tr:last-child:before{
    content:'';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-right:#d2d2d2 1px solid;
}
.J_Scroll{
    height: 100%;
    width: 100%;
    overflow-x: scroll;
    .xs-container{
        width: 100%;
        height: 100%;
        .xs-content{
            height: 100%;
            .tr:last-child{
                border-bottom:1px solid #e4e4e4;
            }
            .tr{
                float: left;
                width:50px;
                position: relative;
                .td{
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: relative;
                    >span{
                        font-size: 22px;
                        display: flex;
                        width:36px;
                        height: 36px;
                        text-align: center;
                        justify-content: center;
                        align-items: center;
                        border-radius: 50%;
                        margin-left:5px;
                        >i{
                            display: block;
                            width: 100%;
                            height: 4px;
                            border-radius: 1px;
                            transform: rotate(-45deg);
                        }
                        >i.red{
                            background: $theme-color;
                        }
                        >i.blue{
                            background: #4393ff;
                        }
                    }
                    .hollow{
                        color:#fff;
                        line-height: 38px;
                    }
                    .hollow.red{
                        background:$theme-color;
                    }
                    .hollow.blue{
                        background:#4393ff;
                    }

                    .nollow{
                        color:#4393ff;
                        line-height: 37px;
                    }
                    .nollow.red{
                        color:$theme-color;
                        border:1px solid  $theme-color;
                    }
                    .nollow.blue{
                        color:#4393ff;
                        border:1px solid  #4393ff;
                    }
                }
                .td:before{
                    content:'';
                    display: block;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-top:#d2d2d2 1px solid;
                }
            }
            .tr:before{
                content:'';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-left:#d2d2d2 1px solid;
                border-bottom:#d2d2d2 1px solid;
            }
            .tr:last-child:before{
                content:'';
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-right:#d2d2d2 1px solid;
            }
        }
    }
}
</style>
