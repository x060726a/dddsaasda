<template>
<div class="result">
    <transition-group  :name="$store.state.taskTransitionName" tag="div">
        <ITEM v-for="(item,key,index) in items" :item="item" :taskActive="taskActive" :index="key" :key="key" :type="2"/>
    </transition-group>
</div>
</template>
<script>
const item = import('@/components/Usertask/item')
export default {
    data(){
        return{
            items:[]
        }
    },
    props:['res','taskActive'],
    created(){
        var that = this
        this.res.forEach((ele,idx) => {
            that.pushObj(ele,idx+1)
        });
    },
    methods:{
        pushObj(obj,idx){
            var that = this
            setTimeout(()=>{
                that.items.push(obj)
            },idx*50)
        }
    },
    components:{
        ITEM(){
            return {
                component:item,
            }
        },
    }
}
</script>

