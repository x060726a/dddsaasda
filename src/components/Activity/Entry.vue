<template>
<div class="main">
    <TrayHeader :title="'优惠活动'" />
    <a class="kefu" @click="OpenKefu"><i></i>联系客服</a>
    <div class="activity-content">
        <scroller
            height="100%"
            lock-x
            ref="myscroller"
        >
            <div class="scroller-wrap">
                <div class="item" :class="{auto:t===idx+1}"  v-for="(ele,idx) in list">
                    <div class="top" @click="toggle(idx+1)">
                        <img :src="ele.img">
                    </div>
                    <div class="bot">
                        <span>{{ele.name}}</span>
                        <span>截止时间：{{$root.ConversionTimeNYR(ele.freezed_at)}} {{$root.ConversionTimeHour(ele.freezed_at)}}</span>
                    </div>
                    <div class="item-content">
                        <div class="res" v-html="ele.content"></div>
                    </div>
                </div>
            </div>
        </scroller>
    </div>
</div>
</template>
<script>
const TrayHeader = import('../public/rn-header')
export default {
    data(){
        return{
            t:false,
            list:'',
            firmUrl: '', // 客服链接
        }
    },
    created(){
        this.getList();
        this.get_setting();
    },
    methods:{
        // 在线客服链接
        get_setting () {
            this.$get('setting', {}).then(res => {
                if (res.code !== 0) return this.$vux.toast.text(res.msg_zh, 'middle')
                this.firmUrl = res.data.online_service.value
            })
        },
        OpenKefu(){
            if(this.firmUrl==''){
                this.$vux.toast.text('请稍等','bottom')
            }else{
                window.location.href = this.firmUrl
            }
        },
        getList(){
            var that = this;
            that.$vux.loading.show({text: '加载中'})
            that.$get('activityList',{}).then(res=>{
                that.$vux.loading.hide();
                if(res.code==0){
                    that.list = res.data
                }
            })
        },
        toggle(idx){
            this.$refs.myscroller.reset({top:0})
            if(this.t==idx){
                this.t = false
            }else{
                this.t = idx
            }
        }
    },
    components: {
        TrayHeader () {
            return {
                component: TrayHeader
            }
        }
    },
}
</script>
<style lang="scss">
.kefu {
    i {
        float: left; width: 42px; height: 44px; margin-top: -10px; margin-right: 10px;  background: url("~@/assets/image/Log_Reg/service.png") no-repeat center; background-size: cover;
    }
    position: absolute; top: 30px; right: 36px; height: 28px; font-size: 28px; line-height: 28px;
}
.main{
    height: 100%;
    background: #f3f3f3;
}
.auto{
    height: auto!important;
}
.activity-content{
    height: calc(100% - 88px);
    .scroller-wrap{
        min-height: 100%;
    }
    .item{
        background: #fff;
        margin-bottom:20px;
        height: 383px;
        overflow: hidden;
        transition: all .5s ease;
        .top{
            height: 333px;
            padding: 20px 30px 13px 30px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .bot{
            height: 55px;
            line-height: 42px;
            padding-left:20px;
            padding-right:20px;
            padding-bottom:13px;
            span{
                display: block;
            }
            >span:first-child{
                float: left;
                font-size: 30px;
                color: #333333;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            >span:last-child{
                float: right;
                font-size: 24px;
                color: #999999;
            }
        }
        .item-content{
            .res{
                padding:20px;
                padding-top:0;
                table{
                    width: 100%;
                    thead{
                        background: #F3F3F3;
                        text-align: center;
                        height: 70px;
                        >td{
                            height: 70px;
                        }
                    }
                    td{
                        height: 72px;
                        text-align: center;
                        border:1px solid #d2d2d2;
                        vertical-align: middle;
                        font-size: 26px;
                        color: #333333;
                    }
                }
                p{
                    font-size: 26px;
                    color: #333333;
                }
            }
            .itme-title{
                position: relative;
                padding-left:45px;
                padding-right:20px;
                line-height: 80px;
                height: 80px;
                border-bottom:1px solid #d2d2d2;
                >span:first-child{
                    float: left;
                    font-size: 28px;
                    color: #333333;
                }
                >span:last-child{
                    float: right;
                    font-size: 22px;
                    color: #666666;
                }
            }
            .itme-title:before{
                content:'';
                display: block;
                width:6px;
                height: 40px;
                background: $theme-color;
                position: absolute;
                top: 20px;
                left: 20px;
            }
        }
    }
}
</style>
