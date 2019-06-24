<template>
<div class="usertask-content">
    <TrayHeader :title="title" />
    <tab class="my-tab" :line-width="2" active-color="#D9342F" custom-bar-width="80px">
        <tab-item selected @on-item-click="onItemClick">个人任务</tab-item>
        <tab-item @on-item-click="onItemClick">今日任务</tab-item>
        <tab-item @on-item-click="onItemClick">任务达成</tab-item>
    </tab>
    <div class="tab-content">
        <div class="pad"></div>
        <USERTASK v-if="taskActive==0&&items.length>0" :res="items[taskActive].list"/>
        <TODATTASK v-if="taskActive==1&&items.length>0" :taskActive="taskActive" @status="status" :res="items[taskActive].list"/>
        <DONETASK v-if="taskActive==2&&items.length>0" :taskActive="taskActive" :res="items[taskActive].list"/>
    </div>
</div>
</template>
<script>
const TrayHeader = import('../public/rn-header')
const usertask = import('@/components/Usertask/个人任务')
const todaytask = import('@/components/Usertask/今日任务')
const donetask = import('@/components/Usertask/任务达成')
import { Tab, TabItem } from 'vux'
import { mapGetters } from 'Vuex'
export default {
    data(){
        return{
            title: '有奖任务',
            active:0,
            items:[],
            timer:'',
        }
    },
    computed:{
        ...mapGetters(['taskActive'])
    },
    watch:{
        '$store.state.taskActive'(val,oval){
            if(val>oval){
                this.$store.commit('taskTransitionName','left')
            }else{
                this.$store.commit('taskTransitionName','right')
            }
        }
    },
    created(){
        this.$store.commit('taskActive',0)
        this.getTask()
    },
    methods:{
        onItemClick(index){
            this.$store.commit('taskActive',index)
        },
        getTask(){
            var that = this
            that.$get('doneTask',{}).then(res=>{
                if(res.code==0){
                    that.items = res.data
                }
            })
        },
        status(value){
            console.log(value);
            this.items = value
        }
    },
    components:{
        Tab,TabItem,
        TrayHeader () {
            return {
                component: TrayHeader
            }
        },
        USERTASK(){
            return {
                component:usertask,
            }
        },
        TODATTASK(){
            return {
                component:todaytask,
            }
        },
        DONETASK(){
            return {
                component:donetask,
            }
        }
    }
}
</script>
<style lang="scss">
.usertask-content{
    height: 100%;
    font-size: 36px;
    .my-tab{
        padding-top:100px;
        .vux-tab-container{
            height: 100px;
        }
        .vux-tab-item{
            height: 100px;
            line-height: 100px;
            font-size: 30px;
        }
    }
    .tab-content{
        height: calc(100% - 188px);
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        background: #f7f7f7;
    }
    .pad{
        height: 20px;
        background: #f7f7f7;
    }
    .result{
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: touch;
    }
    .left-enter-active, .left-leave-active {
        opacity: 1;
        transition: all .5s;
    }
    .left-enter, .left-leave-to{
        opacity: 0;
        transform: translateX(-100%);
    }
    .right-enter-active, .right-leave-active {
        opacity: 1;
        transition: all .5s;
    }
    .right-enter, .right-leave-to{
        opacity: 0;
        transform: translateX(100%);
    }
}
</style>
