<template>
<div class="main">
    <div class="other-header">
        <i class="back" @click="$root.routerGoBack"></i>
        <div class="title"><span>关注</span></div>
    </div>
    <div class="content">
        <tab class="my-tab" :line-width="2" active-color="#D9342F" custom-bar-width="80px">
            <tab-item selected @on-item-click="onItemClick">关注</tab-item>
            <tab-item @on-item-click="onItemClick">粉丝</tab-item>
        </tab>
        <div class="result-tab">
            <scroller
                height="100%"
                lock-x
                :scrollbar-y='false'
                :use-pulldown='true'
                :use-pullup='true'
                :pulldown-config="$root.pullDownObj"
                :pullup-config="$root.pullUpObj"
                @on-pulldown-loading='refresh'
                @on-pullup-loading='infinite'
                ref="my_scroller">
                <div class="scroller-wrap" :class="{mohu:isSendingHttp}">
                    <div class="pad20"></div>
                    <div class="item" v-if="res.length>0" v-for="(ele,idx) in res">
                        <USERITEM :item="ele" @deletsomeOne="deletsomeOne" :index="idx" :last="res.length-1==idx" :name="active"/>
                    </div>
                    <div v-if="isNoMoreData" class="no-more-data">没有更多数据了</div>
                    <div v-if="isNoneData" class="noData">
                        <i class="nodataIcon"></i>
                        <p>暂无数据</p>
                    </div>
                </div>
            </scroller>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            active:0,
            // isNoneData:false,
            isSendingHttp:false,
            isNoMoreData:false,
            isNoneData:false,
            canceling:false,
            cancelId:null,
            offset:0,
            res:[]
        }
    },
    created(){
        this.getHttp(false,'follows');
    },
    methods:{
        onItemClick(index){
            this.active = index
            this.isSendingHttp = true
            this.isNoMoreData = false
            this.isNoneData = false
            this.$vux.loading.show({
                text: '加载中',
            })
            if(index==0){
                this.getHttp(false,'follows');
            }else{
                this.getHttp(false,'fans');
            }
        },
        refresh(){
            this.isSendingHttp = true
            this.isNoMoreData = false
            this.isNoneData = false
            if(this.active==0){
                this.getHttp(false,'follows');
            }else{
                this.getHttp(false,'fans');
            }
        },
        infinite(){
            if(this.active==0){
                this.getHttp(true,'follows');
            }else{
                this.getHttp(true,'fans');
            }
        },
        deletsomeOne(value){
            var that = this
            that.res.splice(value,1)
        },
        getHttp(bool,url){
            var that = this;
            that.$get(url,{offset:bool?that.offset:0}).then(res=>{
                if(res.code==0){
                    that.$vux.loading.hide()
                    if(bool){
                        //上拉
                        that.res = that.res.concat(res.data.list)
                        if(res.data.length==20){
                            that.offset = res.data.offset
                        }else{
                            that.isNoMoreData = true
                            that.$refs.my_scroller.disablePullup();
                        }
                        that.$refs.my_scroller.donePullup();
                    }else{
                        //下拉
                        that.res = res.data.list
                        console.log(JSON.stringify(res.data)==='[]')
                        if(JSON.stringify(res.data)==='[]'){
                            that.isNoneData = true
                        }
                        if(res.data.offset<20||JSON.stringify(res.data)==='[]'){
                            that.$refs.my_scroller.disablePullup();
                        }else{
                            that.$refs.my_scroller.enablePullup();
                        }
                        that.$refs.my_scroller.donePulldown();
                        that.$refs.my_scroller.reset({top:0});
                        that.offset = res.data.offset
                    }
                    JSON.stringify(res.data)!=='[]'&&res.data.list.forEach(ele => {
                        if(that.active==0){
                            ele['is_follows'] = true
                        }
                    });
                }
                that.isSendingHttp = false
            })
        },
    },
    components:{
        USERITEM(){
            return{
                component:import('@/components/Manage/Follow/Item')
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.scroller-wrap{
    min-height: 1146px;
    position: relative;
    background: #f3f3f3;
    .none-data{
        position: absolute;
        top:50%;
        left: 50%;
        margin-top:-400px;
        margin-left:-130px;
        font-size: 26px;
        color:#666;
        width: 315px;
        height: 35px;
    }
}
.mohu{
    filter: blur(5px);
}
.main{
    height: 100%;
    background: #f3f3f3;
}
.content{
    height: calc(100% - 88px);
    background: #f3f3f3;
    .pad20{
        height: 20px;
        background: #f3f3f3;
    }
    .result-tab{
        background: #f3f3f3;
        position: relative;
        height: calc(100% - 100px);
    }
}
</style>
